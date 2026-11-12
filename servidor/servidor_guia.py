"""
Servidor de la Guía FPGEST
--------------------------
Sirve la guía en la red y registra propuestas en SQLite. También exporta
propuestas.csv para que el registro pueda abrirse con Excel.
"""
import argparse
import csv
import json
import os
import sqlite3
import threading
import uuid
from contextlib import contextmanager
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

# ---------- configuración por defecto ----------
CARPETA_WEB = r"F:\Emmegisoft\FPGEST_DATA\Guia_FPGEST"
PUERTO = 8080
# -----------------------------------------------

CAMPOS = ["id", "fecha", "nombre", "sector", "tipo", "guia", "importancia", "descripcion", "estado", "nota", "version_guia"]
ESTADOS = ["Nueva", "Aceptada", "En curso", "Hecha", "Descartada"]
LIMITES = {"nombre": 80, "sector": 60, "tipo": 60, "guia": 120, "importancia": 40, "descripcion": 4000, "nota": 1000, "version_guia": 20}
candado = threading.Lock()


def rutas_datos(web):
    carpeta = os.path.join(web, "propuestas")
    os.makedirs(carpeta, exist_ok=True)
    return os.path.join(carpeta, "propuestas.sqlite3"), os.path.join(carpeta, "propuestas.csv")


def conectar(web):
    db, _ = rutas_datos(web)
    conn = sqlite3.connect(db, timeout=30)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("""CREATE TABLE IF NOT EXISTS propuestas (
        id TEXT PRIMARY KEY,
        fecha TEXT NOT NULL,
        nombre TEXT NOT NULL DEFAULT '',
        sector TEXT NOT NULL DEFAULT '',
        tipo TEXT NOT NULL DEFAULT '',
        guia TEXT NOT NULL DEFAULT '',
        importancia TEXT NOT NULL DEFAULT '',
        descripcion TEXT NOT NULL DEFAULT '',
        estado TEXT NOT NULL DEFAULT 'Nueva',
        nota TEXT NOT NULL DEFAULT '',
        version_guia TEXT NOT NULL DEFAULT ''
    )""")
    importar_csv_si_vacia(conn, rutas_datos(web)[1])
    return conn


@contextmanager
def sesion(web):
    conn = conectar(web)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def importar_csv_si_vacia(conn, csv_path):
    if conn.execute("SELECT 1 FROM propuestas LIMIT 1").fetchone() or not os.path.exists(csv_path):
        return
    try:
        with open(csv_path, encoding="utf-8-sig", newline="") as f:
            filas = csv.DictReader(f, delimiter=";")
            conn.executemany(
                "INSERT OR IGNORE INTO propuestas (" + ",".join(CAMPOS) + ") VALUES (" + ",".join("?" for _ in CAMPOS) + ")",
                [tuple(fila.get(campo, "") or "" for campo in CAMPOS) for fila in filas],
            )
        conn.commit()
    except (OSError, csv.Error, sqlite3.Error):
        conn.rollback()
        raise


def exportar_csv(web):
    _, p = rutas_datos(web)
    with sesion(web) as conn:
        filas = conn.execute("SELECT " + ",".join(CAMPOS) + " FROM propuestas ORDER BY rowid").fetchall()
    tmp = p + ".tmp"
    with open(tmp, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=CAMPOS, delimiter=";")
        w.writeheader()
        w.writerows(dict(fila) for fila in filas)
    os.replace(tmp, p)


def leer(web):
    with sesion(web) as conn:
        filas = conn.execute("SELECT " + ",".join(CAMPOS) + " FROM propuestas ORDER BY rowid").fetchall()
    return [dict(fila) for fila in filas]


def limpiar(datos, campo):
    v = str(datos.get(campo, "") or "").strip()
    return v[: LIMITES.get(campo, 200)]


class Manejador(SimpleHTTPRequestHandler):
    web = CARPETA_WEB

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=self.web, **kw)

    def log_message(self, fmt, *args):
        pass

    def _json(self, codigo, obj):
        cuerpo = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(cuerpo)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(cuerpo)

    def _leer_cuerpo(self):
        n = int(self.headers.get("Content-Length") or 0)
        if n > 20000:
            raise ValueError("Propuesta demasiado larga")
        return json.loads(self.rfile.read(n).decode("utf-8") or "{}")

    def do_GET(self):
        if self.path.split("?")[0] == "/api/propuestas":
            with candado:
                filas = leer(self.web)
            return self._json(200, {"propuestas": filas, "estados": ESTADOS})
        return super().do_GET()

    def do_POST(self):
        ruta = self.path.split("?")[0]
        try:
            datos = self._leer_cuerpo()
        except Exception:
            return self._json(400, {"error": "Datos inválidos"})

        if ruta == "/api/propuestas":
            if not limpiar(datos, "descripcion"):
                return self._json(400, {"error": "Falta la descripción"})
            fila = {campo: limpiar(datos, campo) for campo in CAMPOS if campo in LIMITES}
            fila.update(id=uuid.uuid4().hex[:8], fecha=datetime.now().strftime("%d/%m/%Y %H:%M"), estado="Nueva")
            with candado, sesion(self.web) as conn:
                conn.execute("INSERT INTO propuestas (" + ",".join(CAMPOS) + ") VALUES (" + ",".join("?" for _ in CAMPOS) + ")", tuple(fila.get(campo, "") for campo in CAMPOS))
            exportar_csv(self.web)
            return self._json(201, {"ok": True, "propuesta": fila})

        if ruta.startswith("/api/propuestas/") and ruta.endswith("/estado"):
            pid = ruta.split("/")[3]
            estado = limpiar(datos, "estado")
            if estado not in ESTADOS:
                return self._json(400, {"error": "Estado no válido"})
            with candado, sesion(self.web) as conn:
                actual = conn.execute("SELECT " + ",".join(CAMPOS) + " FROM propuestas WHERE id = ?", (pid,)).fetchone()
                if actual is None:
                    return self._json(404, {"error": "No se encontró la propuesta"})
                nota = limpiar(datos, "nota") if "nota" in datos else actual["nota"]
                conn.execute("UPDATE propuestas SET estado = ?, nota = ? WHERE id = ?", (estado, nota, pid))
                fila = dict(actual)
                fila.update(estado=estado, nota=nota)
            exportar_csv(self.web)
            return self._json(200, {"ok": True, "propuesta": fila})

        return self._json(404, {"error": "Ruta desconocida"})


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--web", default=CARPETA_WEB)
    ap.add_argument("--puerto", type=int, default=PUERTO)
    a = ap.parse_args()
    Manejador.web = os.path.abspath(a.web)
    db, csv_path = rutas_datos(Manejador.web)
    with sesion(Manejador.web):
        pass
    exportar_csv(Manejador.web)
    srv = ThreadingHTTPServer(("0.0.0.0", a.puerto), Manejador)
    print(f"Guía FPGEST en http://localhost:{a.puerto}  (carpeta: {Manejador.web})")
    print(f"Base de datos: {db}")
    print(f"Exportación Excel: {csv_path}")
    srv.serve_forever()


if __name__ == "__main__":
    main()

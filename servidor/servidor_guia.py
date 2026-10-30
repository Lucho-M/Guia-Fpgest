"""
Servidor de la Guía FPGEST
--------------------------
Sirve la guía en la red (http://NOMBRE-DEL-SERVIDOR:8080) y registra las
propuestas de mejora en un CSV que se abre con Excel.

Solo usa Python 3 (sin instalar nada más).

Uso:
    python servidor_guia.py                      # usa los valores de abajo
    python servidor_guia.py --puerto 8080 --web "F:\\Emmegisoft\\FPGEST_DATA\\Guia_FPGEST"
"""
import argparse
import csv
import json
import os
import threading
import uuid
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


def ruta_csv(web):
    carpeta = os.path.join(web, "propuestas")
    os.makedirs(carpeta, exist_ok=True)
    return os.path.join(carpeta, "propuestas.csv")


def leer(web):
    p = ruta_csv(web)
    if not os.path.exists(p):
        return []
    with open(p, encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f, delimiter=";"))


def escribir(web, filas):
    p = ruta_csv(web)
    tmp = p + ".tmp"
    with open(tmp, "w", encoding="utf-8-sig", newline="") as f:  # utf-8-sig: Excel muestra bien los acentos
        w = csv.DictWriter(f, fieldnames=CAMPOS, delimiter=";")
        w.writeheader()
        for fila in filas:
            w.writerow({k: fila.get(k, "") for k in CAMPOS})
    os.replace(tmp, p)


def limpiar(datos, campo):
    v = str(datos.get(campo, "") or "").strip()
    return v[: LIMITES.get(campo, 200)]


class Manejador(SimpleHTTPRequestHandler):
    web = CARPETA_WEB

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=self.web, **kw)

    def log_message(self, fmt, *args):
        pass  # silencioso

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
            fila = {k: limpiar(datos, k) for k in CAMPOS if k in LIMITES}
            fila.update(id=uuid.uuid4().hex[:8], fecha=datetime.now().strftime("%d/%m/%Y %H:%M"), estado="Nueva")
            with candado:
                filas = leer(self.web)
                filas.append(fila)
                escribir(self.web, filas)
            return self._json(201, {"ok": True, "propuesta": fila})

        if ruta.startswith("/api/propuestas/") and ruta.endswith("/estado"):
            pid = ruta.split("/")[3]
            estado = limpiar(datos, "estado")
            if estado not in ESTADOS:
                return self._json(400, {"error": "Estado no válido"})
            with candado:
                filas = leer(self.web)
                for f in filas:
                    if f["id"] == pid:
                        f["estado"] = estado
                        if "nota" in datos:
                            f["nota"] = limpiar(datos, "nota")
                        escribir(self.web, filas)
                        return self._json(200, {"ok": True, "propuesta": f})
            return self._json(404, {"error": "No se encontró la propuesta"})

        return self._json(404, {"error": "Ruta desconocida"})


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--web", default=CARPETA_WEB)
    ap.add_argument("--puerto", type=int, default=PUERTO)
    a = ap.parse_args()
    Manejador.web = os.path.abspath(a.web)
    ruta_csv(Manejador.web)
    srv = ThreadingHTTPServer(("0.0.0.0", a.puerto), Manejador)
    print(f"Guía FPGEST en http://localhost:{a.puerto}  (carpeta: {Manejador.web})")
    print(f"Propuestas en: {ruta_csv(Manejador.web)}")
    srv.serve_forever()


if __name__ == "__main__":
    main()

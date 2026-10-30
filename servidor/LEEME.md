# Servidor de la Guía FPGEST

Sirve la guía en la red y **registra las propuestas de mejora** en
`F:\Emmegisoft\FPGEST_DATA\Guia_FPGEST\propuestas\propuestas.csv` (se abre con Excel).

Los usuarios entran por `http://NOMBRE-DEL-SERVIDOR:8080`.
Si alguien abre el .html directo desde la carpeta, la guía funciona igual, pero las propuestas no se guardan (solo puede copiar el texto).

## Opción A — Python (la más simple)

1. Instalar Python 3 en el servidor (python.org, tildar "Add to PATH").
2. Doble clic en `iniciar_servidor.bat`.
3. Abrir el puerto 8080 en el Firewall de Windows (regla de entrada, TCP 8080).
4. Para que arranque solo: Programador de tareas → Crear tarea → "Al iniciar el sistema" →
   ejecutar `iniciar_servidor.bat` (igual que el servicio FPGEST SERVER START).

## Opción B — Docker

Si en el servidor ya hay Docker:

```
cd servidor
docker compose up -d
```

Ajustar en `docker-compose.yml` la ruta de la carpeta de la guía. Se reinicia solo con el servidor.

## Después de instalarlo

En `web/datos.js` → `propuestas.direccion`, poner la dirección real (ej. `http://srv-cascio:8080`).

## Bandeja

En la guía: Propuestas de mejora → **Ver bandeja**. Ahí se filtran y se cambia el estado
(Nueva, Aceptada, En curso, Hecha, Descartada). Todo queda en el CSV.

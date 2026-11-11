# Guía FPGEST — Cascio

Guía interactiva de **instructivos y procedimientos** del ERP FPGEST.
Funciona sin internet: se abre `web/index.html` desde la carpeta compartida.

## Estructura

| Carpeta / archivo | Qué tiene |
|---|---|
| `web/index.html` | La página. Casi nunca hace falta tocarla. |
| `web/datos.js` | **Todo el contenido**: módulos, guías, pasos, reglas, errores. |
| `web/img/` | Capturas de pantalla del GEST. |
| `plantillas/` | Hojas modelo de importación (.xlsx / .csv). |
| `videos/` | Fuera de Git (pesan mucho). Los videos van directo en la carpeta de la red. |
| `servidor/` | Servidor que publica la guía en la red y registra las propuestas (ver `servidor/LEEME.md`). |
| `herramientas/armar_carpeta_compartida.bat` | Copia la versión actual a `F:\Emmegisoft\FPGEST_DATA\Guia_FPGEST`. |
| `CHANGELOG.md` | Registro de cambios por versión. |

## Cómo trabajar en VS Code

1. Abrir la carpeta `guia-fpgest` en VS Code. Aceptar las extensiones recomendadas.
2. Editar `web/datos.js`.
3. Ver los cambios: clic derecho en `web/index.html` → **Open with Live Server** (se recarga solo al guardar).
4. Guardar la versión en Git: panel **Control de código fuente** → escribir qué cambiaste → **Confirmar**.
5. Publicar para los usuarios: doble clic en `herramientas/armar_carpeta_compartida.bat` (copia `web/` y `plantillas/` a la carpeta de la red).

## Dónde vive cada cosa

| Qué | Dónde |
|---|---|
| Proyecto de trabajo (con Git) | En tu PC, por ejemplo `C:\Proyectos\guia-fpgest` |
| Versión que usan todos | `F:\Emmegisoft\FPGEST_DATA\Guia_FPGEST` (servidor LAN) |
| Copia de respaldo del Git (opcional) | `F:\Emmegisoft\FPGEST_DATA\Guia_FPGEST_repo.git` |

No trabajes directo sobre la carpeta de la red: los usuarios verían los cambios a medio hacer.

### Respaldo del Git en el servidor (opcional, una sola vez)

```
git clone --bare . F:\Emmegisoft\FPGEST_DATA\Guia_FPGEST_repo.git
git remote add servidor F:\Emmegisoft\FPGEST_DATA\Guia_FPGEST_repo.git
```
Después, cada tanto: `git push servidor main`.

## Publicar en internet (GitHub Pages)

La guía pública vive en **otro repositorio**, `guia-fpgest-web`, que contiene solo la carpeta `web/`.
Este repositorio de trabajo queda **privado**: su historial guarda las capturas originales sin tapar.

Una sola vez:
1. Crear en GitHub el repositorio **público** `guia-fpgest-web` (vacío).
2. Clonarlo **al lado** de este proyecto (misma carpeta padre).
3. Doble clic en `herramientas/publicar_web.bat`.
4. En GitHub → repositorio `guia-fpgest-web` → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.

Cada vez que quieras actualizar la página: doble clic en `herramientas/publicar_web.bat`.

Antes de publicar, siempre:
- Toda captura nueva va con los datos tapados (proveedores, CUIT, precios, importes, clientes, obras, nombres de personas, direcciones y teléfonos).
- El texto no nombra proveedores ni clientes reales, ni importes.
- Los videos no se publican por esta vía.

## Cómo agregar una guía

Copiar una guía existente en `web/datos.js` y cambiar sus campos:

| Campo | Ejemplo |
|---|---|
| `id` | `"remito-venta"` (sin espacios ni acentos) |
| `tipo` | `"Procedimiento"` (qué, quién, cuándo) o `"Instructivo"` (cómo se hace en el GEST) |
| `responsable` | `"Abastecimiento"` |
| `sectores` | `["Compras", "Producción"]` — los que se ven afectados |
| `cuando` | `"Cada vez que llega material con remito."` |
| `reglas` | lista de reglas del procedimiento |
| `pasos` | `{ titulo, texto, img }` — la captura en `web/img/` |
| `errores` | `{ problema, solucion }` — **siempre con la solución** |
| `relacionados` | ids de otras guías |
| `fuente` | páginas del manual |

Un módulo "en preparación" se activa solo cuando le cargás la primera guía.

## Reglas del repositorio

- Este repositorio de trabajo es **privado**. Lo público sale solo por `guia-fpgest-web`.
- Una confirmación (commit) por cambio, con un mensaje claro: `Agrega guía Remito de venta`, `Corrige pasos de Rectificar kg`.
- Al cerrar una versión, anotarla en `CHANGELOG.md` y subir el número en `web/datos.js` (`version`).

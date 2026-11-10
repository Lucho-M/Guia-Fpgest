# Guía FPGEST: armado y mantenimiento

Documento vivo. Explica cómo está armada la guía, cómo se le agrega contenido y cómo se mantiene al día.
Última actualización: 10/11/2026 · Versión de la guía: 0.2

---

## 1. Para qué es la guía

- Que cualquier usuario, nuevo o con experiencia, pueda hacer una tarea en el FPGEST **sin preguntarle a nadie**.
- Que cada guía deje claro **quién lo hace, cuándo y a qué sectores afecta**.
- Reemplazar de a poco al manual «Implementación del ERP GEST» (317 páginas) como material de consulta diaria. El manual queda como fuente.

## 2. Reglas para que sea a prueba de todo

1. **Un solo lugar de entrada.** Un acceso directo en el escritorio; nada de buscar archivos.
2. **Se busca con las palabras del usuario.** Si en la oficina se dice "recepción" y el GEST dice "Entregas Proveedores", la guía tiene que aparecer con las dos.
3. **Los nombres del GEST se escriben igual que en pantalla**, con mayúsculas y acentos tal cual, y en negrita: **Recoger pedidos de proveedores**.
4. **Cada paso es una sola acción** y, si se puede, lleva su captura con lo que hay que tocar marcado en rojo.
5. **La ruta completa siempre**: `Compras y Almacén › Entregas Proveedores › Añadir`.
6. **Decir también qué NO hacer** cuando hay un error típico (ej.: no elegir "Factura proveedor" en la recepción).
7. **Todo error frecuente va con su solución.** Sin solución no se publica.
8. **Frases cortas, sin siglas sin explicar.** La primera vez: "orden de compra (O.C.)".

## 3. Cómo está armada

| Parte | Archivo / carpeta | Qué tiene |
|---|---|---|
| Página | `web/index.html` | El diseño y el funcionamiento. Casi nunca se toca. |
| Contenido | `web/datos.js` | Módulos, guías, pasos, reglas, errores, plan de mejoras. **Acá se trabaja.** |
| Capturas | `web/img/` | Imágenes de las pantallas del GEST. |
| Plantillas | `plantillas/` | Hojas modelo de importación (.xlsx, .csv). |
| Videos | `videos/` | Fuera de Git. Van directo en la carpeta que usan los usuarios. |
| Servidor (opcional) | `servidor/` | Publica la guía en la red y registra propuestas en un CSV. Python o Docker. |
| Publicar | `herramientas/armar_carpeta_compartida.bat` | Copia la versión actual a la carpeta de los usuarios. |
| Historial | `CHANGELOG.md` | Qué cambió en cada versión. |

Dónde vive cada cosa:

| Qué | Dónde |
|---|---|
| Proyecto de trabajo (con Git) | PC del responsable, ej. `C:\Proyectos\guia-fpgest` |
| Versión que usan todos | `F:\Emmegisoft\FPGEST_DATA\Guia_FPGEST` |
| Respaldo | A definir (Google Drive o repositorio en el servidor) |

## 4. Cómo se arma una guía nueva

### 4.1 Antes de escribir

- Elegir **una sola tarea** (ej.: "Rectificar kg de aluminio"). Si son dos tareas, son dos guías.
- Decidir el tipo:
  - **Procedimiento**: qué se hace, quién y cuándo. Reglas entre sectores.
  - **Instructivo**: cómo se hace en el GEST, clic por clic.
- Juntar la fuente: páginas del manual, video, plantilla, y el dato de quién es el responsable.

### 4.2 Campos de la ficha (en `datos.js`)

| Campo | Qué poner | Ejemplo |
|---|---|---|
| `id` | Nombre corto, sin espacios ni acentos. No se cambia nunca más. | `rectificar-kg` |
| `titulo` | Como lo diría el usuario. | Rectificar kg de aluminio |
| `tipo` | `Procedimiento` o `Instructivo` | Instructivo |
| `resumen` | Una frase: para qué sirve. | Cómo ajustar los kilos reales… |
| `responsable` | Sector que lo ejecuta. | Abastecimiento |
| `sectores` | Sectores **afectados** por la tarea. | Compras, Administración |
| `cuando` | En qué momento se hace y con qué plazo. | Al recibir perfiles en kg… |
| `reglas` | Lo que hay que respetar. Incluir el "qué NO hacer". | Tope del 10 %… |
| `pasos` | `titulo`, `texto`, `img`. Una acción por paso. | Elegir la O.C. |
| `errores` | `problema` y `solucion`. Siempre los dos. | «Error al ingresar» → … |
| `relacionados` | `id` de otras guías. | `recepcion-materiales` |
| `fuente` | Páginas del manual o nombre del video. | Págs. 155–159 |

### 4.3 Capturas

- Formato JPG, ancho máximo 1400 px.
- Nombre: prefijo de la guía + número + qué muestra. Ej.: `kg-03-ventana.jpg`.
- Marcar en rojo lo que hay que tocar.
- Si la pantalla muestra datos sensibles que no hacen falta (precios, CUIT), recortarlos.

### 4.4 Probar

1. Abrir `web/index.html` (o con Live Server en VS Code).
2. Revisar la guía nueva: ficha completa, capturas que cargan, guías relacionadas que abren.
3. Buscarla con dos o tres palabras que usaría un usuario.
4. **Prueba de fuego:** que la siga alguien que nunca hizo la tarea, sin ayuda. Donde se traba, se corrige.

## 5. Glosario (cómo le decimos / cómo figura en el GEST)

Se mantiene en la hoja «Guía FPGEST: dónde va cada cosa», pestaña *Glosario GEST*.
Cada término nuevo que aparezca al escribir una guía se anota ahí con su ruta en pantalla.
Pendiente: mostrar el glosario dentro de la guía y usarlo en el buscador.

## 6. Videos y plantillas de importación

- **Videos:** MP4, 720p. Un video por guía. Toda guía con video tiene igual sus pasos escritos (el buscador y el futuro asistente con IA leen texto, no video).
- **Plantillas:** una ficha por plantilla con: para qué sirve, en qué pantalla se importa, columnas obligatorias, errores típicos **con solución** y el archivo para descargar.
- Estado: soporte de video y módulo de plantillas todavía no están armados (ver punto 10).

## 7. Propuestas de mejora

Flujo:

1. El usuario toca **Proponer una mejora** (menú, inicio o pie de cada guía) y completa: tipo, nombre, sector, guía, descripción, importancia.
2. La propuesta queda registrada.
3. El responsable la revisa y le pone estado: Nueva → Aceptada → En curso → Hecha (o Descartada).
4. Lo aceptado se pasa a `datos.js` → `propuestas.plan`, que es lo que los usuarios ven en **Próximas actualizaciones**.

Cómo se registran hoy: con el servidor de la carpeta `servidor/`, en `propuestas\propuestas.csv`.
En evaluación: reemplazarlo por un **formulario de Google** (respuestas en una planilla, sin servidor).

## 8. Publicar una versión

1. Cargar o corregir el contenido en `web/datos.js`.
2. Probar (punto 4.4).
3. Subir el número en `datos.js` (`version`) y la fecha (`actualizado`).
4. Anotar los cambios en `CHANGELOG.md`.
5. Guardar en Git con un mensaje claro: `Agrega guía Remito de venta`.
6. Doble clic en `herramientas/armar_carpeta_compartida.bat`.
7. Abrir la guía desde la carpeta de los usuarios y verificar que se ve la versión nueva.

Numeración: cambios chicos (correcciones) suben el segundo número, 0.2 → 0.3. Un módulo nuevo completo también. La 1.0 es cuando estén todos los módulos.

## 9. Mantenimiento

| Cuándo | Qué hacer |
|---|---|
| Cada semana | Revisar las propuestas nuevas y ponerles estado. |
| Cada vez que cambia un procedimiento | Corregir la guía **antes** de avisar el cambio. Revisar los sectores afectados y avisarles. |
| Cada actualización del FPGEST (hotfix o versión) | Revisar las guías de las pantallas que cambiaron y rehacer las capturas que ya no coinciden. |
| Cada mes | Revisar guías sin tocar hace más de 6 meses; confirmar con el sector responsable que siguen vigentes. |
| Cada año | Revisar datos con fecha: carpetas anuales (ej. HORAS-NOPRODUCTIVAS-año), límites de autorización de O.C., formas de pago. |

Al cambiar una guía, preguntarse siempre: **¿a qué otros sectores les cambia el trabajo esta decisión?** y revisar sus guías relacionadas.

## 10. Estado de los módulos

| Módulo | Estado | Fuente (págs. del manual) |
|---|---|---|
| Entrega de proveedores | Publicado (5 guías) | 146–185 |
| Inicio y navegación | Pendiente | 19–20 |
| Carpetas y estados | Pendiente | 6–19, 55–56 |
| Artículos y variantes | Pendiente | 58–81 |
| Asignación de stock | Pendiente (próximo sugerido) | 36–54 |
| Órdenes de compra | Pendiente (próximo sugerido) | 107–124 |
| Almacén y stock | Pendiente | 97–145 |
| Producción | Pendiente | 189–223 |
| Remitos Cascio | Pendiente | 161–165, 186–188, 301–307 |
| Acopios y procesos en terceros | Pendiente | 224–243 |
| Facturas y pagos | Pendiente | 256–281 |
| Errores frecuentes | Pendiente | 285–316 |
| Plantillas de importación | Pendiente (módulo nuevo) | varias + archivos del proyecto |

Cosas a resolver en el manual antes de pasarlas a la guía:

- Secciones vacías: Planificación (calendarios, nómina, capacidad), Facturación del anticipo, "Accesorios Elaborados" en el índice.
- Puntos marcados "VALIDAR / verificar": quién mantiene la nómina, precio del artículo ficticio en acopios, a quién se informa el inicio de producción.
- Datos que pueden estar viejos: límite de autorización de O.C. ($500.000), carpeta HORAS-NOPRODUCTIVAS-2022/2024, hotfix de 2023.

## 11. Decisiones abiertas

| Decisión | Opciones |
|---|---|
| ¿Los usuarios trabajan todos en la oficina o algunos desde afuera? | Oficina: la guía queda en la red. Afuera: publicada en internet con contraseña. |
| Respaldo | Google Drive (confirmar con la empresa, por los datos de las capturas) o repositorio en el servidor. |
| Registro de propuestas | Servidor propio (ya armado) o formulario de Google. |
| Asistente con IA | Segunda etapa, cuando el contenido esté cargado y ordenado. |

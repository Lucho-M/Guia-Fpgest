# Cambios

## 0.5 — 11/11/2026
- Módulo nuevo **Órdenes de compra** (Compras), con 5 guías: revisar una carpeta antes de comprar, pedir cotizaciones, emitir una orden de compra, autorizarla, y estados y cancelación.
- 11 capturas nuevas, con proveedores, clientes y nombres tapados.
- Glosario: se suman "Cotización" (Propuesta de pedido) y "Elegir proveedor y precio" (Asociar proveedores).
- El límite de autorización no se publica como importe: figura como "el límite definido por la empresa".

## 0.4 — 11/11/2026
- Diseño nuevo: barra blanca con el logo de Cascio y cuerpo oscuro con acentos rojos.
- Inicio pensado para no perderse: buscador grande, "Elegí tu sector" y lista de tareas que empiezan con un verbo.
- Menú fijo arriba (Inicio, Todas las guías, Glosario, Proponer una mejora) y botón "Volver" en todas las pantallas.
- Cada guía muestra "Dónde está en el GEST" (ruta igual que en pantalla) y la sección "Qué no hacer".
- Glosario "cómo le decimos / cómo figura en el GEST"; el buscador entiende las dos formas.
- Campos nuevos en `datos.js`: `tarea`, `ruta`, `palabras`, `noHacer`, y la lista `glosario`.

## 0.3 — 11/11/2026
- Capturas con los datos sensibles tapados (proveedores, CUIT, direcciones, teléfonos, clientes, importes, nombres de personas).
- La página pide a los buscadores que no la indexen.
- Propuestas por formulario de Google: se activa cargando el enlace en `datos.js` → `propuestas.formulario`.
- `herramientas/publicar_web.bat` para publicar en GitHub Pages desde un repositorio público aparte.

## 0.2 — 30/10/2026
- Nueva sección **Propuestas de mejora**: los usuarios cuentan qué necesitan ver o hacer, o qué está mal en una guía.
- Las propuestas se **registran** en `propuestas/propuestas.csv` a través del servidor de la guía (`servidor/`, Python o Docker).
- **Bandeja de propuestas**: filtros por estado y cambio de estado (Nueva, Aceptada, En curso, Hecha, Descartada).
- Botón "Proponer mejora" al pie de cada guía (ya viene con la guía elegida).
- Lista **Próximas actualizaciones** con estado (planificada, en curso, hecha), editable en `datos.js` → `propuestas.plan`.
- Los errores frecuentes muestran "Cómo solucionarlo".

## 0.1 — 30/10/2026
- Primera versión de la guía.
- Módulo **Entrega de proveedores**: recepción de materiales, fechas en la recepción, rectificar kg de aluminio, excedentes (+10 %) y devolución a proveedor.
- Errores frecuentes con "Cómo solucionarlo".
- 11 módulos en preparación con referencia a las páginas del manual.

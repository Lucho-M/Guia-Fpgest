# Cambios

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

/* =====================================================================
   GUÍA FPGEST — CONTENIDO
   ---------------------------------------------------------------------
   Este archivo tiene TODO el contenido de la guía. La página (index.html)
   no hace falta tocarla para agregar o corregir guías.

   CÓMO AGREGAR UNA GUÍA
   1. Copiá un bloque { id: ..., ... } dentro de "guias" de su módulo.
   2. Cambiá el id (sin espacios ni acentos, ej: "remito-venta").
   3. Las capturas van en la carpeta img/ y se nombran en "img".
   4. Guardá y recargá la página (F5).

   CÓMO ACTIVAR UN MÓDULO "EN PREPARACIÓN"
   Agregale al menos una guía en "guias": deja de verse en gris solo.

   CAMPOS DE UNA GUÍA
   id, titulo, tipo ("Procedimiento" = qué/quién/cuándo, "Instructivo" = cómo
   se hace en el GEST), tarea (cómo lo diría el usuario, empezando con un verbo),
   ruta (dónde está en el GEST, igual que en pantalla), palabras (sinónimos para el
   buscador), noHacer [{texto, img}], resumen, responsable, sectores (los que se ven
   afectados), cuando, reglas [], pasos [{titulo, texto, img}],
   errores [{problema, solucion}], relacionados [ids], fuente.
   ===================================================================== */

window.GUIA_FPGEST = {
  version: "0.4",
  actualizado: "11/11/2026",
  autor: "",   // tu nombre, si querés que figure al pie
  fuente: "Implementación del ERP GEST (manual interno, 317 págs.)",

  /* PROPUESTAS DE MEJORA
     direccion: dirección donde corre el servidor de la guía (ver servidor/LEEME.md).
       Las propuestas se guardan en propuestas\propuestas.csv dentro de la carpeta de la guía.
     plan: lo que se va a sumar en las próximas versiones.
       estado: "planificada" | "en-curso" | "hecha"
       pedido: sector o persona que lo pidió (opcional) */
  propuestas: {
    direccion: "http://SERVIDOR:8080",
    // Si la guía se publica en internet: pegar acá el enlace del formulario de Google.
    // Con el enlace cargado, el botón "Proponer una mejora" abre el formulario (ya no usa el servidor).
    formulario: "",
    // Opcional: código del campo "Guía" del formulario (ej. "entry.123456789") para que llegue ya completo.
    formularioCampoGuia: "",
    plan: [
      { titulo: "Videos en las guías", estado: "en-curso", detalle: "Ver el video del procedimiento desde cada guía, con acceso directo a cada paso." },
      { titulo: "Módulo Plantillas de importación", estado: "planificada", detalle: "Plantillas descargables, columnas obligatorias y errores típicos con su solución." },
      { titulo: "Módulo Asignación de stock", estado: "planificada", detalle: "Asignación, reasignación, carpetas de acopio -0 y desplacado." },
      { titulo: "Módulo Órdenes de compra", estado: "planificada", detalle: "Cotizaciones, generación, autorizaciones y cancelación." }
    ]
  },

  /* GLOSARIO: cómo le decimos en la oficina / cómo figura en el GEST.
     El buscador lo usa: quien busca "recepción" encuentra "Entregas Proveedores". */
  glosario: [
    { decimos: "Recepción", gest: "Entregas Proveedores", ruta: "Compras y Almacén › Entregas Proveedores" },
    { decimos: "Carpeta", gest: "Pedido", ruta: "Home › Pedidos" },
    { decimos: "Stock libre", gest: "No hay ningún contrato asociado", ruta: "Compras y Almacén › Situación de Almacén" },
    { decimos: "Remito de salida", gest: "Remito Cascio", ruta: "Home › Documentos › Remito Cascio" },
    { decimos: "Entregar material a producción", gest: "Operación de almacén SHIFT", ruta: "Compras y Almacén › Operaciones de Almacén › Añadir › SHIFT" }
  ],

  sectores: ["Cómputos", "Órdenes de Fabricación", "Abastecimiento", "Compras", "Producción", "Despacho", "Administración"],

  modulos: [
    {
      id: "entrega-proveedores",
      titulo: "Entrega de proveedores",
      descripcion: "Recepción de materiales, fechas, kilos de aluminio, excedentes y devoluciones.",
      guias: [
        {
          id: "recepcion-materiales",
          tarea: "Recibir material de un proveedor",
          ruta: "Compras y Almacén › Entregas Proveedores › Añadir",
          palabras: ["recepción", "recibir", "ingreso de material", "remito de proveedor", "entrada"],
          noHacer: [{"texto": "No elegir <b>Factura proveedor</b> como tipo de documento. En la recepción va siempre <b>Remito proveedor</b>.", "img": "img/rec-07-no-factura.jpg"}, {"texto": "No recibir como servicio <b>RECUB</b> el material que llega ya pintado o anodizado y no salió de Cascio. Se recibe como el <b>artículo final</b>; si no, después no se puede asignar a las carpetas."}, {"texto": "No ingresar material sin orden de compra (salvo los casos de la guía de devoluciones)."}],
          titulo: "Recepción de materiales",
          tipo: "Instructivo",
          resumen: "Cómo ingresar al GEST el material que llega con remito del proveedor, tomando la orden de compra y cargándolo al almacén.",
          responsable: "Abastecimiento",
          sectores: ["Compras", "Órdenes de Fabricación", "Producción", "Administración"],
          cuando: "Cada vez que llega material con remito de proveedor. Hasta 48 h después del ingreso físico.",
          reglas: [
            "El tipo de documento es siempre <b>Remito proveedor</b>.",
            "La recepción se hace contra la orden de compra emitida.",
            "Si la necesidad no tiene almacén de destino, cargarlo a mano en la recepción y avisar a Compras para que lo configure en el artículo."
          ],
          pasos: [
            { titulo: "Abrir Entregas Proveedores", texto: "En la solapa <b>Compras y Almacén</b> elegí <b>Entregas Proveedores</b> y después <b>Añadir</b>.", img: "img/rec-01-menu.jpg" },
            { titulo: "Cargar los datos del remito", texto: "Completá <b>Proveedor</b>, <b>Tipo de documento</b> = Remito proveedor, <b>Nº</b> del remito y <b>Fecha</b> (la que figura en el remito). Después tocá <b>Recoger pedidos de proveedores</b> (ícono de carpeta en la barra de ítems).", img: "img/rec-02-entrega.jpg" },
            { titulo: "Elegir la orden de compra", texto: "En la lista de órdenes disponibles buscá la O.C. del remito.", img: "img/rec-03-oc.jpg" },
            { titulo: "Pasarla a órdenes tomadas", texto: "Bajá la O.C. a la lista inferior <b>Lista órdenes de compra tomadas</b> y tocá <b>Siguiente</b>.", img: "img/rec-04-oc-tomadas.jpg" },
            { titulo: "Controlar cantidades", texto: "Revisá la columna <b>CANT. ENTREGADA</b> contra el remito. Si la entrega es parcial, corregí la cantidad de cada línea. Si es aluminio en kg, seguí la guía <i>Rectificar kg de aluminio</i>.", img: "img/rec-05-cantidades.jpg" },
            { titulo: "Elegir almacén y confirmar", texto: "Verificá el almacén de destino de cada línea (ej. Depósito Accesorios, Depósito Perfiles) y tocá <b>Confirmar</b>.", img: "img/rec-06-almacen.jpg" },
            { titulo: "Registrar la entrega", texto: "En <b>Registrar</b> dejá tildado <b>Despachar pedidos</b>, <b>Cargar almacén</b> y <b>Generar documento</b>, y tocá <b>Ejecutar</b>. La O.C. pasa a <i>Tramitado parcial</i> o <i>Tramitado total</i> y las necesidades de la carpeta quedan cumplidas." }
          ],
          errores: [
            { problema: "Aparece «Error al ingresar»: la recepción se registra pero las necesidades siguen pendientes.", solucion: "La descripción o el código del artículo tiene caracteres no admitidos (pasa al copiar y pegar desde PDF o internet). Corregir tipeando el texto en la ficha del artículo, en la necesidad de la carpeta y en la O.C." },
            { problema: "Una línea llega sin almacén de destino.", solucion: "Agregar el almacén a mano en la recepción. Compras debe configurarlo en la lista de artículos." },
            { problema: "El remito no toma la forma de pago de la O.C.", solucion: "En Tipo de documento → Remito de proveedores, habilitar «Generar vencimientos». Al registrar, Abastecimiento solo confirma la forma de pago que aparece." }
          ],
          relacionados: ["fecha-entrega", "rectificar-kg", "niveles-aceptacion"],
          fuente: "Págs. 146–153, 263, 289–290"
        },
        {
          id: "fecha-entrega",
          tarea: "Cargar bien las fechas del remito",
          ruta: "Compras y Almacén › Entregas Proveedores › Añadir",
          palabras: ["fecha de entrega", "fecha del remito", "plazo", "día 5", "sello"],
          noHacer: [],
          titulo: "Fechas en la recepción",
          tipo: "Procedimiento",
          resumen: "Qué fecha va en cada campo de la recepción y cuál es el plazo para cargar los remitos del mes.",
          responsable: "Abastecimiento",
          sectores: ["Compras", "Administración"],
          cuando: "En cada recepción de proveedor.",
          reglas: [
            "<b>Fecha de entrega</b> = el día que el material entró físicamente a la empresa (sello de ingreso), o el día que se procesa la recepción si no pasaron más de <b>48 h</b>.",
            "<b>Fecha del documento</b> = la fecha impresa en el remito del proveedor.",
            "Todos los remitos de un mes se cargan <b>antes del día 5 del mes siguiente</b>.",
            "Estas fechas alimentan la <i>Situación de órdenes de compra</i> (días hasta la recepción) y el cierre de Administración: una fecha mal cargada distorsiona el cumplimiento del proveedor."
          ],
          pasos: [
            { titulo: "Fecha de entrega", texto: "En el campo <b>Fecha de Entrega</b> elegí la fecha del sello de ingreso de Cascio.", img: "img/fec-01-fecha-entrega.jpg" },
            { titulo: "Fecha del documento", texto: "En el campo <b>Fecha</b>, al lado del Nº de remito, cargá la fecha del remito del proveedor.", img: "img/fec-02-fecha-doc.jpg" },
            { titulo: "Dónde mirar cada fecha en el remito", texto: "Arriba a la derecha está la fecha del documento. El sello «CASCIO Y CIA. S.A.» indica la fecha de ingreso a la empresa.", img: "img/fec-03-remito.jpg" }
          ],
          errores: [],
          relacionados: ["recepcion-materiales"],
          fuente: "Págs. 153–154"
        },
        {
          id: "rectificar-kg",
          tarea: "Corregir los kilos de aluminio recibidos",
          ruta: "Compras y Almacén › Entregas Proveedores › Añadir › Recoger pedidos de proveedores › Rectificar con el total de la cantidad entregada del proveedor › KG",
          palabras: ["kilos", "peso real", "peso teórico", "aluminio", "perfiles", "diferencia de kg"],
          noHacer: [],
          titulo: "Rectificar kg de aluminio",
          tipo: "Instructivo",
          resumen: "Cómo ajustar en la recepción los kilos reales que entrega el proveedor cuando difieren del peso teórico de la O.C.",
          responsable: "Abastecimiento",
          sectores: ["Compras", "Administración"],
          cuando: "Al recibir perfiles de aluminio en kg, si el remito trae un total de kilos distinto al de la O.C.",
          reglas: [
            "La diferencia es normal: la O.C. calcula el <b>peso teórico</b> de catálogo y el proveedor entrega el <b>peso real</b> de extrusión, con la misma cantidad de perfiles.",
            "Se carga el total de kg que figura en el remito; el GEST reparte la diferencia entre las líneas.",
            "Si la diferencia supera el 10 % aplica la guía <i>Excedentes en la recepción</i>.",
            "Con la opción <b>Actualizar UM proveedor desde entrega</b> activa en la configuración, los kg reales actualizan la O.C., el almacén y los costos industriales (no cambian el peso del artículo)."
          ],
          pasos: [
            { titulo: "Cargar el remito y recoger pedidos", texto: "Igual que en una recepción normal: proveedor, Nº y fecha de remito, y <b>Recoger pedidos de proveedores</b>.", img: "img/kg-01-recoger.jpg" },
            { titulo: "Elegir la O.C. y abrir la rectificación", texto: "Con la O.C. tomada, en la pantalla de necesidades a recibir tocá <b>Rectificar con el total de la cantidad entregada del proveedor</b> y elegí <b>KG</b>.", img: "img/kg-02-boton-kg.jpg" },
            { titulo: "Ingresar los kg del remito", texto: "Abajo a la derecha está el peso total teórico. En la celda que está en cero escribí los <b>kg totales del remito</b> y tocá el botón de la derecha de la celda.", img: "img/kg-03-ventana.jpg" },
            { titulo: "Revisar la distribución", texto: "El GEST reparte la diferencia en cada línea: a la izquierda el peso teórico, a la derecha el real. Abajo muestra la variación en kg y en %.", img: "img/kg-04-distribucion.jpg" },
            { titulo: "Confirmar", texto: "Tocá <b>Confirmar</b> y registrá la entrega. La recepción queda con el peso real recibido.", img: "img/kg-05-confirmar.jpg" }
          ],
          errores: [],
          relacionados: ["recepcion-materiales", "niveles-aceptacion"],
          fuente: "Págs. 155–159"
        },
        {
          id: "niveles-aceptacion",
          tarea: "Qué hacer si llega material de más",
          ruta: "",
          palabras: ["excedente", "sobrante", "de más", "10 %", "autorización", "depósito en desuso"],
          noHacer: [{"texto": "No recibir más del 10 % por encima de lo pedido sin la autorización por correo del responsable de la O.C."}],
          titulo: "Excedentes en la recepción",
          tipo: "Procedimiento",
          resumen: "Qué hacer cuando el proveedor entrega más de lo pedido. Tope del 10 % y cómo se autoriza.",
          responsable: "Abastecimiento (recibe) · Compras (autoriza)",
          sectores: ["Compras", "Administración"],
          cuando: "Cuando la cantidad entregada supera la de la O.C., en kg o en unidades.",
          reglas: [
            "Se puede recibir hasta un <b>10 % más</b> de lo pedido sin autorización. Ej.: pedí 100 kg → recibo hasta 110 kg.",
            "Para recibir más del 10 % hace falta la autorización del <b>responsable de la O.C.</b>",
            "La autorización se pide por correo con Nº de remito, proveedor y cantidades de cada artículo.",
            "Si se niega: se recibe todo, el excedente entra al <b>Depósito en desuso</b> y después se devuelve al proveedor.",
            "Si se quiere quedar el excedente: Compras genera una <b>O.C. aparte</b> por esa cantidad."
          ],
          pasos: [
            { titulo: "Detectar el excedente", texto: "Al controlar cantidades en la recepción, comparar lo entregado contra la O.C." },
            { titulo: "Pedir autorización", texto: "Si supera el 10 %, enviar correo al responsable de la O.C. con Nº de remito, proveedor y cantidades a modificar." },
            { titulo: "El comprador decide", texto: "Antes de autorizar, el comprador revisa: ¿hay un acuerdo con el proveedor por el excedente? ¿Cuánto tiempo se va a guardar el material (hasta que termine la obra)? ¿Qué cantidad es? ¿El proveedor sabe lo que va a hacer Cascio?" },
            { titulo: "Registrar según la respuesta", texto: "<b>Autorizado:</b> O.C. aparte por el excedente y recepción contra esa O.C. <b>No autorizado:</b> excedente al Depósito en desuso y devolución con Remito Cascio." }
          ],
          errores: [],
          relacionados: ["rectificar-kg", "devolucion-proveedor"],
          fuente: "Págs. 184–185"
        },
        {
          id: "devolucion-proveedor",
          tarea: "Devolver material a un proveedor",
          ruta: "Home › Documentos › Remito Cascio › Añadir",
          palabras: ["devolución", "devolver", "remito de salida", "material defectuoso", "rechazo", "reposición"],
          noHacer: [{"texto": "No hacer el remito de devolución antes de que Compras desvincule las necesidades, si se va a comprar a otro proveedor."}],
          titulo: "Devolución a proveedor",
          tipo: "Instructivo",
          resumen: "Cómo devolver material defectuoso, equivocado o no pedido con un Remito Cascio, y cómo queda la necesidad para la reposición.",
          responsable: "Abastecimiento",
          sectores: ["Compras", "Producción", "Administración"],
          cuando: "Lo antes posible, apenas se detecta el problema (en la recepción o en producción).",
          reglas: [
            "Se devuelve todo lo que entró al GEST con remito y O.C., o lo que está en el almacén.",
            "La devolución se hace siempre con <b>Remito Cascio</b>, justificante <b>Devolución Proveedor</b>.",
            "Si el material ya se pasó al depósito de producción, usar el justificante <b>Devolución Proveedor Producción</b>.",
            "Después de la devolución, las necesidades de la carpeta vuelven a pendientes. <b>Compras</b> genera una O.C. nueva con <b>costo 0</b> por la reposición y la envía junto con el remito.",
            "Si se va a comprar a otro proveedor, Compras primero <b>desvincula</b> las necesidades de la O.C. original; recién después se hace el remito de devolución."
          ],
          pasos: [
            { titulo: "Crear el Remito Cascio", texto: "En <b>Home → Documentos</b>, carpeta <b>Remito Cascio</b>, tocá <b>Añadir</b>.", img: "img/dev-01-documentos.jpg" },
            { titulo: "Datos y justificante", texto: "Cargá el <b>Nº del remito preimpreso</b> y el <b>proveedor</b>. En <b>Justificante documento</b> elegí <b>Devolución Proveedor</b>, confirmá y guardá.", img: "img/dev-02-justificante.jpg" },
            { titulo: "Tomar del almacén", texto: "Tocá <b>Tomar Almacén</b>. Elegí <b>Seleccionar almacenes</b>, el depósito, la categoría y la serie para encontrar el material.", img: "img/dev-03-tomar-almacen.jpg" },
            { titulo: "Seleccionar e importar", texto: "Marcá las necesidades a devolver, revisá la cantidad a retirar y tocá <b>Importar</b>. Guardá.", img: "img/dev-04-importar.jpg" },
            { titulo: "Imprimir", texto: "Imprimí eligiendo <b>Remito X Proveedor</b> sobre el talonario preimpreso. Si hace falta ajustar al formulario, se puede exportar a .xlsx." },
            { titulo: "Avisar a Compras", texto: "Compras genera la O.C. de reposición con costo 0 y la manda al proveedor junto con el remito de devolución." }
          ],
          errores: [
            { problema: "Después del remito de devolución las necesidades no quedan en rojo (pendientes).", solucion: "Pasa cuando entró más material del que pedía la carpeta: el remito descarga primero lo que sobra. Sacar el excedente al stock y recién después hacer el remito de salida." },
            { problema: "Material no pedido o que no es típico del almacén.", solucion: "Ingreso manual al stock de libre disponibilidad con el remito del proveedor (descripción libre si el artículo no existe) y luego sacarlo con Remito Cascio, con observación en Notas. Solo para estos casos." }
          ],
          relacionados: ["niveles-aceptacion", "recepcion-materiales"],
          fuente: "Págs. 166–183"
        }
      ]
    },

    /* ---------- MÓDULOS EN PREPARACIÓN (se activan al cargarles guías) ---------- */
    { id: "inicio", titulo: "Inicio y navegación", descripcion: "Acceso por escritorio remoto, empresas Cascio y Demo, módulos del sistema.", paginas: "19–20", guias: [] },
    { id: "carpetas", titulo: "Carpetas y estados", descripcion: "Tipos de carpetas, codificación, emisión y cambios de estado.", paginas: "6–19, 55–56", guias: [] },
    { id: "articulos", titulo: "Artículos y variantes", descripcion: "Proveedores, variantes, fórmulas, lista de componentes.", paginas: "58–81", guias: [] },
    { id: "asignaciones", titulo: "Asignación de stock", descripcion: "Asignación, reasignación, carpetas de acopio -0, desplacado.", paginas: "36–54", guias: [] },
    { id: "ordenes-compra", titulo: "Órdenes de compra", descripcion: "Cotizaciones, generación, autorizaciones y cancelación.", paginas: "107–124", guias: [] },
    { id: "almacen", titulo: "Almacén y stock", descripcion: "Reajuste de existencia, inventario, situación de almacén, etiquetas.", paginas: "97–145", guias: [] },
    { id: "produccion", titulo: "Producción", descripcion: "Entregas, inicio y fin de producción, horas hombre, retales.", paginas: "189–223", guias: [] },
    { id: "remitos", titulo: "Remitos Cascio", descripcion: "Justificantes, estados, configuración e impresión.", paginas: "161–165, 186–188, 301–307", guias: [] },
    { id: "acopios", titulo: "Acopios y procesos en terceros", descripcion: "Alta de acopio, desacopio, recubrimientos.", paginas: "224–243", guias: [] },
    { id: "facturas", titulo: "Facturas y pagos", descripcion: "Factura de proveedor, anticipos, estado de pago, facturación.", paginas: "256–281", guias: [] },
    { id: "errores", titulo: "Errores frecuentes", descripcion: "Problemas conocidos del GEST y cómo resolverlos.", paginas: "285–316", guias: [] }
  ]
};

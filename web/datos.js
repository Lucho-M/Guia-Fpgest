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

   CÓMO ACTIVAR UN MÓDULO "PRÓXIMAMENTE"
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
  version: "0.7",
  actualizado: "12/11/2026",
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
      { titulo: "Módulo Órdenes de compra", estado: "hecha", detalle: "Revisar la carpeta, cotizar, emitir, autorizar y cancelar.", pedido: "Compras" },
      { titulo: "Módulos Producción y Despacho", estado: "hecha", detalle: "Entrega de material, inicio y fin de producción, horas hombre, retales, remito interno, remito a obra y anulación." },
      { titulo: "Guía ordenada por el proceso", estado: "hecha", detalle: "Módulos y tareas numerados en el orden en que avanza una carpeta, con paso anterior y siguiente." },
      { titulo: "Fletes y transporte en Compras", estado: "planificada", detalle: "Cómo imputar las horas de transporte a las carpetas." }
    ]
  },

  /* GLOSARIO: cómo le decimos en la oficina / cómo figura en el GEST.
     El buscador lo usa: quien busca "recepción" encuentra "Entregas Proveedores". */
  glosario: [
    { decimos: "Recepción", gest: "Entregas Proveedores", ruta: "Compras y Almacén › Entregas Proveedores" },
    { decimos: "Carpeta", gest: "Pedido", ruta: "Home › Pedidos" },
    { decimos: "Stock libre", gest: "No hay ningún contrato asociado", ruta: "Compras y Almacén › Situación de Almacén" },
    { decimos: "Remito de salida", gest: "Remito Cascio", ruta: "Home › Documentos › Remito Cascio" },
    { decimos: "Cotización", gest: "Propuesta de pedido", ruta: "Home › Pedidos › abrir la carpeta › Ordenes de Compra › Propuestas de pedido" },
    { decimos: "Elegir proveedor y precio", gest: "Asociar proveedores", ruta: "Home › Pedidos › abrir la carpeta › Necesidades › Asociar proveedores" },
    { decimos: "Entregar material a producción", gest: "Operación de almacén SHIFT", ruta: "Compras y Almacén › Operaciones de Almacén › Añadir › SHIFT" },
    { decimos: "Empezar a fabricar", gest: "Inicio producción", ruta: "Gestión Pedidos › Inicio producción" },
    { decimos: "Terminar la carpeta en el taller", gest: "Fin producción", ruta: "Home › Fin producción" },
    { decimos: "Horas hombre", gest: "Relaciones de Trabajo", ruta: "Planificación y Control › Relaciones de Trabajo" },
    { decimos: "Pasar a despacho", gest: "Remito Interno Despacho", ruta: "Home › Documentos › Remito Interno Despacho" },
    { decimos: "Retales / recortes", gest: "Operación de almacén CARGA", ruta: "Compras y Almacén › Operaciones de Almacén › Añadir › CARGA" }
  ],

  /* COLOR DE CADA SECTOR: se usa en los botones de sector, en las tareas y en las etiquetas.
     Para cambiar uno, reemplazá el código de color (se puede elegir en https://htmlcolorcodes.com/es/). */
  coloresSector: {
    "Cómputos": "#4aa3e8",                 // celeste
    "Órdenes de Fabricación": "#2dd4bf",   // turquesa
    "Abastecimiento": "#f5c518",           // amarillo
    "Compras": "#f28c28",                  // naranja
    "Producción": "#3fb950",               // verde
    "Despacho": "#a371f7",                 // violeta
    "Administración": "#e879a8"            // rosa
  },

  sectores: ["Cómputos", "Órdenes de Fabricación", "Abastecimiento", "Compras", "Producción", "Despacho", "Administración"],

  modulos: [
    /* ---------- ORDEN DEL PROCESO: los módulos se muestran numerados en este orden ---------- */
    { id: "inicio", titulo: "Inicio y navegación", descripcion: "Acceso por escritorio remoto, empresas Cascio y Demo, módulos del sistema.", paginas: "19–20", guias: [] },
    { id: "carpetas", titulo: "Carpetas y estados", descripcion: "Tipos de carpetas, codificación, emisión y cambios de estado.", paginas: "6–19, 55–56", guias: [] },
    { id: "articulos", titulo: "Artículos y variantes", descripcion: "Proveedores, variantes, fórmulas, lista de componentes.", paginas: "58–81", guias: [] },
    { id: "asignaciones", titulo: "Asignación de stock", descripcion: "Asignación, reasignación, carpetas de acopio -0, desplacado.", paginas: "36–54", guias: [] },
    {
      id: "ordenes-compra",
      titulo: "Órdenes de compra",
      descripcion: "Revisar la carpeta, pedir cotizaciones, emitir, autorizar y cancelar órdenes de compra.",
      paginas: "107–124",
      guias: [
        {
          id: "preparar-carpeta-compras",
          tarea: "Revisar una carpeta antes de comprar",
          ruta: "Home › Pedidos › Carpetas › abrir la carpeta › Necesidades",
          palabras: ["necesidades", "descomponer", "lista de componentes", "crudo", "tratamiento", "pendientes", "situación del artículo"],
          noHacer: [
            { texto: "No descomponer el aluminio que dice <b>CRUDO</b>: no lleva tratamiento." },
            { texto: "No agregar ni modificar necesidades de la carpeta. Eso lo hace solo <b>Órdenes de Fabricación</b>." }
          ],
          titulo: "Identificar las necesidades",
          tipo: "Instructivo",
          resumen: "Qué controlar en una carpeta cuando llega a Compras y cómo descomponer las necesidades que llevan tratamiento, para saber qué hay que comprar.",
          responsable: "Compras",
          sectores: ["Órdenes de Fabricación", "Abastecimiento"],
          cuando: "Cuando Órdenes de Fabricación avisa por correo que la carpeta está lista para procesar.",
          reglas: [
            "Se descompone la lista de componentes de <b>aluminio</b> y de <b>corte y plegado</b> siempre que tengan un tratamiento superficial.",
            "Si una necesidad de aluminio o de corte y plegado no dice ni tratamiento ni CRUDO, pedir a Órdenes de Fabricación que agregue el atributo antes de seguir.",
            "Si el proveedor aporta el material y hace todos los servicios, no se descompone: se cambia el precio por artículo.",
            "Corte y plegado: los desarrollos especiales de la obra tienen el plano en <b>Anexos</b> de la carpeta; los plegados estándar lo tienen en el anexo del artículo."
          ],
          pasos: [
            { titulo: "Abrir la carpeta", texto: "En <b>Home → Pedidos</b>, carpeta <b>Carpetas</b>, abrí la carpeta que avisó Órdenes de Fabricación y entrá a la solapa <b>Necesidades</b>.", img: "img/oc-01-necesidades.jpg" },
            { titulo: "Controlar los atributos", texto: "Abrí cada categoría y revisá que el aluminio y el corte y plegado tengan su <b>tratamiento</b> (o CRUDO) y la <b>longitud</b>.", img: "img/oc-02-atributos.jpg" },
            { titulo: "Descomponer la lista de componentes", texto: "En la barra de la solapa Necesidades tocá <b>Descomponer lista de componentes base</b>. Marcá las necesidades que llevan tratamiento y tocá <b>Confirmar</b>.", img: "img/oc-03-descomponer.jpg" },
            { titulo: "Verificar el resultado", texto: "Las necesidades descompuestas muestran un ícono nuevo. Al seleccionarlas, abajo se ve el artículo y su <b>RECUB</b> (el recubrimiento) como líneas separadas.", img: "img/oc-04-componentes.jpg" },
            { titulo: "Ver todo lo pendiente", texto: "En <b>Compras y Almacén → Situación Artículo</b>, filtrá por categoría y tocá <b>Generar Datos</b>. La solapa <b>Situaciones de requerimiento</b> muestra lo pendiente. Se puede seleccionar y copiar a Excel con Ctrl+C para trabajar las cotizaciones." }
          ],
          errores: [],
          relacionados: ["pedir-cotizaciones", "emitir-orden-compra"],
          fuente: "Págs. 108–112"
        },
        {
          id: "pedir-cotizaciones",
          tarea: "Pedir cotizaciones a proveedores",
          ruta: "Home › Pedidos › abrir la carpeta › Ordenes de Compra › Propuestas de pedido",
          palabras: ["cotización", "cotizar", "presupuesto de proveedor", "propuesta de pedido", "comparar precios"],
          noHacer: [],
          titulo: "Propuestas de pedido",
          tipo: "Instructivo",
          resumen: "Cómo armar desde la carpeta el pedido de cotización para uno o varios proveedores y seguir en qué estado está.",
          responsable: "Compras",
          sectores: ["Administración"],
          cuando: "Antes de emitir la orden de compra, cuando hay que comparar proveedores.",
          reglas: [
            "Para elegir proveedor se compara: <b>precio</b>, <b>tiempo de entrega</b>, <b>modalidad de entrega</b> y <b>forma de pago</b>.",
            "El estado de la cotización se actualiza a mano: Por enviar, Enviado, Recibido o Confirmado."
          ],
          pasos: [
            { titulo: "Abrir Propuestas de pedido", texto: "Dentro de la carpeta, solapa <b>Ordenes de Compra</b> → <b>Propuestas de pedido</b>, tocá <b>Autocomposición de propuestas de pedido</b>.", img: "img/oc-05-propuestas.jpg" },
            { titulo: "Elegir qué cotizar", texto: "Marcá las necesidades que querés cotizar." },
            { titulo: "Elegir los proveedores", texto: "En la solapa <b>Proveedores</b>, pasá a la lista de la derecha los proveedores a los que se les va a pedir precio y tocá <b>Continuar</b>." },
            { titulo: "Completar el documento", texto: "Se genera una propuesta por proveedor. Completá <b>Enviado mediante</b> y <b>Estado</b>. En las solapas de abajo se agregan anexos y textos.", img: "img/oc-06-propuesta-estado.jpg" },
            { titulo: "Seguir el estado", texto: "A medida que avanza, cambiá el <b>Estado</b> de la propuesta para saber cuáles faltan responder." }
          ],
          errores: [],
          relacionados: ["preparar-carpeta-compras", "emitir-orden-compra"],
          fuente: "Págs. 113–114"
        },
        {
          id: "emitir-orden-compra",
          tarea: "Emitir una orden de compra",
          ruta: "Home › Pedidos › abrir la carpeta › Necesidades › Asociar proveedores › Manual",
          palabras: ["orden de compra", "O.C.", "OC", "comprar", "asociar proveedores", "precio", "emitir", "autocomposición"],
          noHacer: [
            { texto: "No emitir una orden de compra con precio 0, salvo la de reposición por una devolución." },
            { texto: "No dejar la orden sin <b>fecha de entrega</b>: sin esa fecha no se puede medir si el proveedor cumple." }
          ],
          titulo: "Generar órdenes de compra",
          tipo: "Instructivo",
          resumen: "Cómo cargar el proveedor y el precio acordado en las necesidades de la carpeta, generar la orden de compra y dejarla emitida.",
          responsable: "Compras",
          sectores: ["Abastecimiento", "Administración"],
          cuando: "Cuando ya está elegido el proveedor de cada necesidad.",
          reglas: [
            "Campos obligatorios de la orden: <b>fecha de entrega</b>, <b>forma de pago</b>, <b>cantidad y U.M. del proveedor</b> y <b>precio mayor a 0</b>.",
            "Cada artículo tiene que tener <b>Proveedor</b>, <b>U.M.</b> y <b>Fórmula de conv.</b>; si falta alguno, no deja guardar.",
            "El artículo tiene que tener cargado su <b>almacén</b> de destino. Si no, Abastecimiento tiene errores al recibir.",
            "Al imprimir o guardar, la orden pasa de <b>Por emitir</b> a <b>Emitido</b>. Emitida, ya no se pueden cambiar las necesidades."
          ],
          pasos: [
            { titulo: "Abrir Asociar proveedores", texto: "En la solapa <b>Necesidades</b> de la carpeta tocá <b>Asociar proveedores</b> y elegí <b>Manual</b>.", img: "img/oc-07-asociar-manual.jpg" },
            { titulo: "Cargar proveedor y precio", texto: "En cada línea completá según la cotización: <b>Proveedor</b>, <b>U.M.</b>, <b>Fórmula conv.</b>, <b>Precio</b> y <b>Descuento</b>. Con clic derecho → <b>Heredar datos</b> se copia la configuración de otro proveedor que ya tenga el artículo." },
            { titulo: "Actualizar precios y guardar", texto: "Tildá <b>Actualizar precios en carpeta</b> y tocá <b>Guardar</b>. Con el tilde, el precio se actualiza también en el artículo; sin el tilde, solo dentro de esta carpeta.", img: "img/oc-08-actualizar-precio.jpg" },
            { titulo: "Generar la orden", texto: "En la solapa <b>Ordenes de Compra</b> de la carpeta, marcá lo que querés pedir y tocá <b>Autocomposición de órdenes de compra</b>. Se arma una orden por proveedor." },
            { titulo: "Abrir la orden generada", texto: "En <b>Compras y Almacén → Ordenes de Compra</b>, la orden aparece en <b>Por Emitir</b>. Abrila.", img: "img/oc-10-lista.jpg" },
            { titulo: "Completar y emitir", texto: "Cargá la <b>fecha de entrega</b> y la <b>forma de pago</b>, y agregá anexos o textos para el proveedor si hacen falta. Si el total supera el límite de compra directa, primero hay que autorizarla. Después <b>imprimí o guardá</b>: queda en <b>Emitido</b>." }
          ],
          errores: [
            { problema: "No deja guardar al asociar proveedores.", solucion: "A algún artículo le falta Proveedor, U.M. o Fórmula de conv. Completar los tres en todas las líneas." },
            { problema: "Abastecimiento avisa que una línea llega sin almacén en la recepción.", solucion: "Cargar el almacén de destino en la ficha del artículo, solapa Almacén." }
          ],
          relacionados: ["autorizar-orden-compra", "estados-orden-compra", "recepcion-materiales"],
          fuente: "Págs. 114–118"
        },
        {
          id: "autorizar-orden-compra",
          tarea: "Autorizar una orden de compra",
          ruta: "Compras y Almacén › Ordenes de Compra › Autorización emisión",
          palabras: ["autorización", "autorizar", "límite de compra", "jefe de compras", "dirección", "aprobar"],
          noHacer: [
            { texto: "No cambiar a mano el estado de una orden que ya tiene autorizaciones: se borran y hay que autorizar de nuevo. Si hace falta, lo hace el <b>jefe de Compras</b>." },
            { texto: "No autorizar una orden que no esté en estado <b>Por emitir</b>." }
          ],
          titulo: "Autorizaciones de O.C.",
          tipo: "Procedimiento",
          resumen: "Cuándo una orden de compra necesita autorización, quién la da y cómo se registra en el GEST.",
          responsable: "Compras · Dirección",
          sectores: ["Administración"],
          cuando: "Cuando el total de la orden supera el límite de compra directa.",
          reglas: [
            "Hasta el límite definido por la empresa, el comprador emite directo.",
            "Por encima del límite hace falta <b>autorización compuesta</b>: autoriza el jefe de Compras y además un director.",
            "La autorización se hace solo con la orden en estado <b>Por emitir</b>.",
            "Los límites y quién autoriza se configuran en <b>Servicios → Autorización órdenes a proveedor</b> (grupos y reglas)."
          ],
          pasos: [
            { titulo: "Seleccionar la orden", texto: "En <b>Compras y Almacén → Ordenes de Compra</b>, marcá la orden o las órdenes a autorizar." },
            { titulo: "Autorizar", texto: "Tocá <b>Autorización emisión</b>. En la columna <b>Autorizado</b> queda el usuario y la fecha.", img: "img/oc-12-autorizar.jpg" },
            { titulo: "Si es compuesta, falta la segunda firma", texto: "La orden queda en espera hasta que autorice también la otra persona. Recién ahí se puede emitir." },
            { titulo: "Dónde se configuran los límites", texto: "En <b>Servicios → Autorización órdenes a proveedor</b> se definen los grupos de usuarios y los valores mínimo y máximo de cada regla.", img: "img/oc-11-autorizacion-menu.jpg" }
          ],
          errores: [
            { problema: "La orden perdió las autorizaciones que ya tenía.", solucion: "Alguien le cambió el estado a mano. Volver a ponerla en Por emitir y autorizarla de nuevo." }
          ],
          relacionados: ["emitir-orden-compra", "estados-orden-compra"],
          fuente: "Págs. 119–121"
        },
        {
          id: "estados-orden-compra",
          tarea: "Entender los estados y cancelar una orden de compra",
          ruta: "Compras y Almacén › Ordenes de Compra",
          palabras: ["estado", "por emitir", "emitido", "tramitado", "cancelado", "cancelar", "anular", "situación órdenes de compra"],
          noHacer: [
            { texto: "No usar el estado <b>Confirmado</b>." },
            { texto: "No cancelar una orden vacía: se <b>elimina</b> el documento." },
            { texto: "No eliminar los requerimientos de una orden cancelada." }
          ],
          titulo: "Estados de O.C. y cancelación",
          tipo: "Procedimiento",
          resumen: "Qué significa cada estado de una orden de compra, qué se puede hacer en cada uno y cómo se cancela.",
          responsable: "Compras",
          sectores: ["Abastecimiento", "Administración"],
          cuando: "Cada vez que se consulta o se cambia el estado de una orden.",
          reglas: [
            "<b>Por emitir:</b> el comprador la está armando o espera autorización. Se pueden cambiar cantidades, precios, fechas y forma de pago.",
            "<b>Emitido:</b> impresa, autorizada y lista para enviar al proveedor. No se cambian las necesidades. Abastecimiento ya puede recibir contra ella.",
            "<b>Tramitado parcial:</b> el proveedor entregó una parte; quedan líneas pendientes.",
            "<b>Tramitado total:</b> el proveedor entregó todo.",
            "<b>Cancelado:</b> la compra se cancela y las necesidades vuelven a quedar pendientes en la carpeta.",
            "Para seguir entregas y demoras por proveedor: <b>Compras y Almacén → Situación órdenes de compra</b>."
          ],
          pasos: [
            { titulo: "Abrir la orden", texto: "En <b>Compras y Almacén → Ordenes de Compra</b>, abrí la orden que hay que cancelar." },
            { titulo: "Cambiar el estado", texto: "En el campo <b>Estado</b> elegí <b>Cancelado</b> y guardá." },
            { titulo: "Verificar la carpeta", texto: "Las necesidades de la carpeta quedan otra vez pendientes, listas para una orden nueva." },
            { titulo: "Avisar", texto: "Si la orden ya estaba emitida, avisar al proveedor y a Abastecimiento para que no reciban contra ella." }
          ],
          errores: [
            { problema: "Una orden cancelada no aparece en Situación órdenes de compra.", solucion: "Se canceló vacía. Las órdenes vacías no se cancelan: se eliminan." }
          ],
          relacionados: ["emitir-orden-compra", "autorizar-orden-compra", "devolucion-proveedor"],
          fuente: "Págs. 108, 118, 121"
        }
      ]
    },
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
    { id: "acopios", titulo: "Acopios y procesos en terceros", descripcion: "Alta de acopio, desacopio, recubrimientos.", paginas: "224–243", guias: [] },
    { id: "almacen", titulo: "Almacén y stock", descripcion: "Reajuste de existencia, inventario, situación de almacén, etiquetas.", paginas: "97–145", guias: [] },
    {
      id: "produccion",
      titulo: "Producción",
      descripcion: "Entregar material, iniciar y finalizar la producción, cargar horas hombre y devolver retales y sobrantes.",
      paginas: "189–223",
      guias: [
        {
          id: "entregar-material-produccion",
          tarea: "Entregar material a producción",
          ruta: "Compras y Almacén › Operaciones de Almacén › Añadir › SHIFT",
          palabras: ["entrega a producción", "shift", "pasar material al taller", "depósito de producción", "005", "movimiento de almacén"],
          noHacer: [{ texto: "No entregar material tomado de <b>No hay ningún contrato asociado</b> (stock libre). Pasa al depósito de producción pero sigue figurando como libre y el stock queda mal. Primero se asigna a la carpeta." }],
          titulo: "Entregas a producción manual",
          tipo: "Instructivo",
          resumen: "Cómo pasar en el GEST el material de una carpeta desde los depósitos de Abastecimiento al Depósito de Producción.",
          responsable: "Abastecimiento",
          sectores: ["Producción", "Compras"],
          cuando: "Cuando Producción pide el material de una carpeta (todo junto o por etapas, según el espacio que tenga el taller).",
          reglas: [
            "Todo material que se entrega tiene que estar <b>asignado a la carpeta</b> antes del movimiento.",
            "El almacén de destino es siempre <b>005 - Deposito de produccion</b>.",
            "Si el taller no tiene lugar seguro para todo el material, la entrega se hace escalonada: Producción avisa a Abastecimiento lo que necesita en cada etapa."
          ],
          pasos: [
            { titulo: "Crear la operación SHIFT", texto: "En <b>Compras y Almacén</b> elegí <b>Operaciones de Almacén</b>, tocá <b>Añadir</b> y marcá el tipo de operación <b>SHIFT</b>. Después volvé a tocar <b>Añadir</b> para sumar ítems.", img: "img/pro-01-shift.jpg" },
            { titulo: "Elegir las necesidades de la carpeta", texto: "Filtrá por la carpeta (columna <b>Pedido</b>), tildá cada ítem en <b>Checked</b> y escribí la <b>Cantidad para sacar</b>. Tocá <b>Importar</b>.", img: "img/pro-02-necesidades.jpg" },
            { titulo: "Elegir el almacén de destino", texto: "En los datos de destino, en <b>Almacén de destino</b>, activá el filtro y elegí <b>005 - Deposito de produccion</b>. Guardá y salí.", img: "img/pro-03-destino.jpg" },
            { titulo: "Verificar y guardar", texto: "Revisá que las cantidades y el destino estén bien y tocá <b>Guardar</b>." }
          ],
          errores: [
            { problema: "El material está en el depósito de producción pero sigue apareciendo como stock libre.", solucion: "Se entregó desde «No hay ningún contrato asociado». Asignarlo a la carpeta (guía de asignación de stock) y avisar a Producción antes de iniciar o finalizar la producción." },
            { problema: "No aparece la necesidad para entregar.", solucion: "La necesidad no está asignada a la carpeta o todavía no se recibió. Revisar la recepción y la asignación con Compras." }
          ],
          relacionados: ["iniciar-produccion", "finalizar-produccion"],
          fuente: "Págs. 191–193"
        },
        {
          id: "iniciar-produccion",
          tarea: "Iniciar la producción de una carpeta",
          ruta: "Gestión Pedidos › Inicio producción",
          palabras: ["inicio de producción", "empezar a fabricar", "en producción", "arrancar carpeta", "lanzamiento"],
          noHacer: [
            { texto: "No tildar <b>materiales</b> en el inicio. En el inicio se eligen solo los <b>productos terminados</b>; los materiales se descargan en el fin de producción." },
            { texto: "No iniciar productos que todavía no empezaron a fabricarse en el taller. El sistema tiene que mostrar lo que pasa en el taller, ni antes ni después." }
          ],
          titulo: "Inicio de producción",
          tipo: "Instructivo",
          resumen: "Cómo registrar que una carpeta empezó a fabricarse. La carpeta pasa al estado «En Producción».",
          responsable: "Producción",
          sectores: ["Abastecimiento", "Compras", "Órdenes de Fabricación", "Administración"],
          cuando: "El día que el taller empieza a fabricar los productos de la carpeta.",
          reglas: [
            "La carpeta tiene que estar en <b>En Proceso de Compras</b> (material incompleto) o <b>Listo para producción</b> (material completo).",
            "Si falta material, se inicia solo con autorización explícita y documentada, y con el compromiso de que el faltante llega antes de que el taller lo necesite.",
            "Todos los productos que se inician juntos llevan la <b>misma fecha de inicio</b>.",
            "Hay que elegir al menos <b>1 producto terminado</b>."
          ],
          pasos: [
            { titulo: "Abrir Inicio producción", texto: "En la solapa <b>Gestión Pedidos</b> elegí la herramienta <b>Inicio producción</b>.", img: "img/ini-01-herramienta.jpg" },
            { titulo: "Elegir la carpeta", texto: "Escribí el código de la carpeta, desplegá la lista y bajala a <b>Pedidos seleccionados</b> con doble clic o con los botones verde/rojo. Tocá <b>Siguiente</b>.", img: "img/ini-02-pedido.jpg" },
            { titulo: "Elegir los productos a fabricar", texto: "Por defecto vienen todos tildados. Destildá todo y marcá solo los productos terminados que se empiezan a fabricar. Revisá la <b>Fecha</b> y tocá <b>Siguiente</b>.", img: "img/ini-03-productos.jpg" },
            { titulo: "No tildar materiales y confirmar", texto: "En la pantalla de materiales <b>no selecciones nada</b> y tocá <b>Confirmar</b>.", img: "img/ini-04-materiales.jpg" },
            { titulo: "Controlar el estado", texto: "La carpeta pasa sola a <b>En Produccion</b>. Avisá por correo a Compras, Abastecimiento, Ingeniería y Facturación.", img: "img/ini-05-estado.jpg" }
          ],
          errores: [
            { problema: "La carpeta no aparece en Inicio producción.", solucion: "No está en «En Proceso de Compras» ni en «Listo para producción». Revisar el estado de la carpeta con Órdenes de Fabricación." },
            { problema: "Se inició un producto por error.", solucion: "En la carpeta usar «Remover fecha de inicio/fin» solo sobre ese producto (ver la guía para corregir un fin de producción)." }
          ],
          relacionados: ["entregar-material-produccion", "cargar-horas-hombre", "finalizar-produccion"],
          fuente: "Págs. 193–198 y Checklist operativo de Producción"
        },
        {
          id: "cargar-horas-hombre",
          tarea: "Cargar las horas hombre de producción",
          ruta: "Planificación y Control › Relaciones de Trabajo › Importar de archivo csv",
          palabras: ["horas hombre", "hh", "relaciones de trabajo", "csv", "imputar horas", "actividades"],
          noHacer: [{ texto: "No cargar las horas consumidas a mano: siempre por importación de CSV." }],
          titulo: "Imputación de horas hombre productivas",
          tipo: "Instructivo",
          resumen: "Cómo importar al GEST las horas trabajadas por cada persona en cada carpeta y actividad.",
          responsable: "Producción",
          sectores: ["Administración", "Órdenes de Fabricación"],
          cuando: "Con cada informe de horas. Siempre se informa el total de la nómina.",
          reglas: [
            "Solo se pueden cargar horas de personas dadas de alta en la nómina del GEST.",
            "Las horas cargadas en el GEST tienen que dar igual al total liquidado por RR. HH.",
            "El GEST no avisa si se cargan horas de más, personas duplicadas o carpetas sin inicio: controlarlo antes de importar.",
            "Las horas <b>programadas</b> de la carpeta las carga solo quien emite la carpeta (Órdenes de Fabricación o Cómputos)."
          ],
          pasos: [
            { titulo: "Armar el archivo CSV", texto: "Usá la <b>Plantilla de importación de H.H.</b> Cada celda entre comillas y separadas por coma, 12 columnas en este orden: usuario que carga · nº de informe (el siguiente al último cargado) · código de obra · apellido · actividad · fecha <code>año|mes|día|hora|minuto</code> · vacía · tiempo en segundos (32400 = 9 h) · vacía · tipo de hora (O ordinaria, S extra) · actividad cerrada (vacío = no se cierra) · notas.<br>Ejemplo: <code>\"USUARIO\",\"11\",\"38050-8\",\"PEREZ\",\"CORTE\",\"2021|06|07|07|15\",\" \",\"32400\",\" \",\"O\",\" \",\"NOTA\"</code>" },
            { titulo: "Abrir Relaciones de Trabajo", texto: "En la solapa <b>Planificación y Control</b> elegí <b>Relaciones de Trabajo</b>.", img: "img/hh-01-relaciones.jpg" },
            { titulo: "Importar el archivo", texto: "Tocá <b>Importar de archivo csv</b>, elegí el archivo y tocá <b>Abrir</b>.", img: "img/hh-02-importar.jpg" },
            { titulo: "Revisar la carga", texto: "Abrí el informe con <b>Modificar</b> y controlá las líneas. Para borrar una carga completa: eliminá línea por línea y después eliminá el informe." }
          ],
          errores: [
            { problema: "Una persona no se puede cargar.", solucion: "No está en la nómina del GEST. Pedir a RR. HH. que la dé de alta y volver a importar." },
            { problema: "El total de horas no coincide con RR. HH.", solucion: "Buscar el informe en Contabilidad Industrial › Control de Gestión › Trabajos y Actividades, filtrar por período y corregir las líneas." }
          ],
          relacionados: ["iniciar-produccion", "finalizar-produccion"],
          fuente: "Págs. 207–213"
        },
        {
          id: "finalizar-produccion",
          tarea: "Finalizar la producción y descargar materiales",
          ruta: "Gestión Pedidos › Fin producción",
          palabras: ["fin de producción", "terminar carpeta", "descargar materiales", "producto terminado", "en depósito de despacho"],
          noHacer: [
            { texto: "No descargar materiales que no se usaron. Lo que sobra queda en el depósito de producción para devolverlo a Abastecimiento." },
            { texto: "No descargar consumo estimado: solo el consumo real." }
          ],
          titulo: "Fin de producción",
          tipo: "Instructivo",
          resumen: "Cómo dar de alta los productos terminados para despacho y descargar los materiales que realmente se consumieron.",
          responsable: "Producción",
          sectores: ["Abastecimiento", "Despacho", "Administración"],
          cuando: "Cuando terminan de fabricarse los productos (puede ser por producto o por grupo).",
          reglas: [
            "Solo se finalizan productos que tienen el inicio de producción hecho.",
            "Antes de confirmar: los materiales tienen que estar en el <b>Depósito de Producción</b> y Abastecimiento tiene que confirmar que los entregó.",
            "Al finalizar todos los productos (o el último), la carpeta pasa de <b>En Producción</b> a <b>En Depósito de Despacho</b>."
          ],
          pasos: [
            { titulo: "Abrir Fin producción y elegir la carpeta", texto: "En <b>Home</b> elegí <b>Fin producción</b>. Bajá la carpeta a <b>Pedidos seleccionados</b> y tocá <b>Siguiente</b>.", img: "img/fin-01-productos.jpg" },
            { titulo: "Elegir los productos terminados", texto: "Tildá los productos que se terminaron y controlá la columna <b>Cant. para terminar</b>. Tocá <b>Siguiente</b>.", img: "img/fin-02-necesidades.jpg" },
            { titulo: "Elegir los materiales consumidos", texto: "Tildá solo las necesidades que se usaron de verdad (o destildá las que no) y tocá <b>Confirmar</b>." },
            { titulo: "Controlar el depósito y el estado", texto: "En la situación de almacén, en <b>Deposito de Producción</b>, tiene que quedar solo lo que sobró. Revisá que la carpeta haya pasado a <b>En Depósito de Despacho</b>.", img: "img/fin-03-deposito.jpg" }
          ],
          errores: [
            { problema: "La carpeta no cambió a «En Depósito de Despacho».", solucion: "Quedaron productos sin finalizar. Repetir el fin de producción con los que faltan." },
            { problema: "Se finalizaron productos por error.", solucion: "Seguir la guía «Corregir un fin de producción mal hecho»." }
          ],
          relacionados: ["iniciar-produccion", "corregir-fin-produccion", "devolver-sobrantes", "remito-interno-despacho"],
          fuente: "Págs. 198–201 y Checklist operativo de Producción"
        },
        {
          id: "corregir-fin-produccion",
          tarea: "Corregir un fin de producción mal hecho",
          ruta: "Home › Pedidos › abrir la carpeta › Remover fecha de inicio/fin",
          palabras: ["error fin de producción", "deshacer", "remover fecha", "finalicé mal"],
          noHacer: [{ texto: "No borrar ni editar desde <b>Movimientos de almacén</b> si no es el paso indicado: lo que se borra ahí no se recupera." }],
          titulo: "Modificación fin de producción de productos terminados",
          tipo: "Instructivo",
          resumen: "Qué hacer, y en qué orden, cuando se finalizaron productos que no estaban terminados.",
          responsable: "Producción",
          sectores: ["Abastecimiento", "Despacho"],
          cuando: "Apenas se detecta el error, antes de que se despachen los productos.",
          reglas: [
            "Seguir los pasos <b>en este orden</b>.",
            "Si los productos de la operación todavía no se despacharon, se puede eliminar la operación completa y remover todas las fechas."
          ],
          pasos: [
            { titulo: "Buscar la fecha del fin", texto: "En la solapa <b>Artículos</b> buscá la fecha de fin de producción de las necesidades a corregir." },
            { titulo: "Eliminar los productos de la operación de carga", texto: "Buscá la operación de carga del fin de producción y eliminá los productos que no estaban terminados." },
            { titulo: "Remover las fechas", texto: "Dentro de la carpeta usá <b>Remover fecha de inicio/fin</b> solo en los productos finalizados por error." },
            { titulo: "Ajustar los que quedan", texto: "En los productos que se finalizaron junto con los erróneos, removés solo la fecha de <b>fin de producción</b>." },
            { titulo: "Volver a finalizar", texto: "Hacé de nuevo el fin de producción de los productos que sí tienen que quedar en el almacén." }
          ],
          errores: [],
          relacionados: ["finalizar-produccion"],
          fuente: "Págs. 202–205"
        },
        {
          id: "devolver-retales",
          tarea: "Devolver retales de aluminio",
          ruta: "Compras y Almacén › Operaciones de Almacén › Añadir › CARGA",
          palabras: ["retales", "scrap", "recortes", "sobrante de perfiles", "devolución de aluminio"],
          noHacer: [{ texto: "No mezclar retales de varias carpetas en una misma carga: <b>una carga por carpeta</b>." }],
          titulo: "Devolución retales de producción aluminio",
          tipo: "Instructivo",
          resumen: "Qué recortes de perfil se devuelven y cómo se cargan al almacén para volver a usarlos.",
          responsable: "Producción · Abastecimiento (hace la carga)",
          sectores: ["Compras", "Cómputos"],
          cuando: "Al terminar la carpeta o por etapas. Se devuelve todo el scrap de la carpeta, de corte y de armado.",
          reglas: [
            "Se devuelven: perfiles de carpintería de más de 1 m, mullions de fachada de más de 1,5 m, travesaños de fachada de más de 600 mm, ángulos de más de 300 mm, y vainas, pletinas, tubos, grampas y planchuelas de cualquier medida.",
            "Producción manda a Abastecimiento un Excel por carpeta con código, cantidad, descripción del tratamiento y medida, copiados del GEST.",
            "Abastecimiento hace la carga, la imprime y la hace firmar por Producción."
          ],
          pasos: [
            { titulo: "Armar el Excel de devolución", texto: "Una planilla por carpeta con <b>código</b>, <b>cantidad</b>, <b>tratamiento</b> y <b>medida</b>, tal como figuran en el GEST.", img: "img/ret-01-excel.jpg" },
            { titulo: "Crear la carga", texto: "En <b>Operaciones de Almacén</b> tocá <b>Añadir</b> y marcá <b>CARGA</b>. Cargá ítem por ítem con <b>Añadir</b> o importá el Excel con <b>Import / Export Datos</b>.", img: "img/ret-02-carga.jpg" },
            { titulo: "Completar las notas", texto: "En <b>Notas</b> escribí «Devoluciones de retales de producción carpeta XXXXX»." },
            { titulo: "Guardar, imprimir y archivar", texto: "Guardá, imprimí el justificante, hacelo firmar por Producción y guardalo en la carpeta <b>RETALES DE PRODUCCION</b> del servidor con el nombre <code>OP&lt;nº de operación&gt;-RETALES-&lt;carpeta&gt;</code>." }
          ],
          errores: [],
          relacionados: ["devolver-sobrantes", "finalizar-produccion"],
          fuente: "Págs. 214–221"
        },
        {
          id: "devolver-sobrantes",
          tarea: "Devolver sobrantes de producción al pañol",
          ruta: "Compras y Almacén › Operaciones de Almacén › Añadir › SHIFT",
          palabras: ["devolución a abastecimiento", "sobrantes", "pañol", "accesorios que sobran", "tornillería"],
          noHacer: [{ texto: "No devolver material dañado o incompleto, ni mezclar material de distintas carpetas." }],
          titulo: "Devolución producción a Abastecimiento pañol",
          tipo: "Instructivo",
          resumen: "Cómo devolver accesorios, tornillería, burletes, selladores y consumibles que no se usaron en la carpeta.",
          responsable: "Producción",
          sectores: ["Abastecimiento", "Compras"],
          cuando: "Cuando la obra o la etapa de la carpeta está terminada en producción.",
          reglas: [
            "En el fin de producción se descarga solo lo usado; lo que sobra queda libre en el <b>Depósito de Producción</b>.",
            "Se usa la operación <b>SHIFT</b>: actualiza la demanda inicial de la carpeta.",
            "Todas las devoluciones quedan anexadas en la carpeta de origen."
          ],
          pasos: [
            { titulo: "Ver qué quedó en el depósito", texto: "En la situación de almacén filtrá la carpeta en <b>Deposito de Producción</b>: son las necesidades libres para devolver.", img: "img/sob-01-deposito.jpg" },
            { titulo: "Hacer el movimiento", texto: "Creá una operación <b>SHIFT</b> desde el Depósito de Producción al depósito que corresponde de Abastecimiento." },
            { titulo: "Anexar y avisar", texto: "Guardá el PDF del movimiento, anexalo en la carpeta y avisá a Abastecimiento." }
          ],
          errores: [],
          relacionados: ["finalizar-produccion", "devolver-retales"],
          fuente: "Págs. 221–223"
        }
      ]
    },
    {
      id: "despacho",
      titulo: "Despacho y remitos",
      descripcion: "Pasar productos terminados a Despacho, emitir el remito a obra, anular remitos y seguir sus estados.",
      paginas: "161–165, 301–307",
      guias: [
        {
          id: "remito-interno-despacho",
          tarea: "Pasar productos terminados a Despacho",
          ruta: "Home › Documentos › Remito Interno Despacho › Añadir",
          palabras: ["remito interno", "pasar a despacho", "productos terminados", "packing list", "recapitulación de necesidades"],
          noHacer: [
            { texto: "No tomar productos que todavía están en el <b>Depósito de Producción</b>: solo los que figuran en <b>Deposito Producto Terminado</b>." },
            { texto: "No mezclar obras: <b>un remito interno por cliente (obra)</b>." },
            { texto: "No duplicar remitos de los mismos productos." }
          ],
          titulo: "Remito Interno Despacho",
          tipo: "Instructivo",
          resumen: "Cómo registrar el pase de productos terminados desde Producción al almacén de Despacho.",
          responsable: "Producción",
          sectores: ["Despacho", "Administración"],
          cuando: "Después del fin de producción, cuando los productos están listos para salir a obra.",
          reglas: [
            "Solo productos o necesidades de clase <b>Productos Terminados</b>, que entraron al almacén por inicio y fin de producción.",
            "Facturación aprueba el remito interno con su firma. Los envíos parciales a obra los aprueba la Dirección (coordinador general).",
            "Una vez entregado a Despacho no se agregan líneas, y una vez impreso no se eliminan.",
            "Va acompañado del <b>Packing List</b> (productos agrupados por paquete)."
          ],
          pasos: [
            { titulo: "Crear el documento", texto: "En <b>Home</b> elegí <b>Documentos</b>. En la columna izquierda buscá <b>Remito Interno Despacho</b> y tocá <b>Añadir</b>.", img: "img/rem-01-documentos.jpg" },
            { titulo: "Completar cliente y justificante", texto: "Cargá el <b>cliente</b> y el <b>Justificante documento</b>. Guardá sin cerrar." },
            { titulo: "Tomar la carpeta", texto: "Tocá <b>Tomar Documento</b> › <b>Filtro Pedidos</b>, buscá la carpeta de origen por código o referencia, confirmá y tocá <b>Aplicar</b>." },
            { titulo: "Elegir los productos", texto: "Desplegá la lista de la carpeta y tildá los productos que están en <b>Deposito Producto Terminado</b>. Si hace falta, corregí la <b>Cantidad a retirar</b>." },
            { titulo: "Referencia e importar", texto: "Abajo a la derecha, en <b>Referencia</b>, elegí <b>Código-Fecha-referencia</b> y tocá <b>Importar</b>. Si vas a seguir sumando con <b>Importar y Continuar</b>, cambiá la referencia a <b>NINGUNO</b> para no duplicar líneas." },
            { titulo: "Aprobar y avisar", texto: "Imprimí la <b>Recapitulación de Necesidades</b> para que Facturación la firme. Anexá la documentación aprobada y mandá el remito a Despacho con un correo usando el asunto con el que se emitió la carpeta." }
          ],
          errores: [
            { problema: "El remito suma líneas repetidas.", solucion: "Se importó varias veces con la referencia «Código-Fecha-referencia». Dejar la referencia en NINGUNO al continuar importando y borrar las líneas repetidas antes de imprimir." },
            { problema: "No aparecen productos para tomar.", solucion: "No tienen el fin de producción hecho, o siguen en el Depósito de Producción. Revisar la guía «Finalizar la producción»." }
          ],
          relacionados: ["finalizar-produccion", "emitir-remito-cascio"],
          fuente: "Instructivo Remito Interno Despacho RV01 (12/10/2023), Checklist de Producción, pág. 304"
        },
        {
          id: "emitir-remito-cascio",
          tarea: "Emitir el remito de despacho a obra",
          ruta: "Home › Documentos › Remito Cascio › Añadir",
          palabras: ["remito cascio", "remito de salida", "despachar", "enviar a obra", "justificante", "venta"],
          noHacer: [
            { texto: "No emitir remitos con líneas que no digan a qué obra van." },
            { texto: "No cambiar el número del documento: lo pone el GEST y coincide con el talonario preimpreso." }
          ],
          titulo: "Emisión de remitos Cascio",
          tipo: "Instructivo",
          resumen: "Cómo armar en el GEST el remito que acompaña el material a obra y elegir el justificante correcto.",
          responsable: "Despacho",
          sectores: ["Producción", "Administración", "Abastecimiento"],
          cuando: "Cuando Producción avisa que hay productos listos y el remito interno está aprobado.",
          reglas: [
            "Primero se genera el remito en el GEST y enseguida se pide el preimpreso del talonario, para que la numeración no se desfase.",
            "Elegí el <b>justificante antes de tomar las necesidades</b>: cada uno descarga distinto. Venta = a obra; Proveedores = proceso en terceros; Herramientas/Bienes de uso obra = herramientas y máquinas.",
            "Taller despacha <b>productos terminados</b>; Montaje, carpetas de Excel y no conformidades despachan <b>necesidades</b>.",
            "Antes de imprimir el preimpreso, elegí hoja <b>A4</b> (o la configuración guardada)."
          ],
          pasos: [
            { titulo: "Abrir Remito Cascio", texto: "En <b>Home</b> elegí <b>Documentos</b>, abrí la carpeta <b>Remito Cascio</b> y tocá <b>Añadir</b>.", img: "img/rem-02-remito-cascio.jpg" },
            { titulo: "Completar el encabezado", texto: "Elegí la <b>Denominación</b> (cliente) y la dirección de entrega.", img: "img/rem-04-encabezado.jpg" },
            { titulo: "Elegir el justificante", texto: "En <b>Justificante documento</b> tocá el filtro y elegí el que corresponde (para obra: <b>Venta</b>). Confirmá.", img: "img/rem-03-justificante.jpg" },
            { titulo: "Tomar lo que se despacha", texto: "Con <b>Tomar Almacén</b> elegí los productos terminados (taller) o las necesidades (montaje) de la carpeta que salen." },
            { titulo: "Notas, guardar e imprimir", texto: "En <b>Notas</b> agregá lo que haga falta (para herramientas: grupo de trabajo y quién recibe). Guardá e imprimí: el remito pasa a <b>Despachados</b>." }
          ],
          errores: [
            { problema: "La numeración del GEST no coincide con el talonario.", solucion: "En la configuración de la numeración de remitos, cargar el último número impreso. Pedirlo al administrador del GEST." },
            { problema: "Se eligió el justificante equivocado.", solucion: "Si todavía no se imprimió, cambiarlo antes de tomar las necesidades. Si ya se imprimió, anular el remito y hacer uno nuevo." }
          ],
          relacionados: ["remito-interno-despacho", "anular-remito", "estados-remito"],
          fuente: "Págs. 161–164, 187, 302–306"
        },
        {
          id: "anular-remito",
          tarea: "Anular un remito",
          ruta: "Home › Documentos › Remito Cascio › Aplicar valores › Validación",
          palabras: ["anular remito", "anulado", "remito mal hecho", "validación", "cancelar remito"],
          noHacer: [{ texto: "No destildar el cálculo automático (<b>Automático</b>) para cambiar el estado a mano: deja movimientos de almacén mal registrados." }],
          titulo: "Anulación de Remito Cascio y Remito Interno Despacho",
          tipo: "Instructivo",
          resumen: "La forma correcta de anular un remito sin romper los movimientos de almacén.",
          responsable: "Despacho",
          sectores: ["Producción", "Abastecimiento", "Administración"],
          cuando: "Cuando un remito se emitió mal y no salió, o hay que rehacerlo.",
          reglas: [
            "Antes de anular: guardá o imprimí el remito y anexalo en <b>Anexos</b>.",
            "Escribí en <b>Notas</b> el motivo de la anulación.",
            "El remito anulado de papel queda en el talonario.",
            "Al quedar anulado se pueden borrar sus líneas, y las necesidades quedan libres para otro remito. El remito no se elimina."
          ],
          pasos: [
            { titulo: "Seleccionar los remitos", texto: "En la lista de <b>Remito Cascio</b> (o <b>Remito Interno Despacho</b>) seleccioná uno o varios documentos." },
            { titulo: "Aplicar valores", texto: "Tocá <b>Aplicar valores</b>." },
            { titulo: "Validación = Anulado", texto: "En la columna <b>Validación</b> desplegá la lista, elegí <b>Anulado</b> y confirmá." }
          ],
          errores: [
            { problema: "Después de anular, el stock no cuadra.", solucion: "Probablemente se anuló destildando «Automático». Avisar al administrador del GEST para revisar los movimientos de almacén." }
          ],
          relacionados: ["emitir-remito-cascio", "estados-remito"],
          fuente: "Actualización estado «Anulado» para remitos; pág. 161"
        },
        {
          id: "estados-remito",
          tarea: "Entender los estados del remito",
          ruta: "Home › Documentos › Remito Cascio",
          palabras: ["estado del remito", "despachado", "recibido en obra", "facturado", "nuevo"],
          noHacer: [],
          titulo: "Estados de remito",
          tipo: "Procedimiento",
          resumen: "Qué significa cada estado del remito, qué se puede hacer en cada uno y quién lo cambia.",
          responsable: "Despacho",
          sectores: ["Producción", "Administración"],
          cuando: "Para seguir un remito desde que se crea hasta que se factura.",
          reglas: [
            "<b>Nuevos</b>: se pueden cargar necesidades, direcciones, notas, texto final, O.C. y pedido. No se cambia el número ni se elimina.",
            "<b>Despachados</b>: el remito se imprimió. No se edita ni se elimina.",
            "<b>Anulados</b>: se pueden borrar las líneas para liberar las necesidades. No se elimina el remito.",
            "<b>Recibido en Almacén de Obra</b>: lo cambia el supervisor de montaje al confirmar lo que llegó a obra (validar tarea).",
            "<b>Facturado</b>: solo remitos con confirmación de obra; Facturación hace la aceptación guiada para generar la factura al cliente."
          ],
          pasos: [
            { titulo: "Ver los remitos por estado", texto: "En <b>Documentos</b> › <b>Remito Cascio</b>, las subcarpetas muestran cuántos hay en cada estado (Despachados, Nuevos, Anulado).", img: "img/rem-02-remito-cascio.jpg" }
          ],
          errores: [],
          relacionados: ["emitir-remito-cascio", "anular-remito"],
          fuente: "Pág. 162"
        }
      ]
    },
    { id: "facturas", titulo: "Facturas y pagos", descripcion: "Factura de proveedor, anticipos, estado de pago, facturación.", paginas: "256–281", guias: [] },
    { id: "errores", titulo: "Errores frecuentes", descripcion: "Problemas conocidos del GEST y cómo resolverlos.", paginas: "285–316", guias: [] }
  ]
};

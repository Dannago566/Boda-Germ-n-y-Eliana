/*
  CONFIGURACIÓN DE LA INVITACIÓN — Germán & Eliana
  Todo lo que cambia (nombres, fecha, lugares, enlaces, WhatsApp) se edita aquí.
  No necesitas tocar index.html, styles.css ni app.js.
  Lo que dejes vacío ("" o []) simplemente no se muestra.
*/

const invitacionConfig = {
  novios: {
    nombre1: "Germán Castro",
    nombre2: "Eliana Gómez",
    corto1: "Germán",
    corto2: "Eliana",
    inicial1: "G",
    inicial2: "E"
  },

  textos: {
    etiquetaPortada: "¡Nos casamos!",
    mensaje: "Un nuevo capítulo comienza y queremos que seas parte de nuestra historia de amor.",
    bendicion: "Con la bendición de Dios y de nuestros padres",
    cita: "El amor nunca se da por vencido, jamás pierde la fe, siempre tiene esperanzas y se mantiene firme en toda circunstancia.",
    citaAutor: "1 Corintios 13:7",
    cierre: "Cada momento de este día ha sido preparado con cariño, pero nada será más especial que tenerte junto a nosotros para celebrarlo.",
    despedida: "¡Te esperamos!",
    finalContador: "¡Hoy celebramos nuestro amor!"
  },

  // Fecha y hora de la CEREMONIA (AAAA-MM-DDTHH:MM:SS) y zona horaria (Colombia = -05:00)
  fecha: "2026-12-26T15:00:00",
  zonaHoraria: "-05:00",

  ceremonia: {
    nombre: "Ceremonia religiosa",
    lugar: "Iglesia del Perpetuo Socorro San Adolfo",
    hora: "3:00 pm",
    direccion: "",      // ← completa la dirección o ciudad
    mapa: "https://maps.app.goo.gl/p9UzGc1xsft7qyDL7?g_st=ic"
  },

  recepcion: {
    nombre: "Recepción y celebración",
    lugar: "Finca recreativa Las Brisas",
    hora: "6:00 pm",
    direccion: "",      // ← completa la dirección o ciudad
    mapa: "https://maps.app.goo.gl/NcvgGNX2ZNeWr1xy7?g_st=ic"
  },

  // Calendario (hora de 24 h)
  calendario: {
    inicio: "2026-12-26T15:00:00",
    fin: "2026-12-27T00:00:00"
  },

  vestimenta: {
    codigo: "Viste como quieras",
    mensaje: "Lo más importante es que te sientas cómodo y especial.",
    nota: "Se reservan el color blanco y el color amarillo."
  },

  regalos: {
    titulo: "Sugerencia de regalo",
    mensaje: "Si deseas regalarnos algo más que tu hermosa presencia... Lluvia de sobres",
    // Opcional: datos para quien prefiera transferir. Se muestran con botón "Copiar".
    // Ej: [{ etiqueta: "Nequi", valor: "300 123 4567" }]
    cuentas: []
  },

  // Confirmación por WhatsApp (sin formulario): el botón abre un chat con el mensaje ya escrito.
  confirmacion: {
    texto: "Con mucha ilusión queremos compartir este día con ustedes. Por favor, confirma tu asistencia",
    fechaLimite: "",    // ← opcional: texto que se añade como "…hasta el X"
    aviso: "Para nosotros es muy importante que confirmes tu asistencia antes del 15 de diciembre de 2026.",
    cierre: "",         // ← opcional, ej: "2026-12-15T23:59:00" oculta el botón automáticamente después de esa fecha
    whatsapp: "573124366179",
    // Mensaje que se escribe solo al abrir WhatsApp
    mensajeWhatsapp: "¡Hola! 🤍\n\nNos encantaría contar con tu presencia en nuestro día especial. 💍\n\nPor favor, confírmanos tu asistencia a nuestra boda. ¡Será una alegría compartir este momento contigo!\n\nCon cariño, Germán & Eliana. ✨",
    boton: "Confirmar"
  },

  // Foto de la pareja (opcional): guarda un JPG como assets/images/pareja.jpg
  // Si el archivo no existe, la sección simplemente no aparece.
  // forma: "arco" (recomendada), "corazon" o "ninguna"
  imagenes: {
    pareja: "assets/images/pareja.jpg",
    forma: "arco"
  },

  // Galería opcional: lista de fotos. Ej: ["assets/images/g1.jpg", "assets/images/g2.jpg"]
  galeria: [],

  // Padres (opcional). Aparecen bajo "Con la bendición de Dios y de nuestros padres".
  // Ej: { novio: ["Nombre Apellido", "Nombre Apellido"], novia: ["Nombre Apellido", "Nombre Apellido"] }
  padres: {
    novio: ["Arnulfo Castro", "Martha Noriega"],
    novia: ["Simón Gómez", "Luz Mery Ospina"]
  },

  // Música (opcional): pon un .mp3 en assets/music/ y escribe la ruta. Activa el botón "Dale play".
  // Canción: "Sara perché ti amo" (violín), recortada para empezar en el segundo 9
  musica: "assets/music/sara-perche-ti-amo.mp3"
};

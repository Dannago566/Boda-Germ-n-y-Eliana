/*
  CONFIGURACIÓN DE LA INVITACIÓN — Germán & Eliana
  Todo lo que cambia (nombres, fecha, lugares, enlaces, formulario) se edita aquí.
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
    etiquetaPortada: "Una celebración del amor",
    bendicion: "Con la bendición de Dios y de nuestras familias",
    mensaje: "Con mucha alegría queremos invitarte a celebrar el comienzo de nuestra vida juntos.",
    cita: "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.",
    citaAutor: "",
    invitacion: "Tenemos el gusto de invitarte a compartir uno de los días más especiales de nuestras vidas.",
    despedida: "Gracias por ser parte de nuestra historia.",
    finalContador: "¡Hoy celebramos nuestro amor!"
  },

  // Fecha y hora de la CEREMONIA (AAAA-MM-DDTHH:MM:SS) y zona horaria (Colombia = -05:00)
  fecha: "2026-12-26T15:00:00",
  zonaHoraria: "-05:00",

  ceremonia: {
    nombre: "Ceremonia religiosa",
    lugar: "Iglesia del Perpetuo Socorro",
    hora: "3:00 pm",
    direccion: "",      // ← completa la dirección o ciudad
    mapa: "https://www.google.com/maps/search/?api=1&query=Iglesia+Perpetuo+Socorro"  // ← pega el enlace exacto
  },

  recepcion: {
    nombre: "Recepción y celebración",
    lugar: "Finca Las Brisas",
    hora: "6:00 pm",
    direccion: "",      // ← completa la dirección o ciudad
    mapa: "https://www.google.com/maps/search/?api=1&query=Finca+Las+Brisas"  // ← pega el enlace exacto
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
    titulo: "Lluvia de sobres",
    mensaje: "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, tendremos lluvia de sobres.",
    // Opcional: datos para quien prefiera transferir. Se muestran con botón "Copiar".
    // Ej: [{ etiqueta: "Nequi", valor: "300 123 4567" }]
    cuentas: []
  },

  confirmacion: {
    texto: "Por favor, confirma tu asistencia. Será una alegría compartir este día contigo.",
    fechaLimite: "",    // ← ej: "30 de noviembre de 2026" (texto que se muestra)
    cierre: "",         // ← ej: "2026-11-30T23:59:00" cierra el formulario automáticamente
    whatsapp: "",       // ← indicativo + número, solo dígitos. Ej: "573001234567"
    endpoint: "",       // ← URL de Google Apps Script (ver README). Vacío = modo demostración
    maxAcompanantes: 6
  },

  // Foto de la pareja: guarda un JPG como assets/images/pareja.jpg
  // forma: "arco" (recomendada), "corazon" o "ninguna"
  imagenes: {
    pareja: "assets/images/pareja.jpg",
    forma: "arco"
  },

  // Galería opcional: lista de fotos. Ej: ["assets/images/g1.jpg", "assets/images/g2.jpg"]
  galeria: [],

  // Padres / padrinos (opcional). Ej: { novio: ["Nombre", "Nombre"], novia: ["Nombre", "Nombre"] }
  padres: null,

  // Música (opcional): pon un .mp3 en assets/music/ y escribe la ruta
  musica: ""
};

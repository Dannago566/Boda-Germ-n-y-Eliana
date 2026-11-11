# Invitación de boda — Germán & Eliana (azul rey y blanco)

1. Abre la carpeta en Visual Studio Code y ejecuta `index.html` con **Live Server**.
2. Todo lo editable está en `js/config.js` (nombres, fecha, lugares, mapas, WhatsApp, textos).

## Orden de la invitación
1. Sobre (clic en el sello) · 2. Los novios · 3. Mensaje + bendición + padres · 4. Versículo ·
5. Reserva la fecha (calendario + cuenta regresiva) · 6. Ubicación ceremonia · 7. Ubicación recepción ·
8. Dress Code · 9. Sugerencia de regalo · 10. Confirmar asistencia (WhatsApp) · 11. ¡Te esperamos!

## Lo primero que debes completar (`js/config.js`)
- `confirmacion.whatsapp` y `mensajeWhatsapp`: número y mensaje que se escribe solo en el chat (ya configurados).
  El botón *Confirmar* abre ese chat con el mensaje ya escrito. Si lo dejas vacío, WhatsApp pedirá elegir el contacto.
- `ceremonia.direccion` y `ceremonia.mapa` (enlace exacto de Google Maps). Igual para `recepcion`.
- `confirmacion.fechaLimite` (texto, ej. `"30 de noviembre"`) y `cierre` (fecha exacta, oculta el botón al vencer).
- `padres`: nombres de los padres (aparecen bajo "Con la bendición de Dios y de nuestros padres").

## Opcionales
- Foto de la pareja: guarda un JPG vertical como `assets/images/pareja.jpg` (si no existe, no se muestra nada).
- `galeria` (lista de fotos), `regalos.cuentas` (con botón copiar), `vestimenta.nota`.
- `musica`: "Sara perché ti amo" (violín), recortada para empezar en el segundo 9 (`assets/music/sara-perche-ti-amo.mp3`).

## Enlaces personalizados (92 invitados, un solo sitio)
La lista está en `js/invitados.js`. Cada invitado tiene un enlace corto: `https://TU-SITIO/?i=yair-parra`.
Ese enlace muestra en el sobre el sello "Save the day" con el nombre ("Sr. Yair Parra, Sra e Hija"), y el nombre viaja
en el mensaje de WhatsApp al confirmar. Sin `?i=`, el sello sale sin nombre.

Para generar y enviar los enlaces abre **`generador-de-enlaces.html`** (en la carpeta de arriba, NO la subas con el sitio):
pega la dirección de tu página publicada y copia o envía por WhatsApp el enlace de cada invitado.

## Colores
Están al inicio de `css/styles.css` (`--royal`, `--royal-deep`, `--sky`…). Las ilustraciones en `assets/images/` ya están en azul rey.

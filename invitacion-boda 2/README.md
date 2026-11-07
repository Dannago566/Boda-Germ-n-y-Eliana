# Invitación de boda — Germán & Eliana

1. Abre la carpeta en Visual Studio Code y ejecuta `index.html` con **Live Server**.
2. Todo lo editable está en `js/config.js` (nombres, fecha, lugares, mapas, WhatsApp, formulario).

## Pendientes (los marcaste como vacíos en el zip original)
- `ceremonia.direccion` y el enlace exacto de Google Maps en `ceremonia.mapa`.
- Recepción: `recepcion.lugar`, `hora`, `direccion`, `mapa`. Mientras estén vacíos se muestra "los detalles se compartirán muy pronto".
- `confirmacion.whatsapp` (indicativo + número, solo dígitos) y `confirmacion.fechaLimite` / `cierre`.
- Foto: guarda un JPG vertical como `assets/images/pareja.jpg` (sin ella se muestra un marco con el monograma).
- Opcionales: `galeria` (lista de fotos), `padres`, `regalos.cuentas` (con botón copiar), `vestimenta.nota`, `musica` (.mp3 en `assets/music/`).

## Recibir las confirmaciones (Google Sheets, gratis)
1. Crea una hoja de cálculo en Google Sheets.
2. Extensiones → Apps Script → pega el contenido de `apps-script/Code.gs` → Guardar.
3. Implementar → Nueva implementación → tipo **Aplicación web** → Ejecutar como: *Yo* → Acceso: *Cualquier persona* → Implementar y autoriza.
4. Copia la URL que termina en `/exec` y pégala en `confirmacion.endpoint`.
5. Cada confirmación llega como una fila nueva (nombre, asistencia, número de personas).

Sin `endpoint` el formulario funciona en modo demostración (guarda en el navegador, no llega a nadie).
Si pones `confirmacion.whatsapp` (ej. `573001234567`), tras confirmar aparece un botón para avisar también por WhatsApp.

## Enlaces personalizados
`index.html?invitado=Familia%20Rojas&pases=3` precarga el nombre, muestra "Invitación para Familia Rojas · 3 pases" y limita las personas a 3.

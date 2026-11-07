/**
 * Recibe las confirmaciones del formulario y las guarda en una hoja de Google Sheets.
 * Instrucciones completas en el README.md (sección "Recibir las confirmaciones").
 */
const NOMBRE_HOJA = "Confirmaciones";
const ENCABEZADOS = ["Fecha", "Nombre", "Asistencia", "Personas", "Pases asignados", "Origen"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let hoja = ss.getSheetByName(NOMBRE_HOJA);
    if (!hoja) {
      hoja = ss.insertSheet(NOMBRE_HOJA);
      hoja.appendRow(ENCABEZADOS);
      hoja.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight("bold").setBackground("#f3e3df");
      hoja.setFrozenRows(1);
    }
    hoja.appendRow([
      new Date(d.fecha), clean(d.nombre), d.asistencia, d.personas, d.pases, d.origen
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Evita que un texto empiece con = + - @ y se ejecute como fórmula en la hoja.
function clean(v) {
  v = String(v || "").slice(0, 400);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doGet() {
  return ContentService.createTextOutput("Servicio de confirmaciones activo.");
}

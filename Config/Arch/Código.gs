var serviceTitle = 'Consulta estoque Agropecuária';
var version = '2.0.0';

function doGet() {
  return HtmlService
    .createTemplateFromFile('index')
    .evaluate()
    .setTitle(serviceTitle)
    .setFaviconUrl('https://videira.ifc.edu.br/wp-content/themes/ifc/img/ifc.png')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function getInventory() {
  const ss    = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName("interface");
  if (!sheet) return [];

  const lastRow    = sheet.getLastRow();
  const numRows    = Math.max(lastRow - 1, 0);
  const block      = sheet.getRange(2, 6, numRows, 3).getValues();
  const filtered   = block.filter(row => row[0] !== "");
  // monta resposta com item, estoque e localização
  const result     = filtered.map(row => [ row[0], row[1], row[2] ]);
  
  return result;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

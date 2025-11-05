function formatarItens(itens) {
  var tabela = `
    <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 13px;">
      <thead>
        <tr>
          <th colspan="3" style="border: 1px solid black; padding: 6px 8px; text-align: center; vertical-align: middle; font-weight: bold;">
            Itens Solicitados
          </th>
        </tr>
        <tr>
          <th style="border: 1px solid black; padding: 6px 8px; text-align: center; vertical-align: middle; font-weight: bold;">Qtd</th>
          <th style="border: 1px solid black; padding: 6px 8px; text-align: center; vertical-align: middle; font-weight: bold;">Item</th>
          <th style="border: 1px solid black; padding: 6px 8px; text-align: center; vertical-align: middle; font-weight: bold;">Local</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (var i = 0; i < itens.length; i++) {
    var nome = itens[i][1][0];
    var qtd = itens[i][1][1];
    var local = itens[i][1][2];
    tabela += `
      <tr>
        <td style="border: 1px solid black; padding: 6px 8px; text-align: center; vertical-align: middle;">${qtd}</td>
        <td style="border: 1px solid black; padding: 6px 8px; text-align: left; vertical-align: middle;">${nome}</td>
        <td style="border: 1px solid black; padding: 6px 8px; text-align: center; vertical-align: middle;">${local}</td>
      </tr>
    `;
  }

  tabela += `
      </tbody>
    </table>
  `;

  return tabela;
}

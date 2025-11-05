function solicitar(itens, data) {
  // Função auxiliar para sanitizar os campos de entrada
  function sanitizeInput(value) {
    if (Array.isArray(value)) {
      return String(value[0]).trim();
    }
    return String(value).trim();
  }

  var lock = LockService.getPublicLock();
  if (lock.tryLock(3000)) {
    try {

      // Extração e sanitização dos dados recebidos
      var itens = JSON.parse(itens); // já transforma de JSON para array de objetos
      var nome = sanitizeInput(data.nome);
      // var email = sanitizeInput(data.email);
      var destinarioEmail = sanitizeInput(data.destinarioEmail);
      var turma = sanitizeInput(data.turma);
      var disciplina = sanitizeInput(data.disciplina);
      var kits = sanitizeInput(data.kits);
      var dataRetirada = sanitizeInput(data.dataRetirada);
      var dataDevolucao = sanitizeInput(data.dataDevolucao);
      var obs = sanitizeInput(data.obs);
      
      //VALIDAÇÃO DOS CAMPOS     
      // if (!validacaoEmail(email)) {
      //   throw new valException("Seu e-mail é inválido");
      // }

      if (!validacaoEmail(destinarioEmail)) {
        throw new valException("O e-mail do destinatário é inválido");
      }

      //mensagem a ser enviada
      var tabelaMateriais = formatarItens(itens);

      // MailApp.sendEmail({
      //   to: email, 
      //   subject: "[AGRO_IFC] Solicitação de material {E-mail automático}",
      //   htmlBody:
      //     '<p>Olá '+nome+', você solicitou os seguintes materiais:</p>' +
      //     tabelaMateriais +
      //     '<p><b>Para o dia:</b> ' + dataRetirada + '<br>' +
      //     '<b>Vai usar até:</b> ' + dataDevolucao + '<br>' +
      //     '<b>Turma:</b> ' + turma + '<br>' +
      //     '<b>Disciplina:</b> ' + disciplina + '<br>' +
      //     '<b>Quantidade de Kits:</b> ' + kits + '<br>' +
      //     '<b>Observações:</b> ' + obs + '</p>'
      // });

      MailApp.sendEmail({
        to: destinarioEmail,
        subject: "[AGRO_IFC] Reserva de " + nome + ", para " + turma + ", " + disciplina,
        htmlBody:
          // '<p>'+nome+' (' + email + ') solicitou os seguintes materiais:</p>' +
          '<p> Olá, solicito os seguintes materiais:</p>' +
          tabelaMateriais +
          '<br><p><b>Para o dia:</b> ' + dataRetirada + '<br>' +
          '<br><b>Vou usar até:</b> ' + dataDevolucao + '<br>' +
          '<br><b>Turma:</b> ' + turma + '<br>' +
          '<br><b>Disciplina:</b> ' + disciplina + '<br>' +
          '<br><b>Quantidade de Kits:</b> ' + kits + '<br>' +
          '<br><b>Observações:</b> ' + obs + '</p>' + '<br><br>' +
          '<b>Atenciosamente:</b> <br>' + nome + '</p>'
      });

      var retorno = new Object();
      retorno['name'] = 'Concluído!';
      retorno['message'] = 'Solicitação efetuada, AGUARDE e-mail de confirmação do técnico!';
      retorno['clear'] = true;
      lock.releaseLock();
      return retorno;
    } catch (e) {
      Logger.log(e);
      var retorno = new Object();
      retorno['name'] = 'Erro';
      retorno['message'] = e.message;
      lock.releaseLock();
      return retorno;
    }

  } else {
    // I couldn’t get the lock, now for plan B :(
    MailApp.sendEmail("tiago.possato@ifc.edu.br",
      "[AGRO_IFC] epic fail",
      "lock acquisition fail!"
    );
    lock.releaseLock();
    Logger.log(e);
    var retorno = new Object();
    retorno['name'] = 'Erro';
    retorno['message'] = 'Erro:' + e;
    return retorno;

  }
}

function valException(message) {
  this.message = message || "Erro de validação";;
  this.name = "Validação";
}

function validacaoEmail(email) {

  if (email === undefined) {
    return false;
  };

  var usuario = email.substring(0, email.indexOf("@"));
  var dominio = email.substring(email.indexOf("@") + 1, email.length);
  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") === -1) &&
    (dominio.search("@") === -1) &&
    (usuario.search(" ") === -1) &&
    (dominio.search(" ") === -1) &&
    (dominio.search(".") !== -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true;
  }
  return false;
}

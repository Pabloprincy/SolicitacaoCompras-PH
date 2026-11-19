function validateForm(form) {
  // Números das atividades (conferidos no processo exportado, versão 20)
  var ATV_INICIO_0 = 0;
  var ATV_INICIO = 1;
  var ATV_APROVAR_SOLICITACAO = 22; // Gestor
  var ATV_APROVAR_COMPRA = 25;      // RH

  var atividade = parseInt(getValue("WKNumState"));

  // Início: dados do colaborador
  if (atividade == ATV_INICIO_0 || atividade == ATV_INICIO) {
    if (vazio(form.getValue("nomeSolicitante"))) {
      throw "Informe o nome do solicitante.";
    }
    if (vazio(form.getValue("areaCusto"))) {
      throw "Informe a área / centro de custo.";
    }
    if (vazio(form.getValue("hidden_gestor"))) {
      throw "Selecione o gestor.";
    }
    if (vazio(form.getValue("itens"))) {
      throw "Informe os itens.";
    }
    if (vazio(form.getValue("valor"))) {
      throw "Informe o valor.";
    }
    var valor = parseFloat(String(form.getValue("valor")));
    if (isNaN(valor) || valor <= 0) {
      throw "O valor deve ser maior que zero.";
    }
  }

  // Aprovar solicitação: decisão do gestor
  if (atividade == ATV_APROVAR_SOLICITACAO && vazio(form.getValue("decisaoGestor"))) {
    throw "Gestor: escolha Aprovar ou Desaprovar.";
  }

  // Aprovar compra: decisão do RH
  if (atividade == ATV_APROVAR_COMPRA && vazio(form.getValue("decisaoRH"))) {
    throw "RH: escolha Aprovar ou Desaprovar.";
  }
}

// form.getValue devolve string do Java: use == null / == "", nunca "!valor"
function vazio(valor) {
  return valor == null || String(valor).replace(/\s/g, "") == "";
}



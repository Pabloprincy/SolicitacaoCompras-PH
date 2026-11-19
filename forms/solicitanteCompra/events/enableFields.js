function enableFields(form) {
  // Números das atividades (conferidos no processo exportado, versão 20)
  var ATV_INICIO_0 = 0;
  var ATV_INICIO = 1;
  var ATV_APROVAR_SOLICITACAO = 22; // Gestor
  var ATV_APROVAR_COMPRA = 25;      // RH

  var CAMPOS_SOLICITANTE = ["nomeSolicitante", "areaCusto", "gestor", "itens", "valor", "justificativa"];
  var CAMPOS_GESTOR = ["decisaoGestor", "obsGestor"];
  var CAMPOS_RH = ["decisaoRH", "obsRH"];

  var atividade = parseInt(getValue("WKNumState"));

  if (atividade == ATV_INICIO_0 || atividade == ATV_INICIO) {
    // Colaborador preenche só os dados dele
    bloquear(form, CAMPOS_GESTOR);
    bloquear(form, CAMPOS_RH);
  } else if (atividade == ATV_APROVAR_SOLICITACAO) {
    // Gestor só decide
    bloquear(form, CAMPOS_SOLICITANTE);
    bloquear(form, CAMPOS_RH);
  } else if (atividade == ATV_APROVAR_COMPRA) {
    // RH só decide
    bloquear(form, CAMPOS_SOLICITANTE);
    bloquear(form, CAMPOS_GESTOR);
  } else {
    // Notificações e demais etapas: só leitura
    bloquear(form, CAMPOS_SOLICITANTE);
    bloquear(form, CAMPOS_GESTOR);
    bloquear(form, CAMPOS_RH);
  }
}

// setEnabled(campo, false, true): desabilita e protege o valor gravado (TDN: Eventos de Formulário)
function bloquear(form, campos) {
  for (var i = 0; i < campos.length; i++) {
    form.setEnabled(campos[i], false, true);
  }
}

function displayFields(form, customHTML) {
  var ATV_INICIO_0 = 0;
  var ATV_INICIO = 1;

  var atividade = parseInt(getValue("WKNumState"));

  if (atividade == ATV_INICIO_0 || atividade == ATV_INICIO) {
    form.setValue("hidden_solicitante", getValue("WKUser"));
  }
}

# Projeto: Solicitação de Compras PH (teste técnico TOTVS Fluig)

## Como trabalhar comigo (regras do Pablo)
- Sou iniciante (front-end JS), estudando Fluig desde 13/11/2026.
- **Eu escrevo o código.** Não entregue pronto: mostre onde está o erro e o porquê, com antes/depois. Só faça você mesmo quando eu pedir explicitamente.
- **Uma ação por mensagem, sem textão.** Explique de forma simples e didática.
- Sempre diga se o assunto é **PLATAFORMA** Fluig, **LINGUAGEM** (JS no navegador ou no servidor/Rhino) ou **CONVENÇÃO**.
- Confirme detalhes técnicos no TDN (fluig_docs_search / fluig_docs_read) e cite o link — ou diga que não achou.
- Publicar no servidor, cancelar solicitação ou dar push: avise e peça confirmação antes.
- Ao resolver um problema, registre a lição em `APRENDIZADOS.md`.

## Ambiente
- Servidor: https://lab.fluig.com (Fluig Voyager 2.0), companyId 1. Credenciais: pedir ao Pablo (nunca gravar em arquivo).
- O processo é desenhado no **editor web** do lab (não há .process local). Backup exportado em `workflow/diagrams/solicitacaoCompras.xml`.
- Pasta correta do formulário: `forms/solicitanteCompra/`. Não usar `~/Desktop/SolicitanteCompra` (desatualizada) nem `~/eclipse-workspace/_backup_2026-11-18/versao_do_claude/`.
- `.vscode/servers.json` tem senha: está no `.gitignore` e nunca vai para o Git.
- Git: remotos `origin` (SolicitacaoCompras-PH) e `ph` (SolicitarCompraPh). Para atualizar os dois: `git push origin && git push ph`.

## Processo `solicitacaoCompras` ("Solicitação de compras ph")
Números das atividades (conferidos na versão 20; reconferir se o diagrama mudar):

| Nº | Atividade | Responsável |
|---|---|---|
| 1 (ou 0) | Início | Solicitante |
| 22 | Aprovar solicitação | Gestor (campo `hidden_gestor`) |
| 10 | Gateway "Gestor aprovou?" | aprovar → 25 / desaprovar → 11 |
| 25 | Aprovar compra | Pool grupo RH-PH |
| 18 | Gateway "RH aprovou?" | |
| 11 | Notificar Solicitante | hoje: `hidden_gestor` (**errado**, ver pendências) |
| 28 / 46 | Paralelo / Join | |
| 32 | Notificar colaborador | hoje: `hidden_gestor` |
| 42 | Subprocesso `realizarCompra` (Analisar → Comprar, pool COMPRAS-PH) | |
| 12 / 37 | Fim | |

## Formulário `solicitanteCompra`
- documentId 11, dataset `DSsolicitanteCompra`.
- Campos: nomeSolicitante, areaCusto, gestor (zoom colleague), hidden_gestor, itens, valor, justificativa, decisaoGestor (aprovar/desaprovar), obsGestor, decisaoRH (aprovar/desaprovar), obsRH.
- Eventos: `validateForm.js` (obrigatórios por etapa) e `enableFields.js` (cada etapa edita só os próprios campos).

## Pendências (retorno do avaliador em 19/11/2026, nota 6–7)
1. Solicitante não é notificado: criar hidden com o usuário do solicitante (preenchido no início) e usar nas atividades 11 e 32.
2. Prazo vencido não pode pular o gestor: tirar o fluxo automático 22 → 25; só sinalizar atraso na central de tarefas.
3. Subprocesso `realizarCompra` sem formulário: o comprador precisa receber itens, valor, centro de custo e anexos.
4. Observação obrigatória quando gestor ou RH desaprovar.
   - Em andamento (19/11): regra do **gestor** escrita pelo Pablo em `validateForm.js` (linha 38), ainda **não publicada nem testada**. Dúvida em aberto: `form.getValue(...) == 'desaprovar'` compara string Java com string JS no Rhino — confirmar no teste. Falta a regra do **RH** (`decisaoRH` + `obsRH`).
5. (Levantamento, não obrigatório) conflito de acesso do RH aprovar e também estar no subprocesso.

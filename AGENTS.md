# Projeto: Solicitação de Compras PH (teste técnico TOTVS Fluig)

## Como trabalhar comigo (regras do Pablo)
- Sou iniciante (front-end JS), estudando Fluig desde 13/11/2026.
- **Eu escrevo o código.** Não entregue pronto: mostre onde está o erro e o porquê, com antes/depois. Só faça você mesmo quando eu pedir explicitamente.
- **Uma ação por mensagem, sem textão.** Explique de forma simples e didática.
- Sempre diga se o assunto é **PLATAFORMA** Fluig, **LINGUAGEM** (JS no navegador ou no servidor/Rhino) ou **CONVENÇÃO**.
- Confirme detalhes técnicos no TDN (fluig_docs_search / fluig_docs_read) e cite o link — ou diga que não achou.
- Publicar no servidor, cancelar solicitação ou dar push: avise e peça confirmação antes.
- Ao resolver um problema, registre a lição em `~/estudos/estudos-fluig/projetos/solicitacao-compras-ph/APRENDIZADOS.md`.

## Contexto compartilhado (Claude Code + Codex/ChatGPT)
O Pablo alterna entre IAs neste projeto. Este arquivo é a **única fonte de regras** das duas
(o `CLAUDE.md` só aponta para cá). Para ninguém se perder:
1. **Ao começar**, leia também `~/estudos/APRENDIZAGEM.md` (como o Pablo aprende melhor:
   o que funciona e o que NÃO funciona ao explicar) e a seção **"Onde paramos"** abaixo.
2. **Ao terminar cada etapa** (ou se o Pablo disser "vou trocar de IA"), atualize **"Onde paramos"**:
   o que foi feito, o que falta, a dúvida em aberto e qualquer explicação que ele não entendeu.
3. Se uma explicação não funcionou ("não entendi", "difícil"), registre em `~/estudos/APRENDIZAGEM.md`.
   Se não tiver permissão para escrever fora do projeto, anote em "Onde paramos" e avise o Pablo.

## Onde paramos
- 19/11/2026: **pendência 4 concluída** (observação obrigatória ao desaprovar, gestor e RH): publicada
  no lab (documentId 11), testada e salva no GitHub (`origin` e `ph`, commits f9c9a21 e 1687e45).
  Teste no lab: gestor e RH desaprovando sem observação são barrados com a mensagem certa.
  Ainda não testado: desaprovar COM observação pela tela (caminho feliz). Solicitações de teste 31 e 32 canceladas.
- 20/11/2026: **pendência 1 concluída no lab** (notificar o solicitante). **Falta commit/push** (só com o pedido do Pablo).
  1. ✅ `hidden_solicitante` criado no `solicitanteCompra.html` (linha 41).
  2. ✅ `events/displayFields.js` grava `WKUser` nas atividades 0/1. Formulário publicado (versão 16000).
     TDN FORM 001: https://tdn.totvs.com/pages/releaseview.action?pageId=236591623
     **Decisão: caminho A (displayFields), porque o chefe pediu.** Alternativas não escolhidas:
     afterProcessCreate + hAPI.setCardValue; mecanismo "Por executor de atividade" (Início).
     O displayFields só roda com a tela aberta: testar pela tela, não pela API.
     Teste: solicitação **33** (registro 63), aberta pela tela, gravou `hidden_solicitante = academy.aluno`. **33 cancelada.**
  3. ✅ No editor web, atividades 11 e 32 trocadas para "Por campo de formulário" = `hidden_solicitante`
     (o Pablo fez). Processo **publicado e liberado na versão 21** (antes a 21 era rascunho e as solicitações abriam na 20).
     ✅ Testado (20/11, movimentando pela tela): 34 desaprovada → caiu na 11; 35 aprovada (gestor e RH) → caiu na 32;
     as duas com o responsável academy.aluno. Limite: no lab, solicitante = gestor = RH (mesmo usuário).
     Pelo MCP, mover a 22 através do gateway dá "Não existem colaboradores em comum…"; pela tela funciona.
     O teste B abriu o subprocesso realizarCompra (36), que parou no Início com academy.aluno. 34, 35 e 36 canceladas.
     `workflow/diagrams/solicitacaoCompras.xml` está desatualizado (ainda mostra `hidden_gestor` na 11 e 32).
- **Próxima: pendência 2.** O "relógio" é o prazo de 48 h da atividade 22 (pode ficar, deixa a tarefa vermelha);
  o errado é a seta automática **"Fluxo prazo vencido" 22 → 25**, que deve ser removida.
- Ideia anotada (não obrigatória): o zoom deixa o solicitante escolher a si mesmo como gestor (visto no teste da 33).
- Dúvida que o Pablo teve: "como o campo vai saber quem é o solicitante?". Resposta dada: o campo é só uma
  caixinha vazia; quem escreve nela é o evento do passo 2 (analogia: "Solicitante:" em branco num papel).
- Explicação que não funcionou: tabela abstrata "gestor → RH" com 4 trocas.
  Mostrar a linha do próprio Pablo e apontar uma troca por vez.
- Como ele publica: pelo **VS Code** (extensão Fluig), não pelo Eclipse. Não exporte o formulário do
  servidor para a pasta do projeto sem avisar (sobrescreve os arquivos locais).
- A senha do lab foi escrita numa conversa anterior e **não está aqui**. Peça ao Pablo e nunca grave;
  ele deve trocá-la depois do teste técnico.
- Git: lembrar o Pablo no início da sessão de commit/push (um commit por pendência); só com o pedido dele.

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
Transcrição do áudio do avaliador: `RETORNO_AVALIADOR_2026-11-19.md` (leia antes de mexer nas pendências).
1. Solicitante não é notificado: criar hidden com o usuário do solicitante (preenchido no início) e usar nas atividades 11 e 32. **EM ANDAMENTO**, ver "Onde paramos".
2. Prazo vencido não pode pular o gestor: tirar o fluxo automático 22 → 25; só sinalizar atraso na central de tarefas.
3. Subprocesso `realizarCompra` sem formulário: o comprador precisa receber itens, valor, centro de custo e anexos.
4. Observação obrigatória quando gestor ou RH desaprovar. **FEITA** (19/11): regras do gestor e do RH em `validateForm.js`, publicadas e testadas no lab; a comparação `== 'desaprovar'` funcionou no Rhino.
5. (Levantamento, não obrigatório) conflito de acesso do RH aprovar e também estar no subprocesso.

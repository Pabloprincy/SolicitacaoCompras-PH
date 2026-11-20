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
- 20/11/2026: **pendência 1 concluída**, testada e no GitHub (commits f70d3a1 e f6c3556).
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
- 20/11/2026: **pendência 2 concluída** (prazo vencido não pula o gestor). O Pablo apagou no editor web a
  seta automática "Fluxo prazo vencido" (fluxo 50, 22 → 25) e publicou a **versão 22**. O prazo de 48 h da 22 ficou
  (deixa a tarefa vermelha). Cuidado: na 1ª tentativa ele apagou e criou outra seta comum 22 → 25 (fluxo 54), também
  apagada. Conferido no export: da 22 só sai 22 → 10. Teste: solicitação 37 (versão 22) só oferece 10 ou transferir;
  37 cancelada. Não dá para testar o atraso (48 h). Backup `workflow/diagrams/solicitacaoCompras.xml` = versão 22.
- **Próxima: pendência 3** (subprocesso `realizarCompra` sem formulário). Ler `RETORNO_AVALIADOR_2026-11-19.md` antes.
  Conferido (20/11): `realizarCompra` versão 3 (Início 7 → Analisar 8 → Comprar 9 → Fim 10) **sem formulário**.
  Plano explicado ao Pablo: (1) criar formulário para o subprocesso; (2) copiar itens, valor e centro de custo
  do pai para o filho num evento (**confirmar no TDN qual**, ex.: hAPI.getParentInstance); (3) ligar
  "Transfere Anexos" na atividade 42 (hoje `transferAttachments false`). TDN: https://tdn.totvs.com/display/public/fluig/Atividades+Workflow
  **Decisão em aberto (atualizada 20/11):** o subprocesso pode **reusar o próprio `solicitanteCompra` (documentId 11)**:
  os eventos dele já deixam tudo só leitura nas atividades 7/8/9 (caem no `else` do enableFields; validateForm e
  displayFields não agem). Recomendado reusar. O Pablo chegou a pedir uma cópia (publicada como documentId 67), mas
  pediu para **desfazer tudo** porque não tinha estudado: 67 foi para a lixeira e nada da pendência 3 ficou no projeto.
  Recomeçar com ele fazendo, passo a passo, a partir da escolha do formulário.
  **20/11 (Windows): decidido A = reusar `solicitanteCompra`.** O Pablo deixou o front com o Claude, mas quer
  ver cada passo (lógica é com ele). Nada foi alterado ainda. Plano explicado (TDN conferido):
  1. Editor web: ligar o formulário `solicitanteCompra` ao `realizarCompra` e publicar (pedir print da tela antes de explicar).
  2. Editor web: atividade 42 do pai → marcar "Transfere Anexos".
  3. Evento `afterProcessCreate` no FILHO: `hAPI.getParentInstance(processId)` → `hAPI.getCardData(pai)` →
     `hAPI.setCardValue` em nomeSolicitante, areaCusto, itens, valor, justificativa, gestor. O Pablo escreve.
     Sem tabela pai x filho, então o FORM 002 (wdkAddChild) não se aplica. `realizarCompra` NÃO está no projeto.
  4. Teste pela tela.
  **Próxima ação:** pedir login do lab e conferir no servidor `realizarCompra` (versão/formulário) e a atividade 42
  (`fluig_server_process`, `fluig_export_process`). Depois, o print do editor web para o passo 1.
- 20/11: o Pablo vai usar o **Remote Control** (`/remote-control`) na sessão do Mac e acessar pelo Windows/celular.
  Publicar pelo VS Code continua sendo no Mac.
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

## Dois computadores (Mac e Windows)
O Pablo alterna entre o Mac e o PC Windows. O GitHub é o ponto de encontro.
- **Ao começar a sessão:** rodar `git pull` no projeto e em `~/estudos` antes de qualquer coisa.
- **Ao terminar** (ou se ele disser "vou trocar de PC"): atualizar "Onde paramos", commit e push
  (`git push origin && git push ph`; em `~/estudos`, `git push`). Avisar e pedir o OK dele antes do push.
- Ficam **fora do Git** (recriar em cada PC): `CLAUDE.md` do projeto (só `@AGENTS.md`, ignorado em
  `.git/info/exclude`), `.vscode/servers.json` (cadastrar o servidor na extensão Fluig) e
  `RETORNO_AVALIADOR_2026-11-19.md` (repo público: a cópia fica no repo privado
  `~/estudos/estudos-fluig/projetos/solicitacao-compras-ph/`).
- Regras globais do Claude: cópia em `~/estudos/claude-global/CLAUDE.md` → copiar para `~/.claude/CLAUDE.md`.
- Finais de linha: `.gitattributes` força LF nos dois sistemas (evita diff falso no Windows).
- Caminhos: no Mac o projeto fica em `~/eclipse-workspace/SolicitanteCompra`; no Windows, onde foi clonado.
  `~/estudos` = pasta do usuário nos dois (Windows: `C:\Users\<usuário>\estudos`).

## Ambiente
- Servidor: https://lab.fluig.com (Fluig Voyager 2.0), companyId 1. Credenciais: pedir ao Pablo (nunca gravar em arquivo).
- O processo é desenhado no **editor web** do lab (não há .process local). Backup exportado em `workflow/diagrams/solicitacaoCompras.xml`.
- Pasta correta do formulário: `forms/solicitanteCompra/`. Não usar `~/Desktop/SolicitanteCompra` (desatualizada) nem `~/eclipse-workspace/_backup_2026-11-18/versao_do_claude/`.
- `.vscode/servers.json` tem senha: está no `.gitignore` e nunca vai para o Git.
- Git: remotos `origin` (SolicitacaoCompras-PH) e `ph` (SolicitarCompraPh). Para atualizar os dois: `git push origin && git push ph`.

## Processo `solicitacaoCompras` ("Solicitação de compras ph")
Números das atividades (conferidos na versão 22; reconferir se o diagrama mudar):

| Nº | Atividade | Responsável |
|---|---|---|
| 1 (ou 0) | Início | Solicitante |
| 22 | Aprovar solicitação (prazo 48 h, sem fluxo automático) | Gestor (campo `hidden_gestor`) |
| 10 | Gateway "Gestor aprovou?" | aprovar → 25 / desaprovar → 11 |
| 25 | Aprovar compra | Pool grupo RH-PH |
| 18 | Gateway "RH aprovou?" | |
| 11 | Notificar Solicitante | campo `hidden_solicitante` |
| 28 / 46 | Paralelo / Join | |
| 32 | Notificar colaborador | campo `hidden_solicitante` |
| 42 | Subprocesso `realizarCompra` (Analisar → Comprar, pool COMPRAS-PH) | |
| 12 / 37 | Fim | |

## Formulário `solicitanteCompra`
- documentId 11, dataset `DSsolicitanteCompra`.
- Campos: nomeSolicitante, areaCusto, gestor (zoom colleague), hidden_gestor, hidden_solicitante, itens, valor, justificativa, decisaoGestor (aprovar/desaprovar), obsGestor, decisaoRH (aprovar/desaprovar), obsRH.
- Eventos: `validateForm.js` (obrigatórios por etapa), `enableFields.js` (cada etapa edita só os próprios campos)
  e `displayFields.js` (grava o login de quem abre no `hidden_solicitante`, só no início).

## Pendências (retorno do avaliador em 19/11/2026, nota 6–7)
Transcrição do áudio do avaliador: `RETORNO_AVALIADOR_2026-11-19.md` (leia antes de mexer nas pendências).
1. Solicitante não é notificado: criar hidden com o usuário do solicitante (preenchido no início) e usar nas atividades 11 e 32. **FEITA** (20/11).
2. Prazo vencido não pode pular o gestor: tirar o fluxo automático 22 → 25; só sinalizar atraso na central de tarefas. **FEITA** (20/11, versão 22).
3. Subprocesso `realizarCompra` sem formulário: o comprador precisa receber itens, valor, centro de custo e anexos.
4. Observação obrigatória quando gestor ou RH desaprovar. **FEITA** (19/11): regras do gestor e do RH em `validateForm.js`, publicadas e testadas no lab; a comparação `== 'desaprovar'` funcionou no Rhino.
5. (Levantamento, não obrigatório) conflito de acesso do RH aprovar e também estar no subprocesso.

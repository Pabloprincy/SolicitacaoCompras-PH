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
- **Agora: pendência 1** (notificar o solicitante), em 3 passos, um por vez; o Pablo escreve o código:
  1. **(Pablo está aqui)** No `solicitanteCompra.html`, logo abaixo da linha 39
     (`<input type="hidden" id="hidden_gestor" name="hidden_gestor">`), criar
     `<input type="hidden" id="hidden_solicitante" name="hidden_solicitante">`. Ele ainda não mostrou a linha pronta.
  2. Preencher `hidden_solicitante` com o usuário de quem abre a solicitação, num evento no servidor
     (ideia: `getValue("WKUser")`, só na atividade de início). **Conferir no TDN qual evento é o certo**
     (displayFields ou evento do processo) e citar o link.
  3. No editor web do lab, trocar o responsável das atividades 11 e 32 de `hidden_gestor` para
     `hidden_solicitante`. Reconferir os números das atividades antes (servidor está na versão 21 do processo).
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
1. Solicitante não é notificado: criar hidden com o usuário do solicitante (preenchido no início) e usar nas atividades 11 e 32. **EM ANDAMENTO**, ver "Onde paramos".
2. Prazo vencido não pode pular o gestor: tirar o fluxo automático 22 → 25; só sinalizar atraso na central de tarefas.
3. Subprocesso `realizarCompra` sem formulário: o comprador precisa receber itens, valor, centro de custo e anexos.
4. Observação obrigatória quando gestor ou RH desaprovar. **FEITA** (19/11): regras do gestor e do RH em `validateForm.js`, publicadas e testadas no lab; a comparação `== 'desaprovar'` funcionou no Rhino.
5. (Levantamento, não obrigatório) conflito de acesso do RH aprovar e também estar no subprocesso.

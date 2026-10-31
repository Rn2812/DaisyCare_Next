# Histórico de versões

## FIAP NEXT 2026
- 🥇 Medalha de ouro: melhor solução entre os 10 projetos da turma de Data Science.

## v40.93 · ajustes de 30/10/2026
- Relógio de demonstração: a demo começa em 26/10/2026 às 18h35, coerente com as falas gravadas, em qualquer dia de acesso. `?relogio=real` usa o relógio do sistema. O build insere o módulo `fonte/build/relogio_demo.js` e confere o novo SHA-256.
- Suíte nova `testes/t93_relogio.py` (6 checagens). Total: 130 checagens.
- README e `analytics/README.md`: alvo do modelo definido (consulta realizada), resultado por decil no lugar do F1, bases de modelagem e operacional separadas, situação real dos 16 workflows n8n.

## v40.93 · chat e WhatsApp
- Opção 1 (Confirmar consulta) mostra a consulta e oferece: 1 confirmar presença, 2 cancelar, 3 reagendar.
- Cancelamento de consultas, exames e procedimentos: `CANCELAR` ou frases como "cancelar a endoscopia". A Daisy pede confirmação, gera protocolo `DC-CAN` e libera o horário para a fila de espera.
- Reagendamento: `REAGENDAR` ou `REMARCAR`. A Daisy mostra novos horários e pede confirmação final (atual × novo) antes de alterar a agenda. Protocolo `DC-REA`.
- Regras RN-35 (cancelamento) e RN-36 (reagendamento com confirmação).
- Repositório: build reproduzível (`fonte/build/build_v93.py`), suíte nova `testes/t93_agenda.py` (19 checagens), suíte de regressão atualizada para 36 regras e 6 workflows (105 checagens), camada `analytics/` com notebook de ML, bases sintéticas e medidas DAX, pitch em PDF e telas.

## v40.92 · página Workflows
- Fluxo em execução refeito com os workflows 12 a 17 e a camada de dados: Redis (tempo real), PostgreSQL (eventos e BI) e CRM do cliente.
- Workflow 12 com Google Routes e intervalo adaptativo; 13 virou fila digital com espera prevista e avisos; novo 17 (Daisy conversa, OpenAI).
- Especificação dos workflows 12 a 17 com download dos JSON do n8n.
- Regras RN-31 a RN-34 e página Arquitetura e dados atualizadas.

## v40.91 · primeira publicação no GitHub
- App com chat por voz e texto, fila digital, jornada com mapa e rota, prontuário digital e páginas de arquitetura.
- 105 testes automatizados (Playwright) e fluxos n8n 12 a 16.

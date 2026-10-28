# Histórico de versões

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

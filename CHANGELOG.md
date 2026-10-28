# Histórico de versões

## v40.93 · chat e WhatsApp
- **Confirmar consulta (opção 1)** mostra a consulta e oferece: 1 confirmar presença, 2 cancelar, 3 reagendar.
- **Cancelamento** de consultas, exames e procedimentos (`CANCELAR` ou, por exemplo, "cancelar a endoscopia"): a Daisy pede confirmação, gera protocolo e libera o horário para a fila de espera.
- **Reagendamento** (`REAGENDAR` ou `REMARCAR`): mostra novos dias e horários e pede confirmação final (horário atual × novo) antes de alterar a agenda.
- Regras RN-35 e RN-36 na página Regras de negócio.
- Essas respostas são só em texto (sem áudio gravado).

## v40.92 · página Workflows
- Fluxo em execução refeito com os workflows 12 a 17 e a camada de dados: Redis (tempo real), PostgreSQL (eventos e BI) e CRM do cliente (status em lote).
- **12 · Trajeto do médico** com Google Routes e intervalo adaptativo.
- **13 · Fila digital** com espera prevista e avisos (substitui o antigo "13 · Controle de atendimentos").
- **17 · Daisy conversa** (novo), com OpenAI, moderação e base aprovada.
- Especificação dos workflows com download dos JSON (também em [`n8n/workflows`](n8n/workflows)).
- Regras RN-31 a RN-34 e página Arquitetura e dados atualizadas.

## v40.91
- Versão anterior publicada neste repositório: chat por voz e texto, fila digital, jornada com mapa e rota, prontuário digital, workflows 12 a 16 e 105 testes automatizados.

## Organização do repositório (out/2026)
- Workflows movidos para `n8n/workflows/` com README próprio.
- Roteiros de falas em `docs/roteiros-falas/`; pitch em `docs/apresentacao/`.
- Testes pontuais em `testes/pontuais/`, sem caminhos fixos de máquina.
- Suíte de regressão atualizada para a v40.93 (107 verificações).
- Build passa a gravar em `fonte/saida/` para não sobrescrever o app publicado.

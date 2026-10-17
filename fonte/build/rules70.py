import re
from rules69 import RULES as R69, sid
MENU_L='1, Confirmar consulta. 2, Fila digital. 3, Agenda. 4, Marcar nova consulta. 5, Agenda familiar, com código. 6, Pix ou boleto. 7, Cheguei cedo e quero dicas. 8, Avaliar o atendimento. 9, Dúvidas sobre consulta e hospital. 10, Conhecer a Daisy. 11, Falar com atendente humano. Digite ou fale o número da opção desejada.'
A2=[
 ('URG_16 · avisos de validação',[
  ('nota_inv','Digite uma nota de 0 a 10, em que 0 é muito insatisfeita e 10 é muito satisfeita.'),
  ('cpf_fmt','Não consegui reconhecer o C P F. Informe os 11 dígitos, com ou sem pontos e traço.'),
  ('email_aj','Responda SIM para confirmar o e-mail cadastrado, NÃO para escolher outra forma de envio ou digite outro e-mail completo.'),
  ('env_outro','Sem problemas. Como prefere receber? 1, E-mail cadastrado. 2, WhatsApp ou S M S. 3, Ver aqui no chat. 4, Baixar arquivo.'),
  ('opc_num','Não encontrei essa opção. Digite um número de 1 a 11 ou MENU para ver a lista.')]),
 ('URG_17 · perguntas frequentes',[
  ('faq_ban','Os banheiros ficam próximos aos elevadores centrais, em todos os andares, com sinalização. Se precisar de apoio, peça ajuda na recepção.'),
  ('faq_cafe','A cafeteria interna fica no primeiro andar, próxima ao elevador central, e a livraria fica de frente para o café. Para receber dicas e rotas internas, digite 7.'),
  ('faq_conv','Dúvidas sobre convênio, cobertura e autorizações são tratadas pela central. Digite 11 para falar com um atendente.')]),
 ('URG_18 · exame e saudação',[
  ('exame_ag','Para agendar um exame, a central precisa do pedido médico. Posso mostrar sua agenda atual, digite 3, ou encaminhar você à central, digite 11.'),
  ('saud','Olá, Patricia! Como posso ajudar? Você pode dizer, por exemplo: minha consulta, preparo da endoscopia, meu boleto ou cheguei cedo.')]),
 ('URG_19 · menu de dicas',[
  ('dc_filho_conf','Ela é a opção mais confortável para aguardar e eu continuo acompanhando sua fila digital.'),
  ('dc_rota_curta','Também posso orientar a rota mais curta até o consultório.'),
  ('dc_menu_dicas','Enquanto você aguarda, posso te orientar por estas opções: 1, Café, cafeteria interna e livraria. 2, Brinquedoteca e apoio para criança. 3, Rotas internas até café, recepção e consultório. 4, Opções externas próximas: cafeteria conveniada, shopping e área externa. 5, Voltar ao menu principal. Digite ou fale o número da opção desejada.')]),
 ('URG_20 · dicas: café e brinquedoteca',[
  ('dica_cafe','Café e livraria: a cafeteria interna fica no primeiro andar, próxima ao elevador central. A livraria fica de frente para o café e é uma boa opção para aguardar com tranquilidade. Se preferir, posso te orientar pela rota interna.'),
  ('dica_brinq','Brinquedoteca: indicada para quem está com filho pequeno. Procure a recepção para confirmar o acesso e eu sigo acompanhando sua fila para avisar quando estiver próximo.'),
  ('dica_mais','Quer mais alguma dica? Responda com 1, 2, 3, 4 ou 5 para voltar ao menu.')]),
 ('URG_21 · dicas: rotas e opções externas',[
  ('dica_rota','Rotas internas: pela recepção principal, siga para os elevadores centrais. No primeiro andar ficam café e livraria; para cardiologia, permaneça próxima à sinalização da unidade ou peça apoio à recepção.'),
  ('dica_ext','Opções externas próximas: se ainda houver tempo seguro, você pode usar a cafeteria conveniada na área externa ou uma opção de shopping próximo. Recomendo retornar antes da fila avançar para não correr risco de perder a consulta.')]),
 ('URG_22 · encerramento por inatividade',[
  ('enc_inat','Atendimento encerrado por inatividade. Quando quiser continuar, escolha uma opção:'),
  ('menu_lista',MENU_L),
  ('fora_esc','Desculpe! Não sou programada para responder essa pergunta.')]),
]
A3=[ # último áudio: as frases mais importantes que ainda ficam sem voz
 ('ÚLTIMO ÁUDIO · respostas que faltam',[
  ('sem_hor1','Não há horários livres para essa especialidade agora, mas posso colocar você na fila.'),
  ('fila_espera_ok','Pronto, Patricia! Você entrou na fila de espera. Aviso assim que surgir uma vaga.'),
  ('remarcar','Posso ajudar. Para remarcar, digite 4. Para cancelar, digite 11.'),
  ('rota1','Chegada recomendada: trinta minutos antes do horário da consulta.'),
  ('proc1','Estes são seus procedimentos agendados.'),
  ('prep_num','Escolha o número do exame na lista.'),
  ('obrigada','De nada, Patricia. Estou aqui quando precisar.'),
  ('tchau','Até logo, Patricia. Quando precisar, é só chamar a Daisy.')]),
]
OLD=['Patricia, como você está sozinha','Patricia, como você está com seu filho','Patricia, obrigada por avisar','Patricia, como você está com acompanhante']
R=[r for r in R69 if not any(o in r[0] for o in OLD)]
R=[r for r in R if 'menu_opcoes' not in r[1]]
R=[(r[0],r[1]+['env_234']) if r[0].startswith('^Como prefere receber') else r for r in R]
R+=[
 (r'^Patricia, como você está sozinha',['dc_sozinha','dc_aviso']),
 (r'^Patricia, como você está com seu filho ou criança',['dc_filho','dc_filho_conf']),
 (r'^Patricia, como você está com acompanhante adulto',['dc_acomp']),
 (r'^Patricia, obrigada por avisar',['dc_mobil','dc_rota_curta']),
 (r'^Digite uma nota de 0 a 10',['nota_inv']),
 (r'^Não consegui reconhecer o C P F',['cpf_fmt']),
 (r'^Responda SIM para confirmar o e-mail',['email_aj']),
 (r'^Sem problemas\. Como prefere receber',['env_outro']),
 (r'^Não encontrei essa opção',['opc_num']),
 (r'^Os banheiros ficam',['faq_ban']),
 (r'^A cafeteria interna fica no primeiro andar, próxima ao elevador central, e a livraria',['faq_cafe']),
 (r'^Dúvidas sobre convênio',['faq_conv']),
 (r'^Para agendar um exame, a central',['exame_ag']),
 (r'^Olá, Patricia! Como posso ajudar',['saud']),
 (r'^Café e livraria:',['dica_cafe']),
 (r'^Brinquedoteca:',['dica_brinq']),
 (r'^Claro, Patricia\. Digite MENU para ver as opções',['ajuda']),
 (r'^Rotas internas:',['dica_rota']),
 (r'^Opções externas próximas:',['dica_ext']),
 (r'^Atendimento encerrado por inatividade',['enc_inat','menu_lista']),
 (r'^Desculpe[!.]? Não sou programada',['fora_esc']),
 (r'^Olá, Patricia\. Eu sou a Daisy e posso te ajudar agora com:',['menu_intro','?opc_zero']),
 (r'^Certo, Patricia\. Vou ler as opções',['menu_lista']),
]
R+=[
 (r'^Não há horários livres para ',['sem_hor1']),
 (r'^Pronto, Patricia! Você entrou na fila de espera',['fila_espera_ok']),
 (r'^Posso ajudar com isso\. Para remarcar',['remarcar']),
 (r'^Consulta de .{0,80}?Horário agendado',['rota1']),
 (r'^Patricia, estes são seus procedimentos agendados',['proc1']),
 (r'Digite o número do exame\. Digite 0 para voltar',['prep_num']),
 (r'^De nada, Patricia',['obrigada']),
 (r'^Até logo, Patricia',['tchau']),
]
R=[(r[0],r[1]) if r[0].startswith('^Como prefere receber') else r for r in R]
RULES=R
if __name__=='__main__':
    for ti,L in A2+A3:
        tot=sum(len(t) for _,t in L)+len(L)-1
        print(ti,len(L),tot);assert tot<=500

import hashlib,json
sid=lambda t:hashlib.sha1(t.encode()).hexdigest()[:8]
# (nome_do_arquivo|None, texto falado)  -> nome None = id sha1[:8]
A=[
 ('URG_9 · abertura, voz e preparo',[
  ('menu_opcoes','Olá, Patricia. Eu sou a Daisy e posso te ajudar agora com: 1, Confirmar consulta. 2, Fila digital. 3, Agenda. 4, Marcar nova consulta. 5, Agenda familiar, com código. 6, Pix ou boleto. 7, Cheguei cedo e quero dicas. 8, Avaliar o atendimento. 9, Dúvidas sobre consulta e hospital. 10, Conhecer a Daisy. 11, Falar com atendente humano. Digite ou fale o número da opção desejada.'),
  ('voz_ativa','Serviço de voz ativo.'),
  ('prep_cat','Posso orientar o preparo de exames de sangue, urina e procedimentos. Escolha uma categoria na lista.')]),
 ('URG_10 · identidade, agenda familiar e envio',[
  (None,'Para verificar parcelas, preciso confirmar sua identidade antes do envio.'),
  (None,'Você pode enviar o nome completo e C P F juntos ou separados.'),
  (None,'A consulta da agenda familiar é ativada pelo código familiar.'),
  (None,'Para sua segurança, informe o código familiar e o C P F do responsável.'),
  (None,'Você pode enviar os dados juntos ou separados.'),
  (None,'Como prefere receber a fatura? 1, E-mail cadastrado.'),
  (None,'Como prefere receber o código Pix? 1, E-mail cadastrado.'),
  (None,'Como prefere receber o boleto? 1, E-mail cadastrado.')]),
 ('URG_11 · validação de dados e envios',[
  ('fin_nome','Nome recebido. Agora envie o C P F com 11 dígitos.'),
  ('fin_cpf','C P F recebido. Agora envie o nome completo.'),
  ('fin_ainda','Ainda preciso confirmar nome completo e C P F.'),
  ('fin_nome_nao','Não reconheci o nome completo. Envie como está no cadastro.'),
  ('fam_cod','Código familiar recebido. Agora envie o C P F do responsável.'),
  ('fam_cpf','C P F recebido. Agora envie o código familiar.'),
  ('nao_confere','Os dados informados não conferem. Tente novamente.'),
  ('email_conf','Perfeito. Confirme se o e-mail cadastrado está correto.'),
  ('email_ok','Enviei para o e-mail cadastrado.'),
  ('fone_ok','Enviei para o WhatsApp do telefone cadastrado.')]),
 ('URG_12 · arquivo, Pix, avaliação e reserva',[
  ('arq_ok','Gerei o arquivo demonstrativo e ele foi baixado no seu dispositivo.'),
  ('pix_chat','Código Pix exibido no chat. Confira o beneficiário antes de pagar.'),
  ('nps_ask','Que bom receber sua avaliação. De 0 a 10, qual nota você dá para o atendimento da Daisy e para a jornada de hoje?'),
  ('nps_ok','Obrigada pela avaliação. Sua opinião ajuda a DaisyCare a melhorar a experiência do paciente.'),
  ('reserva','Pronto, Patricia! Sua consulta foi reservada. A confirmação final chega por mensagem.'),
  ('opc_valida','Escolha uma opção válida.')]),
 ('URG_13 · cheguei cedo (início)',[
  ('dc_invite','Bem-vinda, Patricia. Você gostaria de receber dicas até o horário da consulta? Se sim, digite ou fale QUERO.'),
  ('dc_perf1','Perfeito, Patricia. Para eu te orientar melhor, me diga como você está aguardando.'),
  ('dc_perf2','1, Estou sozinha. 2, Estou com meu filho ou criança.'),
  ('dc_perf3','3, Estou com acompanhante adulto. 4, Tenho mobilidade reduzida ou preciso de apoio.'),
  ('dc_recusa','Tudo bem, Patricia. Vou continuar acompanhando sua fila digital.'),
  ('dc_quero','Patricia, para receber dicas enquanto aguarda, digite ou fale QUERO.')]),
 ('URG_14 · cheguei cedo (dicas por perfil)',[
  ('dc_sozinha','Patricia, como você está sozinha, você pode aguardar no café interno, na livraria em frente ao café ou próxima à recepção.'),
  ('dc_filho','Patricia, como você está com seu filho ou criança, recomendo a brinquedoteca.'),
  ('dc_acomp','Patricia, como você está com acompanhante adulto, vocês podem aguardar no café interno, na livraria ou em uma área externa próxima.'),
  ('dc_mobil','Patricia, obrigada por avisar. Recomendo permanecer próxima à recepção para facilitar o apoio da equipe.'),
  ('dc_aviso','Eu aviso se a fila avançar.')]),
 ('URG_15 · dúvidas, atendente e não entendi',[
  ('duv1','Posso ajudar com consulta, fila, rota, chegada antecipada, agenda familiar, Pix/Boleto e atendimento humano.'),
  ('duv2','Para dúvidas clínicas, sintomas, medicamentos ou emergência, fale com a equipe assistencial ou procure o pronto atendimento.'),
  ('hum1','Vou direcionar sua solicitação para atendimento humano.'),
  ('hum2','Enquanto o atendimento é encaminhado, você pode permanecer neste chat.'),
  ('nao_ent','Não entendi sua solicitação. Para recomeçar, digite MENU. Para falar com uma pessoa, digite 11.')]),
]
def nm(n,t):return n or sid(t)
RULES=[ # regex sobre o texto falado (já limpo) -> ids
 (r'^Para verificar parcelas, preciso confirmar sua identidade',[sid('Para verificar parcelas, preciso confirmar sua identidade antes do envio.'),sid('Você pode enviar o nome completo e C P F juntos ou separados.')]),
 (r'^A consulta da agenda familiar é ativada pelo código familiar',[sid('A consulta da agenda familiar é ativada pelo código familiar.'),sid('Para sua segurança, informe o código familiar e o C P F do responsável.'),sid('Você pode enviar os dados juntos ou separados.')]),
 (r'^Para consultar a agenda familiar, preciso validar duas informações',[sid('Para sua segurança, informe o código familiar e o C P F do responsável.'),sid('Você pode enviar os dados juntos ou separados.')]),
 (r'^Como prefere receber a fatura\?',[sid('Como prefere receber a fatura? 1, E-mail cadastrado.')]),
 (r'^Como prefere receber o código Pix\?',[sid('Como prefere receber o código Pix? 1, E-mail cadastrado.')]),
 (r'^Como prefere receber o boleto\?',[sid('Como prefere receber o boleto? 1, E-mail cadastrado.')]),
 (r'^Nome recebido com sucesso\.',['fin_nome']),
 (r'^C P F recebido com sucesso\. Agora envie o nome',['fin_cpf']),
 (r'^Ainda preciso confirmar nome completo e C P F',['fin_ainda']),
 (r'^(Seu C P F já foi recebido\. Só não consegui reconhecer o nome|Não reconheci o nome completo)',['fin_nome_nao']),
 (r'^Código familiar recebido com sucesso',['fam_cod']),
 (r'^C P F recebido com sucesso\. Agora preciso apenas do código',['fam_cpf']),
 (r'^Os dados informados não conferem',['nao_confere']),
 (r'^Perfeito\. Confirme se o e-mail cadastrado',['email_conf']),
 (r'^(Fatura|Boleto|Código Pix) enviad[oa] para o e-mail cadastrado',['email_ok']),
 (r'^Enviei (a fatura|o boleto|o código Pix) para o WhatsApp',['fone_ok']),
 (r'^Gerei o arquivo demonstrativo',['arq_ok']),
 (r'^Código Pix copia e cola exibido no chat',['pix_chat']),
 (r'^Escolha uma opção válida: 1, (Fatura|E-mail)',['opc_valida']),
 (r'^Que bom receber sua avaliação\. De 0 a 10',['nps_ask']),
 (r'^Obrigada pela avaliação\. Sua opinião ajuda',['nps_ok']),
 (r'^Pronto, Patricia! Reservei a opção',['reserva']),
 (r'^Bem-vinda, Patricia\. Você gostaria de receber dicas',['dc_invite']),
 (r'^Perfeito, Patricia\. Para eu te orientar melhor',['dc_perf1','dc_perf2','dc_perf3']),
 (r'^Tudo bem, Patricia\. Vou continuar acompanhando',['dc_recusa']),
 (r'^Patricia, para receber dicas enquanto aguarda',['dc_quero']),
 (r'^Patricia, como você está sozinha',['dc_sozinha','dc_aviso']),
 (r'^Patricia, como você está com seu filho ou criança',['dc_filho']),
 (r'^Patricia, como você está com acompanhante adulto',['dc_acomp']),
 (r'^Patricia, obrigada por avisar',['dc_mobil']),
 (r'^Posso ajudar com consulta, fila, rota',['duv1','duv2']),
 (r'^Vou direcionar sua solicitação para atendimento humano',['hum1','hum2']),
 (r'^(Essa solicitação|Esse comando) não corresponde às funções',['nao_ent']),
 (r'^Não entendi sua solicitação',['nao_ent']),
]
if __name__=='__main__':
    names={}
    for ti,L in A:
        tot=sum(len(t) for _,t in L)+len(L)-1
        print(ti,len(L),'itens',tot,'caracteres')
        assert tot<=500,tot

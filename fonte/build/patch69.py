import json as _j,sys as _s
_s.path.insert(0,W)
import importlib,rules69;importlib.reload(rules69)
def _rep2(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:70],s.count(a))
    s=s.replace(a,b)
# texto das dicas: opção 5 volta ao menu
_c=s.count('Quer mais alguma dica? Responda com 1, 2, 3, 4 ou 5 para voltar ao menu.')
print('dicas texto:',_c)
s=s.replace('Quer mais alguma dica? Responda com 1, 2, 3, 4 ou 5 para voltar ao menu.','Quer mais alguma dica? Digite 1, 2, 3 ou 4. Para voltar ao menu, digite 5.')
# avisos novos do chat ficam sem áudio provisório
_rep2("if(K(/agenda familiar (solicitar|validacao pendente)/))","if(K(/^chat69/))return [];if(K(/agenda familiar (solicitar|validacao pendente)/))")
print('patch69 ok')

_rep2("`Que ótimo te ver de novo, Patricia.\\n\\nPercebi que você chegou antes do horário da consulta. Se quiser, posso te dar dicas do que fazer enquanto aguarda, sem perder o acompanhamento da sua fila digital.\\n\\nDigite ou fale SIM ou QUERO.`","`Bem-vinda, Patricia. Você gostaria de receber dicas até o horário da consulta? Se sim, digite ou fale QUERO.`")
print('patch early ok')

# opção 0 no menu: abertura curta + convite para ouvir as opções
_rep2("posso te ajudar agora com:\\n\\n1 - Confirmar consulta","posso te ajudar agora com:\\n\\nPara ouvir as opções, digite ou fale zero.\\n\\n1 - Confirmar consulta",1)

# dicas: depois de cada dica volta o menu de dicas (sem a pergunta solta); nova dica da brinquedoteca
_rep2("msg+'\\n\\nQuer mais alguma dica? Digite 1, 2, 3 ou 4. Para voltar ao menu, digite 5.'","msg+'\\n\\nOutras opções:\\n1 - Café e livraria\\n2 - Brinquedoteca\\n3 - Rotas internas\\n4 - Opções externas próximas\\n5 - Voltar ao menu principal\\n\\nDigite o número da opção.'",1)
_rep2("msg='Brinquedoteca: indicada para quem está com filho(a) pequeno(a). Procure a recepção para confirmar o acesso e eu sigo acompanhando sua fila para avisar quando estiver próximo.'","msg='Brinquedoteca: o café do primeiro andar tem vista para a brinquedoteca. Você pode deixar a criança com um profissional do espaço e aproveitar para tomar um café e ler um livro ou uma revista, sem perder o acompanhamento da sua fila digital. Procure a recepção para confirmar o acesso.'",1)

# v40.90: botões de atalho: Procedimentos e preparos juntos; Rota/chegada fica dentro do 7; atalhos reiniciam a conversa
_rep2(r"""<button class="btn ghost" data-gold-prep onclick="openAppCommand(\'preparo de exames\')">🧪 Preparo exames</button><button class="btn ghost" onclick="openAppCommand(\'rota e horário de chegada\')">🧭 Rota/chegada</button><button class="btn ghost" onclick="openAppCommand(\'meus procedimentos\')">🏥 Procedimentos</button>""",r"""<button class="btn ghost" onclick="openAppCommand(\'procedimentos e preparos\')">🏥 Procedimentos e preparos</button>""",1)
_rep2(r"""<button class="btn ghost" data-gold-prep onclick="openWaCommand(\'preparo de exames\')">🧪 Preparo exames</button><button class="btn ghost" onclick="openWaCommand(\'rota e horário de chegada\')">🧭 Rota/chegada</button><button class="btn ghost" onclick="openWaCommand(\'meus procedimentos\')">🏥 Procedimentos</button>""",r"""<button class="btn ghost" onclick="openWaCommand(\'procedimentos e preparos\')">🏥 Procedimentos e preparos</button>""",1)
_rep2("['No hospital',[['7','7 Cheguei cedo e dicas'],['preparo de exames','🧪 Preparo de exames'],['rota e horário de chegada','🧭 Rota e chegada'],['meus procedimentos','🏥 Procedimentos'],['@kids','☺ Espaço Kids']]]","['No hospital',[['7','7 Cheguei cedo, rotas e dicas'],['procedimentos e preparos','🏥 Procedimentos e preparos'],['@kids','☺ Espaço Kids']]]",1)
_rep2("function openAppCommand(cmd){showPage('appchat');","function openAppCommand(cmd){try{state.sessions.app={flow:null,step:null,data:{}}}catch(e){}showPage('appchat');",1)
_rep2("function openWaCommand(cmd){showPage('whatsapp');","function openWaCommand(cmd){try{state.sessions.wa={flow:null,step:null,data:{}}}catch(e){}showPage('whatsapp');",1)

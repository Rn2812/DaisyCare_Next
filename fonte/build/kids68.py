import json as _j
def _sc(bg,art,t,good,fg,bad,fb,flip=False):
    o=[[good,1,fg],[bad,0,fb]]
    if flip:o.reverse()
    return {'bg':bg,'art':art,'t':t,'o':o}
_ST=[
 {'n':'Atravessando a rua','e':'🚸','sc':[
  _sc('#e0f2fe','🚦','A mãe e o filho querem atravessar a rua. Onde eles devem atravessar?','Na faixa de pedestres','Isso! A faixa é o lugar mais seguro para atravessar.','No meio dos carros','Os carros não conseguem parar rápido. Vamos até a faixa!'),
  _sc('#fef9c3','👀','Eles chegam na faixa. O que fazem antes de dar o primeiro passo?','Param, olham para os dois lados e dão as mãos','Muito bem! Olhar com atenção evita acidentes.','Saem correndo sem olhar','Correr é perigoso. Eles voltam, param e olham de novo.',True),
  _sc('#dcfce7','🟢','O sinal dos pedestres ficou verde, mas um carro ainda está se aproximando. O que fazem?','Esperam o carro parar e atravessam com calma','Ótimo! Cuidado e calma sempre.','Atravessam correndo','Ainda é melhor esperar o carro parar por completo.')]},
 {'n':'Os amigos brigaram','e':'🤝','sc':[
  _sc('#fce7f3','🧸','Dois amiguinhos querem o mesmo carrinho e começam a brigar. O que um deles pode fazer?','Falar com calma: "Podemos brincar juntos?"','Isso! Conversar resolve melhor do que brigar.','Bater no amigo','Bater machuca e deixa todo mundo triste. Vamos conversar!',True),
  _sc('#fef3c7','🙋','A briga continuou e ninguém se entende. Quem pode ajudar?','Um adulto de confiança, como a professora','Muito bem! Pedir ajuda é uma atitude corajosa.','Ninguém, é melhor esconder','Esconder não resolve. Um adulto pode ajudar a fazer as pazes.'),
  _sc('#dcfce7','🫂','Agora os dois estão mais calmos. Qual é o melhor final?','Pedir desculpas e brincar juntos','Que lindo! Amizade vale mais do que ganhar a briga.','Ficar sem falar um com o outro','Ficar de mal é triste. Pedir desculpas faz as pazes!',True)]},
 {'n':'Compartilhando na pracinha','e':'🛝','sc':[
  _sc('#e0f2fe','🛝','Na pracinha, só tem um balanço e duas crianças querem usar. O que a Daisy faz?','Combina a vez: um balança e o outro espera','Isso! Esperar a vez é um jeito gentil de brincar.','Empurra o outro e senta primeiro','Empurrar machuca. Vamos esperar a nossa vez!',True),
  _sc('#fef9c3','⏳','Um amiguinho está esperando há bastante tempo. O que a Daisy faz?','Chama o amigo para balançar também','Ótimo! Dividir faz a brincadeira ficar melhor.','Finge que não viu','Dá para ser gentil: chamar o amigo deixa todo mundo feliz.'),
  _sc('#dcfce7','🎒','Hora de ir embora. Tem uma garrafinha caída no chão. O que fazer?','Guardar na mochila e avisar o adulto','Muito bem! Cuidar das coisas e dos amigos é importante.','Deixar para lá','Se for de um amigo, ele pode ficar triste. Vamos avisar o adulto!',True)]},
 {'n':'Viagem de carro','e':'🚗','sc':[
  _sc('#e0e7ff','🚗','A família vai viajar de carro. O que a criança usa para ir segura?','Cinto ou cadeirinha','Isso! Sempre bem presa, em qualquer viagem.','Nada, só se segura no banco','No carro, a cadeirinha ou o cinto protegem você.',True),
  _sc('#fef9c3','🧒','A criança quer sentar no banco da frente. O que o adulto explica?','Criança vai no banco de trás, bem segura','Certo! Atrás é o lugar mais seguro para crianças.','Pode ir na frente sem problema','O banco de trás é mais seguro para quem é criança.'),
  _sc('#dcfce7','🅿️','Chegaram! O carro parou. Como a criança desce?','Espera o adulto abrir e desce pela calçada','Perfeito! Descer do lado da calçada é mais seguro.','Abre a porta e sai correndo','Pode vir outro carro! Vamos esperar o adulto.',True)]},
 {'n':'Primeiro dia na escola','e':'🎒','sc':[
  _sc('#fce7f3','🏫','Hoje é o primeiro dia da Daisy na escola nova. Ela sente um friozinho. O que ajuda?','Respirar fundo e dizer "oi" para alguém','Isso! Um "oi" já começa uma amizade.','Ficar escondida num canto','Tudo bem sentir medo, mas dizer "oi" ajuda a fazer amigos!',True),
  _sc('#fef9c3','👦','Um colega novo está sozinho no recreio. O que a Daisy faz?','Convida para brincar','Que gentileza! Todo mundo gosta de ser incluído.','Faz de conta que não viu','Convidar deixa o colega feliz e faz um novo amigo.'),
  _sc('#dcfce7','📚','A professora pede para guardar os brinquedos. O que a Daisy faz?','Ajuda a guardar tudo no lugar','Muito bem! Cada um ajuda e a sala fica organizada.','Sai para brincar de outra coisa','Quando todos ajudam, o trabalho fica fácil e rápido!',True)]},
 {'n':'Hora do lanche','e':'🍎','sc':[
  _sc('#fef3c7','🧼','Antes de comer o lanche, o que a Daisy faz?','Lava as mãos com água e sabão','Isso! Mãos limpas, barriga feliz.','Come logo, sem lavar','As mãos têm germes. Vamos lavar antes de comer!',True),
  _sc('#dcfce7','🍌','Na lancheira tem fruta e um docinho. O que a Daisy come primeiro?','A fruta, e o docinho só um pouquinho','Ótimo! Frutas ajudam o corpo a crescer forte.','Só o docinho','O doce pode ficar para depois. A fruta deixa a gente forte!'),
  _sc('#e0f2fe','🗑️','Terminou o lanche. O que fazer com a embalagem?','Jogar na lixeira','Isso! Lixo na lixeira cuida do nosso planeta.','Deixar no chão','O lugar do lixo é a lixeira, para o pátio ficar limpinho.',True)]},
 {'n':'Perdida no mercado','e':'🛒','sc':[
  _sc('#fef9c3','🛒','A Daisy foi ao mercado com a mãe e, de repente, não vê mais ela. O que faz primeiro?','Fica parada onde está e chama a mãe','Isso! Ficar parada ajuda a mãe a encontrar você.','Sai andando para procurar sozinha','Andar sozinha pode afastar mais. Vamos ficar paradinhas!',True),
  _sc('#e0f2fe','👩‍💼','Ninguém apareceu ainda. A quem a Daisy pede ajuda?','A um funcionário do mercado, de uniforme','Muito bem! Quem usa uniforme pode ajudar.','A qualquer pessoa que a chame para sair','Nunca saia com alguém que você não conhece. Procure quem usa uniforme.'),
  _sc('#dcfce7','🤗','A mãe chegou! O que a Daisy lembra para a próxima vez?','Ficar sempre pertinho do adulto','Isso! Pertinho é o lugar mais seguro.','Que perder-se é divertido','É um susto! Melhor ficar de mãos dadas.',True)]},
 {'n':'Cuidando da natureza','e':'🌳','sc':[
  _sc('#dcfce7','🌳','A Daisy vai passear no parque com a família. Ela encontra uma planta bonita. O que faz?','Admira e deixa a planta no lugar','Isso! As plantas ficam bonitas quando cuidamos delas.','Arranca para levar para casa','Arrancar machuca a planta. Vamos só admirar!',True),
  _sc('#e0f2fe','💧','Na volta, a torneira do bebedouro está pingando. O que a Daisy faz?','Fecha direitinho para não gastar água','Ótimo! Água é preciosa e precisa ser economizada.','Deixa aberta, água é de graça','A água acaba! Vamos fechar a torneira com carinho.'),
  _sc('#fef9c3','♻️','Tem lixeiras de cores diferentes no parque. O que a Daisy faz?','Pergunta ao adulto onde cada lixo vai','Muito bem! Separar o lixo ajuda a cuidar do mundo.','Joga tudo junto no chão','O lixo vai na lixeira, e o adulto pode explicar as cores.',True)]},
 {'n':'Hora de dormir','e':'🌙','sc':[
  _sc('#e0e7ff','🪥','Está quase na hora de dormir. O que a Daisy faz primeiro?','Escova os dentes','Isso! Dentes limpinhos antes de dormir.','Vai para a cama sem escovar','Escovar evita cáries. Vamos lá!',True),
  _sc('#fce7f3','📖','Antes de dormir, a Daisy ainda está com a cabeça cheia de pensamentos. O que ajuda?','Ouvir uma história e respirar devagar','Ótima ideia! Isso acalma o corpo e a mente.','Ficar com o tablet até tarde','Telas atrapalham o sono. Uma história acalma melhor.'),
  _sc('#dcfce7','🌙','De manhã, a Daisy acorda cheia de energia. Por que isso aconteceu?','Porque dormiu bem a noite toda','Isso! Dormir bem ajuda a crescer e a aprender.','Porque ficou acordada até tarde','Dormir bem é o segredo! Boa noite e bons sonhos.',True)]}
]
_TF=[
 ['A mãe e o filho devem atravessar a rua na faixa de pedestres.',1,'Isso! A faixa é o lugar seguro, sempre de mãos dadas.'],
 ['Posso atravessar a rua correndo, sem olhar para os lados.',0,'Não! Pare, olhe para os dois lados e dê a mão ao adulto.'],
 ['Devemos esperar o sinal ficar verde para os pedestres.',1,'Certo! Esperar o sinal deixa tudo mais seguro.'],
 ['Se um amiguinho pegar meu brinquedo, devo bater nele.',0,'Não! Converse com calma ou peça ajuda a um adulto.'],
 ['Depois de brigar com um amigo, posso pedir desculpas e fazer as pazes.',1,'Isso! Pedir desculpas é um ato de coragem.'],
 ['Emprestar brinquedos e brincar junto deixa a brincadeira melhor.',1,'Certo! Dividir é muito legal.'],
 ['Posso chamar o colega por apelidos que o deixam triste.',0,'Não! Chamamos os amigos pelo nome, com carinho.'],
 ['No carro, a criança deve usar cinto ou cadeirinha.',1,'Isso! Sempre bem presinha para viajar.'],
 ['Posso aceitar presentes de pessoas que não conheço.',0,'Não! Sempre fale com um adulto de confiança.'],
 ['Depois de brincar, devemos guardar os brinquedos.',1,'Certo! Ajudar a organizar é ser responsável.'],
 ['Posso mexer em remédios sozinho, se eu quiser.',0,'Não! Remédio só com um adulto.'],
 ['Se um colega está triste, posso perguntar se ele quer brincar.',1,'Isso! Um convite pode alegrar o dia de alguém.'],
 ['Falar "por favor" e "obrigado" deixa todo mundo contente.',1,'Certo! Educação é um jeito de cuidar dos outros.'],
 ['Posso brincar perto do fogão quando está ligado.',0,'Não! Fogão e coisas quentes são perigosos.'],
 ['Se me perder no mercado, devo ficar parado e pedir ajuda a um funcionário.',1,'Isso! Assim fica fácil de ser encontrado.'],
 ['Lixo deve ser jogado na lixeira.',1,'Certo! Cuidar do mundo começa com pequenos gestos.']
]
_QS=[
 ['Onde devemos atravessar a rua com o adulto?','Na faixa de pedestres',['No meio dos carros','Correndo por qualquer lugar']],
 ['Antes de atravessar a rua, o que devemos fazer?','Olhar para os dois lados',['Fechar os olhos','Olhar só o celular']],
 ['Seu amiguinho pegou seu brinquedo. O que fazer?','Conversar e pedir de volta com educação',['Bater nele','Gritar e jogar o brinquedo']],
 ['Depois de brigar com um amigo, o que ajuda?','Pedir desculpas e fazer as pazes',['Nunca mais falar com ele','Esconder o brinquedo dele']],
 ['O que usamos no carro para viajar com segurança?','Cinto ou cadeirinha',['Nada','Ficar em pé no banco']],
 ['Um estranho oferece doce na rua. O que fazer?','Dizer não e chamar o adulto',['Ir com ele','Aceitar e comer']],
 ['Quando dizemos "obrigado"?','Quando alguém nos ajuda ou dá algo',['Só quando estamos bravos','Nunca']],
 ['O que fazemos com o lixo?','Jogamos na lixeira',['Jogamos no chão','Escondemos embaixo da cama']],
 ['Como podemos ajudar em casa?','Guardando os brinquedos',['Espalhando tudo','Escondendo a louça suja']],
 ['Se me perder no mercado, o que faço?','Fico parado e peço ajuda a um funcionário',['Saio com qualquer pessoa','Corro para a rua']],
 ['Qual é a cor do sinal que diz que o pedestre pode atravessar?','Verde',['Vermelho','Preto']],
 ['O que fazer quando um colega está sozinho no recreio?','Convidar para brincar',['Ignorar','Rir dele']]
]
_HELP='''
function kzEnd(el,fn){
  const b=el.querySelector('#kzEnd')||el.appendChild(Object.assign(document.createElement('div'),{id:'kzEnd'}));b.className='kz-opts';
  b.innerHTML='<p class="kz-fb" style="flex-basis:100%;font-weight:800;margin:6px 0">Quer jogar de novo? 🌼</p><button class="kz-opt" id="kzYes">↺ Sim, reiniciar</button><button class="kz-opt" id="kzNo">Agora não</button>';
  b.querySelector('#kzYes').onclick=fn;
  b.querySelector('#kzNo').onclick=()=>{b.innerHTML='<p class="kz-fb" style="flex-basis:100%;font-weight:800">Tudo bem! Escolha outra brincadeira nas abas acima ou volte quando quiser. 🌼</p><button class="kz-opt" id="kzYes2">↺ Jogar agora</button>';b.querySelector('#kzYes2').onclick=fn};
}
function kzAuto(nx){nx.title='Segue sozinho em 3 segundos';setTimeout(()=>{try{if(nx.isConnected&&!nx.disabled)nx.click()}catch(e){}},3000)}
'''
def _rep(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:60],s.count(a))
    s=s.replace(a,b)
_rep('function renderStory(){',_HELP+'STORIES.push(...'+_j.dumps(_ST,ensure_ascii=False)+');\nfunction renderStory(){')
_rep('function renderTF(){','TF.push(...'+_j.dumps(_TF,ensure_ascii=False)+');\nfunction renderTF(){')
_rep('function renderQuiz(){','QS.push(...'+_j.dumps(_QS,ensure_ascii=False)+');\nfunction renderQuiz(){')
# auto-avanço
_rep("nx.onclick=()=>{S.i++;renderStory()};el.querySelector('#kzO').appendChild(nx);","nx.onclick=()=>{S.i++;renderStory()};el.querySelector('#kzO').appendChild(nx);kzAuto(nx);")
_rep("nx.onclick=()=>{q++;draw()};el.appendChild(nx);nx.style.marginTop='12px';","nx.onclick=()=>{q++;draw()};el.appendChild(nx);nx.style.marginTop='12px';kzAuto(nx);")
_rep("nx.onclick=()=>{q++;draw()};el.querySelector('#kzO').appendChild(nx);","nx.onclick=()=>{q++;draw()};el.querySelector('#kzO').appendChild(nx);kzAuto(nx);")
# finais com pergunta de reinício
_rep('<div class="kz-opts"><button class="kz-opt" id="kzAgain">↺ Ver de novo</button></div>','<div class="kz-opts" id="kzEnd"></div>')
_rep("el.querySelector('#kzAgain').onclick=()=>{S.i=0;S.paid=0;renderStory()};","kzEnd(el,()=>{S.i=0;S.paid=0;renderStory()});")
_rep('de \'+list.length+\'!</b></div></div><div class="kz-opts"><button class="kz-opt" id="kzR">↺ Jogar de novo</button></div>\';el.querySelector(\'#kzR\').onclick=()=>{list=shuffle(TF)','de \'+list.length+\'!</b></div></div><div class="kz-opts" id="kzEnd"></div>\';el.querySelector(\'#kzR\').onclick=()=>{list=shuffle(TF)')
_rep("el.querySelector('#kzR').onclick=()=>{list=shuffle(TF).slice(0,8);q=0;pts=0;draw()};return}","kzEnd(el,()=>{list=shuffle(TF).slice(0,10);q=0;pts=0;draw()});return}")
_rep('<div class="kz-opts"><button class="kz-opt" id="kzQR">↺ Jogar de novo</button></div>','<div class="kz-opts" id="kzEnd"></div>')
_rep("el.querySelector('#kzQR').onclick=()=>{list=shuffle(QS).slice(0,5);q=0;pts=0;draw()};return}","kzEnd(el,()=>{list=shuffle(QS).slice(0,8);q=0;pts=0;draw()});return}")
_rep("let list=shuffle(TF).slice(0,8),q=0,pts=0;","let list=shuffle(TF).slice(0,10),q=0,pts=0;")
_rep("let list=shuffle(QS).slice(0,5),q=0,pts=0;","let list=shuffle(QS).slice(0,8),q=0,pts=0;")
_rep("addStar(pts>=7?3:pts>=4?2:1);el.innerHTML='<h3>Certo","addStar(pts>=8?3:pts>=5?2:1);el.innerHTML='<h3>Certo")
_rep("addStar(pts>=4?3:pts>=2?2:1);el.innerHTML='<h3>Daisy pergunta","addStar(pts>=6?3:pts>=3?2:1);el.innerHTML='<h3>Daisy pergunta")
print('kids ok')

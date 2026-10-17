/* ===== DaisyCare v40.55 · Indicadores de mercado: casos e estudos ao redor do mundo, com fontes verificadas ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const VERIF='14/10/2026';
/* tipo de evidência */
const T={sci:['Estudo científico','sci'],gov:['Governo ou imprensa','gov'],ven:['Caso do fornecedor','ven'],set:['Referência do setor','set']};
/* id, tags, região, local, número, rótulo, bullets, período, tipo, fonte, url, o que a página confirma */
const D=[
 {id:'dantas',tg:['cient'],reg:'Mundo',nome:'Revisão sistemática de 105 estudos',num:'23%',rot:'média mundial de no-show',
  b:['África: 43,0%. Oceania: 13,2% (menor taxa)','Mais associado a faltas: tempo longo até a consulta e falta anterior'],per:'Estudos publicados até 2017',tp:'sci',
  fonte:'Dantas et al., Health Policy 122(4), 2018',url:'https://ideas.repec.org/a/eee/hepoli/v122y2018i4p412-421.html',conf:'média de ~23%, África 43,0%, Oceania 13,2%'},
 {id:'cochrane',tg:['cient'],reg:'Mundo',nome:'Cochrane: lembretes por mensagem de celular',num:'+14%',rot:'mais chance de comparecer (RR 1,14)',
  b:['8 ensaios com 6.615 pessoas; IC 95%: 1,03 a 1,26','Mensagem de texto e ligação tiveram resultado parecido (RR 0,99)'],per:'Revisão de 2013',tp:'sci',
  fonte:'Cochrane CD007458 (Gurol-Urganci et al.)',url:'https://www.cochrane.org/evidence/CD007458_mobile-phone-messaging-reminders-attendance-healthcare-appointments',conf:'8 ensaios, 6.615 participantes, RR 1,14 (1,03–1,26) e RR 0,99 (0,95–1,02)'},
 {id:'barts',tg:['cient','uk'],reg:'Reino Unido',nome:'Barts Health NHS Trust: texto do lembrete',num:'11,1% → 8,4%',rot:'faltas ao informar o custo da consulta perdida',
  b:['Cerca de 20.000 pacientes em 5 clínicas, sorteados entre mensagens','Segundo ensaio: 8,2% com a mesma mensagem de custo específico'],per:'Nov/2013 a mai/2014',tp:'sci',
  fonte:'Behavioural Insights Team e governo do Reino Unido',url:'https://gov.uk/government/publications/reducing-missed-hospital-appointments-using-text-messages/a-zero-cost-way-to-reduce-missed-hospital-appointments',conf:'~20.000 pacientes, 5 clínicas, 11,1% → 8,4% e 8,2%'},
 {id:'nhs',tg:['uk'],reg:'Reino Unido',nome:'NHS England: consultas ambulatoriais perdidas',num:'5,5 mi',rot:'consultas perdidas em um ano (9,3%)',
  b:['Custo aproximado de £160 por consulta perdida','Primeiras consultas perdidas custaram até £225 milhões'],per:'2012–13',tp:'sci',
  fonte:'Warwick Business School',url:'https://www.wbs.ac.uk/news/how-to-stop-people-missing-hospital-appointments/',conf:'5,5 milhões (9,3%), £160 por consulta, até £225 milhões'},
 {id:'gulfport',tg:['us'],reg:'EUA · Mississippi',nome:'Memorial Hospital at Gulfport',num:'−28%',rot:'no-show (redução relativa)',
  b:['Quase US$ 804 mil em receita adicional','Potencial acima de US$ 1 milhão por ano'],per:'7 meses',tp:'ven',
  fonte:'Health Catalyst',url:'https://healthcatalyst.com/success_stories/reducing-no-show-rates-memorial-hospital-at-gulfport',conf:'28% de redução relativa, ~US$ 804 mil em 7 meses, mais de US$ 1 mi/ano'},
 {id:'milebluff',tg:['us'],reg:'EUA · Wisconsin',nome:'Mile Bluff Medical Center',num:'−20%',rot:'no-show em 7 meses',
  b:['Mais de 350 horas de equipe poupadas por mês','Mais de 2.000 dias de espera de pacientes recuperados em 3 meses','US$ 200 mil de receita anual adicional'],per:'7 meses',tp:'ven',
  fonte:'Luma Health',url:'https://www.lumahealth.io/resource/mile-bluff-medical-center-drives-200k-in-additional-annual-revenue-with-luma/',conf:'20% menos no-shows em 7 meses, 350+ h/mês, 2.000+ dias, US$ 200 mil'},
 {id:'houston',tg:['us'],reg:'EUA · Texas',nome:'Houston ENT & Allergy',num:'US$ 1,2 mi',rot:'receita extra com lista de espera inteligente',
  b:['US$ 1,8 milhão em no-shows evitados','Queda de 50% nas ligações abandonadas'],per:'Não informado na página',tp:'ven',
  fonte:'Luma Health',url:'https://www.lumahealth.io/resource/houston-ent-allergy-luma-case-study/',conf:'US$ 1,2 mi (Smart Waitlist), US$ 1,8 mi (no-shows evitados), −50% ligações abandonadas'},
 {id:'gstt',tg:['uk'],reg:'Reino Unido · Londres',nome:"Guy's and St Thomas' NHS",num:'−17,2%',rot:'faltas (DNA) nos ambulatórios',
  b:['£ 2,6 milhões de benefício financeiro no primeiro ano','91% de recomendação dos pacientes','Piloto em saúde da mulher (2015): faltas −30%'],per:'1º ano, a partir de abr/2016',tp:'ven',
  fonte:'DrDoctor',url:'https://www.drdoctor.co.uk/resources/guys-and-st-thomas-case-study-3',conf:'DNA −17,2%, £ 2,6 mi, 91%, piloto −30%'},
 {id:'ceara',tg:['br'],reg:'Brasil · Ceará',nome:'Hospitais estaduais do Ceará',num:'35,5% → 23,2%',rot:'faltas a consultas e cirurgias (−12,3 p.p.)',
  b:['Lembretes por WhatsApp desde mar/2025','Comparação: mar–ago/2025 contra 2024','Os 11 hospitais da rede poderão confirmar pelo WhatsApp'],per:'Mar–ago/2025',tp:'gov',
  fonte:'O Povo, com dados da Sesa-CE',url:'https://www.opovo.com.br/noticias/ceara/2025/12/02/faltas-de-pacientes-a-consultas-em-hospitais-do-ceara-caem-12-apos-lembretes-por-whatsapp.html',conf:'35,5% em 2024; queda de 12,3 (pontos); 11 hospitais'},
 {id:'rj',tg:['br'],reg:'Brasil · Rio de Janeiro',nome:'Rede estadual do RJ · assistente Serena',num:'43% → 32%',rot:'faltas em consultas e exames',
  b:['Assistente virtual no WhatsApp, 1 milhão de disparos','Mais de 30 mil atendimentos por ano a mais','O CONASS cita redução de 16% no número de faltas: as fontes divergem'],per:'2025 até jun/2026',tp:'gov',
  fonte:'Correio da Manhã (jun/2026) e CONASS',url:'https://www.correiodamanha.com.br/estado-do-rio/2026/06/290301-assistencia-virtual-reduz-ausencias-nas-redes-de-saude.html',url2:'https://www.conass.org.br/?p=54846',conf:'43% → 32%, 1 milhão de disparos, 30 mil/ano; CONASS: base 43% e −16%'},
 {id:'poa',tg:['br'],reg:'Brasil · Porto Alegre',nome:'Consultas especializadas da capital gaúcha',num:'≈ 13%',rot:'consultas agendadas não aproveitadas',
  b:['45.607 consultas perdidas no ano (taxa mensal de 12% a 15%)','Confirmação por WhatsApp em até 24 h, para liberar a vaga'],per:'2025',tp:'gov',
  fonte:'Prefeitura de Porto Alegre',url:'https://www.prefeitura.poa.br/sms/noticias/mais-de-45-mil-consultas-especializadas-foram-perdidas-por-faltas-de-pacientes-em-2025',conf:'~13%, 45.607 consultas, 12–15% por mês, confirmação em 24 h'},
 {id:'rp',tg:['br','cient'],reg:'Brasil · Ribeirão Preto',nome:'Atenção primária de uma cidade de médio porte',num:'≈ 30%',rot:'absenteísmo em consultas agendadas',
  b:['Unidades com gestão intensiva da agenda relataram perto de 15%','Coleta durante a pandemia (mar/2020 a mar/2021)'],per:'2020–21',tp:'sci',
  fonte:'Interface (Botucatu) 2023; 27: e220197',url:'https://scielosp.org/pdf/icse/2023.v27/e220197/pt',conf:'~30%; unidades com gestão intensiva ~15% (estimativa de gestor)'}
];
const REF=[
 ['ByDoctor','No-show normal em clínicas brasileiras: 10% a 30%; média perto de 25%; abaixo de 15% é um bom alvo para clínicas privadas.','https://bydoctor.com.br/blog/taxa-de-no-show-clinica-o-que-e-normal-como-melhorar'],
 ['AGC Orflie','Metas sugeridas: no-show abaixo de 5%, confirmação acima de 80%, reposição de vagas acima de 60%. Recomenda confirmação dupla, 24 h e 2 h antes.','https://agc.orflie.group/blog/como-reduzir-no-show-em-clinicas.html'],
 ['Koee','Confirmação ativa 48 h antes reduz faltas em 30% a 40%; lista de espera ativa preenche cerca de 80% das vagas canceladas em menos de 24 h. O texto não cita estudo: trate como estimativa do setor.','https://koee.com.br/blog/como-reduzir-no-show-em-consultas-9-estrategias-praticas-para-clinicas/'],
 ['Grupo Dama Health','Confirmação em dois estágios: mensagem 48 h antes e lembrete final com endereço e mapa 2 h antes.','https://grupodamahealth.com.br/blog/como-reduzir-faltas-no-consultorio']
];
const VIA={dantas:'Health Policy · Dantas et al.',cochrane:'Cochrane',barts:'Behavioural Insights Team',nhs:'Warwick Business School',gulfport:'Health Catalyst',milebluff:'Luma Health',houston:'Luma Health',gstt:'DrDoctor',ceara:'O Povo · Sesa-CE',rj:'Correio da Manhã',poa:'Prefeitura de Porto Alegre',rp:'Interface (Botucatu)'};
const css=`
#market{--c:#f0875f;--m:#5fd3a4;--g:#f2c15a;--bg:#071f1b;--bg2:#0a2823;--ln:rgba(95,211,164,.24);--tx:#efe9dc;--mu:#a3b9b1}
#market .mk-deck{background:radial-gradient(900px 420px at 85% -10%,rgba(95,211,164,.10),transparent 60%),var(--bg);border:1px solid var(--ln);border-radius:26px;padding:34px 34px 26px;color:var(--tx)}
#market .serif{font-family:var(--dc-serif)}
#market .big,#market .mk-k strong,#market td b.n,#market h3,#market h4,#market .mk-sub,#market .syn span{font-feature-settings:'lnum' 1,'kern' 1;font-variant-numeric:lining-nums}
#market .mono{font-family:var(--dc-mono)}
#market .mk-sub{font:400 clamp(20px,1.8vw,26px)/1.35 var(--dc-serif);margin:0 0 22px;color:var(--tx);max-width:70ch}
#market .mk-sub i{color:var(--c)}
#market .mk-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0;border:1px solid var(--ln);margin:0 0 22px}
#market .mk-k{padding:18px 22px;border-right:1px solid var(--ln)}
#market .mk-k:last-child{border-right:0}
#market .mk-k small{display:block;font:500 12.5px var(--dc-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--mu)}
#market .mk-k strong{display:block;font:400 44px/1.1 var(--dc-serif);margin:8px 0 4px;color:var(--c)}
#market .mk-k span{font:400 13.5px/1.5 var(--dc-mono);color:var(--tx)}
#market .mk-flt{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}
#market .mk-flt button{border:1px solid var(--ln);background:transparent;color:var(--tx);border-radius:0;padding:10px 16px;font:500 12.5px var(--dc-mono);letter-spacing:.14em;text-transform:uppercase;min-height:44px}
#market .mk-flt button.on{background:var(--c);border-color:var(--c);color:#1a0e08;font-weight:600}
#market .mk-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border:1px solid var(--ln)}
#market .mk-c{position:relative;padding:22px 26px 20px;border-right:1px solid var(--ln);border-bottom:1px solid var(--ln);background:transparent;display:grid;grid-template-columns:minmax(150px,210px) minmax(0,1fr);grid-template-areas:"top top" "num body";column-gap:26px;row-gap:14px}
#market .mk-c:nth-child(2n){border-right:0}
#market .mk-c:nth-last-child(-n+2){border-bottom:0}
#market .mk-c .tp{grid-area:top;display:flex;justify-content:space-between;align-items:center;gap:12px}
#market .dash{display:flex;gap:6px}
#market .dash b{display:block;width:26px;height:2px}
#market .dash b:nth-child(1){background:var(--c)}#market .dash b:nth-child(2){background:var(--m)}#market .dash b:nth-child(3){background:var(--g)}
#market .meta{font:500 12.5px var(--dc-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--c);text-align:right}
#market .meta em{font-style:normal;color:var(--tx);opacity:.9}
#market .mk-c .nm{grid-area:num;align-self:center;border-right:1px solid var(--ln);padding-right:18px}
#market .big{font:400 70px/1 var(--dc-serif);color:var(--c);letter-spacing:-.02em;white-space:nowrap}
#market .big.m{font-size:46px}#market .big.s{font-size:34px;white-space:normal;line-height:1.1}
#market .big small{font-size:.5em;margin-left:2px}
#market .lab{font:500 12.5px/1.45 var(--dc-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--tx);margin-top:12px}
#market .mk-c .bd{grid-area:body}
#market .mk-c h4{margin:0 0 10px;padding-bottom:10px;border-bottom:1px dotted rgba(239,233,220,.4);font:italic 400 28px/1.15 var(--dc-serif);color:var(--tx)}
#market .mk-c ul{margin:0 0 14px;padding:0;list-style:none}
#market .mk-c li{position:relative;padding-left:20px;font:400 13.5px/1.55 var(--dc-mono);color:var(--tx);margin-bottom:6px}
#market .mk-c li:before{content:"";position:absolute;left:3px;top:.62em;width:6px;height:6px;border-radius:50%;background:var(--c)}
#market .via{font:500 12.5px var(--dc-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--mu)}
#market .via a{color:var(--c);font-weight:600;text-decoration:underline;text-decoration-color:rgba(240,135,95,.5);text-underline-offset:4px}
#market .via .ty{display:block;margin-top:6px;font-size:12px;color:var(--mu);letter-spacing:.12em}
#market .via a:hover{text-decoration-color:var(--c)}
#market .via i{font-style:normal;color:var(--mu);opacity:.9}
#market .syn{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 26px;margin-top:18px;padding:16px 22px;border-left:3px solid var(--c);background:rgba(240,135,95,.06)}
#market .syn b{font:500 13px var(--dc-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--c)}
#market .syn span{font:400 21px var(--dc-serif);color:var(--tx)}
#market .syn span i{color:var(--c)}
#market .fonts{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;margin-top:18px;padding-top:14px;border-top:1px solid var(--ln)}
#market .fonts .l{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:baseline}
#market .fonts b{font:500 12.5px var(--dc-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--m)}
#market .fonts a{font:500 12.5px var(--dc-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--tx);text-decoration:none;border-bottom:1px solid transparent}
#market .fonts a:hover{border-bottom-color:var(--tx)}
#market .fonts .sep{color:var(--mu)}
#market .leg{display:flex;gap:18px;font:500 12.5px var(--dc-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--mu)}
#market .leg i{display:inline-block;width:20px;height:2px;margin-right:8px;vertical-align:middle}
#market .disc{margin:16px 0 0;font:400 12.5px var(--dc-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--mu)}
#market .mk-blk{margin-top:18px;border:1px solid var(--ln);padding:22px 26px;background:var(--bg2);color:var(--tx);border-radius:0}
#market .mk-blk h3{margin:0 0 6px;font:400 30px var(--dc-serif);color:var(--tx)}
#market .mk-blk h3 i{color:var(--c)}
#market .mk-blk p.sm{margin:0 0 8px;font:400 13.5px/1.6 var(--dc-mono);color:var(--mu)}
#market .tw{overflow:auto}
#market table{width:100%;border-collapse:collapse;font:400 13.5px/1.5 var(--dc-mono);color:var(--tx)}
#market th{font:500 12.5px var(--dc-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--m);text-align:left;padding:10px;border-bottom:1px solid var(--ln);white-space:nowrap}
#market td{padding:11px 10px;border-bottom:1px solid rgba(95,211,164,.12);vertical-align:top}
#market td b.n{font:400 22px var(--dc-serif);color:var(--c)}
#market td a{color:var(--c);text-decoration:none;border-bottom:1px solid rgba(240,135,95,.5)}
#market .mk-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px}
#market .mk-note{margin:0;font:400 13.5px/1.7 var(--dc-mono);color:var(--tx);border-left:3px solid var(--g);padding-left:16px}
#market ul.mk-l{margin:8px 0 0;padding:0;list-style:none}
#market ul.mk-l li{position:relative;padding-left:20px;margin-bottom:9px;font:400 13.5px/1.6 var(--dc-mono);color:var(--tx)}
#market ul.mk-l li:before{content:"";position:absolute;left:3px;top:.62em;width:6px;height:6px;border-radius:50%;background:var(--c)}
#market ul.mk-l a{color:var(--c);font-weight:600;text-decoration:none;border-bottom:1px solid rgba(240,135,95,.5)}
#market ul.mk-l .mu{color:var(--mu)}
@media(max-width:1100px){#market .mk-grid{grid-template-columns:1fr}#market .mk-c{border-right:0!important;border-bottom:1px solid var(--ln)!important}#market .mk-c:last-child{border-bottom:0!important}}
@media(max-width:640px){#market .mk-deck{padding:20px 16px}#market .mk-c{grid-template-columns:1fr;grid-template-areas:"top" "num" "body";padding:18px 14px}#market .mk-c .nm{border-right:0;padding-right:0}#market .big{font-size:56px}}
/* mesma identidade na lista de fontes da Operação */
.dc-op-k small{font-size:12.5px!important}
#dcOpFontes{background:#071f1b!important;border:1px solid rgba(95,211,164,.24)!important;color:#efe9dc!important;border-radius:20px!important}
#dcOpFontes .kicker{font-family:var(--dc-mono)!important;color:#f0875f!important;letter-spacing:.16em!important}
#dcOpFontes h3{font:400 30px var(--dc-serif)!important;color:#efe9dc!important}
#dcOpFontes ul{list-style:none!important;padding:0!important}
#dcOpFontes li{position:relative;padding:0 0 0 20px;margin-bottom:11px;font:400 13.5px/1.55 var(--dc-mono)!important;color:#efe9dc}
#dcOpFontes li:before{content:"";position:absolute;left:3px;top:.62em;width:6px;height:6px;border-radius:50%;background:#f0875f}
#dcOpFontes li a{text-decoration:none!important;display:inline!important}
#dcOpFontes li a b{font:600 12.5px var(--dc-mono);letter-spacing:.14em;text-transform:uppercase;color:#f0875f;border-bottom:1px solid rgba(240,135,95,.5)}
#dcOpFontes li .muted,#dcOpFontes .muted{color:#a3b9b1!important}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

const link=(u,t)=>'<a href="'+u+'" target="_blank" rel="noopener noreferrer">'+esc(t)+' ↗</a>';
const bigNum=n=>{const l=n.length;const k=l>12?'s':l>6?'m':'';return '<div class="big '+k+'">'+esc(n).replace(/%/g,'<small>%</small>')+'</div>'};
function card(x){
  const meta=x.reg.replace(/ · /g,' · ').toUpperCase()+' / '+x.per.toUpperCase();
  return '<article class="mk-c" data-tg="'+x.tg.join(' ')+'"><div class="tp"><span class="dash" aria-hidden="true"><b></b><b></b><b></b></span><span class="meta">'+esc(meta)+'</span></div>'+
   '<div class="nm">'+bigNum(x.num)+'<div class="lab">'+esc(x.rot)+'</div></div>'+
   '<div class="bd"><h4>'+esc(x.nome)+'</h4><ul>'+x.b.map(b=>'<li>'+esc(b)+'</li>').join('')+'</ul>'+
   '<div class="via">Via '+link(x.url,VIA[x.id])+(x.url2?' · '+link(x.url2,'CONASS'):'')+'<span class="ty">'+esc(T[x.tp][0])+'</span></div></div></article>';
}
function build(){
  if($('#market'))return true;
  const main=$('main.main');if(!main)return false;
  const sec=document.createElement('section');sec.className='page';sec.id='market';sec.dataset.title='Indicadores de mercado';
  const uniq=[];D.forEach(x=>{const k=VIA[x.id];if(!uniq.find(u=>u[0]===k))uniq.push([k,x.url])});
  sec.innerHTML='<div class="mk-deck">'+
   '<p class="mk-sub">Três países, redes públicas e revisões científicas. <i>Uma mesma alavanca</i> — comunicação digital + agenda viva + decisão automatizada.</p>'+
   '<div class="mk-kpis">'+
    '<div class="mk-k"><small>no-show médio · mundo</small><strong>23%</strong><span>África 43%, Oceania 13% (105 estudos)</span></div>'+
    '<div class="mk-k"><small>lembrete por mensagem</small><strong>+14%</strong><span>mais chance de comparecer (Cochrane, 8 ensaios)</span></div>'+
    '<div class="mk-k"><small>hospitais · EUA e UK</small><strong>−17% a −28%</strong><span>faltas, 3 casos reportados por fornecedores</span></div>'+
    '<div class="mk-k"><small>assistente WhatsApp · RJ</small><strong>43% → 32%</strong><span>faltas na rede estadual, 2025 a jun/2026</span></div>'+
   '</div>'+
   '<div class="mk-flt" role="group" aria-label="Filtrar por região ou tipo"><button data-f="all" class="on">Todos</button><button data-f="cient">Estudos científicos</button><button data-f="us">EUA</button><button data-f="uk">Reino Unido</button><button data-f="br">Brasil</button></div>'+
   '<div class="mk-grid">'+D.map(card).join('')+'</div>'+
   '<div class="syn"><b>Síntese</b><span><i>−17% a −28%</i> de no-show (3 hospitais)</span><span><i>12</i> fontes abertas e conferidas em '+VERIF+'</span><span>valores de casos diferentes <i>não somados</i></span></div>'+
   '<div class="fonts"><div class="l"><b>Fontes</b>'+uniq.map((u,i)=>(i?'<span class="sep">·</span>':'')+'<a href="'+u[1]+'" target="_blank" rel="noopener noreferrer">'+esc(u[0])+'</a>').join('')+'</div>'+
   '<div class="leg"><span><i style="background:var(--c)"></i>Comunicação</span><span><i style="background:var(--m)"></i>Agenda</span><span><i style="background:var(--g)"></i>Decisão</span></div></div>'+
   '<p class="disc">Resultados de terceiros — não representam promessa do DaisyCare</p></div>'+
   '<div class="mk-blk" style="margin-top:20px"><h3>Resumo <i>comparativo</i></h3><div class="tw"><table><thead><tr><th>Local</th><th>Indicador</th><th>Resultado</th><th>Tipo de evidência</th><th>Fonte</th></tr></thead><tbody>'+
    D.map(x=>'<tr><td><b>'+esc(x.reg)+'</b><br>'+esc(x.nome)+'</td><td>'+esc(x.rot)+'</td><td><b class="n">'+esc(x.num)+'</b></td><td>'+esc(T[x.tp][0])+'</td><td>'+link(x.url,x.fonte)+'</td></tr>').join('')+
   '</tbody></table></div></div>'+
   '<div class="mk-two" style="margin-top:18px">'+
    '<div class="mk-blk" style="margin:0"><h3>Como ler <i>estes números</i></h3><p class="mk-note">Casos de fornecedores (Health Catalyst, Luma Health, DrDoctor) são resultados que a própria empresa divulga, sem auditoria independente. Redução relativa (−28%) não é o mesmo que pontos percentuais (−12,3 p.p.). Valores em dólar e libra de casos diferentes não devem ser somados: na Houston ENT, o ganho com lista de espera e os no-shows evitados podem se sobrepor. Nenhum resultado aqui é promessa do DaisyCare; use como hipótese e meça no piloto.</p></div>'+
    '<div class="mk-blk" style="margin:0"><h3>O que isso muda <i>no DaisyCare</i></h3><ul class="mk-l"><li><b>Confirmar mais de uma vez</b> (24 h, 16 h, 4 h e 2 h): mensagem de texto e ligação têm efeito parecido, então o canal barato basta.</li><li><b>O texto do lembrete importa:</b> informar o custo da consulta perdida reduziu as faltas de 11,1% para 8,4%.</li><li><b>Lista de espera e encaixe</b> (Smart Queue e workflow 15): é onde os casos dos EUA mostram receita.</li><li><b>Medir no piloto:</b> reversão de faltas, reversão de vagas e receita recuperada (workflow 16).</li></ul></div>'+
   '</div>'+
   '<div class="mk-blk"><h3>Referências do <i>setor brasileiro</i></h3><p class="sm">Blogs de consultorias e softwares de gestão: úteis como ordem de grandeza e metas, mas sem estudo primário.</p><ul class="mk-l">'+
    REF.map(r=>'<li>'+link(r[2],r[0])+'<br><span class="mu">'+esc(r[1])+'</span></li>').join('')+'</ul></div>'+
   '<div class="mk-blk"><h3>Revisão das <i>fontes antigas</i></h3><ul class="mk-l">'+
    '<li><b>Raphael Henriques:</b> removida. A página aberta não contém os números atribuídos a ela (20–30%, 21,4% em rede paulista, Ceará −19%).</li>'+
    '<li><b>Pixedoc:</b> removida. O site bloqueia leitura automática e não foi possível confirmar “15–20%” e “90% de abertura”.</li>'+
    '<li><b>Ceará −19%:</b> substituído por 35,5% → 23,2% (−12,3 p.p.), publicado pelo O Povo com dados da Sesa-CE.</li>'+
    '<li><b>21,4% em rede municipal paulista:</b> não foi encontrada fonte; o número saiu do app.</li></ul></div>'+
   '<p class="muted" style="font-size:13px;margin-top:12px">Links abertos e conferidos em '+VERIF+'. Se algum site mudar ou sair do ar, o número continua citado com autor e ano.</p>';
  main.appendChild(sec);
  sec.querySelectorAll('.mk-flt button').forEach(b=>b.onclick=()=>{
    sec.querySelectorAll('.mk-flt button').forEach(x=>x.classList.toggle('on',x===b));
    const f=b.dataset.f;sec.querySelectorAll('.mk-c').forEach(c=>{c.style.display=(f==='all'||c.dataset.tg.split(' ').includes(f))?'':'none'});
  });
  return true;
}
function menus(){
  const nav=$('.sidebar nav.nav[data-g=s]')||$$('.sidebar nav.nav')[1];
  if($('#market')&&nav&&!$('.nav button[data-page="market"]')){
    const b=document.createElement('button');b.dataset.page='market';b.innerHTML='◎ Indicadores de mercado <small>13</small>';b.onclick=()=>showPage('market');nav.appendChild(b);
  }
  const dr=$('#uxDr nav');
  if(dr&&!dr.querySelector('[data-p="market"]')){
    const b=document.createElement('button');b.type='button';b.className='it';b.dataset.p='market';b.innerHTML='<span aria-hidden="true">◎</span>Indicadores de mercado';
    b.onclick=()=>{try{showPage('market')}catch(e){};const d=$('#uxDr');if(d)d.classList.remove('on')};
    const lbl=[...dr.querySelectorAll('.lbl')].find(l=>/Prefer/.test(l.textContent));
    dr.insertBefore(b,lbl||null);
  }
}
let n=0;const iv=setInterval(()=>{build();menus();if(++n>40)clearInterval(iv)},500);
})();

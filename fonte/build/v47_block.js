/* ===== DaisyCare v40.47 · menus organizados, botões no contexto certo, numeração única 1 a 11 ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
try{if(/[?&]dev=1/.test(location.search)||/dev/.test(location.hash))document.body.classList.add('dc-dev')}catch(e){}

const css=`
body[data-ctx="patient"] .top-meta .pill[data-kind="tech"]{display:none!important}
body:not(.dc-dev) button[onclick="testDaisyAudio()"],body:not(.dc-dev) button[onclick="previewGoldVoice()"]{display:none!important}
.dc-sep{flex-basis:100%;grid-column:1/-1;width:100%;font-size:11px;letter-spacing:.07em;text-transform:uppercase;opacity:.72;margin:8px 0 0}
.dc-sep:first-child{margin-top:0}
#appchat .app-chat-welcome .welcome-daisy-visual,#patient .patient-right-panel .daisy-panel-inner .daisy-panel-visual{position:relative!important;display:block!important;width:100%!important;aspect-ratio:16/15!important;height:auto!important;min-height:0!important;max-height:none!important;padding:0!important;margin:0 auto!important;border:0!important;border-radius:26px!important;overflow:hidden!important;box-shadow:0 14px 30px rgba(92,60,152,.16)!important}
#appchat .app-chat-welcome .welcome-daisy-visual{max-width:290px!important}
#appchat .app-chat-welcome .welcome-daisy-visual img[data-daisy-hero],#patient .patient-right-panel .daisy-panel-inner .daisy-panel-visual img[data-daisy-panel]{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;object-position:center 12%!important;transform:none!important;filter:none!important;border-radius:0!important;display:block!important}
#appchat .app-chat-welcome.app-chat-welcome-v40,#appchat .app-chat-welcome{height:auto!important;min-height:0!important;align-items:center!important}
#appchat .app-chat-welcome .welcome-daisy-visual{width:100%!important;max-width:262px!important}
#patient .patient-right-panel .daisy-panel-inner .daisy-panel-visual img[data-daisy-panel]{min-height:0!important;height:100%!important;max-height:none!important;object-fit:cover!important}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---- menu único: mesma numeração no App, no chat e no WhatsApp ---- */
const GROUPS=[
 ['Minha consulta',[['1','1 Confirmar consulta'],['2','2 Fila digital'],['3','3 Agenda completa'],['4','4 Marcar nova consulta']]],
 ['Família e pagamentos',[['5','5 Agenda familiar'],['6','6 Pix/Boleto']]],
 ['No hospital',[['7','7 Cheguei cedo e dicas'],['preparo de exames','🧪 Preparo de exames'],['rota e horário de chegada','🧭 Rota e chegada'],['meus procedimentos','🏥 Procedimentos'],['@kids','☺ Espaço Kids']]],
 ['Atendimento',[['8','8 Avaliar atendimento'],['9','9 Dúvidas'],['10','10 Conhecer a Daisy'],['11','11 Atendente humano']]]
];
function menuHTML(fn,withKids,withHome){
  const b=(cmd,label)=>cmd==='@kids'?(withKids?'<button class="btn ghost" onclick="showPage(\'kids\')">'+label+'</button>':''):'<button class="btn ghost" onclick="'+fn+'(\''+cmd+'\')">'+label+'</button>';
  return GROUPS.map(g=>'<div class="dc-sep">'+g[0]+'</div>'+g[1].map(x=>b(x[0],x[1])).join('')).join('')+(withHome?'<div class="dc-sep">Navegação</div><button class="btn ghost" onclick="'+fn+'(\'menu\')">↩ Menu inicial</button>':'');
}
function organizeNav(){$$('.nav button[data-page]').forEach((b,i)=>{let sm=b.querySelector('small');if(!sm){b.appendChild(document.createTextNode(' '));sm=document.createElement('small');b.appendChild(sm)}sm.textContent=String(i+1).padStart(2,'0')})}

/* ---- pílulas técnicas só nas páginas da operação ---- */
const PACIENTE=new Set(['patient','appchat','kids','whatsapp','finance']);
function tagPills(){$$('.top-meta .pill').forEach(p=>{const t=(p.textContent||'').toLowerCase();p.dataset.kind=(p.id==='themeStatus'||/lgpd/.test(t))?'keep':'tech'})}
function setCtx(){const a=document.querySelector('.page.active');document.body.dataset.ctx=a&&PACIENTE.has(a.id)?'patient':'hospital';tagPills()}

/* ---- Jornada: atalhos com a mesma numeração do chat ---- */
function quickJornada(){
  const h=$$('#patient h3').find(x=>/Funcionalidades do App/.test(x.textContent));if(!h)return;
  const card=h.closest('.card'),qa=card&&card.querySelector('.quick-actions');if(!qa||qa.dataset.dc)return;qa.dataset.dc='1';
  const k=card.querySelector('.kicker');if(k)k.textContent='Menu do atendimento · mesma numeração do chat';
  qa.innerHTML=menuHTML('openAppCommand',true,false);
}
function panelChips(){
  const m=$('#patient .daisy-panel-menu');if(!m||m.dataset.dc)return;m.dataset.dc='1';
  m.innerHTML=[['1','Confirmar'],['2','Fila'],['3','Agenda'],['4','Nova consulta'],['5','Família'],['6','Pix/Boleto'],['7','Dicas'],['8','Avaliar'],['9','Dúvidas'],['10','A Daisy'],['11','Humano']].map(c=>'<span>'+c[0]+' '+c[1]+'</span>').join('');
}
/* ---- menu do chat e do WhatsApp ---- */
function quickChat(){
  const g=$('#appchat .menu-grid');if(!g||g.dataset.dc)return;g.dataset.dc='1';
  g.innerHTML=menuHTML('openAppCommand',true,true);
  const p=g.closest('.card')&&g.closest('.card').querySelector('p.muted');if(p)p.textContent='Mesma numeração do atendimento assistido. Você também pode falar naturalmente ou digitar MENU para voltar ao início.';
}
function quickWa(){
  const g=$('#whatsapp .wa-menu-actions');if(!g||g.dataset.dc)return;g.dataset.dc='1';
  g.innerHTML=menuHTML('openWaCommand',false,true);
}
/* ---- voz: rótulos claros ---- */
function voiceLabels(){$$('button[onclick="playVoice()"]').forEach(b=>{if(!b.dataset.dc){b.dataset.dc='1';b.textContent='▶ Ouvir a Daisy'}})}
function versionLabels(){
  const bs=$('.brand-title span');if(bs&&/MVP/i.test(bs.textContent))bs.textContent='Mater Dei · MVP v40.47';
  const sf=$('.side-footer .muted');if(sf)sf.textContent='Build v40.47';
}
function organizeAll(){for(const f of [organizeNav,setCtx,quickJornada,panelChips,quickChat,quickWa,voiceLabels,versionLabels]){try{f()}catch(e){console.warn('v47',f.name,e)}}}

const _sp=window.showPage;
if(typeof _sp==='function'){window.showPage=function(p){const r=_sp.apply(this,arguments);setTimeout(organizeAll,30);return r};try{showPage=window.showPage}catch(e){}}

function updateFam(){const h=$('#famNextTitle');if(!h)return;const d=Math.max(0,Math.ceil((new Date('2026-11-03T09:00:00-03:00').getTime()-Date.now())/86400000));h.textContent=d>1?'Próxima consulta familiar em '+d+' dias':d===1?'Próxima consulta familiar amanhã':'Próxima consulta familiar hoje'}
function init(){organizeAll();updateFam();[400,1200,3000].forEach(t=>setTimeout(organizeAll,t));setInterval(()=>{tagPills();organizeNav();updateFam()},2500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,300));else setTimeout(init,300);
window.DAISY_V47={organizeAll,GROUPS};
})();

/* ===== DaisyCare v40.68 · chat compacto, seletor de Daisy ao lado da apresentação, menu lateral e encerramento por inatividade ===== */
(function(){
'use strict';
const css=`
@media(min-width:1181px){
  #appchat .chat-shell.chat-shell{grid-template-columns:minmax(0,1fr) 430px!important}
  #appchat .chat-card .app-chat-welcome-v40{height:236px!important;grid-template-columns:232px minmax(0,1fr) 168px!important;gap:14px!important;padding:0 20px 0 0!important}
  #appchat .chat-card .welcome-daisy-visual{height:100%!important;min-height:0!important;align-self:stretch!important;border-radius:0 30px 30px 0!important;margin:0!important;overflow:hidden!important}
  #appchat .chat-card .welcome-daisy-visual img{width:100%!important;object-fit:cover!important;object-position:center top!important}
  #appchat .chat-side-panel .btn.ghost{font-size:12.5px!important}
  #appchat .chat-card .welcome-daisy-visual img{height:100%!important}
  #appchat .chat-card .welcome-copy-card{padding:16px 22px!important;border-radius:28px!important;max-width:none!important}
  #appchat .chat-card .welcome-copy-card h3{font-size:30px!important;margin-bottom:6px!important}
  #appchat .chat-card .welcome-copy-card p{font-size:14px!important;margin-bottom:0!important}
  #appchat .chat-card .welcome-copy-card::before{left:-18px;border-width:14px 20px 14px 0}
  #appchat .chat-card .chat-body{height:290px!important;padding:12px 16px!important}
  #appchat .chat-card .chat-input{padding:10px 14px!important;gap:8px!important}
  #appchat .chat-card .chat-input .btn{min-height:40px!important;padding:8px 14px!important}
  #appchat .chat-card .chat-input input{min-height:40px!important}
}
#appchat .chat-card .chat-input .voice-controls{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:8px!important;grid-column:1/-1}
#appchat .chat-card .chat-input .voice-controls .btn{width:auto!important;grid-column:auto!important;min-height:36px!important;padding:6px 12px!important;font-size:13px!important}
#appchat .chat-card .chat-input .voice-controls .dc-vmode{width:auto!important;grid-column:auto!important}
#appchat .chat-card .chat-input .voice-controls .official-voice-note{display:none!important}
#appchat .chat-card .chat-input .voice-controls .tag{display:none!important}
.dc-daisy-mini{z-index:3;display:grid;gap:6px;justify-items:center;align-self:center}
.dc-daisy-mini .dc-mini-t{font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#5b3fc4;text-align:center;line-height:1.2}
.dark #appchat .dc-daisy-mini .dc-mini-t{color:#ffe9a8}
#appchat .dc-daisy-mini #daisySelector{display:grid!important;grid-template-columns:repeat(3,46px)!important;gap:7px!important;margin:0!important}
#appchat .dc-daisy-mini #daisySelector .daisy-choice{min-height:0!important;width:46px!important;height:46px!important;padding:2px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:#fff!important;box-shadow:0 4px 10px rgba(75,50,135,.18)!important;border:2px solid rgba(255,255,255,.9)!important}
#appchat .dc-daisy-mini #daisySelector .daisy-choice img{width:38px!important;height:38px!important;border:2px solid #fff!important;box-shadow:none!important;object-position:center 30%!important}
#appchat .dc-daisy-mini #daisySelector .daisy-choice span,#appchat .dc-daisy-mini #daisySelector .daisy-choice small,#appchat .dc-daisy-mini #daisySelector .daisy-choice b{display:none!important}
#appchat .dc-daisy-mini #daisySelector .daisy-choice.active{border-color:#7650e8!important;box-shadow:0 0 0 3px rgba(118,80,232,.35)!important}
#appchat .dc-daisy-mini #daisySelector .daisy-choice:hover{transform:scale(1.08)!important}
#appchat .chat-side-panel .card.dc-hide-picker{display:none!important}
@media(max-width:1180px){
  #appchat .chat-card .app-chat-welcome-v40{min-height:0!important;height:auto!important;grid-template-columns:1fr!important;padding:18px!important;gap:14px!important}
  #appchat .chat-card .welcome-daisy-visual img{height:170px!important}
  .dc-daisy-mini{justify-self:center}
}
`;
const st=document.createElement('style');st.id='dcUi68';st.textContent=css;document.head.appendChild(st);

/* seletor de Daisy: sai do painel lateral e vira miniaturas ao lado da apresentação */
function mover(){
  const sel=document.getElementById('daisySelector'),w=document.querySelector('.app-chat-welcome-v40');
  if(!sel||!w)return false;
  if(sel.closest('.dc-daisy-mini'))return true;
  const card=sel.closest('.card');
  const box=document.createElement('div');box.className='dc-daisy-mini';
  box.innerHTML='<span class="dc-mini-t">Escolha a Daisy</span>';
  box.appendChild(sel);w.appendChild(box);
  if(card)card.classList.add('dc-hide-picker');
  return true;
}
let nm=0;const ivm=setInterval(()=>{if(mover()||++nm>40)clearInterval(ivm)},250);mover();

/* encerramento por inatividade: só as opções do menu ficam na tela */
const MENU='1 - Confirmar consulta\n2 - Ver posição na Fila Digital\n3 - Consultar agenda\n4 - Marcar nova consulta\n5 - Consultar agenda familiar\n6 - Pix/Boleto (com validação)\n7 - Cheguei cedo e receber dicas\n8 - Avaliar atendimento\n9 - Dúvidas sobre consulta e hospital\n10 - Conhecer a Daisy\n11 - Falar com atendente humano';
const T={app:null,wa:null};
function falando(){try{const v=window.__DAISY_OFFICIAL_VOICE_4035;if(v&&(v.current||(v.queue&&v.queue.length)))return true}catch(e){}
  try{return [...document.querySelectorAll('audio')].some(a=>!a.paused&&!a.ended)}catch(e){}return false}
function encerrar(ch){
  T[ch]=null;
  if(falando()){arma(ch,15000);return}
  /* conversa em andamento (opção já escolhida): não apaga nada, a Daisy continua do ponto em que parou */
  try{const ss=state.sessions[ch];if(ss&&ss.flow)return}catch(e){}
  try{
    const b=ch==='wa'?document.querySelector('#waBody'):document.querySelector('#appBody');if(!b)return;
    try{if(typeof state!=='undefined'&&state.sessions)state.sessions[ch]={flow:null,step:null,data:{}}}catch(e){}
    b.innerHTML='';
    addBubble(ch,'Atendimento encerrado por inatividade. Quando quiser continuar, escolha uma opção:\n\n'+MENU,false);
    const inp=ch==='wa'?document.querySelector('#waInput'):document.querySelector('#appInput');if(inp)inp.value='';
    try{if(typeof registerEvent==='function')registerEvent('chat_encerrado_inatividade',patient.journeyCode,{canal:ch})}catch(e){}
  }catch(e){}
}
function arma(ch,ms){clearTimeout(T[ch]);T[ch]=setTimeout(()=>encerrar(ch),ms||(window.__dcIdleMs||180000))}
function toque(e){
  const t=e&&e.target;if(!t||!t.closest)return;
  if(t.closest('#appchat'))arma('app');
  else if(t.closest('#whatsapp'))arma('wa');
}
['click','keydown','input'].forEach(ev=>document.addEventListener(ev,toque,true));
const sc=window.sendChat;
if(typeof sc==='function'){window.sendChat=function(ch){arma(ch==='wa'?'wa':'app');return sc.apply(this,arguments)};try{sendChat=window.sendChat}catch(e){}}
const oc=window.openAppCommand;
if(typeof oc==='function'){window.openAppCommand=function(){arma('app');return oc.apply(this,arguments)};try{openAppCommand=window.openAppCommand}catch(e){}}
})();

/* ===== DaisyCare v40.61 · voz natural pré-gravada (lê datas, horários e especialidades) + celular mais largo + botão claro/escuro junto do Pix/Boleto ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s);

/* ---------- Voz natural: áudios prontos (falas/auto) com a resposta inteira ---------- */
const AUTO=__AUTO_HASHES__;
const OPT=__OPT__;const PRES=new Set();const RULES=(__RULES__).map(r=>[new RegExp(r[0]),r[1]]);
[...new Set(Object.values(OPT).concat(['voz_ativa','menu_intro','opc_zero'],RULES.flatMap(r=>r[1].map(i=>i[0]==='?'?i.slice(1):i))))].forEach(id=>{try{const a=new Audio('falas/auto/'+id+'.mp3');a.preload='metadata';a.addEventListener('loadedmetadata',()=>PRES.add(id));a.addEventListener('error',()=>{});a.load()}catch(e){}});
const MES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
let modo='natural';try{const m=localStorage.getItem('dcVozModo2');if(m)modo=m}catch(e){}
function limpa(t){
  let x=String(t||'').replace(/↩[^\n]*/g,' ').replace(/Exemplos?:[\s\S]*$/,' ');
  x=x.replace(/Código Pix copia e cola demonstrativo:[\s\S]*?(?=Confira)/,'Código Pix copia e cola exibido no chat. ')
     .replace(/\(\s*\(\d{2}\)\s*[•*]+-\d{4}\s*\)/g,'').replace(/\(\s*[^()\s]*@[^()\s]*\s*\)/g,'')
     .replace(/\(\d{2}\)\s*[•*]+-\d{4}/g,'').replace(/[^\s()]*@[\w.-]*\w/g,'o e-mail cadastrado')
     .replace(/Protocolo\s*(DC-[A-Z0-9-]+)?\s*\./g,'').replace(/\.{2,}/g,',');
  x=x.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g,(m,d,mo,y)=>(+d)+' de '+(MES[+mo-1]||mo)+' de '+y)
     .replace(/(\d{1,2})\/(\d{1,2})(?!\d|\/)/g,(m,d,mo)=>(+mo>=1&&+mo<=12)?(+d)+' de '+MES[+mo-1]:m)
     .replace(/\b(\d{1,2}):(\d{2})\b/g,(m,h,mi)=>mi==='00'?(+h)+(+h===1?' hora':' horas'):(+h)+' e '+(+mi))
     .replace(/\b(\d{1,2})h(\d{2})\b/g,(m,h,mi)=>(+h)+' e '+(+mi))
     .replace(/R\$\s*([\d.]+),(\d{2})/g,(m,r,c)=>r.replace(/\./g,'')+' reais'+(c==='00'?'':' e '+(+c)+' centavos'))
     .replace(/\bJF-?050\b/g,'J F zero cinco zero').replace(/\bDC-[A-Z0-9-]+/g,'')
     .replace(/\bCPF\b/g,'C P F').replace(/\bNPS\b/g,'N P S').replace(/\bMVP\b/g,'M V P')
     .replace(/\bseg\./gi,'segunda').replace(/\bter\./gi,'terça').replace(/\bqua\./gi,'quarta').replace(/\bqui\./gi,'quinta').replace(/\bsex\./gi,'sexta').replace(/\bs[áa]b\./gi,'sábado').replace(/\bdom\./gi,'domingo')
     .replace(/\b(\d{1,2}) ?h\b/g,'$1 horas').replace(/·/g,',')
     .replace(/\s[-–—]\s/g,', ').replace(/[•▪◦●✓✔★☆]/g,' ')
     .replace(/[\u{1F000}-\u{1FFFF}\u{2190}-\u{27BF}]/gu,' ')
     .replace(/\s*\n+\s*/g,'. ').replace(/([.!?:;])\s*\./g,'$1').replace(/\s+/g,' ').trim();
  x=x.replace(/[\uFE0F\u200D⚠]/g,'').replace(/(Obrigada pela avaliação)\s+[^\s.]+\./,'$1.')
     .replace(/\bo fatura\b/gi,m=>m[0]==='O'?'A fatura':'a fatura').replace(/\bdo fatura\b/gi,'da fatura').replace(/\bFatura enviado\b/g,'Fatura enviada')
     .replace(/\s+([.,;:!?])/g,'$1').replace(/\s+/g,' ').trim();
  return x;
}
function fnv(t){let h=0x811c9dc5;for(let i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h.toString(16).padStart(8,'0')}
window.__dcColeta=null;
let atual=null,seq=0;
function parar(){seq++;try{if(atual){atual.onended=null;atual.pause();atual=null}}catch(e){}}
const PREF=new Set(['emergencia','menu_inicial_completa','conhecer_daisy','sq_slot_open','nova_consulta_sem_horario','cheguei_cedo_completa','uso_informacoes_lgpd','boleto_emitido_completa','nps_detrator','confirmacao_ja_confirmada']);
function tocaLista(L,v,stopAll){
    try{v.queue=[];if(v.current){const c=v.current;v.current=null;c.onended=null;try{c.stop()}catch(e){}}v.busy=false}catch(e){}
    try{stopAll&&stopAll()}catch(e){}
    parar();
    const id=++seq;let i=0;const n=L.length;
    const prox=()=>{if(id!==seq||i>=n)return;const a=new Audio('falas/auto/'+L[i++]+'.mp3');a.volume=1;atual=a;a.onended=prox;a.onerror=prox;const p=a.play();if(p&&p.catch)p.catch(e=>console.warn('Daisy fala',e))};
    prox();
    return true;
}
window.__dcFalaTexto=function(text,tipo,v,stopAll,fk){
  try{
    const t=limpa(text);if(t.length<3)return false;
    const h=fnv(t);
    if(window.__dcColeta){window.__dcColeta.push([h,t,String(tipo),fk||'']);}
    if(window.__dcMuted){silencia();return true}
    parar();/* nunca duas falas ao mesmo tempo */
    if(/^Olá, Patricia\. Eu sou a Daisy e posso te ajudar agora com:/.test(t)&&PRES.has('menu_intro')&&modo==='natural'){return tocaLista(PRES.has('opc_zero')?['menu_intro','opc_zero']:['menu_intro'],v,stopAll)}
    {for(const r of RULES){if(r[0].test(t)&&r[1].every(i=>i[0]==='?'||PRES.has(i)))return tocaLista(r[1].map(i=>i[0]==='?'?i.slice(1):i).filter(i=>PRES.has(i)),v,stopAll)}}
    if(/^Não há horários livres para /.test(t)){silencia();return true}/* gravação antiga não corresponde a este texto */
    if(fk&&PREF.has(fk))return false;
    let L0=AUTO[h];
    if(!L0&&OPT[h]&&PRES.has(OPT[h]))L0=[OPT[h]];
    if(!L0&&modo==='natural'&&/^Encontrei \d+ op[çc][õo]es para /i.test(t))L0=['gen_opt','c6f74a82','6d2e5af5','6ff454a3'];
    if(modo!=='natural'||!L0)return false;
    return tocaLista(L0,v,stopAll);
  }catch(e){return false}
};
function rotulo(){return modo==='natural'?'🗣 Voz: natural (resposta completa)':'🎙 Voz: gravada (frases curtas)'}
function botoes(){
  document.querySelectorAll('.voice-controls,.wa-voice-controls').forEach(box=>{
    let b=box.querySelector('.dc-vmode');
    if(!b){b=document.createElement('button');b.type='button';b.className='btn ghost dc-vmode';b.style.cssText='grid-column:1/-1;border:1px solid rgba(242,193,90,.55);color:inherit';
      b.onclick=()=>{modo=modo==='natural'?'gravada':'natural';try{localStorage.setItem('dcVozModo2',modo)}catch(e){};parar();botoes();if(typeof toast==='function')toast(modo==='natural'?'Voz natural: a Daisy fala a resposta inteira, com datas, horários e especialidades.':'Voz gravada: frases curtas da Daisy.')};box.appendChild(b)}
    b.textContent=rotulo();
  });
}
let nb=0;const ivb=setInterval(()=>{botoes();if(++nb>25)clearInterval(ivb)},500);
const css=`
#whatsapp .wa-chat-card.phone{aspect-ratio:9/17.4!important;min-width:372px;border-radius:50px!important}
@media(min-width:1181px){#whatsapp .chat-shell{grid-template-columns:minmax(0,1fr) minmax(400px,430px)!important}}
@media(max-width:560px){#whatsapp .wa-chat-card.phone{min-width:0!important;width:100%!important;aspect-ratio:auto!important}}
.nav button#themeBtn{display:flex;align-items:center;justify-content:flex-start;gap:8px;width:100%;margin-top:6px;text-align:left;
  border:1px solid rgba(242,193,90,.38)!important;background:rgba(242,193,90,.07)!important;color:#fff3d0!important;font-weight:800;border-radius:14px;padding:10px 12px}
.nav button#themeBtn,.nav button#themeBtn2{display:flex;align-items:center;justify-content:flex-start;gap:8px;width:100%;margin-top:6px;text-align:left;border:1px solid rgba(242,193,90,.38)!important;background:rgba(242,193,90,.07)!important;color:#fff3d0!important;font-weight:800;border-radius:14px;padding:10px 12px;min-height:48px;font-size:15px!important}
.nav button#themeBtn:hover,.nav button#themeBtn2:hover{background:rgba(242,193,90,.16)!important}
.side-footer{display:none!important}
`;
const st=document.createElement('style');st.id='dcPhone59';st.textContent=css;document.head.appendChild(st);
function mover(){
  const b=$('#themeBtn'),fin=$('.sidebar .nav button[data-page="finance"]');
  if(!b||!fin)return false;
  if(b.previousElementSibling===fin)return true;
  b.textContent='◐ Modo claro / escuro';
  fin.insertAdjacentElement('afterend',b);
  /* a equipe tem outro menu: cópia do botão no fim dele */
  const navs=[...document.querySelectorAll('.sidebar nav.nav')],tn=navs.find(n=>n!==b.closest('nav'));
  if(tn&&!$('#themeBtn2')){const c=document.createElement('button');c.id='themeBtn2';c.type='button';c.textContent=b.textContent;c.className='dc-theme2';c.onclick=()=>b.click();tn.appendChild(c)}
  return true;
}
let n=0;const iv=setInterval(()=>{mover();if(++n>25)clearInterval(iv)},400);
document.addEventListener('DOMContentLoaded',mover);

/* ---- serviço de voz: liga/desliga de verdade ---- */
/* clipe de segurança sem a frase final 'dados confirmados' */
try{const v0=window.__DAISY_OFFICIAL_VOICE_4035;if(v0&&v0.library){v0.library.security_verify='data:audio/mpeg;base64,__SEC__';if(v0.cache&&v0.cache.delete)v0.cache.delete('security_verify')}}catch(e){}
const offi=()=>window.__DAISY_OFFICIAL_VOICE_4035;
function silencia(){
  try{parar()}catch(e){}
  const v=offi();
  try{if(v){v.queue=[];if(v.current){const c=v.current;v.current=null;c.onended=null;try{c.stop()}catch(e){}}v.busy=false}}catch(e){}
  try{window.speechSynthesis&&window.speechSynthesis.cancel()}catch(e){}
  try{document.querySelectorAll('audio').forEach(a=>{try{a.pause()}catch(e){}})}catch(e){}
}
function ligado(){const v=offi();return !!(v&&v.active)&&!window.__dcMuted}
function rotVoz(){
  const on=ligado();
  ['muteBtnApp','muteBtnWa'].forEach(id=>{
    const b=document.getElementById(id);if(!b)return;
    const tx=on?'🔊 Serviço de voz ativo':'🔇 Serviço de voz desligado';
    if(b.textContent!==tx)b.textContent=tx;
    b.title=on?'Clique para desligar o serviço de voz':'Clique para ativar o serviço de voz';
    b.setAttribute('aria-pressed',String(on));
  });
  document.querySelectorAll('.official-voice-note').forEach(n=>{const tx=on?'Serviço de voz ativo · App e WhatsApp':'Serviço de voz desligado · clique no botão para ativar';if(n.textContent!==tx)n.textContent=tx});
}
function avisoVoz(m){try{(window.toast||window.toast4036||(()=>{}))(m)}catch(e){}}
const tmOrig=window.toggleMute;
window.toggleMute=async function(){
  if(ligado()){window.__dcMuted=true;try{voiceMuted=true}catch(e){}window.__daisyVoiceMuted=true;silencia();rotVoz();avisoVoz('Serviço de voz desligado');return}
  window.__dcMuted=false;
  const v=offi();
  if(!(v&&v.active)){try{if(tmOrig)await tmOrig()}catch(e){}}
  const v2=offi();if(v2)v2.active=true;
  try{voiceMuted=false}catch(e){}window.__daisyVoiceMuted=false;
  rotVoz();avisoVoz('Serviço de voz ativo');
  let ch='app';try{const id=(window.event&&window.event.target&&(window.event.target.id||''))||'';if(/Wa$/.test(id))ch='wa';else if(!id){const w=document.querySelector('#whatsapp');if(w&&w.classList.contains('active'))ch='wa'}}catch(e){}
  let feito=false;const menu=()=>{if(feito)return;feito=true;try{
    if(window.__dcMuted)return;
    let ss=null;try{ss=state.sessions[ch]}catch(e){}
    if(ss&&ss.flow){ /* já há uma opção em andamento: a Daisy retoma a última fala, sem reler o menu */
      const body=document.querySelector(ch==='wa'?'#waBody':'#appBody');
      const rows=body?[...body.querySelectorAll('.bubble-row:not(.user) .bubble')]:[];
      const u=window.__dcUlt;
      if(u&&typeof window.speakOfficialDaisy==='function')window.speakOfficialDaisy(u.t,u.tp);
    }else if(typeof window.showMenu==='function')window.showMenu(ch)
  }catch(e){}};
  try{const a=new Audio('falas/auto/voz_ativa.mp3');a.onended=menu;a.onerror=menu;const p=a.play();if(p&&p.catch)p.catch(menu);setTimeout(menu,5000)}catch(e){menu()}
};
try{toggleMute=window.toggleMute}catch(e){}
['speakOfficialDaisy','playOfficialDaisyClip'].forEach(nm=>{
  const f=window[nm];if(typeof f!=='function')return;
  window[nm]=function(a){
    if(window.__dcMuted)return Promise.resolve(false);
    if(nm==='playOfficialDaisyClip'&&a==='voice_active')return Promise.resolve(true);
    if(nm==='speakOfficialDaisy'&&a&&arguments[1])window.__dcUlt={t:a,tp:arguments[1]};
    return f.apply(this,arguments);
  };
});
let nv=0;const ivv=setInterval(()=>{
  rotVoz();
  ['muteBtnApp','muteBtnWa'].forEach(id=>{const b=document.getElementById(id);if(b&&!b.__dcObs){b.__dcObs=1;try{new MutationObserver(()=>rotVoz()).observe(b,{childList:true,characterData:true,subtree:true})}catch(e){}}});
  if(++nv>40)clearInterval(ivv);
},500);

/* exames de sangue/urina/DNA e procedimentos: abre o preparo, sem cair no aviso de medicamentos */
(function(){
  const sc=window.sendChat;if(typeof sc!=='function')return;
  const RX=/(exames?|procedimentos?)\s*(de|do|da)?\s*(sangue|urina|fezes|dna|imagem|cirurgic\w*|diagnostic\w*)|(cirurgic\w*|diagnostic\w*)\s*(ou|e)?\s*(diagnostic\w*|simples)|^(sangue|urina|dna|fezes)$/;
  const NO=/resultado|laudo|dor |sintoma|medicament|remedio|insulina/;
  window.sendChat=function(ch){
    try{
      const inp=ch==='wa'?document.querySelector('#waInput'):document.querySelector('#appInput');
      const raw=((inp&&inp.value)||'').trim();
      const n=raw.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
      const s=(typeof state!=='undefined'&&state.sessions&&state.sessions[ch])||{};
      if(raw&&!s.flow&&RX.test(n)&&!NO.test(n)&&typeof window.openPrepMenu==='function'){
        const _cat=/sangue/.test(n)?'01':/urina|fezes/.test(n)?'06':/imagem/.test(n)?'03':/cirurgic|microcirurgia/.test(n)?'02':'';if(_cat){state.sessions[ch]={flow:'prep',step:'cat',data:{}};inp.value=_cat;window.__dcShowAs=raw;return sc.apply(this,arguments)}inp.value='';addBubble(ch,raw,true);window.openPrepMenu(ch);return;
      }
    }catch(e){}
    return sc.apply(this,arguments);
  };
  try{sendChat=window.sendChat}catch(e){}
})();
})();

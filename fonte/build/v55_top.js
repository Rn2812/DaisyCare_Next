/* ===== DaisyCare v40.55 · Barra superior fixa (marca) + caixa de título da página, sem selo de simulação e sem versão ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const H=94; /* altura da barra (px) */
const css=`
:root{--dc-coral:#f0875f;--dc-mint:#5fd3a4;--dc-gold:#f2c15a;--dc-deep:#071f1b;--dc-serif:Georgia,'Times New Roman',serif;--dc-mono:Consolas,'Courier New',monospace}
@media(min-width:901px){
  html,body{overflow-x:clip!important;overflow-y:visible!important}
  .app{padding-top:${H}px!important;overflow:visible!important;overflow-x:clip!important}
  header.top{position:fixed!important;top:0;left:0;right:0;z-index:80;height:${H}px;min-height:${H}px!important;padding:0 28px 0 0!important;gap:0!important;flex-wrap:nowrap!important;align-items:stretch!important;
    background:linear-gradient(90deg,#052d25 0,#073c31 45%,#0b4a3b 100%)!important;color:#fff;
    border-bottom:1px solid rgba(242,193,90,.55)!important;box-shadow:0 1px 0 rgba(242,193,90,.12),0 10px 26px rgba(0,0,0,.18);backdrop-filter:none}
  header.top>div:not(.dc-brand):not(.dc-grow):not(.top-meta):not(.top-act){display:none!important}
  header.top .dc-grow{flex:1}
  header.top .top-meta{align-self:center}
  header.top .top-act{align-self:center;margin-left:14px}
  .dc-brand{display:flex;align-items:center;gap:16px;padding:0 28px 0 24px;flex:none;color:#fff;height:100%}
  .dc-brand .spin-logo{width:86px!important;height:86px!important;flex:none;border-radius:0!important;padding:0!important;background:none!important;box-shadow:none!important;
    filter:drop-shadow(0 0 8px rgba(242,193,90,.45))!important}
  .dc-bt{display:flex;align-items:center;gap:18px;line-height:1;white-space:nowrap}
  .dc-bt b{font:400 clamp(36px,3.1vw,46px)/1 var(--dc-serif);letter-spacing:-.01em;color:var(--dc-coral);font-style:italic}
  .dc-bt b i{color:var(--dc-coral);font-style:italic}
  .dc-bt span{font:700 clamp(12px,1vw,14.5px) var(--dc-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--dc-mint);padding-left:18px;border-left:1px solid rgba(242,193,90,.45)}
  .sidebar .brand{display:none!important}
  .app>.sidebar{align-self:start!important}
  .sidebar{position:sticky!important;top:${H}px!important;height:calc(100vh - ${H}px)!important;max-height:none!important}
  #dcDrawer{top:${H+8}px!important;max-height:calc(100vh - ${H+24}px)!important}
  #dcTitle{margin:12px 32px 0;padding:11px 26px;border:1px solid rgba(95,211,164,.24);border-left:3px solid var(--dc-coral);border-radius:16px;
    background:linear-gradient(135deg,#0b2b25,#071f1b);color:#f6f1e6;box-shadow:none}
  #dcTitle .ey,#dcTitle .bars{display:none!important}
  #dcTitle h1{margin:0;font:400 clamp(26px,2.3vw,34px)/1.15 var(--dc-serif);letter-spacing:0;color:#f6f1e6}
  .page{padding-top:14px!important}
}
@media(min-width:901px) and (max-width:1180px){.dc-bt span{display:none}}
body.dark .data-box span{color:#c3d4cd!important}
body.dark #rules2 .kp,body.dark #rules2 .rc .kp{color:#7be0b4!important}
body.dark .kz-chip.on,body.dark .ch.on{color:#06251e!important}
.top .kicker,.top-act .mvp{display:none!important}
.side-footer .muted,.side-footer span{display:none!important}
@media(max-width:900px){.dc-brand,#dcTitle{display:none!important}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function titleHtml(t){return esc(String(t||'').trim())}
function sync(){
  const box=$('#dcTitle'),t=$('#topTitle');if(!box||!t)return;
  const id=($('.page.active')||{}).id,btn=id&&$('.sidebar .nav button[data-page="'+id+'"]');
  const num=btn&&btn.querySelector('small')?btn.querySelector('small').textContent.trim():'';
  const nv=btn&&btn.closest('nav');
  const grp=nv?(nv.getAttribute('data-g')==='p'?'Paciente':'Equipe do hospital'):'DaisyCare';
  const ey=(num?'§ '+num+' · ':'')+grp,h=titleHtml(t.textContent);
  const e1=box.querySelector('.ey'),h1=box.querySelector('h1');
  if(e1.textContent!==ey)e1.textContent=ey;
  if(h1.innerHTML!==h)h1.innerHTML=h;
}
function build(){
  const top=$('header.top');if(!top)return false;
  $$('.top .kicker,.top-act .mvp').forEach(e=>e.remove());
  if(!$('.dc-brand')){
    const lg=$('.sidebar .brand img');
    const b=document.createElement('div');b.className='dc-brand';
    b.innerHTML=(lg?'<img class="spin-logo" src="'+lg.src+'" alt="DaisyCare">':'')+'<div class="dc-bt"><b>DaisyCare</b><span>Mater Dei · MVP Off line</span></div>';
    top.insertBefore(b,top.firstChild);
    const g=document.createElement('div');g.className='dc-grow';b.insertAdjacentElement('afterend',g);
  }
  if(!$('#dcTitle')){
    const bx=document.createElement('div');bx.id='dcTitle';
    bx.innerHTML='<div class="ey"></div><h1></h1>';
    top.insertAdjacentElement('afterend',bx);
    const t=$('#topTitle');if(t)new MutationObserver(sync).observe(t,{childList:true,characterData:true,subtree:true});
    new MutationObserver(sync).observe($('main.main')||document.body,{subtree:true,attributes:true,attributeFilter:['class']});
  }
  sync();
  const mt=$('#uxMt');if(mt&&mt.textContent==='DaisyCare')mt.textContent='DaisyCare · Mater Dei · MVP Off line';
  document.title='DaisyCare · Mater Dei | MVP Off line';
  const bt=$('.brand-title span');if(bt)bt.textContent='Mater Dei · MVP Off line';
  const ft=$('.side-footer .muted');if(ft)ft.textContent='';
  return true;
}
let n=0;const iv=setInterval(()=>{build();if(++n>25)clearInterval(iv)},400);
document.addEventListener('DOMContentLoaded',build);
})();

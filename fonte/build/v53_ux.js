/* ===== DaisyCare v40.53 · Camada de UX: leitura, toque, navegação por perfil, menu do celular, cabeçalho enxuto ===== */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const css=`
:root{--muted:#5a5180;--line:#d9ccf7}
html{scroll-behavior:smooth}
body{font-size:16px;line-height:1.5;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
body.bold{font-weight:500}body.bold b,body.bold strong,body.bold h1,body.bold h2,body.bold h3{font-weight:800}
body.sp{line-height:1.7}body.sp p,body.sp li{line-height:1.7!important}
body.hc{--ink:#120d2b;--muted:#2b2350;--line:#3c3070}
body.hc .card,body.hc .kpi,body.hc .cc{border-color:#3c3070!important;border-width:2px!important}
body.hc .btn.ghost{border-color:#3c3070!important;border-width:2px!important}
.skip{position:fixed;left:12px;top:-60px;z-index:10000;background:#4b3bb5;color:#fff;padding:12px 18px;border-radius:12px;font:800 15px var(--font);text-decoration:none;transition:top .15s}
.skip:focus{top:12px}
/* --- tipografia mínima e alvos de toque --- */
.kicker,.welcome-mini,.nav-label,.side-footer .muted{font-size:12.5px!important;letter-spacing:.09em!important}
.muted,small,.tag,.pill,.status,.dc-tag,.mut,.ks,.sub,.official-voice-note{font-size:max(13px,1em)}
button,.btn,select,input:not([type=checkbox]):not([type=radio]),textarea{min-height:44px;font-size:max(15px,1em)}
.btn{padding:10px 18px;border-radius:14px;font-weight:700;transition:transform .12s,box-shadow .12s,background .12s}
.btn:hover{transform:translateY(-1px)}
.btn.compact,button.compact{min-height:40px;font-size:14px!important;padding:8px 14px}
.btn:not(.ghost):not(.compact){background-image:linear-gradient(135deg,#6a46e5,#8a68f2)}
body.big .btn,body.big button:not(.hov):not(.ch):not(.kz-chip){min-height:54px;font-size:17px!important}
body.big .nav button{min-height:58px!important}
#bi .seg button,#bi .ch,.rf .ch,.kz-chip,#bi .btn{min-height:40px}
#bi .seg button{padding:8px 14px}
.nav button{min-height:48px;font-size:15px!important;border-radius:14px}
.nav button small{font-size:12.5px!important;color:rgba(255,255,255,.78)!important;opacity:1}
#dcDrawer .btn,#dcDrawer .tb button{background-image:none!important;color:#4b3bb5!important;font-size:14.5px!important}
#dcDrawer .btn.pri,#dcDrawer .tb button.on{background:#6250d6!important;color:#fff!important}
#dcWel h2{font-size:26px!important}#dcWel p{font-size:16px!important}
.nav button.active{background:linear-gradient(135deg,rgba(255,255,255,.2),rgba(255,255,255,.08))!important}
.nav button:focus-visible,.btn:focus-visible,button:focus-visible{outline:3px solid #ffb703!important;outline-offset:2px!important}
.main :focus-visible{outline:3px solid #6250d6!important;outline-offset:2px!important}
/* --- contraste (WCAG AA) --- */
body:not(.dark) .patient-tags>span,body:not(.dark) #kzStars{color:#4a2bb8!important}
body:not(.dark) .family-card>span,body:not(.dark) .data-box>span{color:#5a5180!important}
body:not(.dark) .rc .id,body:not(.dark) #rules2 .id{color:#4a2bb8!important}
.chip{font-size:12.5px!important}
body:not(.dark) .status.crit{color:#8f2a3c!important}
body:not(.dark) .status.warn{color:#7a4a00!important}
body:not(.dark) .status.ok,body:not(.dark) .status.good{color:#0b6644!important}
body:not(.dark) #rules2 .rc .kp,body:not(.dark) #rules2 .kp{color:#0b6644!important}
#audit .mut,#audit .mg .mut{color:#b6c4d8!important}
.main a{display:inline-block;min-height:24px}
/* --- texto dentro de gráficos SVG: tamanho final legível --- */
svg[data-sc] text{font-size:calc(12.5px / var(--sc,1))!important}
/* --- painel de acessibilidade: abre sob o cabeçalho --- */
#dcDock{display:none!important}
#dcDrawer{top:76px!important;bottom:auto!important;right:18px!important;max-height:calc(100vh - 96px)!important;border-radius:22px}
@media(max-width:900px){#dcDrawer{left:8px!important;right:8px!important;top:64px!important;width:auto!important;max-height:calc(100vh - 150px)!important}}
.brand-title span{letter-spacing:.04em!important;font-size:12px!important}
/* --- cabeçalho --- */
header.top{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--bg,#fbf8ff) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);padding:14px 32px!important;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
header.top h1{font-size:clamp(22px,2.2vw,30px)!important;margin:2px 0 0!important}
header.top .top-meta{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
header.top .top-meta .pill[data-kind=tech]{display:none}
body.view-s header.top .top-meta .pill[data-kind=tech]{display:inline-flex}
header.top #themeStatus{display:none}
.top-act{display:flex;align-items:center;gap:10px}
.top-act .mvp{font:800 12px var(--font);letter-spacing:.06em;text-transform:uppercase;background:rgba(235,104,52,.14);color:#a8431b;border-radius:999px;padding:7px 12px}
.top-act button{border:2px solid #6250d6;background:#fff;color:#4b3bb5;border-radius:999px;padding:8px 16px;font:800 14.5px var(--font);cursor:pointer;min-height:44px}
body.dark .top-act button{background:transparent;color:#cfc6ff;border-color:#9a8cf0}
.page{padding:26px 32px 40px!important}
.page.active{animation:uxfade .25s ease}
@keyframes uxfade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
body.rm .page.active{animation:none}
.card{border-radius:20px}
/* --- barra lateral e perfil --- */
.vsw{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:6px 4px 14px;background:rgba(255,255,255,.08);border-radius:16px;padding:5px}
.vsw button{border:0;background:transparent;color:#d6efe7;border-radius:12px;font:800 13.5px var(--font);padding:10px 6px;cursor:pointer;min-height:44px;line-height:1.2}
.vsw button.on{background:#fff;color:#073c31;box-shadow:0 4px 12px rgba(0,0,0,.2)}
body.view-p [data-g=s],body.view-s [data-g=p]{display:none!important}
.sidebar .side-card{font-size:13px}
/* --- celular --- */
.mtop,.mbar,.mdr{display:none}
@media(max-width:900px){
  .sidebar{display:none!important}
  .app{display:block!important}
  .mtop{display:flex;position:fixed;top:0;left:0;right:0;z-index:900;height:58px;align-items:center;gap:10px;padding:0 12px;background:#052d25;color:#fff}
  .mtop b{flex:1;font:800 16.5px var(--font);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .mtop button{border:0;background:rgba(255,255,255,.14);color:#fff;border-radius:12px;min-width:46px;min-height:44px;font:800 15px var(--font);cursor:pointer}
  .main{padding-top:58px!important;padding-bottom:84px!important}
  header.top{position:static;padding:12px 16px!important}
  header.top .top-act{display:none}
  .page{padding:16px 14px 30px!important}
  .mbar{display:grid;grid-template-columns:repeat(5,1fr);position:fixed;left:0;right:0;bottom:0;z-index:900;background:#fff;border-top:1px solid var(--line);padding:6px 4px calc(6px + env(safe-area-inset-bottom));box-shadow:0 -6px 20px rgba(60,40,120,.12)}
  body.dark .mbar{background:#0e1f1b}
  .mbar button{border:0;background:transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:#4b3bb5;font:800 12px/1.15 var(--font);min-height:56px;border-radius:12px;cursor:pointer;padding:4px 2px}
  body.dark .mbar button{color:#cfc6ff}
  .mbar button i{font-style:normal;font-size:21px;line-height:1}
  .mbar button.on{background:rgba(98,80,214,.14)}
  .mdr{position:fixed;inset:0;z-index:950;background:rgba(10,8,30,.55)}
  .mdr.on{display:block}
  .mdr nav{position:absolute;left:0;top:0;bottom:0;width:min(340px,88vw);background:#052d25;color:#fff;overflow:auto;padding:16px 12px 24px}
  .mdr nav h3{margin:6px 8px 12px;font:800 18px var(--font);color:#fff}
  .mdr nav .lbl{margin:14px 8px 6px;font:800 12px var(--font);letter-spacing:.1em;text-transform:uppercase;color:#e6be62}
  .mdr nav button.it{display:flex;width:100%;text-align:left;gap:10px;align-items:center;border:0;background:transparent;color:#fff;font:700 17px var(--font);padding:12px 12px;border-radius:14px;min-height:54px;cursor:pointer}
  .mdr nav button.it.on{background:rgba(255,255,255,.16)}
  #dcDock{bottom:78px!important;right:10px!important}
  #dcDrawer{bottom:130px!important}
}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

const P_PAGES=['patient','appchat','kids','whatsapp','finance'];
let view=(()=>{try{return localStorage.getItem('daisycare_view')||'p'}catch(e){return 'p'}})();
const groupOf=id=>P_PAGES.includes(id)?'p':'s';
function setView(v,go){
  view=v;try{localStorage.setItem('daisycare_view',v)}catch(e){}
  document.body.classList.toggle('view-p',v==='p');document.body.classList.toggle('view-s',v==='s');
  $$('.vsw button').forEach(b=>{const on=b.dataset.v===v;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
  buildBar();
  if(go){const cur=($('.page.active')||{}).id;if(!cur||groupOf(cur)!==v)window.showPage(v==='p'?'patient':'smartqueue')}
}
function labelOf(btn){return btn.textContent.replace(/\s*\d+\s*$/,'').trim()}
function iconOf(btn){return labelOf(btn).split(' ')[0]}
function textOf(btn){return labelOf(btn).split(' ').slice(1).join(' ')}
/* --- estrutura: landmarks, perfil, cabeçalho, barra do celular --- */
function build(){
  if($('#uxReady'))return;
  const sb=$('.sidebar');if(!sb)return;
  const marker=document.createElement('i');marker.id='uxReady';marker.hidden=true;document.body.appendChild(marker);
  document.documentElement.lang='pt-BR';
  const main=$('main.main');if(main){main.id='main';main.setAttribute('tabindex','-1')}
  const skip=document.createElement('a');skip.className='skip';skip.href='#main';skip.textContent='Pular para o conteúdo';document.body.insertBefore(skip,document.body.firstChild);
  skip.onclick=e=>{e.preventDefault();if(main)main.focus()};
  const labels=$$('.sidebar .nav-label'),navs=$$('.sidebar nav.nav');
  [['p','Menu do paciente'],['s','Menu da equipe do hospital']].forEach(([g,t],i)=>{if(labels[i])labels[i].dataset.g=g;if(navs[i]){navs[i].dataset.g=g;navs[i].setAttribute('aria-label',t)}});
  const sc=$('.sidebar .side-card');if(sc)sc.dataset.g='s';
  const vsw=document.createElement('div');vsw.className='vsw';vsw.setAttribute('role','group');vsw.setAttribute('aria-label','Quem está usando');
  vsw.innerHTML='<button data-v="p">Sou paciente</button><button data-v="s">Sou da equipe</button>';
  const brand=$('.sidebar .brand');brand.insertAdjacentElement('afterend',vsw);
  $$('button',vsw).forEach(b=>b.onclick=()=>setView(b.dataset.v,true));
  const toast=$('#toast');if(toast){toast.setAttribute('role','status');toast.setAttribute('aria-live','polite')}
  ['appBody','waBody'].forEach(id=>{const e=document.getElementById(id);if(e){e.setAttribute('tabindex','0');e.setAttribute('role','log');e.setAttribute('aria-label','Conversa com a Daisy')}});
  // cabeçalho
  const top=$('header.top');
  if(top){const act=document.createElement('div');act.className='top-act';act.innerHTML='<span class="mvp" title="Dados e integrações fictícios">MVP simulado</span><button type="button" id="uxA11y"><span aria-hidden="true">Aa</span> Acessibilidade</button>';top.appendChild(act);$('#uxA11y').onclick=()=>{const b=$('#dcBtn');if(b)b.click()}}
  // celular
  const mt=document.createElement('div');mt.className='mtop';mt.innerHTML='<button type="button" id="uxMenu" aria-label="Abrir menu">☰</button><b id="uxMt">DaisyCare</b><button type="button" id="uxMa" aria-label="Acessibilidade">Aa</button>';document.body.insertBefore(mt,document.body.firstChild.nextSibling);
  $('#uxMenu').onclick=()=>openDrawer(true);$('#uxMa').onclick=()=>{const b=$('#dcBtn');if(b)b.click()};
  const bar=document.createElement('nav');bar.className='mbar';bar.id='uxBar';bar.setAttribute('aria-label','Navegação principal');document.body.appendChild(bar);
  const dr=document.createElement('div');dr.className='mdr';dr.id='uxDr';dr.innerHTML='<nav aria-label="Todas as telas"></nav>';document.body.appendChild(dr);
  dr.addEventListener('click',e=>{if(e.target===dr)openDrawer(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')openDrawer(false)});
  setView(view,false);
  const cur=($('.page.active')||{}).id;if(cur&&groupOf(cur)!==view)setView(groupOf(cur),false);
}
function openDrawer(on){const d=$('#uxDr');if(!d)return;if(on){buildDrawer()}d.classList.toggle('on',on);if(on){const f=$('button.it',d);if(f)f.focus()}}
function go(id){window.showPage(id);openDrawer(false)}
function buildBar(){
  const bar=$('#uxBar');if(!bar)return;
  const ids=view==='p'?['patient','appchat','whatsapp','finance']:['smartqueue','medmonitor','operation','bi'];
  bar.innerHTML=ids.map(id=>{const b=$('.sidebar .nav button[data-page="'+id+'"]');return b?'<button type="button" data-p="'+id+'"><i aria-hidden="true">'+iconOf(b)+'</i>'+textOf(b).replace('Monitoramento médico','Médicos').replace('Operação hospitalar','Operação').replace('Indicadores BI','Indicadores').replace('Chat no App','Chat').replace('Pix/Boleto','Pix e boleto')+'</button>':''}).join('')+'<button type="button" data-p="__menu"><i aria-hidden="true">☰</i>Mais</button>';
  $$('button',bar).forEach(b=>b.onclick=()=>b.dataset.p==='__menu'?openDrawer(true):go(b.dataset.p));
  mark();
}
function buildDrawer(){
  const nav=$('#uxDr nav');
  const grp=(t,sel)=>'<div class="lbl">'+t+'</div>'+$$(sel+' button').map(b=>'<button type="button" class="it" data-p="'+b.dataset.page+'"><span aria-hidden="true">'+iconOf(b)+'</span>'+textOf(b)+'</button>').join('');
  nav.innerHTML='<h3>DaisyCare · Mater Dei</h3><div class="vsw"><button data-v="p">Sou paciente</button><button data-v="s">Sou da equipe</button></div>'+grp('Paciente','.sidebar nav.nav[data-g=p]')+grp('Equipe do hospital','.sidebar nav.nav[data-g=s]')+'<div class="lbl">Preferências</div><button type="button" class="it" id="uxDa"><span aria-hidden="true">Aa</span>Acessibilidade e falas</button><button type="button" class="it" id="uxDt"><span aria-hidden="true">◐</span>Alternar claro/escuro</button>';
  $$('button.it[data-p]',nav).forEach(b=>b.onclick=()=>{setView(groupOf(b.dataset.p),false);go(b.dataset.p)});
  $$('.vsw button',nav).forEach(b=>{b.classList.toggle('on',b.dataset.v===view);b.onclick=()=>{setView(b.dataset.v,true);openDrawer(false)}});
  $('#uxDa').onclick=()=>{openDrawer(false);const x=$('#dcBtn');if(x)x.click()};$('#uxDt').onclick=()=>{const t=$('#themeBtn');if(t)t.click()};
  mark();
}
function mark(){
  const cur=($('.page.active')||{}).id;
  $$('.sidebar .nav button').forEach(b=>{if(b.dataset.page===cur)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  $$('#uxBar button, #uxDr button.it').forEach(b=>{const on=b.dataset.p===cur;b.classList.toggle('on',on);if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  const t=$('#topTitle'),m=$('#uxMt');if(t&&m)m.textContent=t.textContent;
}
/* --- escala real dos gráficos SVG --- */
function svgScale(){
  $$('.main svg').forEach(sv=>{
    if(sv.closest('.phone')||!sv.querySelector('text'))return;
    const vb=sv.viewBox&&sv.viewBox.baseVal;if(!vb||!vb.width)return;
    const w=sv.getBoundingClientRect().width;if(!w)return;
    const z=parseFloat(document.body.style.zoom)||1;let sc=Math.max(.2,(w/z)/vb.width);
    if(sc<.85&&!sv.closest('.kz-wrap')){sv.style.minWidth=Math.round(vb.width*.85)+'px';const pr=sv.parentElement;if(pr){pr.style.overflowX='auto';pr.style.webkitOverflowScrolling='touch'}sc=.85}
    sv.dataset.sc='1';sv.style.setProperty('--sc',sc.toFixed(3));
  });
}
/* --- piso de tamanho de letra --- */
function floor(root){
  svgScale();
  (root||document).querySelectorAll('.main *, .sidebar *, .mdr *, #dcDrawer *').forEach(e=>{
    if(e.closest('svg')||e.closest('.phone'))return;
    if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>0))return;
    const cs=getComputedStyle(e),fs=parseFloat(cs.fontSize);
    if(fs>0&&fs<13){const up=cs.textTransform==='uppercase'||parseFloat(cs.letterSpacing)>0.6;e.style.setProperty('font-size',(up?12.5:13.5)+'px','important')}
  });
}
let ft=0;const sched=()=>{if(ft)return;ft=setTimeout(()=>{ft=0;floor()},120)};
function wrapShow(){
  const S=window.showPage;if(typeof S!=='function'||S.__ux)return;
  const W=function(id){const r=S.apply(this,arguments);try{if(groupOf(id)!==view)setView(groupOf(id),false);mark();sched();requestAnimationFrame(()=>requestAnimationFrame(()=>{try{floor()}catch(e){}}));setTimeout(()=>{try{floor()}catch(e){}},700);const m=$('main.main');if(m&&matchMedia('(max-width:900px)').matches)window.scrollTo(0,0)}catch(e){}return r};
  W.__ux=1;window.showPage=W;try{showPage=W}catch(e){}
}
function init(){
  build();wrapShow();floor();
  addEventListener('resize',sched);const m=$('main.main');if(m)new MutationObserver(sched).observe(m,{childList:true,subtree:true});
  setTimeout(()=>{build();wrapShow();floor()},1800);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,1300));else setTimeout(init,1300);
window.DAISY_UX={setView,floor,view:()=>view};
})();

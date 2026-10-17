/* ===== DaisyCare v40.52 · WhatsApp em moldura de celular: tela fixa, só a conversa rola ===== */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const css=`
body #whatsapp.page .chat-shell{display:grid!important;grid-template-columns:minmax(300px,360px) minmax(340px,430px)!important;justify-content:center!important;gap:34px!important;align-items:start!important}#whatsapp .chat-shell>.chat-side-panel{width:100%!important;max-width:none!important;justify-self:stretch!important}
#whatsapp .wa-col{position:sticky;top:12px;display:flex;flex-direction:column;align-items:center;gap:10px;min-width:0}
#whatsapp .wa-chat-card.phone{width:auto!important;aspect-ratio:9/19.5;max-width:100%;height:min(740px,calc((100vh - 150px) / var(--z,1)))!important;min-height:520px;flex:none;display:flex!important;flex-direction:column!important;padding:0!important;overflow:hidden!important;border-radius:54px!important;border:9px solid #15131c!important;background:#efeae2!important;box-shadow:0 34px 80px rgba(30,20,70,.38),0 0 0 2px #3b364a,inset 0 0 0 1px rgba(255,255,255,.06)!important;position:relative;margin:0 auto!important;gap:0!important}
#whatsapp .wa-chat-card.phone::before{content:"";position:absolute;top:8px;left:50%;transform:translateX(-50%);width:84px;height:24px;background:#000;border-radius:20px;z-index:6}
#whatsapp .wa-chat-card.phone>.app-chat-welcome,#whatsapp .wa-chat-card.phone>.chat-status{display:none!important}
#whatsapp .ph-status{flex:none;display:flex;justify-content:space-between;align-items:center;padding:14px 24px 8px;background:#008069;color:#fff;font:700 12px var(--font,system-ui);letter-spacing:.02em}
#whatsapp .ph-head{flex:none;display:flex;align-items:center;gap:10px;padding:6px 12px 10px;background:#008069;color:#fff}
#whatsapp .wa-chat-card.phone input:focus-visible{outline:none!important}#whatsapp .ph-head .back{font:700 22px/1 var(--font,system-ui);opacity:.9}
#whatsapp .ph-head .avatar{width:40px!important;height:40px!important;min-width:40px;border-radius:50%!important;overflow:hidden;background:#d9d2f5;border:2px solid rgba(255,255,255,.55);display:inline-flex}
#whatsapp .ph-head .avatar img{width:100%!important;height:100%!important;object-fit:cover!important;object-position:50% 18%!important}
#whatsapp .ph-head .who{flex:1;min-width:0;line-height:1.2}
#whatsapp .ph-head .who b{display:block;font:800 14.5px var(--font,system-ui);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#whatsapp .ph-head .who small{font:600 11.5px var(--font,system-ui);opacity:.88}
#whatsapp .ph-head .ic{font:700 16px var(--font,system-ui);letter-spacing:.35em;opacity:.92}
#whatsapp .wa-chat-card.phone #waBody{flex:1 1 0!important;min-height:0!important;height:auto!important;max-height:none!important;overflow-y:auto!important;overflow-x:hidden!important;padding:12px 10px 14px!important;margin:0!important;border:0!important;border-radius:0!important;background-color:#efeae2!important;background-image:radial-gradient(rgba(0,0,0,.045) 1.2px,transparent 1.3px),radial-gradient(rgba(0,0,0,.03) 1.2px,transparent 1.3px)!important;background-size:22px 22px,22px 22px!important;background-position:0 0,11px 11px!important;scrollbar-width:thin;overscroll-behavior:contain;display:block!important}
#whatsapp #waBody .bubble-row{display:flex!important;justify-content:flex-start;margin:0 0 5px!important;padding:0!important;gap:0!important;max-width:100%!important;background:transparent!important}
#whatsapp #waBody .bubble-row.user{justify-content:flex-end}
#whatsapp #waBody .bubble-row>.avatar{display:none!important}
#whatsapp #waBody .bubble{background:#fff!important;color:#111b21!important;border-radius:0 12px 12px 12px!important;padding:7px 10px 8px!important;font:400 13px/1.4 var(--font,system-ui)!important;max-width:86%!important;box-shadow:0 1px 1px rgba(11,20,26,.14)!important;white-space:pre-wrap;word-break:break-word;border:0!important}
#whatsapp #waBody .bubble-row.user .bubble{background:#d9fdd3!important;border-radius:12px 0 12px 12px!important}
#whatsapp .wa-chat-card.phone>.chat-input{flex:none;display:flex!important;align-items:center;gap:7px;padding:8px 8px 10px!important;margin:0!important;background:#f0f2f5!important;border:0!important;border-radius:0!important}
#whatsapp .wa-chat-card.phone>.chat-input input{flex:1;min-width:0;height:42px;border:0!important;border-radius:999px!important;padding:0 16px!important;background:#fff!important;color:#111b21!important;font:400 14px var(--font,system-ui)!important;box-shadow:none!important}
#whatsapp .wa-chat-card.phone>.chat-input .btn{flex:none;width:42px;height:42px;min-width:42px;padding:0!important;border-radius:50%!important;border:0!important;display:inline-flex;align-items:center;justify-content:center;font-size:0!important;box-shadow:none!important}
#whatsapp .wa-chat-card.phone>.chat-input .btn-send{background:#008069!important;color:#fff!important}
#whatsapp .wa-chat-card.phone>.chat-input .btn-send::after{content:"➤";font-size:17px;color:#fff}
#whatsapp .wa-chat-card.phone>.chat-input .btn-talk{background:#e6e9ec!important}
#whatsapp .wa-chat-card.phone>.chat-input .btn-talk::after{content:"🎙";font-size:18px}
#whatsapp .ph-home{flex:none;height:18px;background:#f0f2f5;display:flex;justify-content:center;align-items:center}
#whatsapp .ph-home i{width:110px;height:4px;border-radius:4px;background:#15131c;opacity:.75}
#whatsapp .wa-col>.wa-voice-controls{display:flex!important;justify-content:center;width:100%;max-width:340px;margin:0!important}
#whatsapp .wa-col>.wa-voice-controls .btn{width:100%;border-radius:999px!important}
body.dark #whatsapp .wa-chat-card.phone{background:#0b141a!important}
body.dark #whatsapp .wa-chat-card.phone #waBody{background-color:#0b141a!important;background-image:radial-gradient(rgba(255,255,255,.04) 1.2px,transparent 1.3px)!important;background-size:22px 22px!important}
body.dark #whatsapp #waBody .bubble{background:#202c33!important;color:#e9edef!important}
body.dark #whatsapp #waBody .bubble-row.user .bubble{background:#005c4b!important}
body.dark #whatsapp .ph-status,body.dark #whatsapp .ph-head{background:#1f2c34}
body.dark #whatsapp .wa-chat-card.phone>.chat-input,body.dark #whatsapp .ph-home{background:#1f2c34!important}
body.dark #whatsapp .wa-chat-card.phone>.chat-input input{background:#2a3942!important;color:#e9edef!important}
body.dark #whatsapp .wa-chat-card.phone>.chat-input .btn-talk{background:#2a3942!important}
@media(max-width:900px){body #whatsapp.page .chat-shell{grid-template-columns:1fr!important}#whatsapp .wa-col{position:static}#whatsapp .wa-chat-card.phone{height:min(740px,calc(100vh - 190px))!important}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
function clock(){const d=new Date(),t=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');const e=$('#whatsapp .ph-status .t');if(e)e.textContent=t}
function build(){
  const card=$('#whatsapp .wa-chat-card');if(!card||card.classList.contains('phone'))return;
  card.classList.add('phone');
  const src=(($('#whatsapp .wa-preview-avatar img')||$('#whatsapp .wa-avatar-face img')||{}).src)||'';
  const top=document.createElement('div');
  top.innerHTML='<div class="ph-status"><span class="t">10:24</span><span aria-hidden="true">▂▄▆ 5G ▮</span></div><div class="ph-head"><span class="back" aria-hidden="true">‹</span><span class="avatar wa-avatar-face"><img data-wa-daisy-chat="1" src="'+src+'" alt="Daisy no WhatsApp"></span><div class="who"><b>Daisy · Mater Dei</b><small>conta comercial · online</small></div><span class="ic" aria-hidden="true">⋮</span></div>';
  while(top.lastChild)card.insertBefore(top.lastChild,card.firstChild);
  // ordem correta: status, depois header
  const st=card.querySelector('.ph-status'),hd=card.querySelector('.ph-head');card.insertBefore(st,card.firstChild);card.insertBefore(hd,st.nextSibling);
  const home=document.createElement('div');home.className='ph-home';home.innerHTML='';card.appendChild(home);
  const col=document.createElement('div');col.className='wa-col';card.parentNode.insertBefore(col,card);col.appendChild(card);
  const vc=card.querySelector('.wa-voice-controls');if(vc)col.appendChild(vc);
  clock();setInterval(clock,20000);const ph=()=>{const wi=$('#waInput');if(wi)wi.placeholder='Mensagem'};ph();setTimeout(ph,2500);setTimeout(ph,6000);
  const body=$('#waBody');if(body){const go=()=>{body.scrollTop=body.scrollHeight};new MutationObserver(go).observe(body,{childList:true,subtree:true});go()}
}
function init(){build();setTimeout(build,1500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,1000));else setTimeout(init,1000);
})();

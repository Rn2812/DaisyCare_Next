/* ===== DaisyCare v40.49 · sem cabeçalho de pílulas · Espaço Kids refeito · WhatsApp no mesmo esquema do chat ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';

/* =============================== CSS =============================== */
const css=`
.top-meta{display:none!important}
header.top{min-height:0}
/* ---- WhatsApp com o mesmo esquema do chat ---- */
#whatsapp .app-chat-welcome .welcome-daisy-visual{position:relative!important;display:block!important;width:100%!important;aspect-ratio:16/15!important;height:auto!important;min-height:0!important;max-height:none!important;padding:0!important;margin:0 auto!important;border:0!important;border-radius:26px!important;overflow:hidden!important;box-shadow:0 14px 30px rgba(92,60,152,.16)!important;max-width:262px!important}
#whatsapp .app-chat-welcome .welcome-daisy-visual img[data-daisy-hero]{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;object-position:center 12%!important;transform:none!important;filter:none!important;border-radius:0!important;display:block!important}
#whatsapp .app-chat-welcome.app-chat-welcome-v40,#whatsapp .app-chat-welcome{height:auto!important;min-height:0!important;align-items:center!important}
#whatsapp .wa-chat-card{display:flex;flex-direction:column;overflow:hidden}
#whatsapp .wa-chat-card .chat-status .wa-badge{display:inline-flex;align-items:center;gap:6px}
#whatsapp .wa-chat-card .wa-body{flex:1 1 auto;min-height:260px;height:auto;max-height:430px;overflow:auto;border-radius:0!important;margin:0!important;padding:16px 18px!important;background:linear-gradient(180deg,rgba(118,80,232,.04),rgba(37,211,102,.05))!important}
#whatsapp .wa-chat-card .chat-input{display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:14px 18px;border-top:1px solid var(--line)}
#whatsapp .wa-chat-card .chat-input input{flex:1 1 220px;min-width:0}
#whatsapp .wa-chat-card .voice-controls{flex:1 1 100%;display:flex;gap:10px;flex-wrap:wrap;align-items:center}
#whatsapp .wa-chat-card .wa-body .bubble{max-width:82%}
#whatsapp .chat-side-panel .menu-grid{display:flex;flex-wrap:wrap;gap:8px}
#whatsapp .chat-side-panel .menu-grid .btn{flex:1 1 calc(50% - 8px)}
#whatsapp .chat-side-panel .menu-grid .dc-sep{flex:1 1 100%}
/* ---- Espaço Kids ---- */
#kids .kz-wrap{display:grid;gap:14px}
#kids .kz-tabs{display:flex;gap:10px;flex-wrap:wrap}
#kids .kz-tab{display:flex;align-items:center;gap:8px;border:2px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:11px 20px;font:700 15px var(--font);cursor:pointer}
#kids .kz-tab.on{background:linear-gradient(135deg,var(--primary),var(--primary2));border-color:transparent;color:#fff;box-shadow:0 8px 20px rgba(118,80,232,.28)}
#kids .kz-stage{background:var(--card);border:1px solid var(--line);border-radius:26px;padding:22px;box-shadow:var(--shadow);min-height:420px}
#kids .kz-stage h3{margin:0 0 4px;font-size:22px}
#kids .kz-stars{font:800 15px var(--font);color:var(--primary);background:var(--soft);border-radius:999px;padding:9px 16px;white-space:nowrap}
#kids .kz-head{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;flex-wrap:wrap}
#kids .kz-opts{display:grid;gap:10px;margin:14px 0 0;max-width:620px}
#kids .kz-opt{border:2px solid var(--line);background:var(--card2);color:var(--ink);border-radius:16px;padding:14px 18px;text-align:left;font:700 16px var(--font);cursor:pointer;transition:transform .12s}
#kids .kz-opt:hover:not(:disabled){transform:translateY(-1px);border-color:var(--primary)}
#kids .kz-opt.good{background:#dcfce7;border-color:#22c55e;color:#14532d}
#kids .kz-opt.bad{background:#fee2e2;border-color:#f87171;color:#7f1d1d}
#kids .kz-fb{min-height:26px;font-weight:700;margin:12px 0 0}
#kids .kz-scene{display:flex;align-items:center;gap:18px;border-radius:22px;padding:20px;margin:14px 0 4px;color:#1f2937;font-size:18px;line-height:1.45}
#kids .kz-art{font-size:76px;line-height:1;flex:none}
#kids .kz-dots{display:flex;gap:6px;margin:6px 0}
#kids .kz-dots i{width:34px;height:8px;border-radius:6px;background:var(--line)}
#kids .kz-dots i.on{background:var(--primary)}
#kids .kz-picks{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}
#kids .kz-chip{border:1.5px solid var(--line);background:var(--card2);color:var(--ink);border-radius:999px;padding:7px 14px;font:700 13px var(--font);cursor:pointer}
#kids .kz-chip.on{background:var(--primary);border-color:var(--primary);color:#fff}
#kids .kz-mem{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;max-width:520px;margin:12px 0}
#kids .kz-mem.n20{grid-template-columns:repeat(5,minmax(0,1fr))}
#kids .kz-c{position:relative;aspect-ratio:1;border:0;background:none;padding:0;perspective:600px;cursor:pointer}
#kids .kz-c>span{position:absolute;inset:0;display:grid;place-items:center;border-radius:16px;font-size:clamp(26px,4.4vw,44px);transition:transform .35s;backface-visibility:hidden;border:2px solid #c4b5fd}
#kids .kz-c .bk{background:linear-gradient(135deg,#ede9fe,#ddd6fe);color:#7c3aed;font-weight:800}
#kids .kz-c .fr{background:#fff;transform:rotateY(180deg)}
#kids .kz-c.up .bk{transform:rotateY(180deg)}#kids .kz-c.up .fr{transform:rotateY(0)}
#kids .kz-c.ok .fr{background:#dcfce7;border-color:#22c55e}
#kids .kz-c:disabled{cursor:default}
#kids .kz-paint{display:grid;grid-template-columns:minmax(260px,460px) minmax(280px,1fr);gap:20px;align-items:start}
#kids .kz-board{background:#fff;border:2px solid var(--line);border-radius:22px;padding:8px;aspect-ratio:1;display:block;width:100%}
#kids .kz-board svg{width:100%;height:100%;display:block;touch-action:manipulation}
#kids .kz-board .kp{cursor:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><text y='22' font-size='22'>🖌️</text></svg>") 4 24,pointer;stroke:#6b4fa3;stroke-width:2.4;stroke-linejoin:round;stroke-linecap:round}
#kids .kz-board .kp:hover{filter:brightness(.97)}
#kids .kz-board .kd{pointer-events:none;stroke:#3b2a4a;stroke-linecap:round;stroke-linejoin:round}
#kids .kz-pal{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}
#kids .kz-sw{width:34px;height:34px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 2px var(--line);cursor:pointer;padding:0}
#kids .kz-sw.sel{box-shadow:0 0 0 3px var(--primary);transform:scale(1.12)}
#kids .kz-tools{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}
#kids .kz-thumbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px;margin-top:12px}
#kids .kz-th{border:2px solid var(--line);background:#fff;border-radius:14px;padding:4px;cursor:pointer;color:#3b2a4a;font:700 11px var(--font);text-align:center}
#kids .kz-th.on{border-color:var(--primary);box-shadow:0 0 0 2px var(--primary)}
#kids .kz-th svg{width:100%;height:auto;display:block;pointer-events:none}
#kids .kz-modes{display:flex;gap:8px;margin:6px 0 12px}
#kids .kz-guide{background:var(--soft);border:2px solid var(--primary);border-radius:16px;padding:12px 16px;margin-bottom:10px;font-size:15px}
#kids .kz-guide.ok{background:#dcfce7;border-color:#22c55e;color:#14532d}
#kids .kz-guide.shake{animation:kzs .35s}
@keyframes kzs{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
#kids .kz-bar{height:8px;border-radius:6px;background:var(--line);margin-top:8px;overflow:hidden}#kids .kz-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--primary),var(--primary2))}
#kids .kz-board .kp.hl{stroke:#f59e0b;stroke-width:5;animation:kzp 1s ease-in-out infinite}
@keyframes kzp{50%{stroke-width:2.4;filter:brightness(1.05) drop-shadow(0 0 4px #f59e0b)}}
#kids .kz-th small{display:block;font-weight:600;opacity:.7;font-size:10px}
#kids .kz-tf{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;max-width:620px;margin-top:12px}
#kids .kz-simon{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:360px;margin:14px 0}
#kids .kz-pad{aspect-ratio:1;border:0;border-radius:26px;font-size:46px;cursor:pointer;opacity:.55;transition:transform .12s,opacity .12s;box-shadow:inset 0 -6px 0 rgba(0,0,0,.12)}
#kids .kz-pad.lit{opacity:1;transform:scale(1.07);box-shadow:0 0 28px rgba(255,255,255,.9),inset 0 -6px 0 rgba(0,0,0,.12)}
#kids .kz-pad:not(:disabled){opacity:.85}
#kids .kz-hud{display:flex;gap:18px;font:800 16px var(--font);margin:8px 0}
#kids .kz-holes{display:grid;grid-template-columns:repeat(3,92px);gap:12px;margin:10px 0}
#kids .kz-hole{width:92px;height:92px;border-radius:50%;border:0;background:radial-gradient(circle at 50% 35%,#a78bfa,#6d28d9);font-size:46px;cursor:pointer;box-shadow:inset 0 8px 14px rgba(0,0,0,.35)}
#kids .kz-hole.on{background:radial-gradient(circle at 50% 35%,#fde68a,#f59e0b);animation:kzpop .2s}
@keyframes kzpop{from{transform:scale(.6)}to{transform:scale(1)}}
#kids .kz-puz{display:grid;grid-template-columns:repeat(3,92px);gap:8px;margin:12px 0}
#kids .kz-pc{width:92px;height:92px;border-radius:18px;border:2px solid #c4b5fd;background:linear-gradient(135deg,#ede9fe,#ddd6fe);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#5b21b6}
#kids .kz-pc span{font:800 26px var(--font)}#kids .kz-pc em{font-style:normal;font-size:22px}
#kids .kz-pc.ok{background:linear-gradient(135deg,#dcfce7,#bbf7d0);border-color:#22c55e}
#kids .kz-pc.e{background:transparent;border:2px dashed var(--line);cursor:default}
@media(max-width:820px){#kids .kz-paint{grid-template-columns:1fr}#kids .kz-scene{flex-direction:column;text-align:center}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* =============================== KIDS =============================== */
/* desenhos: 'f' = pode pintar · 'd' = detalhe fixo. viewBox 0 0 200 200 */
const F=(t,a,fill)=>({f:1,t,a,fill:fill||'#fff'}),D=(t,a)=>({f:0,t,a});
const EYE='#3b2a4a';
const ART={
 urso:{n:'Urso',e:'🐻',p:[
  F('circle','cx="56" cy="46" r="20"'),F('circle','cx="144" cy="46" r="20"'),
  F('ellipse','cx="44" cy="140" rx="14" ry="26" transform="rotate(18 44 140)"'),F('ellipse','cx="156" cy="140" rx="14" ry="26" transform="rotate(-18 156 140)"'),
  F('ellipse','cx="70" cy="184" rx="20" ry="12"'),F('ellipse','cx="130" cy="184" rx="20" ry="12"'),
  F('ellipse','cx="100" cy="146" rx="50" ry="42"'),F('ellipse','cx="100" cy="152" rx="28" ry="26"'),
  F('circle','cx="100" cy="82" r="46"'),F('circle','cx="56" cy="46" r="10"'),F('circle','cx="144" cy="46" r="10"'),
  F('ellipse','cx="100" cy="98" rx="21" ry="16"'),
  D('ellipse','cx="100" cy="91" rx="8" ry="5.5" fill="'+EYE+'"'),D('path','d="M100 96v7M91 104q9 7 18 0" fill="none" stroke-width="2.4"'),
  D('circle','cx="82" cy="72" r="4.5" fill="'+EYE+'"'),D('circle','cx="118" cy="72" r="4.5" fill="'+EYE+'"')]},
 girafa:{n:'Girafa',e:'🦒',p:[
  F('rect','x="68" y="140" width="15" height="52" rx="7"'),F('rect','x="116" y="140" width="15" height="52" rx="7"'),
  F('rect','x="76" y="44" width="40" height="100" rx="18"'),
  F('ellipse','cx="100" cy="134" rx="50" ry="30"'),
  F('ellipse','cx="74" cy="30" rx="12" ry="7" transform="rotate(-25 74 30)"'),F('ellipse','cx="136" cy="30" rx="12" ry="7" transform="rotate(25 136 30)"'),
  F('ellipse','cx="104" cy="34" rx="30" ry="22"'),
  F('rect','x="88" y="6" width="7" height="16" rx="3"'),F('rect','x="112" y="6" width="7" height="16" rx="3"'),
  F('ellipse','cx="120" cy="44" rx="15" ry="11"'),
  F('circle','cx="92" cy="74" r="7"'),F('circle','cx="104" cy="100" r="7"'),F('circle','cx="76" cy="128" r="9"'),F('circle','cx="118" cy="136" r="9"'),F('circle','cx="96" cy="148" r="6"'),
  D('circle','cx="91" cy="31" r="4" fill="'+EYE+'"'),D('circle','cx="124" cy="42" r="2.3" fill="'+EYE+'"'),D('circle','cx="116" cy="42" r="2.3" fill="'+EYE+'"'),
  D('path','d="M148 120q22 6 24 28" fill="none" stroke-width="3"')]},
 tubarao:{n:'Tubarão',e:'🦈',p:[
  F('path','d="M0 160q25-14 50 0t50 0t50 0t50 0V200H0z"','#fff'),
  F('path','d="M148 108L190 72L180 112L192 152z"'),
  F('path','d="M16 112C38 70 106 56 152 94L152 132C110 150 50 150 16 112z"'),
  F('path','d="M24 120C60 142 112 146 152 128L152 134C110 150 50 150 16 112z"'),
  F('path','d="M84 72L108 24L128 84z"'),F('path','d="M82 124L68 162L108 136z"'),
  D('circle','cx="52" cy="102" r="5" fill="'+EYE+'"'),D('path','d="M24 116Q46 132 74 124" fill="none" stroke-width="2.6"'),
  D('path','d="M104 100q-6 10 0 20M114 100q-6 10 0 20M124 100q-6 10 0 20" fill="none" stroke-width="2.4"'),
  D('path','d="M34 122l5 8 5-8M50 126l5 8 5-8" fill="#fff" stroke-width="1.6"'),
  D('circle','cx="22" cy="80" r="4" fill="none" stroke-width="1.6"'),D('circle','cx="30" cy="66" r="3" fill="none" stroke-width="1.6"')]},
 porquinho:{n:'Porquinho',e:'🐷',p:[
  F('path','d="M58 56L50 16L90 38z"'),F('path','d="M142 56L150 16L110 38z"'),
  F('rect','x="62" y="168" width="22" height="24" rx="9"'),F('rect','x="116" y="168" width="22" height="24" rx="9"'),
  F('ellipse','cx="100" cy="148" rx="56" ry="38"'),
  D('path','d="M154 140q22-6 16-22q-6-12-18-2" fill="none" stroke-width="3.2"'),
  F('circle','cx="100" cy="84" r="50"'),F('ellipse','cx="100" cy="100" rx="24" ry="17"'),
  D('ellipse','cx="91" cy="100" rx="3.6" ry="6" fill="'+EYE+'"'),D('ellipse','cx="109" cy="100" rx="3.6" ry="6" fill="'+EYE+'"'),
  D('circle','cx="80" cy="76" r="5" fill="'+EYE+'"'),D('circle','cx="120" cy="76" r="5" fill="'+EYE+'"'),
  F('circle','cx="64" cy="96" r="8"','#fff'),F('circle','cx="136" cy="96" r="8"','#fff'),
  D('path','d="M92 118q8 6 16 0" fill="none" stroke-width="2.4"')]},
 hospital:{n:'Hospital',e:'🏥',p:[
  F('circle','cx="168" cy="32" r="17"'),F('path','d="M24 26q-12 0-12 10t14 10h30q14 0 14-9t-12-9q-4-12-18-7q-10-4-16 5z"'),
  F('rect','x="0" y="170" width="200" height="30"'),
  F('rect','x="14" y="112" width="40" height="58"'),F('rect','x="146" y="112" width="40" height="58"'),
  F('rect','x="44" y="66" width="112" height="104"'),F('rect','x="38" y="56" width="124" height="14" rx="4"'),
  F('circle','cx="100" cy="94" r="20"'),
  F('path','d="M95 82h10v8h8v10h-8v8H95v-8h-8V90h8z"'),
  F('rect','x="84" y="130" width="32" height="40" rx="3"'),D('path','d="M100 130v40" fill="none" stroke-width="2"'),
  F('rect','x="56" y="106" width="20" height="18" rx="3"'),F('rect','x="124" y="106" width="20" height="18" rx="3"'),
  F('rect','x="56" y="134" width="20" height="18" rx="3"'),F('rect','x="124" y="134" width="20" height="18" rx="3"'),
  F('rect','x="24" y="126" width="18" height="16" rx="3"'),F('rect','x="158" y="126" width="18" height="16" rx="3"')]},
 ambulancia:{n:'Ambulância',e:'🚑',p:[
  F('rect','x="0" y="172" width="200" height="28"'),
  F('rect','x="14" y="84" width="118" height="70" rx="10"'),
  F('path','d="M132 98H160L184 124V154H132z"'),F('path','d="M140 104H156L172 124H140z"'),
  F('rect','x="68" y="70" width="18" height="14" rx="4"'),
  F('path','d="M66 104h22v14h14v22H88v14H66v-14H52v-22h14z"'),
  F('rect','x="20" y="96" width="30" height="20" rx="4"'),
  D('path','d="M14 148H184" fill="none" stroke-width="2"'),
  F('circle','cx="180" cy="140" r="6"'),
  F('circle','cx="52" cy="156" r="17"'),F('circle','cx="150" cy="156" r="17"'),
  F('circle','cx="52" cy="156" r="7"'),F('circle','cx="150" cy="156" r="7"')]},
 daisy:{n:'Daisy',e:'👩‍⚕️',p:[
  F('circle','cx="62" cy="52" r="15"'),F('circle','cx="138" cy="52" r="15"'),F('ellipse','cx="100" cy="80" rx="43" ry="46"'),
  F('path','d="M100 114L62 124L54 194H100z"'),F('path','d="M100 114L138 124L146 194H100z"'),
  D('path','d="M84 116L100 134L116 116" fill="#fff" stroke-width="2"'),
  F('path','d="M100 156c-14-10-14-22-4-22c4 0 4 3 4 3s0-3 4-3c10 0 10 12-4 22z"'),
  F('ellipse','cx="40" cy="150" rx="12" ry="26" transform="rotate(14 40 150)"'),
  F('path','d="M138 124q28-2 34-40l-16-4q-4 24-24 26z"'),F('circle','cx="164" cy="80" r="10"'),
  F('path','d="M178 66c-10-8-10-18-3-18c3 0 4 3 4 3s1-3 4-3c7 0 7 10-5 18z"'),
  F('circle','cx="100" cy="82" r="34"'),
  F('path','d="M64 78Q68 40 100 40Q132 40 136 78Q122 56 100 56Q78 56 64 78z"'),
  D('ellipse','cx="86" cy="82" rx="4" ry="5.5" fill="'+EYE+'"'),D('ellipse','cx="114" cy="82" rx="4" ry="5.5" fill="'+EYE+'"'),
  D('path','d="M92 98q8 7 16 0" fill="none" stroke-width="2.4"'),
  D('circle','cx="76" cy="94" r="5" fill="#fbcfe8" stroke="none"'),D('circle','cx="124" cy="94" r="5" fill="#fbcfe8" stroke="none"')]},
 margarida:{n:'Margarida',e:'🌼',p:[
  F('path','d="M96 108h8v88h-8z"'),F('path','d="M104 160q32-28 46-4q-28 16-46 4z"'),F('path','d="M96 172q-32-26-46-2q28 14 46 2z"'),
  ...Array.from({length:12},(_,i)=>F('ellipse','cx="100" cy="38" rx="11" ry="25" transform="rotate('+i*30+' 100 84)"')),
  F('circle','cx="100" cy="84" r="20"','#fff'),
  D('circle','cx="93" cy="80" r="2.6" fill="'+EYE+'"'),D('circle','cx="107" cy="80" r="2.6" fill="'+EYE+'"'),D('path','d="M92 91q8 6 16 0" fill="none" stroke-width="2.2"')]},
 coracao:{n:'Coração',e:'❤️',p:[
  F('path','d="M100 176C16 122 26 50 74 52C90 53 100 66 100 74C100 66 110 53 126 52C174 50 184 122 100 176z"'),
  D('path','d="M40 108h36l10-24l14 44l12-30l10 10h28" fill="none" stroke-width="3.2"')]}
};

const ring=(n,rad,fn)=>Array.from({length:n},(_,i)=>{const a=i*2*Math.PI/n;return fn(i,+(100+rad*Math.sin(a)).toFixed(1),+(100-rad*Math.cos(a)).toFixed(1))});
ART.borboleta={n:'Borboleta',e:'🦋',p:[
  F('path','d="M94 92C40 26 6 62 40 102C56 112 80 104 94 98z"'),F('path','d="M106 92C160 26 194 62 160 102C144 112 120 104 106 98z"'),
  F('path','d="M94 106C48 104 28 152 60 170C82 178 94 142 94 112z"'),F('path','d="M106 106C152 104 172 152 140 170C118 178 106 142 106 112z"'),
  F('circle','cx="58" cy="68" r="15"'),F('circle','cx="142" cy="68" r="15"'),F('circle','cx="62" cy="140" r="11"'),F('circle','cx="138" cy="140" r="11"'),
  F('circle','cx="58" cy="68" r="6"'),F('circle','cx="142" cy="68" r="6"'),F('circle','cx="62" cy="140" r="4.5"'),F('circle','cx="138" cy="140" r="4.5"'),
  F('ellipse','cx="100" cy="106" rx="7" ry="42"'),F('circle','cx="100" cy="58" r="10"'),
  D('path','d="M95 50Q84 28 70 24M105 50Q116 28 130 24" fill="none" stroke-width="2.4"'),D('circle','cx="97" cy="57" r="1.8" fill="'+EYE+'"'),D('circle','cx="103" cy="57" r="1.8" fill="'+EYE+'"')],
  names:['asa de cima esquerda','asa de cima direita','asa de baixo esquerda','asa de baixo direita','bolinha grande esquerda','bolinha grande direita','bolinha de baixo esquerda','bolinha de baixo direita','miolo esquerdo','miolo direito','miolo de baixo esquerdo','miolo de baixo direito','corpinho','cabeça']};
ART.peixe={n:'Peixinho',e:'🐠',p:[
  F('rect','x="0" y="176" width="200" height="24"'),
  F('path','d="M30 178Q18 150 34 126Q40 150 44 178z"'),F('path','d="M50 178Q56 144 76 130Q70 156 70 178z"'),
  F('path','d="M148 100L192 64L192 136z"'),F('path','d="M64 66Q96 26 128 68z"'),F('path','d="M82 130Q104 162 128 132z"'),
  F('ellipse','cx="96" cy="100" rx="62" ry="40"'),
  F('ellipse','cx="68" cy="100" rx="8" ry="35"'),F('ellipse','cx="98" cy="100" rx="8" ry="39"'),F('ellipse','cx="126" cy="101" rx="7" ry="33"'),
  F('circle','cx="150" cy="40" r="9"'),F('circle','cx="166" cy="22" r="6"'),F('circle','cx="132" cy="22" r="5"'),
  D('circle','cx="48" cy="92" r="6" fill="'+EYE+'"'),D('circle','cx="46" cy="90" r="1.8" fill="#fff" stroke="none"'),D('path','d="M34 108Q44 116 54 110" fill="none" stroke-width="2.4"')],
  names:['areia','alga 1','alga 2','cauda','barbatana de cima','barbatana de baixo','corpo','listra 1','listra 2','listra 3','bolha grande','bolha média','bolha pequena']};
ART.elefante={n:'Elefante',e:'🐘',p:[
  F('rect','x="70" y="140" width="22" height="46" rx="9"'),F('rect','x="96" y="144" width="22" height="42" rx="9"'),F('rect','x="130" y="140" width="22" height="46" rx="9"'),F('rect','x="154" y="144" width="20" height="42" rx="9"'),
  F('ellipse','cx="120" cy="118" rx="58" ry="42"'),F('ellipse','cx="124" cy="94" rx="30" ry="12"'),
  F('circle','cx="62" cy="96" r="36"'),F('path','d="M40 112Q18 140 30 174Q38 186 48 176Q44 150 66 126z"'),
  F('ellipse','cx="88" cy="92" rx="22" ry="32" transform="rotate(10 88 92)"'),F('path','d="M58 124Q76 134 82 152Q66 146 54 130z"'),
  D('circle','cx="58" cy="84" r="4.5" fill="'+EYE+'"'),D('path','d="M178 104Q194 114 188 138" fill="none" stroke-width="3"')],
  names:['pata de trás 1','pata de trás 2','pata da frente 1','pata da frente 2','corpo','manta nas costas','cabeça','tromba','orelha','presa']};
ART.coelho={n:'Coelhinho',e:'🐰',p:[
  F('ellipse','cx="76" cy="40" rx="14" ry="34"'),F('ellipse','cx="124" cy="40" rx="14" ry="34"'),F('ellipse','cx="76" cy="44" rx="7" ry="24"'),F('ellipse','cx="124" cy="44" rx="7" ry="24"'),
  F('circle','cx="150" cy="164" r="13"'),F('ellipse','cx="100" cy="152" rx="44" ry="38"'),F('ellipse','cx="72" cy="188" rx="19" ry="8"'),F('ellipse','cx="128" cy="188" rx="19" ry="8"'),F('ellipse','cx="100" cy="158" rx="24" ry="24"'),
  F('circle','cx="100" cy="94" r="38"'),F('circle','cx="76" cy="104" r="9"'),F('circle','cx="124" cy="104" r="9"'),
  D('ellipse','cx="100" cy="98" rx="6" ry="4.5" fill="'+EYE+'"'),D('path','d="M100 102v7M92 111q8 6 16 0" fill="none" stroke-width="2.2"'),
  D('circle','cx="84" cy="86" r="4.5" fill="'+EYE+'"'),D('circle','cx="116" cy="86" r="4.5" fill="'+EYE+'"'),D('path','d="M54 100l-16-4M54 108l-16 4M146 100l16-4M146 108l16 4" fill="none" stroke-width="1.8"')],
  names:['orelha esquerda','orelha direita','dentro da orelha esquerda','dentro da orelha direita','rabinho','corpo','pé esquerdo','pé direito','barriga','cabeça','bochecha esquerda','bochecha direita']};
ART.mandala={n:'Mandala',e:'🌸',p:[
  F('circle','cx="100" cy="100" r="14"'),
  ...Array.from({length:8},(_,i)=>F('ellipse','cx="100" cy="70" rx="10" ry="16" transform="rotate('+i*45+' 100 100)"')),
  ...ring(16,58,(i,x,y)=>F('circle','cx="'+x+'" cy="'+y+'" r="7"')),
  ...Array.from({length:16},(_,i)=>F('ellipse','cx="100" cy="18" rx="9" ry="12" transform="rotate('+i*22.5+' 100 100)"'))],
  names:['centro',...Array.from({length:8},(_,i)=>'pétala do meio '+(i+1)),...Array.from({length:16},(_,i)=>'bolinha '+(i+1)),...Array.from({length:16},(_,i)=>'pétala de fora '+(i+1))]};
ART.urso.names=['orelha esquerda','orelha direita','braço esquerdo','braço direito','perna esquerda','perna direita','corpo','barriga','cabeça','dentro da orelha esquerda','dentro da orelha direita','focinho'];
ART.girafa.names=['perna 1','perna 2','pescoço','corpo','orelha 1','orelha 2','cabeça','chifre 1','chifre 2','focinho','mancha do pescoço (cima)','mancha do pescoço (baixo)','mancha da barriga 1','mancha da barriga 2','mancha da barriga 3'];
ART.tubarao.names=['mar','cauda','corpo','barriga','nadadeira de cima','nadadeira de baixo'];
ART.porquinho.names=['orelha esquerda','orelha direita','pata esquerda','pata direita','corpo','cabeça','focinho','bochecha esquerda','bochecha direita'];
ART.hospital.names=['sol','nuvem','gramado','ala esquerda','ala direita','prédio','telhado','placa redonda','cruz','porta','janela 1','janela 2','janela 3','janela 4','janela da ala esquerda','janela da ala direita'];
ART.ambulancia.names=['rua','baú da ambulância','cabine','vidro da cabine','sirene','cruz','janelinha','farol','roda de trás','roda da frente','centro da roda de trás','centro da roda da frente'];
ART.daisy.names=['coque esquerdo','coque direito','cabelo','uniforme (lado esquerdo)','uniforme (lado direito)','coração do uniforme','braço esquerdo','braço levantado','mãozinha','coraçãozinho','rosto','franja'];
ART.margarida.names=['caule','folha direita','folha esquerda',...Array.from({length:12},(_,i)=>'pétala '+(i+1)),'miolo'];
ART.coracao.names=['coração'];
const ART_ORDER=['urso','girafa','tubarao','porquinho','elefante','coelho','borboleta','peixe','hospital','ambulancia','daisy','margarida','mandala','coracao'];
const PAL=['#ffffff','#fecdd3','#f9a8d4','#f472b6','#e11d48','#fdba74','#f97316','#fde68a','#facc15','#bef264','#86efac','#22c55e','#99f6e4','#38bdf8','#2563eb','#c4b5fd','#8b5cf6','#c08457','#8b5a2b','#9ca3af','#111827'];
function svgOf(key,fills,thumb){
  const a=ART[key];let k=0;
  const body=a.p.map(p=>{
    if(p.f){const i=k++;const fill=fills?fills[i]:'#fff';return '<'+p.t+' class="kp" data-i="'+i+'" '+p.a+' fill="'+fill+'"'+(thumb?' stroke="#6b4fa3" stroke-width="3" stroke-linejoin="round"':'')+'/>'}
    return '<'+p.t+' class="kd" '+p.a+(/fill=/.test(p.a)?'':' fill="none"')+(thumb?' stroke="#3b2a4a" stroke-width="3" stroke-linecap="round"':'')+'/>';
  }).join('');
  return '<svg xmlns="'+NS+'" viewBox="0 0 200 200">'+body+'</svg>';
}
const kidsState={tab:'story',stars:0,paint:{key:'urso',brush:'#f9a8d4',mode:'paint',fills:{},hist:{}}};
function addStar(n){kidsState.stars+=n;const e=$('#kzStars');if(e)e.textContent='⭐ '+kidsState.stars+' '+(kidsState.stars===1?'estrela':'estrelas')}
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const stage=()=>$('#kzStage');
const TM=[];const T=(f,ms)=>{const id=setTimeout(f,ms);TM.push(id);return id};
const clearTM=()=>{TM.splice(0).forEach(clearTimeout);(kidsState.iv||[]).splice(0).forEach(clearInterval)};

/* ---- Histórias ---- */
const STORIES=[
 {n:'A consulta',e:'🩺',sc:[
  {bg:'#e0f2fe',art:'🏥',t:'A Daisy chegou ao hospital com um adulto. O corredor é grande e cheio de gente. O que a Daisy faz?',o:[['Segura a mão do adulto',1,'Muito bem! Andar de mãos dadas deixa todo mundo seguro.'],['Sai correndo',0,'Opa! Correr pode machucar. A Daisy volta e segura a mão do adulto.']]},
  {bg:'#fef9c3',art:'🧸',t:'Na sala de espera, a Daisy sente um friozinho na barriga. O que ajuda?',o:[['Respirar fundo 3 vezes',1,'Isso! Inspira... e solta. O friozinho vai embora.'],['Esconder o medo',0,'Não precisa esconder! A Daisy conta para o adulto e se sente melhor.']]},
  {bg:'#fce7f3',art:'❤️',t:'A médica vai ouvir o coração com o estetoscópio. É geladinho só um pouquinho! O que a Daisy faz?',o:[['Fica quietinha e ouve: tum-tum, tum-tum',1,'Perfeito! O coração da Daisy está forte e feliz.'],['Mexe sem parar',0,'Quietinha é mais rápido. A Daisy tenta de novo e consegue!']]}]},
 {n:'O exame de sangue',e:'💉',sc:[
  {bg:'#ede9fe',art:'🧪',t:'Hoje a Daisy vai fazer um exame de sangue. A enfermeira explica tudo antes de começar. O que a Daisy faz?',o:[['Escuta a enfermeira com atenção',1,'Isso! Quando a gente entende, fica mais fácil.'],['Tampa os ouvidos',0,'Ouvir ajuda a não ter surpresas. A Daisy escuta com calma.']]},
  {bg:'#fef3c7',art:'🌬️',t:'Chegou a hora da picadinha. É rapidinho! Como a Daisy pode se ajudar?',o:[['Olha para o outro lado e respira fundo',1,'Ótima ideia! Respirar devagar deixa o corpo relaxado.'],['Puxa o braço',0,'Braço paradinho é mais rápido. A Daisy tenta de novo!']]},
  {bg:'#dcfce7',art:'🩹',t:'Acabou! A enfermeira coloca um curativo colorido. Como a Daisy se sente?',o:[['Orgulhosa, foi muito corajosa!',1,'Isso mesmo! Coragem é fazer mesmo com um pouquinho de medo.'],['Chateada com todo mundo',0,'Tudo bem sentir isso. Um abraço do adulto ajuda a passar.']]}]},
 {n:'O raio-X',e:'🦴',sc:[
  {bg:'#e0e7ff',art:'📷',t:'A Daisy vai tirar uma fotografia especial dos ossos, o raio-X. Não dói nada! O que a Daisy faz?',o:[['Pergunta tudo o que quer saber',1,'Perguntar é ótimo! Todo mundo na equipe adora explicar.'],['Fica com vergonha de perguntar',0,'Sem vergonha! A Daisy pergunta e entende melhor.']]},
  {bg:'#f1f5f9',art:'🧍',t:'O técnico pede para ficar paradinha como uma estátua por um instante. E agora?',o:[['Fica estátua, sem se mexer',1,'Perfeito! A foto saiu bem bonita.'],['Dança igual a um robô',0,'Haha! Depois da foto pode dançar. Agora, estátua!']]},
  {bg:'#fce7f3',art:'🌟',t:'Pronto! A foto dos ossos ficou ótima. O que a Daisy ganha?',o:[['Uma estrela de coragem',1,'Isso! Você também ganhou uma estrela.'],['Nada, só o susto',0,'Ganhou sim! Coragem sempre vale uma estrela.']]}]}
];
STORIES.push(
 {n:'O dentista',e:'🦷',sc:[
  {bg:'#e0f2fe',art:'🪥',t:'A Daisy vai ao dentista. Primeiro, ela escova bem os dentes em casa. Quantas vezes por dia a Daisy escova?',o:[['Pelo menos 2 vezes',1,'Isso! Dentes limpinhos e fortes.'],['Só quando lembra',0,'Escovar todo dia, de manhã e à noite, é o segredo!']]},
  {bg:'#fef9c3',art:'💺',t:'Na cadeirinha do dentista tem uma luz forte e um espelhinho. O dentista conta tudo o que vai fazer. Como a Daisy fica?',o:[['De boca bem aberta, tranquila',1,'Perfeito! Assim o dentista olha tudo rapidinho.'],['De boca fechada e brava',0,'Abrir a boquinha ajuda o dentista a cuidar dos dentes.']]},
  {bg:'#dcfce7',art:'😁',t:'Acabou! Os dentes da Daisy estão brilhando. O que ela faz para continuar assim?',o:[['Escova os dentes e come menos doce',1,'Isso mesmo! Sorriso saudável todo dia.'],['Come balas antes de dormir',0,'Doce antes de dormir não é bom. Escovar sempre depois!']]}]},
 {n:'A vacina',e:'🛡️',sc:[
  {bg:'#ede9fe',art:'🛡️',t:'Hoje a Daisy vai tomar a vacina. Ela protege o corpo contra doenças. Por que a vacina é importante?',o:[['Ela ajuda meu corpo a se proteger',1,'Isso! Vacina é como um escudo para a saúde.'],['Ela serve para brincar',0,'Vacina é coisa séria: protege a gente de doenças.']]},
  {bg:'#fef3c7',art:'🌬️',t:'A enfermeira vai dar uma picadinha rápida. O que a Daisy pode fazer?',o:[['Respirar fundo e olhar para o adulto',1,'Ótimo! Respirar devagar ajuda a relaxar.'],['Prender a respiração',0,'Respirar devagar é melhor: inspira... e solta.']]},
  {bg:'#fce7f3',art:'🏅',t:'Pronto! A Daisy ganha um adesivo de coragem. Como ela se sente?',o:[['Corajosa e orgulhosa',1,'Isso mesmo! Você foi muito bem.'],['Com vergonha de ter chorado',0,'Tudo bem chorar. Coragem é fazer mesmo com medo!']]}]},
 {n:'A ressonância',e:'🌀',sc:[
  {bg:'#e0e7ff',art:'🛏️',t:'A Daisy vai fazer um exame numa máquina grande que parece um túnel. Ela deita numa caminha. O que ela pode lembrar?',o:[['Não dói nada e o adulto fica por perto',1,'Isso! O exame não dói e você não está sozinha.'],['Que vai doer muito',0,'Não dói! Só faz barulho, e o adulto está por perto.']]},
  {bg:'#f1f5f9',art:'🔊',t:'A máquina faz barulhos: tum-tum, piu-piu! A equipe oferece protetor de ouvido. O que a Daisy faz?',o:[['Usa o protetor e imagina uma música',1,'Boa ideia! Cantar na cabeça ajuda o tempo passar.'],['Tira o protetor e se mexe',0,'Ficar paradinha ajuda a foto sair bonita. Protetor no lugar!']]},
  {bg:'#dcfce7',art:'🌟',t:'Acabou! A Daisy ficou paradinha como uma estátua. O que ela ganha?',o:[['Uma estrela de coragem',1,'Isso! Você foi incrível.'],['Nada, só cansaço',0,'Ganhou sim: uma estrela de coragem!']]}]},
 {n:'Chegando ao hospital',e:'🚑',sc:[
  {bg:'#e0f2fe',art:'🚗',t:'A Daisy chega de carro com o adulto. Na porta do hospital, o que ela faz primeiro?',o:[['Segura a mão do adulto',1,'Isso! Juntinhos é mais seguro.'],['Corre na frente',0,'Correr perto de carros é perigoso. Mão dada!']]},
  {bg:'#fef9c3',art:'🧼',t:'Antes de entrar, a Daisy usa o álcool em gel. Por que lavar as mãos é importante?',o:[['Tira os germes e evita doenças',1,'Isso mesmo! Mãozinhas limpas, saúde em dia.'],['Só para ficar cheirosa',0,'O cheirinho é bom, mas o principal é tirar os germes!']]},
  {bg:'#fce7f3',art:'🛋️',t:'Na sala de espera tem livros e brinquedos. Como a Daisy espera sua vez?',o:[['Com calma, brincando baixinho',1,'Ótimo! Assim todo mundo descansa e se sente bem.'],['Gritando e correndo',0,'No hospital tem gente descansando. Baixinho é melhor!']]}]}
);
function renderStory(){
  const S=kidsState.story||(kidsState.story={s:0,i:0});const story=STORIES[S.s];const el=stage();
  const picks='<div class="kz-picks">'+STORIES.map((x,j)=>'<button class="kz-chip'+(j===S.s?' on':'')+'" data-s="'+j+'">'+x.e+' '+x.n+'</button>').join('')+'</div>';
  const dots='<div class="kz-dots">'+story.sc.map((_,j)=>'<i class="'+(j<=S.i?'on':'')+'"></i>').join('')+'</div>';
  if(S.i>=story.sc.length){
    if(!S.paid){addStar(1);S.paid=1}
    el.innerHTML='<h3>Daisy e a aventura: '+story.n+'</h3>'+picks+'<div class="kz-scene" style="background:#dcfce7"><div class="kz-art">🌼</div><div><b>A Daisy foi super corajosa!</b><br>Você ganhou uma estrela de coragem.</div></div><div class="kz-opts"><button class="kz-opt" id="kzAgain">↺ Ver de novo</button></div>';
    el.querySelector('#kzAgain').onclick=()=>{S.i=0;S.paid=0;renderStory()};
  }else{
    const sc=story.sc[S.i];
    el.innerHTML='<h3>Daisy e a aventura: '+story.n+'</h3>'+picks+dots+'<div class="kz-scene" style="background:'+sc.bg+'"><div class="kz-art">'+sc.art+'</div><div>'+sc.t+'</div></div><div class="kz-opts" id="kzO">'+sc.o.map((o,j)=>'<button class="kz-opt" data-j="'+j+'">'+o[0]+'</button>').join('')+'</div><p class="kz-fb" id="kzFb"></p>';
    el.querySelectorAll('#kzO .kz-opt').forEach(b=>b.onclick=()=>{
      const o=sc.o[+b.dataset.j];b.classList.add(o[1]?'good':'bad');el.querySelectorAll('#kzO .kz-opt').forEach(x=>x.disabled=true);
      el.querySelector('#kzFb').textContent=o[2];
      const nx=document.createElement('button');nx.className='kz-opt';nx.textContent=S.i+1>=story.sc.length?'Terminar ⭐':'Continuar ➜';nx.onclick=()=>{S.i++;renderStory()};el.querySelector('#kzO').appendChild(nx);
    });
  }
  el.querySelectorAll('.kz-chip').forEach(b=>b.onclick=()=>{S.s=+b.dataset.s;S.i=0;S.paid=0;renderStory()});
}

/* ---- Memória ---- */
const THEMES={hospital:['🩺','💉','🩹','🌡️','💊','🦷','🚑','🏥','🧸','⭐'],bichos:['🐻','🦒','🦈','🐷','🐰','🐘','🦁','🐧','🐠','🦋'],frutas:['🍎','🍌','🍓','🍇','🍉','🍊','🥕','🍒','🍍','🥝']};
const MEMN={hospital:'🏥 Hospital',bichos:'🐻 Bichinhos',frutas:'🍓 Frutas'};
function renderMemory(){
  const M=kidsState.mem||(kidsState.mem={theme:'hospital',pairs:8});const el=stage();let faces=[],up=[],done=0,moves=0,phase='idle',lock=false;
  const draw=()=>{
    el.innerHTML='<h3>Jogo da memória</h3><div class="kz-picks">'+Object.keys(THEMES).map(k=>'<button class="kz-chip kt'+(M.theme===k?' on':'')+'" data-k="'+k+'">'+MEMN[k]+'</button>').join('')+
      [6,8,10].map(n=>'<button class="kz-chip kn'+(M.pairs===n?' on':'')+'" data-n="'+n+'">'+n*2+' cartas</button>').join('')+'</div><p class="muted" id="kzMsg">Aperte START: as cartas aparecem por alguns segundos e depois viram. Encontre todos os pares.</p><div class="kz-mem'+(M.pairs===10?' n20':'')+'" id="kzGrid">'+
      Array.from({length:M.pairs*2},(_,i)=>'<button class="kz-c" data-i="'+i+'" disabled aria-label="carta '+(i+1)+'"><span class="bk">?</span><span class="fr"></span></button>').join('')+'</div><button class="btn" id="kzStart">START</button>';
    el.querySelectorAll('.kt').forEach(b=>b.onclick=()=>{M.theme=b.dataset.k;phase='idle';showTab('mem')});
    el.querySelectorAll('.kn').forEach(b=>b.onclick=()=>{M.pairs=+b.dataset.n;phase='idle';showTab('mem')});
    el.querySelector('#kzStart').onclick=start;
  };
  const cards=()=>[...el.querySelectorAll('.kz-c')];
  const msg=t=>{const m=el.querySelector('#kzMsg');if(m)m.textContent=t};
  function start(){
    clearTimeout(kidsState.mt);faces=shuffle(THEMES[M.theme].slice(0,M.pairs).flatMap(x=>[x,x]));up=[];done=0;moves=0;lock=true;phase='peek';
    cards().forEach((c,i)=>{c.className='kz-c up';c.disabled=true;c.querySelector('.fr').textContent=faces[i]});
    el.querySelector('#kzStart').textContent='Reiniciar';
    let n=4;const tick=()=>{if(phase!=='peek')return;if(n>0){msg('Memorize as cartas! Elas viram em '+n+'…');n--;kidsState.mt=setTimeout(tick,1000)}else{phase='play';lock=false;cards().forEach(c=>{c.className='kz-c';c.disabled=false});msg('Agora é com você! Jogadas: 0')}};tick();
  }
  el.addEventListener('click',e=>{
    const c=e.target.closest('.kz-c');if(!c||phase!=='play'||lock)return;const i=+c.dataset.i;if(up.includes(i)||c.classList.contains('ok'))return;
    up.push(i);c.classList.add('up');
    if(up.length===2){
      moves++;lock=true;const[a,b]=up,ca=cards()[a],cb=cards()[b];
      kidsState.mt=setTimeout(()=>{
        if(faces[a]===faces[b]){ca.classList.add('ok');cb.classList.add('ok');ca.disabled=cb.disabled=true;done+=2}else{ca.classList.remove('up');cb.classList.remove('up')}
        up=[];lock=false;
        if(done===faces.length){phase='end';addStar(M.pairs>=8?3:2);msg('Parabéns! Você achou todos os pares em '+moves+' jogadas! ⭐')}else msg('Jogadas: '+moves+' · Pares: '+done/2+' de '+M.pairs);
      },800);
    }
  });
  draw();
}

/* ---- Perguntas ---- */
const QS=[['Antes de comer, o que a Daisy faz?','Lava as mãos',['Pula no sofá','Dorme']],['O que deixa o coração forte?','Brincar e se mexer',['Ficar parado o dia todo','Pular o almoço']],['O estetoscópio serve para...','Ouvir o coração e a respiração',['Cortar o cabelo','Fazer cócegas']],['Com medo da consulta, o que posso fazer?','Respirar fundo e contar a um adulto',['Fugir','Ficar sem falar']],['Quantas vezes devemos escovar os dentes por dia?','Pelo menos 2 vezes',['Nenhuma vez','Só no aniversário']],['Quem pode ajudar quando estou perdido no hospital?','Um profissional de jaleco ou a recepção',['Qualquer pessoa estranha','Ninguém']],['O que fazer ao tossir?','Cobrir a boca com o braço',['Tossir na mão do amigo','Prender a respiração']],['Para crescer forte, o que ajuda?','Comer frutas e dormir bem',['Só comer doce','Ficar acordado a noite toda']],['O que beber para o corpo ficar bem?','Água',['Só refrigerante','Nada']],['O que usamos para medir a febre?','Termômetro',['Colher','Régua']],['Quem cuida dos nossos dentes?','O dentista',['O padeiro','O motorista']],['O que a vacina faz?','Protege contra doenças',['Dá sono para sempre','Faz crescer asas']],['Quando a gente se machuca, o que fazemos?','Avisamos um adulto',['Escondemos o machucado','Fingimos que nada aconteceu']],['Para que serve o raio-X?','Tirar foto dos ossos',['Ouvir música','Medir a altura']],['Quantas horas uma criança deve dormir, mais ou menos?','Cerca de 9 a 11 horas',['2 horas','Não precisa dormir']],['Qual desses alimentos é uma fruta?','Banana',['Pão','Arroz']],['Se eu espirrar, o que devo fazer?','Cobrir o nariz com o braço',['Espirrar no amigo','Prender o espirro']],['O que fazer depois de brincar na rua?','Lavar as mãos',['Comer sem lavar','Colocar a mão na boca']],['Para que serve a ambulância?','Levar pessoas ao hospital rápido',['Vender sorvete','Passear na praça']],['Onde as crianças podem brincar enquanto esperam?','Na brinquedoteca',['Na garagem','No telhado']],['Respirar fundo ajuda a...','Ficar mais calmo',['Ficar com mais medo','Pular mais alto']],['O que significa a cruz no hospital?','Lugar de cuidado e saúde',['Lugar de jogar bola','Lugar de pintar parede']],['O que a enfermeira faz?','Cuida de quem precisa',['Dirige ônibus','Vende pão']],['No hospital, como devemos andar?','Andando e de mãos dadas com o adulto',['Correndo pelos corredores','Sozinho para longe']]];
function renderQuiz(){
  const el=stage();let list=shuffle(QS).slice(0,5),q=0,pts=0;
  const draw=()=>{
    if(q>=list.length){addStar(pts>=4?3:pts>=2?2:1);el.innerHTML='<h3>Daisy pergunta</h3><div class="kz-scene" style="background:#ede9fe"><div class="kz-art">🏆</div><div><b>Você acertou '+pts+' de '+list.length+'!</b><br>Muito bem!</div></div><div class="kz-opts"><button class="kz-opt" id="kzQR">↺ Jogar de novo</button></div>';el.querySelector('#kzQR').onclick=()=>{list=shuffle(QS).slice(0,5);q=0;pts=0;draw()};return}
    const x=list[q],opts=shuffle([x[1],...x[2]]);
    el.innerHTML='<h3>Daisy pergunta</h3><div class="kz-dots">'+list.map((_,j)=>'<i class="'+(j<=q?'on':'')+'"></i>').join('')+'</div><div class="kz-scene" style="background:#fef9c3"><div class="kz-art">❓</div><div><b>'+x[0]+'</b></div></div><div class="kz-opts" id="kzO">'+opts.map(o=>'<button class="kz-opt">'+o+'</button>').join('')+'</div><p class="kz-fb" id="kzFb"></p>';
    el.querySelectorAll('.kz-opt').forEach(b=>b.onclick=()=>{
      const ok=b.textContent===x[1];if(ok)pts++;b.classList.add(ok?'good':'bad');
      el.querySelectorAll('.kz-opt').forEach(z=>{z.disabled=true;if(z.textContent===x[1])z.classList.add('good')});
      el.querySelector('#kzFb').textContent=ok?'Isso mesmo! 🌼':'Quase! A resposta certa está em verde.';
      const nx=document.createElement('button');nx.className='kz-opt';nx.textContent=q+1>=list.length?'Ver resultado ⭐':'Próxima ➜';nx.onclick=()=>{q++;draw()};el.querySelector('#kzO').appendChild(nx);
    });
  };
  draw();
}

/* ---- Colorir ---- */
function fillsFor(k){const P=kidsState.paint;if(!P.fills[k])P.fills[k]=ART[k].p.filter(p=>p.f).map(p=>p.fill);return P.fills[k]}
function renderPaint(){
  const P=kidsState.paint,el=stage();
  if(P.guided===undefined){P.guided=true;P.dn={}}
  const draw=()=>{
    const k=P.key,fills=fillsFor(k),hist=P.hist[k]||(P.hist[k]=[]),names=ART[k].names||[];
    const N=fills.length,dn=P.dn[k]||(P.dn[k]=Array(N).fill(false)),nd=dn.filter(Boolean).length,step=dn.indexOf(false)<0?N:dn.indexOf(false);
    const guided=P.guided&&N>1,done=guided&&step>=N;
    const label=i=>names[i]||('parte '+(i+1));
    const banner=guided?(done?'<div class="kz-guide ok"><b>🎉 Desenho completo!</b> Você pintou as '+N+' partes, uma por uma. Quer salvar a imagem ou escolher outro desenho?</div>':'<div class="kz-guide"><b>Parte '+(nd+1)+' de '+N+':</b> pinte <u>'+label(step)+'</u> (a parte piscando)<div class="kz-bar"><i style="width:'+Math.round(nd/N*100)+'%"></i></div></div>'):'';
    el.innerHTML='<h3>Desenhos para colorir</h3><p class="muted">Pinte devagar, parte por parte. No <b>passo a passo</b> a Daisy mostra qual parte pintar agora; no modo <b>livre</b> você pinta onde quiser.</p><div class="kz-modes"><button class="kz-chip'+(guided?' on':'')+'" id="kzGd">🧭 Passo a passo</button><button class="kz-chip'+(!guided?' on':'')+'" id="kzFr">🎨 Livre</button></div><div class="kz-paint"><div>'+banner+'<div class="kz-board" id="kzBoard">'+svgOf(k,fills)+'</div></div><div>'+
      '<b>Cores</b><div class="kz-pal">'+PAL.map(c=>'<button class="kz-sw'+(c===P.brush?' sel':'')+'" data-c="'+c+'" style="background:'+c+'" aria-label="cor"></button>').join('')+'<input type="color" id="kzCol" value="'+(/^#[0-9a-f]{6}$/i.test(P.brush)?P.brush:'#f9a8d4')+'" aria-label="outra cor" style="width:38px;height:34px;border:0;background:none"></div>'+
      '<div class="kz-tools">'+(guided?'<button class="btn ghost compact" id="kzPrev">⏮ Voltar parte</button><button class="btn ghost compact" id="kzSkip">⏭ Pular parte</button>':'<button class="btn ghost compact" id="kzPick"'+(P.mode==='pick'?' style="outline:2px solid #7c3aed"':'')+'>💧 Copiar cor</button>')+'<button class="btn ghost compact" id="kzUndo">↶ Desfazer</button><button class="btn ghost compact" id="kzClr">Limpar</button><button class="btn compact" id="kzSave">⬇ Salvar imagem</button></div>'+
      '<b>Desenhos</b><div class="kz-thumbs">'+ART_ORDER.map(x=>'<button class="kz-th'+(x===k?' on':'')+'" data-k="'+x+'">'+svgOf(x,fillsFor(x),true)+ART[x].n+'<small>'+fillsFor(x).length+' partes</small></button>').join('')+'</div></div></div>';
    const board=el.querySelector('#kzBoard');
    if(guided&&!done){const hp=board.querySelector('.kp[data-i="'+step+'"]');if(hp)hp.classList.add('hl')}
    board.querySelectorAll('.kp').forEach(p=>p.addEventListener('click',()=>{
      const i=+p.dataset.i;
      if(guided){
        hist.push({f:fills.slice(),d:dn.slice()});fills[i]=P.brush;const was=dn.indexOf(false)<0;dn[i]=true;
        if(!was&&dn.indexOf(false)<0)addStar(1);
        draw();return;
      }
      if(P.mode==='pick'){P.brush=fills[i];P.mode='paint';draw();return}
      hist.push({f:fills.slice(),d:dn.slice()});if(hist.length>80)hist.shift();fills[i]=P.brush;dn[i]=true;p.setAttribute('fill',P.brush);
      const th=el.querySelector('.kz-th.on svg .kp[data-i="'+i+'"]');if(th)th.setAttribute('fill',P.brush);
    }));
    el.querySelectorAll('.kz-sw').forEach(b=>b.onclick=()=>{P.brush=b.dataset.c;P.mode='paint';draw()});
    el.querySelector('#kzCol').oninput=e=>{P.brush=e.target.value;P.mode='paint'};
    el.querySelector('#kzCol').onchange=()=>draw();
    const pk=el.querySelector('#kzPick');if(pk)pk.onclick=()=>{P.mode=P.mode==='pick'?'paint':'pick';draw()};
    const sk=el.querySelector('#kzSkip');if(sk)sk.onclick=()=>{if(step<N){dn[step]=true;draw()}};
    const pv=el.querySelector('#kzPrev');if(pv)pv.onclick=()=>{const l=dn.lastIndexOf(true);if(l>=0){dn[l]=false;draw()}};
    el.querySelector('#kzUndo').onclick=()=>{if(hist.length){const h=hist.pop();h.f.forEach((c,i)=>fills[i]=c);h.d.forEach((c,i)=>dn[i]=c);draw()}};
    el.querySelector('#kzClr').onclick=()=>{hist.push({f:fills.slice(),d:dn.slice()});ART[k].p.filter(p=>p.f).forEach((p,i)=>fills[i]=p.fill);dn.fill(false);draw()};
    el.querySelector('#kzSave').onclick=()=>savePng(k,fills);
    el.querySelector('#kzGd').onclick=()=>{P.guided=true;draw()};el.querySelector('#kzFr').onclick=()=>{P.guided=false;draw()};
    el.querySelectorAll('.kz-th').forEach(b=>b.onclick=()=>{P.key=b.dataset.k;P.mode='paint';draw()});
  };
  draw();
}
function savePng(k,fills){
  try{
    let s=svgOf(k,fills,true).replace('<svg ','<svg width="800" height="800" ').replace('<svg','<svg').replace('viewBox','style="background:#fff" viewBox');
    s=s.replace(/<(\w+) class="k[pd]"/g,'<$1');
    const img=new Image();img.onload=()=>{const c=document.createElement('canvas');c.width=c.height=800;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,800,800);x.drawImage(img,0,0,800,800);
      const a=document.createElement('a');a.download='daisy-'+k+'.png';a.href=c.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove();try{toast('Imagem salva!')}catch(e){}};
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
  }catch(e){try{toast('Não foi possível salvar a imagem.')}catch(_){}}
}


/* ---- Certo ou errado ---- */
const TF=[['Lavar as mãos ajuda a evitar doenças.',1,'Isso! Mãos limpas protegem a saúde.'],['No hospital, a gente pode correr pelos corredores.',0,'Não! Andamos devagar e de mãos dadas.'],['O estetoscópio serve para ouvir o coração.',1,'Certo! Dá para ouvir o tum-tum.'],['Vacinas ajudam a proteger o corpo.',1,'Sim! Elas funcionam como um escudo.'],['Se eu sentir dor, devo esconder do adulto.',0,'Não! Sempre conte para um adulto.'],['Beber água faz bem para o corpo.',1,'Isso mesmo!'],['Escovar os dentes só uma vez por semana é suficiente.',0,'O ideal é pelo menos 2 vezes por dia.'],['Respirar fundo ajuda a acalmar.',1,'Certo! Inspira... e solta.'],['Devemos tossir cobrindo a boca com o braço.',1,'Isso! Assim protegemos os amigos.'],['Posso sair andando sozinho pelo hospital.',0,'Não! Fique sempre com o seu adulto.'],['Dormir bem ajuda a crescer forte.',1,'Isso mesmo!'],['Médicos e enfermeiros estão ali para ajudar.',1,'Certo! Eles cuidam de você.'],['Comer só doces é o melhor para a saúde.',0,'Frutas e comida de verdade são melhores.'],['Quando estou com medo, posso contar para alguém.',1,'Isso! Contar ajuda a diminuir o medo.']];
function renderTF(){
  const el=stage();let list=shuffle(TF).slice(0,8),q=0,pts=0;
  const draw=()=>{
    if(q>=list.length){addStar(pts>=7?3:pts>=4?2:1);el.innerHTML='<h3>Certo ou errado?</h3><div class="kz-scene" style="background:#ede9fe"><div class="kz-art">🏆</div><div><b>Você acertou '+pts+' de '+list.length+'!</b></div></div><div class="kz-opts"><button class="kz-opt" id="kzR">↺ Jogar de novo</button></div>';el.querySelector('#kzR').onclick=()=>{list=shuffle(TF).slice(0,8);q=0;pts=0;draw()};return}
    const x=list[q];
    el.innerHTML='<h3>Certo ou errado?</h3><div class="kz-dots">'+list.map((_,j)=>'<i class="'+(j<=q?'on':'')+'"></i>').join('')+'</div><div class="kz-scene" style="background:#e0f2fe"><div class="kz-art">🤔</div><div><b>'+x[0]+'</b></div></div><div class="kz-tf" id="kzO"><button class="kz-opt" data-v="1">✅ Certo</button><button class="kz-opt" data-v="0">❌ Errado</button></div><p class="kz-fb" id="kzFb"></p>';
    el.querySelectorAll('#kzO .kz-opt').forEach(b=>b.onclick=()=>{
      const ok=(+b.dataset.v)===x[1];if(ok)pts++;
      el.querySelectorAll('#kzO .kz-opt').forEach(z=>{z.disabled=true;if((+z.dataset.v)===x[1])z.classList.add('good')});if(!ok)b.classList.add('bad');
      el.querySelector('#kzFb').textContent=(ok?'Muito bem! ':'Quase! ')+x[2];
      const nx=document.createElement('button');nx.className='kz-opt';nx.textContent=q+1>=list.length?'Ver resultado ⭐':'Próxima ➜';nx.onclick=()=>{q++;draw()};el.appendChild(nx);nx.style.marginTop='12px';
    });
  };
  draw();
}

/* ---- Cores da Daisy (sequência) ---- */
const PADS=[['#f472b6','#fbcfe8',262],['#38bdf8','#bae6fd',330],['#facc15','#fef08a',392],['#22c55e','#bbf7d0',523]];
let actx=null;
function beep(f){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const o=actx.createOscillator(),g=actx.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.08;o.connect(g);g.connect(actx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+.35);o.stop(actx.currentTime+.36)}catch(e){}}
function renderSimon(){
  const el=stage();let seq=[],pos=0,lock=true,best=kidsState.simonBest||0;
  el.innerHTML='<h3>Cores da Daisy</h3><p class="muted">Veja a sequência de flores que acendem e repita na mesma ordem. A cada rodada ela fica um pouquinho maior!</p><div class="kz-simon" id="kzPads">'+PADS.map((p,i)=>'<button class="kz-pad" data-i="'+i+'" style="background:'+p[0]+'" aria-label="cor '+(i+1)+'" disabled>🌼</button>').join('')+'</div><p class="kz-fb" id="kzMsg">Aperte COMEÇAR.</p><button class="btn" id="kzGo">COMEÇAR</button> <span class="muted" id="kzBest"></span>';
  const pads=[...el.querySelectorAll('.kz-pad')],msg=t=>{el.querySelector('#kzMsg').textContent=t};
  const bestEl=()=>{el.querySelector('#kzBest').textContent=best?'Melhor: '+best+' rodadas':''};bestEl();
  const flash=(i,ms=420)=>new Promise(res=>{pads[i].classList.add('lit');beep(PADS[i][2]);T(()=>{pads[i].classList.remove('lit');T(res,160)},ms)});
  async function show(){lock=true;pads.forEach(p=>p.disabled=true);msg('Olhe com atenção… rodada '+seq.length);await new Promise(r=>T(r,700));for(const i of seq){await flash(i)}pos=0;lock=false;pads.forEach(p=>p.disabled=false);msg('Sua vez! Repita a sequência.')}
  function next(){seq.push(Math.floor(Math.random()*4));show()}
  el.querySelector('#kzGo').onclick=()=>{seq=[];next();el.querySelector('#kzGo').textContent='Reiniciar'};
  pads.forEach(p=>p.onclick=()=>{
    if(lock)return;const i=+p.dataset.i;p.classList.add('lit');beep(PADS[i][2]);T(()=>p.classList.remove('lit'),200);
    if(i!==seq[pos]){lock=true;const n=seq.length-1;if(n>best){best=n;kidsState.simonBest=n}bestEl();if(n>=7)addStar(2);else if(n>=4)addStar(1);msg('Ops! Você conseguiu '+n+' rodadas. Aperte Reiniciar para tentar de novo.');return}
    pos++;if(pos>=seq.length){lock=true;msg('Muito bem! 🌟');T(next,900)}
  });
}

/* ---- Caça-estrelas ---- */
function renderStars(){
  const el=stage();let score=0,left=25,run=false;
  el.innerHTML='<h3>Caça-estrelas</h3><p class="muted">Toque nas estrelinhas ⭐ assim que aparecerem. Cuidado com as nuvens 🌧️: elas tiram pontos! Você tem 25 segundos.</p><div class="kz-hud"><span id="kzSc">Pontos: 0</span><span id="kzTm">Tempo: 25</span></div><div class="kz-holes" id="kzH">'+Array.from({length:9},(_,i)=>'<button class="kz-hole" data-i="'+i+'" aria-label="buraco"></button>').join('')+'</div><button class="btn" id="kzGo">COMEÇAR</button>';
  const hs=[...el.querySelectorAll('.kz-hole')],upd=()=>{el.querySelector('#kzSc').textContent='Pontos: '+score;el.querySelector('#kzTm').textContent='Tempo: '+left};
  let cur=-1,kind='';
  const hide=()=>{if(cur>=0){hs[cur].textContent='';hs[cur].className='kz-hole';cur=-1}};
  const pop=()=>{if(!run)return;hide();cur=Math.floor(Math.random()*9);kind=Math.random()<.8?'s':'c';hs[cur].textContent=kind==='s'?'⭐':'🌧️';hs[cur].className='kz-hole on';T(()=>{hide();pop()},kind==='s'?850:700)};
  hs.forEach(h=>h.onclick=()=>{if(!run||+h.dataset.i!==cur)return;score+=kind==='s'?1:-2;if(score<0)score=0;hide();upd()});
  el.querySelector('#kzGo').onclick=()=>{if(run)return;score=0;left=25;run=true;upd();pop();const iv=setInterval(()=>{left--;upd();if(left<=0){clearInterval(iv);run=false;hide();addStar(score>=15?3:score>=8?2:1);el.querySelector('#kzGo').textContent='Jogar de novo';el.insertAdjacentHTML('beforeend','<p class="kz-fb">Fim! Você fez '+score+' pontos. ⭐</p>')}},1000);(kidsState.iv||(kidsState.iv=[])).push(iv)};
}

/* ---- Conte comigo ---- */
function renderCount(){
  const el=stage();const EM=['🧸','🍎','🦋','🐠','🌼','🦒','🐻','⭐'];let q=0,pts=0;const R=8;
  const draw=()=>{
    if(q>=R){addStar(pts>=7?3:pts>=4?2:1);el.innerHTML='<h3>Conte comigo</h3><div class="kz-scene" style="background:#dcfce7"><div class="kz-art">🔢</div><div><b>Você acertou '+pts+' de '+R+'!</b></div></div><div class="kz-opts"><button class="kz-opt" id="kzR">↺ Jogar de novo</button></div>';el.querySelector('#kzR').onclick=()=>{q=0;pts=0;draw()};return}
    const n=2+Math.floor(Math.random()*(4+Math.min(q,5))),e=EM[Math.floor(Math.random()*EM.length)];
    const wrong=new Set();while(wrong.size<2){const w=Math.max(1,n+Math.floor(Math.random()*5)-2);if(w!==n)wrong.add(w)}
    const opts=shuffle([n,...wrong]);
    el.innerHTML='<h3>Conte comigo</h3><div class="kz-dots">'+Array.from({length:R},(_,j)=>'<i class="'+(j<=q?'on':'')+'"></i>').join('')+'</div><div class="kz-scene" style="background:#fef9c3;justify-content:center;flex-wrap:wrap;font-size:46px;gap:8px">'+Array.from({length:n},()=>'<span>'+e+'</span>').join('')+'</div><p class="muted" style="text-align:center">Quantos você vê?</p><div class="kz-tf" id="kzO">'+opts.map(o=>'<button class="kz-opt" style="text-align:center;font-size:26px">'+o+'</button>').join('')+'</div><p class="kz-fb" id="kzFb"></p>';
    el.querySelectorAll('#kzO .kz-opt').forEach(b=>b.onclick=()=>{
      const ok=+b.textContent===n;if(ok)pts++;b.classList.add(ok?'good':'bad');el.querySelectorAll('#kzO .kz-opt').forEach(z=>{z.disabled=true;if(+z.textContent===n)z.classList.add('good')});
      el.querySelector('#kzFb').textContent=ok?'Isso! São '+n+'. 🌼':'Eram '+n+'. Vamos de novo!';T(()=>{q++;draw()},1100);
    });
  };
  draw();
}

/* ---- Quebra-cabeça deslizante ---- */
function renderPuzzle(){
  const el=stage();let t=[1,2,3,4,5,6,7,8,0],moves=0,won=false;
  const sz=3,adj=(i)=>{const r=Math.floor(i/sz),c=i%sz,o=[];if(r>0)o.push(i-sz);if(r<sz-1)o.push(i+sz);if(c>0)o.push(i-1);if(c<sz-1)o.push(i+1);return o};
  const mix=()=>{t=[1,2,3,4,5,6,7,8,0];let z=8,last=-1;for(let k=0;k<120;k++){const o=adj(z).filter(x=>x!==last);const n=o[Math.floor(Math.random()*o.length)];t[z]=t[n];t[n]=0;last=z;z=n}moves=0;won=false;draw()};
  const IMG=['','🌼','🩺','🧸','🍎','💧','🦷','🩹','⭐'];
  const draw=()=>{
    el.innerHTML='<h3>Quebra-cabeça da Daisy</h3><p class="muted">Deslize as peças até ficarem na ordem <b>1 a 8</b>, com o espaço vazio no final. Jogadas: <b>'+moves+'</b>'+(won?' · Parabéns! ⭐':'')+'</p><div class="kz-puz">'+t.map((v,i)=>'<button class="kz-pc'+(v===0?' e':'')+(v&&v===i+1?' ok':'')+'" data-i="'+i+'" aria-label="peça">'+(v?'<span>'+v+'</span><em>'+IMG[v]+'</em>':'')+'</button>').join('')+'</div><button class="btn" id="kzMix">Embaralhar de novo</button>';
    el.querySelectorAll('.kz-pc').forEach(b=>b.onclick=()=>{
      if(won)return;const i=+b.dataset.i,z=t.indexOf(0);if(!adj(i).includes(z))return;t[z]=t[i];t[i]=0;moves++;
      if(t.slice(0,8).every((v,k)=>v===k+1)){won=true;addStar(moves<=40?3:2)}draw();
    });
    el.querySelector('#kzMix').onclick=mix;
  };
  mix();
}

const TABS=[['story','🌼 Histórias',renderStory],['mem','🧠 Memória',renderMemory],['quiz','❓ Perguntas',renderQuiz],['tf','✅ Certo ou errado',renderTF],['simon','🎶 Cores da Daisy',renderSimon],['stars','⭐ Caça-estrelas',renderStars],['count','🔢 Conte comigo',renderCount],['puz','🧩 Quebra-cabeça',renderPuzzle],['paint','🎨 Colorir',renderPaint]];
function showTab(id){
  clearTimeout(kidsState.mt);clearTM();kidsState.tab=id;
  $$('#kids .kz-tab').forEach(b=>b.classList.toggle('on',b.dataset.t===id));
  const el=stage();const fresh=el.cloneNode(false);el.parentNode.replaceChild(fresh,el);   /* descarta ouvintes antigos */
  (TABS.find(t=>t[0]===id)||TABS[0])[2]();
}
function buildKids(){
  const sec=$('#kids');if(!sec||sec.dataset.kz)return;sec.dataset.kz='1';
  sec.innerHTML='<div class="section-head"><div><small>app do convênio · espaço kids</small><h2>Espaço Kids da Daisy</h2><p class="muted">Histórias, jogos e desenhos para a criança se distrair e entender a consulta sem medo. Sem login e sem coleta de dados; uso com um adulto por perto.</p></div><div class="extract-actions"><span class="kz-stars" id="kzStars">⭐ 0 estrelas</span></div></div>'+
   '<div class="kz-wrap"><div class="kz-tabs">'+TABS.map(t=>'<button class="kz-tab" data-t="'+t[0]+'">'+t[1]+'</button>').join('')+'</div><div class="kz-stage" id="kzStage"></div></div>';
  sec.querySelectorAll('.kz-tab').forEach(b=>b.onclick=()=>showTab(b.dataset.t));
  showTab(kidsState.tab);
}

/* =============================== WHATSAPP =============================== */
function buildWa(){
  const sec=$('#whatsapp');if(!sec||sec.dataset.wz)return;
  const shell=sec.querySelector('.chat-shell'),phone=sec.querySelector('.phone'),body=$('#waBody'),inp=$('#waInput');if(!shell||!phone||!body||!inp)return;
  sec.dataset.wz='1';
  const sendB=sec.querySelector('.wa-send-main'),voiceB=sec.querySelector('.wa-send-voice'),mute=$('#muteBtnWa'),sel=$('#voiceProfileWa');
  const heroSrc=($('#appchat img[data-daisy-hero]')||{}).src||'',heroBg=($('#appchat .welcome-daisy-visual')||{style:{}}).style.background||'';
  const head=sec.querySelector('.section-head');
  if(head){head.className='section-head appchat-toolbar';head.innerHTML='<button class="btn" onclick="playVoice()">▶ Ouvir a Daisy</button>'}
  const card=document.createElement('div');card.className='card chat-card wa-chat-card';
  card.innerHTML='<div class="app-chat-welcome app-chat-welcome-v40"><div class="welcome-daisy-visual" style="background:'+heroBg+'"><img data-daisy-hero src="'+heroSrc+'" alt="Daisy dando boas-vindas a Patricia no WhatsApp"></div><div class="welcome-copy-card"><span class="welcome-mini">DaisyCare · Mater Dei · WhatsApp</span><h3>Bem-vinda, Patricia!</h3><p>Que bom ter você por aqui novamente. Estou pronta para acompanhar sua consulta, facilitar sua chegada e deixar sua experiência mais leve, organizada e acolhedora.</p><hr><p>Se quiser, posso mostrar sua fila digital, conferir sua agenda ou sugerir lugares como cafeteria, livraria e brinquedoteca enquanto você aguarda.</p><small>Digite ou fale um número de 1 a 11. Também posso seguir por “Quero dicas”, “Fila digital”, “Pix/Boleto” ou “Atendente humano”.</small></div></div>'+
   '<div class="chat-status"><div class="chat-status-left"><span class="live-dot"></span><span>Conversa ativa com Daisy</span></div><span class="muted">Hoje, 10:24 · WhatsApp</span></div><div class="chat-input"></div>';
  card.insertBefore(body,card.querySelector('.chat-input'));
  body.classList.add('chat-body');
  inp.placeholder='Digite ou fale um número de 1 a 11';
  const row=card.querySelector('.chat-input');
  if(sendB){sendB.className='btn btn-send';sendB.textContent='➤ Enviar'}
  if(voiceB){voiceB.className='btn ghost btn-talk';voiceB.textContent='🎙 Falar'}
  [inp,sendB,voiceB].forEach(x=>x&&row.appendChild(x));
  const vc=document.createElement('div');vc.className='voice-controls wa-voice-controls';[mute,sel].forEach(x=>x&&vc.appendChild(x));row.appendChild(vc);
  phone.replaceWith(card);
  const aside=shell.querySelector('aside');if(aside)aside.className='chat-side-panel';
  const menu=sec.querySelector('.wa-menu-actions');if(menu){menu.classList.add('menu-grid');const h=menu.closest('.card');if(h){const k=h.querySelector('.kicker');if(k)k.textContent='Comandos rápidos';const t=h.querySelector('h3');if(t)t.textContent='Menu funcional do WhatsApp';const p=h.querySelector('p.muted');if(p)p.textContent='Mesma numeração do chat do App. Você também pode falar naturalmente ou digitar MENU para voltar ao início.'}}
  const rule=sec.querySelector('.business-rule-card');
  if(rule){const ul=rule.querySelector('ul');if(ul)ul.innerHTML='<li><b>1 a 4</b> cobrem confirmação, fila, agenda e nova consulta.</li><li><b>5</b> exige código familiar + CPF do responsável.</li><li><b>6</b> só libera cobrança após validar nome completo e CPF.</li><li><b>7</b> entrega dicas de espera sem perder a fila.</li><li><b>8 a 11</b> avaliam o atendimento, tiram dúvidas, apresentam a Daisy ou chamam um atendente humano.</li><li>Questões clínicas, exames e medicamentos seguem para a equipe assistencial.</li>'}
  try{if(typeof window.selectDaisy==='function'&&typeof window.__dcDaisyIdx==='number')window.selectDaisy(window.__dcDaisyIdx)}catch(e){}
}

/* ---- textos do chat do app: 1 a 11 ---- */
function fixChatHints(){
  const sm=$('#appchat .welcome-copy-card small');if(sm&&!sm.dataset.dc){sm.dataset.dc='1';sm.textContent='Digite ou fale um número de 1 a 11. Também posso seguir por “Quero dicas”, “Fila digital”, “Pix/Boleto” ou “Atendente humano”.'}
  const i=$('#appInput');if(i)i.placeholder='Digite ou fale um número de 1 a 11';
  const w=$('#waInput');if(w)w.placeholder='Digite ou fale um número de 1 a 11';
}

function all(){for(const f of [buildKids,buildWa,fixChatHints]){try{f()}catch(e){console.warn('v49',f.name,e)}}}
const _sp=window.showPage;
if(typeof _sp==='function'){window.showPage=function(p){const r=_sp.apply(this,arguments);setTimeout(all,40);return r};try{showPage=window.showPage}catch(e){}}
function init(){all();[600,1500,3200].forEach(t=>setTimeout(all,t))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,700));else setTimeout(init,700);
window.DAISY_V49={ART,svgOf,kidsState};
})();

/* ===== DaisyCare v40.52 · Indicadores operacionais (modelo Power BI, atualização automática) ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const D=__BI_DATA__;
const MN={'01':'jan','02':'fev','03':'mar','04':'abr','05':'mai'};
const mlabel=m=>MN[m.slice(5)]+'/'+m.slice(2,4);
const f0=n=>Math.round(n).toLocaleString('pt-BR');
const fp=(x,d=1)=>(x*100).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d})+'%';
const money=k=>{const v=k*1000;return v>=1e9?'R$ '+(v/1e9).toLocaleString('pt-BR',{maximumFractionDigits:2})+' bi':v>=1e6?'R$ '+(v/1e6).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mi':'R$ '+f0(v)};
const compact=n=>n>=1e6?(n/1e6).toLocaleString('pt-BR',{maximumFractionDigits:2})+' mi':n>=1e3?(n/1e3).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mil':f0(n);

const css=`
#bi{--b1:#6250d6;--b2:#1fa774;--b3:#e2573f;--b4:#3b82e0;--b5:#0fa3b1;--b6:#d4569a;--b7:#e6a118;--good:#169a68;--warn:#b87616;--crit:#d04a5f;--gridc:rgba(116,106,147,.16);--bi-surface:var(--card)}
body.dark #bi{--b1:#9a8cf0;--b2:#3ec28d;--b3:#f0705a;--b4:#6aa3f0;--b5:#35c3d1;--b6:#e377b1;--b7:#f0bd45;--good:#42d390;--warn:#e6be62;--crit:#f07b7b;--gridc:rgba(255,255,255,.12)}
#bi .bi-top{display:flex;gap:14px;align-items:flex-end;justify-content:space-between;flex-wrap:wrap}
#bi .bi-live{display:flex;align-items:center;gap:10px;font:700 12px var(--font);color:var(--muted);flex-wrap:wrap}
#bi .bi-dot{width:10px;height:10px;border-radius:50%;background:var(--good);box-shadow:0 0 0 0 rgba(21,153,101,.6);animation:bip 2s infinite}
@keyframes bip{70%{box-shadow:0 0 0 9px rgba(21,153,101,0)}100%{box-shadow:0 0 0 0 rgba(21,153,101,0)}}
#bi .bi-filters{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0;padding:12px 14px;background:var(--card);border:1px solid var(--line);border-radius:18px;align-items:center}
#bi .bi-filters label{display:flex;flex-direction:column;gap:3px;font:800 12px var(--font);letter-spacing:.09em;text-transform:uppercase;color:var(--muted)}
#bi .bi-filters select{padding:8px 12px;border-radius:12px;border:1px solid var(--line);background:var(--card2);color:var(--ink);font:700 13px var(--font);min-width:150px}
#bi .bi-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
@media(max-width:1180px){#bi .bi-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){#bi .bi-kpis{grid-template-columns:1fr}}
#bi .kpi{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:16px 18px 14px;position:relative;overflow:hidden;box-shadow:var(--shadow)}
#bi .kpi:before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--kc,var(--b1))}
#bi .kpi .kl{font:800 12px var(--font);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);display:flex;justify-content:space-between;gap:8px}
#bi .kpi .kv{font:800 clamp(26px,2.3vw,34px)/1.1 var(--font);color:var(--ink);margin:8px 0 2px;letter-spacing:-.02em}
#bi .kpi .ks{font:600 12px var(--font);color:var(--muted);min-height:16px}
#bi .kpi .kf{display:flex;justify-content:space-between;align-items:flex-end;margin-top:8px;gap:8px}
#bi .kpi svg.spark{width:96px;height:30px;flex:none}
#bi .tag{display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:3px 9px;font:800 12px var(--font);white-space:nowrap}
#bi .tag.g{background:rgba(21,153,101,.14);color:var(--good)}#bi .tag.w{background:rgba(184,118,22,.16);color:var(--warn)}#bi .tag.c{background:rgba(199,77,98,.14);color:var(--crit)}#bi .tag.n{background:var(--soft);color:var(--muted)}
#bi .bi-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:14px;margin-top:16px}
#bi .cc{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:18px 20px;box-shadow:var(--shadow);grid-column:span 6;min-width:0}
#bi .cc.w8{grid-column:span 8}#bi .cc.w4{grid-column:span 4}#bi .cc.w12{grid-column:span 12}
@media(max-width:1100px){#bi .cc,#bi .cc.w8,#bi .cc.w4{grid-column:span 12}}
#bi .cc h3{margin:0 0 2px;font:800 15px var(--font)!important;color:var(--ink)}
#bi .cc .sub{font:600 12px var(--font)!important;color:var(--muted);margin:0 0 10px}
#bi .cc .hd{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap}
#bi .seg{display:flex;gap:4px;background:var(--soft);border-radius:999px;padding:3px}
#bi .seg button{border:0;background:transparent;color:var(--muted);font:800 12px var(--font);padding:5px 11px;border-radius:999px;cursor:pointer}
#bi .seg button.on{background:var(--card);color:var(--primary);box-shadow:0 2px 6px rgba(0,0,0,.12)}
#bi svg.ch{width:100%;height:auto;display:block;overflow:visible}
#bi .ax{font:600 12px var(--font);fill:var(--muted)}
#bi .vl{font:800 12px var(--font);fill:var(--ink)}
#bi .gl{stroke:var(--gridc);stroke-width:1}
#bi .lg{display:flex;gap:14px;flex-wrap:wrap;margin:6px 0 0;font:700 12px var(--font);color:var(--ink)}
#bi .lg i{display:inline-block;width:12px;height:12px;border-radius:4px;margin-right:6px;vertical-align:-2px}
#bi .hov{opacity:0;cursor:pointer}
#bi .bar{transition:opacity .15s}
#bi .bi-foot{margin-top:14px;font:600 12px/1.5 var(--font);color:var(--muted)}
#bi .bi-tip{position:fixed;z-index:9999;pointer-events:none;background:#1c1738;color:#fff;border-radius:12px;padding:9px 12px;font:600 12px/1.45 var(--font);box-shadow:0 10px 30px rgba(0,0,0,.3);max-width:260px;display:none}
#bi .bi-tip b{color:#c4b5fd}
#bi .kpi,#bi .cc,#bi .bi-filters,#biAlerts{background:linear-gradient(150deg,color-mix(in srgb,var(--card) 92%,transparent),color-mix(in srgb,var(--card) 70%,transparent))!important;backdrop-filter:blur(10px);border-color:color-mix(in srgb,var(--line) 70%,transparent)!important}
#bi .kpi:before{width:4px;opacity:.85;border-radius:0 4px 4px 0}
#bi .kpi:after{content:"";position:absolute;right:-30px;top:-30px;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,var(--kc,var(--b1)),transparent 70%);opacity:.12;pointer-events:none}
#bi .bar{stroke-width:1.4px}
#bi .gl{stroke-dasharray:3 5}
#bi .bi-sec{display:flex;align-items:baseline;gap:10px;margin:22px 0 10px}
#bi .bi-sec h3{margin:0;font:900 16px var(--font)!important;color:var(--ink)}
#bi .bi-sec span{font:600 12px var(--font);color:var(--muted)}
#bi .pal{display:flex;gap:14px;flex-wrap:wrap;margin:6px 0 0;font:700 12px var(--font);color:var(--muted)}
#bi .pal i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;vertical-align:-1px}
#bi table.tv{width:100%;border-collapse:collapse;font:600 12px var(--font);margin-top:8px}
#bi table.tv td,#bi table.tv th{padding:5px 8px;border-bottom:1px solid var(--line);text-align:right}#bi table.tv th:first-child,#bi table.tv td:first-child{text-align:left}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ------------ motor de agregação ------------ */
const F={m:'all',u:'all',e:'all',c:'all'};
const A=(r,i)=>r[4+i];   // n,re,ns,ca,rm,c24,c4,cv,tk,pd,rc → 0..10
function selA(extra){return D.a.filter(r=>(F.m==='all'||r[0]===+F.m)&&(F.u==='all'||r[1]===+F.u)&&(F.e==='all'||r[2]===+F.e)&&(F.c==='all'||r[3]===+F.c)&&(!extra||extra(r)))}
function selQ(){return D.q.filter(r=>(F.m==='all'||r[0]===+F.m)&&(F.u==='all'||r[1]===+F.u)&&(F.e==='all'||r[2]===+F.e)&&(F.c==='all'||r[3]===+F.c))}
function sum(rows,idx){return rows.reduce((a,r)=>a+r[idx],0)}
const lm=()=>F.m==='all'?null:D.LM.indexOf(D.M[+F.m]);   // índice do mês nos logs (ou -1)
function selL(){const k=lm();return D.l.filter(r=>k===null||r[0]===k)}
function selMot(){const k=lm();return D.m.filter(r=>k===null||r[0]===k)}
const kA={n:4,re:5,ns:6,ca:7,rm:8,c24:9,c4:10,cv:11,tk:12,pd:13,rc:14,rr:15};
const kQ={n:4,prom:5,det:6,esp:7,nota:8,fcr:9,resp:10};

function monthly(fn){return D.M.map((_,mi)=>{const rows=D.a.filter(r=>r[0]===mi&&(F.u==='all'||r[1]===+F.u)&&(F.e==='all'||r[2]===+F.e)&&(F.c==='all'||r[3]===+F.c));return fn(rows,mi)})}
function monthlyQ(fn){return D.M.map((_,mi)=>fn(D.q.filter(r=>r[0]===mi&&(F.u==='all'||r[1]===+F.u)&&(F.e==='all'||r[2]===+F.e)&&(F.c==='all'||r[3]===+F.c)),mi))}
function monthlyL(fn){return D.LM.map((_,mi)=>fn(D.l.filter(r=>r[0]===mi),mi))}
const rate=(rows,a,b)=>{const d=sum(rows,kA[b]);return d?sum(rows,kA[a])/d:null};

/* ------------ KPIs ------------ */
function kpiList(){
  const rows=selA(),q=selQ(),L=selL();
  const n=sum(rows,kA.n);
  const evn=i=>L.filter(r=>r[2]===i).reduce((a,r)=>a+r[6],0);
  const lt=L.reduce((a,r)=>a+r[6],0),okc=L.filter(r=>r[3]===0).reduce((a,r)=>a+r[6],0);
  const accept=evn(4)?evn(5)/evn(4):null,sucesso=lt?okc/lt:null;
  const nq=sum(q,kQ.n),nps=nq?(sum(q,kQ.prom)-sum(q,kQ.det))/nq*100:null;
  const sp=fn=>monthly(fn).map(v=>v);
  const spNPS=monthlyQ(rs=>{const nn=sum(rs,kQ.n);return nn?(sum(rs,kQ.prom)-sum(rs,kQ.det))/nn*100:null});
  return [
   {k:'Agendamentos',v:compact(n),s:f0(n)+' registros no filtro',sp:sp(rs=>sum(rs,kA.n)),c:'var(--b1)',def:'Agendamentos Totais = COUNT(id_agendamento)'},
   {k:'Comparecimento',v:fp(n?sum(rows,kA.re)/n:0),s:'meta ≥ 75%',sp:sp(rs=>rate(rs,'re','n')),val:n?sum(rows,kA.re)/n:null,meta:.75,up:1,c:'var(--b2)',def:'Qtd_Realizados ÷ Agendamentos Totais'},
   {k:'No-show',v:fp(n?sum(rows,kA.ns)/n:0),s:'meta ≤ 12%',sp:sp(rs=>rate(rs,'ns','n')),val:n?sum(rows,kA.ns)/n:null,meta:.12,up:0,c:'var(--b3)',def:'SUM(no_show) ÷ COUNT(id_agendamento)'},
   {k:'Receita perdida',v:money(sum(rows,kA.pd)),s:'no-show + cancelamentos',sp:sp(rs=>sum(rs,kA.pd)),c:'var(--b3)',def:'ticket_estimado de status No-Show + Cancelado'},
   {k:'Confirmação 24 h',v:fp(n?sum(rows,kA.c24)/n:0),s:'meta ≥ 85%',sp:sp(rs=>rate(rs,'c24','n')),val:n?sum(rows,kA.c24)/n:null,meta:.85,up:1,c:'var(--b4)',def:'SUM(confirmou_24h) ÷ Agendamentos Totais'},
   {k:'NPS',v:nps===null?'—':nps.toLocaleString('pt-BR',{maximumFractionDigits:0}),s:'meta ≥ 70 · promotores − detratores',sp:spNPS,val:nps,meta:70,up:1,num:1,c:'var(--b6)',def:'% Promotores − % Detratores (dataset_02)'},
   {k:'Aceite Smart Queue',v:accept===null?'—':fp(accept),s:L.length?'convites aceitos ÷ enviados':'sem registros no período',sp:monthlyL(rs=>{const e=i=>rs.filter(r=>r[2]===i).reduce((a,r)=>a+r[6],0);return e(4)?e(5)/e(4):null}),val:accept,meta:.5,up:1,c:'var(--b1)',def:'convite_aceito ÷ convite_enviado (logs n8n)'},
   {k:'Sucesso da automação',v:sucesso===null?'—':fp(sucesso),s:L.length?'meta ≥ 90% das execuções':'sem registros no período',sp:monthlyL(rs=>{const t=rs.reduce((a,r)=>a+r[6],0);return t?rs.filter(r=>r[3]===0).reduce((a,r)=>a+r[6],0)/t:null}),val:sucesso,meta:.9,up:1,c:'var(--b2)',def:'execuções com status sucesso ÷ total (logs n8n)'}
  ];
}
function status(k){
  if(k.val==null||k.meta==null)return null;
  const r=k.up?k.val/k.meta:k.meta/k.val;
  return r>=1?['g','● Dentro da meta']:r>=.85?['w','▲ Atenção']:['c','■ Crítico'];
}
function spark(vals,color){
  const v=vals.map(x=>x==null?null:x),ok=v.filter(x=>x!=null);if(ok.length<2)return '';
  const mn=Math.min(...ok),mx=Math.max(...ok),W=96,H=30,sx=i=>2+i*(W-4)/(v.length-1),sy=x=>H-3-(mx===mn?.5:(x-mn)/(mx-mn))*(H-8);
  let d='',first=true;v.forEach((x,i)=>{if(x==null)return;d+=(first?'M':'L')+sx(i).toFixed(1)+' '+sy(x).toFixed(1);first=false});
  const li=v.map((x,i)=>x==null?-1:i).filter(i=>i>=0).pop();
  return '<svg class="spark" viewBox="0 0 '+W+' '+H+'" aria-hidden="true"><path d="'+d+'" fill="none" stroke="'+color+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="'+sx(li)+'" cy="'+sy(v[li])+'" r="3.2" fill="'+color+'" stroke="var(--card)" stroke-width="2"/></svg>';
}
/* ------------ sucesso e recuperação ------------ */
const encMes=mi=>{const li=D.LM.indexOf(D.M[mi]);return li<0?0:D.l.filter(r=>r[0]===li&&r[2]===6).reduce((a,r)=>a+r[6],0)};
function recovery(rows,mi){   // receita recuperada = remarcações + encaixes Smart Queue (ticket médio do filtro)
  const n=sum(rows,kA.n),tk=n?sum(rows,kA.tk)/n:0,rr=sum(rows,kA.rr);
  const enc=mi==null?selL().filter(r=>r[2]===6).reduce((a,r)=>a+r[6],0):encMes(mi);
  return {rr,encR:enc*tk,tot:rr+enc*tk,enc,tk};
}
function kpiList2(){
  const rows=selA(),q=selQ(),L=selL(),n=sum(rows,kA.n);
  const ns=sum(rows,kA.ns),ca=sum(rows,kA.ca),rm=sum(rows,kA.rm),perd=sum(rows,kA.pd);
  const evn=i=>L.filter(r=>r[2]===i).reduce((a,r)=>a+r[6],0);
  const rv=recovery(rows),nq=sum(q,kQ.n);
  const revFalta=(ns+ca+rm)?rm/(ns+ca+rm):null,revVaga=evn(0)?evn(6)/evn(0):null,recPct=perd?rv.tot/perd:null;
  const encAceite=evn(5)?evn(6)/evn(5):null,fcr=nq?sum(q,kQ.fcr)/nq:null,nota=nq?sum(q,kQ.nota)/nq:null,esp=nq?sum(q,kQ.esp)/nq:null;
  const sp=fn=>monthly(fn);
  return [
   {k:'Reversão de faltas',v:revFalta==null?'—':fp(revFalta),s:'meta ≥ 15% · remarcados ÷ (no-show + cancelados + remarcados)',sp:sp(rs=>{const a=sum(rs,kA.ns)+sum(rs,kA.ca)+sum(rs,kA.rm);return a?sum(rs,kA.rm)/a:null}),val:revFalta,meta:.15,up:1,c:'var(--b5)',def:'Remarcado ÷ (No-Show + Cancelado + Remarcado)'},
   {k:'Receita recuperada',v:money(rv.tot),s:money(rv.rr)+' em remarcações + '+money(rv.encR)+' em encaixes (estimado)',sp:D.M.map((_,mi)=>{const rs=D.a.filter(r=>r[0]===mi&&(F.u==='all'||r[1]===+F.u)&&(F.e==='all'||r[2]===+F.e)&&(F.c==='all'||r[3]===+F.c));return recovery(rs,mi).tot}),c:'var(--b5)',def:'Ticket dos remarcados + encaixes confirmados × ticket médio do filtro'},
   {k:'Recuperação da receita',v:recPct==null?'—':fp(recPct),s:'meta ≥ 20% · recuperada ÷ perdida',sp:D.M.map((_,mi)=>{const rs=D.a.filter(r=>r[0]===mi&&(F.u==='all'||r[1]===+F.u)&&(F.e==='all'||r[2]===+F.e)&&(F.c==='all'||r[3]===+F.c));const p=sum(rs,kA.pd);return p?recovery(rs,mi).tot/p:null}),val:recPct,meta:.20,up:1,c:'var(--b5)',def:'Receita recuperada ÷ Receita perdida'},
   {k:'Reversão de vagas (Smart Queue)',v:revVaga==null?'—':fp(revVaga),s:L.length?'meta ≥ 25% · encaixes ÷ vagas liberadas':'sem registros no período',sp:monthlyL(rs=>{const e=i=>rs.filter(r=>r[2]===i).reduce((a,r)=>a+r[6],0);return e(0)?e(6)/e(0):null}),val:revVaga,meta:.25,up:1,c:'var(--b2)',def:'encaixe_confirmado ÷ vaga_liberada (logs n8n)'},
   {k:'Encaixe após aceite',v:encAceite==null?'—':fp(encAceite),s:L.length?'meta ≥ 55% · encaixes ÷ convites aceitos':'sem registros no período',sp:monthlyL(rs=>{const e=i=>rs.filter(r=>r[2]===i).reduce((a,r)=>a+r[6],0);return e(5)?e(6)/e(5):null}),val:encAceite,meta:.55,up:1,c:'var(--b2)',def:'encaixe_confirmado ÷ convite_aceito'},
   {k:'Resolução no 1º contato',v:fcr==null?'—':fp(fcr),s:'meta ≥ 80% · resolvido sem retorno',sp:monthlyQ(rs=>{const nn=sum(rs,kQ.n);return nn?sum(rs,kQ.fcr)/nn:null}),val:fcr,meta:.8,up:1,c:'var(--b6)',def:'resolucao_primeiro_contato ÷ avaliações'},
   {k:'Satisfação (1 a 5)',v:nota==null?'—':nota.toLocaleString('pt-BR',{maximumFractionDigits:2}),s:'meta ≥ 4,2 · nota do atendimento',sp:monthlyQ(rs=>{const nn=sum(rs,kQ.n);return nn?sum(rs,kQ.nota)/nn:null}),val:nota,meta:4.2,up:1,num:1,c:'var(--b6)',def:'média de nota_atendimento_1a5'},
   {k:'Espera média',v:esp==null?'—':f0(esp)+' min',s:'meta ≤ 25 min · tempo na unidade',sp:monthlyQ(rs=>{const nn=sum(rs,kQ.n);return nn?sum(rs,kQ.esp)/nn:null}),val:esp,meta:25,up:0,num:1,c:'var(--b4)',def:'média de tempo_espera_min'}
  ];
}
function tileHTML(k){const s=status(k);return '<div class="kpi" style="--kc:'+k.c+'" title="'+esc(k.def)+'"><div class="kl"><span>'+k.k+'</span>'+(s?'<span class="tag '+s[0]+'">'+s[1]+'</span>':'')+'</div><div class="kv">'+k.v+'</div><div class="ks">'+esc(k.s)+'</div><div class="kf">'+spark(k.sp,k.c)+'</div></div>'}
function renderKPIs(){$('#biKpis2').innerHTML=kpiList2().map(tileHTML).join('');renderKPIs1()}
function renderKPIs1(){
  $('#biKpis').innerHTML=kpiList().map(k=>{
    const s=status(k);
    return '<div class="kpi" style="--kc:'+k.c+'" title="'+esc(k.def)+'"><div class="kl"><span>'+k.k+'</span>'+(s?'<span class="tag '+s[0]+'">'+s[1]+'</span>':'')+'</div><div class="kv">'+k.v+'</div><div class="ks">'+esc(k.s)+'</div><div class="kf"><span class="muted" style="font:600 12px var(--font)">'+D.M.map(mlabel)[0]+' → '+(k.sp.length===4?mlabel(D.LM[3]):mlabel(D.M[4]))+'</span>'+spark(k.sp,k.c)+'</div></div>';
  }).join('');
}

/* ------------ gráficos ------------ */
const tip=()=>$('#biTip');
function showTip(e,html){const t=tip();t.innerHTML=html;t.style.display='block';const w=t.offsetWidth;t.style.left=Math.min(window.innerWidth-w-12,e.clientX+14)+'px';t.style.top=(e.clientY+16)+'px'}
function hideTip(){tip().style.display='none'}
function attachTips(root){root.querySelectorAll('[data-tip]').forEach(el=>{el.addEventListener('mousemove',e=>showTip(e,el.dataset.tip));el.addEventListener('mouseleave',hideTip);el.addEventListener('focus',()=>{const r=el.getBoundingClientRect();showTip({clientX:r.left,clientY:r.top},el.dataset.tip)});el.addEventListener('blur',hideTip)})}
const nice=mx=>{const p=Math.pow(10,Math.floor(Math.log10(mx)));const m=mx/p;return (m<=1?1:m<=2?2:m<=2.5?2.5:m<=5?5:10)*p};

function lineChart(id,labels,series,fmt,opts={}){
  const W=640,H=250,pl=44,pr=84,pt=14,pb=28,pw=W-pl-pr,ph=H-pt-pb;
  const all=series.flatMap(s=>s.v).filter(x=>x!=null);if(!all.length){$(id).innerHTML='<p class="muted">Sem dados para o filtro.</p>';return}
  const mx=nice(Math.max(...all)*1.12),sx=i=>pl+(labels.length===1?pw/2:i*pw/(labels.length-1)),sy=v=>pt+ph-(v/mx)*ph;
  let g='';for(let i=0;i<=4;i++){const y=pt+ph*i/4;g+='<line class="gl" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'"/><text class="ax" x="'+(pl-8)+'" y="'+(y+3.5)+'" text-anchor="end">'+fmt(mx*(1-i/4),true)+'</text>'}
  labels.forEach((l,i)=>g+='<text class="ax" x="'+sx(i)+'" y="'+(H-8)+'" text-anchor="middle">'+l+'</text>');
  let body='',defs='';
  const ends=series.map(s=>{const li=s.v.map((v,i)=>v==null?-1:i).filter(i=>i>=0).pop();return li==null?null:sy(s.v[li])});
  const ly=ends.map((y,i)=>({i,y})).sort((a,b)=>a.y-b.y);for(let k=1;k<ly.length;k++){if(ly[k].y-ly[k-1].y<30)ly[k].y=ly[k-1].y+30}
  const labY=[];ly.forEach(o=>labY[o.i]=o.y);
  series.forEach((s,si)=>{
    let d='',first=true,pts='';s.v.forEach((v,i)=>{if(v==null)return;d+=(first?'M':'L')+sx(i).toFixed(1)+' '+sy(v).toFixed(1);first=false;pts+='<circle cx="'+sx(i)+'" cy="'+sy(v)+'" r="4" fill="'+s.c+'" stroke="var(--card)" stroke-width="2"/>'});
    {const lastI=s.v.map((v,i)=>v==null?-1:i).filter(i=>i>=0).pop(),gid=(id+'g'+si).replace('#','');defs+='<linearGradient id="'+gid+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:'+s.c+'" stop-opacity="'+(s.area?.42:.18)+'"/><stop offset="1" style="stop-color:'+s.c+'" stop-opacity="0"/></linearGradient>';body+='<path d="'+d+' L'+sx(lastI)+' '+(pt+ph)+' L'+sx(0)+' '+(pt+ph)+'z" fill="url(#'+gid+')"/>'}
    body+='<path d="'+d+'" fill="none" stroke="'+s.c+'" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 3px 5px color-mix(in srgb,'+s.c+' 35%,transparent))"/>'+pts;
    const li=s.v.map((v,i)=>v==null?-1:i).filter(i=>i>=0).pop();if(li!=null)body+='<text class="vl" x="'+(sx(li)+10)+'" y="'+(labY[si]+4)+'">'+fmt(s.v[li])+'</text><text class="ax" x="'+(sx(li)+10)+'" y="'+(labY[si]+17)+'" style="fill:'+s.c+';font-weight:800">'+s.n+'</text>';
  });
  let hov='';labels.forEach((l,i)=>{const t='<b>'+l+'</b><br>'+series.map(s=>s.n+': '+(s.v[i]==null?'—':fmt(s.v[i]))).join('<br>');hov+='<rect class="hov" tabindex="0" x="'+(sx(i)-pw/(labels.length*2))+'" y="'+pt+'" width="'+(pw/labels.length)+'" height="'+ph+'" data-tip="'+esc(t)+'"/>'});
  $(id).innerHTML='<svg class="ch" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(opts.aria||'Gráfico de linhas')+'"><defs>'+defs+'</defs>'+g+body+hov+'</svg><div class="lg">'+series.map(s=>'<span><i style="background:'+s.c+'"></i>'+s.n+'</span>').join('')+'</div>';
  attachTips($(id));
}
function hbars(id,items,fmt,opts={}){
  items=items.filter(x=>x.v!=null);if(!items.length){$(id).innerHTML='<p class="muted">Sem dados para o filtro.</p>';return}
  const W=640,rowH=opts.rowH||30,pl=opts.pl||130,pr=70,H=items.length*rowH+8,mx=Math.max(...items.map(x=>x.v))||1;
  const avg=opts.avg;
  let b='';items.forEach((x,i)=>{const y=4+i*rowH,w=Math.max(6,(x.v/mx)*(W-pl-pr)),hi=opts.hi!=null?i===opts.hi:false;
    b+='<text class="ax" x="'+(pl-10)+'" y="'+(y+rowH/2+3.5)+'" text-anchor="end" style="fill:var(--ink)">'+esc(x.n)+'</text><path class="bar" d="M'+pl+' '+(y+4)+'h'+(w-4)+'a4 4 0 0 1 4 4v'+(rowH-16)+'a4 4 0 0 1 -4 4h-'+(w-4)+'z" fill="'+(x.c||opts.c||'var(--b1)')+'" fill-opacity="'+(opts.dim&&!hi?.22:.38)+'" stroke="'+(x.c||opts.c||'var(--b1)')+'" stroke-opacity=".95"/><text class="vl" x="'+(pl+w+8)+'" y="'+(y+rowH/2+3.5)+'">'+fmt(x.v)+'</text><rect class="hov" tabindex="0" x="0" y="'+y+'" width="'+W+'" height="'+rowH+'" data-tip="'+esc('<b>'+x.n+'</b><br>'+(x.tip||fmt(x.v)))+'"/>'});
  if(avg!=null){const ax=pl+(avg/mx)*(W-pl-pr);b+='<line x1="'+ax+'" x2="'+ax+'" y1="0" y2="'+H+'" stroke="var(--ink)" stroke-dasharray="4 4" opacity=".55"/><text class="ax" x="'+ax+'" y="'+(H+10)+'" text-anchor="middle">média '+fmt(avg)+'</text>'}
  $(id).innerHTML='<svg class="ch" viewBox="0 0 '+W+' '+(H+(avg!=null?14:0))+'" role="img" aria-label="'+esc(opts.aria||'Gráfico de barras')+'">'+b+'</svg>';attachTips($(id));
}
function funnel(id,steps,W){
  W=W||640;const base=steps[0].v||1;const rowH=44,H=steps.length*rowH;
  let b='';steps.forEach((s,i)=>{const w=Math.max(6,(s.v/base)*(W-250)),y=i*rowH+4,prev=i?steps[i-1].v:null;
    const conv=prev?s.v/prev:1;
    b+='<text class="ax" x="0" y="'+(y+rowH/2-2)+'" style="fill:var(--ink);font-weight:700">'+esc(s.n)+'</text><text class="ax" x="0" y="'+(y+rowH/2+11)+'">'+(i?fp(conv,0)+' do passo anterior':'início da jornada')+'</text>'+
     '<path class="bar" d="M150 '+(y+4)+'h'+(w-4)+'a4 4 0 0 1 4 4v'+(rowH-20)+'a4 4 0 0 1 -4 4h-'+(w-4)+'z" fill="'+s.c+'" fill-opacity="'+(.42-i*.04)+'" stroke="'+s.c+'" stroke-opacity=".95"/><text class="vl" x="'+(150+w+8)+'" y="'+(y+rowH/2+1)+'">'+compact(s.v)+'</text><text class="ax" x="'+(150+w+8)+'" y="'+(y+rowH/2+14)+'">'+fp(s.v/base,0)+' do total</text><rect class="hov" tabindex="0" x="0" y="'+y+'" width="'+W+'" height="'+rowH+'" data-tip="'+esc('<b>'+s.n+'</b><br>'+f0(s.v)+' ('+fp(s.v/base)+' do início)')+'"/>'});
  $(id).innerHTML='<svg class="ch" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Funil">'+b+'</svg>';attachTips($(id));
}
function stacked(id,labels,segs,fmt){
  const W=640,H=230,pl=40,pr=10,pt=10,pb=28,pw=W-pl-pr,ph=H-pt-pb,bw=Math.min(70,pw/labels.length*.6);
  let g='';for(let i=0;i<=4;i++){const y=pt+ph*i/4;g+='<line class="gl" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'"/><text class="ax" x="'+(pl-6)+'" y="'+(y+3.5)+'" text-anchor="end">'+(100-i*25)+'%</text>'}
  let b='';labels.forEach((l,i)=>{const cx=pl+(i+.5)*pw/labels.length;let y=pt+ph;const tot=segs.reduce((a,s)=>a+(s.v[i]||0),0);
    segs.forEach((s,j)=>{const v=s.v[i]||0,h=tot?v/tot*ph:0;y-=h;if(h>0)b+='<rect class="bar" x="'+(cx-bw/2)+'" y="'+(y+(j<segs.length-1?1:0))+'" width="'+bw+'" height="'+Math.max(0,h-(j<segs.length-1?2:0))+'" rx="'+(j===segs.length-1?5:0)+'" fill="'+s.c+'" fill-opacity=".5" stroke="'+s.c+'" stroke-opacity=".95"/>'});
    b+='<text class="ax" x="'+cx+'" y="'+(H-8)+'" text-anchor="middle">'+l+'</text>';
    if(tot){const t='<b>'+l+'</b><br>'+segs.map(s=>s.n+': '+fp((s.v[i]||0)/tot)).join('<br>')+(segs.extra?'<br>'+segs.extra[i]:'');b+='<rect class="hov" tabindex="0" x="'+(cx-pw/labels.length/2)+'" y="'+pt+'" width="'+(pw/labels.length)+'" height="'+ph+'" data-tip="'+esc(t)+'"/>'}
  });
  $(id).innerHTML='<svg class="ch" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Barras empilhadas">'+g+b+'</svg><div class="lg">'+segs.map(s=>'<span><i style="background:'+s.c+'"></i>'+s.n+'</span>').join('')+'</div>';attachTips($(id));
}

function groupBars(id,labels,series,fmt,extra){
  const W=640,H=250,pl=48,pr=12,pt=22,pb=28,pw=W-pl-pr,ph=H-pt-pb;
  const mx=nice(Math.max(1,...series.flatMap(s=>s.v.filter(x=>x!=null)))*1.12),n=series.length,gw=pw/labels.length,bw=Math.min(34,gw*.7/n);
  let g='';for(let i=0;i<=4;i++){const y=pt+ph*i/4;g+='<line class="gl" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'"/><text class="ax" x="'+(pl-8)+'" y="'+(y+3.5)+'" text-anchor="end">'+fmt(mx*(1-i/4),true)+'</text>'}
  let b='';labels.forEach((l,i)=>{const cx=pl+(i+.5)*gw;
    series.forEach((s,j)=>{const v=s.v[i]||0,h=v/mx*ph,x=cx-(n*bw+(n-1)*4)/2+j*(bw+4);b+='<path class="bar" d="M'+x+' '+(pt+ph)+'v-'+Math.max(0,h-6)+'a6 6 0 0 1 6 -6h'+(bw-12)+'a6 6 0 0 1 6 6v'+Math.max(0,h-6)+'z" fill="'+s.c+'" fill-opacity=".42" stroke="'+s.c+'" stroke-opacity=".95"/>'});
    b+='<text class="ax" x="'+cx+'" y="'+(H-8)+'" text-anchor="middle">'+l+'</text>'+(extra&&extra[i]!=null?'<text class="vl" x="'+cx+'" y="'+(pt-7)+'" text-anchor="middle" style="fill:var(--b5)">'+extra[i]+'</text>':'');
    const t='<b>'+l+'</b><br>'+series.map(s=>s.n+': '+fmt(s.v[i]||0)).join('<br>')+(extra&&extra[i]!=null?'<br>Recuperação: '+extra[i]:'');b+='<rect class="hov" tabindex="0" x="'+(cx-gw/2)+'" y="'+pt+'" width="'+gw+'" height="'+ph+'" data-tip="'+esc(t)+'"/>'});
  $(id).innerHTML='<svg class="ch" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Receita perdida e recuperada por mês">'+g+b+'</svg><div class="lg">'+series.map(s=>'<span><i style="background:'+s.c+'"></i>'+s.n+'</span>').join('')+(extra?'<span style="color:var(--b5)">■ % no topo = recuperação sobre a perda</span>':'')+'</div>';attachTips($(id));
}
/* ------------ montagem dos gráficos ------------ */
const dimState={d:'e'};
function renderCharts(){
  const rows=selA(),ML=D.M.map(mlabel);
  /* 1 tendência */
  lineChart('#biC1',ML,[
    {n:'Comparecimento',c:'var(--b2)',area:1,v:monthly(rs=>rate(rs,'re','n'))},
    {n:'No-show',c:'var(--b3)',v:monthly(rs=>rate(rs,'ns','n'))},
    {n:'Cancelamento',c:'var(--b7)',v:monthly(rs=>rate(rs,'ca','n'))}
  ],(v,ax)=>ax?Math.round(v*100)+'%':fp(v),{aria:'Taxas mensais de comparecimento, no-show e cancelamento'});
  /* 2 funil jornada */
  const n=sum(rows,kA.n);
  funnel('#biC2',[{n:'Agendados',v:n,c:'var(--b1)'},{n:'Confirmaram 24 h antes',v:sum(rows,kA.c24),c:'var(--b4)'},{n:'Confirmaram 4 h antes',v:sum(rows,kA.c4),c:'var(--b2)'},{n:'Consultas realizadas',v:sum(rows,kA.re),c:'var(--good)'}],400);
  /* 3 no-show por dimensão */
  const dims={e:['Especialidade',D.E,2],u:['Unidade',D.U,1],c:['Canal',D.C,3]};
  const [dn,dl,di]=dims[dimState.d];
  const it=dl.map((nm,k)=>{const rs=rows.filter(r=>r[di]===k);const nn=sum(rs,kA.n);return nn?{n:nm.replace('Mater Dei ',''),v:sum(rs,kA.ns)/nn,tip:'No-show '+fp(sum(rs,kA.ns)/nn)+'<br>'+f0(sum(rs,kA.ns))+' de '+f0(nn)+' agendamentos'}:null}).filter(Boolean).sort((a,b)=>b.v-a.v);
  const avg=n?sum(rows,kA.ns)/n:null;
  it.forEach((x,i)=>{x.c=x.v>avg*1.03?'var(--b3)':'var(--b1)'});
  hbars('#biC3',it,v=>fp(v),{avg,aria:'No-show por '+dn});
  $('#biC3t').textContent='por '+dn.toLowerCase();
  /* 4 receita perdida por unidade */
  const ru=D.U.map((nm,k)=>({n:nm.replace('Mater Dei ',''),v:sum(rows.filter(r=>r[1]===k),kA.pd),tip:'Perda: '+money(sum(rows.filter(r=>r[1]===k),kA.pd))})).filter(x=>x.v>0).sort((a,b)=>b.v-a.v);
  hbars('#biC4',ru,v=>money(v),{c:'var(--b3)',dim:1,hi:0,rowH:48,aria:'Receita perdida por unidade'});
  /* 5 Smart Queue funil */
  const L=selL();const ev=i=>L.filter(r=>r[2]===i).reduce((a,r)=>a+r[6],0);
  if(!L.length){$('#biC5').innerHTML='<p class="muted">Não há registros do Smart Queue para '+(F.m==='all'?'':mlabel(D.M[+F.m]))+'. Os logs do n8n cobrem janeiro a abril.</p>'}
  else funnel('#biC5',[{n:'Vagas liberadas',v:ev(0),c:'var(--b1)'},{n:'Pacientes aptos',v:ev(3),c:'var(--b4)'},{n:'Convites enviados',v:ev(4),c:'var(--b7)'},{n:'Convites aceitos',v:ev(5),c:'var(--b2)'},{n:'Encaixes confirmados',v:ev(6),c:'var(--good)'}]);
  /* 6 saúde da automação */
  const ms=monthlyL(rs=>rs);const lab=D.LM.map(mlabel);
  const stv=k=>ms.map(rs=>rs.filter(r=>r[3]===k).reduce((a,r)=>a+r[6],0));
  const lat=ms.map(rs=>{const t=rs.reduce((a,r)=>a+r[6],0);return t?Math.round(rs.reduce((a,r)=>a+r[7],0)/t):0});
  const sg=[{n:'Sucesso',c:'var(--b2)',v:stv(0)},{n:'Alerta',c:'var(--b7)',v:stv(1)},{n:'Erro',c:'var(--crit)',v:stv(2)}];sg.extra=lat.map(x=>'Latência média: '+x+' ms');
  stacked('#biC6',lab,sg);
  /* 7 experiência */
  const q=selQ(),nq=sum(q,kQ.n),pr=nq?sum(q,kQ.prom)/nq:0,de=nq?sum(q,kQ.det)/nq:0,ne=1-pr-de;
  const esp=nq?sum(q,kQ.esp)/nq:0,nota=nq?sum(q,kQ.nota)/nq:0,fcr=nq?sum(q,kQ.fcr)/nq:0;
  const seg=[['Detratores',de,'var(--crit)'],['Neutros',ne,'var(--gridc)'],['Promotores',pr,'var(--b2)']];let x0=0,bar='';
  seg.forEach(s=>{const w=s[1]*600;bar+='<rect class="bar" x="'+(20+x0)+'" y="10" width="'+Math.max(0,w-2)+'" height="34" rx="8" fill="'+s[2]+'" fill-opacity=".42" stroke="'+s[2]+'" data-tip="'+esc('<b>'+s[0]+'</b><br>'+fp(s[1]))+'" tabindex="0"/>'+(w>60?'<text class="vl" x="'+(20+x0+w/2)+'" y="32" text-anchor="middle" style="fill:var(--ink)">'+fp(s[1],0)+'</text>':'');x0+=w});
  $('#biC7').innerHTML='<svg class="ch" viewBox="0 0 640 56" role="img" aria-label="Composição do NPS">'+bar+'</svg><div class="lg"><span><i style="background:var(--crit)"></i>Detratores</span><span><i style="background:var(--gridc)"></i>Neutros</span><span><i style="background:var(--b2)"></i>Promotores</span></div>'+
   '<div class="bi-kpis" style="grid-template-columns:repeat(3,minmax(0,1fr));margin-top:14px"><div class="kpi" style="--kc:var(--b3)"><div class="kl">Espera média</div><div class="kv" style="font-size:24px">'+f0(esp)+' min</div><div class="ks">tempo na unidade</div></div><div class="kpi" style="--kc:var(--b6)"><div class="kl">Nota do atendimento</div><div class="kv" style="font-size:24px">'+nota.toLocaleString('pt-BR',{maximumFractionDigits:2})+' / 5</div><div class="ks">média das avaliações</div></div><div class="kpi" style="--kc:var(--b2)"><div class="kl">Resolvido no 1º contato</div><div class="kv" style="font-size:24px">'+fp(fcr,0)+'</div><div class="ks">resolução imediata</div></div></div>';
  attachTips($('#biC7'));
  /* 9 perdida × recuperada por mês */
  const perM=monthly(rs=>sum(rs,kA.pd)),recM=D.M.map((_,mi)=>{const rs=D.a.filter(r=>r[0]===mi&&(F.u==='all'||r[1]===+F.u)&&(F.e==='all'||r[2]===+F.e)&&(F.c==='all'||r[3]===+F.c));return recovery(rs,mi).tot});
  groupBars('#biC9',ML,[{n:'Receita perdida',c:'var(--b3)',v:perM},{n:'Receita recuperada',c:'var(--b5)',v:recM}],(v,ax)=>ax?(v>=1e6?Math.round(v/1e6)+' bi':v>=1e3?Math.round(v/1e3)+' mi':Math.round(v)+' mil'):money(v),perM.map((p,i)=>p?fp(recM[i]/p,0):null));
  /* 10 reversão por especialidade */
  const rv2=D.E.map((nm,k)=>{const rs=rows.filter(r=>r[2]===k);const a=sum(rs,kA.ns)+sum(rs,kA.ca)+sum(rs,kA.rm);return a?{n:nm,v:sum(rs,kA.rm)/a,tip:'Reversão '+fp(sum(rs,kA.rm)/a)+'<br>'+f0(sum(rs,kA.rm))+' remarcados de '+f0(a)+' perdas potenciais'}:null}).filter(Boolean).sort((a,b)=>b.v-a.v);
  const aa=sum(rows,kA.ns)+sum(rows,kA.ca)+sum(rows,kA.rm);hbars('#biC10',rv2,v=>fp(v),{avg:aa?sum(rows,kA.rm)/aa:null,c:'var(--b5)',aria:'Reversão de faltas por especialidade'});
  /* 8 meio recomendado + inaptidão */
  if(!L.length){$('#biC8').innerHTML='<p class="muted">Sem registros no período.</p>'}
  else{
    const mt=D.MEIO.map((nm,k)=>({n:nm,v:L.filter(r=>r[4]===k).reduce((a,r)=>a+r[6],0)})).filter(x=>x.v>0).sort((a,b)=>b.v-a.v);const tm=mt.reduce((a,x)=>a+x.v,0);mt.forEach(x=>{x.tip=fp(x.v/tm)+' das recomendações';x.p=x.v;x.v=x.v/tm});
    const mo=selMot();const mm=D.MOT.map((nm,k)=>({n:nm,v:mo.filter(r=>r[2]===k).reduce((a,r)=>a+r[3],0)})).filter(x=>x.v>0).sort((a,b)=>b.v-a.v);const tmo=mm.reduce((a,x)=>a+x.v,0);mm.forEach(x=>{x.tip=f0(x.v)+' avaliações';x.v=x.v/tmo;x.c=x.n==='Apto'?'var(--b2)':'var(--b3)'});
    $('#biC8').innerHTML='<div id="biC8a"></div><div id="biC8b" style="margin-top:10px"></div>';
    hbars('#biC8a',mt.map(x=>({n:x.n,v:x.v,tip:x.tip})),v=>fp(v,0),{pl:70,rowH:26,c:'var(--b4)',aria:'Meio de transporte recomendado'});
    hbars('#biC8b',mm.map(x=>({n:x.n.length>26?x.n.slice(0,25)+'…':x.n,v:x.v,tip:x.tip,c:x.c})),v=>fp(v,0),{pl:190,rowH:26,aria:'Aptidão e motivos de inaptidão'});
  }
}

/* ------------ página ------------ */
function selHTML(id,label,opts){return '<label>'+label+'<select id="'+id+'">'+opts.map(o=>'<option value="'+o[0]+'">'+esc(o[1])+'</option>').join('')+'</select></label>'}
let last=Date.now(),next=30;
function stamp(){const e=$('#biStamp');if(!e)return;const s=Math.round((Date.now()-last)/1000);e.textContent='Atualizado há '+s+' s · próxima atualização em '+Math.max(0,next-s)+' s'}
function renderAll(){renderKPIs();renderCharts();last=Date.now();stamp()}
function build(){
  if($('#bi'))return;
  const host=$('#operation');if(!host)return;
  const sec=document.createElement('section');sec.className='page';sec.id='bi';sec.dataset.title='Indicadores operacionais';
  sec.innerHTML='<div class="section-head section-head-compact bi-top"><div><small>painel executivo · modelo Power BI</small><h2>Indicadores operacionais</h2><p class="muted">Somente o que a operação precisa para decidir: comparecimento, perdas, jornada do paciente, Smart Queue, automação e experiência. Dados do modelo Sprint_03BI.pbix ('+f0(D.tot.a)+' agendamentos, '+f0(D.tot.q)+' avaliações e '+f0(D.tot.l)+' execuções do n8n).</p></div><div class="bi-live"><span class="bi-dot"></span><span id="biStamp"></span><button class="btn ghost compact" id="biRef">↻ Atualizar agora</button></div></div>'+
   '<div class="bi-filters">'+selHTML('biM','Período (mês da consulta)',[['all','Todos os meses']].concat(D.M.map((m,i)=>[i,mlabel(m)])))+selHTML('biU','Unidade',[['all','Todas']].concat(D.U.map((u,i)=>[i,u])))+selHTML('biE','Especialidade',[['all','Todas']].concat(D.E.map((u,i)=>[i,u])))+selHTML('biC','Canal de agendamento',[['all','Todos']].concat(D.C.map((u,i)=>[i,u])))+'<button class="btn ghost compact" id="biClr" style="align-self:flex-end">Limpar filtros</button></div>'+
   '<div class="bi-sec"><h3>Operação</h3><span>comparecimento, perdas e experiência</span></div><div class="bi-kpis" id="biKpis"></div><div class="bi-sec"><h3>Sucesso e recuperação</h3><span>reversão de faltas, encaixes e receita recuperada</span></div><div class="bi-kpis" id="biKpis2"></div>'+
   '<div class="bi-grid">'+
    '<div class="cc w8"><h3>Comparecimento, no-show e cancelamento</h3><p class="sub">Taxa mensal sobre os agendamentos · mesmos eixo e unidade</p><div id="biC1"></div></div>'+
    '<div class="cc w4"><h3>Jornada do paciente</h3><p class="sub">Do agendamento à consulta realizada</p><div id="biC2"></div></div>'+
    '<div class="cc"><div class="hd"><div><h3>No-show <span id="biC3t"></span></h3><p class="sub">Laranja = acima da média geral · linha tracejada = média</p></div><div class="seg" id="biSeg"><button data-d="e" class="on">Especialidade</button><button data-d="u">Unidade</button><button data-d="c">Canal</button></div></div><div id="biC3"></div></div>'+
    '<div class="cc"><h3>Receita perdida por unidade</h3><p class="sub">Tickets de no-show e cancelamentos · maior perda em destaque</p><div id="biC4"></div></div>'+
    '<div class="cc"><h3>Smart Queue: da vaga ao encaixe</h3><p class="sub">Funil das execuções do n8n (jan–abr)</p><div id="biC5"></div></div>'+
    '<div class="cc"><h3>Saúde da automação</h3><p class="sub">Execuções por status · passe o mouse para ver a latência média</p><div id="biC6"></div></div>'+
    '<div class="cc"><h3>Experiência do paciente</h3><p class="sub">NPS, espera e avaliação (jan–mai)</p><div id="biC7"></div></div>'+
    '<div class="cc"><h3>Receita perdida × receita recuperada</h3><p class="sub">Por mês · recuperação = remarcações + encaixes do Smart Queue</p><div id="biC9"></div></div>'+
    '<div class="cc"><h3>Reversão por especialidade</h3><p class="sub">Remarcados ÷ perdas potenciais · linha = média</p><div id="biC10"></div></div>'+
    '<div class="cc"><h3>Smart Queue: transporte e aptidão</h3><p class="sub">Meio recomendado e motivos de inaptidão ao encaixe</p><div id="biC8"></div></div>'+
   '</div><div class="pal"><span><i style="background:var(--b1)"></i>volume</span><span><i style="background:var(--b2)"></i>sucesso</span><span><i style="background:var(--b3)"></i>perda e risco</span><span><i style="background:var(--b4)"></i>processo</span><span><i style="background:var(--b5)"></i>recuperação</span><span><i style="background:var(--b6)"></i>experiência</span><span><i style="background:var(--b7)"></i>atenção</span></div><p class="bi-foot">Fontes e regras: Reversão de faltas = remarcados ÷ (no-show + cancelados + remarcados). Receita recuperada = ticket dos remarcados + encaixes confirmados × ticket médio (estimativa). Reversão de vagas = encaixes ÷ vagas liberadas. Medidas replicadas do modelo Power BI (Taxa de No-Show, Comparecimento após confirmação, Receita Perdida, NPS, Taxa de Aceite e Taxa de Sucesso IA). As metas são parâmetros operacionais configuráveis. Atenção: no arquivo original, as unidades dos logs do Smart Queue (SP) diferem das unidades dos agendamentos; por isso, os painéis do Smart Queue respondem apenas ao filtro de período. Maio tem consultas parciais.</p><div class="bi-tip" id="biTip"></div>';
  host.parentNode.appendChild(sec);
  const nav=$('.nav button[data-page="operation"]');
  if(nav&&!$('.nav button[data-page="bi"]')){const b=document.createElement('button');b.dataset.page='bi';b.innerHTML='▤ Indicadores BI <small>08</small>';b.onclick=()=>showPage('bi');nav.insertAdjacentElement('afterend',b)}
  const bind=(id,k)=>$('#'+id).onchange=e=>{F[k]=e.target.value;renderAll()};
  bind('biM','m');bind('biU','u');bind('biE','e');bind('biC','c');
  $('#biClr').onclick=()=>{Object.keys(F).forEach(k=>F[k]='all');['biM','biU','biE','biC'].forEach(i=>$('#'+i).value='all');renderAll()};
  $('#biRef').onclick=()=>{next=30;renderAll();sec.querySelectorAll('.cc,.kpi').forEach(c=>{c.animate([{opacity:.4},{opacity:1}],{duration:450})})};
  $('#biSeg').onclick=e=>{const b=e.target.closest('button');if(!b)return;dimState.d=b.dataset.d;$$('#biSeg button').forEach(x=>x.classList.toggle('on',x===b));renderCharts()};
  renderAll();
  setInterval(()=>{stamp();if(Date.now()-last>=next*1000&&sec.classList.contains('active')){renderAll()}},1000);
}
function init(){build();setTimeout(build,1600)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,900));else setTimeout(init,900);
window.DAISY_BI={F,renderAll,D};
})();

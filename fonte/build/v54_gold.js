/* ===== DaisyCare v40.53 · Modelo ouro: fluxos de melhoria 12 a 16 (n8n) incorporados ao fluxo existente ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const BUNDLE=__N8N_BUNDLE__;

const css=`
#workflows>#wf3#wf3#wf3{display:block!important}
#wf3{margin-top:30px;--g3:#a16207;--g3f:rgba(234,179,8,.14)}
.dark #wf3{--g3:#facc15;--g3f:rgba(250,204,21,.12)}
#wf3 .g3-tag{display:inline-block;font:800 11px var(--font);letter-spacing:.08em;text-transform:uppercase;color:var(--g3);border:1px solid var(--g3);border-radius:999px;padding:3px 10px;margin-bottom:8px}
#wf3 svg{width:100%;height:auto;display:block}
#wf3 .n rect{fill:var(--card);stroke-width:1.6}
#wf3 .n.new rect{fill:var(--g3f);stroke:var(--g3);stroke-width:2}
#wf3 .n.old rect{opacity:.92}
#wf3 .n text{fill:var(--ink);font:700 13px var(--font)}
#wf3 .n text.s{font:500 11px var(--font);fill:var(--muted)}
#wf3 .n .bd{fill:var(--g3);font:800 9.5px var(--font);letter-spacing:.08em}
#wf3 .lab{fill:var(--muted);font:600 10.5px var(--font)}
#wf3 .lab.gl{fill:var(--g3)}
#wf3 .leg{display:flex;flex-wrap:wrap;gap:14px;font-size:12.5px;margin:10px 0}
#wf3 .leg i{display:inline-block;width:12px;height:12px;border-radius:4px;margin-right:6px;vertical-align:-1px}
#wf3 .leg i.new{background:var(--g3f);border:2px solid var(--g3)}
#wf3 .gl-list{columns:2 380px;font-size:13px;line-height:1.6;padding-left:20px}
#wf3 .g3-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px;margin-top:16px}
#wf3 .g3-card{border:1px solid var(--line);border-top:3px solid var(--g3);border-radius:18px;padding:16px;background:var(--card)}
#wf3 .g3-card h4{margin:0 0 4px;font:800 15px var(--font)}
#wf3 .g3-card small{display:block;color:var(--muted);font-size:12.5px;margin-bottom:8px}
#wf3 .g3-card ul{margin:6px 0 10px;padding-left:18px;font-size:13px;line-height:1.55}
#wf3 .g3-card .kv{font-size:12.5px;color:var(--muted);margin:2px 0}
#wf3 .g3-card .kv b{color:var(--ink)}
#wf3 table{width:100%;border-collapse:collapse;font-size:13px}
#wf3 th{font:800 11px var(--font);letter-spacing:.08em;text-transform:uppercase;color:var(--muted);text-align:left;padding:9px 10px;border-bottom:1px solid var(--line)}
#wf3 td{padding:10px;border-bottom:1px solid var(--line);vertical-align:top}
#wf3 .tw{overflow:auto}
#wf3 .g3-num{display:inline-block;min-width:30px;text-align:center;border:1px solid var(--g3);color:var(--g3);border-radius:8px;font:800 12px var(--font);padding:2px 6px}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---------- diagrama ---------- */
const C={p:'#7c3aed',h:'#16a34a',d:'#2563eb',x:'#f59e0b'};
const N=[ /* id, x, y, w, h, título, subtítulo, tipo (new|old|o), cor */
 ['gps',20,40,190,58,'App do médico','check-in + GPS','o','x'],['rec',20,150,190,58,'Recepção','início/fim da consulta','o','x'],['w02',20,290,190,58,'02 · Confirmação','cancelamento libera vaga','old','p'],
 ['w12',295,36,190,62,'12 · Trajeto médico','ETA, trânsito, incidente','new'],['w13',295,146,190,62,'13 · Atendimentos','tempo, fila e atraso','new'],['w03',295,286,190,62,'03 · Smart Queue','fila e encaixe (ML)','old','h'],
 ['w14',570,88,190,66,'14 · Cobertura','ranking, convite, reatribui','new'],['w15',570,286,190,66,'15 · Lista de espera','vaga liberada → convite','new'],['w06',570,420,190,60,'06 · Reconciliação','consolida o dia','old','h'],
 ['w11',845,20,190,60,'11 · Agenda médica','horários por especialidade','old','h'],['w10',845,110,190,60,'10 · Agente IA','avisa o paciente','old','p'],['pg',845,215,190,66,'PostgreSQL','audit.evento_integracao','old','d'],['w16',845,320,190,66,'16 · Indicadores','reversão e receita','new'],['bi',845,425,190,62,'Power BI','indicadores e gestão','old','d']
];
const nd={};N.forEach(n=>nd[n[0]]={x:n[1],y:n[2],w:n[3],h:n[4]});
const A=(id,s,f)=>{const n=nd[id];return s==='r'?[n.x+n.w,n.y+n.h*f]:s==='l'?[n.x,n.y+n.h*f]:s==='t'?[n.x+n.w*f,n.y]:[n.x+n.w*f,n.y+n.h]};
/* from,lado,f, to,lado,f, rótulo, início(s), novo? */
const E=[
 ['gps','r',.5,'w12','l',.5,'posição',0,1],['rec','r',.5,'w13','l',.5,'início/fim',1.2,1],
 ['w12','r',.5,'w14','l',.3,'atraso',2.4,1],['w13','r',.5,'w14','l',.75,'> 30 min',3.6,1],
 ['w14','r',.3,'w11','l',.5,'reatribui',4.8,1],['w14','r',.55,'w10','l',.5,'avisa',6,1],
 ['w14','b',.35,'w03','t',.7,'remarcar',7.2,1],
 ['w02','r',.5,'w03','l',.5,'vaga livre',0,0],['w03','r',.5,'w15','l',.5,'vaga',2.4,0],
 ['w15','r',.3,'w10','l',.8,'convida',4.8,1],['w15','r',.7,'pg','l',.7,'',6,1],['w14','r',.85,'pg','l',.3,'',8.4,1],
 ['pg','b',.5,'w16','t',.5,'eventos',9.6,1],['w06','r',.5,'w16','l',.6,'receita',10.8,0],['w16','b',.5,'bi','t',.5,'KPIs',12,1]
];
const path=e=>{const a=A(e[0],e[1],e[2]),b=A(e[3],e[4],e[5]),dx=Math.abs(b[0]-a[0])*.5,dy=Math.abs(b[1]-a[1])*.5;
  const c1=(e[1]==='r'||e[1]==='l')?[a[0]+(e[1]==='r'?dx:-dx),a[1]]:[a[0],a[1]+(e[1]==='b'?dy:-dy)];
  const c2=(e[4]==='l'||e[4]==='r')?[b[0]+(e[4]==='l'?-dx:dx),b[1]]:[b[0],b[1]+(e[4]==='t'?-dy:dy)];
  return 'M'+a.map(Math.round).join(',')+' C'+c1.map(Math.round).join(',')+' '+c2.map(Math.round).join(',')+' '+b.map(Math.round).join(',')};
function diagram(){
  let s='<svg viewBox="0 0 1065 525" role="img" aria-label="Fluxos de melhoria do modelo ouro, 12 a 16, ligados aos workflows existentes"><defs>'+
   '<marker id="g3a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#94a3b8"/></marker>'+
   '<marker id="g3b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#d4a017"/></marker></defs>';
  E.forEach((e,i)=>{s+='<path id="g3p'+i+'" d="'+path(e)+'" fill="none" stroke="'+(e[8]?'#d4a017':'#94a3b8')+'" stroke-width="'+(e[8]?2:1.6)+'" opacity="'+(e[8]?.9:.8)+'" marker-end="url(#'+(e[8]?'g3b':'g3a')+')"/>'});
  N.forEach(n=>{
    const nw=n[7]==='new',col=nw?'':(C[n[8]]||'#94a3b8');
    s+='<g class="n '+(nw?'new':'old')+'"><rect x="'+n[1]+'" y="'+n[2]+'" width="'+n[3]+'" height="'+n[4]+'" rx="14"'+(nw?'':' stroke="'+col+'"')+'/>'+
       '<text x="'+(n[1]+12)+'" y="'+(n[2]+n[4]/2-3)+'">'+esc(n[5])+'</text><text class="s" x="'+(n[1]+12)+'" y="'+(n[2]+n[4]/2+14)+'">'+esc(n[6])+'</text>'+
       (nw?'<text class="bd" x="'+(n[1]+n[3]-12)+'" y="'+(n[2]+14)+'" text-anchor="end">NOVO</text>':'')+'</g>';
  });
  E.forEach((e,i)=>{const col=e[8]?'#d4a017':'#94a3b8';
    s+='<circle r="5" fill="'+col+'" visibility="hidden"><set attributeName="visibility" to="visible" begin="'+e[7]+'s"/><animateMotion dur="5.5s" begin="'+e[7]+'s" repeatCount="indefinite"><mpath href="#g3p'+i+'"/></animateMotion></circle>'});
  /* rótulos nas curvas */
  E.forEach((e,i)=>{if(!e[6])return;const a=A(e[0],e[1],e[2]),b=A(e[3],e[4],e[5]);const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
    s+='<text class="lab'+(e[8]?' gl':'')+'" x="'+Math.round(mx)+'" y="'+Math.round(my-7)+'" text-anchor="middle" paint-order="stroke" stroke="var(--card)" stroke-width="4" stroke-linejoin="round">'+esc(e[6])+'</text>'});
  s+='<text class="lab" x="532" y="512" text-anchor="middle">12 a 16 também gravam o evento no PostgreSQL (mesmo correlation_id)</text></svg>';
  return s;
}

/* ---------- conteúdo ---------- */
const WFS=[
 {n:'12',t:'Trajeto do médico',g:'a cada 60 s + check-in GPS',b:['calcula ETA × 1ª consulta com 15 min de margem','atraso previsto → avisa a central e a recepção','10 min sem sinal → possível incidente e aciona a cobertura (14)'],ev:'trajeto_monitorado',k:'médicos em risco · tempo de aviso',f:0},
 {n:'13',t:'Controle dos atendimentos',g:'início e fim de cada consulta',b:['compara a duração com o SLA da especialidade','atraso acumulado > 20 min → reorganiza a agenda e a Daisy avisa quem espera','> 30 min → pede cobertura (14)'],ev:'atendimento_controlado',k:'atraso médio · esperas · no-show',f:1},
 {n:'14',t:'Cobertura de agenda',g:'incidente, atraso > 30 min ou emergência pessoal',b:['ranking por especialidade, distância, carga e unidade','convite por app e WhatsApp, janela de 5 min','aceitou → reatribui agenda (11) e a Daisy avisa os pacientes (10); não → telemedicina ou remarcação por prioridade (03)'],ev:'cobertura_resolvida',k:'tempo para cobrir · agendas cobertas',f:2},
 {n:'15',t:'Lista de espera e encaixe',g:'vaga liberada (cancelamento ou cobertura)',b:['busca a lista por especialidade, unidade e prioridade, sem dado clínico','Daisy convida o primeiro; 10 min para aceitar','aceitou → encaixe confirmado; senão passa ao próximo'],ev:'encaixe_confirmado',k:'reversão de vagas',f:3},
 {n:'16',t:'Indicadores de sucesso e receita',g:'a cada hora',b:['reversão de faltas = remarcados ÷ (no-show + cancelados + remarcados)','reversão de vagas = encaixes ÷ vagas liberadas','receita recuperada (estimativa) = (remarcados + encaixes) × ticket médio'],ev:'indicadores_calculados',k:'abaixo da meta → alerta à gestão e dataset do Power BI',f:4}
];
const MEL=[
 ['Acompanhamento do médico','Status manual e tabela de risco','Trajeto monitorado a cada 60 s, com margem de segurança e protocolo de incidente','12'],
 ['Atrasos na agenda','Paciente descobre ao chegar','Atraso acumulado controlado por especialidade; Daisy avisa quem espera','13'],
 ['Cobertura de agenda','Substituição por contato pessoal','Ranking objetivo, convite com prazo, reatribuição e aviso automático','14'],
 ['Vaga liberada','Smart Queue sem lista própria','Lista de espera com prioridade, convite e encaixe confirmado','15'],
 ['Indicadores de gestão','Volume de eventos','Reversão de faltas, reversão de vagas e receita recuperada (estimativa) com alerta de meta','16'],
 ['Rastreabilidade (LGPD)','Eventos soltos por workflow','Mesmo correlation_id do app ao Power BI; ids pseudonimizados, sem CPF nem dado clínico','12–16']
];
function dl(i){const b=BUNDLE[i];const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(b.json,null,2)],{type:'application/json'}));a.download=b.file;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
function dlAll(){BUNDLE.forEach((_,i)=>setTimeout(()=>dl(i),i*350))}

function build(){
  const w2=$('#wf2');if(!w2||$('#wf3'))return false;
  const w=document.createElement('div');w.id='wf3';
  const nm=id=>{const n=N.find(x=>x[0]===id);return n[5].replace(/^\d+ · /,'')};
  w.innerHTML='<div class="section-head section-head-compact"><div><span class="g3-tag">modelo ouro · melhoria</span><h2>Fluxos de melhoria incorporados ao fluxo atual</h2><p class="muted">Cinco workflows n8n novos (12 a 16) que se encaixam nos 10 existentes: acompanhamento dos médicos, atendimentos, cobertura da agenda, lista de espera e indicadores de sucesso.</p></div></div>'+
   '<div class="card"><div class="mg-bar"><b>Como os novos se ligam aos existentes</b><button class="btn ghost compact" id="g3Pause">⏸ Pausar</button><button class="btn compact" id="g3All">⬇ Baixar os 5 JSON do n8n</button></div>'+
   '<div class="leg"><span><i class="new"></i>novo (modelo ouro)</span><span><i style="background:transparent;border:2px solid '+C.p+'"></i>existente · paciente</span><span><i style="background:transparent;border:2px solid '+C.h+'"></i>existente · operação</span><span><i style="background:transparent;border:2px solid '+C.d+'"></i>dados e BI</span><span><i style="background:transparent;border:2px solid '+C.x+'"></i>origem ou destino</span></div>'+
   diagram()+
   '<h3 style="margin:14px 0 6px">Como se encaixam</h3><ol class="gl-list">'+E.map(e=>'<li><b>'+esc(nm(e[0]))+'</b> → <b>'+esc(nm(e[3]))+'</b>: '+esc(e[6]||'grava o evento')+'</li>').join('')+'</ol></div>'+
   '<div class="g3-grid">'+WFS.map((x,i)=>'<div class="g3-card"><h4><span class="g3-num">'+x.n+'</span> '+esc(x.t)+'</h4><small>gatilho: '+esc(x.g)+'</small><ul>'+x.b.map(l=>'<li>'+esc(l)+'</li>').join('')+'</ul><div class="kv">evento gravado: <b>'+esc(x.ev)+'</b></div><div class="kv">acompanha: <b>'+esc(x.k)+'</b></div><div style="margin-top:10px"><button class="btn ghost compact" data-dl="'+i+'">⬇ JSON do n8n</button></div></div>').join('')+'</div>'+
   '<div class="card" style="margin-top:16px"><h3 style="margin:0 0 8px">O que melhora no modelo ouro</h3><div class="tw"><table><thead><tr><th>Função</th><th>Antes</th><th>Depois</th><th>Workflow</th></tr></thead><tbody>'+MEL.map(r=>'<tr><td><b>'+esc(r[0])+'</b></td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td><td><span class="g3-num">'+r[3]+'</span></td></tr>').join('')+'</tbody></table></div>'+
   '<p class="muted" style="font-size:12.5px;margin:10px 0 0">Simulação do MVP: tabelas, metas (40% e 50%), pesos do ranking e ticket médio são sugestões a validar. Os JSON usam a estrutura padrão do n8n; vincule a credencial do PostgreSQL e defina N8N_BASE_URL antes de ativar. Veja o LEIA-ME na pasta n8n.</p></div>';
  w2.insertAdjacentElement('afterend',w);
  const svg=w.querySelector('svg');let paused=false;const pb=$('#g3Pause');
  const setP=p=>{paused=p;try{p?svg.pauseAnimations():svg.unpauseAnimations()}catch(e){}pb.textContent=p?'▶ Retomar':'⏸ Pausar'};
  pb.onclick=()=>setP(!paused);
  if(document.body.classList.contains('rm'))setP(true);
  new MutationObserver(()=>{if(document.body.classList.contains('rm')&&!paused)setP(true)}).observe(document.body,{attributes:true,attributeFilter:['class']});
  $('#g3All').onclick=dlAll;
  w.querySelectorAll('[data-dl]').forEach(b=>b.onclick=()=>dl(+b.dataset.dl));
  return true;
}
let tries=0;const iv=setInterval(()=>{if(build()||++tries>40)clearInterval(iv)},700);
})();

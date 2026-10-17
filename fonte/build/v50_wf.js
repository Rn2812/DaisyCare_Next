/* ===== DaisyCare v40.50 · Workflow 2: acompanhamento dos médicos, trânsito, incidentes e cobertura de agenda ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const css=`
#workflows>#wf2#wf2#wf2{display:block!important}
#wf2{margin-top:22px}
#wf2 .wf2-svgwrap{overflow:auto;border:1px solid var(--line);border-radius:22px;background:var(--card);padding:10px}
#wf2 svg{display:block;width:100%;min-width:980px;height:auto}
#wf2 .lane{fill:rgba(118,80,232,.05);stroke:var(--line);stroke-width:1.2}
#wf2 .lane-t{font:800 13px var(--font);fill:var(--primary);letter-spacing:.04em}
#wf2 .nd rect,#wf2 .nd polygon{stroke-width:1.8}
#wf2 .nd .t{font:800 12.5px var(--font);fill:#2f2851}
#wf2 .nd .s{font:600 10.5px var(--font);fill:#5b5280}
#wf2 .ed{fill:none;stroke-width:2.2;stroke-linecap:round}
#wf2 .el{font:800 10.5px var(--font)}
.dark #wf2 .nd .t{fill:#fff4d7}.dark #wf2 .nd .s{fill:#d8caa7}
#wf2 .wf2-legend{display:flex;gap:14px;flex-wrap:wrap;margin:10px 4px 0;font:700 12px var(--font);color:var(--muted)}
#wf2 .wf2-legend i{display:inline-block;width:12px;height:12px;border-radius:4px;margin-right:6px;vertical-align:-1px}
#wf2 .sim{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(300px,1fr);gap:16px;margin-top:16px}
@media(max-width:1100px){#wf2 .sim{grid-template-columns:1fr}}
#wf2 table{width:100%;border-collapse:collapse;font-size:12px}
#wf2 th{font:800 10px var(--font);letter-spacing:.08em;text-transform:uppercase;color:var(--muted);text-align:left;padding:8px 8px;border-bottom:1px solid var(--line)}
#wf2 td{padding:9px 8px;border-bottom:1px solid var(--line);vertical-align:middle}
#wf2 .chip{display:inline-block;border-radius:999px;padding:4px 10px;font:800 10.5px var(--font);white-space:nowrap}
#wf2 .c-ok{background:#dcfce7;color:#14532d}#wf2 .c-way{background:#e0f2fe;color:#0c4a6e}#wf2 .c-late{background:#fef3c7;color:#78350f}#wf2 .c-inc{background:#fee2e2;color:#7f1d1d}#wf2 .c-cov{background:#ede9fe;color:#4c1d95}#wf2 .c-sb{background:#f1f5f9;color:#334155}
#wf2 .ctl{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:10px 0}
#wf2 .ctl select{padding:9px 12px;border-radius:12px;border:1px solid var(--line);background:var(--card2);color:var(--ink);font:700 12px var(--font)}
#wf2 .wlog{height:230px;overflow:auto;background:#150f2b;color:#e9e3ff;border-radius:16px;padding:12px;font:11px/1.55 var(--mono)}
#wf2 .wlog .w{color:#fbbf24}#wf2 .wlog .e{color:#fca5a5}#wf2 .wlog .g{color:#86efac}#wf2 .wlog .v{color:#c4b5fd}
#wf2 pre.pj{margin:10px 0 0;max-height:180px;overflow:auto;background:#150f2b;color:#c4b5fd;border-radius:14px;padding:12px;font:10.5px/1.5 var(--mono)}
#wf2 .rank{margin-top:10px;font-size:12px}
#wf2 .rank b{color:var(--primary)}
#wf2 .msg{background:var(--soft);border-radius:16px;padding:12px 14px;margin-top:10px;font-size:12.5px;line-height:1.5}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---------------- diagrama ---------------- */
const COL={ok:['#dcfce7','#16a34a'],wait:['#fef3c7','#d97706'],bad:['#fee2e2','#dc2626'],info:['#e0f2fe','#0284c7'],pur:['#ede9fe','#7c3aed'],dec:['#fff7ed','#ea580c'],db:['#f1f5f9','#475569']};
const N={
 a1:{x:30,y:62,w:170,h:70,t:'Médico sai de casa',s:'check-in no app + GPS ativo',c:'info'},
 a2:{x:250,y:62,w:190,h:70,t:'Monitor de trajeto',s:'rota, trânsito e ETA a cada 60 s',c:'pur'},
 a3:{x:490,y:56,w:170,h:82,t:'ETA × 1ª consulta',s:'margem de segurança',c:'dec',d:1},
 a4:{x:720,y:34,w:180,h:56,t:'No horário',s:'check-in na unidade',c:'ok'},
 a5:{x:720,y:106,w:180,h:56,t:'Atraso previsto',s:'>10 min recepção · >15 min paciente',c:'wait'},
 a6:{x:950,y:62,w:200,h:70,t:'Incidente no percurso',s:'acidente, pane ou 10 min sem sinal',c:'bad'},
 b1:{x:30,y:262,w:170,h:70,t:'Início da consulta',s:'check-in do paciente validado',c:'info'},
 b2:{x:250,y:262,w:190,h:70,t:'Cronômetro por paciente',s:'SLA da especialidade',c:'pur'},
 b3:{x:490,y:256,w:170,h:82,t:'Atraso acumulado',s:'> 20 min na agenda?',c:'dec',d:1},
 b4:{x:720,y:234,w:180,h:56,t:'Fim → próximo paciente',s:'fila digital atualizada',c:'ok'},
 b5:{x:720,y:306,w:180,h:56,t:'Reorganizar agenda',s:'Daisy avisa quem espera',c:'wait'},
 b6:{x:950,y:262,w:200,h:70,t:'Controle de atendimentos',s:'realizados, esperas e no-show',c:'db'},
 c1:{x:30,y:462,w:190,h:78,t:'Gatilho de cobertura',s:'atraso >30 min · emergência pessoal · incidente',c:'bad'},
 c2:{x:262,y:456,w:210,h:90,t:'Motor de cobertura',s:'especialidade, escala, distância, carga e unidade',c:'pur'},
 c3:{x:514,y:462,w:170,h:78,t:'Convite ao profissional',s:'app e WhatsApp · 5 min',c:'info'},
 c4:{x:722,y:458,w:150,h:86,t:'Aceitou?',s:'janela de 5 min',c:'dec',d:1},
 c5:{x:914,y:420,w:240,h:62,t:'Reatribui agenda',s:'avisa pacientes (Daisy) + Smart Queue',c:'ok'},
 c6:{x:914,y:496,w:240,h:62,t:'Sem cobertura',s:'telemedicina ou remarcação por prioridade',c:'wait'}
};
const E=[
 ['a1','a2','r-l','#7c3aed'],['a2','a3','r-l','#7c3aed'],['a3','a4','r-l','#16a34a','sim'],['a3','a5','r-l','#d97706','atraso'],['a5','a6','r-l','#dc2626','grave'],
 ['b1','b2','r-l','#7c3aed'],['b2','b3','r-l','#7c3aed'],['b3','b4','r-l','#16a34a','não'],['b3','b5','r-l','#d97706','sim'],['b4','b6','r-l','#475569'],
 ['c1','c2','r-l','#7c3aed'],['c2','c3','r-l','#7c3aed'],['c3','c4','r-l','#7c3aed'],['c4','c5','r-l','#16a34a','sim'],['c4','c6','r-l','#d97706','não'],
 ['a4','b1','top','#16a34a','check-in'],['a5','c1','x1','#dc2626'],['a6','c1','x2','#dc2626'],['b5','c1','x3','#d97706']
];
function side(n,s){const o=N[n];return s==='r'?[o.x+o.w,o.y+o.h/2]:s==='l'?[o.x,o.y+o.h/2]:s==='t'?[o.x+o.w/2,o.y]:[o.x+o.w/2,o.y+o.h]}
function path(a,b,m){
  if(m==='r-l'){const p=side(a,'r'),q=side(b,'l');if(Math.abs(p[1]-q[1])<2)return 'M'+p+' L'+q;const mx=(p[0]+q[0])/2;return 'M'+p+' C'+mx+' '+p[1]+' '+mx+' '+q[1]+' '+q+''}
  if(m==='top'){return 'M810 34 L810 25 L18 25 L18 297 L30 297'}
  if(m==='b-t'){const p=side(a,'b'),q=side(b,'t');return 'M'+p+' L'+p[0]+' '+(p[1]+20)+' L'+q[0]+' '+(p[1]+20)+' L'+q}
  /* ligações para o gatilho de cobertura: passam pela margem esquerda */
  const k={x1:[10,'b'],x2:[1210,'b'],x3:[1190,'b']}[m];const p=side(a,k[1]),q=side(b,'t');
  if(m==='x2'){return 'M'+p+' L'+p[0]+' 200 L1212 200 L1212 396 L'+q[0]+' 396 L'+q}
  if(m==='x1'){return 'M'+p+' L'+p[0]+' 205 L12 205 L12 396 L'+q[0]+' 396 L'+q}
  return 'M'+p+' L'+p[0]+' 396 L'+q[0]+' 396 L'+q;
}
function diagram(){
  const lanes=[[10,'1 · Deslocamento até o hospital','Acompanhamento do médico desde que sai de casa',20,190],[10,'2 · Controle dos atendimentos','Tempo por paciente, fila e atrasos acumulados',212,170],[10,'3 · Cobertura da agenda','Substituição de profissionais em atrasos, incidentes e emergências pessoais',404,170]];
  let svg='<svg viewBox="0 0 1240 590" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fluxo de acompanhamento dos médicos e cobertura da agenda"><defs>'+Object.entries({o:'#16a34a',w:'#d97706',r:'#dc2626',p:'#7c3aed',g:'#475569'}).map(([k,c])=>'<marker id="wa'+k+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="'+c+'"/></marker>').join('')+'</defs>';
  lanes.forEach(l=>{svg+='<rect class="lane" x="'+l[0]+'" y="'+l[3]+'" width="1220" height="'+l[4]+'" rx="22"/><text class="lane-t" x="28" y="'+(l[3]+22)+'">'+l[1]+'</text><text class="s" x="'+(28+l[1].length*7.6)+'" y="'+(l[3]+22)+'" style="font:600 11px var(--font);fill:var(--muted)">'+esc(l[2])+'</text>'});
  const mk={'#16a34a':'o','#d97706':'w','#dc2626':'r','#7c3aed':'p','#475569':'g'};
  let dots='';
  E.forEach((e,i)=>{
    const d=path(e[0],e[1],e[2]);
    svg+='<path class="ed" d="'+d+'" stroke="'+e[3]+'" marker-end="url(#wa'+mk[e[3]]+')"'+(/^x/.test(e[2])?' stroke-dasharray="7 6"':'')+'/>';
    if(e[4]&&e[2]==='top'){svg+='<text class="el" x="420" y="21" fill="'+e[3]+'">check-in feito → inicia a consulta (faixa 2)</text>'}else if(e[4]){const p=side(e[0],'r'),q=side(e[1],'l');svg+='<text class="el" x="'+((p[0]+q[0])/2-12)+'" y="'+((p[1]+q[1])/2-6)+'" fill="'+e[3]+'">'+e[4]+'</text>'}
    dots+='<circle r="4.5" fill="'+e[3]+'"><animateMotion dur="'+(3.4+(i%5)*.7)+'s" begin="'+(i*.35)+'s" repeatCount="indefinite" path="'+d+'"/></circle>';
  });
  Object.entries(N).forEach(([k,o])=>{
    const c=COL[o.c];let shape;
    if(o.d){const cx=o.x+o.w/2,cy=o.y+o.h/2;shape='<polygon points="'+cx+','+o.y+' '+(o.x+o.w)+','+cy+' '+cx+','+(o.y+o.h)+' '+o.x+','+cy+'" fill="'+c[0]+'" stroke="'+c[1]+'"/>'}
    else shape='<rect x="'+o.x+'" y="'+o.y+'" width="'+o.w+'" height="'+o.h+'" rx="16" fill="'+c[0]+'" stroke="'+c[1]+'"/>';
    const cx=o.x+o.w/2,cy=o.y+o.h/2;
    const fs=o.d?[o.t,o.s]:[o.t,o.s];
    const wrap=(t,n)=>{const w=t.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n){L.push(c);c=x}else c=(c+' '+x).trim()});L.push(c);return L};
    const mx=o.d?16:Math.floor(o.w/6.4);
    const ls=wrap(o.s,mx).slice(0,3);
    svg+='<g class="nd">'+shape+'<text class="t" x="'+cx+'" y="'+(cy-(ls.length*6)+(o.d?-2:-2))+'" text-anchor="middle">'+esc(o.t)+'</text>'+ls.map((l,i)=>'<text class="s" x="'+cx+'" y="'+(cy-(ls.length*6)+16+i*12.5)+'" text-anchor="middle">'+esc(l)+'</text>').join('')+'</g>';
  });
  svg+=dots+'</svg>';
  return svg;
}

/* ---------------- simulador ---------------- */
const DOCS=[
 {n:'Dra. Helena Prado',e:'Cardiologia',u:'Paulista',h:'08:00',st:'way',eta:14,p:9,lat:'Av. Paulista'},
 {n:'Dr. Marcos Vieira',e:'Cardiologia',u:'Paulista',h:'08:30',st:'ok',eta:0,p:7,lat:'—'},
 {n:'Dra. Júlia Tavares',e:'Pediatria',u:'Vila Mariana',h:'08:00',st:'way',eta:22,p:11,lat:'Rua Domingos de Morais'},
 {n:'Dr. André Lopes',e:'Ortopedia',u:'Santana',h:'09:00',st:'way',eta:31,p:8,lat:'Marginal Tietê'},
 {n:'Dra. Beatriz Nunes',e:'Dermatologia',u:'Tucuruvi',h:'09:30',st:'ok',eta:0,p:10,lat:'—'},
 {n:'Dr. Rafael Melo',e:'Neurologia',u:'Paulista',h:'10:00',st:'way',eta:41,p:6,lat:'Radial Leste'},
 {n:'Dr. Paulo Sampaio',e:'Cardiologia',u:'Santana',h:'sobreaviso',st:'sb',eta:18,p:0,lat:'—',sb:1},
 {n:'Dra. Camila Rocha',e:'Pediatria',u:'Paulista',h:'sobreaviso',st:'sb',eta:25,p:0,lat:'—',sb:1},
 {n:'Dr. Tiago Brandão',e:'Ortopedia',u:'Vila Mariana',h:'sobreaviso',st:'sb',eta:30,p:0,lat:'—',sb:1},
 {n:'Dra. Lívia Mendes',e:'Dermatologia',u:'Tucuruvi',h:'plantão',st:'sb',eta:12,p:0,lat:'—',sb:1},
 {n:'Dr. Henrique Dias',e:'Neurologia',u:'Santana',h:'sobreaviso',st:'sb',eta:28,p:0,lat:'—',sb:1}
];
let docs=JSON.parse(JSON.stringify(DOCS)),events=[],last=null;
const LAB={ok:['No consultório','c-ok'],way:['A caminho','c-way'],late:['Atrasado','c-late'],inc:['Incidente','c-inc'],cov:['Coberto','c-cov'],sb:['Disponível','c-sb'],off:['Indisponível','c-inc']};
const hhmm=()=>new Date().toLocaleTimeString('pt-BR');
function log(t,cls){const b=$('#wf2log');if(!b)return;const d=document.createElement('div');d.innerHTML='<span class="v">['+hhmm()+']</span> <span class="'+(cls||'')+'">'+esc(t)+'</span>';b.appendChild(d);b.scrollTop=b.scrollHeight}
function renderTable(){
  const t=$('#wf2tb');if(!t)return;
  t.innerHTML=docs.filter(d=>!d.sb||d.st!=='sb'||true).map(d=>{const l=LAB[d.st]||LAB.way;
    return '<tr><td><b>'+esc(d.n)+'</b><br><small class="muted">'+esc(d.e)+' · '+esc(d.u)+'</small></td><td>'+esc(d.h)+'</td><td><span class="chip '+l[1]+'">'+l[0]+'</span></td><td>'+(d.st==='ok'?'—':d.st==='cov'?'—':d.eta+' min')+'</td><td>'+(d.p||'—')+'</td></tr>'}).join('');
  const s=$('#wf2sel');if(s&&!s.dataset.f){s.dataset.f='1';s.innerHTML=DOCS.filter(d=>!d.sb).map((d,i)=>'<option value="'+d.n+'">'+esc(d.n)+' · '+esc(d.e)+'</option>').join('')}
  const k=docs.filter(d=>!d.sb);
  const set=(id,v)=>{const e=$('#'+id);if(e)e.textContent=v};
  set('wf2k1',k.filter(d=>d.st==='way').length);set('wf2k2',k.filter(d=>d.st==='late'||d.st==='inc').length);set('wf2k3',k.filter(d=>d.st==='cov').length);set('wf2k4',k.filter(d=>d.st==='cov'||d.st==='late'||d.st==='inc').reduce((a,d)=>a+d.p,0));
}
function coverage(doc,motivo){
  const cands=docs.filter(d=>d.sb&&d.e===doc.e&&d.st==='sb').map(d=>{const carga=Math.round(d.p/2);const sc=Math.round(100-d.eta*1.2-carga*3+(d.u===doc.u?15:0));return {d,sc}}).sort((a,b)=>b.sc-a.sc);
  const msgBox=$('#wf2msg'),rk=$('#wf2rank');
  if(!cands.length){
    doc.st='inc';log('Sem profissional disponível em '+doc.e+'. Acionando telemedicina e remarcação por prioridade clínica.','w');
    rk.innerHTML='<b>Nenhum candidato disponível.</b> Fluxo alternativo: telemedicina + remarcação priorizada por urgência.';
    msgBox.innerHTML='<b>Mensagem da Daisy aos '+doc.p+' pacientes:</b> “Olá! Houve um imprevisto com o horário do seu atendimento. Posso te oferecer uma teleconsulta ainda hoje ou remarcar com prioridade. O que prefere?”';
    last={evento:'cobertura_indisponivel',medico:doc.n,especialidade:doc.e,motivo,pacientes_impactados:doc.p,alternativa:'telemedicina_ou_remarcacao_prioritaria'};
    return;
  }
  rk.innerHTML='<b>Ranking de cobertura</b> (especialidade igual, distância, carga e unidade):<br>'+cands.slice(0,3).map((c,i)=>(i+1)+'. '+esc(c.d.n)+' — score '+c.sc+' · '+c.d.eta+' min até a unidade '+esc(doc.u)).join('<br>');
  const w=cands[0].d;
  log('Convite enviado a '+w.n+' (score '+cands[0].sc+').','v');
  setTimeout(()=>{
    w.st='ok';w.p=doc.p;w.sb=0;w.eta=0;w.h='cobrindo';doc.st='cov';
    log(w.n+' aceitou. Agenda de '+doc.n+' reatribuída ('+doc.p+' pacientes). Daisy notificando.','g');
    renderTable();
    msgBox.innerHTML='<b>Mensagem da Daisy aos '+doc.p+' pacientes:</b> “Olá! Seu atendimento de '+esc(doc.e)+' será com '+esc(w.n)+', na unidade '+esc(doc.u)+'. O horário foi mantido. Qualquer dúvida, estou por aqui!”';
    last={evento:'cobertura_confirmada',medico_origem:doc.n,medico_cobertura:w.n,especialidade:doc.e,unidade:doc.u,motivo,pacientes_notificados:doc.p,canal:['app','whatsapp'],tempo_resposta_min:Math.round(1+Math.random()*3),status:'concluido'};
    $('#wf2pj').textContent=JSON.stringify(Object.assign({correlation_id:'COB-'+Date.now().toString(36).toUpperCase(),timestamp:new Date().toISOString()},last),null,2);
    speakFala('medico_cobertura_confirmada');
  },1400);
  last={evento:'cobertura_solicitada',medico_origem:doc.n,candidato:w.n,score:cands[0].sc,motivo};
}
function scenario(kind){
  const nm=$('#wf2sel').value,doc=docs.find(d=>d.n===nm&&!d.sb);if(!doc)return;
  if(doc.st==='cov'){log(doc.n+' já está com a agenda coberta.','w');return}
  if(kind==='traffic'){
    doc.st='late';doc.eta=Math.max(doc.eta,10)+Math.round(15+Math.random()*25);
    log('Trânsito intenso em '+doc.lat+'. ETA de '+doc.n+' subiu para '+doc.eta+' min.','w');
    log('Atraso previsto > 10 min: recepção avisada.','w');
    if(doc.eta>15){log('Atraso > 15 min: Daisy avisa os '+doc.p+' pacientes da 1ª hora.','w');$('#wf2msg').innerHTML='<b>Mensagem da Daisy:</b> “Olá! Seu médico está com um pequeno atraso no trânsito, previsão de chegada em '+doc.eta+' minutos. Você pode aguardar com conforto ou, se preferir, posso sugerir um café enquanto isso.”';speakFala('medico_atraso_transito')}
    if(doc.eta>30){log('Atraso > 30 min: gatilho de cobertura acionado.','e');coverage(doc,'atraso_transito')}
    else{$('#wf2rank').innerHTML='Atraso abaixo do limite de cobertura (30 min). Monitorando a cada 60 s.'}
    last={evento:'atraso_previsto',medico:doc.n,eta_min:doc.eta,local:doc.lat,pacientes:doc.p};
  }else if(kind==='accident'){
    doc.st='inc';log('ALERTA: possível acidente no percurso de '+doc.n+' ('+doc.lat+').','e');
    log('Protocolo de ocorrência: ligação imediata, confirmação de segurança e acionamento de apoio.','e');
    last={evento:'incidente_percurso',medico:doc.n,local:doc.lat,acao:'protocolo_ocorrencia'};
    $('#wf2msg').innerHTML='<b>Mensagem interna à central:</b> “Possível incidente com '+esc(doc.n)+'. Priorize o contato e a segurança da pessoa. A cobertura da agenda foi iniciada.”';
    coverage(doc,'incidente_percurso');speakFala('medico_incidente_percurso');
  }else{
    doc.st='off';log(doc.n+' comunicou emergência pessoal. Agenda a ser coberta.','e');
    last={evento:'emergencia_pessoal',medico:doc.n};
    coverage(doc,'emergencia_pessoal');
  }
  $('#wf2pj').textContent=JSON.stringify(Object.assign({correlation_id:'MED-'+Date.now().toString(36).toUpperCase(),timestamp:new Date().toISOString()},last),null,2);
  renderTable();
}
/* fala opcional em falas/<chave>.mp3 (só toca se existir e a voz estiver ativa) */
function speakFala(k){try{const v=window.__DAISY_OFFICIAL_VOICE_4035;if(!v||!v.active)return;const a=new Audio('falas/'+k+'.mp3');a.onerror=()=>{};a.play().catch(()=>{})}catch(e){}}
function reset(){docs=JSON.parse(JSON.stringify(DOCS));const b=$('#wf2log');if(b)b.innerHTML='';log('Simulação reiniciada. Monitorando '+docs.filter(d=>!d.sb).length+' médicos escalados e '+docs.filter(d=>d.sb).length+' em sobreaviso.','g');$('#wf2msg').innerHTML='Escolha um cenário para ver a mensagem que a Daisy enviaria aos pacientes.';$('#wf2rank').innerHTML='O ranking de cobertura aparece aqui quando o gatilho é acionado.';$('#wf2pj').textContent='{ }';renderTable()}
function tick(){
  let ch=false;docs.forEach(d=>{if((d.st==='way'||d.st==='late')&&d.eta>0){d.eta--;ch=true;if(d.eta===0){d.st='ok';log(d.n+' fez check-in na unidade '+d.u+'.','g')}}});if(ch)renderTable();
}
function build(){
  const sec=$('#workflows'),dc=$('#dcWf');if(!sec||!dc||$('#wf2'))return;
  const w=document.createElement('div');w.id='wf2';
  w.innerHTML='<div class="section-head section-head-compact"><div><small>workflow 2 · versão melhorada</small><h2>Acompanhamento dos médicos e cobertura da agenda</h2><p class="muted">Do momento em que o médico sai de casa até o fim do expediente: trânsito, acidentes no percurso, controle dos atendimentos e deslocamento de profissionais para cobrir atrasos e emergências pessoais.</p></div></div>'+
   '<div class="wf2-svgwrap">'+diagram()+'</div><div class="wf2-legend"><span><i style="background:#16a34a"></i>fluxo normal</span><span><i style="background:#d97706"></i>atenção / atraso</span><span><i style="background:#dc2626"></i>incidente e gatilho de cobertura</span><span><i style="background:#7c3aed"></i>processamento automático</span></div>'+
   '<div class="workflow-kpis compact-kpis" style="margin-top:16px"><div class="card med-kpi"><small>a caminho</small><strong id="wf2k1">0</strong><span class="muted">médicos em deslocamento</span></div><div class="card med-kpi"><small>em atraso / incidente</small><strong id="wf2k2">0</strong><span class="muted">exigem ação da central</span></div><div class="card med-kpi"><small>agendas cobertas</small><strong id="wf2k3">0</strong><span class="muted">substituição confirmada</span></div><div class="card med-kpi"><small>pacientes impactados</small><strong id="wf2k4">0</strong><span class="muted">avisados pela Daisy</span></div></div>'+
   '<div class="sim"><div class="card"><h3>Simulação ao vivo da equipe médica</h3><div class="ctl"><select id="wf2sel" aria-label="Médico"></select><button class="btn ghost compact" data-sc="traffic">🚦 Trânsito intenso</button><button class="btn ghost compact" data-sc="accident">🚧 Acidente no percurso</button><button class="btn ghost compact" data-sc="personal">🚨 Emergência pessoal</button><button class="btn compact" id="wf2rs">↺ Reiniciar</button></div>'+
   '<table><thead><tr><th>Profissional</th><th>1ª consulta</th><th>Status</th><th>Chegada</th><th>Pacientes</th></tr></thead><tbody id="wf2tb"></tbody></table><div class="rank" id="wf2rank"></div><div class="msg" id="wf2msg"></div></div>'+
   '<div class="card"><h3>Registro de eventos (n8n)</h3><div class="wlog" id="wf2log"></div><pre class="pj" id="wf2pj">{ }</pre></div></div>';
  dc.insertAdjacentElement('afterend',w);
  w.querySelectorAll('[data-sc]').forEach(b=>b.onclick=()=>scenario(b.dataset.sc));
  $('#wf2rs').onclick=reset;reset();setInterval(tick,3000);
}
function init(){build();[1500,3500,6000].forEach(t=>setTimeout(build,t))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,800));else setTimeout(init,800);
})();

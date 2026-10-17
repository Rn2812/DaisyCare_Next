/* ===== DaisyCare v40.80 · Prontuário digital: documentos anexados, leitura assistida e protocolos por perfil ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const KEY='dc_pront_v1';
let mem=null;
function load(){if(mem)return mem;try{const r=localStorage.getItem(KEY);if(r){mem=JSON.parse(r);return mem}}catch(e){}
  mem=[{id:'p1',tipo:'Consulta',titulo:'Cardiologia · retorno',data:'2026-09-12',nota:'Pressão controlada. Retorno em 6 semanas.',status:'Registrado',origem:'Médico'},
       {id:'p2',tipo:'Exame',titulo:'Glicemia de jejum e hemoglobina glicada',data:'2026-09-12',nota:'Pedido do médico, preparo: jejum de 8 horas.',status:'Registrado',origem:'Médico'}];return mem}
function save(){try{localStorage.setItem(KEY,JSON.stringify(mem))}catch(e){}}
let perfil='sem';
const PERFIS={sem:'Sem comorbidades',dia:'Diabetes',has:'Hipertensão',rim:'Doença renal'};
/* protocolos: padrão e ajustes por perfil. Ajustes de medicação sempre dependem do médico. */
const PROC=[
 {n:'Endoscopia digestiva',pad:'Jejum de 8 horas. Levar acompanhante se houver sedação.',
  dia:'Pedir horário no início da manhã. Levar o glicosímetro. Quem usa insulina ou comprimido para diabetes segue a orientação escrita do médico sobre a dose do dia.',
  has:'Tomar o remédio de pressão com um gole de água, se o médico não disser o contrário.',rim:'Informar a doença renal na marcação. O médico define o preparo.'},
 {n:'Colonoscopia',pad:'Dieta leve no dia anterior e preparo intestinal conforme a bula entregue. Acompanhante obrigatório.',
  dia:'Risco de glicose baixa com o jejum: o médico entrega um plano de ajuste da medicação e da dieta. Medir a glicose mais vezes.',
  has:'Manter o remédio de pressão, salvo orientação diferente.',rim:'Alguns laxantes não servem para quem tem doença renal: só usar o preparo indicado pelo médico.'},
 {n:'Exame de sangue em jejum',pad:'Jejum de 8 a 12 horas, só água. Medicamentos de uso contínuo conforme o médico.',
  dia:'Levar um lanche para comer logo após a coleta. Não suspender a medicação por conta própria.',
  has:'Tomar o remédio de pressão com água, salvo orientação diferente.',rim:'Informar a doença renal e levar exames anteriores.'},
 {n:'Tomografia com contraste',pad:'Jejum de 4 horas. Informar alergias.',
  dia:'Informar o uso de metformina: o médico decide se suspende antes e depois do contraste e pede exame de função renal.',
  has:'Sem mudança no preparo, salvo orientação diferente.',rim:'Exame de função renal recente é obrigatório. O médico decide se o contraste pode ser usado.'}
];
const DOCS={
 receita:{rot:'Receita',itens:[
  ['Metformina 850 mg','1 comprimido, 2 vezes ao dia, após o café da manhã e o jantar','uso contínuo'],
  ['Losartana 50 mg','1 comprimido pela manhã','uso contínuo'],
  ['Dipirona 500 mg','1 comprimido a cada 6 horas, se houver dor','até 3 dias']],
  alerta:'Letra difícil em "Losartana 50 mg": a leitura precisa de conferência do médico ou do farmacêutico antes de qualquer uso.'},
 exame:{rot:'Pedido de exame',itens:[
  ['Glicemia de jejum','Coleta de sangue','jejum de 8 horas'],
  ['Hemoglobina glicada (HbA1c)','Coleta de sangue','sem jejum'],
  ['Creatinina e ureia','Coleta de sangue','jejum de 8 horas'],
  ['Eletrocardiograma','Exame na unidade','sem preparo']],
  alerta:'Pedido com a hipótese diagnóstica ilegível: a equipe confirma com o médico antes de agendar.'}
};
const css=`
#pront .pr-lead{margin:0 0 16px;color:var(--muted);max-width:78ch;line-height:1.5;font-size:14.5px}
#pront .pr-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-bottom:14px}
#pront h3{margin:0 0 8px;font-size:16px}
#pront .pr-pt{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-bottom:14px}
#pront .pr-pt b{font-size:17px}
#pront .pr-seg{display:flex;flex-wrap:wrap;gap:8px}
#pront .pr-seg button,#pront .pr-btn{min-height:44px;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:12px;padding:8px 14px;font:600 13.5px var(--font);cursor:pointer}
#pront .pr-seg button.on{background:#7c3aed;border-color:#7c3aed;color:#fff}
#pront .pr-btn.prim{background:#7c3aed;border-color:#7c3aed;color:#fff}
#pront label.pr-f{display:block;font-size:13px;color:var(--muted);margin:10px 0 4px}
#pront select,#pront input[type=file]{width:100%;min-height:44px;border:1px solid var(--line);border-radius:10px;padding:8px;background:var(--card);color:var(--ink);font:14px var(--font)}
#pront .pr-warn{border-left:4px solid #d97706;background:rgba(245,158,11,.12);padding:10px 12px;border-radius:8px;font-size:13.5px;line-height:1.45;margin:10px 0}
#pront .pr-ok{border-left:4px solid #16a34a;background:rgba(34,197,94,.1);padding:10px 12px;border-radius:8px;font-size:13.5px;margin:10px 0}
#pront table{width:100%;border-collapse:collapse;font-size:13.5px}
#pront th,#pront td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
#pront th{font-size:12.5px;color:var(--muted)}
#pront .tw{overflow-x:auto}
#pront .st{display:inline-block;font-size:12.5px;font-weight:700;padding:2px 10px;border-radius:999px;background:rgba(245,158,11,.2)}
#pront .st.ok{background:rgba(34,197,94,.2)}
#pront .pr-prev{max-width:100%;max-height:220px;border-radius:10px;border:1px solid var(--line);margin-top:10px;display:none}
#pront .hl td.cur{background:rgba(124,58,237,.1)}
@media(max-width:820px){#pront .pr-two{grid-template-columns:1fr}}
@media(max-width:640px){#pront thead{display:none}#pront table,#pront tbody,#pront tr,#pront td{display:block;width:100%}#pront tr{border-bottom:1px solid var(--line);padding:8px 0}#pront td{border:0;padding:4px 2px}#pront td[data-l]::before{content:attr(data-l);display:block;font-size:12.5px;color:var(--muted)}#pront .pr-btn{width:100%}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
let atual=null;
function hoje(){return new Date().toISOString().slice(0,10)}
function fmt(d){const p=d.split('-');return p[2]+'/'+p[1]+'/'+p[0]}
function labels(){$$('#pront table').forEach(t=>{const h=[...t.querySelectorAll('thead th')].map(x=>x.textContent);t.querySelectorAll('tbody tr').forEach(r=>[...r.children].forEach((c,i)=>{if(h[i])c.dataset.l=h[i]}))})}
function render(){
  const sec=$('#pront');if(!sec)return;
  const L=load();
  sec.innerHTML=
  '<p class="pr-lead">Prontuário digital da paciente com os documentos que o médico entregou. A Daisy lê a receita ou o pedido de exame e escreve em letra clara. Quem confirma o que foi lido é a equipe de saúde. Dados fictícios.</p>'+
  '<div class="card pr-pt"><div><b>Patricia Silva Santos</b><div class="muted" style="font-size:13px">Prontuário 000482 · dados fictícios</div></div><div class="pr-seg" role="group" aria-label="Perfil clínico">'+
   Object.keys(PERFIS).map(k=>'<button type="button" data-pf="'+k+'" class="'+(k===perfil?'on':'')+'">'+PERFIS[k]+'</button>').join('')+'</div></div>'+
  '<div class="pr-two">'+
   '<div class="card"><h3>Anexar documento do médico</h3>'+
    '<label class="pr-f" for="prTipo">Tipo de documento</label><select id="prTipo"><option value="receita">Receita</option><option value="exame">Pedido de exame</option></select>'+
    '<label class="pr-f" for="prArq">Foto ou PDF</label><input id="prArq" type="file" accept="image/*,application/pdf">'+
    '<img id="prPrev" class="pr-prev" alt="Prévia do documento anexado">'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button type="button" class="pr-btn prim" id="prLer">Ler documento</button><button type="button" class="pr-btn" id="prEx">Usar documento de exemplo</button></div>'+
    '<div class="pr-warn">Nesta demonstração a leitura é um exemplo fixo por tipo de documento e não reflete o arquivo anexado. No Ouro, a leitura da letra do médico é feita pelo Azure AI Document Intelligence, com conferência humana.</div></div>'+
   '<div class="card" id="prRes"><h3>Leitura da Daisy</h3><p class="muted" style="font-size:14px">Anexe um documento ou use o exemplo para ver a leitura aqui.</p></div>'+
  '</div>'+
  '<div class="card" style="margin-bottom:14px"><h3>Prontuário · histórico</h3><div class="tw"><table><thead><tr><th>Data</th><th>Tipo</th><th>Registro</th><th>Origem</th><th>Situação</th></tr></thead><tbody>'+
   L.slice().sort((a,b)=>b.data.localeCompare(a.data)).map(e=>'<tr><td>'+fmt(e.data)+'</td><td>'+esc(e.tipo)+'</td><td><b>'+esc(e.titulo)+'</b><br><span class="muted">'+esc(e.nota)+'</span></td><td>'+esc(e.origem)+'</td><td><span class="st '+(/Confirmado|Registrado/.test(e.status)?'ok':'')+'">'+esc(e.status)+'</span></td></tr>').join('')+
  '</tbody></table></div></div>'+
  '<div class="card"><h3>Procedimentos: protocolo padrão e protocolo do perfil</h3><p class="muted" style="font-size:13.5px;margin:0 0 10px">O protocolo padrão vale para quem não tem comorbidade. Com o perfil <b>'+PERFIS[perfil]+'</b> selecionado, a coluna ajustada fica atrelada ao prontuário. Ajuste de medicação só vale com a orientação escrita do médico.</p><div class="tw hl"><table><thead><tr><th>Procedimento</th><th>Protocolo padrão</th><th>Protocolo para '+PERFIS[perfil]+'</th><th></th></tr></thead><tbody>'+
   PROC.map((p,i)=>'<tr><td><b>'+p.n+'</b></td><td>'+esc(p.pad)+'</td><td class="cur">'+(perfil==='sem'?'<span class="muted">Segue o protocolo padrão.</span>':esc(p[perfil]))+'</td><td><button type="button" class="pr-btn" data-at="'+i+'">Atrelar ao prontuário</button></td></tr>').join('')+
  '</tbody></table></div></div>';
  $$('#pront [data-pf]').forEach(b=>b.onclick=()=>{perfil=b.dataset.pf;render()});
  $$('#pront [data-at]').forEach(b=>b.onclick=()=>{const p=PROC[+b.dataset.at];L.push({id:'p'+Date.now(),tipo:'Procedimento',titulo:p.n+' · '+PERFIS[perfil],data:hoje(),nota:perfil==='sem'?p.pad:p[perfil],status:'Aguardando confirmação do médico',origem:'Daisy'});save();render()});
  labels();
  const inp=$('#prArq'),pv=$('#prPrev');
  inp.onchange=()=>{const f=inp.files&&inp.files[0];if(f&&f.type.indexOf('image/')===0){pv.src=URL.createObjectURL(f);pv.style.display='block'}else pv.style.display='none'};
  $('#prLer').onclick=()=>{const f=inp.files&&inp.files[0];if(!f){const r=$('#prRes');r.innerHTML='<h3>Leitura da Daisy</h3><div class="pr-warn">Escolha uma foto ou PDF, ou use o documento de exemplo.</div>';return}leitura($('#prTipo').value,f.name)};
  $('#prEx').onclick=()=>leitura($('#prTipo').value,'exemplo')
}
function leitura(tipo,nome){
  const d=DOCS[tipo];atual={tipo,nome};
  $('#prRes').innerHTML='<h3>Leitura da Daisy · '+d.rot+'</h3><p class="muted" style="font-size:13px;margin:0 0 8px">Arquivo: '+esc(nome)+'</p>'+
   '<div class="tw"><table><thead><tr><th>'+(tipo==='receita'?'Medicamento':'Exame')+'</th><th>'+(tipo==='receita'?'Como usar':'Onde')+'</th><th>'+(tipo==='receita'?'Duração':'Preparo')+'</th></tr></thead><tbody>'+d.itens.map(i=>'<tr><td><b>'+esc(i[0])+'</b></td><td>'+esc(i[1])+'</td><td>'+esc(i[2])+'</td></tr>').join('')+'</tbody></table></div>'+
   '<div class="pr-warn">'+esc(d.alerta)+'</div>'+
   '<button type="button" class="pr-btn prim" id="prOk">Enviar para confirmação e guardar no prontuário</button>';
  labels();
  $('#prOk').onclick=()=>{const L=load();L.push({id:'p'+Date.now(),tipo:d.rot,titulo:d.rot+' · '+d.itens.map(i=>i[0].split(' ')[0]).join(', '),data:hoje(),nota:'Leitura da Daisy anexada. '+d.itens.length+' itens.',status:'Aguardando confirmação do médico',origem:'Paciente'});save();render();
    const r=$('#prRes');r.innerHTML='<h3>Leitura da Daisy</h3><div class="pr-ok">Documento guardado no prontuário. A equipe confirma a leitura antes de qualquer agendamento ou uso de medicamento.</div>'}
}
function build(){
  if($('#pront'))return true;
  const main=$('main.main');if(!main)return false;
  const sec=document.createElement('section');sec.className='page';sec.id='pront';sec.dataset.title='Prontuário digital';
  main.appendChild(sec);render();return true;
}
function menus(){
  const nav=$('.sidebar nav.nav[data-g=s]')||$$('.sidebar nav.nav')[1];
  if($('#pront')&&nav&&!$('.nav button[data-page="pront"]')){
    const b=document.createElement('button');b.dataset.page='pront';b.innerHTML='▣ Prontuário digital';b.onclick=()=>showPage('pront');nav.appendChild(b);
  }
  const dr=$('#uxDr nav');
  if(dr&&!dr.querySelector('[data-p="pront"]')){
    const b=document.createElement('button');b.type='button';b.className='it';b.dataset.p='pront';b.innerHTML='<span aria-hidden="true">▣</span>Prontuário digital';
    b.onclick=()=>{try{showPage('pront')}catch(e){};const d=$('#uxDr');if(d)d.classList.remove('on')};
    const lbl=[...dr.querySelectorAll('.lbl')].find(l=>/Prefer/.test(l.textContent));
    dr.insertBefore(b,lbl||null);
  }
}
let n=0;const iv=setInterval(()=>{build();menus();if(++n>40)clearInterval(iv)},500);
})();

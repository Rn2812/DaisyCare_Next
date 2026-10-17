/* ===== DaisyCare v40.79 · Arquitetura e dados: Prata, Ouro, integrações e retenção ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const css=`
#arq .aq-h{margin:0 0 6px;font-size:22px}
#arq .aq-lead{margin:0 0 18px;color:var(--muted);max-width:75ch;line-height:1.5;font-size:14.5px}
#arq .aq-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-bottom:14px}
#arq .aq-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:14px}
#arq .aq-k small{display:block;font-size:12.5px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
#arq .aq-k strong{display:block;font-size:28px;margin:6px 0 2px}
#arq .aq-k span{font-size:13px;color:var(--muted)}
#arq h3{margin:0 0 8px;font-size:16px}
#arq ul{margin:6px 0 0;padding-left:18px;line-height:1.55;font-size:14px}
#arq .tag{display:inline-block;font-size:12.5px;font-weight:700;padding:2px 10px;border-radius:999px;background:rgba(124,58,237,.14);color:var(--ink);margin-bottom:8px}
#arq .tag.ouro{background:rgba(245,158,11,.2)}
#arq .aq-flow{display:flex;flex-direction:column;gap:8px;align-items:stretch}
#arq .aq-row{display:flex;flex-wrap:wrap;gap:8px}
#arq .aq-box{flex:1 1 130px;min-width:0;border:1px solid var(--line);border-radius:12px;padding:10px 12px;font-size:13.5px;line-height:1.35;background:var(--card)}
#arq .aq-box b{display:block;font-size:14px}
#arq .aq-box.main{border-color:#7c3aed;background:rgba(124,58,237,.1)}
#arq .aq-box.crm{border-color:#d97706;background:rgba(245,158,11,.12)}
#arq .aq-arrow{text-align:center;color:var(--muted);font-size:13px}
#arq .tw{overflow-x:auto}
#arq table{width:100%;border-collapse:collapse;font-size:13.5px}
#arq th,#arq td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
#arq th{font-size:12.5px;color:var(--muted)}
@media(max-width:820px){#arq .aq-two{grid-template-columns:1fr}}
@media(max-width:640px){#arq thead{display:none}#arq table,#arq tbody,#arq tr,#arq td{display:block;width:100%}#arq tr{border-bottom:1px solid var(--line);padding:8px 0}#arq td{border:0;padding:4px 2px}#arq td[data-l]::before{content:attr(data-l);display:block;font-size:12.5px;color:var(--muted)}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const box=(t,d,c)=>'<div class="aq-box '+(c||'')+'"><b>'+esc(t)+'</b>'+esc(d)+'</div>';
const rows=[
 ['Chat do app e WhatsApp, opções 1 a 11','Regras no navegador, dados fictícios','O chat chama a API; a API lê agenda, fila e financeiro no CRM via n8n','Numeração do menu, validações e textos'],
 ['Voz da Daisy','Gravações recortadas por frase','Modelo de voz do Azure AI Speech, chamado só pelo servidor','Uma voz por vez; botão de mudo'],
 ['Confirmação, lista de espera, cancelamento','Estado só no navegador','Eventos no Service Bus, gravados no CRM','Janela de 2 h e limite de convocações'],
 ['Pix e boleto','Envio simulado','Validação de identidade e cobrança no gateway de pagamento','Envio só para contatos cadastrados'],
 ['Indicadores e auditoria','Eventos locais; PostgreSQL no Prata','Eventos no CRM da empresa e telemetria no Azure','8 indicadores e painel de exceções']
];
function build(){
  if($('#arq'))return true;
  const main=$('main.main');if(!main)return false;
  const sec=document.createElement('section');sec.className='page';sec.id='arq';sec.dataset.title='Arquitetura e dados';
  sec.innerHTML=
  '<h2 class="aq-h">Arquitetura e dados</h2>'+
  '<p class="aq-lead">Como a Daisy guarda dados e se conecta aos sistemas do hospital: o que roda hoje na versão Prata e o que muda na versão Ouro. Nada aqui altera as conversas do paciente.</p>'+
  '<div class="aq-kpis">'+
   '<div class="card aq-k"><small>Conversas importantes</small><strong>90 dias a 5 anos</strong><span>prazo conforme a lei de dados</span></div>'+
   '<div class="card aq-k"><small>Versão Prata</small><strong>PostgreSQL</strong><span>estado e auditoria da Daisy</span></div>'+
   '<div class="card aq-k"><small>Versão Ouro</small><strong>CRM da empresa</strong><span>integrado pelo Azure e pelo n8n</span></div>'+
   '<div class="card aq-k"><small>Voz da Daisy</small><strong>Azure Speech</strong><span>modelo de voz do Azure AI Speech</span></div>'+
  '</div>'+
  '<div class="aq-two">'+
   '<div class="card"><span class="tag">Prata · hoje</span><h3>Dados da Daisy no PostgreSQL</h3><ul><li>Canais: app, WhatsApp e app do médico.</li><li>Fluxos n8n 01 a 16 geram os eventos de auditoria.</li><li>O PostgreSQL guarda estado da conversa, fila e auditoria.</li><li>Voz com as gravações da Daisy; frases sem gravação aparecem só em texto.</li></ul></div>'+
   '<div class="card"><span class="tag ouro">Ouro · integração</span><h3>CRM da empresa no Azure e no n8n</h3><ul><li>O CRM passa a ser a fonte de dados e o controle interno.</li><li>O n8n liga a API DaisyCare ao CRM, sem reescrever os fluxos.</li><li>O PostgreSQL deixa de ser a base principal.</li><li>A voz fala qualquer texto pelo Azure AI Speech.</li></ul></div>'+
  '</div>'+
  '<div class="card" style="margin-bottom:14px"><h3>Fluxo da versão Ouro</h3><div class="aq-flow">'+
   '<div class="aq-row">'+box('App da Daisy','paciente')+box('WhatsApp','paciente')+box('App do médico','equipe')+'</div><div class="aq-arrow">↓</div>'+
   '<div class="aq-row">'+box('Azure API Management','porta de entrada · OAuth 2.0, WAF, limites de uso','main')+'</div><div class="aq-arrow">↓</div>'+
   '<div class="aq-row">'+box('API DaisyCare','chat, agenda, fila e voz','main')+box('n8n · fluxos 01 a 16','WhatsApp, Pix, cobertura')+'</div><div class="aq-arrow">↓</div>'+
   '<div class="aq-row">'+box('CRM da empresa','dados e controle interno','crm')+box('Service Bus','eventos entre fluxos')+box('Key Vault','segredos e chaves')+box('Azure AI Speech','voz da Daisy')+box('Application Insights','telemetria e alertas')+'</div>'+
  '</div></div>'+
  '<div class="aq-two">'+
   '<div class="card"><h3>Guarda das conversas</h3><ul><li>Conversas importantes: no mínimo 90 dias e no máximo 5 anos.</li><li>Ao fim do prazo máximo, a conversa é descartada.</li><li>Dados de saúde são sensíveis: acesso restrito e registro de quem consultou.</li><li>A IA e a voz não recebem nome nem CPF sem necessidade.</li></ul></div>'+
   '<div class="card"><h3>Onde os dados ficam</h3><ul><li>Onde for mais barato e seguro para a empresa.</li><li>Exigências mínimas: criptografia, controle de acesso e auditoria.</li><li>A porta de entrada é a padrão de mercado no Azure; pode ser trocada na integração real sem mudar o chat.</li></ul></div>'+
  '</div>'+
  '<div class="card" style="margin-bottom:14px"><h3>Como cada integração entra nos fluxos atuais</h3><div class="tw"><table><thead><tr><th>Fluxo</th><th>Hoje (Prata)</th><th>Ouro</th><th>O que não muda</th></tr></thead><tbody>'+
   rows.map(r=>'<tr>'+r.map((c,i)=>'<td>'+(i?'':'<b>')+esc(c)+(i?'':'</b>')+'</td>').join('')+'</tr>').join('')+
  '</tbody></table></div></div>'+
  '<div class="card"><h3>Decisões em aberto</h3><ul><li>Qual é o CRM do hospital, se oferece API ou acesso ao banco, e onde estão agenda e prontuário.</li><li>Qual gateway de pagamento emite Pix e boleto.</li><li>Quais conversas contam como importantes e como descartar ao fim do prazo.</li></ul><p class="muted" style="font-size:13px;margin:10px 0 0">Os contratos de dados são ajustados no momento da integração real.</p></div>';
  main.appendChild(sec);
  sec.querySelectorAll('table').forEach(t=>{const h=[...t.querySelectorAll('thead th')].map(x=>x.textContent);t.querySelectorAll('tbody tr').forEach(r=>[...r.children].forEach((c,i)=>{if(h[i])c.dataset.l=h[i]}))});return true;
}
function menus(){
  const nav=$('.sidebar nav.nav[data-g=s]')||$$('.sidebar nav.nav')[1];
  if($('#arq')&&nav&&!$('.nav button[data-page="arq"]')){
    const b=document.createElement('button');b.dataset.page='arq';b.innerHTML='◇ Arquitetura e dados';b.onclick=()=>showPage('arq');nav.appendChild(b);
  }
  const dr=$('#uxDr nav');
  if(dr&&!dr.querySelector('[data-p="arq"]')){
    const b=document.createElement('button');b.type='button';b.className='it';b.dataset.p='arq';b.innerHTML='<span aria-hidden="true">◇</span>Arquitetura e dados';
    b.onclick=()=>{try{showPage('arq')}catch(e){};const d=$('#uxDr');if(d)d.classList.remove('on')};
    const lbl=[...dr.querySelectorAll('.lbl')].find(l=>/Prefer/.test(l.textContent));
    dr.insertBefore(b,lbl||null);
  }
}
let n=0;const iv=setInterval(()=>{build();menus();if(++n>40)clearInterval(iv)},500);
})();

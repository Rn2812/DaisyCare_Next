/* ===== DaisyCare v40.52 · extras: central de falas, acessibilidade, lista de espera, exceções do BI, evidências de regras ===== */
(function(){
'use strict';
const CAT=__FALAS_CAT__;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/_/g,' ').trim();
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- preferências (só do navegador, sem dados pessoais) ---------- */
const KEY='daisycare_prefs_v52';
let P={fs:100,hc:0,rm:0,rate:1,bold:0,big:0,sp:0,seen:0,page:''};
const PRESETS={padrao:{fs:100,hc:0,rm:0,rate:1,bold:0,big:0,sp:0},confortavel:{fs:115,hc:0,rm:0,rate:1,bold:0,big:1,sp:1},maximo:{fs:130,hc:1,rm:1,rate:0.9,bold:1,big:1,sp:1}};
const preset=()=>Object.keys(PRESETS).find(k=>Object.keys(PRESETS[k]).every(x=>PRESETS[k][x]===P[x]))||'';
try{Object.assign(P,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}};
function apply(){
  document.body.style.zoom=P.fs===100?'':(P.fs/100);document.body.style.setProperty('--z',P.fs/100);
  ['hc','rm','bold','big','sp'].forEach(c=>document.body.classList.toggle(c,!!P[c]));
  const l=$('#dcFsL');if(l)l.textContent=P.fs+'%';
}
const css=`
#dcDock{position:fixed;right:14px;bottom:14px;z-index:9000;display:flex;gap:8px;align-items:center}
#dcDock button.dk{border:1px solid var(--line,#ddd);background:var(--card,#fff);color:var(--ink,#222);border-radius:999px;padding:10px 14px;font:800 13px var(--font,system-ui);cursor:pointer;box-shadow:0 8px 24px rgba(40,30,90,.18)}
#dcDock .mvp{font:800 10.5px var(--font,system-ui);letter-spacing:.06em;text-transform:uppercase;background:rgba(235,104,52,.14);color:#b8481f;border-radius:999px;padding:6px 10px}
#dcDrawer{position:fixed;right:14px;bottom:66px;width:min(520px,calc(100vw - 28px));max-height:72vh;overflow:auto;z-index:9001;background:var(--card,#fff);color:var(--ink,#222);border:1px solid var(--line,#ddd);border-radius:22px;box-shadow:0 20px 60px rgba(40,30,90,.3);padding:16px;display:none}
#dcDrawer.on{display:block}
#dcDrawer h3{margin:0 0 4px;font:900 18px var(--font,system-ui)}
#dcDrawer .tb{display:flex;gap:6px;margin:10px 0;flex-wrap:wrap}
#dcDrawer .tb button{border:1px solid rgba(98,80,214,.35);background:rgba(98,80,214,.1);color:#4b3bb5;border-radius:999px;padding:7px 13px;font:800 12px var(--font,system-ui);cursor:pointer}
#dcDrawer .tb button.on{background:#6250d6;color:#fff;border-color:#6250d6}
#dcDrawer .row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 0;border-top:1px solid var(--line,#e6e1f2);font:700 13px var(--font,system-ui)}
#dcDrawer .row small{display:block;color:var(--muted,#6b6585);font-weight:600;margin-top:2px}
#dcDrawer .btn{border:1px solid rgba(98,80,214,.35);background:rgba(98,80,214,.12);color:#4b3bb5;border-radius:12px;padding:6px 11px;font:800 12px var(--font,system-ui);cursor:pointer}
#dcDrawer .btn.pri{background:#6250d6;color:#fff;border-color:#6250d6}
#dcDrawer .fl{padding:10px 0;border-top:1px solid var(--line,#e6e1f2)}
#dcDrawer .fl b{font:800 12.5px var(--font,system-ui)}
#dcDrawer .fl p{margin:4px 0 6px;font:600 12.5px/1.45 var(--font,system-ui);color:var(--muted,#6b6585)}
#dcDrawer .pres{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:0 0 6px}
#dcDrawer .pre,#dcWel .pre{display:flex;flex-direction:column;align-items:center;gap:3px;text-align:center;padding:12px 8px;border-radius:16px;border:2px solid var(--line,#ddd);background:var(--card2,#f6f4fb);color:var(--ink,#222);cursor:pointer;font:600 12.5px/1.3 var(--font,system-ui)}
#dcDrawer .pre.on,#dcWel .pre.on,#dcWel .pre:hover{border-color:#6250d6;background:rgba(98,80,214,.12)}
#dcDrawer .pre span,#dcWel .pre span{color:#4b3bb5;line-height:1}#dcDrawer .pre b,#dcWel .pre b{font:800 14px var(--font)}#dcDrawer .pre small,#dcWel .pre small{font-size:12px;color:var(--muted)}
#dcWel{position:fixed;inset:0;z-index:9500;background:rgba(20,14,50,.62);display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px)}
#dcWel .bx{background:var(--card,#fff);color:var(--ink,#222);border-radius:26px;max-width:640px;width:100%;padding:26px 26px 22px;box-shadow:0 30px 80px rgba(20,14,50,.5);max-height:94vh;overflow:auto}
#dcWel h2{margin:0 0 6px;font:800 24px/1.25 var(--font)}#dcWel p{margin:0 0 16px;font:500 15px/1.5 var(--font);color:var(--muted)}
#dcWel .pres{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}#dcWel .pre{padding:18px 8px}#dcWel .pre b{font-size:16px}
#dcWel .ft{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:16px;flex-wrap:wrap}#dcWel .ft small{font:500 13px var(--font);color:var(--muted)}
#dcWel .go{border:0;background:#6250d6;color:#fff;border-radius:14px;padding:13px 24px;font:800 16px var(--font);cursor:pointer;min-height:48px}
@media(max-width:560px){#dcWel .pres,#dcDrawer .pres{grid-template-columns:1fr}}
#dcDrawer .st{font:800 10.5px var(--font,system-ui);padding:2px 8px;border-radius:999px;margin-left:6px}
#dcDrawer .st.ok{background:rgba(21,153,101,.15);color:#159965}#dcDrawer .st.no{background:rgba(199,77,98,.14);color:#c74d62}
#dcDrawer .sum{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0}
#dcDrawer .sum span{font:800 12px var(--font,system-ui);padding:5px 11px;border-radius:999px;background:var(--card2,#f6f4fb)}
:focus-visible{outline:3px solid #6250d6!important;outline-offset:2px!important}
body.rm *,body.rm *::before,body.rm *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
body.hc{--muted:#1d1830!important;--line:#4a3f7a!important;filter:contrast(1.14)}
body.hc .muted,body.hc small{color:#1d1830!important}
#biAlerts{margin:14px 0;padding:14px 16px;border-radius:20px;border:1px solid var(--line);background:var(--card)}
#biAlerts h4{margin:0 0 8px;font:900 15px var(--font)}
#biAlerts .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:8px}#biAlerts .al{display:flex;gap:9px;align-items:flex-start;padding:9px 11px;border:1px solid var(--line);border-radius:14px;background:color-mix(in srgb,var(--card) 80%,transparent);font:600 12px/1.4 var(--font)}#biAlerts .al small{display:block;color:var(--muted);font-weight:600}
#biAlerts .al i{font-style:normal;font:900 11px var(--font);padding:3px 9px;border-radius:999px;white-space:nowrap}
#biAlerts .al i.c{background:rgba(199,77,98,.15);color:var(--crit,#c74d62)}#biAlerts .al i.w{background:rgba(184,118,22,.16);color:var(--warn,#b87616)}
#biAlerts .al b{display:block;font-weight:800}
#biAlerts .okk{font:700 13px var(--font);color:var(--good,#159965)}
#rules2 .ev{margin-top:8px;font:600 11.5px/1.45 var(--font);color:var(--muted)}#rules2 .ev b{color:var(--ink)}
#rules2 .evh{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:10px 0 0}
#rules2 .evh button{border:1px solid var(--line);background:var(--card2);color:var(--ink);border-radius:12px;padding:8px 14px;font:800 12px var(--font);cursor:pointer}
`;
const stl=document.createElement('style');stl.textContent=css;document.head.appendChild(stl);

/* ---------- velocidade das falas em arquivo ---------- */
try{const p0=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){try{if(/falas\//.test(this.src||'')){this.playbackRate=P.rate;this.preservesPitch=true}}catch(e){}return p0.apply(this,arguments)}}catch(e){}

/* ---------- central de falas ---------- */
const have={};
function probe(k){return new Promise(res=>{let i=0,ex=['mp3','wav'];const nx=()=>{if(i>=ex.length)return res(null);const u='falas/'+k+'.'+ex[i++],a=new Audio();a.preload='metadata';a.onloadedmetadata=()=>res(u);a.onerror=nx;a.src=u};nx()})}
async function scan(){await Promise.all(Object.keys(CAT).map(async k=>{const u=await probe(k);if(u)have[k]=u;else delete have[k]}))}
let curA=null;
function playKey(k){try{if(curA)curA.pause()}catch(e){}if(!have[k])return;curA=new Audio(have[k]);curA.play().catch(()=>{})}
function download(name,txt){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/plain;charset=utf-8'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
function viewFalas(){
  const ok=Object.keys(CAT).filter(k=>have[k]),no=Object.keys(CAT).filter(k=>!have[k]),keys=ok.concat(no);
  return '<div class="sum"><span>'+ok.length+' com áudio</span><span>'+no.length+' sem áudio</span><span>'+keys.length+' falas no roteiro</span></div>'
  +'<div class="row"><span>Roteiro das falas que faltam<small>Cada linha traz o nome do arquivo e só o texto a ser falado.</small></span><button class="btn pri" id="dcMiss">Baixar TXT</button></div>'
  +keys.map(k=>'<div class="fl"><b>'+k+'.mp3</b><span class="st '+(have[k]?'ok':'no')+'">'+(have[k]?'com áudio':'sem áudio')+'</span><p>'+esc(CAT[k])+'</p>'
   +(have[k]?'<button class="btn" data-play="'+k+'">▶ Ouvir</button> ':'')+'<button class="btn" data-copy="'+k+'">Copiar texto</button></div>').join('');
}
function viewAcc(){
  const pr=preset(),card=(k,t,d,st)=>'<button class="pre'+(pr===k?' on':'')+'" data-pre="'+k+'" aria-pressed="'+(pr===k)+'"><span style="'+st+'">Aa</span><b>'+t+'</b><small>'+d+'</small></button>';
  const sw=(id,k,t,d)=>'<div class="row"><span>'+t+'<small>'+d+'</small></span><button class="btn" id="'+id+'" role="switch" aria-checked="'+!!P[k]+'">'+(P[k]?'Ligado':'Desligado')+'</button></div>';
  return '<p class="muted" style="margin:0 0 8px;font:600 13.5px/1.45 var(--font)">Escolha como prefere ver. Dá para ajustar cada item depois.</p><div class="pres">'
  +card('padrao','Padrão','Tamanho normal','font-size:18px')+card('confortavel','Letras maiores','Texto e botões maiores','font-size:24px')+card('maximo','Máximo conforto','Letras bem grandes, alto contraste','font-size:30px;font-weight:800')+'</div>'
  +'<div class="row"><span>Tamanho do texto<small>Aumenta ou reduz toda a página.</small></span><span><button class="btn" id="dcFsM" aria-label="Diminuir texto">A−</button> <b id="dcFsL">'+P.fs+'%</b> <button class="btn" id="dcFsP" aria-label="Aumentar texto">A+</button></span></div>'
  +sw('dcHc','hc','Alto contraste','Bordas e textos mais fortes.')
  +sw('dcBold','bold','Letras mais grossas','Deixa o texto mais firme e fácil de ler.')
  +sw('dcBig','big','Botões grandes','Áreas de toque maiores.')
  +sw('dcSp','sp','Mais espaço entre linhas','Texto mais arejado.')
  +sw('dcRm','rm','Reduzir movimento','Desliga animações e transições.')
  +'<div class="row"><span>Velocidade das falas<small>Vale para os áudios em arquivo.</small></span><span>'+[0.9,1,1.15,1.3].map(r=>'<button class="btn'+(P.rate===r?' pri':'')+'" data-rate="'+r+'">'+r.toString().replace('.',',')+'×</button>').join(' ')+'</span></div>'
  +'<div class="row"><span>Preferências<small>Ficam só neste navegador. Não guardam CPF nem conversa.</small></span><button class="btn" id="dcReset">Restaurar</button></div>';
}
function viewAbout(){
  return '<p class="muted" style="font:600 13px/1.5 var(--font)"><b>Demonstração simulada (MVP).</b> Pacientes, agenda, GPS dos médicos, Pix, boletos, indicadores e integrações são fictícios ou derivados de um arquivo de exemplo. Nada aqui altera sistemas reais do hospital.</p>'
  +'<p class="muted" style="font:600 13px/1.5 var(--font)"><b>O que seria produção:</b> integração com agenda e prontuário, eventos reais de deslocamento, envio de mensagens, base de auditoria e catálogo de falas aprovado.</p>'
  +'<p class="muted" style="font:600 12px var(--font)">Versão 40.52</p>';
}
let tab='acc';
function draw(){
  const d=$('#dcDrawer');if(!d)return;
  d.innerHTML='<h3>Painel da Daisy</h3><div class="tb" role="tablist">'+[['acc','Acessibilidade'],['fal','Falas'],['abt','Sobre o MVP']].map(t=>'<button role="tab" class="'+(tab===t[0]?'on':'')+'" data-t="'+t[0]+'">'+t[1]+'</button>').join('')+'</div>'+(tab==='acc'?viewAcc():tab==='fal'?viewFalas():viewAbout());
  $$('[data-t]',d).forEach(b=>b.onclick=()=>{tab=b.dataset.t;draw();if(tab==='fal')scan().then(draw)});
  $$('[data-play]',d).forEach(b=>b.onclick=()=>playKey(b.dataset.play));
  $$('[data-copy]',d).forEach(b=>b.onclick=()=>{try{navigator.clipboard.writeText(CAT[b.dataset.copy]);b.textContent='Copiado'}catch(e){b.textContent='Selecione o texto'}});
  const m=$('#dcMiss');if(m)m.onclick=()=>download('Falas_que_faltam_DaisyCare.txt',Object.keys(CAT).filter(k=>!have[k]).map(k=>'ARQUIVO: falas/'+k+'.mp3\nTEXTO: '+CAT[k]).join('\n\n')+'\n');
  const fm=$('#dcFsM');if(fm){fm.onclick=()=>{P.fs=Math.max(85,P.fs-10);save();apply()};$('#dcFsP').onclick=()=>{P.fs=Math.min(150,P.fs+10);save();apply()};
    [['dcHc','hc'],['dcBold','bold'],['dcBig','big'],['dcSp','sp'],['dcRm','rm']].forEach(([id,k])=>{const e=$('#'+id);if(e)e.onclick=()=>{P[k]=P[k]?0:1;save();apply();draw()}});
    $$('[data-pre]',d).forEach(b=>b.onclick=()=>{Object.assign(P,PRESETS[b.dataset.pre]);save();apply();draw()});
    $$('[data-rate]',d).forEach(b=>b.onclick=()=>{P.rate=+b.dataset.rate;save();draw()});
    $('#dcReset').onclick=()=>{Object.assign(P,PRESETS.padrao);save();apply();draw()}}
}
function dock(){
  if($('#dcDock'))return;
  const d=document.createElement('div');d.id='dcDock';
  d.innerHTML='<button class="dk" id="dcBtn" aria-expanded="false" aria-controls="dcDrawer"><span aria-hidden="true">Aa</span> Acessibilidade</button>';
  document.body.appendChild(d);
  const dr=document.createElement('div');dr.id='dcDrawer';dr.setAttribute('role','dialog');dr.setAttribute('aria-label','Painel da Daisy');document.body.appendChild(dr);
  $('#dcBtn').onclick=()=>{const on=dr.classList.toggle('on');$('#dcBtn').setAttribute('aria-expanded',on);if(on){draw();scan().then(()=>{if(tab==='fal')draw()})}};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dr.classList.contains('on')){dr.classList.remove('on');$('#dcBtn').focus()}});
}

/* ---------- fluxo "sem horário" com lista de espera ---------- */
function waitlist(){
  const R0=window.reply;
  if(typeof R0==='function'){
    window.reply=function(ch,text,tipo,meta){
      try{
        if(tipo==='nova_consulta_opcoes_enviadas'&&/dermat|oftalm|neuro|reumat/i.test(norm((meta&&meta.especialidade)||''))){
          const e=meta.especialidade;state.sessions[ch]={flow:'waitlist',step:'choice',data:{esp:e}};
          return R0.call(this,ch,'Não há horários livres para '+e+' agora, mas posso colocar você na fila.\n\n1 - Entrar na fila de espera (aviso assim que surgir uma vaga)\n2 - Escolher outra especialidade\n\nDigite 1 ou 2.','nova_consulta_sem_horario',meta);
        }
      }catch(e){console.warn(e)}
      return R0.apply(this,arguments);
    };
    try{reply=window.reply}catch(e){}
  }
  const P0=window.processFlow;
  if(typeof P0==='function'){
    window.processFlow=function(ch,text){
      try{
        const s=state.sessions[ch];
        if(s&&s.flow==='waitlist'){
          const t=norm(text);
          if(/^1$|^sim$|fila|quero/.test(t)){const e=s.data.esp;state.sessions[ch]={flow:null,step:null,data:{}};
            registerEvent('lista_espera_entrada','WL-'+Date.now(),{especialidade:e,canal:ch,consentimento:'aceite_no_chat',lgpd:'sem_cpf_no_evento'});
            reply(ch,'Pronto, Patricia! Você entrou na fila de espera de '+e+'. Aviso assim que surgir uma vaga, e você terá alguns minutos para aceitar.','lista_espera_confirmada',{especialidade:e});return true}
          if(/^2$|outra/.test(t)){state.sessions[ch]={flow:null,step:null,data:{}};startNewConsult(ch);return true}
          reply(ch,'Digite 1 para entrar na fila de espera ou 2 para escolher outra especialidade.','lista_espera_opcao_invalida');return true;
        }
      }catch(e){console.warn(e)}
      return P0.apply(this,arguments);
    };
    try{processFlow=window.processFlow}catch(e){}
  }
}

/* ---------- BI: painel de exceções ---------- */
const ACAO={'Comparecimento':'Reforçar lembretes 24 h e 2 h antes e oferecer remarcação em um toque.','No-show':'Priorizar confirmação ativa nas agendas com maior risco e liberar encaixe pela Smart Queue.','Confirmação 24 h':'Antecipar o disparo do lembrete e ativar segunda tentativa por outro canal.','NPS':'Ler os comentários dos detratores e abrir tratativa por unidade e especialidade.','Aceite Smart Queue':'Revisar o texto do convite e o prazo de resposta.','Sucesso da automação':'Abrir os erros do workflow no log de auditoria e corrigir os mais frequentes.','Reversão de faltas':'Oferecer remarcação em um toque logo após o no-show ou cancelamento.','Reversão de vagas (Smart Queue)':'Ampliar o raio e o número de convites por vaga liberada.','Encaixe após aceite':'Reduzir o prazo entre aceite e confirmação do encaixe.','Resolução no 1º contato':'Revisar as dúvidas que voltam e ampliar as respostas da Daisy.','Espera média':'Rever a escala nos horários de pico e avisar o paciente da previsão.'};
function alerts(){
  const bi=$('#bi'),k=$('#biKpis'),k2=$('#biKpis2');if(!bi||!k)return;
  let box=$('#biAlerts');if(!box){box=document.createElement('div');box.id='biAlerts';box.setAttribute('role','region');box.setAttribute('aria-label','Painel de exceções');(k.previousElementSibling&&k.previousElementSibling.classList.contains('bi-sec')?k.previousElementSibling:k).parentNode.insertBefore(box,k.previousElementSibling&&k.previousElementSibling.classList.contains('bi-sec')?k.previousElementSibling:k)}
  const L=$$('.kpi',k).concat(k2?$$('.kpi',k2):[]).map(el=>{const t=$('.tag',el);return t?{n:($('.kl span',el)||{}).textContent,v:($('.kv',el)||{}).textContent,m:($('.ks',el)||{}).textContent,c:t.classList.contains('c')?'c':t.classList.contains('w')?'w':'g'}:null}).filter(Boolean);
  const bad=L.filter(x=>x.c!=='g').sort((a,b)=>(a.c==='c'?0:1)-(b.c==='c'?0:1));
  box.innerHTML='<h4>Painel de exceções · '+(bad.length?bad.length+' indicador'+(bad.length>1?'es':'')+' fora da meta':'tudo dentro da meta')+'</h4>'
   +(bad.length?'<div class="grid">'+bad.map(x=>'<div class="al"><i class="'+x.c+'">'+(x.c==='c'?'Crítico':'Atenção')+'</i><span><b>'+esc(x.n)+' · '+esc(x.v)+'</b><small>'+esc(x.m)+'</small>'+(ACAO[x.n]?'<small>Ação: '+esc(ACAO[x.n])+'</small>':'')+'</span></div>').join('')+'</div>':'<div class="okk">Nenhuma exceção no filtro atual.</div>');
}
function watchBI(){
  const k=$('#biKpis');if(!k){setTimeout(watchBI,1200);return}
  alerts();const mo=new MutationObserver(()=>{clearTimeout(watchBI.t);watchBI.t=setTimeout(alerts,150)});mo.observe(k,{childList:true});const k2=$('#biKpis2');if(k2)mo.observe(k2,{childList:true});
}

/* ---------- regras: evidência de auditoria ---------- */
const EV={
 'RN-01':['confirmacao_consulta'],'RN-02':['fila_digital'],'RN-03':['consulta_agenda','agenda_assistencial_consulta'],'RN-04':['nova_consulta','lista_espera'],'RN-05':['agenda_familiar'],'RN-06':['financeiro_'],'RN-07':['acolhimento_chegada'],'RN-08':['nps_'],'RN-09':['duvidas_consulta_hospital'],'RN-10':['conhecer_daisy'],'RN-11':['transbordo_humano'],'RN-12':['orientacao_preparo_exame','preparo_'],'RN-13':['acolhimento_chegada'],'RN-14':['alerta_emergencia'],'RN-15':['financeiro_cpf_recebido','lista_espera_entrada'],'RN-16':['chat_resposta'],'RN-17':[],'RN-18':['monitoramento_medico_atualizado'],'RN-19':['alerta_monitoramento_medico'],'RN-20':['alerta_monitoramento_medico'],'RN-21':['acao_daisy_monitoramento_medico'],'RN-22':['acao_operacional'],'RN-23':['acao_operacional'],'RN-24':['acao_operacional'],'RN-25':['acao_operacional'],'RN-26':['workflow_executado_3x'],'RN-27':['smart_queue_'],'RN-28':['extracao_postgres_enviada'],'RN-29':['app_iniciado'],'RN-30':[]};
const FK={'RN-01':'confirmacao_consulta_completa','RN-02':'fila_posicao','RN-03':'agenda_completa','RN-04':'nova_consulta_sem_horario','RN-05':'agenda_familiar_completa','RN-06':'pix_gerado_completa','RN-07':'cheguei_cedo_completa','RN-08':'nps_detrator','RN-09':'duvidas_completa','RN-10':'conhecer_daisy','RN-11':'atendente_humano_completa','RN-12':'prep_jejum','RN-13':'route_mobility','RN-14':'emergencia','RN-15':'uso_informacoes_lgpd','RN-19':'medico_atraso_transito','RN-20':'medico_incidente_percurso','RN-22':'medico_cobertura_confirmada','RN-27':'sq_slot_open'};
function evCount(prefs){try{return state.events.filter(e=>prefs.some(p=>String(e.tipo_evento).startsWith(p))).length}catch(e){return 0}}
function relatorio(){
  const R=window.DAISY_REGRAS||[];
  const rows=R.map(r=>{const ev=EV[r[0]]||[],n=evCount(ev),f=FK[r[0]]||'';return {id:r[0],area:r[1],regra:r[2],evento:ev.join(' | ')||'(a definir)',n,fala:f?f+(have[f]?' (com áudio)':' (sem áudio)'):'',ind:r[6]}});
  return rows;
}
function evBox(){
  const w=$('#rules2');if(!w||$('#evBar'))return;
  const bar=document.createElement('div');bar.id='evBar';bar.className='evh';
  bar.innerHTML='<button id="evCsv">Exportar relatório regra → evidência (CSV)</button><span class="muted" style="font:600 12px var(--font)">Mostra o evento de auditoria esperado, quantas vezes ele ocorreu nesta sessão e a fala ligada.</span>';
  const g=$('#rulesGrid');w.insertBefore(bar,g);
  $('#evCsv').onclick=()=>{scan().then(()=>{const q=v=>'"'+String(v).replace(/"/g,'""')+'"';const r=relatorio();download('Relatorio_Regra_Evidencia_DaisyCare.csv','﻿'+['regra;area;nome;evento_de_auditoria;ocorrencias_na_sessao;fala;indicador'].concat(r.map(x=>[x.id,x.area,x.regra,x.evento,x.n,x.fala,x.ind].map(q).join(';'))).join('\n'))})};
  const dec=()=>{$$('#rulesGrid .rc').forEach(c=>{if(c.querySelector('.ev'))return;const id=($('.id',c)||{}).textContent,ev=EV[id]||[],f=FK[id];const d=document.createElement('div');d.className='ev';d.innerHTML='<b>Evidência:</b> '+(ev.length?esc(ev.join(', '))+' · '+evCount(ev)+' nesta sessão':'definir evento')+(f?'<br><b>Fala:</b> '+f:'');c.appendChild(d)})};
  dec();new MutationObserver(()=>{clearTimeout(evBox.t);evBox.t=setTimeout(dec,100)}).observe(g,{childList:true});
}
function watchRules(){if($('#rules2')&&$('#rulesGrid'))evBox();else setTimeout(watchRules,1200)}

/* ---------- restaurar a última página ---------- */
function pages(){
  const S=window.showPage;
  if(typeof S==='function'){window.showPage=function(id){try{P.page=id;save()}catch(e){}return S.apply(this,arguments)};try{showPage=window.showPage}catch(e){}}
  if(P.page&&$('#'+P.page)&&!/^(kids|chat)$/.test(P.page)){setTimeout(()=>{try{S(P.page)}catch(e){}},400)}
}
function welcome(){
  if(P.seen||$('#dcWel'))return;
  const w=document.createElement('div');w.id='dcWel';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-labelledby','dcWelT');
  const card=(k,t,d,st)=>'<button class="pre" data-pre="'+k+'"><span style="'+st+'">Aa</span><b>'+t+'</b><small>'+d+'</small></button>';
  w.innerHTML='<div class="bx"><h2 id="dcWelT">Bem-vindo(a) ao DaisyCare</h2><p>Como você prefere ver a tela? Toque em uma opção. Você pode mudar quando quiser, no botão <b>Acessibilidade</b>.</p><div class="pres">'+card('padrao','Padrão','Tamanho normal','font-size:20px')+card('confortavel','Letras maiores','Texto e botões maiores','font-size:28px')+card('maximo','Máximo conforto','Letras bem grandes e alto contraste','font-size:36px;font-weight:800')+'</div><div class="ft"><small>Demonstração simulada: nenhum dado é real.</small></div></div>';
  document.body.appendChild(w);
  const done=k=>{if(k)Object.assign(P,PRESETS[k]);P.seen=1;save();apply();w.remove()};
  $$('[data-pre]',w).forEach(b=>b.onclick=()=>done(b.dataset.pre));
  w.addEventListener('keydown',e=>{if(e.key==='Escape')done('')});
  const f=$('[data-pre]',w);if(f)f.focus();
}
function init(){apply();dock();welcome();waitlist();watchBI();watchRules();pages();scan()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,900));else setTimeout(init,900);
window.DAISY_V52={welcome,presets:PRESETS,prefs:()=>P,relatorio,scan,have:()=>have};
})();

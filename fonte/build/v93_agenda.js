<script>
/* ===== DaisyCare v40.93 · Confirmar, cancelar e reagendar consultas, exames e procedimentos (App e WhatsApp) ===== */
(function(){
'use strict';
const FLOW='agenda_acao';
const TZ='America/Sao_Paulo';
const DIAS=['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w\s@.-]/g,' ').replace(/\s+/g,' ').trim();
const sched=()=>window.DAISY_CARE_SCHEDULE||[];
const ativos=()=>sched().filter(x=>!/cancel/.test(String(x.status)));
function partes(iso){const d=new Date(iso);const f=new Intl.DateTimeFormat('pt-BR',{timeZone:TZ,day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',weekday:'long',hour12:false}).formatToParts(d);const g=k=>(f.find(p=>p.type===k)||{}).value||'';return {dia:g('day')+'/'+g('month'),hora:g('hour')+':'+g('minute'),sem:g('weekday').replace('-feira','')}}
const quando=iso=>{const p=partes(iso);return p.dia+' ('+p.sem+') às '+p.hora};
const nome=x=>x.kind==='consulta'?String(x.title).replace(/^Consulta de /,'consulta de '):x.title;
const tipoTxt=x=>x.kind==='consulta'?'consulta':x.kind==='exame'?'exame':'procedimento';
const quem=x=>x.doctor?', com '+x.doctor:'';
const linha=(x,i)=>(i+1)+' - '+x.title+' — '+quando(x.date)+' — '+x.unit+(x.status?' ('+x.status+')':'');
const proto=p=>'DC-'+p+'-'+new Date().getFullYear()+'-'+String(Date.now()).slice(-6);
const sess=ch=>(typeof state!=='undefined'&&state.sessions&&state.sessions[ch])||{};
const setS=(ch,step,data)=>{state.sessions[ch]={flow:FLOW,step,data:data||{}}};
const fim=ch=>{state.sessions[ch]={flow:null,step:null,data:{}}};
function ev(tipo,item,extra){try{registerEvent(tipo,item?item.id:'AGENDA',Object.assign({id_agendamento:item&&item.id,tipo:item&&item.kind,titulo:item&&item.title,origem:'chat_daisy'},extra||{}))}catch(e){}}
function refresh(){try{if(typeof renderAudit==='function')renderAudit()}catch(e){}}

/* encontra o agendamento citado na frase (nome do exame, tipo ou número da lista) */
function achar(n,lista){
  const pal=w=>new RegExp('\\b'+w+'\\b').test(n);
  const porNome=lista.filter(x=>{const t=norm(x.title);const chaves=t.split(' ').filter(w=>w.length>4&&!/consulta|exame|procedimento|ambulatorial|total|livre|digestiva/.test(w));return chaves.some(pal)||(x.key==='tsh_t4'&&/\btsh\b|\bt4\b|tireoide/.test(n))||(x.key==='us_abdome'&&/ultrassom|ultrassonografia|\busg\b/.test(n))||(x.key==='consulta_cardio'&&/cardio/.test(n))});
  if(porNome.length)return porNome;
  if(/\bconsultas?\b/.test(n))return lista.filter(x=>x.kind==='consulta');
  if(/\bexames?\b/.test(n))return lista.filter(x=>x.kind==='exame');
  if(/procedimento|cirurgia|excisao/.test(n))return lista.filter(x=>x.kind==='procedimento');
  return lista;
}

/* horários livres simulados para reagendar: próximos dias úteis, faixa do tipo de atendimento */
function horarios(item){
  const H={consulta:['08:30','14:00','19:30','21:00'],exame:['07:40','08:10','09:30','10:30'],procedimento:['08:00','09:00','13:30']}[item.kind]||['09:00','14:00'];
  const out=[];const base=new Date();base.setHours(12,0,0,0);
  let d=new Date(base.getTime()+2*864e5),k=0;
  while(out.length<4&&k<30){const wd=d.getDay();if(wd!==0&&!(wd===6&&item.kind!=='exame')){const h=H[(out.length*2+k)%H.length];const iso=d.toISOString().slice(0,10)+'T'+h+':00-03:00';const t=Date.parse(iso);const choque=ativos().some(o=>o.id!==item.id&&Math.abs(Date.parse(o.date)-t)<3*3600e3);if(iso.slice(0,16)!==String(item.date).slice(0,16)&&!choque)out.push(iso)}d=new Date(d.getTime()+(out.length%2?1:2)*864e5);k++}
  return out;
}

const AVISO_PROC=x=>x.kind==='procedimento'?'\n\nComo é um procedimento com preparo e autorização do convênio, a equipe do Centro de Procedimentos confirma por telefone em até 1 dia útil.':x.kind==='exame'&&x.key==='endoscopia'?'\n\nSe você já começou o preparo deste exame, avise a equipe da Endoscopia.':'';

function menuAcao(item){return 'Patricia, sua '+nome(item)+' está marcada para '+quando(item.date)+quem(item)+', na '+item.unit+'.\n\nO que você deseja fazer?\n1 - Confirmar presença\n2 - Cancelar\n3 - Reagendar\n4 - Voltar ao menu\n\nDigite o número da opção.'}
function pedeConfirmCancel(item){return 'Você quer cancelar a '+nome(item)+' de '+quando(item.date)+', na '+item.unit+'?\n\n1 - Sim, cancelar\n2 - Não, prefiro reagendar\n3 - Não, manter o agendamento\n\nSe quiser, escreva também o motivo do cancelamento.'}
function listaHorarios(item,slots){return 'Estes são os novos horários disponíveis para a '+nome(item)+', na '+item.unit+':\n\n'+slots.map((s,i)=>(i+1)+' - '+quando(s)).join('\n')+'\n\nDigite o número do horário que você prefere. Digite 0 para voltar.'}
function pedeConfirmReag(item,novo){return 'Confira a mudança antes de eu confirmar:\n\nAtual: '+quando(item.date)+'\nNovo: '+quando(novo)+quem(item)+', na '+item.unit+'.\n\n1 - Confirmar reagendamento\n2 - Escolher outro horário\n3 - Manter o horário atual'}
function escolherItem(acao,lista){return 'Qual '+(acao==='cancelar'?'agendamento você quer cancelar':'agendamento você quer reagendar')+'?\n\n'+lista.map(linha).join('\n')+'\n\nDigite o número. Digite 0 para voltar ao menu.'}

function cancelar(ch,item,motivo){
  const antes=item.date;item.status='cancelada';const p=proto('CAN');
  const curto=(new Date(antes)-Date.now())<2*3600e3;
  ev('vaga_liberada_smart_queue',item,{data_liberada:antes,motivo:'cancelamento_paciente'});
  fim(ch);
  window.reply(ch,'Pronto, Patricia. Sua '+nome(item)+' de '+quando(antes)+' foi cancelada. Protocolo '+p+'.\n\n'+(curto?'Como faltavam menos de 2 horas, a vaga pode não ser reaproveitada, mas o aviso ajuda a equipe.':'Obrigada por avisar: o horário foi liberado para outro paciente da fila de espera.')+AVISO_PROC(item)+'\n\nSe quiser marcar uma nova data, digite REAGENDAR. Para voltar ao início, digite MENU.',item.kind==='consulta'?'consulta_cancelada':item.kind==='exame'?'exame_cancelado':'procedimento_cancelado',{canal:ch,id_agendamento:item.id,data_cancelada:antes,motivo:motivo||'nao_informado',protocolo:p});
  refresh();
}
function reagendar(ch,item,novo){
  const antes=item.date;item.date=novo;item.status=item.kind==='procedimento'?'reagendado (aguarda confirmação da equipe)':'reagendada';const p=proto('REA');
  ev('vaga_liberada_smart_queue',item,{data_liberada:antes,motivo:'reagendamento_paciente'});
  fim(ch);
  window.reply(ch,'Reagendamento confirmado, Patricia!\n\n'+item.title+'\nNova data: '+quando(novo)+quem(item)+'\nLocal: '+item.unit+'\nProtocolo: '+p+'\n\nO horário anterior ('+quando(antes)+') foi liberado para outro paciente. Vou te lembrar 24 horas antes.'+AVISO_PROC(item),item.kind==='consulta'?'consulta_remarcada':item.kind==='exame'?'exame_remarcado':'procedimento_remarcado',{canal:ch,id_agendamento:item.id,data_anterior:antes,nova_data:novo,protocolo:p});
  refresh();
}
function confirmar(ch,item){
  item.status='confirmada';fim(ch);
  window.reply(ch,'Presença confirmada, Patricia! Sua '+nome(item)+' é '+quando(item.date)+quem(item)+', na '+item.unit+'. Recomendo chegar '+(item.arrivalMin||30)+' minutos antes.\n\nQualquer dúvida, estou por aqui!',item.kind==='consulta'?'confirmacao_consulta':'confirmacao_agendamento',{canal:ch,id_agendamento:item.id});
}
function iniciarReag(ch,item){const slots=horarios(item);setS(ch,'reag_slot',{id:item.id,slots});window.reply(ch,listaHorarios(item,slots),'reagendamento_horarios',{canal:ch,id_agendamento:item.id,opcoes:slots})}
function iniciarCancel(ch,item){setS(ch,'cancel_ok',{id:item.id});window.reply(ch,pedeConfirmCancel(item),'cancelamento_confirmacao_pendente',{canal:ch,id_agendamento:item.id})}
function iniciarPorAcao(ch,acao,lista){
  if(!lista.length){fim(ch);window.reply(ch,'Não encontrei agendamentos ativos para '+(acao==='cancelar'?'cancelar':'reagendar')+'. Para marcar uma nova consulta, digite 4.','agenda_sem_itens_ativos',{canal:ch});return}
  if(lista.length===1){acao==='cancelar'?iniciarCancel(ch,lista[0]):iniciarReag(ch,lista[0]);return}
  setS(ch,'pick',{acao,ids:lista.map(x=>x.id)});window.reply(ch,escolherItem(acao,lista),acao==='cancelar'?'cancelamento_escolha_item':'reagendamento_escolha_item',{canal:ch,total:lista.length});
}
const byId=id=>sched().find(x=>x.id===id);

/* devolve true quando a mensagem foi tratada aqui */
function tratar(ch,raw){
  const n=norm(raw);const st=sess(ch);const num=(n.match(/^(\d{1,2})$/)||[])[1];
  const sairGlobal=/^(menu|menu principal|sair|voltar|inicio|recomecar|reiniciar|voltar ao menu|11|atendente|atendimento humano|falar com atendente|humano)$/.test(n);
  if(st.flow===FLOW){
    if(sairGlobal){fim(ch);return false}
    const d=st.data||{};
    if(st.step==='acao'){
      const it=byId(d.id);if(!it){fim(ch);return false}
      if(num==='1'||/^(confirmar|confirmo|sim|confirmar presenca|vou)$/.test(n)){confirmar(ch,it);return true}
      if(num==='2'||/cancel|desmarc|nao vou/.test(n)){iniciarCancel(ch,it);return true}
      if(num==='3'||/reagend|remarc|mudar|trocar|outro horario|outra data/.test(n)){iniciarReag(ch,it);return true}
      if(num==='4'||num==='0'){fim(ch);return 'menu'}
      window.reply(ch,'Escolha uma opção de 1 a 4.\n\n'+menuAcao(it).split('\n\n').slice(1).join('\n\n'),'agenda_acao_invalida',{canal:ch});return true;
    }
    if(st.step==='pick'){
      if(num==='0'){fim(ch);return 'menu'}
      const lista=(d.ids||[]).map(byId).filter(Boolean);
      let it=num&&lista[+num-1];
      if(!it){const m=achar(n,lista);if(m.length===1)it=m[0]}
      if(!it){window.reply(ch,'Não encontrei essa opção. Digite o número do agendamento:\n\n'+lista.map(linha).join('\n')+'\n\nDigite 0 para voltar ao menu.','agenda_escolha_invalida',{canal:ch});return true}
      d.acao==='cancelar'?iniciarCancel(ch,it):iniciarReag(ch,it);return true;
    }
    if(st.step==='cancel_ok'){
      const it=byId(d.id);if(!it){fim(ch);return false}
      if(num==='1'||/^(sim|s|pode|pode cancelar|cancelar|confirmo|confirmar)$/.test(n)){cancelar(ch,it,d.motivo);return true}
      if(num==='2'||/reagend|remarc/.test(n)){iniciarReag(ch,it);return true}
      if(num==='3'||/^(nao|n|manter|mantem|manter o agendamento)$/.test(n)){fim(ch);window.reply(ch,'Tudo certo, Patricia. Sua '+nome(it)+' continua marcada para '+quando(it.date)+'.','cancelamento_desistido',{canal:ch,id_agendamento:it.id});return true}
      if(n.length>3&&!num){d.motivo=raw.slice(0,200);window.reply(ch,'Obrigada por contar o motivo. Confirma o cancelamento?\n\n1 - Sim, cancelar\n2 - Não, prefiro reagendar\n3 - Não, manter o agendamento','cancelamento_motivo_registrado',{canal:ch,id_agendamento:it.id});return true}
      window.reply(ch,'Responda 1 para cancelar, 2 para reagendar ou 3 para manter o agendamento.','cancelamento_resposta_invalida',{canal:ch});return true;
    }
    if(st.step==='reag_slot'){
      const it=byId(d.id);if(!it){fim(ch);return false}
      if(num==='0'){fim(ch);return 'menu'}
      const novo=num&&(d.slots||[])[+num-1];
      if(!novo){window.reply(ch,'Escolha um dos horários pelo número:\n\n'+(d.slots||[]).map((s,i)=>(i+1)+' - '+quando(s)).join('\n')+'\n\nDigite 0 para voltar.','reagendamento_opcao_invalida',{canal:ch});return true}
      setS(ch,'reag_ok',{id:it.id,slots:d.slots,novo});window.reply(ch,pedeConfirmReag(it,novo),'reagendamento_confirmacao_pendente',{canal:ch,id_agendamento:it.id,nova_data:novo});return true;
    }
    if(st.step==='reag_ok'){
      const it=byId(d.id);if(!it){fim(ch);return false}
      if(num==='1'||/^(sim|s|confirmar|confirmo|pode)$/.test(n)){reagendar(ch,it,d.novo);return true}
      if(num==='2'||/outro/.test(n)){setS(ch,'reag_slot',{id:it.id,slots:d.slots});window.reply(ch,listaHorarios(it,d.slots),'reagendamento_horarios',{canal:ch,id_agendamento:it.id});return true}
      if(num==='3'||/^(nao|n|manter)$/.test(n)){fim(ch);window.reply(ch,'Tudo bem, Patricia. Mantive o horário atual: '+quando(it.date)+'.','reagendamento_desistido',{canal:ch,id_agendamento:it.id});return true}
      window.reply(ch,'Responda 1 para confirmar o novo horário, 2 para escolher outro ou 3 para manter o atual.','reagendamento_resposta_invalida',{canal:ch});return true;
    }
    return false;
  }
  if(st.flow)return false;            /* outro fluxo em andamento: não interfere */
  if(/pix|boleto|pagamento|fatura|plano|convenio|assinatura/.test(n))return false;

  /* opção 1: mostra a consulta e oferece confirmar, cancelar ou reagendar */
  if(/^(1|confirmar consulta|confirmar a consulta|confirmar minha consulta|confirmar presenca|confirmacao de consulta)$/.test(n)){
    const it=ativos().find(x=>x.kind==='consulta');
    if(!it){window.reply(ch,'Você não tem consulta ativa no momento. Para marcar uma nova consulta, digite 4.','consulta_nao_encontrada',{canal:ch});return true}
    setS(ch,'acao',{id:it.id});window.reply(ch,menuAcao(it),'consulta_opcoes_confirmar_cancelar_reagendar',{canal:ch,id_agendamento:it.id});return true;
  }
  const querCancelar=/^cancelar$|^cancelamento$|cancel(ar|o|a|amento)? .*(consulta|exame|procedimento|agendamento|cirurgia|horario|endoscopia|ultrassom|tsh|excisao|cardio)|desmarc|nao vou (poder|conseguir) (ir|comparecer)|nao poderei (ir|comparecer)|vou faltar/.test(n);
  const querReag=/reagend|remarc|mudar (o |a |meu |minha )?(horario|data|dia)|trocar (o |a |meu |minha )?(horario|data|dia)|outro horario|outra data/.test(n);
  if(querReag&&!/^4$/.test(n)){iniciarPorAcao(ch,'reagendar',achar(n,ativos()));return true}
  if(querCancelar){iniciarPorAcao(ch,'cancelar',achar(n,ativos()));return true}
  return false;
}

function instalar(){
  const prev=window.sendChat;if(typeof prev!=='function'||prev.__agenda93)return false;
  const w=function(ch){
    let handled=false;
    try{
      const inp=document.getElementById(ch==='wa'?'waInput':'appInput');const raw=((inp&&inp.value)||'').trim();
      if(raw&&typeof state!=='undefined'){
        state.sessions=state.sessions||{};
        const st=sess(ch);
        /* trata antes de mostrar a bolha, para só mostrar quando a mensagem é nossa */
        inp.value='';
        try{window.addBubble(ch,raw,true)}catch(e){}
        handled=tratar(ch,raw);
        if(handled==='menu'){handled=false;try{const b=document.getElementById(ch==='wa'?'waBody':'appBody');const rows=b?b.querySelectorAll('.bubble-row.user'):[];const last=rows[rows.length-1];if(last)last.remove()}catch(e){}window.__dcShowAs=raw;inp.value='menu';return prev.apply(this,arguments)}
        if(!handled){
          /* devolve a mensagem para os fluxos anteriores (remove a bolha que mostramos) */
          try{const b=document.getElementById(ch==='wa'?'waBody':'appBody');const rows=b?b.querySelectorAll('.bubble-row.user'):[];const last=rows[rows.length-1];if(last)last.remove()}catch(e){}
          inp.value=raw;
        }
      }
    }catch(e){console.warn('agenda93',e)}
    if(handled){return prev.call(this,ch)} /* entrada vazia: só mantém temporizadores e rolagem dos fluxos anteriores */
    return prev.apply(this,arguments);
  };
  w.__agenda93=true;window.sendChat=w;try{sendChat=w}catch(e){}
  return true;
}
/* instala depois dos outros fluxos (que também envolvem sendChat) */
let k=0;const iv=setInterval(()=>{try{instalar()}catch(e){}if(++k>60)clearInterval(iv)},700);
instalar();

/* atalhos no menu do app: cancelar e reagendar */
function chips(){
  document.querySelectorAll('.dc-sep').forEach(sep=>{
    if(!/Minha consulta/.test(sep.textContent))return;
    const host=sep.parentElement;if(!host||host.querySelector('[data-ag93]'))return;
    const ref=[...host.querySelectorAll('button')].find(b=>/^4 /.test(b.textContent.trim()));
    if(!ref)return;const fn=(ref.getAttribute('onclick')||'').split('(')[0];if(!fn)return;
    [['cancelar consulta ou procedimento','✕ Cancelar consulta ou procedimento'],['reagendar','↻ Reagendar']].reverse().forEach(([cmd,label])=>{const b=document.createElement('button');b.className=ref.className;b.dataset.ag93='1';b.textContent=label;b.setAttribute('onclick',fn+"('"+cmd+"')");ref.insertAdjacentElement('afterend',b)});
  });
}
setInterval(chips,1500);
window.DAISY_AGENDA_ACOES={tratar,horarios,quando};
})();
</script>

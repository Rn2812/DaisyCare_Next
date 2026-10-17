/* ===== DaisyCare v40.69 · melhorias do chat: saudações e intenções, validações, agenda familiar, atalhos, mapa de rota interna ===== */
(function(){
'use strict';
const Q=s=>document.querySelector(s);
const norm=x=>String(x||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[¿?!.,;:]+/g,' ').replace(/\s+/g,' ').trim();
/* mostra o que a pessoa realmente digitou, mesmo quando o comando é reescrito */
const ab0=window.addBubble;
if(typeof ab0==='function'){window.addBubble=function(c,t,u){if(u&&window.__dcShowAs){t=window.__dcShowAs;window.__dcShowAs=null}return ab0.call(this,c,t,u)};try{addBubble=window.addBubble}catch(e){}}
const FAM=[['Patricia Silva Santos','Cardiologia','26/10/2026 às 21:00','Unidade Paulista','confirmada'],['Lucas Silva Santos','Pediatria','03/11/2026 às 09:00','Unidade Paulista','agendada'],['Marina Silva Santos','Dermatologia','10/11/2026 às 15:40','Unidade Paulista','agendada'],['Ana Silva Santos','Geriatria','17/11/2026 às 10:20','Unidade Paulista','agendada']];
const FAQ=[
 [/^(muito )?(obrigad[oa]|valeu|agradeco)/,'De nada, Patricia. Estou aqui quando precisar.','chat69_obrigado'],
 [/^(tchau|ate logo|ate mais|ate breve|encerrar conversa)/,'Até logo, Patricia. Foi um prazer ajudar. Quando precisar, é só chamar a Daisy.','chat69_tchau'],
 [/^(ajuda|me ajuda|socorro|help|o que voce faz|como funciona)$/,'Claro, Patricia. Digite MENU para ver as opções ou escreva em poucas palavras o que você precisa. Para falar com uma pessoa, digite 11.','chat69_ajuda'],
 [/banheiro|toalete|sanitario/,'Os banheiros ficam próximos aos elevadores centrais, em todos os andares, com sinalização. Se precisar de apoio, peça ajuda na recepção.','chat69_faq_banheiro'],
 [/(onde|como).*(cafe|cafeteria|lanchonete|livraria)|\b(cafe|lanchonete)\b.*(fica|onde)/,'A cafeteria interna fica no primeiro andar, próxima ao elevador central, e a livraria fica de frente para o café. Para receber dicas e rotas internas, digite 7.','chat69_faq_cafe'],
 [/convenio|plano de saude|cobertura|autorizacao|carteirinha/,'Dúvidas sobre convênio, cobertura e autorizações são tratadas pela central. Digite 11 para falar com um atendente.','chat69_faq_convenio'],
 [/(marcar|agendar|solicitar|fazer)\s+(um\s+|o\s+|meu\s+)?(exame|ultrassom|ressonancia|tomografia|raio x)/,'Para agendar um exame, a central precisa do pedido médico. Posso mostrar sua agenda atual (digite 3) ou encaminhar você à central (digite 11).','chat69_exame_agendar']
];
const FORA=/\d\s*(x|\*|\+|\/|mais|menos|vezes|dividido( por)?)\s*\d|quanto (e|eh|da|fica|vale) (o |a )?\d|\bquem (e|foi|descobriu|inventou|ganhou|criou)\b|capital d[aeo]|previsao do tempo|vai chover|\bpiada|receita d[eo]|\bfutebol\b|cotacao|dolar|horoscopo|\bletra d[ae] musica|\bfilme\b|\bnovela\b/;
const MAP=[ /* intenção -> comando existente */
 [/^(quero |gostaria de |preciso |posso |como )?(marcar|agendar)( uma| a| minha| nova)?( nova)? (consulta|retorno)/,'4'],
 [/(cancelar|desmarcar)( a| minha| uma)?( consulta| agendamento)?|quero cancelar|trocar( o)? horario|mudar( o)? horario|reagendar|alterar( a)? consulta/,'remarcar'],
 [/quanto( tempo)? falta|vai demorar|tempo de espera|quando (e|sera|eh) (a )?minha vez|minha vez/,'2'],
 [/\bqual\b.*\b(medico|doutor|doutora|especialidade)\b|quem (vai|ira) me atender|quando (e|eh) minha consulta|que horas.*(consulta|minha)|horario da (minha )?consulta/,'3']
];
/* extrai a especialidade de frases como "quero marcar uma consulta com ginecologista" */
function espec(raw){
  let t=String(raw||'').toLowerCase().replace(/[.!?,;:]+/g,' ').replace(/\s+/g,' ').trim();
  const m=t.match(/\b(consultas?|retorno|atendimento|hor[aá]rio|exame)\b\s*(.*)$/);
  t=m?m[2]:t.replace(/^(oi |ol[aá] )?(quero|queria|gostaria de|preciso( de)?|desejo|vou querer|marcar|agendar|fazer)\s+/,'');
  t=t.replace(/^((com|de|da|do|na|no|em|para|pra|a|o|um|uma|o|dr|dra|doutor|doutora|m[eé]dico|m[eé]dica|especialista|especialidade)\s+)+/,'').replace(/\b(por favor|obrigad[oa])\b/g,'').trim();
  if(!t||t.length<4||/^(nova|marcar|agendar|consulta|uma consulta|quero|nao sei|n[aã]o sei)$/.test(t))return '';
  return t.charAt(0).toUpperCase()+t.slice(1);
}
function saud(){const h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite'}
const sc0=window.sendChat;
window.sendChat=function(ch){
  try{
    const inp=ch==='wa'?Q('#waInput'):Q('#appInput');
    const raw=((inp&&inp.value)||'').trim();
    if(raw){
      let n=norm(raw),st=(typeof state!=='undefined'&&state.sessions&&state.sessions[ch])||{};
      const say=(txt,tipo)=>{inp.value='';addBubble(ch,raw,true);reply(ch,txt,tipo||'chat69_aviso')};
      const passAs=(cmd)=>{inp.value=cmd;window.__dcShowAs=raw;return sc0.apply(this,arguments)};
      const livre=/^(menu|sair|voltar|inicio|recomecar|reiniciar|cancelar)$/.test(n);
      if(!livre){
        /* conversa de dicas: comandos do menu principal e de preparos saem dela */
        if(st.flow==='tips_menu'&&st.step==='choice'){
          const isTip=/^[1-5]$/.test(n)||/cafe|cafeteria|livraria|livro|brinquedo|crianca|filho|recepcao|consultorio|shopping|externa|conveniad|menu|voltar|^rotas?( internas?)?$/.test(n);
          if(!isTip){state.sessions[ch]={flow:null,step:null,data:{}};st={}}
        }
        /* Procedimentos e preparos: menu e submenus */
        const PM='Procedimentos e preparos. Escolha uma opção:\n\n1 - Meus procedimentos agendados\n2 - Preparo de exames\n3 - Preparo para procedimentos\n4 - Anexar pedido médico ou receita\n5 - Orientações para quem tem diabetes ou outras condições\n6 - Voltar ao menu principal\n\nDigite o número da opção desejada.';
        const PP='Preparo para procedimentos. Escolha uma opção:\n\n1 - Excisão e pequenas cirurgias ambulatoriais\n2 - Curativos e retirada de pontos\n3 - Procedimentos com sedação\n4 - Voltar a Procedimentos e preparos\n\nDigite o número da opção desejada.';
        const setS=(f)=>{state.sessions[ch]={flow:f,step:'choice',data:{}}};
        const chipPront=(label)=>setTimeout(()=>{const bs=[...document.querySelectorAll(ch==='wa'?'#waBody .bubble':'#appBody .bubble')];const bb=bs[bs.length-1];if(!bb||bb.querySelector('.dc-chip2'))return;const d=document.createElement('div');d.className='dc-chips2';d.style.marginTop='8px';d.innerHTML='<button type="button" class="dc-chip" style="border:1px solid rgba(118,80,232,.45);background:rgba(118,80,232,.08);color:inherit;border-radius:999px;padding:8px 14px;font:700 13px Inter,system-ui,sans-serif;min-height:40px;cursor:pointer">'+label+'</button>';d.firstChild.classList.add('dc-chip2');d.firstChild.onclick=()=>showPage('pront');bb.appendChild(d)},120);
        const passPM=(cmd)=>{state.sessions[ch]={flow:null,step:null,data:{}};return passAs(cmd)};
        if(/^(procedimentos|procedimento|meus procedimentos|procedimentos e preparos|preparos|preparo de exames|preparo de exame|preparo e procedimentos|menu de procedimentos)$/.test(n)){setS('proc_menu');say(PM,'chat69_proc_menu');return}
        else if(st.flow==='proc_menu'){
          if(n==='1'){return passPM('meus procedimentos')}
          if(n==='2'){return passPM('preparo de exames')}
          if(n==='3'){setS('proc_prep');say(PP,'chat69_proc_prep');return}
          if(n==='4'){setS('proc_menu');say('Anexar pedido médico ou receita: abra a página Prontuário digital, escolha o tipo de documento e envie a foto ou o PDF. A Daisy escreve em letra clara o que leu e a equipe de saúde confirma antes de qualquer agendamento. Pedidos e receitas ficam guardados no seu prontuário. A Daisy não interpreta receita nem orienta o uso de medicamentos por conta própria.\n\n'+PM,'chat69_proc_anexo');chipPront('▣ Abrir Prontuário digital');return}
          if(n==='5'){setS('proc_menu');say('Quem tem diabetes, hipertensão, doença renal ou outra condição pode ter um protocolo ajustado para o exame ou procedimento. Esse protocolo é definido pelo médico e fica atrelado ao seu prontuário digital; quem não tem comorbidade segue o protocolo padrão. Veja os protocolos por perfil no Prontuário digital. Nunca ajuste insulina ou outros remédios por conta própria: siga só a orientação escrita do médico.\n\n'+PM,'chat69_proc_perfil');chipPront('▣ Ver protocolos no Prontuário digital');return}
          if(n==='6'){state.sessions[ch]={flow:null,step:null,data:{}};return passAs('menu')}
          setS('proc_menu');say('Escolha uma opção de 1 a 6.\n\n'+PM,'chat69_proc_invalida');return
        }
        else if(st.flow==='proc_prep'){
          const L={'1':'Excisão e pequenas cirurgias ambulatoriais: chegue 60 minutos antes e traga documento com foto, pedido médico e, se houver, exames anteriores. Venha com acompanhante adulto. O jejum só vale se o médico pedir. Informe alergias à equipe. Remédios de uso contínuo seguem a orientação escrita do médico: não suspenda nem troque por conta própria.','2':'Curativos e retirada de pontos: chegue 20 minutos antes com documento e o pedido médico. Use roupa que deixe a área fácil de acessar. Em geral não precisa de jejum. Se tiver dúvida sobre o que sente, fale com a equipe assistencial pela opção 11.','3':'Procedimentos com sedação: o jejum segue o pedido do médico, informado por escrito. Venha com acompanhante adulto, que deve permanecer na unidade. Não dirija depois do procedimento. Traga documento e pedido médico. Medicamentos: só a orientação escrita do médico.'};
          if(L[n]){setS('proc_prep');say(L[n]+'\n\n'+PP,'chat69_proc_prep_item');return}
          if(n==='4'){setS('proc_menu');say(PM,'chat69_proc_menu');return}
          setS('proc_prep');say('Escolha uma opção de 1 a 4.\n\n'+PP,'chat69_proc_invalida');return
        }
        /* Rotas internas direto ao destino (integrado a Cheguei cedo) e jejum/água */
        {
          const dentro=(!st.flow||st.flow==='tips_menu');
          const intent=/\b(rota|rotas|caminho|como (eu )?(chego|chegar|vou|ir)|onde fica|ir (para|pra|ate|a|na|no)|quero ir|me leva)\b/.test(n);
          const fora=/horario|externa|carro|gps|deslocamento|origem|casa|paulista|banheiro|estacionamento|pix|boleto/.test(n);
          const dest=/cafe|cafeteria|livraria/.test(n)?'c':/brinquedoteca/.test(n)?'b':/recepcao/.test(n)?'r':/consultorio|cardiolog|sala do medico/.test(n)?'k':'';
          const generico=/^(rota|rotas|rota interna|rotas internas|rota interna ate o consultorio|rotas internas ate cafe recepcao e consultorio)$/.test(n);
          if(dentro&&intent&&!fora&&(dest||generico)&&!/^[0-9]+$/.test(n)){
            const R={c:'Rotas internas até o café e a livraria: da recepção principal, siga para os elevadores centrais e suba ao primeiro andar. O café fica ao lado do elevador e a livraria, de frente para ele. Eu continuo acompanhando sua fila digital.',
              b:'Rotas internas até a brinquedoteca: da recepção principal, siga para os elevadores centrais e suba ao primeiro andar. A brinquedoteca fica ao lado do café, que tem vista para o espaço. Procure a recepção do espaço para confirmar o acesso.',
              r:'Rotas internas até a recepção: a recepção principal fica no térreo, logo na entrada. Se precisar de apoio, peça ajuda a qualquer profissional do hospital.',
              k:'Rotas internas até o consultório: pela recepção principal, siga para os elevadores centrais. Para cardiologia, permaneça próxima à sinalização da unidade ou peça apoio à recepção.',
              '':'Rotas internas: pela recepção principal, siga para os elevadores centrais. No primeiro andar ficam café e livraria; para cardiologia, permaneça próxima à sinalização da unidade ou peça apoio à recepção.'};
            setS('tips_menu');
            say(R[dest]+'\n\nOutras opções:\n1 - Café e livraria\n2 - Brinquedoteca\n3 - Rotas internas\n4 - Opções externas próximas\n5 - Voltar ao menu principal\n\nDigite o número da opção.','chat69_rota_interna');return
          }
          if(!st.flow&&/\b(fome|sede|lanche|tomar um cafe|comer alguma coisa)\b/.test(n)&&!/exame|jejum|procedimento|sangue/.test(n)){
            setS('tips_menu');
            say('Café e livraria: a cafeteria interna fica no primeiro andar, próxima ao elevador central. A livraria fica de frente para o café e é uma boa opção para aguardar com tranquilidade. Se preferir, posso te orientar pela rota interna.\n\nOutras opções:\n1 - Café e livraria\n2 - Brinquedoteca\n3 - Rotas internas\n4 - Opções externas próximas\n5 - Voltar ao menu principal\n\nDigite o número da opção.','chat69_dica_cafe_livre');return
          }
          if(!st.flow&&/(posso|pode|preciso|tenho que|devo)/.test(n)&&/(agua|cafe|comer|beber|mastigar|jejum)/.test(n)&&/(exame|sangue|coleta|procedimento|colonoscopia|endoscopia|tomografia|ultrassom|jejum)/.test(n)||(!st.flow&&/^(jejum|preciso de jejum|tem jejum)$/.test(n))){
            say('Jejum e água: o preparo muda conforme o exame. Em exames de sangue de rotina, o jejum costuma ser de 8 a 12 horas, só com água. Para colonoscopia, endoscopia e procedimentos com sedação, siga o protocolo escrito que o hospital entregou. Não suspenda remédios por conta própria. Para ver o preparo do seu exame, digite 2 em Procedimentos e preparos, ou diga o nome do exame.\n\n↩ Digite ou fale MENU (ou SAIR) para voltar ao início.','chat69_jejum');return
          }
        }
        /* Conheça a Daisy: a história do nome */
        if(!st.flow&&/^(10|conhecer a daisy|conhecer daisy|quem e a daisy|quem e voce|quem e vc|historia da daisy)$/.test(n)){
          say('Eu sou a Daisy, a assistente virtual do Mater Dei, e meu nome tem uma história curiosa.\n\nNo inglês antigo, a flor se chamava "dæges ēage", o "olho do dia", porque abre ao nascer do sol e fecha ao entardecer. Com o tempo, virou "daisy".\n\nNo latim, a margarida é "Bellis", de "bellus", que quer dizer bonita.\n\nNo grego vem "margarítēs", a pérola. Dele nasceu o nome Margarida, em francês Marguerite, e "Daisy" virou apelido carinhoso de Margaret.\n\nPor isso me chamo Daisy: acolher desde o primeiro raio de sol, com a delicadeza de uma flor e o valor de uma pérola.\n\nAcompanho sua jornada: confirmação, fila, agenda, família, Pix/Boleto, chegada e atendente humano. Digite MENU para ver as opções.','chat69_historia_daisy');return
        }
        /* opção 0: ler as opções em voz alta (só fora de um fluxo; dentro da nota, 0 continua sendo nota) */
        if(!st.flow&&/^(0|zero|ouvir|ouvir as opcoes|quero ouvir|quero ouvir as opcoes|ler as opcoes|ouvir menu|ouvir as opcoes do menu)$/.test(n)){
          say('Certo, Patricia. Vou ler as opções.\n\n1 - Confirmar consulta\n2 - Fila digital\n3 - Agenda\n4 - Marcar nova consulta\n5 - Agenda familiar (com código)\n6 - Pix/Boleto\n7 - Cheguei cedo e quero dicas\n8 - Avaliar o atendimento\n9 - Dúvidas sobre consulta e hospital\n10 - Conhecer a Daisy\n11 - Falar com atendente humano\n\nDigite ou fale o número da opção desejada.','chat69_menu_ouvir');return}
        /* nova consulta: aceita frase falada e extrai a especialidade */
        if(st.flow==='new_consult'&&st.step==='specialty'){
          const sp=espec(raw);
          if(!sp){say('Para marcar uma nova consulta, informe a especialidade desejada.\n\nExemplo: Cardiologista, Pediatria, Dermatologia, Ortopedia ou Clínico geral.','nova_consulta_solicitar_especialidade');return}
          return passAs.apply(this,[sp]);
        }
        /* NPS: só aceita 0 a 10 */
        if(st.flow==='rating'&&st.step==='score'){
          const m=n.match(/^(nota )?(\d{1,2})$/);
          if(!m||+m[2]>10){say('Digite uma nota de 0 a 10, em que 0 é muito insatisfeita e 10 é muito satisfeita.','chat69_nota_invalida');return}
        }
        /* confirmação do e-mail */
        if(st.flow==='finance'&&st.step==='email_confirm'){
          if(!(raw.includes('@')||/^s(im)?$/.test(n)||/confirmo/.test(n))){
            if(/^(nao|n|outro)$/.test(n)){st.step='delivery';say('Sem problemas. Como prefere receber? 1 - E-mail cadastrado, 2 - WhatsApp/SMS, 3 - Ver aqui no chat ou 4 - Baixar arquivo.','chat69_envio_outro');return}
            say('Responda SIM para confirmar o e-mail cadastrado, NÃO para escolher outra forma de envio ou digite outro e-mail completo.','chat69_email_ajuda');return
          }
        }
        /* identidade financeira: CPF que não confere ou mal formatado */
        if(st.flow==='finance'&&st.step==='identity'){
          const dg=raw.replace(/\D/g,'');
          if(dg.length===11&&dg!==patient.cpf){say('Os dados informados não conferem. Confira o CPF e o nome completo e tente novamente.','financeiro_dados_nao_conferem');return}
          if(dg.length>=6&&dg.length!==11){say('Não consegui reconhecer o CPF. Informe os 11 dígitos, com ou sem pontos e traço.','chat69_cpf_formato');return}
        }
        /* nome financeiro que não confere */
        if(st.flow==='finance'&&st.step==='identity'&&!/\d/.test(raw)&&/[a-z]{3,}\s+[a-z]{2,}/.test(n)&&!n.includes('patricia silva santos')){say('Não reconheci o nome completo. Envie como está no cadastro, por exemplo: Patricia Silva Santos.','financeiro_nome_nao_confere');return}
        /* preparo: citar o tipo de exame troca a categoria */
        if(st.flow==='prep'&&!/^\d+$/.test(n)){
          const cat=/sangue/.test(n)?'01':/urina|fezes/.test(n)?'06':/imagem/.test(n)?'03':/cirurgic|microcirurgia/.test(n)?'02':'';
          if(cat){st.step='cat';return passAs.apply(this,[cat])}
        }
        /* agenda familiar: números 1 a 4 mostram cada familiar */
        if(st.flow==='family_list'){
          if(/^[1-4]$/.test(n)){const f=FAM[+n-1];say(f[0]+'\nEspecialidade: '+f[1]+'\nData: '+f[2]+'\nLocal: Mater Dei — '+f[3]+'\nStatus: '+f[4]+'\n\nPara ver outro familiar, digite o número de 1 a 4. MENU volta ao início.','chat69_familiar_detalhe');return}
          state.sessions[ch]={flow:null,step:null,data:{}};
        }
        /* convite de dicas: 1 = quero; outros números seguem o menu principal */
        if(st.flow==='early'&&st.step==='offer'&&/^\d{1,2}$/.test(n)){
          if(n==='1'){return passAs.apply(this,['quero'])}
          state.sessions[ch]={flow:null,step:null,data:{}};
        }
        /* preparo: repetir o pedido não é erro */
        if(st.flow==='prep'&&st.step==='cat'&&/^(preparo( de)? exames?|exames?|preparo)$/.test(n)){inp.value='';addBubble(ch,raw,true);window.openPrepMenu(ch);return}
        const s2=(typeof state!=='undefined'&&state.sessions&&state.sessions[ch])||{};
        if(!s2.flow){
          /* número fora do menu */
          if(/^-?\d+$/.test(n)&&!/^([1-9]|1[01])$/.test(n)){say('Não encontrei essa opção. Digite um número de 1 a 11 ou MENU para ver a lista.','chat69_opcao_numerica');return}
          /* agenda familiar em qualquer forma de pedir */
          if(!/marcar|agendar|nova consulta|remarc|cancel/.test(n)&&(/(agenda|consulta|horario|marcad).*(famil|filh[oa]s?\b|dependente)|(famil|filh[oa]s?\b|dependente).*(agenda|consulta)/.test(n)||/^(familiar|familia|familiares)$/.test(n)))return passAs.apply(this,['5']);
          /* saudações */
          if(/^(oi|ola|ei|e ai|opa|bom dia|boa tarde|boa noite)( |$)/.test(n)&&n.length<=34&&!/consulta|exame|boleto|pix|fila|agenda/.test(n)){
            say('Olá, Patricia! Como posso ajudar? Você pode dizer, por exemplo: "minha consulta", "preparo da endoscopia", "meu boleto" ou "cheguei cedo".','dialogo_saudacao');return}
          for(const f of FAQ){if(f[0].test(n)){say(f[1],f[2]);return}}
          for(const m of MAP){if(m[0].test(n)){
            if(m[1]==='4'){const sp=espec(raw);if(sp&&typeof state!=='undefined'){state.sessions[ch]={flow:'new_consult',step:'specialty',data:{}};return passAs.apply(this,[sp])}}
            return passAs.apply(this,[m[1]])}}
          /* assuntos fora do que a Daisy atende (contas, curiosidades, notícias...) */
          if(FORA.test(n)){say('Desculpe! Não sou programada para responder essa pergunta.','chat69_fora');return}
        }
      }
    }
  }catch(e){console.warn('chat69',e)}
  const r=sc0.apply(this,arguments);
  try{pos(ch)}catch(e){}
  return r;
};
try{sendChat=window.sendChat}catch(e){}

/* pós-processamento da última resposta da Daisy */
function ultimaDaisy(ch){const b=ch==='wa'?Q('#waBody'):Q('#appBody');if(!b)return null;const rows=[...b.querySelectorAll('.bubble-row:not(.user)')];return rows.length?rows[rows.length-1].querySelector('.bubble'):null}
function pos(ch){
  setTimeout(()=>{
    const bb=ultimaDaisy(ch);if(!bb||bb.dataset.p69)return;bb.dataset.p69='1';
    const t=bb.textContent||'';
    if(/^Dados confirmados com segurança\. Código JF-050 validado\./.test(t)){
      try{state.sessions[ch]={flow:'family_list',step:'pick',data:{}}}catch(e){}
      bb.insertAdjacentHTML('beforeend','<br><br>Para ver os detalhes de um familiar, digite o número de 1 a 4.');
    }
    if(/^Rotas internas( até|:)/.test(t))mapaRota(bb);
    chip(ch,bb,t);
  },120);
}
function chip(ch,bb,t){
  const b=bb.closest('.chat-body,.wa-body');if(!b)return;
  b.querySelectorAll('.dc-chips').forEach(x=>x.remove());
  if(!/voltar ao início|volta ao início/.test(t))return;
  const d=document.createElement('div');d.className='dc-chips';
  d.innerHTML='<button type="button" class="dc-chip">↩ Menu</button>';
  d.firstChild.onclick=()=>{const inp=ch==='wa'?Q('#waInput'):Q('#appInput');if(inp){inp.value='menu';window.sendChat(ch)}};
  bb.appendChild(d);
}
function mapaRota(bb){
  if(bb.querySelector('.dc-mapa'))return;
  bb.insertAdjacentHTML('beforeend',`<div class="dc-mapa" role="img" aria-label="Planta ilustrativa: recepção, elevadores centrais e primeiro andar">
<svg viewBox="0 0 340 236" width="100%" style="max-width:360px;display:block;margin-top:10px">
<style>.t{font:600 10px Inter,system-ui,sans-serif;fill:currentColor}.r{fill:rgba(118,80,232,.10);stroke:rgba(118,80,232,.55);stroke-width:1.2}.h{fill:rgba(250,204,21,.28);stroke:#d4a017;stroke-width:1.4}.p{fill:none;stroke:#7650e8;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:7 6;animation:dcd 1.1s linear infinite}@keyframes dcd{to{stroke-dashoffset:-26}}.n{fill:#7650e8}.nn{font:800 10px Inter,sans-serif;fill:#fff}</style>
<text class="t" x="8" y="14" style="font-weight:800">1º andar</text>
<rect class="r" x="8" y="20" width="324" height="84" rx="10"/>
<rect class="r" x="16" y="30" width="62" height="64" rx="6"/><text class="t" x="26" y="66">Elevad.</text>
<rect class="h" x="96" y="30" width="70" height="64" rx="6"/><text class="t" x="108" y="58">Café</text><text class="t" x="102" y="72">Livraria</text>
<rect class="r" x="184" y="30" width="140" height="64" rx="6"/><text class="t" x="200" y="66">Cardiologia (sinalizada)</text>
<text class="t" x="8" y="130" style="font-weight:800">Térreo</text>
<rect class="r" x="8" y="136" width="324" height="84" rx="10"/>
<rect class="r" x="16" y="146" width="62" height="64" rx="6"/><text class="t" x="26" y="182">Elevad.</text>
<rect class="r" x="96" y="146" width="130" height="64" rx="6"/><text class="t" x="132" y="182">Recepção</text>
<rect class="r" x="244" y="146" width="80" height="64" rx="6"/><text class="t" x="262" y="182">Entrada</text>
<path class="p" d="M284 196 L284 214 L161 214 L161 196 M161 178 L47 178 M47 178 L47 62 M47 62 L130 62"/>
<circle class="n" cx="284" cy="196" r="9"/><text class="nn" x="281" y="200">1</text>
<circle class="n" cx="161" cy="196" r="9"/><text class="nn" x="158" y="200">2</text>
<circle class="n" cx="47" cy="120" r="9"/><text class="nn" x="44" y="124">3</text>
<circle class="n" cx="130" cy="62" r="9"/><text class="nn" x="127" y="66">4</text>
</svg>
<ol style="margin:6px 0 2px 18px;padding:0;font-size:12.5px;line-height:1.45"><li>Entre pela recepção principal.</li><li>Siga para os elevadores centrais.</li><li>Suba ao primeiro andar.</li><li>Café e livraria ficam à frente; para cardiologia, siga a sinalização.</li></ol>
<small style="opacity:.7">Planta ilustrativa · dados fictícios</small></div>`);
  const b=bb.closest('.chat-body,.wa-body');if(b)b.scrollTop=b.scrollHeight;
}
const css=`.dc-chips{margin-top:8px}.dc-chip{border:1px solid rgba(118,80,232,.45);background:rgba(118,80,232,.08);color:inherit;border-radius:999px;padding:5px 12px;font:700 12px Inter,system-ui,sans-serif;cursor:pointer}.dc-chip:hover{background:rgba(118,80,232,.18)}.dc-mapa{margin-top:4px}`;
const st=document.createElement('style');st.id='dcUi69';st.textContent=css;document.head.appendChild(st);
/* hora real no cabeçalho do chat */
function hora(){const e=Q('#appchat .chat-status .muted');if(!e)return;const d=new Date();e.textContent='Hoje, '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')+' · App Convênio'}
hora();setInterval(hora,30000);
})();

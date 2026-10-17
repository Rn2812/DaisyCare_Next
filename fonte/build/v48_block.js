/* ===== DaisyCare v40.48 · falas completas por arquivo (pasta falas/) ===== */
(function(){
'use strict';
/* Cada fala: chave = nome do arquivo (falas/<chave>.mp3 ou .wav); tipo = evento do chat que dispara; texto = roteiro para gravar. */
const FALAS=[
 {k:'confirmacao_consulta_completa',t:/^confirmacao consulta$/,txt:'Sua consulta está confirmada, com o cardiologista, dia 26/10 às 21:00, na Unidade Paulista. Qualquer dúvida, estou por aqui!'},
 {k:'agenda_completa',t:/^consulta (agenda|cardio)$|^consulta$/,txt:'Sua próxima consulta é com o cardiologista, dia 26 de outubro, às 21 horas, na Unidade Paulista. Depois dela, você tem exames agendados. Se quiser os detalhes de algum, é só pedir.'},
 {k:'cheguei_cedo_completa',t:/acolhimento chegada antecipada/,txt:'Que bom que você chegou cedo, Patricia! Enquanto espera, posso sugerir um café no primeiro andar ou a brinquedoteca para as crianças. Quer receber algumas dicas?'},
 {k:'menu_inicial_completa',t:/acolhimento inicial daisy|menu chat/,txt:'Olá, eu sou a Daisy. Posso ajudar com sua consulta, fila, agenda, família, pagamentos e dicas. Escolha um número de 1 a 11, ou fale comigo naturalmente.'},
 {k:'pedir_identidade_completa',t:/financeiro solicitar identidade|plano solicitar identidade/,txt:'Para continuar, informe seu nome completo e o CPF. Uso essas informações só para confirmar sua identidade.'},
 {k:'pix_gerado_completa',t:/financeiro pix gerado/,txt:'Pronto! Seu Pix foi gerado. Confira os dados e, se preferir, posso enviar para o seu e-mail ou telefone cadastrado.'},
 {k:'boleto_emitido_completa',t:/financeiro codigo barras emitido/,txt:'Pronto! Seu boleto foi emitido. Se preferir, posso enviar para o seu e-mail ou telefone cadastrado.'},
 {k:'agenda_familiar_completa',t:/agenda familiar (codigo|cpf) recebido/,txt:'Código familiar confirmado. Aqui estão as próximas consultas da sua família.'},
 {k:'nova_consulta_completa',t:/nova consulta solicitar especialidade/,txt:'Claro! Para qual especialidade você quer marcar a consulta?'},
 {k:'nps_pedir_nota_completa',t:/nps solicitar nota/,txt:'Sua opinião é muito importante. De zero a dez, que nota você dá ao atendimento de hoje?'},
 {k:'duvidas_completa',t:/duvidas consulta hospital/,txt:'Pode perguntar! Posso explicar sobre sua consulta, o hospital e o preparo de exames.'},
 {k:'atendente_humano_completa',t:/transbordo humano/,txt:'Vou chamar um atendente humano para continuar com você. Só um instante, por favor.'}
];
const DIR='falas/',EXT=['mp3','wav'],ok={};
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/_/g,' ').trim();
function probe(f){return new Promise(res=>{let i=0;const next=()=>{if(i>=EXT.length)return res(null);const u=DIR+f.k+'.'+EXT[i++];const a=new Audio();a.preload='auto';const done=v=>{a.onloadedmetadata=a.onerror=null;v?res(u):next()};a.onloadedmetadata=()=>done(true);a.onerror=()=>done(false);a.src=u}; next()})}
async function scan(){await Promise.all(FALAS.map(async f=>{const u=await probe(f);if(u)ok[f.k]=u;else delete ok[f.k]}))}
let cur=null;
function stopAll(){try{if(cur){cur.pause();cur=null}}catch(e){}}
function playFile(u){stopAll();const a=new Audio(u);cur=a;a.volume=1;const p=a.play();if(p&&p.catch)p.catch(e=>console.warn('Daisy fala',e));return a}
const V=()=>window.__DAISY_OFFICIAL_VOICE_4035;
const orig=window.speakOfficialDaisy;
if(typeof orig==='function'){
  window.speakOfficialDaisy=async function(text,tipo){
    const v=V();if(!v||!v.active)return false;
    const k=norm(tipo),f=FALAS.find(x=>ok[x.k]&&x.t.test(k));
    if(f){
      try{v.queue=[];if(v.current){const c=v.current;v.current=null;c.onended=null;try{c.stop()}catch(e){}}v.busy=false}catch(e){}
      v.__lastClip=f.k;v.__lastClipAt=Date.now();playFile(ok[f.k]);return true;
    }
    stopAll();return orig.apply(this,arguments);
  };
  try{speakOfficialDaisy=window.speakOfficialDaisy}catch(e){}
  window.speakGold=window.speakGold4034=window.speak=function(t){return window.speakOfficialDaisy(t,'chat_resposta')};
}
window.DAISY_FALAS={lista:FALAS.map(f=>({arquivo:f.k+'.mp3',texto:f.txt})),scan,status:()=>FALAS.map(f=>f.k+': '+(ok[f.k]||'sem arquivo (usa o clipe curto)')).join('\n')};
scan();setTimeout(scan,2500);
})();

/* ===== DaisyCare v40.50 · catálogo de regras de negócio (RN-01 a RN-30) ===== */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* [id, área, título, quando, o que a Daisy/sistema faz, limite/LGPD, indicador] */
const R=[
 ['RN-01','Atendimento','Confirmar consulta (1)','Paciente digita ou fala “1” ou “confirmar”.','Registra a confirmação, atualiza a agenda e responde com especialidade, data, hora e unidade.','Não informa dados clínicos. Só mostra o que é da própria jornada.','Confirmação 24 h'],
 ['RN-02','Atendimento','Fila digital (2)','Paciente pede posição ou “fila”.','Mostra posição, tempo estimado e próximos passos. Avisa quando faltar pouco.','Estimativa é informativa; não promete horário.','Espera média'],
 ['RN-03','Atendimento','Agenda completa (3)','Paciente pede “agenda”.','Diz “vou verificar sua agenda, só um minuto” e lista consultas, exames e procedimentos em ordem de data.','Mostra apenas itens do próprio paciente.','Comparecimento'],
 ['RN-04','Atendimento','Marcar nova consulta (4)','Paciente pede nova consulta.','Valida identidade, pergunta a especialidade e oferece até 3 horários.','Exige nome completo + CPF antes de qualquer horário.','Conversão'],
 ['RN-05','Família','Agenda familiar (5)','Responsável informa o código familiar.','Exige código + CPF do responsável e lista as consultas dos dependentes.','Dependentes só aparecem após o código. Falha pede nova validação sem expor nomes.','Taxa de aceite'],
 ['RN-06','Financeiro','Pix e boleto (6)','Paciente pede pagamento.','Valida nome e CPF; então gera Pix/boleto e oferece enviar por e-mail, telefone cadastrado ou arquivo.','Nunca exibe cobrança antes da validação. CPF e e-mail sempre mascarados.','Receita preservada'],
 ['RN-07','Chegada','Cheguei cedo (7)','Paciente avisa que chegou antes do horário.','Oferece dicas (café, livraria, brinquedoteca) e mantém o lugar na fila.','Não retira o paciente da fila ao sugerir passeios.','Espera percebida'],
 ['RN-08','Qualidade','Avaliar atendimento (8)','Fim do atendimento ou opção 8.','Pede nota de 0 a 10; trata nota inválida pedindo de novo; registra NPS.','Nota fora do intervalo nunca é gravada.','NPS'],
 ['RN-09','Atendimento','Dúvidas (9)','Pergunta sobre consulta, hospital ou preparo.','Responde regras operacionais (horário, local, documentos, preparo).','Dúvida clínica, exame e medicamento vão para a equipe assistencial.','Resolução no 1º contato'],
 ['RN-10','Atendimento','Conhecer a Daisy (10)','Opção 10 ou saudação.','Apresenta a Daisy, o que ela faz e o que ela não faz.','Deixa claro que é assistente virtual.','Uso do canal'],
 ['RN-11','Atendimento','Atendente humano (11)','Opção 11, frustração ou fora do escopo.','Transfere para atendente com resumo da conversa.','Resumo traz só o necessário (minimização).','Transbordo'],
 ['RN-12','Orientação','Preparo de exames','Paciente informa exame ou categoria.','Mostra o preparo por categoria e item (sangue, imagem, endoscopia, cirurgia ambulatorial).','Orientação operacional; o pedido médico prevalece.','Exames sem intercorrência'],
 ['RN-13','Orientação','Rota e chegada','Paciente pede rota ou horário de saída.','Simula cenários (trânsito normal, pico, chuva, mobilidade) e sugere horário de saída.','Localização só com consentimento do paciente.','Atrasos de paciente'],
 ['RN-14','Segurança','Emergência','Sinais de urgência na fala (dor no peito, falta de ar etc.).','Interrompe o fluxo e orienta procurar pronto atendimento ou ligar 192.','Nunca tenta diagnosticar.','Alertas atendidos'],
 ['RN-15','LGPD','Minimização e consentimento','Qualquer coleta de dado.','Pede só o necessário; mascara CPF, e-mail e telefone; registra finalidade.','Retenção mínima; sem dado clínico em log.','Incidentes de dados'],
 ['RN-16','Voz','Fala e modo mudo','Voz ativa pelo botão “Ativar voz”.','Usa a biblioteca de clipes ou a fala completa em falas/ quando existir; respeita o modo mudo.','Nenhum áudio toca sem ativação.','Erros de áudio'],
 ['RN-17','Kids','Espaço Kids','Opção Kids ou pedido de jogos.','Oferece histórias, jogos e desenhos, sem login e sem coleta de dados.','Uso com adulto por perto; sem anúncios.','Uso do Kids'],
 ['RN-18','Médicos','Saída de casa e GPS','Médico faz check-in de saída no app.','Ativa monitor de trajeto com ETA a cada 60 s.','GPS só durante o deslocamento até a unidade; sem rastreio fora disso.','Pontualidade'],
 ['RN-19','Médicos','Atraso por trânsito','ETA maior que a margem da 1ª consulta.','>10 min: avisa recepção · >15 min: Daisy avisa pacientes da 1ª hora · >30 min: aciona cobertura.','Mensagem ao paciente não expõe motivo pessoal do médico.','Atraso médio'],
 ['RN-20','Médicos','Incidente no percurso','Alerta de acidente, pane ou 10 min sem sinal.','Protocolo: contato imediato, confirmação de segurança, apoio e cobertura iniciada em paralelo.','Prioridade é a segurança da pessoa; informação restrita à central.','Incidentes tratados'],
 ['RN-21','Médicos','Emergência pessoal','Médico comunica emergência pessoal.','Libera a agenda e aciona cobertura sem exigir justificativa detalhada.','Motivo registrado como “pessoal”; sem detalhe.','Agendas cobertas'],
 ['RN-22','Cobertura','Escolha do substituto','Gatilho de cobertura aberto.','Ranking: mesma especialidade, escala/sobreaviso, distância, carga do dia e mesma unidade (bônus).','Respeita descanso mínimo e limite de carga.','Tempo de cobertura'],
 ['RN-23','Cobertura','Convite e prazo','Candidato selecionado.','Convida por app e WhatsApp; janela de 5 min; sem resposta, convida o próximo do ranking.','Máximo de 3 convites antes do plano B.','Aceite de cobertura'],
 ['RN-24','Cobertura','Plano B','Ninguém aceita ou não há candidato.','Oferece teleconsulta ou remarcação priorizada por urgência clínica.','Pacientes de urgência alta têm prioridade.','Pacientes sem atendimento'],
 ['RN-25','Cobertura','Aviso aos pacientes','Cobertura confirmada ou plano B.','Daisy avisa por app e WhatsApp: novo profissional, mesmo horário ou opções.','Mensagens padronizadas e revisadas pelo hospital.','Reclamações por atraso'],
 ['RN-26','Controle','SLA de atendimento','Início da consulta registrado.','Cronômetro por paciente; atraso acumulado >20 min reorganiza a agenda e avisa a fila.','SLA por especialidade configurável.','Espera média'],
 ['RN-27','Smart Queue','Encaixe de última hora','Vaga liberada por cancelamento, remarcação ou risco de no-show.','Seleciona pacientes aptos (interesse, distância, tempo de deslocamento) e envia convite.','Só convida quem aceitou receber encaixe.','Encaixes confirmados'],
 ['RN-28','Indicadores','Definições e atualização','Atualização automática (30 s) e carga do modelo.','KPIs seguem as medidas do modelo Power BI; metas são parâmetros; fonte e data sempre visíveis.','Dados agregados; sem identificação de paciente no painel.','Frescor dos dados'],
 ['RN-29','Auditoria','Evento e correlação','Toda ação relevante.','Grava tipo_evento, chave_negocio, correlation_id, status e horário em formato MongoDB.','Payload mínimo; acesso por perfil.','Eventos sem erro'],
 ['RN-30','Governança','Falas e versões','Nova fala ou mudança de texto.','Toda fala nova entra no roteiro (TXT), recebe ID e passa por revisão antes de virar áudio.','Tom acolhedor; sem promessa clínica.','Falas aprovadas']
];
const css=`
#rules2{margin-top:22px}
#rules2 .rf{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:12px 0}
#rules2 .rf input{flex:1 1 260px;padding:10px 14px;border-radius:14px;border:1px solid var(--line);background:var(--card2);color:var(--ink);font:600 13px var(--font)}
#rules2 .chips{display:flex;gap:6px;flex-wrap:wrap}
#rules2 .ch{border:1.5px solid var(--line);background:var(--card2);color:var(--ink);border-radius:999px;padding:6px 13px;font:800 11.5px var(--font);cursor:pointer}
#rules2 .ch.on{background:var(--primary);border-color:var(--primary);color:#fff}
#rules2 .rg{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:14px}
#rules2 .rc{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:16px 18px;box-shadow:var(--shadow)}
#rules2 .rc .rh{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:6px}
#rules2 .rc .id{font:800 11px var(--mono);color:var(--primary);background:var(--soft);padding:3px 9px;border-radius:999px}
#rules2 .rc .ar{font:800 10px var(--font);letter-spacing:.09em;text-transform:uppercase;color:var(--muted)}
#rules2 .rc h4{margin:2px 0 8px;font:800 15px var(--font);color:var(--ink)}
#rules2 .rc dl{margin:0;font:600 12px/1.5 var(--font);color:var(--ink)}
#rules2 .rc dt{font:800 9.5px var(--font);letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin-top:8px}
#rules2 .rc dd{margin:1px 0 0}
#rules2 .rc .kp{display:inline-block;margin-top:10px;font:800 11px var(--font);background:rgba(21,153,101,.12);color:var(--good,#159965);padding:4px 10px;border-radius:999px}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
let area='Todas',q='';
function draw(){
  const g=$('#rulesGrid');if(!g)return;
  const L=R.filter(r=>(area==='Todas'||r[1]===area)&&(!q||r.join(' ').toLowerCase().includes(q)));
  $('#rulesCount').textContent=L.length+' de '+R.length+' regras';
  g.innerHTML=L.map(r=>'<div class="rc"><div class="rh"><span class="id">'+r[0]+'</span><span class="ar">'+esc(r[1])+'</span></div><h4>'+esc(r[2])+'</h4><dl><dt>Quando acontece</dt><dd>'+esc(r[3])+'</dd><dt>O que a Daisy e o sistema fazem</dt><dd>'+esc(r[4])+'</dd><dt>Limite e LGPD</dt><dd>'+esc(r[5])+'</dd></dl><span class="kp">Indicador: '+esc(r[6])+'</span></div>').join('')||'<p class="muted">Nenhuma regra encontrada.</p>';
}
function build(){
  const sec=$('#rules');if(!sec||$('#rules2'))return;
  const areas=['Todas',...new Set(R.map(r=>r[1]))];
  const w=document.createElement('div');w.id='rules2';
  w.innerHTML='<div class="section-head section-head-compact"><div><small>catálogo completo</small><h2>Regras RN-01 a RN-30</h2><p class="muted">Cada regra diz quando acontece, o que a Daisy e o sistema fazem, o limite (incluindo LGPD) e qual indicador acompanha. Inclui as novas regras de acompanhamento dos médicos, cobertura de agenda, Kids, voz e indicadores.</p></div><span class="pill" id="rulesCount"></span></div><div class="rf"><input id="rulesQ" placeholder="Buscar regra (ex.: atraso, CPF, Pix, cobertura)" aria-label="Buscar regra"><div class="chips">'+areas.map(a=>'<button class="ch'+(a==='Todas'?' on':'')+'" data-a="'+a+'">'+a+'</button>').join('')+'</div></div><div class="rg" id="rulesGrid"></div>';
  sec.appendChild(w);
  $('#rulesQ').oninput=e=>{q=e.target.value.trim().toLowerCase();draw()};
  w.querySelectorAll('.ch').forEach(b=>b.onclick=()=>{area=b.dataset.a;w.querySelectorAll('.ch').forEach(x=>x.classList.toggle('on',x===b));draw()});
  draw();
}
function init(){build();setTimeout(build,1500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,800));else setTimeout(init,800);
window.DAISY_REGRAS=R;
})();

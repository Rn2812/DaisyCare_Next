import json
import os
W=os.path.dirname(os.path.abspath(__file__))+'/'
s=open(W+'../base/DaisyCare_App_v40_51_Falas_Novas.html',encoding='utf-8').read()
cat=open(W+'falas_catalogo.json',encoding='utf-8').read()
js=open(W+'v51_extras.js',encoding='utf-8').read().replace('__FALAS_CAT__',cat)
s=s.replace('V40.50','V40.55').replace('v40.50','v40.55').replace('v40.51','v40.55')
assert s.count("stopAll();return orig.apply(this,arguments);")==1
AF="    if(f){\n      try{v.queue=[];"
assert s.count(AF)==1
s=s.replace(AF,"    if(f&&window.__dcFalaTexto&&window.__dcFalaTexto(text,tipo,v,stopAll,f.k))return true;\n"+AF)
s=s.replace("stopAll();return orig.apply(this,arguments);","stopAll();if(window.__dcFalaTexto&&window.__dcFalaTexto(text,tipo,v,stopAll,''))return true;return orig.apply(this,arguments);")
A0="if(K(/alerta emergencia/)||T(/procure imediatamente o pronto atendimento"
assert s.count(A0)==1
s=s.replace(A0,"if(K(/agenda familiar (solicitar|validacao pendente)/))return ['security_verify','confirm_family','confirm_cpf'];if(K(/financeiro (solicitar identidade|validacao pendente)/))return ['security_verify','confirm_cpf'];if(K(/agenda familiar validada/))return ['data_ok','agenda_items'];if(K(/acolhimento chegada (antecipada|perfil)|acolhimento dicas (menu|convite)|nova consulta (solicitar|opcoes|reservada)/))return [];"+A0)
nova="""{k:'agenda_familiar_pedir_codigo',t:/agenda familiar solicitar codigo cpf/,txt:'A agenda da família é protegida. Me informe o código familiar e o CPF do responsável, juntos ou separados.'},
 {k:'agenda_familiar_lista',t:/agenda familiar validada/,txt:'Dados confirmados. Aqui está a agenda da família. Patricia, cardiologia dia 26 de outubro às 21 horas. Lucas, pediatria dia 3 de novembro às 9 horas. Marina, dermatologia dia 10 de novembro às 15 e 40. Ana, geriatria dia 17 de novembro às 10 e 20.'},
 {k:'dicas_perfil_chegada',t:/acolhimento chegada perfil/,txt:'Perfeito, Patricia. Para eu te orientar melhor, me diga como você está aguardando: sozinha, com seu filho, com acompanhante adulto, ou com mobilidade reduzida.'},
 {k:'dicas_menu_espera',t:/acolhimento dicas menu/,txt:'Enquanto você aguarda, posso te orientar sobre café e livraria, brinquedoteca, rotas internas ou opções externas próximas. Qual você prefere?'},
 {k:'atendente_humano_completa'"""
assert s.count("{k:'atendente_humano_completa'")==1
s=s.replace("{k:'atendente_humano_completa'",nova)
old="Patricia, por segurança, procure imediatamente o pronto atendimento mais próximo ou acione o serviço de emergência. Não aguarde resposta pelo chat. Vou registrar este alerta como prioridade assistencial."
assert old in s
s=s.replace(old,"Isso pode ser urgente. Procure imediatamente o pronto atendimento mais próximo ou ligue 192.")
assert "t:/^alerta emergencia$/" in s
s=s.replace("t:/^alerta emergencia$/","t:/^alerta emergencia/")

# --- v40.53: fluxo médico transparente (estilo n8n)
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(old[:60],s.count(old))
    s=s.replace(old,new)
rep("const COL={ok:['#dcfce7','#16a34a'],wait:['#fef3c7','#d97706'],bad:['#fee2e2','#dc2626'],info:['#e0f2fe','#0284c7'],pur:['#ede9fe','#7c3aed'],dec:['#fff7ed','#ea580c'],db:['#f1f5f9','#475569']};",
    "const COL={ok:['rgba(34,197,94,.12)','#16a34a'],wait:['rgba(245,158,11,.14)','#d97706'],bad:['rgba(239,68,68,.12)','#dc2626'],info:['rgba(14,165,233,.12)','#0284c7'],pur:['rgba(124,58,237,.12)','#7c3aed'],dec:['rgba(234,88,12,.12)','#ea580c'],db:['rgba(100,116,139,.14)','#64748b']};")
rep("#wf2 .nd .t{font:800 12.5px var(--font);fill:#2f2851}","#wf2 .nd .t{font:800 12.5px var(--font);fill:var(--ink)}")
rep("#wf2 .nd .s{font:600 10.5px var(--font);fill:#5b5280}","#wf2 .nd .s{font:600 10.5px var(--font);fill:var(--muted)}")
rep(".dark #wf2 .nd .t{fill:#fff4d7}.dark #wf2 .nd .s{fill:#d8caa7}","#wf2 .lane{fill:rgba(124,58,237,.04)}#wf2 .lane-t{fill:var(--ink)}#wf2 .wf2-svgwrap{background:var(--card)}")
rep("a3:{x:490,y:56,w:170,h:82,","a3:{x:480,y:52,w:190,h:92,")
rep("b3:{x:490,y:256,w:170,h:82,","b3:{x:480,y:252,w:190,h:92,")
rep("x=\"'+(28+l[1].length*7.6)+'\"","x=\"'+(46+l[1].length*8.4)+'\"")
rep("return 'M810 34 L810 25 L18 25 L18 297 L30 297'","return 'M810 34 L810 9 L18 9 L18 297 L30 297'")
rep('viewBox="0 0 1240 590"','viewBox="0 -16 1240 606"')
rep("x=\"420\" y=\"21\" fill","x=\"420\" y=\"6\" fill")
old_t="svg+='<g class=\"nd\">'+shape+'<text class=\"t\" x=\"'+cx+'\" y=\"'+(cy-(ls.length*6)+(o.d?-2:-2))+'\" text-anchor=\"middle\">'+esc(o.t)+'</text>'+ls.map((l,i)=>'<text class=\"s\" x=\"'+cx+'\" y=\"'+(cy-(ls.length*6)+16+i*12.5)+'\" text-anchor=\"middle\">'+esc(l)+'</text>').join('')+'</g>';"
assert old_t in s
new_t="const L2=o.d?wrap(o.s,24).slice(0,1):ls;const ty=o.d?cy-3:(cy-(ls.length*6)-2);svg+='<g class=\"nd\">'+shape+'<text class=\"t\" x=\"'+cx+'\" y=\"'+ty+'\" text-anchor=\"middle\">'+esc(o.t)+'</text>'+L2.map((l,i)=>'<text class=\"s\" x=\"'+cx+'\" y=\"'+(o.d?cy+13:(cy-(ls.length*6)+16+i*12.5))+'\" text-anchor=\"middle\">'+esc(l)+'</text>').join('')+'</g>';"
s=s.replace(old_t,new_t)


# --- v40.54: fontes de mercado verificadas (página Operação)
i0=s.index("const FONTES=[");i1=s.index("function buildOperation")
NEWF="""const FONTES=[
 ['ByDoctor','No-show normal em clínicas brasileiras: 10% a 30%; média perto de 25%; abaixo de 15% é bom alvo para clínicas privadas.','https://bydoctor.com.br/blog/taxa-de-no-show-clinica-o-que-e-normal-como-melhorar'],
 ['AGC Orflie','Metas sugeridas: no-show abaixo de 5%, confirmação acima de 80%, reposição acima de 60%; confirmação dupla 24 h e 2 h antes.','https://agc.orflie.group/blog/como-reduzir-no-show-em-clinicas.html'],
 ['Koee','Confirmação ativa 48 h antes reduz faltas em 30% a 40%; lista de espera ativa preenche cerca de 80% das vagas em até 24 h. Sem estudo citado: estimativa do setor.','https://koee.com.br/blog/como-reduzir-no-show-em-consultas-9-estrategias-praticas-para-clinicas/'],
 ['Grupo Dama Health','Confirmação em dois estágios: 48 h antes e lembrete final 2 h antes, com endereço e mapa.','https://grupodamahealth.com.br/blog/como-reduzir-faltas-no-consultorio'],
 ['O Povo · Sesa Ceará','Faltas de 35,5% (2024) para 23,2% (mar–ago/2025) com lembretes por WhatsApp: −12,3 pontos percentuais.','https://www.opovo.com.br/noticias/ceara/2025/12/02/faltas-de-pacientes-a-consultas-em-hospitais-do-ceara-caem-12-apos-lembretes-por-whatsapp.html'],
 ['Correio da Manhã · SES-RJ','Faltas de 43% (2025) para 32% com a assistente Serena no WhatsApp.','https://www.correiodamanha.com.br/estado-do-rio/2026/06/290301-assistencia-virtual-reduz-ausencias-nas-redes-de-saude.html'],
 ['Prefeitura de Porto Alegre','Cerca de 13% das consultas especializadas perdidas em 2025 (45.607); confirmação por WhatsApp em 24 h.','https://www.prefeitura.poa.br/sms/noticias/mais-de-45-mil-consultas-especializadas-foram-perdidas-por-faltas-de-pacientes-em-2025'],
 ['Cochrane (2013)','Lembrete por mensagem de celular: chance 14% maior de comparecer (RR 1,14), em 8 ensaios com 6.615 pessoas.','https://www.cochrane.org/evidence/CD007458_mobile-phone-messaging-reminders-attendance-healthcare-appointments']];
"""
s=s[:i0]+NEWF+s[i1:]
rep("FONTES.map(f=>'<li><a href=\"'+f[1]+'\" target=\"_blank\" rel=\"noopener\">'+esc(f[0])+'</a></li>').join('')+'</ul></div>';",
    "FONTES.map(f=>'<li><a href=\"'+f[2]+'\" target=\"_blank\" rel=\"noopener noreferrer\"><b>'+esc(f[0])+' ↗</b></a><br><span class=\"muted\">'+esc(f[1])+'</span></li>').join('')+'</ul><p class=\"muted dc-src\" style=\"margin:8px 0 0\">Casos e estudos de outros países estão na página Indicadores de mercado.</p></div>';")
rep("<strong>20–30%</strong><span>clínicas sem confirmação ativa; média brasileira perto de 25%</span>","<strong>10–30%</strong><span>faixa normal em clínicas brasileiras; média perto de 25% (ByDoctor)</span>")
rep("<small>rede pública · exemplo</small><strong>21,4%</strong><span>absenteísmo em rede municipal paulista (2026)</span>","<small>rede pública · Ceará</small><strong>35,5% → 23,2%</strong><span>faltas nos hospitais estaduais, 2024 contra mar–ago/2025, com lembretes por WhatsApp</span>")
rep("<strong>−30 a −40%</strong><span>nas faltas, segundo fontes do setor; Ceará registrou −19% com WhatsApp</span>","<strong>−30 a −40%</strong><span>estimativa do setor para confirmação ativa 48 h antes (Koee). No RJ, a assistente no WhatsApp levou as faltas de 43% a 32%</span>")
rep("São fontes secundárias do setor. Use como referência","São referências do setor e reportagens, não auditorias. Use como referência")

# --- BI v40.52: troca o bloco antigo pelo novo
i=s.index('/* ===== DaisyCare v40.55 · Indicadores operacionais');i0=s.rfind('<script>',0,i);i1=s.index('</script>',i)+len('</script>')
bi=open(W+'v52_bi.js',encoding='utf-8').read().replace('__BI_DATA__',open(W+'bi_data.json',encoding='utf-8').read())
s=s[:i0]+'<script>\n'+bi+'\n</script>'+s[i1:]
# --- avatares com o coração coreano roxo
import base64
A=W+'avatares/'
def b64(f):return base64.b64encode(open(f,'rb').read()).decode()
for i in (0,1,2,4,5):
    for old,new in (('orig_avatar_%d.webp'%i,'avatar_%d.webp'%i),('orig_corpo_%d.webp'%i,'corpo_%d.webp'%i)):
        o,n=b64(A+old),b64(A+new);assert o in s,old;s=s.replace(o,n)
assert s.count('</body>')==1
wa=open(W+'v52_wa.js',encoding='utf-8').read()+'\n</script>\n<script>\n'+open(W+'v53_ux.js',encoding='utf-8').read()
top=open(W+'v55_top.js',encoding='utf-8').read()+'\n</script>\n<script>\n'+open(W+'v57_voz.js',encoding='utf-8').read().replace('__OPT__',open(W+'opt_map.json').read()).replace('__RULES__',__import__('json').dumps(__import__('rules70').RULES,ensure_ascii=False)).replace('__SEC__',__import__('base64').b64encode(open(W+'sec_trim.mp3','rb').read()).decode()).replace('__AUTO_HASHES__',open(W+'auto_hashes.json').read() if __import__('os').path.exists(W+'auto_hashes.json') else '[]')+'\n</script>\n<script>\n'+open(W+'v68_ui.js',encoding='utf-8').read()+'\n</script>\n<script>\n'+open(W+'v69_chat.js',encoding='utf-8').read();mk=open(W+'v56_market.js',encoding='utf-8').read()
gold=open(W+'v54_gold.js',encoding='utf-8').read().replace('__N8N_BUNDLE__',open(W+'n8n_bundle.json',encoding='utf-8').read())
fonts=open(W+'fonts.css',encoding='utf-8').read()
s=s.replace('</body>','<style id="dcFonts">\n'+fonts+'</style>\n<script>\n'+js+'\n</script>\n<script>\n'+wa+'\n</script>\n<script>\n'+gold+'\n</script>\n<script>\n'+mk+'\n</script>\n<script>\n'+top+'\n</script>\n</body>')

OLD="state.sessions[ch]={flow:null,step:null,data:{especialidade:text}};reply(ch,`Encontrei 3 opções para ${text}:"
NEW="state.sessions[ch]={flow:'new_consult',step:'slot',data:{especialidade:text}};reply(ch,`Encontrei 3 opções para ${text}:"
rep(OLD,NEW)
OLD2=" if(s.flow==='family'&&s.step==='code_cpf'){"
NEW2=""" if(s.flow==='new_consult'&&s.step==='slot'){const n=pickNum(text);const O={'1':['28/10/2026','08:20','Unidade Paulista'],'2':['29/10/2026','14:40','Unidade Paulista'],'3':['30/10/2026','16:10','Teleconsulta']};if(O[n]){const e=s.data.especialidade;state.sessions[ch]={flow:null,step:null,data:{}};reply(ch,`Pronto, Patricia! Reservei a opção ${n} de ${e}: ${O[n][0]} às ${O[n][1]}, ${O[n][2]}.\n\nA confirmação final chega por mensagem. Pré-agendamento simulado no sistema.`,'nova_consulta_reservada',{especialidade:e,opcao:n});return true}state.sessions[ch]={flow:null,step:null,data:{}};return false}
 if(s.flow==='family'&&s.step==='code_cpf'){"""
rep(OLD2,NEW2)

import re as _re
for _o,_n in [("Voz da Daisy ativada para esta sessão. Não será necessário ativar novamente até recarregar a página.","Serviço de voz ativo."),("Voz da Daisy já está ativa nesta sessão.","Serviço de voz ativo."),("A voz oficial da Daisy já está ativa nesta sessão.","Serviço de voz ativo."),("Voz da Daisy mantida no mudo","Serviço de voz desligado"),("Voz da Daisy silenciada","Serviço de voz desligado"),("Voz da Daisy ativada","Serviço de voz ativo"),("Voz Daisy ativada","Serviço de voz ativo"),("Voz Daisy mutada","Serviço de voz desligado"),("Ativar voz Daisy","Ativar serviço de voz"),("Voz oficial Daisy ativa","Serviço de voz ativo"),("Ativar voz oficial Daisy","Ativar serviço de voz"),("daisycare · mvp simulado","daisycare · dados fictícios"),("DaisyCare · Mater Dei | MVP Operacional v40.30","DaisyCare · Mater Dei"),("DaisyCare · Mater Dei · MVP Off line","DaisyCare · Mater Dei"),("DaisyCare · Mater Dei | MVP Off line","DaisyCare · Mater Dei"),("Mater Dei · MVP Off line","Mater Dei · Assistente digital"),("Mater Dei · MVP v40.55","Mater Dei · Assistente digital"),("Mater Dei · MVP v39","Mater Dei · Assistente digital"),("principais regras do MVP","principais regras do sistema"),("implantados e simulados no MVP","implantados e simulados"),("base consolidada do MVP","base consolidada"),("BI do MVP DaisyCare","BI da DaisyCare"),("Modelo Ouro · MVP híbrido","Modelo Ouro · híbrido"),("páginas do MVP","páginas do sistema"),("alvo do MVP abaixo","alvo abaixo"),("agenda assistencial no MVP:","agenda assistencial:"),("usada neste MVP","usada neste hospital"),("neste MVP","neste sistema"),("Chegada recomendada no MVP","Chegada recomendada no hospital"),("Envio simulado no MVP","Envio simulado no sistema"),("valores simulados no MVP","valores simulados"),("Workflows n8n do MVP DaisyCare","Workflows n8n DaisyCare"),("desempenho do MVP","desempenho do sistema"),("Simulação do MVP","Simulação"),("sugestões do MVP","sugestões do sistema"),("Regra do MVP","Regra do sistema"),("trilha de eventos do MVP","trilha de eventos do sistema"),("MVP simulado","Dados fictícios"),("Sobre o MVP","Sobre o sistema"),("Demonstração simulada (MVP).","Demonstração simulada.")]:
    s=s.replace(_o,_n)
exec(open(W+'kids68.py',encoding='utf-8').read())
exec(open(W+'patch69.py',encoding='utf-8').read())
_left=[m.start() for m in _re.finditer(r'(?<![A-Za-z0-9+/])MVP(?![A-Za-z0-9+/])|MVP Off',s)]
print('MVP restantes:',len(_left))
for _i in _left[:30]:print('   ',repr(s[max(0,_i-70):_i+40]))
import re as _r2
_m=[l for l in s.split('\n') if 'class="card timeline-card-v4018"' in l]
assert len(_m)==1 and _m[0].rstrip().endswith('</div>'),len(_m)
s=s.replace(_m[0]+'\n','',1)
for _q in ('timeline-v4018','timelineV4018'):
    print('refs',_q,len(_r2.findall(r"querySelector[^;]{0,60}"+_q,s)))
assert s.count('</body>')==1
s=s.replace('</body>','<script>\n'+open(W+'v79_arq.js',encoding='utf-8').read()+'\n</script>\n<script>\n'+open(W+'v80_pront.js',encoding='utf-8').read()+'\n</script>\n</body>')

# --- v40.85: Próxima consulta larga + GPS com rota de carro; fila coerente (5)
_a=s.index('<div class="grid two"><div class="card"><span class="kicker">Próxima consulta</span>')
_z=s.index('\n',_a)
_old=s[_a:_z]
assert 'chamada próxima' in _old and _old.rstrip().endswith('</div>')
import urllib.parse as _up
_O='-23.4853868,-46.6037192';_D='-23.5614329,-46.6558848'
_emb='https://www.google.com/maps?saddr='+_up.quote_plus(_O)+'&daddr='+_up.quote_plus(_D)+'&dirflg=d&hl=pt-BR&output=embed'
_gm='https://www.google.com/maps/dir/?api=1&origin='+_up.quote(_O)+'&destination='+_up.quote(_D)+'&travelmode=driving'
_wz='https://waze.com/ul?ll='+_D+'&navigate=yes'
_new=('<div class="card consulta-wide"><span class="kicker">Próxima consulta</span><h3>Acompanhamento cardiológico às 21h</h3><div class="consult-grid consult-4">'
 '<div class="data-box"><small>Data</small><strong>26.10.26</strong><span>segunda-feira</span></div>'
 '<div class="data-box"><small>Especialidade</small><strong>Cardiologia</strong><span>consulta cardiológica</span></div>'
 '<div class="data-box"><small>Médica</small><strong>Dra. Ana Ferreira</strong><span>CRM 123456/SP</span></div>'
 '<div class="data-box"><small>Unidade</small><strong>Mater Dei — Paulista</strong><span>Av. Paulista, 504</span></div></div></div>'
 '<div class="card gps-card" id="gpsCard"><span class="kicker">GPS · rota de carro até o hospital</span>'
 '<div class="gps-fields"><div class="gps-f"><small>De: origem</small><strong>Rua Borges Ladário, 32 · Parada Inglesa · São Paulo - SP</strong></div>'
 '<div class="gps-f"><small>Para: destino</small><strong>Hospital Mater Dei Paulista · ponto de exemplo no mapa</strong></div></div>'
 '<div class="gps-map"><svg class="gps-fb" viewBox="0 0 600 200" aria-hidden="true"><path d="M60 150 C160 150 170 60 280 70 S440 150 540 50" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 10" opacity=".55"/><circle cx="60" cy="150" r="9" fill="#16a34a"/><circle cx="540" cy="50" r="9" fill="#dc2626"/></svg>'
 '<p class="gps-off" id="gpsOff">O mapa aparece quando o aparelho está conectado à internet.</p>'
 '<div id="gpsLeaf" role="img" aria-label="Mapa com a rota de carro até o Hospital Mater Dei Paulista"></div><iframe title="Mapa com a rota de carro da origem até o Hospital Mater Dei Paulista" tabindex="-1" scrolling="no" referrerpolicy="no-referrer-when-downgrade" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" data-src="'+_emb+'"></iframe></div>'
 '<p class="gps-info" id="gpsInfo" aria-live="polite"></p><div class="gps-act"><a class="btn" href="'+_gm+'" target="_blank" rel="noopener noreferrer">Abrir rota no Google Maps</a><a class="btn ghost" href="'+_wz+'" target="_blank" rel="noopener noreferrer">Abrir no Waze</a></div></div>')
s=s[:_a]+'<div class="consulta-gps">'+_new+'</div>'+s[_z:]
assert s.count("Fila digital consultada. Posição nº 1.")==1
s=s.replace("Fila digital consultada. Posição nº 1.","Fila digital consultada. Posição nº 5.")
_css="""<style id="dcHome85">
.consulta-wide{grid-column:1/-1}
.consulta-gps .consult-4.consult-grid,#patient .consulta-gps .consult-4.consult-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important}
.consult-4.consult-grid .data-box small{font-size:12px!important}
.consult-4.consult-grid .data-box strong{font-size:14px!important}
.consult-4.consult-grid .data-box span{font-size:12.5px!important}
.consulta-gps{display:grid;gap:16px;margin-bottom:16px}
.gps-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:10px 0 12px}
.gps-f{border:1px solid var(--line);border-radius:14px;padding:10px 14px;background:rgba(124,58,237,.06)}
.gps-f small{display:block;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.gps-f strong{display:block;font-size:15px;margin-top:2px}
.gps-map{contain:layout paint;overflow-anchor:none;position:relative;height:340px;border-radius:16px;overflow:hidden;border:1px solid var(--line);background:rgba(124,58,237,.05);color:#7c3aed}
.gps-map iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}
.gps-fb{position:absolute;inset:0;width:100%;height:100%}
.gps-off{position:absolute;left:0;right:0;bottom:14px;text-align:center;font-size:13px;color:var(--muted);margin:0}
.gps-info{margin:10px 0 0;font-size:14px;font-weight:600}
#gpsLeaf{position:absolute;inset:0;z-index:2;display:none}.gps-map iframe{display:none}
.gps-act{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}
.gps-act .btn{text-decoration:none;display:inline-flex;align-items:center;min-height:44px}
@media(max-width:700px){#patient .consulta-gps .consult-4.consult-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
@media(max-width:900px){.gps-fields{grid-template-columns:1fr}.gps-map{height:280px}}
</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css">
<script>(function(){
var card=document.getElementById('gpsCard');if(!card)return;
var box=document.getElementById('gpsLeaf'),info=document.getElementById('gpsInfo'),off=document.getElementById('gpsOff'),fr=card.querySelector('iframe');
var started=false;
var ORIG={lat:-23.4853868,lon:-46.6037192,exact:true},DEST={lat:-23.5614329,lon:-46.6558848,exact:true};
function loadLeaflet(){return new Promise(function(ok,no){if(window.L)return ok();var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function fallback(){box.style.display='none';if(navigator.onLine!==false&&fr&&fr.getAttribute('data-src')){fr.style.display='block';fr.setAttribute('src',fr.getAttribute('data-src'));off.style.display='none'}}
function start(){if(started||navigator.onLine===false)return;started=true;
 Promise.all([loadLeaflet(),ORIG,DEST]).then(function(r){var o=r[1],d=r[2];
  return fetch('https://router.project-osrm.org/route/v1/driving/'+o.lon+','+o.lat+';'+d.lon+','+d.lat+'?overview=full&geometries=geojson&alternatives=false&steps=false').then(function(x){return x.json()}).then(function(j){
   if(!j.routes||!j.routes[0])throw new Error('route');var rt=j.routes[0];
   box.style.display='block';off.style.display='none';
   var map=L.map(box,{scrollWheelZoom:false,attributionControl:true});map.setView([(o.lat+d.lat)/2,(o.lon+d.lon)/2],12);
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);
   var line=L.geoJSON(rt.geometry,{style:{color:'#4f46e5',weight:6,opacity:.9}}).addTo(map);
   L.circleMarker([o.lat,o.lon],{radius:9,color:'#fff',weight:3,fillColor:'#16a34a',fillOpacity:1}).addTo(map).bindTooltip('De: Rua Borges Ladário, 32',{permanent:false});
   L.circleMarker([d.lat,d.lon],{radius:9,color:'#fff',weight:3,fillColor:'#dc2626',fillOpacity:1}).addTo(map).bindTooltip('Para: Hospital Mater Dei Paulista (ponto de exemplo)',{permanent:false});
   map.fitBounds(line.getBounds(),{padding:[24,24]});setTimeout(function(){map.invalidateSize();map.fitBounds(line.getBounds(),{padding:[24,24]})},300);
   var km=(rt.distance/1000).toFixed(1).replace('.',','),min=Math.round(rt.duration/60);
   info.textContent='Rota de carro: '+km+' km · cerca de '+min+' min sem trânsito'+((o.exact&&d.exact)?'':' · pontos aproximados')+'.';
  })}).catch(function(e){try{console.warn('gps',e&&e.message)}catch(_){}started=false;fallback()})}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){start();io.disconnect()}})},{threshold:0.2});io.observe(card)}else{setTimeout(start,1500)}
window.addEventListener('online',function(){start()});
})();</script>
"""
assert s.count('</body>')==1
s=s.replace('</body>',_css+'</body>')
os.makedirs(W+'saida',exist_ok=True)
open(W+'saida/DaisyCare_App_v40_91_Voz_Natural.html','w',encoding='utf-8').write(s)
print(len(s)/1e6)

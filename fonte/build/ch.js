function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function choose(text,tipo){
    const t=norm(text), k=norm(tipo).replace(/_/g,' '), T=r=>r.test(t), K=r=>r.test(k);
    if(K(/agenda familiar (solicitar|validacao pendente)/))return ['security_verify','confirm_family','confirm_cpf'];if(K(/financeiro (solicitar identidade|validacao pendente)/))return ['security_verify','confirm_cpf'];if(K(/agenda familiar validada/))return ['data_ok','agenda_items'];if(K(/acolhimento chegada (antecipada|perfil)|acolhimento dicas (menu|convite)|nova consulta (solicitar|opcoes|reservada)/))return [];if(K(/alerta emergencia/)||T(/procure imediatamente o pronto atendimento|situacao de urgencia/))return 'urgent';
    if(T(/medicament|suspensao|anticoagul|insulina/)&&T(/nao (posso|devo)|nao interpret/))return 'medication_safety';
    if(K(/transbordo assistencia/))return 'clinical_confirm';
    if(K(/transbordo humano/)||T(/atendente humano|atendimento humano/))return 'forward_team';
    if(K(/opcao inexistente|fallback escopo/))return 'invalid_command';
    if(K(/indisponivel/)||T(/nao consegui (acessar|consultar)/))return 'service_unavailable';
    if(K(/agenda assistencial/))return ['checking','moment','consult_agenda'];   /* "Vou verificar… só um minuto" antes da agenda completa */
    if(K(/acolhimento dicas recusa/))return 'queue_follow';
    if(K(/dicas resposta/))return 'more_help';
    if(K(/^fila/))return T(/proxim|sua vez|posicao/)?'queue_position':'queue_follow';
    if(K(/acolhimento inicial|menu chat|conhecer daisy/))return 'intro';
    if(K(/nps/))return K(/invalida|intervalo/)?'retry':K(/registra/)?'completed':'available';
    if(K(/opcao invalida|perfil invalido|dicas opcao/))return 'retry';
    if(K(/confirmacao consulta/))return 'agenda_updated_confirmed';
    if(K(/agenda exames/))return 'exams_scheduled';
    if(K(/agenda procedimentos/))return 'procedures_scheduled';
    if(K(/consulta agenda/))return 'consult_agenda';
    if(K(/^rota/))return 'travel';
    if(K(/^kids/))return 'available';
    if(K(/orientacao chegada/))return 'travel';
    if(K(/preparo menu opcao invalida/))return 'retry';
    if(K(/preparo menu/))return 'available';
    if(K(/preparo/))return 'prepare_exam';
    if(K(/financeiro nome recebido/))return 'confirm_cpf';
    if(K(/financeiro nome nao confere/))return 'data_error';
    if(K(/financeiro solicitar identidade|financeiro entrega|financeiro confirmar email/))return K(/entrega|email/)?'available':'security_verify';
    if(K(/financeiro envio telefone|financeiro arquivo baixado/))return 'completed';
    if(K(/dialogo agradecimento/))return 'more_help';
    if(K(/dialogo saudacao/))return 'intro';
    if(K(/financeiro cpf recebido/))return 'security_verify';
    if(K(/financeiro validacao pendente/))return 'security_verify';
    if(T(/nao confere|nao conferem|nao consegui validar|nao consegui confirmar/)||K(/validacao falha/))return 'data_error';
    if(K(/solicitacao cancelamento|fatura email|pix gerado|codigo barras/))return 'completed';
    if(K(/validacao sucesso|validad[oa]/))return 'data_ok';
    if(K(/validacao pendente|cpf recebido|agenda familiar/)){ if(T(/envie (o )?cpf|11 digitos|cpf do responsavel/))return 'confirm_cpf'; if(T(/codigo familiar|jf-?050/))return 'confirm_family'; return 'confirm_cpf' }
    if(K(/solicitar identidade|nova consulta solicitar/))return 'security_verify';
    if(K(/duvidas/)||T(/mais alguma coisa/))return 'more_help';
    if(T(/estes sao seus exames/))return 'exams_scheduled';
    if(T(/estes sao seus procedimentos/))return 'procedures_scheduled';
    if(T(/nao encontrei/)&&T(/exame|procedimento/))return 'exam_not_found';
    if(T(/aguarde|um momento/))return 'moment';
    if(T(/vou verificar|verificando/))return 'checking';
    return 'available';
  }
  
const c=JSON.parse(require('fs').readFileSync('auto_coleta64.json','utf8'));const out=[];for(const [h,v] of Object.entries(c)){out.push([v[1],JSON.stringify(choose(v[0],v[1])),v[0].slice(0,70).replace(/\n/g,' ')])}console.log(JSON.stringify(out))
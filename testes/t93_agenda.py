"""Testes da v40.93: confirmar, cancelar e reagendar pelo chat do app e pelo WhatsApp (RN-01, RN-35, RN-36).
Uso:  python testes/t93_agenda.py app/DaisyCare_App_v40_93_Voz_Natural.html"""
import sys, os, threading, http.server, socketserver, functools
from playwright.sync_api import sync_playwright

html = os.path.abspath(sys.argv[1]); root = os.path.dirname(html); name = os.path.basename(html)
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(Q, directory=root)); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()

R = []
def chk(n, c, extra=''):
    R.append(bool(c)); print(('OK     ' if c else 'FALHA  ') + n + (' · ' + str(extra)[:160] if extra and not c else ''))

with sync_playwright() as p:
    b = p.chromium.launch()
    erros = []
    def nova(canal='app'):
        q = b.new_page(viewport={'width': 1366, 'height': 900})
        q.add_init_script("localStorage.setItem('daisycare_prefs_v52','{\"seen\":1}')")
        q.on('pageerror', lambda e: erros.append(str(e)))
        q.goto(f'http://127.0.0.1:{port}/{name}'); q.wait_for_timeout(2500)
        q.evaluate("showPage('%s')" % ('appchat' if canal == 'app' else 'whatsapp'))
        return q
    def diga(q, canal, msg):
        q.fill('#appInput' if canal == 'app' else '#waInput', msg)
        q.evaluate(f"sendChat('{canal}')"); q.wait_for_timeout(500)
        corpo = '#appBody' if canal == 'app' else '#waBody'
        return q.evaluate(f"(()=>{{const b=[...document.querySelectorAll('{corpo} .bubble')];return b.length?b[b.length-1].innerText:''}})()")
    item = lambda q, k: q.evaluate(f"(window.DAISY_CARE_SCHEDULE||[]).find(x=>x.key==='{k}')||null")

    # RN-01: opção 1 mostra a consulta e as ações
    q = nova(); t = diga(q, 'app', '1')
    chk('Opção 1 mostra a consulta e oferece confirmar, cancelar e reagendar',
        all(x in t for x in ('1 - Confirmar presença', '2 - Cancelar', '3 - Reagendar')), t)
    t = diga(q, 'app', '1')
    chk('Opção 1 › 1 confirma a presença', 'Presença confirmada' in t, t); q.close()

    # RN-35: cancelar pelo nome do exame, com confirmação e protocolo
    q = nova(); antes = item(q, 'endoscopia')
    t = diga(q, 'app', 'cancelar a endoscopia')
    chk('"cancelar a endoscopia" encontra o exame e pede confirmação', 'Endoscopia' in t and '1 - Sim, cancelar' in t, t)
    chk('Nada é cancelado antes da confirmação', 'cancel' not in str(item(q, 'endoscopia')['status']))
    t = diga(q, 'app', '1')
    chk('Cancelamento gera protocolo DC-CAN', 'DC-CAN-' in t, t)
    chk('Agenda marca o exame como cancelado', 'cancel' in str(item(q, 'endoscopia')['status']))
    chk('Horário liberado para a fila de espera', 'fila de espera' in t, t)
    t = diga(q, 'app', 'cancelar')
    chk('Exame cancelado sai da lista de cancelamento', 'Endoscopia' not in t, t); q.close()

    # cancelar e desistir mantém o agendamento
    q = nova(); diga(q, 'app', 'cancelar a endoscopia'); t = diga(q, 'app', '3')
    chk('Cancelar › 3 mantém o agendamento', 'cancel' not in str(item(q, 'endoscopia')['status']), t); q.close()

    # RN-36: reagendar com confirmação final (atual × novo)
    q = nova(); d0 = item(q, 'consulta_cardio')['date']
    t = diga(q, 'app', 'reagendar'); chk('REAGENDAR lista os agendamentos', 'Qual agendamento você quer reagendar' in t, t)
    t = diga(q, 'app', '1'); chk('Mostra novos horários disponíveis', 'novos horários disponíveis' in t, t)
    t = diga(q, 'app', '1'); chk('Pede confirmação final com horário atual e novo', 'Atual:' in t and 'Novo:' in t, t)
    chk('Agenda não muda antes da confirmação final', item(q, 'consulta_cardio')['date'] == d0)
    t = diga(q, 'app', '1')
    chk('Reagendamento gera protocolo DC-REA', 'DC-REA-' in t, t)
    chk('Agenda recebe a nova data', item(q, 'consulta_cardio')['date'] != d0); q.close()

    q = nova(); d0 = item(q, 'consulta_cardio')['date']
    for m in ('remarcar', '1', '1'): diga(q, 'app', m)
    t = diga(q, 'app', '3')
    chk('REMARCAR › manter horário atual não altera a agenda', item(q, 'consulta_cardio')['date'] == d0 and 'Mantive' in t, t); q.close()

    # mesmo fluxo no WhatsApp
    q = nova('wa'); t = diga(q, 'wa', 'cancelar a endoscopia')
    chk('WhatsApp: cancelar pelo nome do exame', '1 - Sim, cancelar' in t, t)
    t = diga(q, 'wa', '1'); chk('WhatsApp: cancelamento com protocolo', 'DC-CAN-' in t, t); q.close()

    chk('Sem erros de página', not erros, erros)
    b.close()
print(f'\n{sum(R)}/{len(R)} checagens OK')
sys.exit(0 if all(R) else 1)

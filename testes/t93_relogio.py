"""Testes do relógio de demonstração: a demo começa em 26/10/2026 às 18h35 em qualquer dia de acesso,
coerente com as falas gravadas, e ?relogio=real devolve o relógio do sistema.
Uso:  python testes/t93_relogio.py app/DaisyCare_App_v40_93_Voz_Natural.html"""
import sys, os, time, threading, http.server, socketserver, functools
from playwright.sync_api import sync_playwright

html = os.path.abspath(sys.argv[1]); root = os.path.dirname(html); name = os.path.basename(html)
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(Q, directory=root)); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()

R = []
def chk(n, c, extra=''):
    R.append(bool(c)); print(('OK     ' if c else 'FALHA  ') + n + (' · ' + str(extra)[:160] if extra and not c else ''))

INICIO_MS = 1793050500000  # 2026-10-26T18:35:00-03:00

with sync_playwright() as p:
    b = p.chromium.launch()
    erros = []
    def abrir(sufixo=''):
        q = b.new_page(viewport={'width': 1366, 'height': 900})
        q.add_init_script("localStorage.setItem('daisycare_prefs_v52','{\"seen\":1}')")
        q.on('pageerror', lambda e: erros.append(str(e)))
        q.goto(f'http://127.0.0.1:{port}/{name}{sufixo}'); q.wait_for_timeout(2500)
        return q

    q = abrir()
    agora = q.evaluate('Date.now()')
    chk('Relógio de demonstração começa em 26/10/2026 às 18h35', 0 <= agora - INICIO_MS < 60_000, agora - INICIO_MS)
    chk('new Date() e Date.now() usam o mesmo relógio', abs(q.evaluate('new Date().getTime() - Date.now()')) < 1000)
    chk('Datas explícitas não são alteradas',
        q.evaluate("new Date('2026-10-26T21:00:00-03:00').getTime()") == 1793059200000)
    timer = q.inner_text('#timer')
    chk('Contagem regressiva para a consulta não está zerada', timer != '00:00:00' and timer.startswith('02:'), timer)
    q.close()

    q = abrir('?relogio=real')
    chk('?relogio=real usa o relógio do sistema', abs(q.evaluate('Date.now()') - time.time() * 1000) < 60_000)
    q.close()

    chk('Sem erros de página', not erros, erros)
    b.close()
print(f'\n{sum(R)}/{len(R)} checagens OK')
sys.exit(0 if all(R) else 1)

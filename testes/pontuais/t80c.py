import threading,http.server,socketserver,functools
from playwright.sync_api import sync_playwright
import os;d=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','app'))
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(s,*a):pass
class S(socketserver.ThreadingTCPServer):allow_reuse_address=True
s=S(('127.0.0.1',8768),functools.partial(Q,directory=d));threading.Thread(target=s.serve_forever,daemon=True).start()
FS="""(()=>{const bad=[];document.querySelectorAll('#PG *').forEach(e=>{if(!e.offsetParent)return;const t=[...e.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).length;if(!t)return;const f=parseFloat(getComputedStyle(e).fontSize);if(f<12)bad.push(e.tagName+':'+f+':'+e.textContent.trim().slice(0,30))});
const sm=[];document.querySelectorAll('#PG button,#PG select,#PG input').forEach(e=>{if(!e.offsetParent)return;const r=e.getBoundingClientRect();if(r.height<40)sm.push(e.tagName+':'+Math.round(r.height)+':'+(e.textContent||e.id).trim().slice(0,20))});return {bad,sm}})()"""
with sync_playwright() as p:
    b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
    for w,h in ((1366,900),(390,844)):
        q=b.new_page(viewport={'width':w,'height':h});errs=[];q.on('pageerror',lambda e:errs.append(str(e)))
        q.add_init_script("localStorage.setItem('daisycare_prefs_v52','{\"seen\":1}')")
        q.goto('http://127.0.0.1:8768/DaisyCare_App_v40_83_Voz_Natural.html');q.wait_for_timeout(3000)
        for pg in ('arq','pront'):
            q.evaluate(f"showPage('{pg}')");q.wait_for_timeout(500)
            print(w,pg,q.evaluate("document.documentElement.scrollWidth"),q.evaluate(FS.replace('#PG','#'+pg)))
            if w==390:q.screenshot(path=f'{pg}_m.png',full_page=True)
        # dark
        q.evaluate("document.documentElement.classList.add('dark');document.body.classList.add('dark')");q.screenshot(path=f'pront_dark{w}.png')
        # whatsapp zero
        q.evaluate("showPage('whatsapp')");q.wait_for_timeout(400)
        q.fill('#waInput','menu');q.evaluate("sendChat('wa')");q.wait_for_timeout(400)
        print('WA menu',q.evaluate("(()=>{const b=[...document.querySelectorAll('#waBody .bubble')];return b[b.length-1].innerText.slice(0,120)})()"))
        q.fill('#waInput','0');q.evaluate("sendChat('wa')");q.wait_for_timeout(400)
        print('WA zero',q.evaluate("(()=>{const b=[...document.querySelectorAll('#waBody .bubble')];return b[b.length-1].innerText.slice(0,60)})()"))
        print('errs',errs)
    b.close()

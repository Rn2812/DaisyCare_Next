import threading,http.server,socketserver,functools
from playwright.sync_api import sync_playwright
d='/tmp/claude-0/-home-claude/170423f3-6c13-538a-b17c-4f6e0b4bef5c/scratchpad/pk/DaisyCare'
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(s,*a):pass
H=functools.partial(Q,directory=d)
class S(socketserver.ThreadingTCPServer):allow_reuse_address=True
s=S(('127.0.0.1',8766),H);threading.Thread(target=s.serve_forever,daemon=True).start()
with sync_playwright() as p:
    b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
    q=b.new_page(viewport={'width':1300,'height':900})
    q.add_init_script("localStorage.setItem('daisycare_prefs_v52','{\"seen\":1}');window.__pl=[];const P=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){window.__pl.push((this.src||'').split('/').pop());return P.apply(this,arguments)}")
    q.goto('http://127.0.0.1:8766/DaisyCare_App_v40_73_Voz_Natural.html');q.wait_for_timeout(3000);q.evaluate("showPage('appchat')")
    last=lambda:q.evaluate("(()=>{const b=[...document.querySelectorAll('#appBody .bubble')];return b[b.length-1].innerText})()")
    def say(t):
        q.fill('#appInput',t);q.evaluate("sendChat('app')");q.wait_for_timeout(900);return last()
    q.click('#muteBtnApp');q.wait_for_timeout(4500)
    q.evaluate("window.__ss=[];const sp=window.speechSynthesis.speak.bind(window.speechSynthesis);window.speechSynthesis.speak=function(u){window.__ss.push(u.text.slice(0,30));return sp(u)}")
    btns=q.evaluate("[...document.querySelectorAll('#appchat .chat-side-panel button')].map(b=>b.textContent.trim())")
    print(btns)
    for k in range(0,11):
        q.fill('#appInput','menu');q.evaluate("sendChat('app')");q.wait_for_timeout(1500)
        q.evaluate("window.__pl=[];window.__ss=[]")
        q.evaluate("(i)=>document.querySelectorAll('#appchat .chat-side-panel button')[i].click()",k)
        q.wait_for_timeout(1500)
        print(k,btns[k],q.evaluate("window.__pl"),q.evaluate("window.__ss"))

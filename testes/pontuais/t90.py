import threading,http.server,socketserver,functools,json,sys
from playwright.sync_api import sync_playwright
import os;d=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','app'))
NAME=sys.argv[1]
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(s,*a):pass
H=functools.partial(Q,directory=d)
class S(socketserver.ThreadingTCPServer):allow_reuse_address=True
s=S(('127.0.0.1',8767),H);threading.Thread(target=s.serve_forever,daemon=True).start()
INIT="""localStorage.setItem('daisycare_prefs_v52','{"seen":1}');
window.__ev=[];window.__act=new Set();window.__ovl=[];
const P=HTMLMediaElement.prototype.play;
HTMLMediaElement.prototype.play=function(){const id=(this.src||'').split('/').pop();window.__ev.push(id);const a=this;
 if(window.__act.size){window.__ovl.push([...window.__act].concat(id).join(' + '))}
 window.__act.add(id);const done=()=>window.__act.delete(id);a.addEventListener('ended',done,{once:true});a.addEventListener('pause',done,{once:true});a.addEventListener('error',done,{once:true});
 return P.apply(this,arguments)};
const SS=window.speechSynthesis;if(SS){const sp=SS.speak.bind(SS);SS.speak=function(u){try{window.__ev.push('TTS:'+String(u&&u.text).slice(0,25))}catch(e){}return sp(u)}}
"""
with sync_playwright() as p:
    b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
    q=b.new_page(viewport={'width':1650,'height':900});q.add_init_script(INIT)
    q.goto(f'http://127.0.0.1:8767/{NAME}');q.wait_for_timeout(3000);q.evaluate("showPage('appchat')")
    q.click('#muteBtnApp');q.wait_for_timeout(4500)
    last=lambda:q.evaluate("(()=>{const b=[...document.querySelectorAll('#appBody .bubble')];return b.length?b[b.length-1].innerText:''})()")
    def reset():q.evaluate("window.__ev=[];window.__ovl=[];window.__act=new Set();document.querySelectorAll('audio').forEach(a=>{try{a.pause()}catch(e){}})")
    def act(kind,v):
        reset()
        if kind=='say':
            q.fill('#appInput',v);q.evaluate("sendChat('app')")
        else:
            q.evaluate("(i)=>document.querySelectorAll('#appchat .chat-side-panel button')[i].click()",v)
        q.wait_for_timeout(1800)
        return {'in':str(v),'kind':kind,'txt':last(),'ev':q.evaluate("window.__ev"),'ovl':q.evaluate("window.__ovl")}

    def say(m):
        q.fill('#appInput',m);q.evaluate("sendChat('app')");q.wait_for_timeout(500)
        return q.evaluate("(()=>{const b=[...document.querySelectorAll('#appBody .bubble-row:not(.user) .bubble')];return b[b.length-1].innerText})()")
    def run(title,*cmds):
        q.evaluate("showPage('appchat')");q.wait_for_timeout(200)
        r=None
        for c in cmds:r=say(c)
        print('###',title,'|',' > '.join(cmds));print(r[:600].replace(chr(10),' / '));print()
    run('proc','menu','procedimentos')
    run('proc1','menu','meus procedimentos','1')
    run('proc2','menu','procedimentos','2')
    run('proc2b','menu','procedimentos','2','1')
    run('proc3','menu','procedimentos','3')
    run('proc31','menu','procedimentos','3','1')
    run('proc34','menu','procedimentos','3','3','4')
    run('proc4','menu','procedimentos','4')
    print('CHIP',q.evaluate("document.querySelectorAll('#appBody .dc-chip2').length"))
    run('proc5','menu','procedimentos','5')
    run('proc6','menu','procedimentos','6')
    run('procX','menu','procedimentos','9')
    run('btn','menu','7','quero','1','3')
    q.evaluate("openAppCommand('procedimentos e preparos')");q.wait_for_timeout(500);print('BTN',q.evaluate("(()=>{const b=[...document.querySelectorAll('#appBody .bubble')];return b[b.length-1].innerText.slice(0,60)})()"))
    reset();q.fill('#appInput','menu');q.evaluate("sendChat('app')");q.wait_for_timeout(300);q.fill('#appInput','7');q.evaluate("sendChat('app')");q.wait_for_timeout(300);q.fill('#appInput','quero');q.evaluate("sendChat('app')");q.wait_for_timeout(300);q.fill('#appInput','1');q.evaluate("sendChat('app')");q.wait_for_timeout(300)
    reset();q.fill('#appInput','3');q.evaluate("sendChat('app')");q.wait_for_timeout(2500);print('VOZ rota',q.evaluate('window.__ev'))
    q.evaluate("openAppCommand('9')");q.wait_for_timeout(500);print('BTN9',q.evaluate("(()=>{const b=[...document.querySelectorAll('#appBody .bubble')];return b[b.length-1].innerText.slice(0,50)})()"))

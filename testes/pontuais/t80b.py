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
    out=[]
    q.evaluate("showPage('appchat')");q.wait_for_timeout(300)
    q.fill('#appInput','menu');q.evaluate("sendChat('app')");q.wait_for_timeout(300)
    r=act('say','menu');r['in']='menu';out.append(r)
    for t in ['0','zero','Zero','ouvir as opções']:
        r=act('say',t);r['in']=t;out.append(r)
    # zero dentro da nota continua sendo nota
    q.fill('#appInput','menu');q.evaluate("sendChat('app')");q.wait_for_timeout(300)
    for t in ['8']:
        q.fill('#appInput',t);q.evaluate("sendChat('app')");q.wait_for_timeout(300)
    r=act('say','0');r['in']='8 > 0 (nota)';out.append(r)
    for o in out:print(o['in'],'|',o['txt'][:90].replace(chr(10),' / '),'|',o['ev'],o['ovl'])
    # prontuário
    q.evaluate("showPage('pront')");q.wait_for_timeout(500)
    q.click('#prEx');q.wait_for_timeout(300);print('LEITURA',q.inner_text('#prRes')[:200].replace(chr(10),' / '))
    q.click('#prOk');q.wait_for_timeout(300)
    q.click('[data-pf=dia]');q.wait_for_timeout(300);q.click('[data-at="0"]');q.wait_for_timeout(300)
    print('ROWS',q.evaluate("document.querySelectorAll('#pront tbody tr').length"))
    print(q.inner_text('#pront')[-700:].replace(chr(10),' / '))
    q.screenshot(path='pront.png',full_page=True)
    print('SCROLLW',q.evaluate("document.documentElement.scrollWidth"))

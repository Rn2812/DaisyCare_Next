"""Gera a v40.93 a partir do código-fonte.

Etapas:
  1. build.py monta a v40.91 (base v40_51 + módulos v47 a v80) em fonte/build/saida/.
  2. Este script aplica as mudanças da v40.92 (página Workflows com os fluxos 12 a 17,
     camada Redis/PostgreSQL/CRM, regras RN-31 a RN-34) e da v40.93 (confirmar, cancelar
     e reagendar pelo chat e WhatsApp, regras RN-35 e RN-36).
     - patch93_trechos.json: trechos alterados, cada um conferido antes de ser trocado.
     - v93_agenda.js: módulo novo de agenda (cancelar e reagendar).
  3. Grava app/DaisyCare_App_v40_93_Voz_Natural.html e confere o SHA-256 com a versão publicada.

Uso: python3 fonte/build/build_v93.py
"""
import hashlib, json, os, runpy, sys

W = os.path.dirname(os.path.abspath(__file__))
SHA_ESPERADO = 'dd6f75bdf309d032ff37a3278c85d86f63bf8285401fba63d2f31e78ad7a3134'

runpy.run_path(os.path.join(W, 'build.py'), run_name='__main__')
base = open(os.path.join(W, 'saida', 'DaisyCare_App_v40_91_Voz_Natural.html'), encoding='utf-8').read().split('\n')
trechos = json.load(open(os.path.join(W, 'patch93_trechos.json'), encoding='utf-8'))
agenda = open(os.path.join(W, 'v93_agenda.js'), encoding='utf-8').read().split('\n')

# aplica de baixo para cima para as linhas de cima não mudarem de posição
for t in sorted(trechos, key=lambda t: t['linha'], reverse=True):
    i = t['linha']
    atual = base[i:i + len(t['antes'])]
    if atual != t['antes']:
        sys.exit(f'Trecho da linha {i} não confere com a base v40.91. Rode build.py sem alterações.')
    novo = agenda if t['novo'] == ['__V93_AGENDA__'] else t['novo']
    base[i:i + len(t['antes'])] = novo

html = '\n'.join(base)
destino = os.path.join(W, '..', '..', 'app', 'DaisyCare_App_v40_93_Voz_Natural.html')
open(destino, 'w', encoding='utf-8').write(html)
sha = hashlib.sha256(html.encode('utf-8')).hexdigest()
print('v40.93 gerada:', os.path.normpath(destino), f'{len(html)/1e6:.2f} MB')
print('SHA-256 confere com a versão publicada' if sha == SHA_ESPERADO else f'ATENÇÃO: SHA diferente ({sha})')

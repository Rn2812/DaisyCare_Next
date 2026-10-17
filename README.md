# DaisyCare Next

Assistente virtual **Daisy** do Hospital Mater Dei: aplicativo em um único arquivo HTML, com dados fictícios, chat por voz e texto, fila digital, jornada com mapa e rota, prontuário digital e páginas de arquitetura.

## Como usar
- `app/` — versão pronta (v40.91). No Windows, abra `app/Iniciar_DaisyCare.bat`; em outros sistemas sirva a pasta `app/` por um servidor local e abra `DaisyCare_App_v40_91_Voz_Natural.html`.
- `app/falas/` — áudios da Daisy (mp3). Textos sem áudio ficam em silêncio até serem gravados.
- `fonte/` — código-fonte do build. `python3 fonte/build/build.py` regenera o HTML em `app/` a partir de `fonte/base/` (versão 40_51) mais os módulos `v*.js`, `patch69.py` e `rules70.py`.
- `testes/regressao.py` — 105 verificações automáticas (Playwright): `python3 testes/regressao.py app/DaisyCare_App_v40_91_Voz_Natural.html`.
- `n8n/` — fluxos 12 a 16 do modelo Ouro (nunca executados em servidor real).
- `docs/` — roteiros de falas para gravação.

## Pontos em aberto
- Vozes dos textos novos (menu de Procedimentos e preparos, história da Daisy, rotas internas por destino).
- Fluxos n8n ainda não testados em servidor real.
- Destino do mapa é um ponto de exemplo, pois o Hospital Mater Dei Paulista ainda não existe.

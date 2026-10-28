# Código-fonte do build

`python3 fonte/build/build.py` parte de `base/DaisyCare_App_v40_51_Falas_Novas.html` e aplica, em ordem, os módulos `v*.js`, `patch69.py`, `rules69.py`, `rules70.py` e `kids68.py`, além dos avatares, do catálogo de falas e dos dados do painel de BI.

A saída é gravada em `fonte/saida/` (ignorada pelo Git) para não sobrescrever o app publicado em `app/`.

> O build reproduz o app até a **v40.91**. As mudanças da v40.92 e v40.93 (workflows 12 a 17, cancelar e reagendar) foram aplicadas direto no HTML publicado em `app/`.

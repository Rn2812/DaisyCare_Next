# DaisyCare · Camada de análise

Dados sintéticos de 200 mil agendamentos usados no modelo de Machine Learning e no painel Power BI do DaisyCare. Não há dado pessoal: pacientes, unidades e eventos são gerados para estudo.

## Machine Learning: previsão de comparecimento

Notebook: [ml/DaisyCare_ML_previsao_comparecimento.ipynb](ml/DaisyCare_ML_previsao_comparecimento.ipynb)

**Pergunta de negócio:** quais agendamentos têm maior risco de não se converter em atendimento, para a Daisy priorizar contato extra e oferecer a vaga à fila de encaixe a tempo.

| Etapa | O que foi feito |
|---|---|
| Dados | 3 bases de 200 mil linhas: agendamentos, experiência e logs da Daisy/n8n |
| Vazamento | Só entram variáveis conhecidas antes do atendimento |
| Pré-processamento | Imputação, winsorização por IQR, one-hot e normalização em pipeline scikit-learn |
| Modelos | Regressão Logística, Random Forest e XGBoost com validação cruzada |
| Tuning | Busca de hiperparâmetros na Regressão Logística (melhor: L1, C = 0,1) |
| Avaliação | AUC ≈ 0,70 e F1 ≈ 0,70 no teste, tabela de threshold e desempenho por canal e especialidade |

**Escolha do modelo:** a Regressão Logística empatou em AUC com os modelos de árvore (0,699 contra 0,693 e 0,691) e teve a menor distância entre treino e validação. O Random Forest chegou a 0,92 de AUC no treino, sinal de overfitting. Além disso, os coeficientes são fáceis de explicar para a operação.

**Uso na operação:** o threshold é uma decisão de negócio. Com 0,35 o modelo encontra 87% dos casos de risco, com mais falsos positivos (mais lembretes). Com 0,60 a precisão sobe para 82%, mas o recall cai para 45%.

Para rodar: abra o notebook na pasta `ml/`. Os três arquivos `.parquet` precisam estar na mesma pasta.

## Power BI: medidas DAX

Pasta [power-bi/dax/](power-bi/dax/): medidas por página do painel.

| Arquivo | Página |
|---|---|
| `Desempenho_Operacional.txt` | Volume, comparecimento, no-show, cancelamento e antecedência |
| `Resultados_Financeiros.txt` | Receita potencial × convertida, gap e ticket médio |
| `Analise_Jornada_Paciente.txt` | Confirmações 24 h, 4 h e 2 h e efeito sobre o comparecimento |
| `Automacao_IA_SmartQueue.txt` | Sucesso das automações e encaixes da fila inteligente |
| `SmartQueue_Inteligente_Paginas_5_e_6.txt` | Vagas liberadas, convites, aceite e receita recuperada |

O guia [power-bi/GUIA_POWER_BI.md](power-bi/GUIA_POWER_BI.md) descreve o modelo estrela e as páginas da versão de 12 meses.

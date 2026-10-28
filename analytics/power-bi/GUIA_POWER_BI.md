# Guia de visualização no Power BI

## 1. Carregamento

1. Importe os três datasets principais e as dimensões de pacientes e hospitais.
2. No Power Query, defina datas como `date`, valores como `decimal` e identificadores como `text`.
3. Crie uma dimensão calendário contínua entre 01/09/2025 e 31/08/2026.
4. Desative a criação automática de tabelas de data.

## 2. Modelo estrela

- `dim_calendario[Data]` → datas das três tabelas fato.
- `dim_hospitais[id_hospital]` → `id_hospital` das tabelas fato.
- `dim_pacientes_anonimizada[id_paciente_anonimo]` → tabelas operacionais e de projetos.
- Use relacionamentos 1:* e filtro em uma direção, partindo das dimensões.
- Não relacione diretamente as três tabelas fato.

## 3. Medidas DAX essenciais

```DAX
Total Casos = DISTINCTCOUNT(Dados[id_agendamento])

Casos Realizados =
CALCULATE([Total Casos], Dados[status_agendamento] = "Realizado")

No-Shows =
CALCULATE([Total Casos], Dados[status_agendamento] = "No-Show")

Taxa No-Show = DIVIDE([No-Shows], [Total Casos], 0)

Receita Líquida = SUM(Financeiro[valor_total_liquido])

Margem = SUM(Financeiro[valor_margem])

Margem % = DIVIDE([Margem], SUM(Financeiro[valor_recebido]), 0)

Receita Perdida = SUM(Financeiro[receita_perdida_no_show])

Receita Recuperada = SUM(Financeiro[receita_recuperada_encaixe])

Recuperação % = DIVIDE([Receita Recuperada], [Receita Perdida], 0)

Desvio Forecast = [Receita Líquida] - SUM(Forecast[receita_forecast])

Desvio Forecast % = DIVIDE([Desvio Forecast], SUM(Forecast[receita_forecast]), 0)
```

## 4. Páginas recomendadas

1. **Executivo:** receita líquida, margem, taxa de no-show, recuperação e desvio do forecast.
2. **Operação:** agenda por hospital, especialidade, canal, antecedência, confirmações e tempo de espera.
3. **Financeiro:** previsto × faturado × recebido; glosas; custos; margem; orçamento × realizado.
4. **Data Science:** distribuição dos scores, matriz de confusão, precisão, recall e desempenho por faixa de risco.
5. **Fila de ação:** pacientes de alto risco, ação recomendada, tentativas de contato e slots elegíveis para encaixe.

## 5. Boas práticas visuais

- Comece com quatro a seis KPIs; evite uma tela cheia de cartões.
- Use linha para tendência, barras para comparação e waterfall para explicar variações financeiras.
- Mostre intervalo de confiança no forecast.
- Use verde para resultado favorável, âmbar para atenção e vermelho apenas para exceções.
- Inclua data da última atualização, período filtrado e definição resumida dos indicadores.


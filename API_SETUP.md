# 🔌 Guia de Integração com API de Futebol

Este guia explica como configurar a integração com API em tempo real para exibir resultados de futebol atualizados.

## 📊 Opções de API Disponíveis

### Opção 1: API-Football (Recomendado) ⭐

**API**: api-football.p.rapidapi.com  
**Vantagens**: 
- Dados de múltiplas ligas (Brasileirão, Premier League, etc)
- Estatísticas detalhadas
- Atualizações em tempo real
- Logos dos times
- Plano gratuito disponível

**Como Configurar**:

1. Acesse https://rapidapi.com/api-sports/api/api-football
2. Clique em "Sign Up" e crie uma conta
3. Copie sua API Key
4. Abra `script.js` e substitua a linha:
```javascript
key: 'SEU_API_KEY_AQUI'
```
Por sua chave real:
```javascript
key: 'sua_chave_api_aqui_12345abcde'
```

5. **Pronto!** Os resultados serão atualizados a cada 30 segundos

---

### Opção 2: Football-Data.org (Alternativa)

**API**: api.football-data.org  
**Vantagens**:
- Interface simples
- Dados confiáveis
- Plano gratuito

**Como Configurar**:

1. Acesse https://www.football-data.org/
2. Crie uma conta gratuita
3. Copie sua API Token
4. No `script.js`, descomente a seção de football-data.org:

```javascript
// Opção 2: football-data.org (alternativa)
endpoint: 'https://api.football-data.org/v4',
key: 'SEU_API_KEY_AQUI' // Obtenha em https://www.football-data.org/
```

---

## 📝 Detalhes Técnicos

### Endpoints da API-Football Utilizados

```
GET /fixtures?league=71&season=2024&last=3
```

- **league=71**: Campeonato Brasileiro
- **season=2024**: Temporada 2024
- **last=3**: Últimos 3 resultados

### Outras Ligas Disponíveis:
- **39**: Premier League (Inglaterra)
- **135**: Série A (Itália)
- **78**: Bundesliga (Alemanha)
- **61**: Ligue 1 (França)
- **140**: LaLiga (Espanha)

### Modificar Dados Exibidos

Para mudar a liga, edite a requisição no arquivo `script.js`:

```javascript
`${API_CONFIG.endpoint}/fixtures?league=NUMERO_LIGA&season=2024&last=3`
```

---

## 🔄 Frequência de Atualização

Atualmente, os dados são atualizados a cada **30 segundos**.

Para modificar, edite em `script.js`:

```javascript
// Atualizar placares a cada 30 segundos (quando estiver usando API real)
setInterval(() => {
    buscarUltimosResultados();
}, 30000); // 30000 ms = 30 segundos
```

Mudaria para 10 segundos:
```javascript
}, 10000); // 10 segundos
```

---

## ✅ Testando a Integração

1. Abra o navegador e acesse o site
2. Abra o Console (F12 → Aba Console)
3. Procure pelas mensagens:
   - ✅ "Placares atualizados com sucesso!" → API funcionando
   - ⚠️ "Usando dados padrões..." → API não configurada

---

## 🐛 Solução de Problemas

### Erro: "Erro na API: 401"
- Sua chave de API é inválida
- Copie novamente do painel do RapidAPI

### Erro: "Erro na API: 429"
- Limite de requisições atingido
- Aumente o intervalo entre atualizações

### Erro: "Erro na API: 403"
- Sua conta não tem permissão
- Atualize seu plano no RapidAPI

### Dados padrões aparecem
- API não foi configurada
- Verifique a chave no arquivo `script.js`

---

## 💡 Dicas Avançadas

### Adicionar Múltiplas Ligas

```javascript
async function buscarResultadosMultiplasLigas() {
    const ligas = [71, 39, 78]; // Brasileirão, Premier, Bundesliga
    
    for (let liga of ligas) {
        const response = await fetch(
            `${API_CONFIG.endpoint}/fixtures?league=${liga}&season=2024&last=1`,
            // ... resto do código
        );
    }
}
```

### Cache Local

Salve os dados no localStorage para melhor performance:

```javascript
localStorage.setItem('placaresCache', JSON.stringify(data));
```

### Notificações em Tempo Real

Para adicionar push notifications de gols:

```javascript
if (gols1 > golsAntigos1) {
    mostrarNotificacao(`⚽ Gol do ${time1.name}!`);
}
```

---

## 📞 Suporte

Se tiver dúvidas:
1. Consulte a documentação da API em https://rapidapi.com/api-sports/api/api-football
2. Verifique o Console do navegador (F12)
3. Verifique sua conexão com a internet

---

**Pronto para começar!** 🚀 Ative sua API e veja os resultados em tempo real!

# 💻 Exemplos de Código Prontos para Copiar e Colar

Aqui você encontra snippets prontos para usar no seu projeto!

---

## 🔌 Exemplo 1: Configurar API-Football

### Passo 1: Onde editar
Abra `script.js` e procure por:
```javascript
const API_CONFIG = {
    endpoint: 'https://api-football-v1.p.rapidapi.com/v3',
    key: 'SEU_API_KEY_AQUI',
    host: 'api-football-v1.p.rapidapi.com',
};
```

### Passo 2: Substitua
```javascript
const API_CONFIG = {
    endpoint: 'https://api-football-v1.p.rapidapi.com/v3',
    key: 'abc123def456ghi789jkl000',  // ← Sua chave aqui
    host: 'api-football-v1.p.rapidapi.com',
};
```

---

## 🔄 Exemplo 2: Mudar Liga de Futebol

### Brasilerão (Padrão)
```javascript
`${API_CONFIG.endpoint}/fixtures?league=71&season=2024&last=3`
```

### Premier League (Inglaterra)
```javascript
`${API_CONFIG.endpoint}/fixtures?league=39&season=2024&last=3`
```

### LaLiga (Espanha)
```javascript
`${API_CONFIG.endpoint}/fixtures?league=140&season=2024&last=3`
```

### Bundesliga (Alemanha)
```javascript
`${API_CONFIG.endpoint}/fixtures?league=78&season=2024&last=3`
```

### Ligue 1 (França)
```javascript
`${API_CONFIG.endpoint}/fixtures?league=61&season=2024&last=3`
```

### Serie A (Itália)
```javascript
`${API_CONFIG.endpoint}/fixtures?league=135&season=2024&last=3`
```

**Como usar:**
Procure por esta linha em `script.js`:
```javascript
`${API_CONFIG.endpoint}/fixtures?league=71&season=2024&last=3`
```

Mude `league=71` para o número da liga que quer. Por exemplo, `league=39` para Premier League.

---

## ⏱️ Exemplo 3: Alterar Frequência de Atualização

### Padrão (30 segundos)
```javascript
setInterval(() => {
    buscarUltimosResultados();
}, 30000); // 30000 ms = 30 segundos
```

### Rápido (10 segundos)
```javascript
setInterval(() => {
    buscarUltimosResultados();
}, 10000); // 10 segundos
```

### Mais Rápido (5 segundos)
```javascript
setInterval(() => {
    buscarUltimosResultados();
}, 5000); // 5 segundos
```

### Lento (60 segundos)
```javascript
setInterval(() => {
    buscarUltimosResultados();
}, 60000); // 60 segundos
```

**⚠️ Cuidado**: Atualizar muito frequente pode gastar sua quota de API!

---

## 📊 Exemplo 4: Exibir Mais Resultados

### Padrão (3 últimos jogos)
```javascript
`${API_CONFIG.endpoint}/fixtures?league=71&season=2024&last=3`
```

### 5 Últimos
```javascript
`${API_CONFIG.endpoint}/fixtures?league=71&season=2024&last=5`
```

### 10 Últimos
```javascript
`${API_CONFIG.endpoint}/fixtures?league=71&season=2024&last=10`
```

**Também mude em `atualizarPlacares()`:**
```javascript
resultados.slice(0, 3).forEach(jogo => {  // ← Mude o 3 para 5 ou 10
```

---

## 🔗 Exemplo 5: Usar Google Sheets

### Passo 1: Criar Sheet
1. Abra https://sheets.google.com
2. Crie novo documento
3. Adicione colunas: `Time 1`, `Gols 1`, `Time 2`, `Gols 2`, `Status`
4. Preencha com dados

### Passo 2: Publicar
1. `File → Share`
2. Copie ID do URL
3. `File → Publish to web → CSV`
4. Copie URL

### Passo 3: Adicionar ao script.js
```javascript
// Adicione antes de DOMContentLoaded:
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/SEU_ID/export?format=csv';

async function buscarResultadosGoogle() {
    try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const data = await response.text();
        const linhas = data.split('\n').slice(1);
        
        const resultados = linhas.map(linha => {
            const [time1, gols1, time2, gols2, status] = linha.split(',');
            return {
                teams: {
                    home: { name: time1.trim(), logo: null },
                    away: { name: time2.trim(), logo: null }
                },
                goals: { home: parseInt(gols1), away: parseInt(gols2) },
                fixture: { status: { short: status.trim() } }
            };
        });
        
        atualizarPlacares(resultados);
    } catch (error) {
        console.error('Erro:', error);
        usarDadosPadroes();
    }
}
```

### Passo 4: Usar no DOMContentLoaded
```javascript
// Substitua:
// buscarUltimosResultados();

// Por:
buscarResultadosGoogle();
```

---

## 🎨 Exemplo 6: Personalizar Cores

### Abra `styles.css` e procure por:
```css
:root {
    --primary-color: #1abc9c;
    --secondary-color: #2ecc71;
    --dark-color: #2c3e50;
    --light-color: #ecf0f1;
    --white-color: #ffffff;
    --text-color: #34495e;
}
```

### Temas Prontos:

#### Tema Azul
```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2980b9;
    --dark-color: #1a1a2e;
    --light-color: #ecf0f1;
    --white-color: #ffffff;
    --text-color: #2c3e50;
}
```

#### Tema Vermelho
```css
:root {
    --primary-color: #e74c3c;
    --secondary-color: #c0392b;
    --dark-color: #2c3e50;
    --light-color: #ecf0f1;
    --white-color: #ffffff;
    --text-color: #34495e;
}
```

#### Tema Dark Mode
```css
:root {
    --primary-color: #1abc9c;
    --secondary-color: #2ecc71;
    --dark-color: #1a1a1a;
    --light-color: #2a2a2a;
    --white-color: #ffffff;
    --text-color: #cccccc;
}
```

#### Tema Verde
```css
:root {
    --primary-color: #27ae60;
    --secondary-color: #229954;
    --dark-color: #1e5631;
    --light-color: #d5f4e6;
    --white-color: #ffffff;
    --text-color: #2c3e50;
}
```

---

## 📝 Exemplo 7: Adicionar Mais Informações ao Placar

### Adicione Hora da Partida
```javascript
const horario = new Date(jogo.fixture.date).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
});

card.innerHTML = `
    ...
    <span class="horario">${horario}</span>
    ...
`;
```

### Adicione Rodada
```javascript
const rodada = jogo.fixture.round || 'Sem informação';

card.innerHTML = `
    ...
    <span class="rodada">Rodada: ${rodada}</span>
    ...
`;
```

### Adicione Estádio
```javascript
const estadio = jogo.fixture.venue?.name || 'Estádio não informado';

card.innerHTML = `
    ...
    <span class="estadio">Local: ${estadio}</span>
    ...
`;
```

---

## 🔐 Exemplo 8: Esconder API Key (Segurança)

### ⚠️ NUNCA faça assim:
```javascript
// ❌ ERRADO - API key visível no código!
key: 'abc123def456ghi789jkl000'
```

### ✅ Correto para Produção:
```javascript
// Usar variáveis de ambiente
const API_KEY = process.env.FOOTBALL_API_KEY;

// Ou usar backend como proxy
fetch('/api/placares')
    .then(res => res.json())
    .then(data => atualizarPlacares(data.resultados));
```

**Para localhost**, não se preocupe. Só tome cuidado ao fazer deploy público!

---

## 🆘 Exemplo 9: Debug/Troubleshooting

### Ver Configuração Atual
```javascript
// No Console (F12):
console.log(API_CONFIG);
console.log('Chave configurada:', API_CONFIG.key !== 'SEU_API_KEY_AQUI');
```

### Forçar Atualização Manual
```javascript
// No Console:
buscarUltimosResultados();
```

### Ver Último Erro
```javascript
// No Console, procure por:
// - Erro na API
// - Usando dados padrões
// - Erro ao buscar dados
```

### Limpar Cache
```javascript
// Chrome: Ctrl+Shift+Del
// Firefox: Ctrl+Shift+Del
// Safari: Cmd+Shift+Delete
```

---

## 📱 Exemplo 10: Testar Responsividade

### No Chrome DevTools:
```
1. Pressione F12
2. Clique no ícone de dispositivo móvel (canto superior esquerdo)
3. Escolha dispositivo (iPhone, iPad, etc)
4. Veja como fica em mobile
```

### Ou redimensione:
```
1. Abra index.html
2. Redimensione a janela do navegador
3. Observe como o layout se adapta
```

---

## 🚀 Exemplo 11: Deploy Rápido (GitHub Pages)

### Passo 1: Commit no Git
```bash
cd c:\Users\HUAWEI\Downloads\link_App
git init
git add .
git commit -m "Primeira versão com API"
```

### Passo 2: Criar Repo no GitHub
1. Acesse https://github.com/new
2. Nome: `footballpro`
3. Descrição: "Site de futebol com API"
4. Público
5. Criar

### Passo 3: Push
```bash
git remote add origin https://github.com/SEUUSER/footballpro.git
git branch -M main
git push -u origin main
```

### Passo 4: GitHub Pages
1. Vá em Settings
2. Ache "GitHub Pages"
3. Branch: main
4. Folder: root
5. Save

**Pronto!** Seu site está em `https://SEUUSER.github.io/footballpro`

---

## 💡 Exemplo 12: Notificação Simples de Gol

```javascript
// Adicione isso em atualizarPlacares():
const golsAgora = jogo.goals.home + jogo.goals.away;
const golsAntes = 0; // Você precisaria armazenar o anterior

if (golsAgora > golsAntes) {
    // Simples alert:
    alert('⚽ GOL! ' + jogo.teams.home.name);
    
    // Ou notificação mais bonita:
    const notif = document.createElement('div');
    notif.textContent = '⚽ GOL!';
    notif.style.position = 'fixed';
    notif.style.top = '20px';
    notif.style.right = '20px';
    notif.style.background = '#2ecc71';
    notif.style.color = 'white';
    notif.style.padding = '20px';
    notif.style.borderRadius = '5px';
    document.body.appendChild(notif);
    
    setTimeout(() => notif.remove(), 3000);
}
```

---

## 📚 Recursos Adicionais

### Documentação Oficial:
- API-Football: https://rapidapi.com/api-sports/api/api-football
- Football-Data: https://www.football-data.org/documentation/api
- Fetch API: https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API
- CSS Grid: https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Grid_Layout

### Ferramentas Online:
- Testar API: https://www.postman.com/
- JSON Pretty: https://jsoncrack.com/
- CSS Generator: https://cssgradient.io/

---

## ✨ Dicas Finais

1. **Sempre teste no Console** (F12) para ver erros
2. **Comece simples** e aumente complexidade
3. **Leia a documentação** das APIs que usa
4. **Faça backup** antes de mudanças grandes
5. **Teste mobile** antes de disponibilizar

---

## 🎯 Próxima Etapa

Escolha uma opção e teste:
1. [ ] Configurar API-Football
2. [ ] Mudar para Premier League
3. [ ] Customizar cores
4. [ ] Usar Google Sheets
5. [ ] Deploy no GitHub Pages

---

**Bom coding!** 🚀⚽


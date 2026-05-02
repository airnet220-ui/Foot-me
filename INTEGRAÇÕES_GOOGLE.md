# 🔗 Integrações Alternativas - Google e Outras APIs

Este arquivo mostra formas adicionais de conectar o FootballPro com serviços Google e outras plataformas.

## 📌 Opção 1: Google Sheets como Banco de Dados

Você pode usar Google Sheets para armazenar e atualizar resultados manualmente ou via scripts.

### Setup:

1. Crie um Google Sheet com colunas:
   - Time 1
   - Gols 1
   - Time 2
   - Gols 2
   - Status

2. Publique como CSV: `File → Share → Publish to web`

3. Copie a URL e adicione ao `script.js`:

```javascript
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv';

async function buscarResultadosGoogle() {
    try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const data = await response.text();
        const linhas = data.split('\n').slice(1); // Ignora header
        
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
        console.error('Erro ao buscar Google Sheets:', error);
        usarDadosPadroes();
    }
}
```

### Vantagens:
- ✅ Sem necessidade de API key
- ✅ Fácil de atualizar manualmente
- ✅ Dados centralizados
- ✅ Grátis

### Desvantagens:
- ❌ Atualização manual
- ❌ Sem logos dos times
- ❌ Sem estatísticas detalhadas

---

## 📌 Opção 2: Firebase Realtime Database

Sincronize resultados em tempo real usando Firebase.

### Setup:

1. Crie projeto em https://firebase.google.com
2. Configure Realtime Database
3. Estrutura de dados:

```json
{
  "resultados": {
    "jogo1": {
      "time1": "Flamengo",
      "gols1": 2,
      "time2": "Botafogo",
      "gols2": 1,
      "status": "FT"
    }
  }
}
```

4. Instale Firebase SDK em `index.html`:

```html
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"></script>
```

5. Configure no `script.js`:

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "SEU_API_KEY",
    authDomain: "seu-projeto.firebaseapp.com",
    databaseURL: "https://seu-projeto.firebaseio.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456",
    appId: "1:123456:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Sincronizar em tempo real
const resultadosRef = ref(database, 'resultados');
onValue(resultadosRef, (snapshot) => {
    const dados = snapshot.val();
    if (dados) {
        const resultados = Object.values(dados);
        atualizarPlacares(resultados);
    }
});
```

### Vantagens:
- ✅ Sincronização em tempo real
- ✅ Sem latência
- ✅ Escalável
- ✅ Firebase hosting gratuito

### Desvantagens:
- ❌ Requer configuração inicial
- ❌ Limite de leituras/escritas

---

## 📌 Opção 3: Google Cloud Firestore

Banco de dados NoSQL mais robusto que Firebase.

### Setup:

1. Ative Firestore em https://console.firebase.google.com
2. Crie coleção `resultados`
3. Configure no `script.js`:

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = { /* ... */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sincronizar em tempo real
const unsubscribe = onSnapshot(collection(db, "resultados"), (snapshot) => {
    const resultados = snapshot.docs.map(doc => doc.data());
    atualizarPlacares(resultados);
});
```

---

## 📌 Opção 4: ESPN API (Gratuita)

Obtenha dados de futebol diretamente do ESPN.

```javascript
async function buscarResultadosESPN() {
    try {
        const response = await fetch(
            'https://site.api.espn.com/apis/site/v2/sports/soccer/br.1/teams'
        );
        const data = await response.json();
        
        if (data.events) {
            const resultados = data.events.map(evento => ({
                teams: {
                    home: { name: evento.competitors[0].team.name },
                    away: { name: evento.competitors[1].team.name }
                },
                goals: {
                    home: evento.competitors[0].score,
                    away: evento.competitors[1].score
                },
                fixture: { status: { short: evento.status } }
            }));
            
            atualizarPlacares(resultados);
        }
    } catch (error) {
        console.error('Erro ESPN:', error);
    }
}
```

---

## 📊 Comparação de Opções

| Opção | Setup | Tempo Real | Logos | Custo | Facilidade |
|-------|-------|-----------|-------|-------|-----------|
| API-Football | ⭐⭐⭐ | ✅ | ✅ | Freemium | ⭐⭐ |
| Football-Data | ⭐⭐ | ✅ | ❌ | Freemium | ⭐⭐⭐ |
| Google Sheets | ⭐ | Manual | ❌ | Grátis | ⭐⭐⭐⭐ |
| Firebase | ⭐⭐⭐ | ✅ | ❌ | Grátis | ⭐⭐ |
| Firestore | ⭐⭐⭐ | ✅ | ❌ | Freemium | ⭐⭐ |
| ESPN | ⭐⭐ | ✅ | ❌ | Grátis | ⭐⭐ |

---

## 🔀 Híbrida: Combinar APIs

Para maior confiabilidade, use múltiplas fontes:

```javascript
async function buscarResultadosHibrido() {
    try {
        // Tenta API-Football primeiro
        return await buscarUltimosResultados();
    } catch (error) {
        console.log('API-Football falhou, tentando ESPN...');
        try {
            return await buscarResultadosESPN();
        } catch (error2) {
            console.log('ESPN falhou, usando Google Sheets...');
            return await buscarResultadosGoogle();
        }
    }
}
```

---

## 🚀 Recomendação Final

**Para a maioria dos casos: Use API-Football**
- Melhor qualidade de dados
- Atualizações em tempo real
- Logos dos times
- Documentação excelente

**Para prototipagem rápida: Use Google Sheets**
- Setup em minutos
- Sem API key necessária
- Fácil de testar

**Para produção escalável: Use Firebase + API-Football**
- Síncrono em tempo real
- Redundância
- Sem preocupação com server

---

## 📞 Suporte

Documentações:
- API-Football: https://rapidapi.com/api-sports/api/api-football
- Firebase: https://firebase.google.com/docs
- ESPN API: https://www.espn.com/apis/site/v2/
- Football-Data: https://www.football-data.org/documentation/api


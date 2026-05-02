# FootballPro - Aplicativo Web de Futebol

Um site moderno e responsivo para um aplicativo de futebol com placar ao vivo, notificações e muito mais!

## 🌟 Novidades

### ✨ **Integração com API em Tempo Real**
Os últimos resultados agora são conectados com API de futebol em tempo real! Os placares são atualizados automaticamente a cada 30 segundos com dados reais de jogos.

**Opções disponíveis:**
- **API-Football** (Recomendado) - https://rapidapi.com/api-sports/api/api-football
- **Football-Data.org** - https://www.football-data.org/

👉 **[Leia o guia de configuração da API](API_SETUP.md)**

## 📱 Características

- **⚽ Placar ao Vivo** - Acompanhe todos os jogos em tempo real com dados dinâmicos
- **🔔 Notificações Push** - Alertas sobre gols e lances importantes
- **📊 Tabela Atualizada** - Classificação das principais competições
- **🎮 Fantasy League** - Crie seu próprio time virtual
- **📈 Estatísticas** - Análises detalhadas de jogadores e times
- **👥 Comunidade** - Conecte-se com fãs de futebol
- **🔄 Atualização Automática** - Dados sincronizados com API a cada 30 segundos

## 🎨 Design Responsivo

- Otimizado para desktop, tablet e mobile
- Interface intuitiva e moderna
- Animações suaves e agradáveis
- Cores temáticas de futebol

## 📁 Estrutura do Projeto

```
link_App/
├── index.html       # Página principal
├── styles.css       # Estilos CSS
├── script.js        # Funcionalidades JavaScript + Integração API
├── API_SETUP.md     # Guia de configuração da API
├── README.md        # Este arquivo
└── asserts/         # Pasta de assets (imagens, etc)
```

## 🚀 Como Usar

### Sem API (Dados Padrões)
1. Abra o arquivo `index.html` em seu navegador
2. O site funcionará com dados simulados

### Com API em Tempo Real (Recomendado)
1. Obtenha uma chave de API:
   - RapidAPI: https://rapidapi.com/api-sports/api/api-football
   - Football-Data: https://www.football-data.org/

2. Abra `script.js` e substitua `SEU_API_KEY_AQUI` por sua chave

3. Abra o arquivo `index.html` em seu navegador

4. Verifique no Console (F12) se os dados estão sendo carregados

**[Guia completo de setup →](API_SETUP.md)**

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com Grid e Flexbox
- **JavaScript** - Interatividade e integração com API
- **Font Awesome** - Ícones de alta qualidade
- **Fetch API** - Requisições HTTP para API

## ✨ Funcionalidades JavaScript

- ✅ Integração com API de futebol
- ✅ Atualização automática de placares (30s)
- ✅ Navegação suave (smooth scroll)
- ✅ Menu responsivo (hamburger)
- ✅ Animações ao scroll
- ✅ Validação de formulário
- ✅ Detecção de seção ativa na navbar
- ✅ Fallback para dados padrões

## 🎯 Seções do Site

### 1. Header/Navbar
- Logo do aplicativo
- Menu de navegação
- Menu hamburger para mobile

### 2. Hero Section
- Banner principal atrativo
- Chamadas para ação
- Animações ao carregar

### 3. Seção Sobre
- Descrição do aplicativo
- Principais vantagens
- Visual atrativo

### 4. Features
- 6 cards com recursos principais
- Ícones informativos
- Hover effects

### 5. Placar (Com API)
- **Últimos 3 resultados atualizados em tempo real**
- Cards interativos com logos dos times
- Status do jogo (Encerrado, Em andamento, etc)
- **Sincronização automática a cada 30 segundos**

### 6. Download
- Botões para App Store e Google Play
- Chamada para ação clara

### 7. Contato
- Formulário funcional
- Validação de dados
- Feedback ao usuário

### 8. Footer
- Informações da empresa
- Links rápidos
- Redes sociais
- Copyright

## 📱 Breakpoints Responsivos

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: até 480px

## 🎨 Paleta de Cores

- Cor Primária: #1abc9c (Teal)
- Cor Secundária: #2ecc71 (Verde)
- Escuro: #2c3e50 (Cinza escuro)
- Claro: #ecf0f1 (Branco)

## 🔌 Integração com API

### Funcionamento
1. Ao carregar a página, o `script.js` tenta se conectar à API
2. Se bem-sucedido, carrega os últimos 3 resultados
3. A cada 30 segundos, busca dados atualizados
4. Se falhar, exibe dados padrões como fallback

### Como Funciona
```javascript
// Busca resultados da API
buscarUltimosResultados()
    ↓
// Atualiza os cards na página
atualizarPlacares(dados)
    ↓
// Repete a cada 30 segundos
setInterval(...)
```

## 📊 Dados Exibidos

Para cada jogo, são exibidos:
- Logo/Escudo do time
- Nome dos times
- Placar final (gols)
- Status do jogo (Encerrado, Em andamento, etc)

## 🐛 Solução de Problemas

### Dados padrões aparecem?
- API não foi configurada
- Verifique a chave em `script.js`
- Abra o Console (F12) e veja as mensagens de erro

### Erro "401" ou "403"?
- Chave de API inválida
- Verifique em https://rapidapi.com/

### Erro "429"?
- Limite de requisições atingido
- Aumente o intervalo entre requisições

## 💡 Sugestões de Melhorias

- ✅ ~~Integração com API~~ (Feito!)
- Autenticação de usuários
- Sistema de notificações push reais
- Backend com banco de dados
- Progressive Web App (PWA)
- Testes automatizados
- Filtro por competição
- Watchlist de times favoritos

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através do formulário no site.

---

**FootballPro** - O melhor app de futebol para fãs apaixonados! ⚽

**Última atualização**: 21 de Abril de 2026

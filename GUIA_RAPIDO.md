# ⚡ Guia Rápido: Ativar API em 5 Minutos

## 🎯 Passo a Passo Simples

### 1️⃣ Obter Chave de API (2 min)

**Opção A - RapidAPI (Recomendado):**
1. Visite: https://rapidapi.com/api-sports/api/api-football
2. Clique "Sign Up" (cria conta gratuita)
3. Na página da API, clique em "Code"
4. Copie sua `x-rapidapi-key` (aquela string longa)

**Opção B - Football-Data.org:**
1. Visite: https://www.football-data.org/
2. Clique "Register"
3. Confirme email
4. Sua API key está em "Account Settings"

---

### 2️⃣ Colocar a Chave no Código (1 min)

1. Abra o arquivo `script.js` com um editor de texto
2. Procure por esta linha (perto do início):
```javascript
key: 'SEU_API_KEY_AQUI',
```

3. **Substitua por sua chave real**, por exemplo:
```javascript
key: '123456789abcdef_sua_chave_aqui',
```

4. **Salve o arquivo** (Ctrl+S)

---

### 3️⃣ Testar (2 min)

1. Abra `index.html` no navegador
2. Pressione **F12** (abre ferramentas do desenvolvedor)
3. Vá para a aba **"Console"**
4. Você deve ver uma destas mensagens:

✅ **Sucesso:**
```
Placares atualizados com sucesso!
```

❌ **Erro:**
```
Erro na API: 401
Usando dados padrões...
```

---

## 🔧 Checklist

- [ ] Criei conta em RapidAPI ou Football-Data
- [ ] Copiei minha API key
- [ ] Abri o arquivo `script.js`
- [ ] Substitui `SEU_API_KEY_AQUI` por minha chave
- [ ] Salvei o arquivo
- [ ] Abri `index.html` no navegador
- [ ] Verifiquei o Console (F12)
- [ ] Vi a mensagem de sucesso ✅

---

## 🆘 Se algo der errado...

| Mensagem | Solução |
|----------|---------|
| "Erro 401" | Chave de API inválida. Copie novamente do painel |
| "Erro 429" | Limite de requisições. Espere um pouco e tente novamente |
| "Erro 403" | Sua conta não tem permissão. Atualize o plano |
| Dados padrões | API não foi configurada. Verifique a chave |
| Sem mudança | Limpe o cache: Ctrl+Shift+Del (Chrome) |

---

## 💡 Próximos Passos

Uma vez que a API está funcionando:

1. **Mudar a liga** (ex: Premier League)
   - Edite `league=71` para outro número
   - Códigos: 39 (Premier), 78 (Bundesliga), 61 (Ligue 1)

2. **Aumentar frequência de atualização**
   - Mude `30000` para `10000` (10 segundos)

3. **Usar Google Sheets** (sem API key)
   - Veja o arquivo `INTEGRAÇÕES_GOOGLE.md`

4. **Adicionar mais informações**
   - Estatísticas de jogadores
   - Histórico de jogos
   - Classificação ao vivo

---

## 📞 Recursos Úteis

- 📖 Documentação API-Football: https://rapidapi.com/api-sports/api/api-football/details
- 📖 Documentação Football-Data: https://www.football-data.org/documentation/api
- 🐛 Console Developer: Pressione F12 no navegador
- 💻 Editor de código: Visual Studio Code (gratuito)

---

## ✅ Pronto!

Agora seus placares são **atualizados em tempo real** com dados reais de futebol! ⚽

**Dúvidas?** Abra o Console (F12) para ver mensagens detalhadas de erro.


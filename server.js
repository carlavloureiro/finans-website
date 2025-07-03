const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/cadastrar', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ erro: 'E-mail inválido' });
  }

  try {
    await db.salvarEmail(email);
    res.json({ mensagem: 'Cadastro salvo com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao salvar no banco' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

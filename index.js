const express = require('express');
const app = express();
const port = 3000;

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Servidor em execução. Faça uma solicitação POST para /api/ManipulaString para processar uma string.');
  });
  
// Rota POST para receber a string e processá-la
app.post('/api/ManipulaString', (req, res) => {
  // Verifica se o corpo da requisição contém a chave 'texto'
  if (!req.body.texto) {
    return res.status(400).json({ error: 'O corpo da requisição deve conter uma chave "texto".' });
  }

  const texto = req.body.texto;

  // Verifica se a string é um palíndromo
  const isPalindromo = checkPalindromo(texto);

  // Conta o número de ocorrências de cada caractere na string
  const ocorrencias = countCaracteres(texto);

  // Envia a resposta com os resultados
  res.json({ palindromo: isPalindromo, ocorrencias_caracteres: ocorrencias });
});

// Função para verificar se a string é um palíndromo
function checkPalindromo(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

// Função para contar o número de ocorrências de cada caractere na string
function countCaracteres(str) {
  const ocorrencias = {};
  for (let char of str) {
    if (ocorrencias[char]) {
      ocorrencias[char]++;
    } else {
      ocorrencias[char] = 1;
    }
  }
  return ocorrencias;
}

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

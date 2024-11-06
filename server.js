require('dotenv').config();
const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const db = require('./database/db'); // Configuração do banco de dados

const app = express();
const porta = 8079;

app.use(express.json());
app.use('/usuario', usuarioRoutes); // Prefixo para as rotas

app.listen(porta, () => {
    console.log("SERVIDOR RODANDO NA PORTA " + porta);
});

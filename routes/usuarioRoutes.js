const express = require('express');
const { cadastrar, login, editarSenha, editarNome, editarEmail, selecionarUsuario, desativarUsuario, ativarUsuario, home, selectUsuario } = require('./Models/usuarioModel.js');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/cadastro', cadastrar);
router.post('/login', login);
router.put('/editaSenha', editarSenha);
router.put('/editaNome', editarNome);
router.put('/editarEmail', editarEmail);
router.get('/selecionarUsuario', selecionarUsuario)
router.put('/desativaUsuario', desativarUsuario);
router.put('/ativaUsuario', ativarUsuario);
router.get('/home', home);

module.exports = router;

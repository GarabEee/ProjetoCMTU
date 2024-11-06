const UsuarioModel = require('./Models/usuarioModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET_KEY = "1020";

class UsuarioController {
    async cadastrar(req, res) {
        const { email, senha } = req.body;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regexSenha = /[A-Za-z\d!@#$%^&*]{8,}/;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
        }
        if (!regexEmail.test(email)) {
            return res.status(400).json({ mensagem: "Email inválido!" });
        }
        if (!regexSenha.test(senha)) {
            return res.status(400).json({ mensagem: "Senha inválida!" });
        }

        const senhaHash = bcrypt.hashSync(senha, 10);

        try {
            const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
            if (usuarioExistente.length > 0) {
                return res.status(400).json({ mensagem: "Email já existe na base de dados." });
            }
            await UsuarioModel.inserirUsuario(email, senhaHash);
            res.status(200).json({ mensagem: "Usuário cadastrado com sucesso." });
        } catch (err) {
            res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
        }

        try {
            const usuario = await UsuarioModel.buscarPorEmail(email);
            if (usuario.length === 0 || usuario[0].status !== 1) {
                return res.status(400).json({ mensagem: "Email incorreto ou usuário inativo!" });
            }

            const senhaCorreta = await bcrypt.compare(senha, usuario[0].senha);
            if (senhaCorreta) {
                const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
                return res.status(200).json({ message: "Login realizado com sucesso", token });
            } else {
                return res.status(400).json({ mensagem: "Senha incorreta!" });
            }
        } catch (err) {
            res.status(500).json({ mensagem: "Erro ao consultar o banco de dados." });
        }
    }

    async editarSenha(req, res) {
        const { email, senha } = req.body;
        const regexSenha = /[A-Za-z\d!@#$%^&*]{8,}/;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
        }
        if (!regexSenha.test(senha)) {
            return res.status(400).json({ mensagem: "Senha inválida" });
        }

        const senhaHash = bcrypt.hashSync(senha, 10);

        try {
            const usuario = await UsuarioModel.buscarPorEmail(email);
            if (usuario.length === 0 || usuario[0].status !== 1) {
                return res.status(400).json({ mensagem: "Email incorreto ou usuário inativo!" });
            }
            await UsuarioModel.atualizarSenha(email, senhaHash);
            res.status(200).json({ mensagem: "Senha alterada com sucesso!" });
        } catch (err) {
            res.status(500).json({ mensagem: "Erro ao atualizar senha." });
        }
    }
}

module.exports = new UsuarioController();
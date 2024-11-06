const db = require('../database/db');
const bcrypt = require("bcrypt");

class UsuarioModel {
    async buscarPorEmail(email) {
        const sql = "SELECT * FROM usuarios WHERE email = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [email], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    async inserirUsuario(email, senhaHash) {
        const sql = "INSERT INTO usuarios (email, senha) VALUES(?, ?)";
        return new Promise((resolve, reject) => {
            db.query(sql, [email, senhaHash], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    async atualizarSenha(email, senhaHash) {
        const sql = "UPDATE usuarios SET senha = ? WHERE email = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [senhaHash, email], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    async atualizarNome(email, nome) {
        const sql = "UPDATE usuarios SET nome = ? WHERE email = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [nome, email], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    async buscarPorId(id) {
        const sql = "SELECT * FROM usuarios WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    async alterarStatus(email, status) {
        const sql = "UPDATE usuarios SET status = ? WHERE email = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [status, email], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
}

module.exports = new UsuarioModel();

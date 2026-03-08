import pool from "../config/db.js";

// CRIAR USUARIO
export const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, tipo, cidade_id } = req.body;

        if (!nome || !email || !senha || !cidade_id) {
        return res.status(400).json({ erro: "Campos obrigatórios não enviados" });
        }

        const emailExistente = await pool.query(
        "SELECT id FROM usuarios WHERE email = $1 AND cidade_id = $2",
        [email, cidade_id]
        );

        if (emailExistente.rows.length > 0) {
        return res.status(400).json({ erro: "Email já cadastrado nesta cidade" });
        }

        const novoUsuario = await pool.query(
        `INSERT INTO usuarios (nome, email, senha, tipo, cidade_id)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *`,
        [nome, email, senha, tipo || "cliente", cidade_id]
        );

        res.status(201).json(novoUsuario.rows[0]);

        } catch (erro) {
        console.error("Erro ao criar usuário:", erro);
        res.status(500).json({ erro: erro.message });
    }
    };

    // LISTAR USUARIOS
    export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await pool.query("SELECT * FROM usuarios ORDER BY id");

        res.json(usuarios.rows);

    } catch (erro) {
        console.error("Erro ao listar usuários:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
    };

    // BUSCAR POR ID
    export const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await pool.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id]
        );

        if (usuario.rows.length === 0) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        res.json(usuario.rows[0]);

    } catch (erro) {
        console.error("Erro ao buscar usuário:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// ATUALIZAR
export const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo } = req.body;

        const usuario = await pool.query(
        `UPDATE usuarios
        SET
            nome = COALESCE($1,nome),
            email = COALESCE($2,email),
            senha = COALESCE($3,senha),
            tipo = COALESCE($4,tipo)
        WHERE id = $5
        RETURNING *`,
        [nome, email, senha, tipo, id]
        );

        if (usuario.rows.length === 0) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        res.json(usuario.rows[0]);

    } catch (erro) {
        console.error("Erro ao atualizar usuário:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// DELETAR
export const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await pool.query(
        "DELETE FROM usuarios WHERE id = $1 RETURNING *",
        [id]
        );

        if (usuario.rows.length === 0) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        res.json({ mensagem: "Usuário deletado com sucesso" });

    } catch (erro) {
        console.error("Erro ao deletar usuário:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};
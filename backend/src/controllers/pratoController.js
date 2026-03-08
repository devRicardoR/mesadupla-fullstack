import pool from "../config/db.js";

// CRIAR PRATO
export const criarPrato = async (req, res) => {
    try {
        const { cidade_id, restaurante_id, nome, descricao, regras } = req.body;

        if (!cidade_id || !restaurante_id || !nome) {
        return res.status(400).json({ erro: "Campos obrigatórios não enviados" });
        }

        const prato = await pool.query(
        `INSERT INTO pratos
        (cidade_id, restaurante_id, nome, descricao, regras)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *`,
        [cidade_id, restaurante_id, nome, descricao, regras]
        );

        res.status(201).json(prato.rows[0]);

    } catch (erro) {
        console.error("Erro ao criar prato:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// LISTAR PRATOS
export const listarPratos = async (req, res) => {
    try {
        const pratos = await pool.query(
        "SELECT * FROM pratos ORDER BY id"
        );

        res.json(pratos.rows);

    } catch (erro) {
        console.error("Erro ao listar pratos:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// BUSCAR POR ID
export const buscarPratoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const prato = await pool.query(
        "SELECT * FROM pratos WHERE id = $1",
        [id]
        );

        if (prato.rows.length === 0) {
        return res.status(404).json({ erro: "Prato não encontrado" });
        }

        res.json(prato.rows[0]);

    } catch (erro) {
        console.error("Erro ao buscar prato:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// ATUALIZAR
export const atualizarPrato = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, regras, ativo } = req.body;

        const prato = await pool.query(
        `UPDATE pratos
        SET
        nome = COALESCE($1,nome),
        descricao = COALESCE($2,descricao),
        regras = COALESCE($3,regras),
        ativo = COALESCE($4,ativo)
        WHERE id = $5
        RETURNING *`,
        [nome, descricao, regras, ativo, id]
        );

        if (prato.rows.length === 0) {
        return res.status(404).json({ erro: "Prato não encontrado" });
        }

        res.json(prato.rows[0]);

    } catch (erro) {
        console.error("Erro ao atualizar prato:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// DELETAR
export const deletarPrato = async (req, res) => {
    try {
        const { id } = req.params;

        const prato = await pool.query(
        "DELETE FROM pratos WHERE id = $1 RETURNING *",
        [id]
        );

        if (prato.rows.length === 0) {
        return res.status(404).json({ erro: "Prato não encontrado" });
        }

        res.json({ mensagem: "Prato deletado com sucesso" });

    } catch (erro) {
        console.error("Erro ao deletar prato:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};
import pool from "../config/db.js";

// CRIAR PLANO
export const criarPlano = async (req, res) => {
    try {
        const { cidade_id, nome, valor, duracao_dias } = req.body;

        if (!cidade_id || !nome || !valor || !duracao_dias) {
        return res.status(400).json({ erro: "Campos obrigatórios não enviados" });
        }

        const plano = await pool.query(
        `INSERT INTO planos (cidade_id, nome, valor, duracao_dias)
        VALUES ($1,$2,$3,$4)
        RETURNING *`,
        [cidade_id, nome, valor, duracao_dias]
        );

        res.status(201).json(plano.rows[0]);

    } catch (erro) {
        console.error("Erro ao criar plano:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// LISTAR PLANOS
export const listarPlanos = async (req, res) => {
    try {
        const planos = await pool.query("SELECT * FROM planos ORDER BY id");

        res.json(planos.rows);

    } catch (erro) {
        console.error("Erro ao listar planos:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
    };

    // BUSCAR POR ID
    export const buscarPlanoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const plano = await pool.query(
        "SELECT * FROM planos WHERE id = $1",
        [id]
        );

        if (plano.rows.length === 0) {
        return res.status(404).json({ erro: "Plano não encontrado" });
        }

        res.json(plano.rows[0]);

    } catch (erro) {
        console.error("Erro ao buscar plano:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
    };

    // ATUALIZAR
    export const atualizarPlano = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, valor, duracao_dias, ativo } = req.body;

        const plano = await pool.query(
        `UPDATE planos
        SET
        nome = COALESCE($1,nome),
        valor = COALESCE($2,valor),
        duracao_dias = COALESCE($3,duracao_dias),
        ativo = COALESCE($4,ativo)
        WHERE id = $5
        RETURNING *`,
        [nome, valor, duracao_dias, ativo, id]
        );

        if (plano.rows.length === 0) {
        return res.status(404).json({ erro: "Plano não encontrado" });
        }

        res.json(plano.rows[0]);

    } catch (erro) {
        console.error("Erro ao atualizar plano:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// DELETAR
export const deletarPlano = async (req, res) => {
    try {
        const { id } = req.params;

        const plano = await pool.query(
        "DELETE FROM planos WHERE id = $1 RETURNING *",
        [id]
        );

        if (plano.rows.length === 0) {
        return res.status(404).json({ erro: "Plano não encontrado" });
        }

        res.json({ mensagem: "Plano deletado com sucesso" });

    } catch (erro) {
        console.error("Erro ao deletar plano:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};
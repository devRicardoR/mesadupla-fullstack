import pool from "../config/db.js";

// CRIAR ASSINATURA
export const criarAssinatura = async (req, res) => {
    try {
        const { cidade_id, usuario_id, plano_id } = req.body;

        if (!cidade_id || !usuario_id || !plano_id) {
        return res.status(400).json({ erro: "Campos obrigatórios não enviados" });
        }

        // verificar se já existe assinatura ativa
        const assinaturaAtiva = await pool.query(
        `SELECT id FROM assinaturas
        WHERE usuario_id = $1 AND status = 'ATIVA'`,
        [usuario_id]
        );

        if (assinaturaAtiva.rows.length > 0) {
        return res.status(400).json({
            erro: "Usuário já possui uma assinatura ativa"
        });
        }

        // buscar plano para calcular duração
        const plano = await pool.query(
        "SELECT duracao_dias FROM planos WHERE id = $1",
        [plano_id]
        );

        if (plano.rows.length === 0) {
        return res.status(404).json({ erro: "Plano não encontrado" });
        }

        const duracao = plano.rows[0].duracao_dias;

        const novaAssinatura = await pool.query(
        `INSERT INTO assinaturas
        (cidade_id, usuario_id, plano_id, status, data_inicio, data_fim)
        VALUES (
            $1,
            $2,
            $3,
            'ATIVA',
            NOW(),
            NOW() + INTERVAL '${duracao} days'
        )
        RETURNING *`,
        [cidade_id, usuario_id, plano_id]
        );

        res.status(201).json(novaAssinatura.rows[0]);

    } catch (erro) {
        console.error("Erro ao criar assinatura:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};


// LISTAR ASSINATURAS
export const listarAssinaturas = async (req, res) => {
    try {

        const assinaturas = await pool.query(
        "SELECT * FROM assinaturas ORDER BY id"
        );

        res.json(assinaturas.rows);

    } catch (erro) {
        console.error("Erro ao listar assinaturas:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};


// BUSCAR POR ID
export const buscarAssinaturaPorId = async (req, res) => {
    try {

        const { id } = req.params;

        const assinatura = await pool.query(
        "SELECT * FROM assinaturas WHERE id = $1",
        [id]
        );

        if (assinatura.rows.length === 0) {
        return res.status(404).json({ erro: "Assinatura não encontrada" });
        }

        res.json(assinatura.rows[0]);

    } catch (erro) {
        console.error("Erro ao buscar assinatura:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};


// CANCELAR ASSINATURA
export const cancelarAssinatura = async (req, res) => {
    try {

        const { id } = req.params;

        const assinatura = await pool.query(
        `UPDATE assinaturas
        SET status = 'CANCELADA'
        WHERE id = $1
        RETURNING *`,
        [id]
        );

        if (assinatura.rows.length === 0) {
        return res.status(404).json({ erro: "Assinatura não encontrada" });
        }

        res.json(assinatura.rows[0]);

    } catch (erro) {
        console.error("Erro ao cancelar assinatura:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};
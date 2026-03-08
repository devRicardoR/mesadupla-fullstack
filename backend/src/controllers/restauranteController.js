import pool from "../config/db.js";

// CRIAR RESTAURANTE
export const criarRestaurante = async (req, res) => {
    try {
        const { cidade_id, usuario_id, nome, descricao, endereco, latitude, longitude } = req.body;

        if (!cidade_id || !usuario_id || !nome) {
        return res.status(400).json({ erro: "Campos obrigatórios não enviados" });
        }

        const restaurante = await pool.query(
        `INSERT INTO restaurantes 
        (cidade_id, usuario_id, nome, descricao, endereco, latitude, longitude)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
        [cidade_id, usuario_id, nome, descricao, endereco, latitude, longitude]
        );

        res.status(201).json(restaurante.rows[0]);

    } catch (erro) {
        console.error("Erro ao criar restaurante:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// LISTAR RESTAURANTES
export const listarRestaurantes = async (req, res) => {
    try {
        const restaurantes = await pool.query(
        "SELECT * FROM restaurantes ORDER BY id"
        );

        res.json(restaurantes.rows);

    } catch (erro) {
        console.error("Erro ao listar restaurantes:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
    };

    // BUSCAR POR ID
    export const buscarRestaurantePorId = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurante = await pool.query(
        "SELECT * FROM restaurantes WHERE id = $1",
        [id]
        );

        if (restaurante.rows.length === 0) {
        return res.status(404).json({ erro: "Restaurante não encontrado" });
        }

        res.json(restaurante.rows[0]);

    } catch (erro) {
        console.error("Erro ao buscar restaurante:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// ATUALIZAR
export const atualizarRestaurante = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, endereco, latitude, longitude, ativo } = req.body;

        const restaurante = await pool.query(
        `UPDATE restaurantes
        SET
        nome = COALESCE($1,nome),
        descricao = COALESCE($2,descricao),
        endereco = COALESCE($3,endereco),
        latitude = COALESCE($4,latitude),
        longitude = COALESCE($5,longitude),
        ativo = COALESCE($6,ativo)
        WHERE id = $7
        RETURNING *`,
        [nome, descricao, endereco, latitude, longitude, ativo, id]
        );

        if (restaurante.rows.length === 0) {
        return res.status(404).json({ erro: "Restaurante não encontrado" });
        }

        res.json(restaurante.rows[0]);

    } catch (erro) {
        console.error("Erro ao atualizar restaurante:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

// DELETAR
export const deletarRestaurante = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurante = await pool.query(
        "DELETE FROM restaurantes WHERE id = $1 RETURNING *",
        [id]
        );

        if (restaurante.rows.length === 0) {
        return res.status(404).json({ erro: "Restaurante não encontrado" });
        }

        res.json({ mensagem: "Restaurante deletado com sucesso" });

    } catch (erro) {
        console.error("Erro ao deletar restaurante:", erro);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
};
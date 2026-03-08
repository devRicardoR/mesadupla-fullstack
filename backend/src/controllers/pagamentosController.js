import db from "../config/db.js"

// criar pagamento
export const criarPagamento = async (req, res) => {
    try {

        const {
        cidade_id,
        usuario_id,
        assinatura_id,
        valor,
        metodo_pagamento
        } = req.body

        const result = await db.query(
        `INSERT INTO pagamentos 
        (cidade_id, usuario_id, assinatura_id, valor, metodo_pagamento)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *`,
        [cidade_id, usuario_id, assinatura_id, valor, metodo_pagamento]
        )

        res.status(201).json(result.rows[0])

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao criar pagamento" })
    }
}

// listar pagamentos
export const listarPagamentos = async (req, res) => {
    try {

        const result = await db.query(
        `SELECT * FROM pagamentos ORDER BY id DESC`
        )

        res.json(result.rows)

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao listar pagamentos" })
    }
}

// buscar pagamento por id
export const buscarPagamento = async (req, res) => {
    try {

        const { id } = req.params

        const result = await db.query(
        `SELECT * FROM pagamentos WHERE id = $1`,
        [id]
        )

        if (result.rows.length === 0) {
        return res.status(404).json({ erro: "Pagamento não encontrado" })
        }

        res.json(result.rows[0])

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao buscar pagamento" })
    }
}

// atualizar pagamento
export const atualizarPagamento = async (req, res) => {
    try {

        const { id } = req.params

        const {
        status_pagamento,
        id_pagamento_gateway
        } = req.body

        const result = await db.query(
        `UPDATE pagamentos SET
            status_pagamento = COALESCE($1, status_pagamento),
            id_pagamento_gateway = COALESCE($2, id_pagamento_gateway)
        WHERE id = $3
        RETURNING *`,
        [status_pagamento, id_pagamento_gateway, id]
        )

        if (result.rows.length === 0) {
        return res.status(404).json({ erro: "Pagamento não encontrado" })
        }

        res.json(result.rows[0])

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao atualizar pagamento" })
    }
}

// deletar pagamento
export const deletarPagamento = async (req, res) => {
    try {

        const { id } = req.params

        const result = await db.query(
        `DELETE FROM pagamentos
        WHERE id = $1
        RETURNING *`,
        [id]
        )

        if (result.rows.length === 0) {
        return res.status(404).json({ erro: "Pagamento não encontrado" })
        }

        res.json({
        mensagem: "Pagamento deletado",
        pagamento: result.rows[0]
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao deletar pagamento" })
    }
}
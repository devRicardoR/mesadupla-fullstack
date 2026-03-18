import db from "../config/db.js"
import crypto from "crypto"

// gerar resgate (QR)
export const criarResgate = async (req, res) => {
    try {

        const {
            cidade_id,
            usuario_id,
            restaurante_id,
            prato_id
        } = req.body

        // verificar assinatura ativa
        const assinatura = await db.query(
        `SELECT * FROM assinaturas
        WHERE usuario_id = $1
        AND status = 'ATIVA'`,
        [usuario_id]
        )

        if (assinatura.rows.length === 0) {
            return res.status(403).json({ erro: "Usuário não possui assinatura ativa" })
        }

        // gerar token único
        const token = crypto.randomBytes(16).toString("hex")

        const result = await db.query(
        `INSERT INTO resgates
        (cidade_id, usuario_id, restaurante_id, prato_id, token, expira_em)
        VALUES ($1,$2,$3,$4,$5,NOW() + INTERVAL '10 minutes')
        RETURNING *`,
        [cidade_id, usuario_id, restaurante_id, prato_id, token]
        )

        res.status(201).json(result.rows[0])

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao gerar resgate" })
    }
}

// listar resgates
export const listarResgates = async (req, res) => {
    try {

        const result = await db.query(
        `SELECT * FROM resgates ORDER BY id DESC`
        )

        res.json(result.rows)

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao listar resgates" })
    }
}

// buscar resgate
export const buscarResgate = async (req, res) => {
    try {

        const { id } = req.params

        const result = await db.query(
        `SELECT * FROM resgates WHERE id = $1`,
        [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ erro: "Resgate não encontrado" })
        }

        res.json(result.rows[0])

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao buscar resgate" })
    }
}

// validar resgate (restaurante)
export const validarResgate = async (req, res) => {
    try {

        const { token } = req.params

        const result = await db.query(
        `SELECT * FROM resgates WHERE token = $1`,
        [token]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ erro: "Token inválido" })
        }

        const resgate = result.rows[0]

        if (resgate.status !== "GERADO") {
            return res.status(400).json({ erro: "Resgate já utilizado ou expirado" })
        }

        if (new Date(resgate.expira_em) < new Date()) {
            return res.status(400).json({ erro: "Resgate expirado" })
        }

        const atualizado = await db.query(
        `UPDATE resgates
        SET status = 'UTILIZADO',
        utilizado_em = NOW()
        WHERE token = $1
        RETURNING *`,
        [token]
        )

        res.json(atualizado.rows[0])

    } catch (error) {
        console.error(error)
        res.status(500).json({ erro: "Erro ao validar resgate" })
    }
}
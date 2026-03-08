import express from "express"
import {
    criarPagamento,
    listarPagamentos,
    buscarPagamento,
    atualizarPagamento,
    deletarPagamento
} from "../controllers/pagamentosController.js"

const router = express.Router()

router.post("/", criarPagamento)
router.get("/", listarPagamentos)
router.get("/:id", buscarPagamento)
router.put("/:id", atualizarPagamento)
router.delete("/:id", deletarPagamento)

export default router
import express from "express"
import {
    criarResgate,
    listarResgates,
    buscarResgate,
    validarResgate
} from "../controllers/resgatesController.js"

const router = express.Router()

router.post("/", criarResgate)
router.get("/", listarResgates)
router.get("/:id", buscarResgate)
router.put("/validar/:token", validarResgate)

export default router
import express from "express";
import {
    criarAssinatura,
    listarAssinaturas,
    buscarAssinaturaPorId,
    cancelarAssinatura
} from "../controllers/assinaturaController.js";

const router = express.Router();

router.post("/", criarAssinatura);
router.get("/", listarAssinaturas);
router.get("/:id", buscarAssinaturaPorId);
router.put("/cancelar/:id", cancelarAssinatura);

export default router;
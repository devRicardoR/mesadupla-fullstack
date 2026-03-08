import express from "express";
import {
    criarPrato,
    listarPratos,
    buscarPratoPorId,
    atualizarPrato,
    deletarPrato
} from "../controllers/pratoController.js";

const router = express.Router();

router.post("/", criarPrato);
router.get("/", listarPratos);
router.get("/:id", buscarPratoPorId);
router.put("/:id", atualizarPrato);
router.delete("/:id", deletarPrato);

export default router;
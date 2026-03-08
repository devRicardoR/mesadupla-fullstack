import express from "express";
import {
    criarPlano,
    listarPlanos,
    buscarPlanoPorId,
    atualizarPlano,
    deletarPlano
} from "../controllers/planoController.js";

const router = express.Router();

router.post("/", criarPlano);
router.get("/", listarPlanos);
router.get("/:id", buscarPlanoPorId);
router.put("/:id", atualizarPlano);
router.delete("/:id", deletarPlano);

export default router;
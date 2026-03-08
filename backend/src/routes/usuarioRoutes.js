import express from "express";
import {
    criarUsuario,
    listarUsuarios,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario
} from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/", criarUsuario);
router.get("/", listarUsuarios);
router.get("/:id", buscarUsuarioPorId);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

export default router;
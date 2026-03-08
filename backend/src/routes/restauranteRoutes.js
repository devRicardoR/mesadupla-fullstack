import express from "express";
import {
    criarRestaurante,
    listarRestaurantes,
    buscarRestaurantePorId,
    atualizarRestaurante,
    deletarRestaurante
} from "../controllers/restauranteController.js";

const router = express.Router();

router.post("/", criarRestaurante);
router.get("/", listarRestaurantes);
router.get("/:id", buscarRestaurantePorId);
router.put("/:id", atualizarRestaurante);
router.delete("/:id", deletarRestaurante);

export default router;
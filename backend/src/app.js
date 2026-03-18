import express from "express";
import cors from "cors";

import cidadeRoutes from "./routes/cidadeRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import planoRoutes from "./routes/planoRoutes.js";
import restauranteRoutes from "./routes/restauranteRoutes.js";
import pratoRoutes from "./routes/pratoRoutes.js";
import assinaturaRoutes from "./routes/assinaturaRoutes.js";
import pagamentosRoutes from "./routes/pagamentosRoutes.js";
import resgatesRoutes from "./routes/resgatesRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/cidades", cidadeRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/planos", planoRoutes);
app.use("/restaurantes", restauranteRoutes);
app.use("/pratos", pratoRoutes);
app.use("/assinaturas", assinaturaRoutes);
app.use("/pagamentos", pagamentosRoutes);
app.use("/resgates", resgatesRoutes);
app.use("/auth", authRoutes);

export default app;
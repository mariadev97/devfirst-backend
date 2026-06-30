import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import ofertaRoutes from "./routes/ofertaRoutes.js";
import candidaturaRoutes from "./routes/candidaturaRoutes.js";
import perfilRoutes from "./routes/perfilRoutes.js";

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors()); // permite que el frontend (otro origen) llame a esta API
app.use(express.json()); // permite leer JSON en el body de las peticiones

// Ruta de comprobación rápida
app.get("/", (req, res) => {
  res.json({ message: "API de DevFirst funcionando 🚀" });
});

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/ofertas", ofertaRoutes);
app.use("/api/candidaturas", candidaturaRoutes);
app.use("/api/perfil", perfilRoutes);

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada." });
});

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
  });
});

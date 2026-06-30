import { Router } from "express";
import {
  listarOfertas,
  obtenerOferta,
  crearOferta,
  misOfertas,
} from "../controllers/ofertaController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

// Rutas públicas
router.get("/", listarOfertas);

// Rutas privadas (van antes de "/:id" para que no choquen con el parámetro)
router.get("/mias/listado", requireAuth, requireRole("empresa"), misOfertas);
router.post("/", requireAuth, requireRole("empresa"), crearOferta);

router.get("/:id", obtenerOferta);

export default router;

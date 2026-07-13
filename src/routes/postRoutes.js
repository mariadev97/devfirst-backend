import { Router } from "express";
import {
  listarPosts,
  obtenerPost,
  crearPost,
  editarPost,
  borrarPost,
} from "../controllers/postController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Rutas públicas
router.get("/", listarPosts);
router.get("/:slug", obtenerPost);

// Rutas privadas — solo admin
router.post("/", requireAuth, requireAdmin, crearPost);
router.put("/:id", requireAuth, requireAdmin, editarPost);
router.delete("/:id", requireAuth, requireAdmin, borrarPost);

export default router;
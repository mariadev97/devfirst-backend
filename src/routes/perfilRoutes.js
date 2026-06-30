import { Router } from "express";
import { obtenerMiPerfil, actualizarMiPerfil } from "../controllers/perfilController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, obtenerMiPerfil);
router.put("/", requireAuth, actualizarMiPerfil);

export default router;

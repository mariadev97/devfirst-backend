import { Router } from "express";
import { obtenerMiPerfil, actualizarMiPerfil } from "../controllers/perfilController.js";
import { subirCV } from "../controllers/cvController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { uploadCV } from "../config/cloudinary.js";

const router = Router();

router.get("/", requireAuth, obtenerMiPerfil);
router.put("/", requireAuth, actualizarMiPerfil);
router.post(
  "/cv",
  requireAuth,
  requireRole("candidato"),
  uploadCV.single("cv"),  // "cv" es el nombre del campo en el formulario
  subirCV
);

export default router;
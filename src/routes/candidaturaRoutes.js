import { Router } from "express";
import {
  aplicarOferta,
  misCandidaturas,
  candidaturasPorOferta,
  cambiarEstado,
} from "../controllers/candidaturaController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth, requireRole("candidato"), aplicarOferta);
router.get("/mias", requireAuth, requireRole("candidato"), misCandidaturas);
router.get(
  "/oferta/:ofertaId",
  requireAuth,
  requireRole("empresa"),
  candidaturasPorOferta
);

router.patch(
  "/:id/estado",
  requireAuth,
  requireRole("empresa"),
  cambiarEstado
);

export default router;

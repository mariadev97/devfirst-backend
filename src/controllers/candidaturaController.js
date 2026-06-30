import Candidatura from "../models/Candidatura.js";
import CandidatoProfile from "../models/CandidatoProfile.js";
import EmpresaProfile from "../models/EmpresaProfile.js";
import Oferta from "../models/Oferta.js";

// POST /api/candidaturas — el candidato aplica a una oferta
export async function aplicarOferta(req, res) {
  try {
    const candidatoProfile = await CandidatoProfile.findOne({ user: req.user.id });
    if (!candidatoProfile) {
      return res.status(404).json({ message: "No se encontró tu perfil de candidato." });
    }

    const { ofertaId } = req.body;
    const oferta = await Oferta.findById(ofertaId);
    if (!oferta) {
      return res.status(404).json({ message: "La oferta no existe." });
    }

    const candidatura = await Candidatura.create({
      oferta: ofertaId,
      candidato: candidatoProfile._id,
    });

    res.status(201).json(candidatura);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Ya has aplicado a esta oferta." });
    }
    res.status(500).json({ message: "Error al aplicar a la oferta.", error: error.message });
  }
}

// GET /api/candidaturas/mias — candidaturas del candidato autenticado
export async function misCandidaturas(req, res) {
  try {
    const candidatoProfile = await CandidatoProfile.findOne({ user: req.user.id });
    if (!candidatoProfile) {
      return res.status(404).json({ message: "No se encontró tu perfil de candidato." });
    }

    const candidaturas = await Candidatura.find({ candidato: candidatoProfile._id })
      .populate({
        path: "oferta",
        populate: { path: "empresa", select: "nombreEmpresa ubicacion" },
      })
      .sort({ createdAt: -1 });

    res.json(candidaturas);
  } catch (error) {
    res.status(500).json({ message: "Error al listar tus candidaturas.", error: error.message });
  }
}

// GET /api/candidaturas/oferta/:ofertaId — candidatos recibidos en una oferta (empresa)
export async function candidaturasPorOferta(req, res) {
  try {
    const empresaProfile = await EmpresaProfile.findOne({ user: req.user.id });
    if (!empresaProfile) {
      return res.status(404).json({ message: "No se encontró tu perfil de empresa." });
    }

    const oferta = await Oferta.findById(req.params.ofertaId);
    if (!oferta || String(oferta.empresa) !== String(empresaProfile._id)) {
      return res.status(403).json({ message: "Esta oferta no te pertenece." });
    }

    const candidaturas = await Candidatura.find({ oferta: req.params.ofertaId })
      .populate("candidato")
      .sort({ createdAt: -1 });

    res.json(candidaturas);
  } catch (error) {
    res.status(500).json({ message: "Error al listar candidaturas.", error: error.message });
  }
}

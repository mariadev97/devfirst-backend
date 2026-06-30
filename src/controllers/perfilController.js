import CandidatoProfile from "../models/CandidatoProfile.js";
import EmpresaProfile from "../models/EmpresaProfile.js";

// GET /api/perfil — devuelve el perfil del usuario autenticado (según su rol)
export async function obtenerMiPerfil(req, res) {
  try {
    if (req.user.role === "candidato") {
      const perfil = await CandidatoProfile.findOne({ user: req.user.id });
      return res.json(perfil);
    }
    const perfil = await EmpresaProfile.findOne({ user: req.user.id });
    res.json(perfil);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil.", error: error.message });
  }
}

// PUT /api/perfil — actualiza el perfil del usuario autenticado
export async function actualizarMiPerfil(req, res) {
  try {
    if (req.user.role === "candidato") {
      const perfil = await CandidatoProfile.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
      return res.json(perfil);
    }
    const perfil = await EmpresaProfile.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.json(perfil);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el perfil.", error: error.message });
  }
}

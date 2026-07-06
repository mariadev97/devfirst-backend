import CandidatoProfile from "../models/CandidatoProfile.js";

export async function subirCV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se recibió ningún archivo." });
    }

    // Para archivos raw (PDF), Cloudinary devuelve la URL en req.file.path.
    // Para imágenes, también. Así que usamos siempre req.file.path.
    const cvUrl = req.file.path;

    const perfil = await CandidatoProfile.findOneAndUpdate(
      { user: req.user.id },
      { cvUrl },
      { new: true }
    );

    if (!perfil) {
      return res.status(404).json({ message: "No se encontró tu perfil." });
    }

    res.json({ cvUrl: perfil.cvUrl });
  } catch (error) {
    res.status(500).json({ message: "Error al subir el CV.", error: error.message });
  }
}
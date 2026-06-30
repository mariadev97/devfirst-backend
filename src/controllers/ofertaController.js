import Oferta from "../models/Oferta.js";
import EmpresaProfile from "../models/EmpresaProfile.js";

// GET /api/ofertas — listado público, con filtros opcionales por query string
// Ejemplo: /api/ofertas?modalidad=remoto&area=desarrollo&tecnologia=React
export async function listarOfertas(req, res) {
  try {
    const { modalidad, area, tecnologia } = req.query;
    const filtro = { activa: true };

    if (modalidad) filtro.modalidad = modalidad;
    if (area) filtro.area = area;
    if (tecnologia) filtro.tecnologias = { $regex: tecnologia, $options: "i" };

    const ofertas = await Oferta.find(filtro)
      .populate("empresa", "nombreEmpresa ubicacion")
      .sort({ createdAt: -1 });

    res.json(ofertas);
  } catch (error) {
    res.status(500).json({ message: "Error al listar ofertas.", error: error.message });
  }
}

// GET /api/ofertas/:id
export async function obtenerOferta(req, res) {
  try {
    const oferta = await Oferta.findById(req.params.id).populate(
      "empresa",
      "nombreEmpresa ubicacion descripcion"
    );
    if (!oferta) {
      return res.status(404).json({ message: "Oferta no encontrada." });
    }
    res.json(oferta);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la oferta.", error: error.message });
  }
}

// POST /api/ofertas — solo empresas autenticadas
export async function crearOferta(req, res) {
  try {
    const empresaProfile = await EmpresaProfile.findOne({ user: req.user.id });
    if (!empresaProfile) {
      return res.status(404).json({ message: "No se encontró el perfil de empresa." });
    }

    const { titulo, descripcion, tecnologias, modalidad, area, salarioMin, salarioMax, formate } =
      req.body;

    if (salarioMin === undefined || salarioMax === undefined) {
      return res.status(400).json({ message: "El rango salarial es obligatorio." });
    }

    const oferta = await Oferta.create({
      empresa: empresaProfile._id,
      titulo,
      descripcion,
      tecnologias,
      modalidad,
      area,
      salarioMin,
      salarioMax,
      formate: !!formate,
    });

    res.status(201).json(oferta);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la oferta.", error: error.message });
  }
}

// GET /api/ofertas/mias/listado — ofertas publicadas por la empresa autenticada
export async function misOfertas(req, res) {
  try {
    const empresaProfile = await EmpresaProfile.findOne({ user: req.user.id });
    if (!empresaProfile) {
      return res.status(404).json({ message: "No se encontró el perfil de empresa." });
    }
    const ofertas = await Oferta.find({ empresa: empresaProfile._id }).sort({ createdAt: -1 });
    res.json(ofertas);
  } catch (error) {
    res.status(500).json({ message: "Error al listar tus ofertas.", error: error.message });
  }
}

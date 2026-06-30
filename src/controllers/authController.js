import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import CandidatoProfile from "../models/CandidatoProfile.js";
import EmpresaProfile from "../models/EmpresaProfile.js";

function generarToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// POST /api/auth/register
export async function register(req, res) {
  try {
    const { email, password, role, nombre, apellidos, nombreEmpresa } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, contraseña y rol son obligatorios." });
    }
    if (!["candidato", "empresa"].includes(role)) {
      return res.status(400).json({ message: 'El rol debe ser "candidato" o "empresa".' });
    }

    const existente = await User.findOne({ email });
    if (existente) {
      return res.status(409).json({ message: "Ya existe una cuenta con ese email." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, role });

    // Creamos también el perfil correspondiente, vacío salvo el nombre.
    if (role === "candidato") {
      await CandidatoProfile.create({
        user: user._id,
        nombre: nombre || "",
        apellidos: apellidos || "",
        stackTecnologico: [],
      });
    } else {
      await EmpresaProfile.create({
        user: user._id,
        nombreEmpresa: nombreEmpresa || "",
      });
    }

    const token = generarToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario.", error: error.message });
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    const passwordValida = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValida) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    const token = generarToken(user);
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión.", error: error.message });
  }
}

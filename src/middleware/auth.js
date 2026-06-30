import jwt from "jsonwebtoken";

// Verifica que la petición traiga un JWT válido en el header Authorization.
// Si es válido, añade { id, role } a req.user y deja pasar la petición.
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization; // formato: "Bearer <token>"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autenticado. Falta el token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o caducado." });
  }
}

// Se usa DESPUÉS de requireAuth para restringir una ruta a un rol concreto.
// Ejemplo: requireRole("empresa")
export function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: `Esta acción está reservada para usuarios de tipo "${role}".` });
    }
    next();
  };
}

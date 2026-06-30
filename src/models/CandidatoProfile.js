import mongoose from "mongoose";

const candidatoProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    nombre: { type: String, required: true, trim: true },
    apellidos: { type: String, trim: true },
    formacion: { type: String, trim: true },
    experiencia: { type: String, trim: true, default: "" },
    stackTecnologico: [{ type: String, trim: true }],
    ubicacion: { type: String, trim: true },
    disponibilidad: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("CandidatoProfile", candidatoProfileSchema);

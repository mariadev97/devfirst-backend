import mongoose from "mongoose";

const ofertaSchema = new mongoose.Schema(
  {
    empresa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmpresaProfile",
      required: true,
    },
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true },
    tecnologias: [{ type: String, trim: true }],
    modalidad: {
      type: String,
      enum: ["presencial", "remoto", "hibrido"],
      required: true,
    },
    area: {
      type: String,
      enum: ["desarrollo", "ciberseguridad", "datos"],
      required: true,
    },
    // El rango salarial es obligatorio: es uno de los valores diferenciales de DevFirst.
    salarioMin: { type: Number, required: true, min: 0 },
    salarioMax: { type: Number, required: true, min: 0 },
    formate: { type: Boolean, default: false }, // oferta tipo "Fórmate y trabaja"
    activa: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Oferta", ofertaSchema);

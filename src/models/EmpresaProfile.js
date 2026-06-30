import mongoose from "mongoose";

const empresaProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    nombreEmpresa: { type: String, required: true, trim: true },
    sector: { type: String, trim: true },
    ubicacion: { type: String, trim: true },
    descripcion: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("EmpresaProfile", empresaProfileSchema);

import mongoose from "mongoose";

const candidaturaSchema = new mongoose.Schema(
  {
    oferta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Oferta",
      required: true,
    },
    candidato: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidatoProfile",
      required: true,
    },
    estado: {
      type: String,
      enum: ["enviada", "en revisión", "entrevista", "rechazada", "aceptada"],
      default: "enviada",
    },
  },
  { timestamps: true } // createdAt funciona como fechaAplicacion
);

// Evita que un mismo candidato aplique dos veces a la misma oferta
candidaturaSchema.index({ oferta: 1, candidato: 1 }, { unique: true });

export default mongoose.model("Candidatura", candidaturaSchema);

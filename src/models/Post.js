import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    contenido: { type: String, required: true },
    extracto: { type: String, trim: true },
    imagenUrl: { type: String, default: "" },
    categoria: {
      type: String,
      enum: ["entrevistas", "portfolio", "salario", "tecnologias", "consejos"],
      required: true,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publicado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
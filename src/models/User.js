import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["candidato", "empresa"],
      required: true,
    },
    esAdmin: { type: Boolean, default: false },
  },
  
  { timestamps: true } // añade createdAt y updatedAt automáticamente
);

export default mongoose.model("User", userSchema);

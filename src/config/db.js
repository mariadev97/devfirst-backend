import mongoose from "mongoose";

export async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error(
        "Falta MONGODB_URI en el archivo .env. Copia .env.example a .env y rellena tu cadena de conexión de Atlas."
      );
    }
    await mongoose.connect(uri);
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
}

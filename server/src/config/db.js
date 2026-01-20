import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI no está definido en las variables de entorno");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("🟢 MongoDB conectado correctamente");
  } catch (error) {
    console.error("🔴 Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ============================
// REGISTER
// POST /api/users/register
// ============================
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

    await User.create({
      email,
      password, // 👈 NO se hashea aquí (el modelo lo hace)
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

// ============================
// LOGIN
// POST /api/users/login
// ============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Credenciales inválidas",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Credenciales inválidas",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Crear tarea / Obtener tareas
router
  .route("/")
  .post(authMiddleware, createTask)
  .get(authMiddleware, getTasks);

// Eliminar / Actualizar tarea por ID
router
  .route("/:id")
  .delete(authMiddleware, deleteTask)
  .put(authMiddleware, updateTask);

export default router;



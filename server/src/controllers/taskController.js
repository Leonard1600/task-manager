import Task from "../models/Task.js";

// ============================
// CREATE TASK
// POST /api/tasks
// ============================
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "El título es obligatorio",
      });
    }

    const task = await Task.create({
      title,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creando tarea:", error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

// ============================
// GET TASKS
// GET /api/tasks
// ============================
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error obteniendo tareas:", error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

// ============================
// DELETE TASK
// DELETE /api/tasks/:id
// ============================
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    console.error("Error eliminando tarea:", error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

// ============================
// UPDATE TASK
// PUT /api/tasks/:id
// ============================
export const updateTask = async (req, res) => {
  try {
    const { title, completed } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    res.json(task);
  } catch (error) {
    console.error("Error actualizando tarea:", error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

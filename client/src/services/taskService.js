import api from "./api";

// Obtener todas las tareas del usuario autenticado
export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

// Crear una nueva tarea
export const createTask = async (taskData) => {
  const res = await api.post("/tasks", taskData);
  return res.data;
};

// Actualizar una tarea existente
export const updateTask = async (id, taskData) => {
  const res = await api.put(`/tasks/${id}`, taskData);
  return res.data;
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};



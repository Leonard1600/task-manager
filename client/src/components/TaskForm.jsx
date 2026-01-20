import { useState } from "react";
import { createTask } from "../services/taskService";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || loading) return;

    setLoading(true);
    const task = await createTask({ title });
    onAdd(task);
    setTitle("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Escribe una nueva tarea..."
        className="flex-1 px-4 py-3 rounded-xl bg-white/80 backdrop-blur border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "..." : "Agregar"}
      </button>
    </form>
  );
};

export default TaskForm;


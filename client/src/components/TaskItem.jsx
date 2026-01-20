import { useState } from "react";
import { updateTask } from "../services/taskService";

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!title.trim()) return;
    setLoading(true);
    const updated = await updateTask(task._id, { title });
    onUpdate(updated);
    setIsEditing(false);
    setLoading(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow flex justify-between items-center">
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 mr-3 px-3 py-2 rounded-lg border focus:outline-none"
        />
      ) : (
        <span className="text-gray-800">{task.title}</span>
      )}

      <div className="flex gap-3 text-sm">
        {isEditing ? (
          <>
            <button
              onClick={save}
              className="text-green-600 hover:underline"
            >
              Guardar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:underline"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:underline"
          >
            Editar
          </button>
        )}

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskItem;


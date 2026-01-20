import TaskItem from "./TaskItem";
import { AnimatePresence } from "framer-motion";

const TaskList = ({ tasks = [], onDelete, onUpdate }) => {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No tienes tareas aún ✨
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;






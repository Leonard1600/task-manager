import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/taskService";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Header from "../components/Header";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleAdd = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const handleUpdate = (updated) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470)",
      }}
    >
      <Header />

      <main className="pt-28 px-4 pb-20 flex justify-center">
        <section className="w-full max-w-3xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-blue-600">📘</span>
            Mis tareas
          </h1>

          <TaskForm onAdd={handleAdd} />

          {loading ? (
            <p className="text-center text-gray-500 mt-6">
              Cargando tareas...
            </p>
          ) : (
            <TaskList
              tasks={tasks}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

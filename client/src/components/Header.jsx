import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center backdrop-blur bg-white/60 shadow-sm fixed top-0 z-50">
      {/* Logo / Nombre */}
      <div className="flex items-center gap-2 text-gray-800 font-semibold">
        <span className="text-blue-600 text-lg">📘</span>
        <span>Task Manager</span>
      </div>

      {/* Perfil + logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
            L
          </span>
          <span className="hidden sm:block">
            Leonard
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-600 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;

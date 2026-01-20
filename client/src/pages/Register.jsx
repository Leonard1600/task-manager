import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Solo para registro
  const [isRegistering, setIsRegistering] = useState(false); // Controla si estamos en registro o login
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      let res;
      if (isRegistering) {
        // Registro de usuario
        res = await api.post("/users/register", { name, email, password });
        setIsRegistering(false); // Después de registro, pasamos a login
      } else {
        // Login
        res = await api.post("/users/login", { email, password });
      }

      // Guardar JWT en contexto + localStorage
      login(res.data.token);

      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.response?.data?.message || "Ocurrió un error. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="bg-white p-8 rounded-lg shadow-xl w-96"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isRegistering ? "Registro" : "Iniciar sesión"}
        </h1>

        {error && (
          <p
            className="text-red-500 text-sm mb-3 text-center"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {isRegistering && (
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full p-3 mb-4 rounded bg-gray-200 text-gray-700 outline-none shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-3 mb-4 rounded bg-gray-200 text-gray-700 outline-none shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 mb-6 rounded bg-gray-200 text-gray-700 outline-none shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 transition text-white py-3 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Cargando..." : isRegistering ? "Registrar" : "Iniciar sesión"}
        </button>

        <p className="text-sm text-center mt-4">
          {isRe

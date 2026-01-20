import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
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
        res = await api.post("/users/register", { name, email, password });
        setIsRegistering(false);
      } else {
        res = await api.post("/users/login", { email, password });
      }

      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Ocurrió un error. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
      }}
    >
      {/* Overlay suave para mantener el paisaje visible */}
      <div className="absolute inset-0 bg-black/30"></div>

      <form
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="relative z-10 w-full max-w-lg p-12 rounded-3xl
                   bg-white/75 backdrop-blur-lg shadow-2xl"
      >
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          {isRegistering ? "Crear cuenta" : "Bienvenido"}
        </h1>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {isRegistering && (
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full p-4 mb-4 rounded-2xl bg-white/90 text-gray-800
                       outline-none shadow-inner focus:ring-2 focus:ring-emerald-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-4 mb-4 rounded-2xl bg-white/90 text-gray-800
                     outline-none shadow-inner focus:ring-2 focus:ring-emerald-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-4 mb-6 rounded-2xl bg-white/90 text-gray-800
                     outline-none shadow-inner focus:ring-2 focus:ring-emerald-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl font-semibold text-white
                     bg-emerald-600 hover:bg-emerald-700 transition
                     disabled:opacity-50"
        >
          {loading
            ? "Procesando..."
            : isRegistering
            ? "Registrarme"
            : "Entrar"}
        </button>

        <p className="text-sm text-center mt-6 text-gray-700">
          {isRegistering ? (
            <>
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                className="text-emerald-600 font-semibold hover:underline"
                onClick={() => setIsRegistering(false)}
              >
                Inicia sesión
              </button>
            </>
          ) : (
            <>
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                className="text-emerald-600 font-semibold hover:underline"
                onClick={() => setIsRegistering(true)}
              >
                Regístrate
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}


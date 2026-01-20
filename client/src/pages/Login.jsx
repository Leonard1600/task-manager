import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
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
        res = await api.post("/users/register", {
          name,
          email,
          password,
        });
        setIsRegistering(false);
      } else {
        res = await api.post("/users/login", {
          email,
          password,
        });
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
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay oscuro suave */}
      <div className="absolute inset-0 bg-black/40"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-[420px]"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isRegistering ? "Crear cuenta" : "Bienvenido"}
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {isRegistering && (
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full p-3 mb-4 rounded-lg bg-gray-100 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-3 mb-4 rounded-lg bg-gray-100 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 mb-6 rounded-lg bg-gray-100 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-


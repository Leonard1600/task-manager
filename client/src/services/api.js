import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

// 👉 Interceptor: agrega el token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 👉 Interceptor global de respuestas (manejo de errores)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 🔒 Token inválido o expirado
    if (status === 401 || status === 403) {
      console.warn("Sesión expirada. Cerrando sesión...");

      localStorage.removeItem("token");

      // Evitar loop infinito
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    console.error(
      "API Error:",
      error.response?.data?.message || error.message
    );

    return Promise.reject(error);
  }
);

export default api;



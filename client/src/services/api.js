import axios from "axios";

// Configuración de la URL base para la API
const api = axios.create({
  // Usamos la variable de entorno VITE_API_URL si está definida
  // Si no está definida, por defecto usamos la URL de producción
  baseURL: import.meta.env.VITE_API_URL || "https://task-manager-s2kp.onrender.com/api",  // URL de producción en Render
  timeout: 10000,  // Tiempo de espera para las solicitudes
});

// Interceptor de solicitudes para agregar el token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    // Intentamos obtener el token del localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Si el token existe, lo agregamos a los encabezados de la solicitud
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // En caso de error en la solicitud, simplemente lo rechazamos
    return Promise.reject(error);
  }
);

// Interceptor global de respuestas (para manejo de errores)
api.interceptors.response.use(
  (response) => response,  // Si la respuesta es exitosa, la retornamos
  (error) => {
    const status = error.response?.status;

    // Si el error es de tipo 401 (no autorizado) o 403 (prohibido),
    // significa que el token es inválido o expiró.
    if (status === 401 || status === 403) {
      console.warn("Sesión expirada. Cerrando sesión...");

      // Eliminamos el token del localStorage
      localStorage.removeItem("token");

      // Redirigimos al login, si no estamos ya en esa página
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Mostramos el error de la respuesta en la consola
    console.error(
      "API Error:",
      error.response?.data?.message || error.message
    );

    // Rechazamos el error para que el flujo de la aplicación lo maneje
    return Promise.reject(error);
  }
);

export default api;

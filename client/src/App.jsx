import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth"; // Usamos el componente unificado de Auth
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer"; // Importar el Footer

function App() {
  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Auth />} /> {/* Usamos Auth para login y registro */}

        {/* Ruta privada */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* Agregar el Footer al final */}
      <Footer />
    </>
  );
}

export default App;

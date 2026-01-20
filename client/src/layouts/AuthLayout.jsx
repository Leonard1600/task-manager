import Footer from "../components/Footer";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      {/* Contenedor principal */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
        {children}
      </div>

      {/* Firma personal */}
      <Footer />
    </div>
  );
};

export default AuthLayout;

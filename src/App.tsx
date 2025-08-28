export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <header className="max-w-3xl text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-700 mb-2">
          🐾 Bienvenido a PawHome
        </h1>
        <p className="text-gray-600 text-lg">
          Encuentra un nuevo hogar para tu mascota o adopta a tu nuevo mejor amigo.
        </p>
      </header>

      {/* Main */}
      <main className="max-w-2xl bg-white rounded-2xl shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Próximamente 🐶🐱
        </h2>
        <p className="text-gray-500">
          Estamos construyendo algo increíble. Muy pronto podrás publicar y adoptar mascotas desde aquí.
        </p>
      </main>

      {/* Footer */}
      <footer className="max-w-3xl text-center mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} PawHome. Todos los derechos reservados.
      </footer>
    </div>
  );
}

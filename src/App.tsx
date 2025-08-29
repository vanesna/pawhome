import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App({ signOut, user }: any) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <header className="max-w-3xl text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-700 mb-2">
          🐾 Bienvenido a PawHome
        </h1>
        <p className="text-gray-600 text-lg">
          {user
            ? `Hola ${user.username}, ya estás autenticado ✅`
            : "Encuentra un nuevo hogar para tu mascota o adopta a tu nuevo mejor amigo."}
        </p>
      </header>

      {/* Main */}
      <main className="max-w-2xl bg-white rounded-2xl shadow-md p-6 text-center">
        {user ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Próximamente 🐶🐱
            </h2>
            <p className="text-gray-500 mb-6">
              Muy pronto podrás publicar y adoptar mascotas desde aquí.
            </p>

            <button
              onClick={signOut}
              className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <p className="text-gray-500">Por favor inicia sesión para continuar.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-3xl text-center mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} PawHome. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default withAuthenticator(App);

import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { I18n } from "@aws-amplify/core";

// 👉 Traducciones al español
I18n.putVocabularies({
  es: {
    "Sign In": "Iniciar sesión",
    "Sign in": "Iniciar sesión",
    "Sign Up": "Registrarse",
    "Sign Out": "Cerrar sesión",
    "Forgot your password?": "¿Olvidaste tu contraseña?",
    "Reset your password": "Restablecer contraseña",
    "Create Account": "Crear cuenta",
    "Have an account?": "¿Ya tienes una cuenta?",
    "No account?": "¿No tienes cuenta?",
    "Confirm Password": "Confirmar contraseña",
    "Enter your Username": "Ingresa tu correo",
    "Enter your Password": "Ingresa tu contraseña",
    "Enter your Email": "Ingresa tu correo electrónico",
    "Back to Sign In": "Volver a Iniciar sesión",
    "Incorrect username or password.": "Nombre de usuario o contraseña incorrectos.",
    "Signing in": "Iniciando sesión",
    "Password must have at least 8 characters": "La contraseña debe tener al menos 8 caracteres",
    "Your passwords must match": "Las contraseñas deben coincidir",
    "Confirm": "Confirmar",
    "Resend Code": "Reenviar código",
    "We Emailed You": "Te hemos enviado un correo electrónico",
  },
});

// 👉 Establecer idioma
I18n.setLanguage("es");

const pawHomeTheme = {
  name: "pawhome-theme",
  tokens: {
    colors: {
      brand: {
        primary: { value: "#9333ea" },
        secondary: { value: "#7e22ce" },
      },
      background: {
        primary: { value: "#f9fafb" },
        secondary: { value: "#ffffff" },
      },
      font: {
        primary: { value: "#1f2937" },
        secondary: { value: "#6b7280" },
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: "{colors.brand.primary}" },
          color: { value: "#fff" },
          _hover: {
            backgroundColor: { value: "{colors.brand.secondary}" },
          },
          borderRadius: { value: "0.75rem" },
          fontWeight: { value: "600" },
        },
      },
      fieldcontrol: {
        borderColor: { value: "#d1d5db" },
        borderRadius: { value: "0.75rem" },
        padding: { value: "0.75rem" },
      },
    },
  },
};

export default function App() {
  return (
    <ThemeProvider theme={pawHomeTheme}>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Authenticator
          formFields={{
            signUp: {
              name: {
                label: "Nombre",
                placeholder: "Ingresa tu nombre",
                order: 1,
              },
              email: {
                label: "Correo electrónico",
                placeholder: "Ingresa tu correo",
                order: 2,
              },
              password: {
                label: "Contraseña",
                placeholder: "Ingresa tu contraseña",
                order: 3,
              },
              confirm_password: {
                label: "Confirmar contraseña",
                placeholder: "Confirma tu contraseña",
                order: 4,
              },
            },
            signIn: {
              username: {
                label: "Correo electrónico",
                placeholder: "Ingresa tu correo",
                order: 1,
              },
              password: {
                label: "Contraseña",
                placeholder: "Ingresa tu contraseña",
                order: 2,
              },
            },
          }}
          components={{
            Header() {
              return (
                <header className="bg-purple-600 text-white py-6 shadow-md rounded-t-2xl">
                  <h1 className="text-center text-2xl font-bold">🐾 PawHome</h1>
                </header>
              );
            },
          }}
          className="flex items-center justify-center flex-1"
        >
          {({ signOut, user }) => (
            <div className="min-h-screen flex flex-col bg-gray-100">
              <header className="bg-purple-600 text-white py-4 shadow-md">
                <h1 className="text-center text-2xl font-bold">🐾 PawHome</h1>
              </header>

              <main className="flex-1 flex items-center justify-center">
                <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {`¡Hola ${user?.signInDetails?.loginId?.split("@")[0]}! 👋`}
                  </h2>

                  <p className="text-gray-500 mb-6">
                    Ya estás autenticado ✅ Muy pronto podrás publicar y adoptar
                    mascotas desde aquí.
                  </p>

                  <button
                    onClick={signOut}
                    className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </main>

              <footer className="bg-gray-200 py-3 text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} PawHome. Todos los derechos reservados.
              </footer>
            </div>
          )}
        </Authenticator>
      </div>
    </ThemeProvider>
  );
}

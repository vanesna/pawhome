// src/App.tsx
import { useState, useEffect } from "react";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { I18n } from "@aws-amplify/core";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

import PetsList from "./pages/PetsList";
import AddPetModal from "./pages/AddPetModal";
import { getPets } from "../src/services/petsApi";
import type { Pet } from "./types";

Amplify.configure(awsExports);

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
  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadPets = async () => {
    try {
      const data = await getPets();
      setPets(data);
    } catch (err) {
      console.error("Error al obtener mascotas", err);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  return (
    <ThemeProvider theme={pawHomeTheme}>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Authenticator
          formFields={{
            signUp: {
              name: { label: "Nombre", placeholder: "Ingresa tu nombre", order: 1 },
              email: { label: "Correo electrónico", placeholder: "Ingresa tu correo", order: 2 },
              password: { label: "Contraseña", placeholder: "Ingresa tu contraseña", order: 3 },
              confirm_password: { label: "Confirmar contraseña", placeholder: "Confirma tu contraseña", order: 4 },
            },
            signIn: {
              username: { label: "Correo electrónico", placeholder: "Ingresa tu correo", order: 1 },
              password: { label: "Contraseña", placeholder: "Ingresa tu contraseña", order: 2 },
            },
          }}
          components={{
            Header() {
              return (
                <header className="bg-purple-600 text-white py-6 shadow-md rounded-t-2xl">
                  <div className="flex items-center justify-center space-x-3">
                    <img
                      src="../mascotas.png"
                      alt="Icono mascota"
                      className="w-13 h-13"
                    />
                    <h1 className="text-3xl font-bold text-center">PawHome</h1>
                  </div>
                </header>

              );
            },
          }}
          className="flex items-center justify-center flex-1"
        >
          {({ signOut, user }) => (
            <div className="min-h-screen flex flex-col bg-gray-100">
              {/* HEADER autenticado */}
              <header className="bg-purple-600 text-white py-4 shadow-md px-6 md:px-10">
                <div className="flex flex-col md:flex-row items-center md:justify-between space-y-3 md:space-y-0">
                  {/* Logo + título */}
                  <div className="flex items-center space-x-3">
                    <img
                      src="../mascotas.png"
                      alt="Icono mascota"
                      className="w-10 h-10 md:w-12 md:h-12"
                    />
                    <h1 className="text-2xl md:text-3xl font-bold">PawHome</h1>
                  </div>

                  {/* Usuario + botón salir */}
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <span className="text-sm md:text-base text-center md:text-left">
                      {`¡Hola, ${user?.signInDetails?.loginId?.split("@")[0]}!`}
                    </span>
                    <button
                      onClick={signOut}
                      className="px-3 py-1 bg-white text-purple-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition text-sm md:text-base"
                    >
                      Salir
                    </button>
                  </div>
                </div>
              </header>

              <div className="px-[5%] mt-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition font-semibold text-sm md:text-base"
                >
                  <img
                    src="../mascota-cora.png"
                    alt="Icono mascota"
                    className="w-6 h-6 md:w-9 md:h-9"
                  />
                  Publicar mascota
                </button>
              </div>


              <main className="flex-1 flex items-start justify-center py-6">
                <div className="max-w-6xl w-full px-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <PetsList pets={pets} />
                  </div>
                </div>
              </main>

              <footer className="bg-gray-200 py-3 text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} PawHome. Todos los derechos reservados.
              </footer>

              <AddPetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPetAdded={loadPets}
              />
            </div>
          )}
        </Authenticator>
      </div>
    </ThemeProvider>
  );
}

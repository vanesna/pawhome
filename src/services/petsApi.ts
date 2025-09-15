// src/services/petsApi.ts
import { fetchAuthSession } from "aws-amplify/auth";
const BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function getPets() {
  const response = await fetch(`${BASE}/pets`);
  if (!response.ok) {
    throw new Error("Error al obtener mascotas");
  }
  return response.json(); // espera un array de Pet
}

//Guardar mascota
export async function addPet(pet: {
  nombre: string;
  edad: string;
  tipo: string;
  sexo: string;
  localidad: string;
  fotoUrl?: string | null;
}) {

  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  if (!token) {
    throw new Error("No se pudo obtener el token de autenticación");
  }

  const response = await fetch(`${BASE}/pets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(pet),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error al guardar mascota: ${text}`);
  }
  return response.json();
}

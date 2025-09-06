// src/services/petsApi.ts
const BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function getPets() {
  const response = await fetch(`${BASE}/pets`);
  if (!response.ok) {
    throw new Error("Error al obtener mascotas");
  }
  return response.json(); // espera un array de Pet
}

export async function addPet(pet: {
  nombre: string;
  edad: number;
  tipo: string;
  sexo: string;
  localidad: string;
  fotoUrl?: string | null;
}) {
  const response = await fetch(`${BASE}/pets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error al guardar mascota: ${text}`);
  }
  return response.json();
}

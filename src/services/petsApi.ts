//Cargar mascotas
export async function getPets() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/pets`);
  if (!response.ok) {
    throw new Error("Error al obtener mascotas");
  }
  return response.json();
}

//Agregar mascota
export async function addPet(pet: {
  nombre: string;
  edad: number;
  tipo: string;
  sexo: string;
  localidad: string;
}) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/pets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  });

  if (!response.ok) {
    throw new Error("Error al guardar mascota");
  }
  return response.json();
}

// src/pages/PetsList.tsx
import { useEffect, useState } from "react";
import { getUrl } from "aws-amplify/storage";
import type { Pet } from "../types";

interface PetsListProps {
  pets: Pet[];
}

export default function PetsList({ pets }: PetsListProps) {
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadPhotos = async () => {
      const urls: Record<string, string> = {};

      for (const pet of pets) {
        if (pet.foto) {
          try {
            const url = await getUrl({ path: pet.foto });
            urls[pet.id] = url.url.toString();
          } catch (err) {
            console.error("Error al obtener foto de S3:", err);
            urls[pet.id] = "/mascota-negro.png"; // fallback si falla
          }
        } else {
          urls[pet.id] = "/mascota-negro.png"; // fallback si no tiene foto
        }
      }

      setPhotoUrls(urls);
    };

    if (pets.length > 0) {
      loadPhotos();
    }
  }, [pets]);

  if (pets.length === 0) {
    return <p className="text-center text-gray-500">No hay mascotas disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <div
          key={pet.id}
          className="bg-white border rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <img
            src={photoUrls[pet.id] || "/default-pet.png"} // fallback por defecto
            alt={pet.nombre}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />

          <h3 className="text-purple-600 font-bold text-xl mb-2">{pet.nombre}</h3>
          <p className="text-gray-600">Edad: {pet.edad}</p>
          <p className="text-gray-600">Tipo: {pet.tipo}</p>
          <p className="text-gray-600">Sexo: {pet.sexo}</p>
          <p className="text-gray-600">Localidad: {pet.localidad}</p>
          <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">
            Adoptar
          </button>
        </div>
      ))}
    </div>
  );
}

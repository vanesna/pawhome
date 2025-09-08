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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
      {pets.map((pet) => (
        <div
          key={pet.id}
          className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col items-center w-full max-w-xs"
        >
          <img
            src={photoUrls[pet.id] || "/default-pet.png"}
            alt={pet.nombre}
            className="w-full h-40 sm:h-48 object-cover object-center rounded-2xl mb-3 sm:mb-4 shadow-sm"
          />

          <h3 className="text-purple-700 font-extrabold text-xl sm:text-2xl mb-1 sm:mb-2 text-center drop-shadow-sm">
            {pet.nombre}
          </h3>

          <div className="text-gray-700 text-center mb-3 sm:mb-4 text-sm sm:text-base space-y-0.5">
            <p>Edad: {pet.edad}</p>
            <p>Sexo: {pet.sexo}</p>
            <p>Ubicación: {pet.localidad}</p>
          </div>

          <button className="mt-2 px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 hover:scale-105 transition transform font-semibold text-sm sm:text-base">
            Adoptar
          </button>
        </div>
      ))}
    </div>

  );
}

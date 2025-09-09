// src/pages/PetsList.tsx
import { useEffect, useState } from "react";
import { getUrl } from "aws-amplify/storage";
import type { Pet } from "../types";

interface PetsListProps {
  pets: Pet[];
  onAddPet: () => void; // 👈 Recibimos la función para abrir modal
}

export default function PetsList({ pets, onAddPet }: PetsListProps) {
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  const [filterTipo, setFilterTipo] = useState("");
  const [filterLocalidad, setFilterLocalidad] = useState("");
  const [search, setSearch] = useState("");

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
            urls[pet.id] = "/mascota-negro.png";
          }
        } else {
          urls[pet.id] = "/mascota-negro.png";
        }
      }

      setPhotoUrls(urls);
    };

    if (pets.length > 0) {
      loadPhotos();
    }
  }, [pets]);

  // Filtrar mascotas según el tipo, localidad y búsqueda
  const filteredPets = pets.filter(
    (pet) =>
      (filterTipo === "" || pet.tipo === filterTipo) &&
      (filterLocalidad === "" || pet.localidad === filterLocalidad) &&
      pet.nombre.toLowerCase().includes(search.toLowerCase())
  );

  if (pets.length === 0) {
    return <p className="text-center text-gray-500">No hay mascotas disponibles.</p>;
  }

  return (
    <div>
      {/* Barra de filtros, buscador y botón */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 w-full">
        {/* Filtros a la izquierda */}
        <div className="flex flex-wrap gap-3 mb-3 md:mb-0">
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="">Todos los tipos</option>
            <option value="Perro">Perros</option>
            <option value="Gato">Gatos</option>
            <option value="Otro">Otros</option>
          </select>

          <select
            value={filterLocalidad}
            onChange={(e) => setFilterLocalidad(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="">Todas las ubicaciones</option>
            {[...new Set(pets.map((p) => p.localidad))].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Buscador + botón a la derecha */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none w-full sm:w-auto"
          />
          <button
            onClick={onAddPet}
            className="flex items-center gap-2 px-4 py-1 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition font-semibold text-sm md:text-base ml-0 sm:ml-3"
          >
            <img
              src="../mascota-cora.png"
              alt="Icono mascota"
              className="w-6 h-6 md:w-9 md:h-9"
            />
            Publicar mascota
          </button>
        </div>
      </div>


      {/* Lista de mascotas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {filteredPets.map((pet) => (
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
    </div>
  );
}

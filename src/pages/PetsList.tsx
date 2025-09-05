import { useEffect, useState } from "react";
import { getPets } from "../services/petsApi";

type Pet = {
  id: string;
  nombre: string;
  edad: number;
  tipo: string;
  sexo: string;
  localidad: string;
};

export default function PetsList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPets()
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la lista de mascotas");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500">Cargando mascotas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">🐾 Mascotas disponibles</h2> */}
      {pets.length === 0 ? (
        <p className="text-gray-500">No hay mascotas registradas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pets.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-purple-700">{p.nombre}</h3>
              <p className="text-gray-600">
                <strong>Tipo:</strong> {p.tipo}
              </p>
              <p className="text-gray-600">
                <strong>Edad:</strong> {p.edad} años
              </p>
              <p className="text-gray-600">
                <strong>Sexo:</strong> {p.sexo}
              </p>
              <p className="text-gray-600">
                <strong>Ubicación:</strong> {p.localidad}
              </p>
                <div className="flex justify-center mt-4">
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rgb(243 244 246) rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Adoptar
                  </span>
                </button>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

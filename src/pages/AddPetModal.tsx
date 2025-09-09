// src/pages/AddPetModal.tsx
import React, { useState, useEffect } from "react";
import { uploadData } from "aws-amplify/storage";
import { addPet } from "../services/petsApi";

interface AddPetModalProps {
  onClose: () => void;
  onPetAdded: () => void;
  isOpen?: boolean;
}

const AddPetModal: React.FC<AddPetModalProps> = ({ onClose, onPetAdded, isOpen }) => {
  const [nombre, setNombre] = useState("");
  const [edadValor, setEdadValor] = useState<number>(0);
  const [edadUnidad, setEdadUnidad] = useState<"meses" | "años">("años");
  const [tipo, setTipo] = useState("");
  const [sexo, setSexo] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Resetear valores al cerrar modal
  useEffect(() => {
    if (!isOpen) {
      setNombre("");
      setEdadValor(0);
      setEdadUnidad("años");
      setTipo("");
      setSexo("");
      setLocalidad("");
      setFoto(null);
      setPreview(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let fotoKey: string | null = null;

      if (foto) {
        const uniqueKey = `pets/${Date.now()}-${foto.name.replace(/\s+/g, "_")}`;
        await uploadData({
          path: uniqueKey,
          data: foto,
        }).result;
        fotoKey = uniqueKey;
      }

      // Construir edad como string (ej: "1 año", "6 meses")
      const edad = `${edadValor} ${edadUnidad}`;

      await addPet({
        nombre,
        edad, // ahora es string
        tipo,
        sexo,
        localidad,
        fotoUrl: fotoKey,
      });

      onPetAdded();
      onClose();
    } catch (error) {
      console.error("Error al agregar mascota:", error);
      alert("Hubo un problema al guardar la mascota.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
          Publicar Mascota
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Edad (valor + unidad) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <div className="flex gap-2">
              <input
                type="text"
                min={0}
                value={edadValor}
                onChange={(e) => setEdadValor(Number(e.target.value))}
                className="w-2/3 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
              <select
                value={edadUnidad}
                onChange={(e) => setEdadUnidad(e.target.value as "meses" | "años")}
                className="w-1/3 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="años">Años</option>
                <option value="meses">Meses</option>
              </select>
            </div>
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="">Selecciona...</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Sexo</label>
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="">Selecciona...</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          {/* Localidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ubicación</label>
            <select
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            >
              <option value="">Selecciona un estado</option>
              {[
                "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
                "Ciudad de México", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco",
                "Estado de México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo",
                "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
              ].map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          {/* Foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setFoto(file);
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setPreview(reader.result as string);
                  reader.readAsDataURL(file);
                } else {
                  setPreview(null);
                }
              }}
              className="w-full border rounded-lg px-3 py-2"
            />
            {preview && (
              <img
                src={preview}
                alt="Vista previa"
                className="mt-3 h-32 w-32 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;

// src/pages/AddPetModal.tsx
import React, { useState } from "react";
import { uploadData } from "aws-amplify/storage";
import { addPet } from "../services/petsApi";

interface AddPetModalProps {
  onClose: () => void;
  onPetAdded: () => void;
  isOpen?: boolean; // 👈 opcional para integrarse con App.tsx
}

const AddPetModal: React.FC<AddPetModalProps> = ({ onClose, onPetAdded, isOpen }) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState<number>(0);
  const [tipo, setTipo] = useState("");
  const [sexo, setSexo] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  if (!isOpen) return null; // 👈 se monta solo si el modal está abierto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let fotoKey: string | null = null;

      if (foto) {
        // Generar un nombre único para la foto
        const uniqueKey = `pets/${Date.now()}-${foto.name}`;
        await uploadData({
          path: uniqueKey,
          data: foto,
        }).result;

        fotoKey = uniqueKey;
      }

      // Llamar a la API para registrar la mascota con la referencia de la foto
      await addPet({
        nombre,
        edad,
        tipo,
        sexo,
        localidad,
        fotoUrl: fotoKey, // guardamos la referencia en la BD
      });

      onPetAdded();
      onClose();
    } catch (error) {
      console.error("Error al agregar mascota:", error);
      alert("Hubo un problema al guardar la mascota.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Agregar Mascota</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(Number(e.target.value))}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Localidad"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
            className="w-full border rounded p-2"
            required
          />

          {/* Campo para subir foto */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files ? e.target.files[0] : null)}
            className="w-full border rounded p-2"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

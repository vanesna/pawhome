// src/pages/AddPetModal.tsx
import React, { useState } from "react";

interface Pet {
  nombre: string;
  tipo: string;
  edad: number;
  sexo: string;   // 👈 agregado
  localidad: string;
  descripcion: string;
}

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pet: Pet) => void;
}

export default function AddPetModal({ isOpen, onClose, onSubmit }: AddPetModalProps) {
  const [formData, setFormData] = useState<Pet>({
    nombre: "",
    tipo: "",
    edad: 0,
    sexo: "",        // 👈 agregado
    localidad: "",
    descripcion: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "edad" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">🐾 Publicar Mascota</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />

          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          >
            <option value="">Selecciona el tipo</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Otro">Otro</option>
          </select>

          <input
            type="number"
            name="edad"
            placeholder="Edad (años)"
            value={formData.edad}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            min="0"
            required
          />

          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          >
            <option value="">Selecciona el sexo</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>

          <input
            type="text"
            name="localidad"
            placeholder="Localidad"
            value={formData.localidad}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg shadow hover:bg-purple-700 transition"
          >
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
}

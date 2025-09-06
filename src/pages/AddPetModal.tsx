// src/pages/AddPetModal.tsx
import React, { useState } from "react";
import { addPet } from "../services/petsApi";
import type { Pet } from "../types";

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPetAdded: () => void;
}

export default function AddPetModal({ isOpen, onClose, onPetAdded }: AddPetModalProps) {
  const [formData, setFormData] = useState<Omit<Pet, "id">>({
    nombre: "",
    edad: 0,
    tipo: "",
    sexo: "",
    localidad: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "edad" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await addPet(formData);
      setSuccess("¡Mascota agregada exitosamente!");
      onPetAdded(); // refresca listado
      setFormData({ nombre: "", edad: 0, tipo: "", sexo: "", localidad: "" });
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1200);
    } catch (err) {
      setError("Error al guardar mascota. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Agregar Mascota</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={formData.edad || ""}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo (perro/gato)"
            value={formData.tipo}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            name="sexo"
            placeholder="Sexo (macho/hembra)"
            value={formData.sexo}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            name="localidad"
            placeholder="Localidad"
            value={formData.localidad}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

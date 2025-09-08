// src/types.ts
export interface Pet {
  id: string;
  nombre: string;
  edad: string;
  tipo: string;
  sexo: string;
  localidad: string;
  foto?: string | null;
}

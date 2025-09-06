// src/types.ts
export interface Pet {
  id: string;
  nombre: string;
  edad: number;
  tipo: string;
  sexo: string;
  localidad: string;
  foto?: string | null;
}

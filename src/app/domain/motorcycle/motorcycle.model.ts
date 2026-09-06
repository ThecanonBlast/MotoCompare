// Entidad de dominio: no depende de Angular ni de cómo se obtienen los
// datos (mock, LocalStorage, backend más adelante). Es el modelo que
// usa toda la app, sin importar la capa.
export interface Motorcycle {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  categoria: string;
  cilindrada: number; // cc
  potencia: number; // hp
  torque: number; // Nm
  precio: number; // valor de referencia
  imagen: string; // URL; vacío si no hay imagen todavía
  descripcion: string;
}

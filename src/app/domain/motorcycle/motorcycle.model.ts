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

// Filtros que soporta GET /api/motos (marca y categoria por ahora, ver
// FiltrosMoto en dominio/puertos del backend). Todos opcionales.
export interface MotorcycleFilters {
  marca?: string;
  categoria?: string;
}

// Una comparación destacada del catálogo (ej. "Yamaha MT-07 vs Kawasaki
// Z650"), con las dos motos completas — igual que ComparacionRecomendadaDTO
// del backend. Todavía sin página que la consuma (la construye el Comparador).
export interface RecommendedComparison {
  id: string;
  titulo: string;
  motoA: Motorcycle;
  motoB: Motorcycle;
}

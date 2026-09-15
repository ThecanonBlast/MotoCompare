import { Motorcycle } from '../motorcycle/motorcycle.model';

// Entidades de "Mi Garage" — mismos campos que el backend (dominio/modelo/
// MotoGuardada.ts, RegistroMantenimiento.ts, CostoMensual.ts).

export interface SavedMotorcycle {
  id: string;
  apodo: string | null;
  kilometrajeActual: number;
  agregadaEn: string;
  moto: Motorcycle;
}

export interface AddMotorcycleData {
  motoId: string;
  apodo?: string;
}

export const MAINTENANCE_TYPES = [
  'CAMBIO_ACEITE',
  'PASTILLAS_FRENO',
  'LLANTAS',
  'REVISION_GENERAL',
  'OTRO',
] as const;

export type MaintenanceType = (typeof MAINTENANCE_TYPES)[number];

export interface MaintenanceRecord {
  id: string;
  tipo: MaintenanceType;
  fecha: string;
  kilometraje: number;
  costo: number;
  notas: string | null;
  motoGuardadaId: string;
}

export interface NewMaintenanceRecord {
  tipo: MaintenanceType;
  fecha?: string;
  kilometraje: number;
  costo: number;
  notas?: string;
}

export const COST_CATEGORIES = ['COMBUSTIBLE', 'SEGURO', 'REPUESTOS', 'OTRO'] as const;

export type CostCategory = (typeof COST_CATEGORIES)[number];

export interface MonthlyCost {
  id: string;
  categoria: CostCategory;
  descripcion: string | null;
  monto: number;
  motoGuardadaId: string;
}

export interface NewMonthlyCost {
  categoria: CostCategory;
  monto: number;
  descripcion?: string;
}

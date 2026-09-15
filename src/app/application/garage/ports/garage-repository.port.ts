import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddMotorcycleData,
  MaintenanceRecord,
  MonthlyCost,
  NewMaintenanceRecord,
  NewMonthlyCost,
  SavedMotorcycle,
} from '../../../domain/garage/garage.model';

// Puerto de "Mi Garage": agrupa garage, mantenimiento y costes porque en el
// backend viven bajo la misma jerarquía de rutas (/garage, /garage/:id/
// mantenimientos, /garage/:id/costos) y requieren sesión iniciada. Sin
// adaptador mock — la sección de Ingeniería de Software 2 pide el flujo
// real, igual que autenticación.
export interface GarageRepository {
  list(): Observable<SavedMotorcycle[]>;
  add(data: AddMotorcycleData): Observable<void>;
  updateMileage(id: string, kilometrajeActual: number): Observable<void>;
  remove(id: string): Observable<void>;

  listMaintenance(savedMotorcycleId: string): Observable<MaintenanceRecord[]>;
  registerMaintenance(savedMotorcycleId: string, data: NewMaintenanceRecord): Observable<void>;

  listCosts(savedMotorcycleId: string): Observable<MonthlyCost[]>;
  configureCost(savedMotorcycleId: string, data: NewMonthlyCost): Observable<void>;
}

export const GARAGE_REPOSITORY = new InjectionToken<GarageRepository>('GarageRepository');

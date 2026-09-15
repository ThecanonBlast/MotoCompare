import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { GarageRepository } from '../../application/garage/ports/garage-repository.port';
import {
  AddMotorcycleData,
  MaintenanceRecord,
  MonthlyCost,
  NewMaintenanceRecord,
  NewMonthlyCost,
  SavedMotorcycle,
} from '../../domain/garage/garage.model';

// Único adaptador de GarageRepository: todas sus rutas requieren sesión
// (el interceptor adjunta el token, ver infrastructure/auth/auth.interceptor.ts).
@Injectable({ providedIn: 'root' })
export class HttpGarageRepository implements GarageRepository {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<SavedMotorcycle[]> {
    return this.http.get<SavedMotorcycle[]>(`${API_BASE_URL}/garage`);
  }

  add(data: AddMotorcycleData): Observable<void> {
    // El backend devuelve la MotoGuardada recién creada (sin la moto completa
    // adentro) — no nos hace falta acá porque la página vuelve a pedir la
    // lista completa después de agregar, que sí trae la moto ya resuelta.
    return this.http.post(`${API_BASE_URL}/garage`, data).pipe(map(() => undefined));
  }

  updateMileage(id: string, kilometrajeActual: number): Observable<void> {
    return this.http
      .patch(`${API_BASE_URL}/garage/${id}/kilometraje`, { kilometrajeActual })
      .pipe(map(() => undefined));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/garage/${id}`);
  }

  listMaintenance(savedMotorcycleId: string): Observable<MaintenanceRecord[]> {
    return this.http.get<MaintenanceRecord[]>(`${API_BASE_URL}/garage/${savedMotorcycleId}/mantenimientos`);
  }

  registerMaintenance(savedMotorcycleId: string, data: NewMaintenanceRecord): Observable<void> {
    return this.http
      .post(`${API_BASE_URL}/garage/${savedMotorcycleId}/mantenimientos`, data)
      .pipe(map(() => undefined));
  }

  listCosts(savedMotorcycleId: string): Observable<MonthlyCost[]> {
    return this.http.get<MonthlyCost[]>(`${API_BASE_URL}/garage/${savedMotorcycleId}/costos`);
  }

  configureCost(savedMotorcycleId: string, data: NewMonthlyCost): Observable<void> {
    return this.http.post(`${API_BASE_URL}/garage/${savedMotorcycleId}/costos`, data).pipe(map(() => undefined));
  }
}

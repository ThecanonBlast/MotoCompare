import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { MotorcycleRepository } from '../../application/motorcycle/ports/motorcycle-repository.port';
import { Motorcycle, MotorcycleFilters, RecommendedComparison } from '../../domain/motorcycle/motorcycle.model';

// Adaptador real de MotorcycleRepository contra MotoCompareBackend
// (GET /api/motos, /api/motos/:id, /api/motos/comparaciones-recomendadas).
// No requiere sesión — el catálogo es público, para invitados y registrados.
@Injectable({ providedIn: 'root' })
export class HttpMotorcycleRepository implements MotorcycleRepository {
  constructor(private readonly http: HttpClient) {}

  getAll(filters?: MotorcycleFilters): Observable<Motorcycle[]> {
    let params = new HttpParams();
    if (filters?.marca) params = params.set('marca', filters.marca);
    if (filters?.categoria) params = params.set('categoria', filters.categoria);
    return this.http.get<Motorcycle[]>(`${API_BASE_URL}/motos`, { params });
  }

  getById(id: string): Observable<Motorcycle | undefined> {
    // 404 se traduce a `undefined` (ya que el puerto lo modela así, igual
    // que hacía el mock), en vez de propagar el error HTTP a la página.
    return this.http
      .get<Motorcycle>(`${API_BASE_URL}/motos/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  getRecommendedComparisons(): Observable<RecommendedComparison[]> {
    return this.http.get<RecommendedComparison[]>(`${API_BASE_URL}/motos/comparaciones-recomendadas`);
  }
}

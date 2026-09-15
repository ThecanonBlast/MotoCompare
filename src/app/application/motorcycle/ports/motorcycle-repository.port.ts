import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorcycle, MotorcycleFilters, RecommendedComparison } from '../../../domain/motorcycle/motorcycle.model';

// Puerto: el contrato que necesita la capa de aplicación para obtener
// motos, sin importar de dónde vengan. Ahora lo implementa un adaptador
// HTTP real contra MotoCompareBackend (ver infrastructure/motorcycle);
// el adaptador mock se deja disponible por si hace falta desarrollar
// sin backend levantado.
export interface MotorcycleRepository {
  getAll(filters?: MotorcycleFilters): Observable<Motorcycle[]>;
  getById(id: string): Observable<Motorcycle | undefined>;
  getRecommendedComparisons(): Observable<RecommendedComparison[]>;
}

export const MOTORCYCLE_REPOSITORY = new InjectionToken<MotorcycleRepository>('MotorcycleRepository');

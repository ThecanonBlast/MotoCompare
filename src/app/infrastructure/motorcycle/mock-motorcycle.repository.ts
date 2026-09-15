import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Motorcycle, MotorcycleFilters, RecommendedComparison } from '../../domain/motorcycle/motorcycle.model';
import { MotorcycleRepository } from '../../application/motorcycle/ports/motorcycle-repository.port';
import { MOCK_MOTORCYCLES } from './mock-motorcycle.data';

// Adaptador concreto del puerto MotorcycleRepository con datos mock en
// memoria. Ya no es el adaptador activo (ver app.config.ts — el catálogo
// se conectó al backend real), pero se deja disponible para desarrollar
// sin necesidad de tener el backend levantado.
@Injectable({ providedIn: 'root' })
export class MockMotorcycleRepository implements MotorcycleRepository {
  getAll(filters?: MotorcycleFilters): Observable<Motorcycle[]> {
    const motos = MOCK_MOTORCYCLES.filter(
      (m) => (!filters?.marca || m.marca === filters.marca) && (!filters?.categoria || m.categoria === filters.categoria),
    );
    return of(motos);
  }

  getById(id: string): Observable<Motorcycle | undefined> {
    return of(MOCK_MOTORCYCLES.find((motorcycle) => motorcycle.id === id));
  }

  // El mock no tiene comparaciones curadas — eso vive solo en la base de datos real.
  getRecommendedComparisons(): Observable<RecommendedComparison[]> {
    return of([]);
  }
}

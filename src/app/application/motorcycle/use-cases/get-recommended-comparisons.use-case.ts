import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecommendedComparison } from '../../../domain/motorcycle/motorcycle.model';
import { MOTORCYCLE_REPOSITORY, MotorcycleRepository } from '../ports/motorcycle-repository.port';

// Caso de uso: "listar comparaciones recomendadas" (GET /api/motos/comparaciones-recomendadas).
// Sin página propia todavía — queda listo para cuando el Comparador lo use.
@Injectable({ providedIn: 'root' })
export class GetRecommendedComparisonsUseCase {
  constructor(@Inject(MOTORCYCLE_REPOSITORY) private readonly repository: MotorcycleRepository) {}

  execute(): Observable<RecommendedComparison[]> {
    return this.repository.getRecommendedComparisons();
  }
}

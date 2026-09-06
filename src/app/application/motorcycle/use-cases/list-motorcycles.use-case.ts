import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorcycle } from '../../../domain/motorcycle/motorcycle.model';
import { MOTORCYCLE_REPOSITORY, MotorcycleRepository } from '../ports/motorcycle-repository.port';

// Caso de uso: "listar motocicletas". Depende del puerto (interfaz),
// nunca del adaptador concreto — así las páginas que lo usen no saben
// (ni necesitan saber) si los datos vienen de un mock o de un backend.
@Injectable({ providedIn: 'root' })
export class ListMotorcyclesUseCase {
  constructor(@Inject(MOTORCYCLE_REPOSITORY) private readonly repository: MotorcycleRepository) {}

  execute(): Observable<Motorcycle[]> {
    return this.repository.getAll();
  }
}

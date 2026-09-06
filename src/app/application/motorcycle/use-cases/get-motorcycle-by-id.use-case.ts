import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorcycle } from '../../../domain/motorcycle/motorcycle.model';
import { MOTORCYCLE_REPOSITORY, MotorcycleRepository } from '../ports/motorcycle-repository.port';

// Caso de uso: "obtener una moto por id", para la página de Detalle.
// Igual que ListMotorcyclesUseCase, depende del puerto, nunca del
// adaptador concreto.
@Injectable({ providedIn: 'root' })
export class GetMotorcycleByIdUseCase {
  constructor(@Inject(MOTORCYCLE_REPOSITORY) private readonly repository: MotorcycleRepository) {}

  execute(id: string): Observable<Motorcycle | undefined> {
    return this.repository.getById(id);
  }
}

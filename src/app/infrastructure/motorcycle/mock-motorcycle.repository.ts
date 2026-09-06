import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Motorcycle } from '../../domain/motorcycle/motorcycle.model';
import { MotorcycleRepository } from '../../application/motorcycle/ports/motorcycle-repository.port';
import { MOCK_MOTORCYCLES } from './mock-motorcycle.data';

// Adaptador concreto del puerto MotorcycleRepository: lo implementa
// con datos mock en memoria. El día que haya backend, se crea un
// HttpMotorcycleRepository que implemente el mismo puerto y se cambia
// solo el provider en app.config.ts — el resto de la app no se entera.
@Injectable({ providedIn: 'root' })
export class MockMotorcycleRepository implements MotorcycleRepository {
  getAll(): Observable<Motorcycle[]> {
    return of(MOCK_MOTORCYCLES);
  }
}

import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorcycle } from '../../../domain/motorcycle/motorcycle.model';

// Puerto: el contrato que necesita la capa de aplicación para obtener
// motos, sin importar de dónde vengan. Hoy lo implementa un adaptador
// con datos mock (ver infrastructure/motorcycle); más adelante puede
// implementarlo un adaptador HTTP contra el backend real, sin tocar
// los casos de uso ni las páginas que los consumen.
export interface MotorcycleRepository {
  getAll(): Observable<Motorcycle[]>;
  getById(id: string): Observable<Motorcycle | undefined>;
}

export const MOTORCYCLE_REPOSITORY = new InjectionToken<MotorcycleRepository>('MotorcycleRepository');

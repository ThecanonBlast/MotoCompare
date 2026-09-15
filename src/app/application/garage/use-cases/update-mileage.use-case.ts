import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GARAGE_REPOSITORY, GarageRepository } from '../ports/garage-repository.port';

@Injectable({ providedIn: 'root' })
export class UpdateMileageUseCase {
  constructor(@Inject(GARAGE_REPOSITORY) private readonly repository: GarageRepository) {}

  execute(id: string, kilometrajeActual: number): Observable<void> {
    return this.repository.updateMileage(id, kilometrajeActual);
  }
}

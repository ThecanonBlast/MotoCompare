import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMotorcycleData } from '../../../domain/garage/garage.model';
import { GARAGE_REPOSITORY, GarageRepository } from '../ports/garage-repository.port';

@Injectable({ providedIn: 'root' })
export class AddMotorcycleToGarageUseCase {
  constructor(@Inject(GARAGE_REPOSITORY) private readonly repository: GarageRepository) {}

  execute(data: AddMotorcycleData): Observable<void> {
    return this.repository.add(data);
  }
}

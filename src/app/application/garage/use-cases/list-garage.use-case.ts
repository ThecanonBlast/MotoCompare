import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedMotorcycle } from '../../../domain/garage/garage.model';
import { GARAGE_REPOSITORY, GarageRepository } from '../ports/garage-repository.port';

@Injectable({ providedIn: 'root' })
export class ListGarageUseCase {
  constructor(@Inject(GARAGE_REPOSITORY) private readonly repository: GarageRepository) {}

  execute(): Observable<SavedMotorcycle[]> {
    return this.repository.list();
  }
}

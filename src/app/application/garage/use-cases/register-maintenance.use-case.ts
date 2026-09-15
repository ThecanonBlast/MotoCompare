import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewMaintenanceRecord } from '../../../domain/garage/garage.model';
import { GARAGE_REPOSITORY, GarageRepository } from '../ports/garage-repository.port';

@Injectable({ providedIn: 'root' })
export class RegisterMaintenanceUseCase {
  constructor(@Inject(GARAGE_REPOSITORY) private readonly repository: GarageRepository) {}

  execute(savedMotorcycleId: string, data: NewMaintenanceRecord): Observable<void> {
    return this.repository.registerMaintenance(savedMotorcycleId, data);
  }
}

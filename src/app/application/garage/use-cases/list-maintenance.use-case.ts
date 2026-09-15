import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaintenanceRecord } from '../../../domain/garage/garage.model';
import { GARAGE_REPOSITORY, GarageRepository } from '../ports/garage-repository.port';

@Injectable({ providedIn: 'root' })
export class ListMaintenanceUseCase {
  constructor(@Inject(GARAGE_REPOSITORY) private readonly repository: GarageRepository) {}

  execute(savedMotorcycleId: string): Observable<MaintenanceRecord[]> {
    return this.repository.listMaintenance(savedMotorcycleId);
  }
}

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewMonthlyCost } from '../../../domain/garage/garage.model';
import { GARAGE_REPOSITORY, GarageRepository } from '../ports/garage-repository.port';

@Injectable({ providedIn: 'root' })
export class ConfigureMonthlyCostUseCase {
  constructor(@Inject(GARAGE_REPOSITORY) private readonly repository: GarageRepository) {}

  execute(savedMotorcycleId: string, data: NewMonthlyCost): Observable<void> {
    return this.repository.configureCost(savedMotorcycleId, data);
  }
}

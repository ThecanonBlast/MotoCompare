import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyCost } from '../../../domain/garage/garage.model';
import { GARAGE_REPOSITORY, GarageRepository } from '../ports/garage-repository.port';

@Injectable({ providedIn: 'root' })
export class ListMonthlyCostsUseCase {
  constructor(@Inject(GARAGE_REPOSITORY) private readonly repository: GarageRepository) {}

  execute(savedMotorcycleId: string): Observable<MonthlyCost[]> {
    return this.repository.listCosts(savedMotorcycleId);
  }
}

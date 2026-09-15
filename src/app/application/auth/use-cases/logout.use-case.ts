import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_REPOSITORY, AuthRepository } from '../ports/auth-repository.port';

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private readonly repository: AuthRepository) {}

  execute(): Observable<void> {
    return this.repository.logout();
  }
}

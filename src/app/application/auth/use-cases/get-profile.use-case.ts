import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../domain/user/user.model';
import { AUTH_REPOSITORY, AuthRepository } from '../ports/auth-repository.port';

@Injectable({ providedIn: 'root' })
export class GetProfileUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private readonly repository: AuthRepository) {}

  execute(): Observable<User> {
    return this.repository.getProfile();
  }
}

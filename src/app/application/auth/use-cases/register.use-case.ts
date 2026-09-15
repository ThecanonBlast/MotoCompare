import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterData, User } from '../../../domain/user/user.model';
import { AUTH_REPOSITORY, AuthRepository } from '../ports/auth-repository.port';

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private readonly repository: AuthRepository) {}

  execute(data: RegisterData): Observable<User> {
    return this.repository.register(data);
  }
}

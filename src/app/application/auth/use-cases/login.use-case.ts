import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSession, LoginData } from '../../../domain/user/user.model';
import { AUTH_REPOSITORY, AuthRepository } from '../ports/auth-repository.port';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private readonly repository: AuthRepository) {}

  execute(data: LoginData): Observable<AuthSession> {
    return this.repository.login(data);
  }
}

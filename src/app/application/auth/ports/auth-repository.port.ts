import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSession, LoginData, RegisterData, User } from '../../../domain/user/user.model';

// Puerto: lo que la app necesita del sistema de autenticación, sin decir
// de dónde sale. Solo tiene un adaptador real (HttpAuthRepository) — a
// propósito no existe una versión mock, porque el flujo debe usar la API
// real de MotoCompareBackend (sin datos simulados).
export interface AuthRepository {
  register(data: RegisterData): Observable<User>;
  login(data: LoginData): Observable<AuthSession>;
  logout(): Observable<void>;
  getProfile(): Observable<User>;
}

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AuthRepository');

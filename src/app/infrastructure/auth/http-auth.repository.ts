import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { AuthRepository } from '../../application/auth/ports/auth-repository.port';
import { AuthSession, LoginData, RegisterData, User } from '../../domain/user/user.model';

// Único adaptador de AuthRepository: llama directo a MotoCompareBackend.
// A diferencia de MotorcycleRepository (que hoy solo tiene mock), acá no
// existe un mock a propósito — el enunciado pide el flujo real contra
// PostgreSQL, sin datos simulados.
@Injectable({ providedIn: 'root' })
export class HttpAuthRepository implements AuthRepository {
  constructor(private readonly http: HttpClient) {}

  register(data: RegisterData): Observable<User> {
    return this.http.post<User>(`${API_BASE_URL}/auth/registro`, data);
  }

  login(data: LoginData): Observable<AuthSession> {
    return this.http.post<AuthSession>(`${API_BASE_URL}/auth/login`, data);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${API_BASE_URL}/auth/logout`, {});
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${API_BASE_URL}/auth/perfil`);
  }
}

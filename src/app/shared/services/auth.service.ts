import { Injectable, computed, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginUseCase } from '../../application/auth/use-cases/login.use-case';
import { LogoutUseCase } from '../../application/auth/use-cases/logout.use-case';
import { RegisterUseCase } from '../../application/auth/use-cases/register.use-case';
import { GetProfileUseCase } from '../../application/auth/use-cases/get-profile.use-case';
import { AuthSession, LoginData, RegisterData, User } from '../../domain/user/user.model';

const CLAVE_LOCAL_STORAGE = 'motocompare_sesion';

interface SesionGuardada {
  token: string;
  usuario: User;
}

// Estado de sesión de toda la app, expuesto como signals para que la
// navbar, los guards y cualquier página reaccionen sin suscribirse a mano.
// El JWT es stateless del lado del cliente: lo único que persiste acá es
// el token + el usuario, en LocalStorage, para sobrevivir a un refresh.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sesion = signal<SesionGuardada | null>(this.leerSesionGuardada());

  readonly usuario = computed(() => this.sesion()?.usuario ?? null);
  readonly estaAutenticado = computed(() => this.sesion() !== null);
  readonly token = computed(() => this.sesion()?.token ?? null);

  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
  ) {}

  register(data: RegisterData): Observable<User> {
    return this.registerUseCase.execute(data);
  }

  login(data: LoginData): Observable<AuthSession> {
    return this.loginUseCase.execute(data).pipe(tap((sesion) => this.guardarSesion(sesion)));
  }

  // Cierra la sesión en el backend (revoca el token, ver SesionRevocada) y
  // limpia el estado local. Si la llamada al backend falla (ej. red caída),
  // quien llame a esto debe decidir qué hacer con el error; de todas formas
  // conviene limpiar la sesión local para que el usuario no quede "atascado".
  logout(): Observable<void> {
    return this.logoutUseCase.execute().pipe(tap(() => this.limpiarSesionLocal()));
  }

  getProfile(): Observable<User> {
    return this.getProfileUseCase.execute();
  }

  // Borra solo el estado local, sin avisar al backend — lo usa el interceptor
  // cuando el backend responde 401 (token inválido, expirado o ya revocado),
  // para no reintentar un logout que de todas formas va a fallar.
  limpiarSesionLocal(): void {
    this.sesion.set(null);
    localStorage.removeItem(CLAVE_LOCAL_STORAGE);
  }

  private guardarSesion(sesion: AuthSession): void {
    this.sesion.set(sesion);
    localStorage.setItem(CLAVE_LOCAL_STORAGE, JSON.stringify(sesion));
  }

  private leerSesionGuardada(): SesionGuardada | null {
    try {
      const guardada = localStorage.getItem(CLAVE_LOCAL_STORAGE);
      return guardada ? (JSON.parse(guardada) as SesionGuardada) : null;
    } catch {
      return null;
    }
  }
}

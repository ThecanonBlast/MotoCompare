import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { API_BASE_URL } from '../config/api.config';

// Interceptor funcional: adjunta el token a cada request contra nuestra API
// (si hay sesión) y, si el backend responde 401 (token inválido, expirado o
// ya revocado por un logout), limpia la sesión local para no dejar al
// usuario con un estado "autenticado" que en realidad ya no sirve.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const esPeticionAlBackend = req.url.startsWith(API_BASE_URL);
  const token = authService.token();

  const peticion = esPeticionAlBackend && token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(peticion).pipe(
    catchError((error: unknown) => {
      if (esPeticionAlBackend && error instanceof HttpErrorResponse && error.status === 401) {
        authService.limpiarSesionLocal();
      }
      return throwError(() => error);
    }),
  );
};

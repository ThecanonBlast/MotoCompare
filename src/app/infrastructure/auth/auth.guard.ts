import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

// Protege rutas que requieren sesión iniciada (ej. /perfil, /garage).
// Redirige a /login si no hay sesión, sin llamar al backend — la
// autenticación real de cada petición la sigue validando el backend.
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaAutenticado()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

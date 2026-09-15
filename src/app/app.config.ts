import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MOTORCYCLE_REPOSITORY } from './application/motorcycle/ports/motorcycle-repository.port';
import { HttpMotorcycleRepository } from './infrastructure/motorcycle/http-motorcycle.repository';
import { AUTH_REPOSITORY } from './application/auth/ports/auth-repository.port';
import { HttpAuthRepository } from './infrastructure/auth/http-auth.repository';
import { authInterceptor } from './infrastructure/auth/auth.interceptor';
import { GARAGE_REPOSITORY } from './application/garage/ports/garage-repository.port';
import { HttpGarageRepository } from './infrastructure/garage/http-garage.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // El interceptor adjunta el JWT a cada request contra nuestra API y
    // reacciona a un 401 limpiando la sesión local (ver auth.interceptor.ts).
    provideHttpClient(withInterceptors([authInterceptor])),
    // Adaptador actual del puerto MotorcycleRepository: HTTP real contra
    // MotoCompareBackend. Para volver a datos mock (ej. desarrollar sin
    // backend levantado), se cambia useClass a MockMotorcycleRepository.
    { provide: MOTORCYCLE_REPOSITORY, useClass: HttpMotorcycleRepository },
    // Único adaptador de AuthRepository: sin mock, a propósito (ver
    // application/auth/ports/auth-repository.port.ts).
    { provide: AUTH_REPOSITORY, useClass: HttpAuthRepository },
    // Único adaptador de GarageRepository: sin mock, requiere sesión iniciada.
    { provide: GARAGE_REPOSITORY, useClass: HttpGarageRepository },
  ],
};

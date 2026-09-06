import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MOTORCYCLE_REPOSITORY } from './application/motorcycle/ports/motorcycle-repository.port';
import { MockMotorcycleRepository } from './infrastructure/motorcycle/mock-motorcycle.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Adaptador actual del puerto MotorcycleRepository. Para cambiar a
    // un backend real más adelante, solo se reemplaza useClass acá.
    { provide: MOTORCYCLE_REPOSITORY, useClass: MockMotorcycleRepository },
  ],
};

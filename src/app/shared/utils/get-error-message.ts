import { HttpErrorResponse } from '@angular/common/http';

// Extrae un mensaje de error legible de una respuesta HTTP fallida. El
// backend siempre manda `{ error: '...' }` en sus respuestas de error
// (ver infraestructura/http/servidor.ts y rutas/*.ts de MotoCompareBackend);
// si la petición ni siquiera llegó al backend (servidor caído, sin red),
// se lo decimos explícitamente en vez de un mensaje genérico engañoso.
export function getErrorMessage(error: unknown, mensajePorDefecto: string): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
    }
    const mensajeBackend = error.error?.error;
    if (typeof mensajeBackend === 'string') {
      return mensajeBackend;
    }
  }
  return mensajePorDefecto;
}

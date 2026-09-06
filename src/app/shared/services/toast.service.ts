import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  text: string;
}

const AUTO_DISMISS_MS = 3000;

// Servicio simple para mostrar mensajes de confirmación en una esquina de
// la pantalla (ej. "Agregado a favoritos"). Cualquier componente puede
// inyectarlo y llamar a show(...); el componente ToastComponent (montado
// una sola vez en app.html) es el único que lo renderiza.
@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  readonly message = signal<ToastMessage | null>(null);

  show(text: string): void {
    const id = ++this.nextId;
    this.message.set({ id, text });

    setTimeout(() => {
      // Si mientras tanto se mostró otro mensaje, no lo pisamos al cerrar.
      if (this.message()?.id === id) {
        this.message.set(null);
      }
    }, AUTO_DISMISS_MS);
  }
}

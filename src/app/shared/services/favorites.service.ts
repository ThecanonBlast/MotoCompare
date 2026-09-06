import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'motocompare:favorites';

function readStoredIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    // Si el LocalStorage no está disponible o el dato guardado es
    // inválido, simplemente arrancamos sin favoritos en vez de romper
    // la página.
    return [];
  }
}

// Servicio simple de favoritos en LocalStorage (sin necesidad de cuenta,
// según la especificación del proyecto). Es intencionalmente básico —
// no pasa por el patrón de puerto/adaptador porque no hay, por ahora,
// un backend que lo vaya a reemplazar; si eso cambia más adelante, se
// puede migrar siguiendo el mismo patrón usado en Catálogo.
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly ids = signal<Set<string>>(new Set(readStoredIds()));

  isFavorite(id: string): boolean {
    return this.ids().has(id);
  }

  toggle(id: string): boolean {
    const current = new Set(this.ids());
    const isNowFavorite = !current.has(id);

    if (isNowFavorite) {
      current.add(id);
    } else {
      current.delete(id);
    }

    this.ids.set(current);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current]));

    return isNowFavorite;
  }
}

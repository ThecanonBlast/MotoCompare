import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'motocompare:compare';

function readStoredIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    // Si el LocalStorage no está disponible o el dato guardado es
    // inválido, simplemente arrancamos sin selección en vez de romper
    // la página.
    return [];
  }
}

// Guarda hasta dos motos seleccionadas para comparar (misma idea que
// FavoritesService: LocalStorage, sin necesidad de cuenta). La página
// del comparador lee esta lista para saber qué motos mostrar.
@Injectable({ providedIn: 'root' })
export class CompareService {
  private readonly ids = signal<string[]>(readStoredIds());
  readonly selectedIds = this.ids.asReadonly();

  // Agrega una moto a la comparación.
  // - Si ya estaba seleccionada, no hace nada.
  // - Si hay un espacio libre (0 o 1 motos seleccionadas), la agrega.
  // - Si ya había dos motos seleccionadas, reemplaza la más antigua
  //   (posición 0) por la nueva, para que el botón "Comparar esta moto"
  //   nunca quede bloqueado esperando que el usuario quite una primero.
  select(id: string): 'added' | 'already-selected' | 'replaced' {
    const current = this.ids();

    if (current.includes(id)) {
      return 'already-selected';
    }

    if (current.length < 2) {
      this.update([...current, id]);
      return 'added';
    }

    this.update([current[1], id]);
    return 'replaced';
  }

  remove(id: string): void {
    this.update(this.ids().filter((existing) => existing !== id));
  }

  clear(): void {
    this.update([]);
  }

  private update(ids: string[]): void {
    this.ids.set(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
}

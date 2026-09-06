import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MotorcycleCard } from '../../shared/components/motorcycle-card/motorcycle-card';
import { ListMotorcyclesUseCase } from '../../application/motorcycle/use-cases/list-motorcycles.use-case';

@Component({
  selector: 'app-motorcycles',
  imports: [MotorcycleCard],
  templateUrl: './motorcycles.html',
  styleUrl: './motorcycles.scss',
})
export class Motorcycles {
  private readonly listMotorcycles = inject(ListMotorcyclesUseCase);

  private readonly motorcycles = toSignal(this.listMotorcycles.execute(), { initialValue: [] });

  protected readonly selectedMarca = signal('');
  protected readonly selectedCategoria = signal('');

  protected readonly marcas = computed(() => [...new Set(this.motorcycles().map((m) => m.marca))].sort());
  protected readonly categorias = computed(() =>
    [...new Set(this.motorcycles().map((m) => m.categoria))].sort()
  );

  protected readonly filteredMotorcycles = computed(() =>
    this.motorcycles().filter((m) => {
      const matchesMarca = !this.selectedMarca() || m.marca === this.selectedMarca();
      const matchesCategoria = !this.selectedCategoria() || m.categoria === this.selectedCategoria();
      return matchesMarca && matchesCategoria;
    })
  );

  protected onMarcaChange(value: string): void {
    this.selectedMarca.set(value);
  }

  protected onCategoriaChange(value: string): void {
    this.selectedCategoria.set(value);
  }
}

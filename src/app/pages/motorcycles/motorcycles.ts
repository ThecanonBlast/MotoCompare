import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MotorcycleCard } from '../../shared/components/motorcycle-card/motorcycle-card';
import { ListMotorcyclesUseCase } from '../../application/motorcycle/use-cases/list-motorcycles.use-case';
import { CompareService } from '../../shared/services/compare.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-motorcycles',
  imports: [MotorcycleCard],
  templateUrl: './motorcycles.html',
  styleUrl: './motorcycles.scss',
})
export class Motorcycles {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly listMotorcycles = inject(ListMotorcyclesUseCase);
  private readonly compareService = inject(CompareService);
  private readonly toast = inject(ToastService);

  private readonly motorcycles = toSignal(this.listMotorcycles.execute(), { initialValue: [] });
  private readonly queryParams = toSignal(this.route.queryParamMap);

  // Se llega aquí con ?compare=true solo desde el link "O elige otra
  // desde el catálogo" del comparador. En ese caso, un clic en una moto
  // la selecciona directamente en vez de llevar al detalle.
  protected readonly isSelectingForCompare = computed(() => this.queryParams()?.get('compare') === 'true');

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

  protected onPickForCompare(id: string): void {
    const result = this.compareService.select(id);

    if (result === 'replaced') {
      this.toast.show('Se reemplazó tu selección anterior para comparar');
    }

    this.router.navigate(['/comparador']);
  }
}

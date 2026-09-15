import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListMotorcyclesUseCase } from '../../application/motorcycle/use-cases/list-motorcycles.use-case';
import { CompareService } from '../../shared/services/compare.service';
import { Motorcycle } from '../../domain/motorcycle/motorcycle.model';
import { formatPrice } from '../../shared/utils/format-price';
import { buildComparisonRows } from '../../shared/utils/motorcycle-comparison';
import { getRecommendationText } from '../../shared/utils/get-recommendation';
import { getRecommendedMotorcycles } from '../../shared/utils/get-recommended-motorcycles';

@Component({
  selector: 'app-compare',
  imports: [RouterLink],
  templateUrl: './compare.html',
  styleUrl: './compare.scss',
})
export class Compare {
  private readonly listMotorcycles = inject(ListMotorcyclesUseCase);
  protected readonly compareService = inject(CompareService);

  private readonly allMotorcycles = toSignal(this.listMotorcycles.execute(), { initialValue: [] });

  protected readonly motoA = computed(() => this.findSelected(0));
  protected readonly motoB = computed(() => this.findSelected(1));

  // Motos sugeridas para el carrusel del segundo puesto. Solo tiene
  // sentido calcularlas cuando ya hay una moto principal y todavía
  // falta elegir la segunda.
  protected readonly recommendedMotorcycles = computed(() => {
    const main = this.motoA();
    if (!main || this.motoB()) {
      return [];
    }
    return getRecommendedMotorcycles(main, this.allMotorcycles());
  });

  protected readonly comparisonRows = computed(() => {
    const a = this.motoA();
    const b = this.motoB();
    return a && b ? buildComparisonRows(a, b) : [];
  });

  protected readonly recommendation = computed(() => {
    const a = this.motoA();
    const b = this.motoB();
    return a && b ? getRecommendationText(a, b) : '';
  });

  protected readonly formatPrice = formatPrice;

  private findSelected(index: number): Motorcycle | undefined {
    const id = this.compareService.selectedIds()[index];
    return id ? this.allMotorcycles().find((moto) => moto.id === id) : undefined;
  }

  protected selectRecommended(id: string): void {
    this.compareService.select(id);
  }

  protected removeMotorcycle(id: string): void {
    this.compareService.remove(id);
  }

  protected clearSelection(): void {
    this.compareService.clear();
  }
}

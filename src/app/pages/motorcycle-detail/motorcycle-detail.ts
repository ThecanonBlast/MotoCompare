import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { GetMotorcycleByIdUseCase } from '../../application/motorcycle/use-cases/get-motorcycle-by-id.use-case';
import { FavoritesService } from '../../shared/services/favorites.service';
import { CompareService } from '../../shared/services/compare.service';
import { ToastService } from '../../shared/services/toast.service';
import { formatPrice } from '../../shared/utils/format-price';

@Component({
  selector: 'app-motorcycle-detail',
  imports: [RouterLink],
  templateUrl: './motorcycle-detail.html',
  styleUrl: './motorcycle-detail.scss',
})
export class MotorcycleDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly getMotorcycleById = inject(GetMotorcycleByIdUseCase);
  protected readonly favorites = inject(FavoritesService);
  private readonly compare = inject(CompareService);
  private readonly toast = inject(ToastService);

  protected readonly motorcycle = toSignal(
    this.route.paramMap.pipe(switchMap((params) => this.getMotorcycleById.execute(params.get('id')!))),
    { initialValue: undefined },
  );

  protected readonly formatPrice = formatPrice;

  protected toggleFavorite(id: string): void {
    const isNowFavorite = this.favorites.toggle(id);
    this.toast.show(isNowFavorite ? 'Agregada a favoritos' : 'Quitada de favoritos');
  }

  protected compareThisMotorcycle(id: string): void {
    const result = this.compare.select(id);

    if (result === 'replaced') {
      this.toast.show('Se reemplazó tu selección anterior para comparar');
    }

    this.router.navigate(['/comparador']);
  }
}

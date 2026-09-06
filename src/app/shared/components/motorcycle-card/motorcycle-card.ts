import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Motorcycle } from '../../../domain/motorcycle/motorcycle.model';
import { formatPrice } from '../../utils/format-price';

@Component({
  selector: 'app-motorcycle-card',
  imports: [RouterLink],
  templateUrl: './motorcycle-card.html',
  styleUrl: './motorcycle-card.scss',
})
export class MotorcycleCard {
  readonly motorcycle = input.required<Motorcycle>();
  protected readonly formatPrice = formatPrice;
}

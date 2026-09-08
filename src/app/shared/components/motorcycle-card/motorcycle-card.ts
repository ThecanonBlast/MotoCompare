import { Component, input, output } from '@angular/core';
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

  // Cuando es true, la tarjeta cambia "Ver detalle" por un botón para
  // elegir esta moto directamente. Se usa en el catálogo cuando se llega
  // ahí desde el comparador, para elegir la segunda moto en un solo clic.
  readonly selectableForCompare = input(false);
  readonly pickForCompare = output<string>();

  protected readonly formatPrice = formatPrice;

  protected onPickForCompare(): void {
    this.pickForCompare.emit(this.motorcycle().id);
  }
}

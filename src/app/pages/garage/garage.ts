import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListMotorcyclesUseCase } from '../../application/motorcycle/use-cases/list-motorcycles.use-case';
import { ListGarageUseCase } from '../../application/garage/use-cases/list-garage.use-case';
import { AddMotorcycleToGarageUseCase } from '../../application/garage/use-cases/add-motorcycle-to-garage.use-case';
import { UpdateMileageUseCase } from '../../application/garage/use-cases/update-mileage.use-case';
import { RemoveMotorcycleFromGarageUseCase } from '../../application/garage/use-cases/remove-motorcycle-from-garage.use-case';
import { ListMaintenanceUseCase } from '../../application/garage/use-cases/list-maintenance.use-case';
import { RegisterMaintenanceUseCase } from '../../application/garage/use-cases/register-maintenance.use-case';
import { ListMonthlyCostsUseCase } from '../../application/garage/use-cases/list-monthly-costs.use-case';
import { ConfigureMonthlyCostUseCase } from '../../application/garage/use-cases/configure-monthly-cost.use-case';
import {
  COST_CATEGORIES,
  CostCategory,
  MAINTENANCE_TYPES,
  MaintenanceRecord,
  MaintenanceType,
  MonthlyCost,
  SavedMotorcycle,
} from '../../domain/garage/garage.model';
import { getErrorMessage } from '../../shared/utils/get-error-message';
import { formatPrice } from '../../shared/utils/format-price';

@Component({
  selector: 'app-garage',
  imports: [DatePipe],
  templateUrl: './garage.html',
  styleUrl: './garage.scss',
})
export class Garage {
  protected readonly formatPrice = formatPrice;

  private readonly listGarageUseCase = inject(ListGarageUseCase);
  private readonly addMotorcycleUseCase = inject(AddMotorcycleToGarageUseCase);
  private readonly updateMileageUseCase = inject(UpdateMileageUseCase);
  private readonly removeMotorcycleUseCase = inject(RemoveMotorcycleFromGarageUseCase);
  private readonly listMaintenanceUseCase = inject(ListMaintenanceUseCase);
  private readonly registerMaintenanceUseCase = inject(RegisterMaintenanceUseCase);
  private readonly listCostsUseCase = inject(ListMonthlyCostsUseCase);
  private readonly configureCostUseCase = inject(ConfigureMonthlyCostUseCase);
  private readonly listMotorcyclesUseCase = inject(ListMotorcyclesUseCase);

  // Catálogo completo, para el <select> de "agregar moto al garage".
  protected readonly catalog = toSignal(this.listMotorcyclesUseCase.execute(), { initialValue: [] });

  protected readonly garage = signal<SavedMotorcycle[]>([]);
  protected readonly cargandoGarage = signal(true);
  protected readonly error = signal<string | null>(null);

  // Formulario "agregar moto".
  protected readonly motoIdSeleccionada = signal('');
  protected readonly apodoNuevo = signal('');

  // Moto guardada actualmente expandida (para ver/editar mantenimiento y costes).
  protected readonly seleccionadaId = signal<string | null>(null);
  protected readonly mantenimientos = signal<MaintenanceRecord[]>([]);
  protected readonly costos = signal<MonthlyCost[]>([]);

  protected readonly tiposMantenimiento = MAINTENANCE_TYPES;
  protected readonly categoriasCosto = COST_CATEGORIES;

  // Formulario "nuevo mantenimiento".
  protected readonly nuevoTipoMantenimiento = signal<MaintenanceType>('CAMBIO_ACEITE');
  protected readonly nuevoKilometraje = signal(0);
  protected readonly nuevoCostoMantenimiento = signal(0);
  protected readonly nuevasNotas = signal('');

  // Formulario "nuevo costo mensual".
  protected readonly nuevaCategoriaCosto = signal<CostCategory>('COMBUSTIBLE');
  protected readonly nuevoMonto = signal(0);
  protected readonly nuevaDescripcionCosto = signal('');

  constructor() {
    this.cargarGarage();
  }

  private cargarGarage(): void {
    this.cargandoGarage.set(true);
    this.listGarageUseCase.execute().subscribe({
      next: (garage) => {
        this.garage.set(garage);
        this.cargandoGarage.set(false);
      },
      error: (err) => {
        this.error.set(getErrorMessage(err, 'No se pudo cargar tu garage'));
        this.cargandoGarage.set(false);
      },
    });
  }

  protected onAgregarMoto(): void {
    if (!this.motoIdSeleccionada()) return;
    const apodo = this.apodoNuevo().trim() || undefined;
    this.addMotorcycleUseCase.execute({ motoId: this.motoIdSeleccionada(), apodo }).subscribe({
      next: () => {
        this.motoIdSeleccionada.set('');
        this.apodoNuevo.set('');
        this.cargarGarage();
      },
      error: (err) => this.error.set(getErrorMessage(err, 'No se pudo agregar la moto al garage')),
    });
  }

  protected onActualizarKilometraje(id: string, valor: number): void {
    this.updateMileageUseCase.execute(id, valor).subscribe({
      next: () => this.cargarGarage(),
      error: (err) => this.error.set(getErrorMessage(err, 'No se pudo actualizar el kilometraje')),
    });
  }

  protected onEliminarMoto(id: string): void {
    this.removeMotorcycleUseCase.execute(id).subscribe({
      next: () => {
        if (this.seleccionadaId() === id) this.seleccionadaId.set(null);
        this.cargarGarage();
      },
      error: (err) => this.error.set(getErrorMessage(err, 'No se pudo eliminar la moto del garage')),
    });
  }

  protected onVerDetalle(id: string): void {
    this.seleccionadaId.set(id);
    this.listMaintenanceUseCase.execute(id).subscribe({
      next: (registros) => this.mantenimientos.set(registros),
      error: (err) => this.error.set(getErrorMessage(err, 'No se pudieron cargar los mantenimientos')),
    });
    this.listCostsUseCase.execute(id).subscribe({
      next: (costos) => this.costos.set(costos),
      error: (err) => this.error.set(getErrorMessage(err, 'No se pudieron cargar los costos')),
    });
  }

  protected onRegistrarMantenimiento(): void {
    const id = this.seleccionadaId();
    if (!id) return;
    this.registerMaintenanceUseCase
      .execute(id, {
        tipo: this.nuevoTipoMantenimiento(),
        kilometraje: this.nuevoKilometraje(),
        costo: this.nuevoCostoMantenimiento(),
        notas: this.nuevasNotas().trim() || undefined,
      })
      .subscribe({
        next: () => {
          this.nuevoKilometraje.set(0);
          this.nuevoCostoMantenimiento.set(0);
          this.nuevasNotas.set('');
          this.onVerDetalle(id);
        },
        error: (err) => this.error.set(getErrorMessage(err, 'No se pudo registrar el mantenimiento')),
      });
  }

  protected onConfigurarCosto(): void {
    const id = this.seleccionadaId();
    if (!id) return;
    this.configureCostUseCase
      .execute(id, {
        categoria: this.nuevaCategoriaCosto(),
        monto: this.nuevoMonto(),
        descripcion: this.nuevaDescripcionCosto().trim() || undefined,
      })
      .subscribe({
        next: () => {
          this.nuevoMonto.set(0);
          this.nuevaDescripcionCosto.set('');
          this.onVerDetalle(id);
        },
        error: (err) => this.error.set(getErrorMessage(err, 'No se pudo configurar el costo mensual')),
      });
  }

  // Costes mensuales totales de la moto seleccionada + salario ideal
  // (Salario ideal = Costes mensuales / 0.30, ver especificación del proyecto).
  protected totalCostosMensuales(): number {
    return this.costos().reduce((total, costo) => total + costo.monto, 0);
  }

  protected salarioIdeal(): number {
    return this.totalCostosMensuales() / 0.3;
  }
}

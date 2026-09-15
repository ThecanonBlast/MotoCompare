import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { getErrorMessage } from '../../shared/utils/get-error-message';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly nombre = signal('');
  protected readonly correo = signal('');
  protected readonly clave = signal('');
  protected readonly cargando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected onSubmit(): void {
    if (this.cargando()) return;
    this.cargando.set(true);
    this.error.set(null);

    const datos = { nombre: this.nombre(), correo: this.correo(), clave: this.clave() };

    this.authService.register(datos).subscribe({
      next: () => {
        // El endpoint de registro no devuelve token, solo el usuario creado —
        // se hace login inmediato con las mismas credenciales para no pedirle
        // al usuario que las vuelva a escribir.
        this.authService.login({ correo: datos.correo, clave: datos.clave }).subscribe({
          next: () => {
            this.cargando.set(false);
            this.router.navigate(['/perfil']);
          },
          error: (err) => {
            this.cargando.set(false);
            this.error.set(getErrorMessage(err, 'Cuenta creada, pero no se pudo iniciar sesión automáticamente'));
          },
        });
      },
      error: (err) => {
        this.cargando.set(false);
        this.error.set(getErrorMessage(err, 'No se pudo crear la cuenta'));
      },
    });
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { getErrorMessage } from '../../shared/utils/get-error-message';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly correo = signal('');
  protected readonly clave = signal('');
  protected readonly cargando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected onSubmit(): void {
    if (this.cargando()) return;
    this.cargando.set(true);
    this.error.set(null);

    this.authService.login({ correo: this.correo(), clave: this.clave() }).subscribe({
      next: () => {
        this.cargando.set(false);
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        this.cargando.set(false);
        this.error.set(getErrorMessage(err, 'No se pudo iniciar sesión'));
      },
    });
  }
}

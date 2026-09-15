import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected onLogout(): void {
    // Si falla el logout contra el backend (ej. red caída), igual se limpia
    // la sesión local en el propio AuthService.logout() — no dejamos al
    // usuario sin poder salir de su cuenta por un error de red.
    this.authService.logout().subscribe({
      complete: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login']),
    });
  }
}

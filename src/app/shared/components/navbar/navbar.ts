import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Enlaces de navegación. Varias de estas rutas todavía no existen
  // (se van a crear junto con cada feature pendiente); mientras tanto
  // el link queda visible pero no navega a nada.
  protected readonly links = [
    { path: '/motocicletas', label: 'Motocicletas' },
    { path: '/comparador', label: 'Comparador' },
    { path: '/marcas', label: 'Marcas' },
    { path: '/favoritos', label: 'Favoritos' },
    { path: '/guias', label: 'Guías' },
    { path: '/garage', label: 'Mi Garage' },
  ];

  protected onLogout(): void {
    this.authService.logout().subscribe({
      complete: () => this.router.navigate(['/']),
      error: () => this.router.navigate(['/']),
    });
  }
}

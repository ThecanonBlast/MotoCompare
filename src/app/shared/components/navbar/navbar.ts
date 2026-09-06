import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
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
}

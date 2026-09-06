import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Motorcycles } from './pages/motorcycles/motorcycles';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'motocicletas', component: Motorcycles },
];

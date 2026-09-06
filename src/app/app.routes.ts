import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Motorcycles } from './pages/motorcycles/motorcycles';
import { MotorcycleDetail } from './pages/motorcycle-detail/motorcycle-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'motocicletas', component: Motorcycles },
  { path: 'motocicletas/:id', component: MotorcycleDetail },
];

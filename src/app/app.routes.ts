import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Motorcycles } from './pages/motorcycles/motorcycles';
import { MotorcycleDetail } from './pages/motorcycle-detail/motorcycle-detail';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';
import { authGuard } from './infrastructure/auth/auth.guard';
import { Garage } from './pages/garage/garage';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'motocicletas', component: Motorcycles },
  { path: 'motocicletas/:id', component: MotorcycleDetail },
  { path: 'login', component: Login },
  { path: 'registro', component: Register },
  { path: 'perfil', component: Profile, canActivate: [authGuard] },
  { path: 'garage', component: Garage, canActivate: [authGuard] },
];

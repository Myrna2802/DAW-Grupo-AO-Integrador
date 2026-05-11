import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { Proyectos as ProyectosComponent } from './components/proyectos/proyectos';
import { Clientes as ClientesComponent } from './components/clientes/clientes';
import { Tareas as TareasComponent } from './components/tareas/tareas';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'proyectos', component: ProyectosComponent, canActivate: [authGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [authGuard] },
  { path: 'tareas/:id', component: TareasComponent, canActivate: [authGuard] },
];
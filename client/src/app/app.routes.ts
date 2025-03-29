import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ShowApiInfoComponent } from './show-api-info/show-api-info.component';

export const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' }, // Redirigir a /projects por defecto
  { path: 'projects', component: ProjectComponent }, // Ruta para ProjectComponent
  { path: 'show-api-info', component: ShowApiInfoComponent }, // Ruta para ShowApiInfoComponent
];
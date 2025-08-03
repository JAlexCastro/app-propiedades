import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    loadComponent: () => import('./listar-propiedades/listar-propiedades.page').then(m => m.ListarPropiedadesPage)
  },
  {
    path: 'crear',
    loadComponent: () =>
      import('./crear-propiedad/crear-propiedad.page').then(
        (m) => m.CrearPropiedadPage
      ),
  },
];

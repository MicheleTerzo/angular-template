import {Routes} from '@angular/router';
import {USED_ROUTES} from './utils/enum';

export const routes: Routes = [
  {
    path: USED_ROUTES.HOME,
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: USED_ROUTES.HOME
  }
];

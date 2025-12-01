import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'favorites',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./favorites/favorites-routing.module').then((m) => m.FavoritesRoutingModule),
  },
  {
    path: 'list',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./ice-and-fire/ice-and-fire-routing.module').then((m) => m.IceAndFireRoutingModule),
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

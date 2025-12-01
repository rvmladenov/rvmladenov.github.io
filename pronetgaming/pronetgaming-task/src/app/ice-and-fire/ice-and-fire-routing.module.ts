import { Routes } from '@angular/router';
import { IceAndFireComponent } from './ice-and-fire.component';
import { DetailsComponent } from '../shared/components/details/details.component';

export const IceAndFireRoutingModule: Routes = [
  {
    path: '',
    component: IceAndFireComponent,
  },
  {
    path: 'details/:type/:id',
    component: DetailsComponent,
  },
];

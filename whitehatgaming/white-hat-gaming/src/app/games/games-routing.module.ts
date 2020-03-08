import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';
import { CATEGORY_PATH_NAME } from '@app/config/app.config';

const ROUTES: Routes = [
    { path: 'games', component: GamesComponent }
];

export const GamesRoutingModule = RouterModule.forRoot(ROUTES);

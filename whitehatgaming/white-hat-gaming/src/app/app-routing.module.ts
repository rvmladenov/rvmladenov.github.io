import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from '@app/games/games.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
    { path: 'games', component: GamesComponent },
    { path: '404', component: NotFoundComponent },
    { path: '', redirectTo: '/games', pathMatch: 'full' },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

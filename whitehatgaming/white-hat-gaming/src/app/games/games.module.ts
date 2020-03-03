import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as GamesReducer from '@app/games/store/reducers/games.reducers';
import { GamesComponent } from '@app/games/games.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('games', GamesReducer.reducer)
    ],
    declarations: [
        GamesComponent
    ],
    providers: [
        HttpClient
    ]
})
export class GamesModule { }

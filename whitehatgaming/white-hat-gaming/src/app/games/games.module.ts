import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, Store } from '@ngrx/store';
import * as GamesReducer from '@app/games/store/reducers/games.reducers';
import { GamesComponent } from '@app/games/games.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GamesRoutingModule } from './games-routing.module';
import { jqxRibbonModule } from 'jqwidgets-ng/jqxribbon';
import { EffectsModule } from '@ngrx/effects';
import { categoriesSelector, updatedGamesSelector, jackpotsSelector, gamesSelector } from './store/selectors/games.selector';
import { CategoriesToken, UpdatedGamesToken, JackpotsToken, GamesToken } from './store/games.tokens';
import { GamesEffects } from './store/effects/games.effects';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('games', GamesReducer.reducer),
        GamesRoutingModule,
        jqxRibbonModule,
        EffectsModule.forFeature([
            GamesEffects
        ])
    ],
    declarations: [
        GamesComponent
    ],
    providers: [
        HttpClient,
        {
            provide: UpdatedGamesToken, useFactory: (store) => store.select(updatedGamesSelector),
            deps: [Store]
        },
        {
            provide: CategoriesToken, useFactory: (store) => store.select(categoriesSelector),
            deps: [Store]
        },
        {
            provide: JackpotsToken, useFactory: (store) => store.select(jackpotsSelector),
            deps: [Store]
        },
        {
            provide: GamesToken, useFactory: (store) => store.select(gamesSelector),
            deps: [Store]
        }
    ]
})
export class GamesModule { }

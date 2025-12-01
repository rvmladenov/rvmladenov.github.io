import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { GamesActions, JackpotsAction, CombineGamesAction, UpdatedGamesAction } from '../actions/games.actions';
import { GamesToken, JackpotsToken } from '../games.tokens';
import { GamesModel } from '@app/shared/games.model';
import { JackpotGamesModel } from '@app/shared/jackpots.model';

@Injectable()
export class GamesEffects {

    constructor(
        private actions$: Actions,
        @Inject(JackpotsToken) private jackpots$: Observable<JackpotGamesModel[]>,
        @Inject(GamesToken) private games$: Observable<GamesModel[]>) { }

    @Effect()
    fetchCombinedGames$ = this.actions$.pipe(
      ofType<CombineGamesAction>(GamesActions.Combined),
      withLatestFrom(this.games$, this.jackpots$),
      switchMap(([__, gamesList, jackpots]: [any, GamesModel[], JackpotGamesModel[]]) => {

        let combinedGamesResult: GamesModel[] = [];

        gamesList.forEach(game => {
            if (game.categories.indexOf('top') >= 0) {
                game.isTop = true;
            }

            if (game.categories.indexOf('new') >= 0) {
                game.isNew = true;
            }

            for (let i = 0; i < jackpots.length; i++) {
                const jackpot = jackpots[i];
                if (jackpot.game == game.id) {
                    game.amount = jackpot.amount;
                    break;
                }
            }

            combinedGamesResult.push({...game});
        });

        // return new combined games action
        return of(new UpdatedGamesAction(combinedGamesResult));
      })
    );
}

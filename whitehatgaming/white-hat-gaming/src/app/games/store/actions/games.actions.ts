import { Action } from '@ngrx/store';
import { GamesModel } from 'src/app/shared/games.model';
import { JackpotGamesModel } from '@app/shared/jackpots.model';

export const GamesActions = {
    Games: '[Games] List of games',
    Categories: '[Categories] List of categories',
    Jackpots: '[Jackpots] List of jackpots',
    Combined: '[Combined] List of merged games and jackpots in one'
};

export class GamesAction implements Action {
    readonly type = GamesActions.Games;
    constructor(public payload: GamesModel[]) { }
}

export class CategoriesAction implements Action {
    readonly type = GamesActions.Categories;
    constructor(public payload: string[]) { }
}

export class JackpotsAction implements Action {
    readonly type = GamesActions.Jackpots;
    constructor(public payload: JackpotGamesModel[]) { }
}

export class CombinedGamesAction implements Action {
    readonly type = GamesActions.Combined;
    constructor(public payload: GamesModel[]) { }
}

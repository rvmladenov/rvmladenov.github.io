import { Action } from '@ngrx/store';
import { GamesModel } from 'src/app/shared/games.model';
import { JackpotGamesModel } from '@app/shared/jackpots.model';

export const GamesActions = {
    Games: '[Games] List of games',
    Categories: '[Categories] List of categories',
    Jackpots: '[Jackpots] List of jackpots',
    Combined: '[Combined] Combines the games and the jackpot lists',
    UpdatedGames: '[Combined] List of merged games and jackpots in one'
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

export class UpdatedGamesAction implements Action {
    readonly type = GamesActions.UpdatedGames;
    constructor(public payload: GamesModel[]) { }
}

export class CombineGamesAction implements Action {
    readonly type = GamesActions.Combined;
}

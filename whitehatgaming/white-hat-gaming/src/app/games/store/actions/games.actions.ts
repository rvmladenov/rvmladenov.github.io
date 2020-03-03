import { GamesModel } from 'src/app/shared/games.model';
import { Action } from '@ngrx/store';

export const GamesActions = {
    Games: '[Games] Manage games store'
};

export class GamesAction implements Action {
    readonly type = GamesActions.Games;
    constructor(public payload: GamesModel) { }
}

export class Games implements Action {
    readonly type = GamesActions.Games;
    constructor(public payload: GamesModel[]) { }
}
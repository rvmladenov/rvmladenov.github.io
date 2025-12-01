import { GamesModel } from 'src/app/shared/games.model';
import { GamesActions, GamesAction, CategoriesAction, JackpotsAction, CombineGamesAction, UpdatedGamesAction } from '../actions/games.actions';
import { ActionsMap } from 'src/app/shared/actions.map';
import { Action } from '@ngrx/store';
import { JackpotGamesModel } from '@app/shared/jackpots.model';

export interface GamesState {
    games: GamesModel[],
    jackpots: JackpotGamesModel[],
    categories: string[],
    updatedGames: GamesModel[]
}

export const initialRendererState: GamesState = {
    games: [],
    jackpots: [],
    categories: [],
    updatedGames: []
};

function games(state: GamesState, action: GamesAction) {
    const games = Object.assign({}, state);
    games.games = action.payload;

    return {...state, ...games};
}

function categories(state: GamesState, action: CategoriesAction) {
    const categoryState = Object.assign({}, state);
    categoryState.categories = action.payload;

    return {...state, ...categoryState};
}

function jackpots(state: GamesState, action: JackpotsAction) {
    const jackpotsState = Object.assign({}, state);
    jackpotsState.jackpots = action.payload;

    return {...state, ...jackpotsState};
}

function updatedGames(state: GamesState, action: UpdatedGamesAction) {
    const combinedState = Object.assign({}, state);
    combinedState.updatedGames = action.payload;

    return {...state, ...combinedState};
}

const reducerMap: ActionsMap<GamesState> = {
    [GamesActions.Games]: games,
    [GamesActions.Categories]: categories,
    [GamesActions.Jackpots]: jackpots,
    [GamesActions.UpdatedGames]: updatedGames
};

export function reducer(state = initialRendererState, action: Action): GamesState {
    return reducerMap[action.type] != null ? reducerMap[action.type](state, action) : state;
}
import { GamesModel } from 'src/app/shared/games.model';
import { GamesActions, GamesAction, CategoriesAction, JackpotsAction, CombinedGamesAction } from '../actions/games.actions';
import { ActionsMap } from 'src/app/shared/actions.map';
import { Action } from '@ngrx/store';
import { JackpotGamesModel } from '@app/shared/jackpots.model';

export interface GamesState {
    games: GamesModel[],
    jackpots: JackpotGamesModel[],
    categories: string[],
    combinedGames: GamesModel[]
}

export const initialRendererState: GamesState = {
    games: [],
    jackpots: [],
    categories: [],
    combinedGames: []
};

function games(state: GamesState, action: GamesAction) {
    const gamesState = Object.assign({}, state);
    gamesState.games = action.payload;

    return {...state, ...gamesState};
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

function combinedGames(state: GamesState, action: CombinedGamesAction) {
    const combinedState = Object.assign({}, state);
    combinedState.combinedGames = action.payload;

    return {...state, ...combinedState};
}

const reducerMap: ActionsMap<GamesState> = {
    [GamesActions.Games]: games,
    [GamesActions.Categories]: categories,
    [GamesActions.Jackpots]: jackpots,
    [GamesActions.Combined]: combinedGames
};

export function reducer(state = initialRendererState, action: Action): GamesState {
    return reducerMap[action.type] != null ? reducerMap[action.type](state, action) : state;
}
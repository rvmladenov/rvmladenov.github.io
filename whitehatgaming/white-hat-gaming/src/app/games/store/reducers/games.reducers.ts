import { GamesModel } from 'src/app/shared/games.model';
import { GamesActions, Games } from '../actions/games.actions';
import { ActionsMap } from 'src/app/shared/actions.map';
import { Action } from '@ngrx/store';

export interface GamesState {
    games: GamesModel[]
}

export const initialRendererState: GamesState = {
    games: []
};

function games(state: GamesState, action: Games) {
    const newState = Object.assign({}, state);
    newState.games = action.payload;
    return newState;
}

const reducerMap: ActionsMap<GamesState> = {
    [GamesActions.Games]: games
};

export function reducer(state = initialRendererState, action: Action): GamesState {
    return reducerMap[action.type] != null ? reducerMap[action.type](state, action) : state;
}
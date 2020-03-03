import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { GamesState } from '@app/games/store/reducers/games.reducers';

export interface AppState {
	games: GamesState
}

export const reducers: ActionReducerMap<AppState> = {
	games: undefined
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

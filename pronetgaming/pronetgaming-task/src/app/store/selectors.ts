import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appReducer, State } from './index';

export const selectAppState = createFeatureSelector<State>('appReducer');

export const selectLoading = createSelector(selectAppState, (state: State) => state.loading);

export const selectAuthInfo = createSelector(selectAppState, (state: State) => state.authInfo);
export const selectIsLoggedIn = createSelector(selectAppState, (state: State) => state.isLoggedIn);

export const selectBooks = createSelector(selectAppState, (state: State) => state.books);
export const selectCharacters = createSelector(selectAppState, (state: State) => state.characters);
export const selectHouses = createSelector(selectAppState, (state: State) => state.houses);

export const selectFavorites = createSelector(selectAppState, (state: State) => state.favorites);

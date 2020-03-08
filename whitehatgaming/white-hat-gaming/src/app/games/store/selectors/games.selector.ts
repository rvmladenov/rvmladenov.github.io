import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GamesState } from '../reducers/games.reducers';

const featureSelector = createFeatureSelector<GamesState>('games');

export const gamesSelector = createSelector(featureSelector, state => state.games);
export const jackpotsSelector = createSelector(featureSelector, state => state.jackpots);
export const categoriesSelector = createSelector(featureSelector, state => state.categories);
export const combinedgamesSelector = createSelector(featureSelector, state => state.combinedGames);

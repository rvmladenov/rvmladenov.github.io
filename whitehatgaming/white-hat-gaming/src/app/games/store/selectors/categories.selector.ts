import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GamesState } from '../reducers/games.reducers';

const featureSelector = createFeatureSelector<GamesState>('categories');

export const categoriesSelector = createSelector(featureSelector, state => state.categories);

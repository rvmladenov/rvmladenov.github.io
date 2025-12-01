import { createAction } from '@ngrx/store';
import { Book, Character, Favorite, House } from '../shared/models/common';
import { AuthInfo } from '../shared/models/auth';

export const actions = {
  authInfo: createAction('[Auth] Set Auth Info', (authInfo: AuthInfo | undefined) => ({
    authInfo,
  })),
  isLoggedIn: createAction('[Auth] Set is logged in', (isLoggedIn: boolean) => ({
    isLoggedIn,
  })),
  loading: createAction('[Data] Is loading', (loading: boolean) => ({ loading })),
  loadBooks: createAction('[Books] Load Books', (books: Book[]) => ({ books })),
  loadCharacters: createAction('[Characters] Load Characters', (characters: Character[]) => ({
    characters,
  })),
  loadHouses: createAction('[Houses] Load Houses', (houses: House[]) => ({ houses })),
  saveFavorite: createAction('[Favorite] Saves a favorite', (favorite: Favorite) => ({ favorite })),
  removeFavorite: createAction('[Favorite] Removes a favorite', ({ props }) => ({
    ...props,
  })),
};

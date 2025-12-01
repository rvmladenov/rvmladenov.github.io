import { createReducer, on } from '@ngrx/store';
import { Book, Character, Favorite, House } from '../shared/models/common';
import { actions } from './actions';
import { AuthInfo } from '../shared/models/auth';

export interface State {
  authInfo?: AuthInfo | undefined;
  loading?: boolean;
  books?: Book[];
  characters?: Character[];
  houses?: House[];
  isLoggedIn?: boolean;
  favorites?: Favorite[];
}

export const initialState: State = {
  authInfo: undefined,
  books: [],
  characters: [],
  houses: [],
  favorites: [],
  loading: false,
  isLoggedIn: false,
};

export const appReducer = createReducer(
  initialState,
  on(actions.authInfo, (state, { authInfo }) => ({
    ...state,
    authInfo: authInfo ?? undefined,
  })),
  on(actions.isLoggedIn, (state, { isLoggedIn }) => ({
    ...state,
    isLoggedIn: isLoggedIn,
  })),
  on(actions.loading, (state, { loading }) => ({
    ...state,
    loading: loading,
  })),
  on(actions.loadBooks, (state, { books }) => ({
    ...state,
    books: books,
  })),
  on(actions.loadCharacters, (state, { characters }) => ({
    ...state,
    characters: characters,
  })),
  on(actions.loadHouses, (state, { houses }) => ({
    ...state,
    houses: houses,
  })),
  on(actions.saveFavorite, (state, { favorite }) => ({
    ...state,
    favorites: [...(state.favorites ?? []), favorite],
  })),
  on(actions.removeFavorite, (state, { favorite }) => ({
    ...state,
    favorites:
      state.favorites?.filter((f) => f.id !== favorite.id && f.type !== favorite.type) ?? [],
  }))
);

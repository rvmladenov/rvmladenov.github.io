import { Component, inject, input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Book, Character, Favorite, House } from '../../models/common';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { actions } from '../../../store/actions';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../../../store/selectors';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  readonly store = inject(Store);

  books = input<Book[]>();
  characters = input<Character[]>();
  houses = input<House[]>();
  favorites = input<Favorite[] | undefined>();

  onAddToFavorites(
    id: string,
    book: Book | Character | House,
    type: 'book' | 'character' | 'house'
  ): void {
    console.log(id, book);
    this.store.dispatch(
      actions.saveFavorite({
        id,
        type,
        entry: book,
      })
    );
  }

  onRemoveFromFavorites(id: string, type: 'book' | 'character' | 'house'): void {
    this.store.dispatch(actions.removeFavorite({ id, type }));
  }

  isInFavorites(id: string | undefined, type: 'book' | 'character' | 'house'): boolean {
    return !!this.favorites()?.find((favorite) => favorite.id === id && favorite.type === type);
  }
}

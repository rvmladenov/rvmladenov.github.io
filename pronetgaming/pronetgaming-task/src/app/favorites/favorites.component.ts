import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../store/selectors';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../shared/components/list/list.component';
import { FilterComponent } from '../shared/components/filter/filter.component';
import { map, tap } from 'rxjs';
import { Book, Character, House } from '../shared/models/common';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, ListComponent, FilterComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesListComponent implements OnInit {
  readonly store = inject(Store);
  books: Book[] = [];
  characters: Character[] = [];
  houses: House[] = [];

  favorites$ = this.store.select(selectFavorites);

  ngOnInit(): void {
    this.favorites$.subscribe((favorites) => {
      this.books =
        favorites?.filter((fav) => fav.type === 'book').map((fav) => fav.entry as Book) ?? [];
      this.characters =
        favorites?.filter((fav) => fav.type === 'character').map((fav) => fav.entry as Character) ??
        [];
      this.houses =
        favorites?.filter((fav) => fav.type === 'house').map((fav) => fav.entry as House) ?? [];
    });
  }

  onBooksChange(books: Book[] | undefined): void {
    this.books = books ?? [];
  }

  onCharactersChange(characters: Character[] | undefined): void {
    this.characters = characters ?? [];
  }

  onHousesChange(houses: House[] | undefined): void {
    this.houses = houses ?? [];
  }

  onReset(): void {
    this.favorites$ = this.store.select(selectFavorites);
  }
}

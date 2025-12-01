import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions } from '../store/actions';
import { finalize, map, of, take } from 'rxjs';
import { selectBooks, selectCharacters, selectFavorites, selectHouses } from '../store/selectors';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/services/data.service';
import { ListComponent } from '../shared/components/list/list.component';
import { FilterComponent } from '../shared/components/filter/filter.component';
import { Book, Character, House } from '../shared/models/common';

@Component({
  selector: 'app-ice-and-fire',
  imports: [CommonModule, ListComponent, FilterComponent],
  templateUrl: './ice-and-fire.component.html',
  styleUrl: './ice-and-fire.component.scss',
})
export class IceAndFireComponent implements OnInit {
  readonly iceAndFireService = inject(DataService);
  readonly store = inject(Store);

  books$ = this.store.select(selectBooks);
  characters$ = this.store.select(selectCharacters);
  houses$ = this.store.select(selectHouses);
  favorites$ = this.store.select(selectFavorites);

  ngOnInit(): void {
    this.store.dispatch(actions.loading(true));
    this.iceAndFireService
      .getData()
      .pipe(
        take(1),
        finalize(() => {
          this.store.dispatch(actions.loading(false));
        })
      )
      .subscribe({
        next: ([books, characters, houses]) => {
          this.store.dispatch(actions.loadBooks(books));
          this.store.dispatch(actions.loadCharacters(characters));
          this.store.dispatch(actions.loadHouses(houses));
        },
        error: (error) => {
          // TODO: Think about error handling
          console.error(error);
        },
      });
  }

  onBooksChange(books: Book[] | undefined): void {
    this.books$ = of(books ?? []);
  }

  onCharactersChange(characters: Character[] | undefined): void {
    this.characters$ = of(characters ?? []);
  }

  onHousesChange(houses: House[] | undefined): void {
    this.houses$ = of(houses ?? []);
  }

  onReset(): void {
    this.books$ = this.store.select(selectBooks);
    this.characters$ = this.store.select(selectCharacters);
    this.houses$ = this.store.select(selectHouses);
  }
}

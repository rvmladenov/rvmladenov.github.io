import { Component, inject, input, model, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Book, Character, House } from '../../models/common';

@Component({
  selector: 'app-list-filter',
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  readonly fb = inject(FormBuilder);

  books = model<Book[]>();
  characters = model<Character[]>();
  houses = model<House[]>();

  formFilter: FormGroup = this.fb.group({
    filterInput: [],
  });

  onFilter() {
    const filterInput = this.formFilter.value.filterInput;
    if (filterInput) {
      this.books.set(this.books()?.filter((book) => book.name.includes(filterInput)) ?? []);
      this.characters.set(
        this.characters()?.filter((character) => character.name.includes(filterInput)) ?? []
      );
      this.houses.set(this.houses()?.filter((house) => house.name.includes(filterInput)) ?? []);
    }
  }

  onReset() {
    this.formFilter.reset();
  }
}

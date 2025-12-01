import { Component, input } from '@angular/core';
import { Book, Character, House } from '../../../shared/models/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  books = input<Book[]>();
  characters = input<Character[]>();
  houses = input<House[]>();
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book, Character, House } from '../models/common';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly http = inject(HttpClient);

  getData(): Observable<[Book[], Character[], House[]]> {
    return forkJoin([
      this.http.get<Book[]>('https://anapioficeandfire.com/api/books'),
      this.http.get<Character[]>('https://anapioficeandfire.com/api/characters'),
      this.http.get<House[]>('https://anapioficeandfire.com/api/houses'),
    ]);
  }
}

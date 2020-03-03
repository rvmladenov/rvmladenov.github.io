import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GamesModel } from '@app/shared/games.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly apiURL = 'http://stage.whgstage.com/front-end-test/games.php';

  constructor(private http: HttpClient) { }

  getGamesList(): Observable<GamesModel[]> {
    return this.http.get<GamesModel[]>(this.apiURL);
  }

}

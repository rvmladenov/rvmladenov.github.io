import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { GamesModel } from '@app/shared/games.model';
import { API_URLS } from '@app/config/app.config';
import { JackpotGamesModel } from '@app/shared/jackpots.model';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    constructor(private http: HttpClient) { }

    getAllGamesList(): Observable<Array<GamesModel[] | JackpotGamesModel[]>> {
        const urls = [
            this.getGamesList(),
            this.getJackpotGames()
        ];
        return forkJoin(urls);
    }

    getGamesList(): Observable<GamesModel[]> {
        return this.http.get<GamesModel[]>(API_URLS.GAMES);
    }

    getJackpotGames() {
        return this.http.get<JackpotGamesModel[]>(API_URLS.JACKPOT);
    }
}

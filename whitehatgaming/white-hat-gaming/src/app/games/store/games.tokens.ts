import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { GamesModel } from '@app/shared/games.model';
import { JackpotGamesModel } from '@app/shared/jackpots.model';

export const GamesToken = new InjectionToken<Observable<GamesModel[]>>('This will provide the list of games');
export const JackpotsToken = new InjectionToken<Observable<JackpotGamesModel[]>>('This will provide the list of jackpots');
export const CategoriesToken = new InjectionToken<Observable<string[]>>('This will provide the list of categories');
export const CombinedGamesToken = new InjectionToken<Observable<GamesModel[]>>('This will provide the list of combined games');
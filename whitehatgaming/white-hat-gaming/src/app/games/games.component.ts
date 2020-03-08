import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { GamesService } from './games.service';
import { Subject, timer, interval, Observable } from 'rxjs';
import { GamesModel } from '@app/shared/games.model';
import { first, withLatestFrom, map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { GamesAction, JackpotsAction, CategoriesAction } from './store/actions/games.actions';
import { LoadingIndicatorService } from '@app/core/loading-indicator.service';
import { GAMES_RELOAD_TIMEOUT } from '@app/config/app.config';
import { CategoryService } from '@app/core/category.service';
import { GamesToken, CategoriesToken, JackpotsToken, CombinedGamesToken } from './store/games.tokens';
import { JackpotGamesModel } from '@app/shared/jackpots.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GamesComponent implements OnInit, OnDestroy {

    private destroy$: Subject<boolean> = new Subject<boolean>();

    private gamesList$: Observable<GamesModel[]>;
    private jackpotsList$: Observable<JackpotGamesModel[]>;
    private categoriesList$: Observable<string[]>;

    constructor(
        private gamesService: GamesService,
        private store: Store<AppState>,
        private loadingIndicator: LoadingIndicatorService,
        private categoryService: CategoryService,
        @Inject(CombinedGamesToken) public combinedGames$: Observable<GamesModel[]>,
        @Inject(CategoriesToken) public categories$: Observable<GamesModel[]>
        ) { }

    ngOnInit() {

        // TODO: add a 3 seconds timeout for getting the new games
        this.gamesService
            .getAllGamesList()
            // .interval(GAMES_RELOAD_TIMEOUT)
            .pipe(first())
            .subscribe((games: Array<GamesModel[] | JackpotGamesModel[]>) => {
                const gamesList = games[0] as GamesModel[];
                const jaackpotList = games[1] as JackpotGamesModel[];
                const categoriesList = this.categoryService.getCategoryList(gamesList);

                this.loadingIndicator.hide();
                this.store.dispatch(new GamesAction(gamesList));
                this.store.dispatch(new JackpotsAction(jaackpotList));
                this.store.dispatch(new CategoriesAction(categoriesList));
            })

        this.combinedGames$
            .pipe(
                withLatestFrom(this.categories$),
                map(([combinedGamesList, categoriesList]) => {
                    console.log(combinedGamesList, categoriesList);
                    // TODO: update the categories list on the UI
                    // TODO: update the games list for all games and jackpots on the UI

                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}

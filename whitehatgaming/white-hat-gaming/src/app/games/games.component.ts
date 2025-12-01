import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { GamesService } from './games.service';
import { Subject, timer, interval, Observable, BehaviorSubject } from 'rxjs';
import { GamesModel } from '@app/shared/games.model';
import { first, withLatestFrom, map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { GamesAction, JackpotsAction, CategoriesAction, CombineGamesAction } from './store/actions/games.actions';
import { LoadingIndicatorService } from '@app/core/loading-indicator.service';
import { GAMES_RELOAD_TIMEOUT } from '@app/config/app.config';
import { CategoryService } from '@app/core/category.service';
import { GamesToken, CategoriesToken, JackpotsToken, UpdatedGamesToken } from './store/games.tokens';
import { JackpotGamesModel } from '@app/shared/jackpots.model';
import { jqxRibbonComponent } from 'jqwidgets-ng/jqxribbon/public_api';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GamesComponent implements OnInit, OnDestroy {
    @ViewChild('jqxRibbon', { static: true }) RespPanel: jqxRibbonComponent;
    ribbonSettings: jqwidgets.RibbonOptions =
    {
        width: '100%',
        position: "top",
        selectionMode: "click"
    }

    private destroy$: Subject<boolean> = new Subject<boolean>();

    private loaded = false;

    private test: any;

    private gamesList$: BehaviorSubject<any> = new BehaviorSubject({});
    private jackpotsList$: Observable<JackpotGamesModel[]>;
    private categoriesList$: BehaviorSubject<string[]> = new BehaviorSubject([]);

    constructor(
        private gamesService: GamesService,
        private store: Store<AppState>,
        private loadingIndicator: LoadingIndicatorService,
        private categoryService: CategoryService,
        @Inject(UpdatedGamesToken) public updatedGames$: Observable<GamesModel[]>,
        @Inject(CategoriesToken) public categories$: Observable<string[]>
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

                
                // Updates the store and merges the information from the games and the jackpots in one

                this.test = gamesList;

                this.store.dispatch(new GamesAction(gamesList));
                this.store.dispatch(new JackpotsAction(jaackpotList));
                this.store.dispatch(new CategoriesAction(categoriesList));
                this.store.dispatch(new CombineGamesAction());
            });

        this.updatedGames$.pipe(
            withLatestFrom(this.categories$),
            map(([updatedGames, categoriesList]) => {
                const gamesAndCategories = this.categoryService.getGroupedGamesBasedOnCategory(updatedGames, categoriesList);
                if (gamesAndCategories && Object.keys(gamesAndCategories).length > 0) {
                    this.categoriesList$.next(Object.keys(gamesAndCategories));

                    // p.s. not supported in IE. But I dont have a browser restriction and it can always be handled another way
                    this.gamesList$.next(gamesAndCategories);

                    this.RespPanel.createComponent(this.ribbonSettings);
                    this.updateRibbonData();

                    this.loadingIndicator.hide();
                } else {
                    // TODO: no records found
                }
            }),
            takeUntil(this.destroy$)
        )
        .subscribe();
    }

    private updateRibbonData(hideLoading = true) {

        this.RespPanel.removeAt(0);


        const categoriesObj = this.gamesList$.value;
        if (categoriesObj) {
            Object.keys(categoriesObj).forEach((categoryName, index) => {
                const title = `<h2>${categoryName}</h2>`;
                let content = '';
    
                const categoryGames = categoriesObj[categoryName];
                categoryGames.forEach((game: GamesModel) => {
                    content += `<div>
                        <img src=${game.image} alt=${game.name} />
                    </div>`;
                });
    
                this.RespPanel.addAt(index, { title, content });
            })
        } else {
            // TODO: no data
        }
    }

    trackByGameId(index: number, value: GamesModel) {
        // TODO:
        return value.id;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}

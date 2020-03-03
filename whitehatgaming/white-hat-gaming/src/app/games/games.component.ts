import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesService } from './games.service';
import { Subject } from 'rxjs';
import { GamesModel } from '@app/shared/games.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

    // private destroy$: Subject<boolean> = new Subject<boolean>();
    private gamesList: GamesModel[] = [];

    constructor(private gamesService: GamesService) { }

    ngOnInit() {
        this.gamesService
            .getGamesList()
            .pipe(first())
            .subscribe(games => {
                console.log(games);
            })
    }

    ngOnDestroy() {
        // TODO:
        // this.destroy$.next(true);
        // this.destroy$.complete();
    }
}

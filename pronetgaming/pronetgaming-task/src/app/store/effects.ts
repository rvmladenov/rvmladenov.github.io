import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { actions } from './actions';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.isLoggedIn),
      distinctUntilChanged(),
      tap(({ isLoggedIn }) => {
        if (isLoggedIn) {
          this.router.navigate(['/list']);
        }
      })
    )
  );
}

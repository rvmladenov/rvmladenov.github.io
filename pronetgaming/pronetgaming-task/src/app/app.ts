import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectLoading } from './store/selectors';
import { actions } from './store/actions';
import { take } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly store = inject(Store);
  readonly router = inject(Router);
  readonly authService = inject(AuthService);

  readonly loading$ = this.store.select(selectLoading);

  logout() {
    this.authService
      .logout()
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.store.dispatch(actions.authInfo(undefined));
          this.store.dispatch(actions.isLoggedIn(false));
        },
      });
    this.store.dispatch(actions.authInfo(undefined));
    this.router.navigate(['/login']);
  }
}

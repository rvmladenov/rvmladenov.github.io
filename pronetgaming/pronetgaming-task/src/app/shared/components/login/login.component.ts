import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { actions } from '../../../store/actions';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule],
})
export class LoginComponent {
  readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  readonly router = inject(Router);
  readonly store = inject(Store);

  form: FormGroup = this.fb.group({
    email: ['test@test.test', [Validators.required]],
    password: ['test', [Validators.required]],
  });

  login() {
    this.auth
      .login(this.form.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.store.dispatch(actions.authInfo({ email: this.form.value.email }));
          this.store.dispatch(actions.isLoggedIn(true));
        },
        error: (error) => {
          // TODO: Handle error
          console.error(error);
        },
      });
  }
}

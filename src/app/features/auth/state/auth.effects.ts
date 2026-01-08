import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { User } from 'src/app/core/models/user.model';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      map(({ email }) => {
        const user: User = { email };
        return AuthActions.loginSuccess({ user });
      }),
      catchError(() => of({ type: '[Auth] Login Error' }))
    )
  );

  constructor(private actions$: Actions) {}
}
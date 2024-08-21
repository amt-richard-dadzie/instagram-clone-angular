import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AUTH_ACTIONS } from './auth.actions';
import { AuthService } from './auth.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { constants } from '../../utils/constants';

@Injectable()
export class AuthEffects {
  public constructor(
    private actions: Actions,
    private authService: AuthService,
    private toast: NgToastService,
    private router: Router
  ) {}

  public login$ = createEffect(() =>
    this.actions.pipe(
      ofType(AUTH_ACTIONS.login),
      switchMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((response) => {
            this.toast.success(
              response.message,
              'Success',
              constants.TOAST_TIME_OUT
            );
            this.router.navigateByUrl('/feed');
            return AUTH_ACTIONS.loginSuccess(response);
          }),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Unknown Error. Please Try Again';
            if (error.status === 0) {
              errorMessage = 'Unable to connect to the server';
            } else if (error.status === 400) {
              errorMessage = 'Invalid Email or Password';
            }
            this.toast.danger(
              errorMessage,
              constants.TOAST_ERROR_TITLE,
              constants.TOAST_TIME_OUT
            );
            return of(AUTH_ACTIONS.loginFailure({ error: error.message }));
          })
        )
      )
    )
  );
}

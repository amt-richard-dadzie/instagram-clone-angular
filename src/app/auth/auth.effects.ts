import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AUTH_ACTIONS } from './auth.actions';
import { AuthService } from './auth.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { constants } from '../../utils/constants';
import { FeedService } from '../feed/feed.service';
import { FEED_ACTIONS } from '../feed/feed.actions';

@Injectable()
export class AuthEffects {
  public constructor(
    private  actions: Actions,
    private authService: AuthService,
    private feedService: FeedService,
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

  public init$ = createEffect(() =>
    this.actions.pipe(
      ofType(AUTH_ACTIONS.loginSuccess),
      switchMap(() =>
        this.feedService.getFollowing().pipe(
          map((user) =>
            FEED_ACTIONS.getUserFollowingSuccess({ following: user })
          ),
          catchError((error) => of(FEED_ACTIONS.feedError({ error })))
        )
      )
    )
  );
}

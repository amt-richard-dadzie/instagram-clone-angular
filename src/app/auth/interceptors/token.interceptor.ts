/* eslint-disable @typescript-eslint/naming-convention */
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AUTH_ACTIONS } from '../auth.actions';
import { NgToastService } from 'ng-angular-popup';
import { selectAccessToken } from '../auth.selectors';
import { constants } from '../../../utils/constants';
import { environment } from '../../../environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const accessToken = store.selectSignal(selectAccessToken);
  const router = inject(Router);
  const toast = inject(NgToastService);
  const authService = inject(AuthService);
  let modifiedReq = req;

  if (req.headers.has('authorization') || !accessToken()) {
    return next(req);
  }

  // Add Authorization header only for requests to environment.AUTH_API_BASEURL
  if (req.url.startsWith(environment.AUTH_API_BASEURL)) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken()}`,
      },
    });
  }

  // Validate user for requests to environment.apiUrl
  if (req.url.startsWith(environment.apiUrl)) {
    // return authService.validateUser().pipe(
    //   switchMap(() => next(modifiedReq)),
    //   catchError((error: HttpErrorResponse) => {
    //     if (error.status === 0) {
    //       toast.danger(
    //         'Unable to connect to server',
    //         constants.TOAST_ERROR_TITLE,
    //         constants.TOAST_TIME_OUT
    //       );
    //     }
    //     return throwError(() => error);
    //   })
    // );
    return next(req);
  }

  // Handle 401 errors for requests to environment.AUTH_API_BASEURL
  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        req.url.startsWith(environment.AUTH_API_BASEURL) &&
        req.url !== `${environment.AUTH_API_BASEURL}user/refresh-token`
      ) {
        return authService.refreshToken().pipe(
          switchMap(({ login_token, refresh_token }) => {
            store.dispatch(
              AUTH_ACTIONS.refreshTokenSuccess({ login_token, refresh_token })
            );
            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${login_token}`,
                'X-APN': environment.APN,
              },
            });
            return next(newAuthReq);
          }),
          catchError((error) => {
            toast.danger(
              'Session time out. Please login again',
              constants.TOAST_ERROR_TITLE,
              constants.TOAST_TIME_OUT
            );
            store.dispatch(AUTH_ACTIONS.logOut());
            router.navigateByUrl('/auth/login');
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

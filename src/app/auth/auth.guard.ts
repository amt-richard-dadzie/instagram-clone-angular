import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.state';
import { inject } from '@angular/core';
import { selectAccessToken } from './auth.selectors';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store<AuthState>);
  const router = inject(Router);

  return store.select(selectAccessToken).pipe(
    take(1),
    map((accessToken) => {
      if (accessToken) {
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    })
  );
};

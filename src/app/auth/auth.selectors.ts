import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state) => state.login_token
);

export const selectRefreshToken = createSelector(
  selectAuthState,
  (state) => state.refresh_token
);

/* eslint-disable @typescript-eslint/naming-convention */
import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import { AUTH_ACTIONS } from './auth.actions';
import { APP_ACTIONS } from '../app.state';

export const initialState: AuthState = {
  login_token: null,
  message: null,
  refresh_token: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AUTH_ACTIONS.login, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    AUTH_ACTIONS.loginSuccess,
    (state, { login_token, message, refresh_token }) => ({
      ...state,
      login_token,
      message,
      refresh_token,
      loading: false,
    })
  ),
  on(AUTH_ACTIONS.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(APP_ACTIONS.restoreAppState, (state, { auth }) => ({
    ...state,
    ...auth,
  })),
  on(
    AUTH_ACTIONS.refreshTokenSuccess,
    (state, { login_token, refresh_token }) => ({
      ...state,
      login_token,
      refresh_token,
    })
  ),
  on(AUTH_ACTIONS.logOut, (state) => ({
    ...state,
    login_token: null,
    refresh_token: null,
    message: null,
  }))
);

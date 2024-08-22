/* eslint-disable @typescript-eslint/naming-convention */
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequestBody, LoginResponseBody } from '../interfaces/auth';
import { AuthState } from './auth.state';

export const AUTH_ACTIONS = createActionGroup({
  source: 'Auth',
  events: {
    ' Login': props<LoginRequestBody>(),
    'Login Success': props<LoginResponseBody>(),
    'Get Auth State': props<AuthState>(),
    'Login Failure': props<{ error: string }>(),
    'Refresh Token Success': props<{
      login_token: string;
      refresh_token: string;
    }>(),
    'Log Out': emptyProps(),
  },
});

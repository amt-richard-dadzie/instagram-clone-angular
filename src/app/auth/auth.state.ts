/* eslint-disable @typescript-eslint/naming-convention */
export interface AuthState {
  login_token: string | null;
  message: string | null;
  refresh_token: string | null;
  error: string | null;
  loading: boolean;
}

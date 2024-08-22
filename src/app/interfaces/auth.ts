/* eslint-disable @typescript-eslint/naming-convention */
export interface AUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  login_token: string;
  message: string;
  refresh_token: string;
}

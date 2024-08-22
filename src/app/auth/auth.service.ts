import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AUser,
  LoginRequestBody,
  LoginResponseBody,
  RegisterResponse,
} from '../interfaces/auth';
import { retry, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRefreshToken } from './auth.selectors';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private store = inject(Store);
  private readonly token = this.store.selectSignal(selectRefreshToken);

  public register(user: AUser) {
    return this.http
      .post<RegisterResponse>(
        `${environment.AUTH_API_BASEURL}user/signup`,
        user
      )
      .pipe(take(1));
  }

  public login(credentials: LoginRequestBody) {
    return this.http
      .post<LoginResponseBody>(
        `${environment.AUTH_API_BASEURL}user/login`,
        credentials
      )
      .pipe(take(1));
  }

  public refreshToken() {
    return this.http.post<LoginResponseBody>(
      `${environment.AUTH_API_BASEURL}user/refresh-token`,
      { refresh_token: this.token() },
      {
        headers: {
          authorization: `Bearer ${this.token()}`,
        },
      }
    );
  }

  public getUser() {
    return this.http.get(`${environment.AUTH_API_BASEURL}user/profile`);
  }

  public validateUser() {
    return this.http
      .get(`${environment.AUTH_API_BASEURL}user/validate`)
      .pipe(retry(2));
  }
}

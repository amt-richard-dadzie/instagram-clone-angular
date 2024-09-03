import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AUser, LoginRequestBody } from '../interfaces/auth';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  const initialState = {
    auth: {
      refresh_token: 'testRefreshToken',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({ initialState }),
      ],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should successfully register user with valid data', () => {
    const user: AUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'testPassword',
    };

    authService.register(user).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${environment.AUTH_API_BASEURL}user/signup`
    );

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(user);
    req.flush({ message: 'created user' });
  });

  it('should successfully login user', () => {
    const mockLoginResponse = {
      message: 'Success',
      login_token: 'testAccessToken',
      refresh_token: 'testRefreshToken',
    };
    const user: LoginRequestBody = {
      email: 'johndoe@gmail.com',
      password: 'testPassword',
    };

    authService.login(user).subscribe((res) => {
      expect(res).toEqual(mockLoginResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.AUTH_API_BASEURL}user/login`
    );

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(user);
    req.flush(mockLoginResponse);
  });

  it('should successfully refresh token', () => {
    const mockResponse = {
      accessToken: 'newAccessToken',
      refreshToken: 'newRefreshToken',
    };

    authService.refreshToken().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.AUTH_API_BASEURL}user/refresh-token`
    );

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ refresh_token: 'testRefreshToken' });
    expect(req.request.headers.get('authorization')).toBe(
      'Bearer testRefreshToken'
    );
    req.flush(mockResponse);
  });

  it('should validate user', () => {
    const mockValidateResponse = { message: 'okay' };

    authService.validateUser().subscribe((res) => {
      expect(res).toEqual(mockValidateResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.AUTH_API_BASEURL}user/validate`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockValidateResponse);
  });
});

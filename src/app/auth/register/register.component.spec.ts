import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { CustomInputFieldComponent } from '../custom-input-field/custom-input-field.component';
import { AuthService } from '../auth.service';
import { of, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: jest.Mocked<Pick<AuthService, 'register'>>;
  let toastServiceMock: jest.Mocked<Pick<NgToastService, 'success' | 'danger'>>;
  let routerMock: jest.Mocked<Pick<Router, 'navigateByUrl'>>;

  beforeEach(async () => {
    authServiceMock = {
      register: jest.fn(),
    };

    toastServiceMock = {
      success: jest.fn(),
      danger: jest.fn(),
    };
    routerMock = {
      navigateByUrl: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, CustomInputFieldComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: NgToastService, useValue: toastServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create register component', () => {
    expect(component).toBeTruthy();
  });

  it('should call register method with form data', () => {
    const mockUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@gmail.com',
      password: 'password123',
    };
    component.registerForm.setValue(mockUser);
    authServiceMock.register.mockReturnValue(of({ message: 'Success' }));

    component.onSubmit();

    expect(authServiceMock.register).toHaveBeenCalledWith(mockUser);
  });

  it('should show success toast and navigate to login on successful registration', () => {
    const mockUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@gmail.com',
      password: 'password123',
    };
    component.registerForm.setValue(mockUser);
    authServiceMock.register.mockReturnValue(
      of({ message: 'Registration Successful' })
    );

    jest.useFakeTimers();
    component.onSubmit();

    expect(toastServiceMock.success).toHaveBeenCalledWith(
      'Registration Successful',
      'Success',
      expect.any(Number)
    );
    jest.advanceTimersByTime(3000);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    jest.useRealTimers();
  });

  it('should show error toast on registration failure', () => {
    authServiceMock.register.mockReturnValue(
      throwError(() => 'Registration failed')
    );

    component.onSubmit();

    expect(toastServiceMock.danger).toHaveBeenCalledWith(
      'Registration failed',
      'Error',
      expect.any(Number)
    );
  });

  it('should set loading to false after registration attempt', () => {
    authServiceMock.register.mockReturnValue(of({ message: 'Success' }));

    component.onSubmit();

    expect(component.loading()).toBeFalsy();
  });

});

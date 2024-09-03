import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AUTH_ACTIONS } from '../auth.actions';
import { CustomInputFieldComponent } from '../custom-input-field/custom-input-field.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  const initialState = {
    auth: {
      loading: false,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, CustomInputFieldComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the login action with the correct payload on submit', () => {
    const mockDispatch = jest.spyOn(store, 'dispatch');
    const mockLoginFormValue = {
      email: 'johndoe@example.com',
      password: 'password123',
    };

    component.loginForm.setValue(mockLoginFormValue);

    component.onSubmit();

    expect(mockDispatch).toHaveBeenCalledWith(
      AUTH_ACTIONS.login(mockLoginFormValue)
    );
  });
});

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthState } from '../auth.state';
import { Store } from '@ngrx/store';
import { AUTH_ACTIONS } from '../auth.actions';
import { LoginRequestBody } from '../../interfaces/auth';
import { selectLoading } from '../auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loading = this.store.selectSignal(selectLoading);
  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>
  ) {}

  public onSubmit() {
    this.store.dispatch(
      AUTH_ACTIONS.login(this.loginForm.value as LoginRequestBody)
    );
  }
}

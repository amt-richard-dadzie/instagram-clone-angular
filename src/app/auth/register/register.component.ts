import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AUser } from '../../interfaces/auth';
import { emailValidator } from '../validators/email.validators';
import { NgToastService } from 'ng-angular-popup';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { constants } from '../../../utils/constants';
import { validNameValidator } from '../validators/validname.validator';
import { noWhiteSpaceValidator } from '../validators/whitespace.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public registerForm = this.formBuilder.group({
    first_name: [
      '',
      [Validators.required, noWhiteSpaceValidator(), validNameValidator()],
    ],
    last_name: [
      '',
      [Validators.required, noWhiteSpaceValidator(), validNameValidator()],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        emailValidator(['gmail.com', 'outlook.com', 'amalitech.com']),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  public loading = signal(false);

  public constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService,
    private router: Router
  ) {}

  public get firstName() {
    return this.registerForm.controls.first_name;
  }

  public get lastName() {
    return this.registerForm.controls.last_name;
  }

  public get email() {
    return this.registerForm.controls.email;
  }

  public get password() {
    return this.registerForm.controls.password;
  }

  public onSubmit() {
    this.loading.set(true);
    const formData = this.registerForm.value;
    this.authService
      .register(formData as AUser)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.toast.success(res.message, 'Success', constants.TOAST_TIME_OUT);
          setTimeout(() => {
            this.router.navigateByUrl('/auth/login');
          }, 3000);
        },
        error: (error) => {
          this.toast.danger(
            error,
            constants.TOAST_ERROR_TITLE,
            constants.TOAST_TIME_OUT
          );
        },
      });
  }
}

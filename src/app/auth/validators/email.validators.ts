import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(allowedDomain: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailDomain = control.value.split('@')[1];
    const isAllowedDomain = allowedDomain.includes(emailDomain);
    return isAllowedDomain
      ? null
      : {
        invalidDomain: {
          message: 'Allowed domains: ' + allowedDomain.join(', '),
        },
      };
  };
}

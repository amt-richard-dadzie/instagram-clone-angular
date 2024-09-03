import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValid = /^[a-zA-Z0-9]/.test(value);
    return isValid ? null : { invalidName: true };
  };
}

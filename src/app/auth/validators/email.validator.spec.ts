import { FormControl } from '@angular/forms';
import { emailValidator } from './email.validators';

describe('Email Domain Validator', () => {
  const allowedDomains = ['example.com', 'test.com'];
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl('');
  });

  it('should return null for valid email domain', () => {
    control.setValue('user@example.com');
    const result = emailValidator(allowedDomains)(control);
    expect(result).toBeNull();
  });

  it('should return error for invalid email domain', () => {
    control.setValue('user@invalid.com');
    const result = emailValidator(allowedDomains)(control);
    expect(result).toEqual({
      invalidDomain: {
        message: 'Allowed domains: example.com, test.com',
      },
    });
  });

  it('should return error for empty email', () => {
    control.setValue('user');
    const result = emailValidator(allowedDomains)(control);
    expect(result).toEqual({
      invalidDomain: {
        message: 'Allowed domains: example.com, test.com',
      },
    });
  });
});

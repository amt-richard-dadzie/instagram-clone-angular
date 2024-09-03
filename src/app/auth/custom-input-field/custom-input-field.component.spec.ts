import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputFieldComponent } from './custom-input-field.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('CustomInputFieldComponent', () => {
  let component: CustomInputFieldComponent;
  let fixture: ComponentFixture<CustomInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomInputFieldComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomInputFieldComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    component.label = 'Test Label';
    component.placeholder = 'Test Placeholder';
    fixture.detectChanges();
  });

  it('should create custom input field component', () => {
    expect(component).toBeTruthy();
  });

  it('should set input properties correctly', () => {
    expect(component.label).toBe('Test Label');
    expect(component.placeholder).toBe('Test Placeholder');
    expect(component.type).toBe('text');
    expect(component.control).toBeDefined();
  });


  it('should render mat-error element when control has required error', () => {
    component.control.setValidators(Validators.required);
    component.control.updateValueAndValidity();
    component.control.markAsTouched();
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent.trim()).toBe(
      'Test Label is required'
    );
  });

  it('should render mat-label element', () => {
    const matLabel = fixture.debugElement.query(By.css('mat-label'));
    expect(matLabel).toBeTruthy();
    expect(matLabel.nativeElement.textContent).toBe('Test Label');
  });

  it('should render input field correctly', () => {
    component.control.setValue('test');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    console.log(input.nativeElement.value);
    expect(input).toBeTruthy();
    expect(input.nativeElement.value).toEqual('test');
    expect(input.nativeElement.getAttribute('placeholder')).toBe(
      'Test Placeholder'
    );
    expect(input.nativeElement.getAttribute('type')).toBe('text');
  });

  it('should return correct error message for required field', () => {
    component.control.setValidators(Validators.required);
    component.control.updateValueAndValidity();
    expect(component.getError()).toEqual('Test Label is required');
  });
  it('should return correct error message for whitespace', () => {
    component.control.setErrors({ whitespace: true });
    expect(component.getError()).toEqual('Test Label shouldn\'t be empty');
  });
  it('should return correct error message for email', () => {
    component.control.setErrors({email: true});
    expect(component.getError()).toEqual('Test Label should be a email');
  });
  it('should return correct error message for invalidName', () => {
    component.control.setErrors({invalidName: true});
    expect(component.getError()).toEqual('Did you entered your name correctly?');
  });
  it('should return correct error message for minlength', () => {
    component.control.setErrors({ minlength: { requiredLength: 5 } });
    expect(component.getError()).toBe('Test Label must have at least 5 chars');
  });
  it('should return correct error message for invalid domain', () => {
    const errorMessage = 'Invalid domain';
    component.control.setErrors({ invalidDomain: { message: errorMessage } });
    expect(component.getError()).toBe(errorMessage);
  });

  it('should return empty string for unknown error', () => {
    component.control.setErrors({ unknownError: true });
    expect(component.getError()).toBe('');
  });
});

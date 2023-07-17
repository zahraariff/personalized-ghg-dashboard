import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if (value && value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  };
}

export function minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value && value.length < minLength) {
        return { 'minlength': { requiredLength: minLength, actualLength: value.length } };
      }
      return null;
    };
}

export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
  
      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
  
      const valid = hasLowerCase && hasUpperCase && hasNumber;
  
      if (!valid) {
        return { 'passwordStrength': true };
      }
  
      return null;
    };
}
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AppValidator {
  constructor() {}

  static userName(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (val) {
      const regex = /\d/;
      const containsDigits = regex.test(val);
      return containsDigits ? { userName: 'inValid' } : null;
    }
    return null;
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  static password(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (val) {
      const re = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
      const conditionMet = re.test(val);
      return conditionMet ? null : { password: 'inValid' };
    }
    return null;
  }
}

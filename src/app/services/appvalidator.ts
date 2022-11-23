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
}

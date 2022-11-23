import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */
import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  message: string = '';
  isFormValid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // setup the loginform and validators
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cb: [false, Validators.required],
    });
  }

  ngOnDestroy() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const name = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authenticationService.login(name, password).subscribe({
        next: (result) => {
          console.log('result', result);
          sessionStorage.setItem('isAuthenticated', 'true');
          this.message = 'Successfully logged in';
          this.isFormValid = true;
          this.router.navigateByUrl('/welcome');
        },
        error: (err) => {
          console.log('err', err);
          sessionStorage.setItem('isAuthenticated', 'false');
          this.message = 'Invalid details';
          this.isFormValid = false;
        },
        complete: () => {},
      });
    }
  }

  // implement the username validator. Min 6 characters and no digits, special chars
  usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value;
      if (val) {
        // const inValid = values.includes(val);
        // return inValid ? null : { mobile: 'inValid' };
        // return true;
      }
      return null;
    };
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (val) {
      const regex =
        /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/;
      const isValid = regex.test(val);
      return isValid ? null : { email: 'inValid' };
    }
    return null;
  }
}

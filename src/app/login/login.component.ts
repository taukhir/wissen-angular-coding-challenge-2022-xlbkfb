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
import { AuthenticationService } from '../services/authentication.service';
import { AppValidator } from '../services/appvalidator';
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */

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
      email: [
        '',
        [Validators.required, Validators.minLength(6), AppValidator.userName],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), AppValidator.password],
      ],
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
          sessionStorage.setItem('access-token', result.token);
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
}

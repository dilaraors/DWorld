import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'protractor';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { RegisterPageComponent } from '../register-page/register-page.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  success: string;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    // redirect to home if already logged in
    if (localStorage.getItem('isLoggedIn') == 'true') {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      }
    );

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // show success message on registration
    if (this.route.snapshot.queryParams['registered']) {
      this.success = 'Registration successful';
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  register() {
    this.modalService.open(RegisterPageComponent);
  }

  onSubmit() {
    this.submitted = true;
    let login = {
      password: this.loginForm.controls.password.value,
      username: this.loginForm.controls.username.value,
    };

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(login).subscribe(
      (data) => {
        localStorage.setItem('userId', data["result"]["id"]);
        localStorage.setItem('isLoggedIn', 'true');
        this.modalService.dismissAll(LoginPageComponent);
        location.reload();
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.error = error.error.message;
        this.loading = false;
      }
    );
  }
}

export const oneOfThem = (
  validator: ValidatorFn,
  controls: string[] = null
) => (group: FormGroup): ValidationErrors | null => {
  if (!controls) {
    controls = Object.keys(group.controls);
  }

  const hasAtLeastOne =
    group &&
    group.controls &&
    controls.some((k) => !validator(group.controls[k]));

  return hasAtLeastOne
    ? null
    : ({
        atLeastOne: 'At least one field has to be provided.',
      } as ValidationErrors);
};

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    if (localStorage.getItem('isLoggedIn') == "true") {
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1)]],
      confirm_password: ['', Validators.required],
    });
  }

  login() {
    this.modalService.dismissAll(RegisterPageComponent);
  }

  onSubmit() {
    this.submitted = true;
    let register = {
      name : this.registerForm.controls.firstName.value,
      surname :  this.registerForm.controls.lastName.value,
      userName : this.registerForm.controls.username.value,
      email :  this.registerForm.controls.email.value,
      password :  this.registerForm.controls.password.value,
      confirmPassword : this.registerForm.controls.confirm_password.value
    }
    
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    
    this.authenticationService
      .register(register)
      .subscribe(
        (data) => {
          localStorage.setItem('isLoggedIn',"true");
          this.router.navigate(['/'], {
            queryParams: { registered: true },
          });
          this.modalService.dismissAll(RegisterPageComponent);
          location.reload();
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = error.error.message;
          this.loading = false;
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private  authService:  AuthService, private router: Router, private formBuilder: FormBuilder) {
    if (localStorage.getItem('isLoggedIn') == "true") {
      this.router.navigate(['/']);
    }
   }
    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username: [''],
        email: [''],
        password: ['', Validators.required],
      }, { validator: oneOfThem(Validators.required, ['email','username'])});
  
    }

    get f() { return this.loginForm.controls; }

    async login(){
      debugger;
      let emailOrPassword = this.loginForm.controls.email.value != "" ? this.loginForm.controls.email.value : this.loginForm.controls.username.value;
     
      var res = await this.authService.login(emailOrPassword,this.loginForm.controls.password.value);

      if(res.operationType == "signIn"){
        localStorage.setItem('isLoggedIn',"true");
        this.router.navigate(['/']);
      }else{
        // error message throw
      }
    }

    //TO DO
    forgotPassword(){}
}

export const oneOfThem = (validator: ValidatorFn, controls:string[] = null) => (
  group: FormGroup,
): ValidationErrors | null => {
  if(!controls){
    controls = Object.keys(group.controls)
  }

  const hasAtLeastOne = group && group.controls && controls
    .some(k => !validator(group.controls[k]));

  return hasAtLeastOne ? null : ({ atLeastOne: 'At least one field has to be provided.' } as ValidationErrors);
};

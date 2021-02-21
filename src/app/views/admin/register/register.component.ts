import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private  authService:  AuthService, private router: Router, private formBuilder: FormBuilder) {
    if (localStorage.getItem('isLoggedIn') == "true") {
      this.router.navigate(['/']);
    }
   }
    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]});
  
    }

    get f() { return this.registerForm.controls; }

    async register(){
      debugger;
      let emailOrPassword = this.registerForm.controls.email.value != "" ? this.registerForm.controls.email.value : this.registerForm.controls.username.value;
     
      var res = await this.authService.register(emailOrPassword,this.registerForm.controls.password.value);
      console.log("res",res);

    }

}

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './services/authentication/authentication.service';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {

  @ViewChild('modal', {static: false}) modal: LoginPageComponent;

  title = 'DWorldProjectFE';
  signedIn = "false";

  constructor(private modalService: NgbModal, private  authService:  AuthenticationService, private router: Router){
  }

  ngOnInit(){
    this.signedIn = localStorage.getItem('isLoggedIn');
  }

  login() {
    this.modalService.open(LoginPageComponent);
  }

  register() {
    this.modalService.open(RegisterPageComponent);
  }

  async onSignIn() {
    // var res = await this.authService.loginWithGoogle();
    // debugger;
    // if(res["operationType"] == "signIn"){
    //   localStorage.setItem('isLoggedIn',"true");
    //   this.router.navigate(['/']);
    // }
    // console.log("res",res);

    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

   logOut() {
    localStorage.clear();
    this.router.navigate(["/"]);
    // this.authService.logout().subscribe(() => {
    //   localStorage.setItem('isLoggedIn', 'false');
    //   localStorage.removeItem('AuthToken');
    //   localStorage.removeItem('UserId');
    //   localStorage.removeItem('userId');
    //   location.reload();
    //   this.router.navigate(['/']);
    // });
  }

}

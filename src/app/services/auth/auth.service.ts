import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) { 
    afAuth.authState.subscribe(user => {
      if (user){
        localStorage.setItem('user', JSON.stringify(user));
      } else {
       // localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string) {
    var result = null;
     await this.afAuth.signInWithEmailAndPassword(email, password).then(value => {
       result = value;
      console.log('Nice, it worked!');
    })
    .catch(err => {
      result = err;
      console.log('Something went wrong:',err.message);
    });
    return result;
}
  
async register(email: string, password: string) {
  var result = null;
  await this.afAuth.createUserWithEmailAndPassword(email, password).then(value => {
    result = value;
   console.log('Nice, it worked!');
 })
 .catch(err => {
   result = err;
   console.log('Something went wrong:',err.message);
 });
 return result;
  // this.sendEmailVerification();
}

async sendEmailVerification() {
  //await (await this.afAuth.currentUser).sendEmailVerification();
}

async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
}

async logout(){
  var result = null;
  await this.afAuth.signOut().then(value => {
    result = value;
    localStorage.removeItem('user');
   console.log('Nice, it worked!');
 })
 .catch(err => {
   result = err;
   console.log('Something went wrong:',err.message);
 });
 return result;
}

get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}

async  loginWithGoogle(){
  var result = null;
  await  this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then((res) => {
    result = res;
  }).catch((error) => {
    debugger;
   result = error;
  });

  return result;
}

}

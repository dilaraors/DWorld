import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { Register } from 'src/app/models/register.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiEndpoint;
    this.myApiUrl = '/api/Account/';
  }
  public get LoggedIn() {
    return localStorage.getItem('isLoggedIn');
  }

  login(model): Observable<Login> {
    return this.http
      .post<Login>(
        this.myAppUrl + this.myApiUrl + 'Login',
        JSON.stringify(model),
        this.httpOptions
      )
      .pipe(
        map(data => {
          if (data) {
            debugger;
            localStorage.setItem('UserId', data["result"]["user"].id);
            localStorage.setItem('AuthToken', data["result"].jwtToken);
          }
          return data;
        })
      );
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.myAppUrl + '/api/User/Get').pipe(retry(1));
  }
  register(model): Observable<Register> {
    return this.http
      .post<Register>(
        this.myAppUrl + this.myApiUrl + 'Register',
        JSON.stringify(model),
        this.httpOptions
      )
      .pipe(retry(1));
  }

  logout(): Observable<any> {
    return this.http
      .post<any>(
        this.myAppUrl + this.myApiUrl + 'Logout',
        this.httpOptions
      );
  }
}

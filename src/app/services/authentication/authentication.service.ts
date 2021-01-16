 import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Login } from 'src/app/models/login.model';
import { Register } from 'src/app/models/register.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.myAppUrl = environment.apiEndpoint;
        this.myApiUrl = '/api/Account/';
    }
    public get currentUserValue() {
      return this.currentUserSubject.value;
  }

  login(model): Observable<Login> {
      return this.http.post<Login>(this.myAppUrl + this.myApiUrl + "Login" , JSON.stringify(model), this.httpOptions).pipe(
        retry(1)
      );
  }
  register(model): Observable<Register> {
      return this.http.post<Register>(this.myAppUrl + this.myApiUrl + "Register" , JSON.stringify(model), this.httpOptions).pipe(
        retry(1)
      );
  }

}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiEndpoint;
    this.myApiUrl = '/api/User/';
  }

  get(): any {
     return this.http.get(this.myAppUrl + this.myApiUrl + "Get");
  }

  getProfileImage(): any {
     return this.http.get(this.myAppUrl + this.myApiUrl + "GetProfileImage");
  }

  updateUserInfo(model): Observable<any> {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + "UpdateUserInfo",JSON.stringify(model),this.httpOptions);
 }

  uploadProfileImage(file: Blob): any {
    let formData: FormData = new FormData();
    formData.append('file', file);
    this.httpOptions.headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + "UploadProfileImage", formData, this.httpOptions);
 }
}

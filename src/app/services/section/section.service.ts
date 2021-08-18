import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiEndpoint;
    this.myApiUrl = '/api/Section/';
  }

  get(): any {
    return this.http.get(this.myAppUrl + this.myApiUrl + "Get");
 }
}

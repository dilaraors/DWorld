import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/models/blog-post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserBlogPostService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiEndpoint;
    this.myApiUrl = '/api/UserBlogPost/';
  }

  getBlogPostsByType(type: number): Observable<BlogPost[]> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + "GetByType/"+type, this.httpOptions);
  }

  addByType(model): Observable<any>{
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + "AddByType", JSON.stringify(model), this.httpOptions);
  }

  deleteByType(model): Observable<any>{
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + "DeleteByType", JSON.stringify(model), this.httpOptions);
  }

  getBlogPostByTypeExistence(model): Observable<any>{
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + "GetBlogPostByTypeExistence", JSON.stringify(model), this.httpOptions);
  }

}

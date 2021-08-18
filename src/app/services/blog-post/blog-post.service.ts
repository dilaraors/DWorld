import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BlogPost } from 'src/app/models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiEndpoint;
    this.myApiUrl = '/api/BlogPost/';
  }

  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<any>(this.myAppUrl + this.myApiUrl + "Get")
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getBlogPost(postId: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(this.myAppUrl + this.myApiUrl + "GetById/" + postId)
    .pipe(
      catchError(this.errorHandler)
    );
}

  getBlogPostBySection(model): any {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + "GetBySection",model, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
}

  addBlogPost(blogPost): any {
    this.httpOptions.headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + "Add", blogPost, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateBlogPost(blogPost): any {
    this.httpOptions.headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
    return this.http.put<any>(this.myAppUrl + this.myApiUrl +  "Update", blogPost, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteBlogPost(postId: number): Observable<BlogPost> {
    return this.http.delete<BlogPost>(this.myAppUrl + this.myApiUrl + "Delete/" + postId)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

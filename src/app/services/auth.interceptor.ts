import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}
    
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const authToken = localStorage.getItem("AuthToken");
		if (authToken) {
			request = request.clone({
				headers: request.headers.set("Authorization",
					"Bearer " + authToken)
			});
        }
        
        return next.handle(request);
	}
}

import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements  HttpInterceptor{

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = {token: ""};
    if(sessionStorage['currentUser'] != null)
      {
        currentUser = JSON.parse(sessionStorage['currentUser']);
      }
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + currentUser.token
      }
    }); // because you cannot modify the existing request
    return next.handle(request); // it invokes next handler if any, otherwise it invokes the HttpXhrBackend
  }
}

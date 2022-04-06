import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {LoginViewModel} from "./login-view-model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient: HttpClient | null = null;
  constructor(private httpBackend: HttpBackend, private jwtHelperService: JwtHelperService) // httpBackend which represents client without interceptors
  { }

  currentUserName : any = null;

  public Login(loginViewModel: LoginViewModel): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>("", loginViewModel, { responseType: "json" })
      .pipe(map(user =>
      {
        if (user)
        {
          this.currentUserName = user.userName;

          //stores token
          sessionStorage['currentUser']= JSON.stringify(user);// session storage: access only nothing the same browser tab
          // localStorage: cannot be used because this info saved even when you navigate to the different browser and when you close the browser.
        }
        return user;
      }));
  }

  public Logout()
  {
    sessionStorage.removeItem("currentUser");
    this.currentUserName = null;
  }

  public isAuthenticated(): boolean {

    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser") as any).token : null;
    return !this.jwtHelperService.isTokenExpired(token);
  }
}

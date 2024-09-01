import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private URL = "http://localhost:8080";

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  executeAuthentication(userName: string, password: string): Observable<any> {
    console.log("User Name: " + userName);
    console.log("Password: " + password);

   let  data = {
      "username":userName,
      "password":password
    }

    console.log("Data: " + JSON.stringify(data));

    return this.http.post<any>(`${this.URL}/signin`, data).pipe(

      map(response => {
        sessionStorage.setItem("isRegister", userName);
        sessionStorage.setItem("token", `Bearer ${response.token}`);

        // console.log("isRegister: " + sessionStorage.getItem("isRegister"));
        // console.log("token: " + sessionStorage.getItem("token"));
        // console.log("Response Token: " + response.token);

        return response;
      }),
      catchError(error => {
        console.error('Authentication failed', error);
        return throwError(() => new Error('Authentication failed'));
      })
    );


  }


  getAuth() {
    return sessionStorage.getItem("isRegister")!;
  }

  getToken(): string {
    return this.getAuth() ? sessionStorage.getItem("token")! : '';
  };

  isLogin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem("isRegister") !== null;
    }
    return false;
  }

  logOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem("isRegister");
      sessionStorage.removeItem("token");
    }
  }
}

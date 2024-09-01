import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable} from 'rxjs';
import { AuthenticationService } from "../Authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBaseAuthService implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    if (this.auth.getAuth() && token) {
      req = req.clone({
        setHeaders: {
          Authorization:token
        }
      });
      // console.log(this.auth.getToken() );
      // console.log("Auth " + this.auth.getAuth() );
    }

    return next.handle(req);
  }

}





import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../Authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class LoginLinkActiveService implements CanActivate {

  constructor(private  login :AuthenticationService ,private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.login.isLogin()) {
      return this.router.createUrlTree(['/home']);
    }
   // Return a UrlTree for navigation
    return true;
  }
}

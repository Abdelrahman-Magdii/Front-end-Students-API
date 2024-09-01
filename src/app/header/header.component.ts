import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../service/Authentication/authentication.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent  {

  constructor(private loginService: AuthenticationService,private route :Router) { }

  isAuthenticaterUser() {
    return this.loginService.isLogin();
  }

  logout() {
    this.loginService.logOut();
    this.route.navigateByUrl('login');
  }

  search(name: string) {
    console.log(name);
    this.route.navigateByUrl(`home/${name}`);
  }
}

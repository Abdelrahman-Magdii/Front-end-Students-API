import { Routes } from '@angular/router';
import {RouterLinkActiveService} from "./service/routerLink/router-link-active.service";
import {LoginLinkActiveService} from "./service/loginActivate/login-link-active.service";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import("./students/students.component").then(m => m.StudentsComponent) ,canActivate:[RouterLinkActiveService] },
  { path: 'home/:name', loadComponent: () => import("./students/students.component").then(m => m.StudentsComponent) ,canActivate:[RouterLinkActiveService] },
  { path: 'options', loadComponent: () => import("./options/options.component").then(m => m.OptionsComponent)  ,canActivate:[RouterLinkActiveService] },
  { path: 'options/:id', loadComponent: () => import("./options/options.component").then(m => m.OptionsComponent)  ,canActivate:[RouterLinkActiveService] },
  { path: 'login', loadComponent: () => import("./register/register.component").then(m => m.RegisterComponent),canActivate:[LoginLinkActiveService] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

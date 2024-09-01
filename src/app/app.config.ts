import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http";
import {HttpIntercepterBaseAuthService} from "./service/auth/http-intercepter-base-auth.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),  // Enable Fetch API for HttpClient

    // send header in all req
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBaseAuthService, multi: true }

  ]
};

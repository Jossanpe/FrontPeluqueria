import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptores/jwt.interceptor';//REGISTRA EL INTERCEPTOR HTTP GLOBALMENTE
import { authErrorInterceptor } from './core/interceptores/auth-error-interceptor.service';
import { LOCALE_ID } from '@angular/core';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor,authErrorInterceptor])),
    {provide:LOCALE_ID, useValue: 'es'},
  ],
};

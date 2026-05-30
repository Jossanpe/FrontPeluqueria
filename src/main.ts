import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

//import { enableProdMode } from '@angular/core';
//import { EnvironmentProviders } from '@angular/core';



registerLocaleData(localeEs);
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';

export const APP_SETTINGS = {
  api: {
    baseUrl: 'https://api.coincap.io/v2',
  },
  crypto: {
    list: ['bitcoin', 'ethereum', 'dogecoin'],
  },
  refresh: {
    shortInterval: 4000,
    longInterval: 10000,
  },
} as const;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
  ],
};

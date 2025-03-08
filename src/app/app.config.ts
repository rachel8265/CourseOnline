import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection(
//     { eventCoalescing: true }), 
//     provideRouter(routes), 
//     provideClientHydration(withEventReplay())]
// };
// import { errorInterceptor } from '../interceptors/error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes, withComponentInputBinding()), 
  //   provideClientHydration(), 
  //   // provideHttpClient(withInterceptors([errorInterceptor])), 
    
  //   provideAnimationsAsync(),
  //   provideClientHydration()]
  providers: [ provideHttpClient(),provideRouter(routes)]
};

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideApiServices } from './shared/services/api/providers/api-services-provider';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
    provideApiServices(),
    provideAnimationsAsync(),
    provideToastr(),
  ],
};

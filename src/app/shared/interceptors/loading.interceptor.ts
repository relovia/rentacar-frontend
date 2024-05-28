import type { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading/loading.service';
import { delay, finalize } from 'rxjs';
import { inject } from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.addRequest();
  return next(req).pipe(
    delay(200), // delay for 200ms
    finalize(() => {
      loadingService.removeRequest();
    })
  );
};

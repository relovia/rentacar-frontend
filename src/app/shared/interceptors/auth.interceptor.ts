import type { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('authInterceptor');
  let newRequest = req.clone({
    setHeaders: { Authorization: 'Bearer ' + localStorage.getItem('token') },
  });

  return next(newRequest);
};

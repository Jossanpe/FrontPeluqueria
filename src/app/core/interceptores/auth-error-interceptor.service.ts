import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AutorizacionService } from '../services/AutorizacionService/autorizacion.service';


export const authErrorInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  const authService = inject(AutorizacionService);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {

        authService.clearSession();

        // opcional:
        // location.href = '/login';
      }

      return throwError(() => error);
    })

  );
};
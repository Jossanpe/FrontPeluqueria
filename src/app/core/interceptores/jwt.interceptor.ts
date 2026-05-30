//RESPONSABLE DE INTERCEPTAR TODAS LAS PETICIONES HTTP, ADEMAS LE AÑADE LA AUTORIZACION AL HEADER

import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { AutorizacionService } from '../services/AutorizacionService/autorizacion.service';

export const jwtInterceptor: HttpInterceptorFn = (
  req,

  next
) => {
  const authService = inject(AutorizacionService);

  const token = authService.obtenerToken();

  const EndPointsPublicos= [
    '/usuarios/login',
    '/usuarios/add'
  ];

  const esPublico = EndPointsPublicos.some(endpoint => req.url.includes(endpoint));

  //SI EXISTE TOKEN
  if (token && !esPublico) {
    //CLONAR REQUEST
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(cloned);
  }

  return next(req);
};

import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';

import { AutorizacionService } from '../services/AutorizacionService/autorizacion.service';

export const adminGuard: CanActivateFn = (
  route,

  state,
) => {
  const authService = inject(AutorizacionService);

  const router = inject(Router);

  const rol = authService.obtenerRol();

  //SI NO ES ADMIN
  if (rol !== 'ADMINISTRADOR') {
    router.navigate(['/autenticacion']);

    return false;
  }

  return true;
};

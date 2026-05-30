import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';

import { AutorizacionService } from '../services/AutorizacionService/autorizacion.service';

export const authGuard: CanActivateFn = (
  route,

  state,
) => {
  const authService = inject(AutorizacionService);

  const router = inject(Router);

  //SI NO HAY TOKEN
  if (!authService.estaLogueado()) {
    router.navigate(['/autenticacion']);

    return false;
  }

  return true;
};

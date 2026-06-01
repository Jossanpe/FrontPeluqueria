import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  obtenerTenant():string{

    //CON DOMINIO
  //  const host = window.location.hostname;
    //return host.split('.')[0];

    //con vercel
  return window.location.hostname
    .split('.')[0]
    .replace('-zeta', '');
}
   
  }


}

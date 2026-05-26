import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  obtenerTenant():string{

    const host = window.location.hostname;

    return host.split('.')[0];
  }
}

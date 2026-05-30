
//RESPONSABLE DE GESTIONAR: TOKEN, LOGIN LOCAL, LOGOUT, ROLES


import { Injectable } from '@angular/core';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionService {
  
  //GUARDAR TOKEN
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  //OBTENER TOKEN
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }


//LIMPIAR SESION
  clearSession(){
    localStorage.removeItem('token');
    sessionStorage.clear();
  }

  //ELIMINAR TOKEN
  logout(): void {
   this.clearSession();
  }

  //OBTENER PAYLOAD JWT
  obtenerPayload(): any {
    const token = this.obtenerToken();

    if (!token) {
      return null;
    }

    return jwtDecode(token);
  }


  //OBTENER ROL
  obtenerRol(): string | null {
    const payload = this.obtenerPayload();

    return payload?.rol || null;
  }

  
  //OBTENER TENANT
  obtenerTenant(): string | null {
    const payload = this.obtenerPayload();

    return payload?.tenant || null;
  }

  //OBTENER TELEFONO
  obtenerTelefono(): string | null {
    const payload = this.obtenerPayload();

    return payload?.sub || null;
  }

  //COMPROBAR LOGIN
  estaLogueado(): boolean {
    return !!this.obtenerToken();
  }
}

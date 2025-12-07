import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RegistroUsuarioRequest, Usuario } from '../../../models/usuario';





@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private base = environment.apiUrl; 

  constructor(private http:HttpClient) { }

/* payload: objeto que contiene los datos del registro y regisoUsuarioRequest su interfaz.
Observable: objeto devuelto por la funcion, en ANGULAR todas las llamadas HTTP devulven obsevables,
no valores directos, porque las peticiones son asincronas. Elmetodo devuelve un observable, el
cual es tratado el TypeScript del componenete donde usa el metodo, normalmente una PAGE. 
Lo mejor es usar una interfaz para lo que devuelve, pero si no se puede usar any.
*/
  registro(payload:RegistroUsuarioRequest):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.base}/usuarios/add`, payload);
    console.log('UsuariosService base URL =', this.base);
  }

  
}

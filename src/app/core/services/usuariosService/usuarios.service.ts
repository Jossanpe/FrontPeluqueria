import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; //permite que angular pueda inyectar este sercicio en otros componentes
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
  

    registro(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.base}/usuarios/add`, formData);
  }
}

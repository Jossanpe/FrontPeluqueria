import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class NotificationService {
  
  mensaje:string='';

  tipo:
  'error'
  |
  'success'
  |
  'warning'
  =
  'error';

mostrarError(
  mensaje:string
){

  this.mensaje = mensaje;

  this.tipo='error';

  setTimeout(()=>{
    this.mensaje='';
  },3000);
}

}
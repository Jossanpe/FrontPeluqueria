

//Model Solicitud de autenticacion
export interface AutenticacionRequest {
  tel: string;
  claveSeguridad: string;
  tenant:string;
}
//modelo que devulve el servido la respuesta de autenticacion, llave de acceso, importante para guardarla en localStorage y poder acceder.
export interface AutenticacionResponse {
  token: string;
  user?: any;
  rol:string;
}

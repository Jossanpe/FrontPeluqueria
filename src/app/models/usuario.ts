

export interface RegistroUsuarioRequest {
   id?: number;
   sexo:string; 
    fechanacimiento: Date; 
    cp:number;
     direccion:string;
   email: string;
   claveSeguridad:string;
   tel:string;
   nombre:string;
}



export interface Usuario {
      id?: number;
      nombre:string;
      sexo:string;
       fechanacimiento: Date;
      tel:string;
     cp:string;
      direccion:string;
        email: string;
        claveSeguridad:string;
}


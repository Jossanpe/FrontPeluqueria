export interface Disponibilidad {

diaInicio:string;

  diaFin:string;

  horaInicio:string;

  horaFin:string;

  descansoInicio:string;

  descansoFin:string;

  intervalo:number;
}

export interface ExcepcionDisponibilidad {

  idExcepcion:number;

  fecha:string;

  diaCompleto:boolean;

  horaInicio:string;

  horaFin:string;
}
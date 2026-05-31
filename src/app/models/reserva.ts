export interface SlotsDia {

  fecha:string;

  slots:string[];
}

export interface ReservaDTO {

  fechaReserva:string;

  horaInicio:string;

}


export interface ReservaConsultaClienteDTO {

  idReserva: number;

  fechaReserva: string;

  horaInicio: string;

  tipoReserva: string;
}



export interface AgendaSlotDTO {

  fecha: string;

  horaInicio: string;

  horaFin: string;

  idReserva?: number | null;

  idExcepcion?: number;

  nombreCliente?: string | null;
    
  tipo?: string;

  telefonoCliente?: string;

  descripcion?: string | null;
}
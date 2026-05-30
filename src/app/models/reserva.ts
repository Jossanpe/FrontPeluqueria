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


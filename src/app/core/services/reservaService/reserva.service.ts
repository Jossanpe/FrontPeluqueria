import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaDTO, SlotsDia } from '../../../models/reserva';
import { environment } from '../../../../environments/environment';
import { ReservaConsultaClienteDTO } from '../../../models/reserva';
import { AgendaSlotDTO } from '../../../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
   private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerSlotsSemana(fechaInicioSemana: string): Observable<SlotsDia[]> {
    return this.http.get<SlotsDia[]>(
      `${this.base}/reservas/slots?fechaInicioSemana=${fechaInicioSemana}`,
    );
  }

  crearReserva(payload: ReservaDTO): Observable<any> {
    return this.http.post(
      `${this.base}/reservas/add`,

      payload,
    );
  }

obtenerReservaActivaCliente() {

  return this.http.get<ReservaConsultaClienteDTO>(
    `${this.base}/reservas/cliente`
  );
}

cancelarReserva() {

  return this.http.put(
    `${this.base}/reservas/cancelar`,
    {}
  );
}

obtenerAgendaSemana(
  fechaInicioSemana: string
) {

  return this.http.get<AgendaSlotDTO[]>(
    `${this.base}/reservas/agenda?fechaInicioSemana=${fechaInicioSemana}`
  );
}

cancelarReservaAdmin(
  idReserva: number
){
  return this.http.put(
    `${this.base}/reservas/cancelar-admin/${idReserva}`,
    {}
  );
}


crearReservaAdmin(dto: any){

  return this.http.post(
    `${this.base}/reservas/admin/add`,
    dto
  );
}

}

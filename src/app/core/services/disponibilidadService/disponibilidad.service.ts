// disponibilidad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Disponibilidad, ExcepcionDisponibilidad } from '../../../models/disponibilidad';

@Injectable({
  providedIn: 'root',
})
export class DisponibilidadService {
  // URL BASE API
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ======================================
  // OBTENER DISPONIBILIDAD ACTIVA
  // ======================================

  obtenerDisponibilidad(): Observable<Disponibilidad> {
    return this.http.get<Disponibilidad>(`${this.base}/disponibilidad`);
  }

  // ======================================
  // GUARDAR NUEVA DISPONIBILIDAD
  // ======================================

  guardarDisponibilidad(payload: Disponibilidad): Observable<Disponibilidad> {
    return this.http.post<Disponibilidad>(
      `${this.base}/disponibilidad`,

      payload,
    );
  }

  // ======================================
  // OBTENER EXCEPCIONES
  // ======================================

  obtenerExcepciones(): Observable<ExcepcionDisponibilidad[]> {
    return this.http.get<ExcepcionDisponibilidad[]>(`${this.base}/disponibilidad/excepciones`);
  }

  // ======================================
  // CREAR EXCEPCION
  // ======================================

  crearExcepcion(payload: ExcepcionDisponibilidad): Observable<ExcepcionDisponibilidad> {
    return this.http.post<ExcepcionDisponibilidad>(
      `${this.base}/disponibilidad/excepciones`,

      payload,
    );
  }

  // ======================================
  // ELIMINAR EXCEPCION
  // ======================================

  eliminarExcepcion(id: number): Observable<ExcepcionDisponibilidad> {
    return this.http.delete<ExcepcionDisponibilidad>(
      `${this.base}/disponibilidad/excepciones/${id}`,
    );
  }
}

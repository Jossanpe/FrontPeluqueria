import { Component } from '@angular/core';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AutenticacionRequest,AutenticacionResponse } from '../../../models/autenticacion';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  private base = environment.apiUrl; //define la ruta http
  constructor(private http: HttpClient) {}

  autenticar(payload:AutenticacionRequest ): Observable<AutenticacionResponse> {
    return this.http.post<AutenticacionResponse>(`${this.base}/autenticaciones/autenticar`, payload);
  }
}


import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavClienteComponent } from '../../shared/nav/nav-cliente/nav-cliente.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ReservaConsultaClienteDTO } from '../../models/reserva';

import { ReservaService } from '../../core/services/reservaService/reserva.service';

@Component({
  selector: 'app-reserva',
  standalone:true,
  imports: [
    FooterComponent,
    HeaderComponent,
    NavClienteComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css',
})
export class ReservaComponent  implements OnInit{

  reserva: ReservaConsultaClienteDTO | null = null;

  constructor(
  private reservaService: ReservaService
) {}

  ngOnInit(): void {
    this.reservaService.obtenerReservaActivaCliente().subscribe({
      next: (respuesta) => {
          console.log('RESERVA', respuesta);
        this.reserva = respuesta;
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

cancelarReserva(){
   this.reservaService
      .cancelarReserva()
      .subscribe({

        next: () => {

          this.reserva = null;
        },

        error: (error) => {

          console.log(error);
        }
      });

}


}

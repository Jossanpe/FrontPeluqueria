import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { FooterComponent } from '../../shared/footer/footer.component';

import { HeaderComponent } from '../../shared/header/header.component';

import { NavClienteComponent } from '../../shared/nav/nav-cliente/nav-cliente.component';

import { ReservaDTO, SlotsDia } from '../../models/reserva';

import { ReservaService } from '../../core/services/reservaService/reserva.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-citas-disponibles',

  standalone: true,

  imports: [
    FooterComponent,

    HeaderComponent,

    NavClienteComponent,

    RouterModule,

    CommonModule,
  ],

  templateUrl: './citas-disponibles.component.html',

  styleUrl: './citas-disponibles.component.css',
})
export class CitasDisponiblesComponent implements OnInit {
  semana: SlotsDia[] = [];

  fechaActual = new Date();

  mensaje = '';

  constructor(private reservaService: ReservaService, private router: Router) {}

  ngOnInit(): void {
    this.comprobarReservaActiva();
    this.cargarSemana();
  }

  cargarSemana() {
    const dia= this.fechaActual.getDay();
    const diferencia = dia ===0 ?-6:1-dia;
    const lunes = new Date(this.fechaActual);
    lunes.setDate(this.fechaActual.getDate() + diferencia);

    const fechaISO=lunes.toISOString().split(`T`)[0];

   


    this.reservaService.obtenerSlotsSemana(fechaISO).subscribe({
        next: (respuesta) => {
          this.semana = respuesta.filter(
            dia=>dia.slots.length > 0
          );
        },

        error: (error) => {
          console.log(error);
        },
      });
  }



mostrarConfirmacion = false;
mostrarReservaExistente=false;
tieneReservaActiva=false;
fechaPendiente = '';

slotPendiente = '';



  seleccionarSlot(
    fecha: string,

    slot: string,
    
  ) {
     
 if(this.tieneReservaActiva){
    
    this.mostrarReservaExistente = true;

    return;
  }

  this.fechaPendiente = fecha;

  this.slotPendiente = slot;

  this.mostrarConfirmacion = true;
    }


comprobarReservaActiva() {

  this.reservaService
      .obtenerReservaActivaCliente()
      .subscribe({

        next: (respuesta) => {

          this.tieneReservaActiva = !!respuesta;
        
        },

        error: () => {

          this.tieneReservaActiva = false;
        }
      });
}


confirmarReserva(){

  const payload: ReservaDTO = {

    fechaReserva: this.fechaPendiente,

    horaInicio: this.slotPendiente
  };

  this.reservaService
    .crearReserva(payload)
    .subscribe({

      next:()=>{

        this.mensaje = 'Reserva creada';

        this.mostrarConfirmacion = false;

        
        this.router.navigate(['/reserva']);
      },
      
      error:(error)=>{
         
  console.log(error);
        if(

          error.status === 403
          
        ){
        
        this.mostrarConfirmacion = false;
        this.mostrarReservaExistente=true;
        return;
  }
  this.mensaje= 'No se pudo reservar'
  this.mostrarConfirmacion = false;
}
});

}


cancelarReserva(){

  this.mostrarConfirmacion = false;

}

  
irAReserva(){
  this.mostrarReservaExistente = false;
  this.router.navigate(['/reserva']);
}



  semanaSiguiente() {
    this.fechaActual.setDate(this.fechaActual.getDate() + 7);
    this.cargarSemana();
  }

  semanaAnterior() {
    this.fechaActual.setDate(this.fechaActual.getDate() - 7);
    this.cargarSemana();
  }

  diaActual(){
     
  this.fechaActual = new Date();

  this.cargarSemana();
  }

esHoy(fecha: string): boolean {

  const hoy = new Date();

  const fechaDia = new Date(fecha);

  return (
    hoy.getFullYear() === fechaDia.getFullYear() &&
    hoy.getMonth() === fechaDia.getMonth() &&
    hoy.getDate() === fechaDia.getDate()
  );
}

irAFecha(event:any){

  this.fechaActual =
    new Date(event.target.value);

  this.cargarSemana();
}





}






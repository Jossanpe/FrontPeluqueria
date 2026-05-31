import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavAdminComponent } from '../../shared/nav/nav-admin/nav-admin.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgendaSlotDTO } from '../../models/reserva';
import { FormsModule } from '@angular/forms';

import { ReservaService } from '../../core/services/reservaService/reserva.service';

@Component({
  selector: 'app-agenda',
  imports: [
    FooterComponent,
    HeaderComponent,
    NavAdminComponent,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent implements OnInit {
  ngOnInit(): void {
   
    this.cargarAgenda();
    this.cargarClientes();
    
  }
  constructor(private reservaService: ReservaService) {}

  agenda: AgendaSlotDTO[] = [];
  slotNuevo: AgendaSlotDTO | null = null;
  slotSeleccionado: AgendaSlotDTO | null = null;

dias: string[] = [];
  fechaActual = new Date();
  horas: string[] = [];
mostrarCrear = false;
mostrarDetalle = false;
busquedaCliente = '';
clientesFiltrados: any[] = [];
descripcion = '';

cardX=0;
cardY=0;

clientes:any[] =[];
clienteSeleccionado: any =null;

mostrarError = false;
mensajeError = '';

//CARGAR AGENDA
cargarAgenda() {

    const dia = this.fechaActual.getDay();

    const diferencia =
      dia === 0 ? -6 : 1 - dia;

    const lunes =
      new Date(this.fechaActual);

    lunes.setDate(
      this.fechaActual.getDate() + diferencia
    );

   const fechaInicioSemana =
  `${lunes.getFullYear()}-${
    String(lunes.getMonth() + 1).padStart(2,'0')
  }-${
    String(lunes.getDate()).padStart(2,'0')
  }`;

    this.reservaService
      .obtenerAgendaSemana(fechaInicioSemana)
      .subscribe({

        next: (respuesta) => {

          console.log('AGENDA', respuesta);
          
          this.agenda = respuesta;

          // DIAS UNICOS
          this.dias = [
            ...new Set(
              respuesta.map(
                slot => slot.fecha
              )
            )
          ];

          // HORAS UNICAS
          this.horas = [
            ...new Set(
              respuesta.map(
                slot => slot.horaInicio.substring(0, 5)
              )
            )
          ];

          console.log('DIAS', this.dias);

          console.log('HORAS', this.horas);
        },

        error: (error) => {

          console.log(error);
        }
      });
  }



  //GENERAR HORAS
  generarHoras() {
    let hora = 8;
    let minuto = 0;

    while (hora < 23 || (hora === 23 && minuto === 0)) {
      this.horas.push(
        `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`,
      );

      minuto += 30;

      if (minuto === 60) {
        hora++;
        minuto = 0;
      }
    }
  }



   semanaSiguiente() {
    this.fechaActual.setDate(this.fechaActual.getDate() + 7);
    this.cargarAgenda();
  }

  semanaAnterior() {
    this.fechaActual.setDate(this.fechaActual.getDate() - 7);
    this.cargarAgenda();
  }

  diaActual(){
     
  this.fechaActual = new Date();

  this.cargarAgenda();
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

  this.cargarAgenda();
}


obtenerSlot(
  fecha: string,
  hora: string
): AgendaSlotDTO | undefined {

  return this.agenda.find(
    slot =>
      slot.fecha === fecha
      &&
      slot.horaInicio.substring(0,5) === hora
  );
}


abrirSlot(slot: AgendaSlotDTO | undefined, event: MouseEvent) {

  if (!slot) {
    return;
  }

  this.cardX = event.clientX + 10;
  this.cardY = event.clientY - 20;

  if (slot.idReserva) {

    this.slotSeleccionado = slot;

    this.mostrarDetalle = true;

    return;
  }

  this.slotNuevo = slot;

  this.mostrarCrear = true;
}


//CANCELAR RESRVAADMIN
cancelarReservaAdmin() {

  if (!this.slotSeleccionado?.idReserva) {
    return;
  }

  this.reservaService
    .cancelarReservaAdmin(
      this.slotSeleccionado.idReserva
    )
    .subscribe({

      next: () => {

        this.cerrarDetalle();

        this.cargarAgenda();

      },

      error: (error) => {

        console.log(error);

      }
    });
}


//CERRAR DETALLE
cerrarDetalle() {

  this.mostrarDetalle = false;

  document.body.style.overflow = 'auto';
}

//CERRAR CREAR
cerrarCrear() {

  this.mostrarCrear = false;

  this.slotNuevo = null;
}

cargarClientes(){
  this.reservaService
    .obtenerClientes()
    .subscribe({

      next: (respuesta) => {

         console.log('CLIENTES', respuesta);
        this.clientes = respuesta;

        this.clientesFiltrados = [];

      },

      error: (error) => {

        console.log(error);

      }
    });
}

buscarClientes(){
   const texto = this.busquedaCliente
    .toLowerCase()
    .trim();

  if (!texto) {

    this.clientesFiltrados = [];

    return;
  }

  this.clientesFiltrados =
    this.clientes.filter(cliente =>

      cliente.nombre
        .toLowerCase()
        .includes(texto)

      ||

      cliente.tel
        .includes(texto)

    );
}



seleccionarCliente(cliente:any){
  
  this.clienteSeleccionado = cliente;

  this.busquedaCliente = cliente.nombre;

  this.clientesFiltrados = [];
  
}



crearReservaAdmin(){

  if (!this.slotNuevo) {
    return;
  }

  if (!this.clienteSeleccionado) {

    alert('Selecciona un cliente');

    return;
  }

  const dto = {

    telCliente:
      this.clienteSeleccionado.tel,

    fechaReserva:
      this.slotNuevo.fecha,

    horaInicio:
      this.slotNuevo.horaInicio,

    horaFin:
      this.slotNuevo.horaFin,

    duracionMinutos:
      30,

    notas:
      this.descripcion
  };

  this.reservaService
    .crearReservaAdmin(dto)
    .subscribe({

      next: () => {

        this.cerrarCrear();

        this.descripcion = '';

        this.busquedaCliente = '';

        this.clienteSeleccionado = null;

        this.cargarAgenda();

      },

    error: (error) => {

  this.mensajeError =
    'Este cliente ya tiene una reserva activa';

  this.mostrarError = true;

}

    });
}

}

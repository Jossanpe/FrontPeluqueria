import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavAdminComponent } from '../../shared/nav/nav-admin/nav-admin.component';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BotonComponent } from '../../shared/boton/boton.component';
import { CommonModule } from '@angular/common';
import { DisponibilidadService } from '../../core/services/disponibilidadService/disponibilidad.service';
import { OnInit } from '@angular/core';
import { Disponibilidad, ExcepcionDisponibilidad } from '../../models/disponibilidad';
import { NotificationService } from '../../core/services/notificacionService/notificacion.service';

@Component({
  selector: 'app-panelcontrol',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    NavAdminComponent,
    RouterModule,
    ReactiveFormsModule,
    BotonComponent,
    CommonModule,
  ],
  templateUrl: './panelcontrol.component.html',
  styleUrls: ['./panelcontrol.component.css'],
})




// panelcontrol.component.ts
export class PanelcontrolComponent implements OnInit {
  ngOnInit(): void {
    this.cargarDisponibilidad();
    this.cargarExcepciones();
     this.toggleDescanso()
  }




  cargarDisponibilidad() {
    this.disponibilidadService.obtenerDisponibilidad().subscribe({
        next: (respuesta:Disponibilidad) => {
          console.log(respuesta);
          this.formularioDisponibilidad.patchValue(respuesta);
         ;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

toggleDescanso(){

  const tieneDescanso =this.formularioDisponibilidad.get('tieneDescanso')?.value;

    const descansoInicio = this.formularioDisponibilidad.get('descansoInicio');

    const descansoFin = this.formularioDisponibilidad .get('descansoFin');

  if(!tieneDescanso){

    descansoInicio?.setValue(null);
    descansoFin?.setValue(null);

    descansoInicio?.disable();
    descansoFin?.disable();

  } else {

    descansoInicio?.enable();
    descansoFin?.enable();
  }  
}
 cargarExcepciones(){
  
    this.disponibilidadService.obtenerExcepciones().subscribe({
      next:(respuesta:ExcepcionDisponibilidad[])=>{this.excepciones = respuesta;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }



   mensajeErrorDisponibilidad:string='';

   mensajeExitoDisponibilidad:string='';

   mensajeErrorExcepcion:string='';
 
    mensajeExitoExcepcion:string='';
    
   diasSemana: string[] = [
    'LUNES',
    'MARTES',
    'MIERCOLES',
    'JUEVES',
    'VIERNES',
    'SABADO',
    'DOMINGO',
  ];

  excepciones: ExcepcionDisponibilidad[] = [];

  formularioDisponibilidad: FormGroup;

  formularioExcepcion: FormGroup;

  constructor(
    private fb: FormBuilder,
    private disponibilidadService: DisponibilidadService,
    public notificacionService: NotificationService
  ) {
    this.formularioDisponibilidad = this.fb.group({
      diaInicio: ['LUNES'],

      diaFin: ['VIERNES'],

      horaInicio: ['09:00'],

      horaFin: ['20:00'],
      
      tieneDescanso:[false],

      descansoInicio: ['14:00'],

      descansoFin: ['15:00'],

      duracionSlot: [30],
    });


    this.formularioExcepcion = this.fb.group({
      fecha: [''],

      diaCompleto: [false],

      horaInicio: [''],

      horaFin: [''],
    });
  }




//as Disponibilidad indica qu ts confie en que sera un modelo de Disponibilidad, ya que el fomrmulario devuelvve un Partial<any>
  guardarDisponibilidad() {
    const payload = this.formularioDisponibilidad.value as Disponibilidad;

    this.disponibilidadService.guardarDisponibilidad(payload).subscribe({
        next: (respuesta:Disponibilidad) => { 
          console.log('Disponibilidad guardada');
          console.log(respuesta);
          this.mensajeExitoDisponibilidad= 'Disponibilidad guardada correctamente'
             setTimeout(() => {

  this.mensajeExitoDisponibilidad = '';

}, 3000);
        
        },
        error: (error) => {
          console.log(error);
          this.mensajeErrorDisponibilidad = error.error.message;
            this.mensajeErrorDisponibilidad='La disponibilidad no esta bien formada'
          setTimeout(() => {

  this.mensajeErrorDisponibilidad = '';

}, 3000);
        },
      });
  }

  



  toggleHoras() {
    const diaCompleto = this.formularioExcepcion.get('diaCompleto')?.value;

    if (diaCompleto) {
      this.formularioExcepcion.get('horaInicio')?.disable();
      this.formularioExcepcion.get('horaFin')?.disable();
    } else {
      this.formularioExcepcion.get('horaInicio')?.enable();
      this.formularioExcepcion.get('horaFin')?.enable();
    }
  }




agregarExcepcion(){

  const payload =this.formularioExcepcion.getRawValue();
  this.disponibilidadService.crearExcepcion(payload).subscribe({
    next:(respuesta:ExcepcionDisponibilidad)=>{
      console.log('Excepción creada'); 
      this.mensajeExitoExcepcion= 'Excepcion guardada correctamente'
             setTimeout(() => {

  this.mensajeExitoExcepcion = '';

}, 3000);

      this.cargarExcepciones();
      this.formularioExcepcion.reset({
        diaCompleto:false
      });
    },
    error:(error)=>{
      console.log(error);

      this.mensajeErrorExcepcion= error.error?.message || 'La excepción no está bien' 
      setTimeout(() => {

  this.mensajeErrorExcepcion= '';

}, 3000);
}
  });
}
  

eliminarExcepcion(id:number){
  this.disponibilidadService.eliminarExcepcion(id).subscribe({
    next:()=>{
      this.cargarExcepciones();
    },
    error:(error)=>{
      console.log(error);
    }
  });
}

}

//IMPORTS PARA TYPESCRIPT LOGICA
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';//directivas basicas
import { AutenticacionService } from '../../core/services/autenticacionService/autenticacion.service';//servicio para conectarse con el backend
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';//permite navegar a otras paginas
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; //formularios reactivos, crea formularios facilmente y validaciones
import { finalize } from 'rxjs';//operadr RxJS que se ejecuta siempre al finalizar la petición HTTP, desactivar el loading
import { AutenticacionRequest,AutenticacionResponse } from '../../models/autenticacion';
import { BotonComponent } from "../../shared/boton/boton.component";

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BotonComponent,RouterLink], //imports que afectan y se tienen que activar en el HTML
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.css'
})


export class AutenticacionComponent {
  
  carga=false;//loading
  error='';
  formularioAutenticacion:FormGroup;
  
   get email() { return this.formularioAutenticacion.get('email'); }
  get password() { return this.formularioAutenticacion.get('password'); }


  constructor(
    private fb: FormBuilder,
    private autenticacionService: AutenticacionService,
    private router: Router
    //private sanitizer:DomSanitizer
    //private alertService: AlertService
  ) {
   
  
    this.formularioAutenticacion=this.fb.group({
      email:['',[Validators.required, Validators.email]],
        password:['',Validators.required]
      });
    
  }

  

   submit() {
    if (this.formularioAutenticacion.invalid) {
      this.formularioAutenticacion.markAllAsTouched();
      return;
    }

    this.carga = true;
    this.error = '';

    this.autenticacionService.autenticar(this.formularioAutenticacion.value)
      .pipe(finalize(() => (this.carga = false)))
      .subscribe({
        next: () => 
          {

            //this.authService.saveToken(res.token);  // guardar token
            this.router.navigate(['/citasdisponibles'])
          //de alguna forma tengo que redirigi a una pagina o a otra segun si es administrados o usuario
          },

        error: (err:any) => this.error = err?.error?.message || 'Credenciales incorrectas'
      });
  }

  
  
  
}

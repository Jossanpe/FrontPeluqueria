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
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { TenantService } from '../../core/services/tenantService/tenant.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BotonComponent,RouterLink,FooterComponent,HeaderComponent], //imports que afectan y se tienen que activar en el HTML
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.css'
})



export class AutenticacionComponent {
  
  carga=false;//loading
  error='';
  formularioAutenticacion:FormGroup;
  
   get tel() { return this.formularioAutenticacion.get('tel'); }
  get claveSeguridad() { return this.formularioAutenticacion.get('claveSeguridad'); }


  constructor(
    private fb: FormBuilder,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private tenantService: TenantService
    //private sanitizer:DomSanitizer
    //private alertService: AlertService
  ) {
   
  
    this.formularioAutenticacion=this.fb.group({
      tel:['',[Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
        claveSeguridad:['',Validators.required]
      });
    
  }

  

   submit() {
    if (this.formularioAutenticacion.invalid) {
      this.formularioAutenticacion.markAllAsTouched();
      return;
    }

    this.carga = true;
    this.error = '';

    const tenant = this.tenantService.obtenerTenant();

    const loginRequest = {...this.formularioAutenticacion.value, tenant}

    this.autenticacionService.autenticar(loginRequest)
      .pipe(finalize(() => (this.carga = false)))
      .subscribe({
        next: (response:AutenticacionResponse) => 
          {
            //GUARDAR TOKEN
            localStorage.setItem('token', response.token);
          


console.log(
  localStorage.getItem('token')
);
            
            //DECODIFICAR JWT
            const payload:any = jwtDecode(response.token);
            const rol = payload.rol;

            //REDIRECCION
            if(rol==='ADMINISTRADOR'){
              
              this.router.navigate(['/agenda'])
            }else{
              this.router.navigate(['/citas-disponibles']);
            }

          },

        error: (err:any) => this.error = err?.error?.message || 'Credenciales incorrectas'
      });
  }

  
  
  
}

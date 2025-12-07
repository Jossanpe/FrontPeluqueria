import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  MinLengthValidator,
} from '@angular/forms';
import { Router,RouterLink,RouterModule } from '@angular/router';
import { UsuariosService } from '../../core/services/usuariosService/usuarios.service';
import { RegistroUsuarioRequest, Usuario } from '../../models/usuario';
import { HttpErrorResponse } from '@angular/common/http';
import { BotonComponent } from '../../shared/boton/boton.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, BotonComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  /* GETERS para obtener el valor de los campos del formulario, asi podemoso hacer las validaciones y el payload */


  carga = false; 
  serverMessage: string | null = null;
  success = false;
  formularioRegistroUsuario: FormGroup;


    get nombre() {
    return this.formularioRegistroUsuario.get('nombre');
    }
    
  get sexo(){
    return this.formularioRegistroUsuario.get('sexo');
  }
 
  get fechanacimiento(){
    return this.formularioRegistroUsuario.get('fechanacimiento');
  }
 
 get tel() {
   return this.formularioRegistroUsuario.get('tel');
   } 
   
  get cp() {
    return this.formularioRegistroUsuario.get('cp');
  } 
  get direccion() {
    return this.formularioRegistroUsuario.get('direccion');
  }  

    get email() {
      return this.formularioRegistroUsuario.get('email');
    }
    get password() {
      return this.formularioRegistroUsuario.get('password');
    }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) {

    this.formularioRegistroUsuario = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ'-]+)*$/
          ),
        ],
      ],
      sexo:['H'],
      fechanacimiento:[''],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
       cp: ['', [ Validators.pattern(/^[0-5][0-9]{4}$/)]],  
     direccion: [
        '',
        [
          Validators.pattern(
            /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+(?:[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\.,\-\/]*)$/
          ),
        ],
      ], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  
  //metodo asociado al boton para enviar los campos del formulario
  registrarUsuario() {
    this.serverMessage = null;
    if (this.formularioRegistroUsuario.invalid) {
      this.formularioRegistroUsuario.markAllAsTouched();
      return;
    }

    //mapeamos la interfaz modelo
    const payload: RegistroUsuarioRequest = {
      nombre: this.nombre!.value,   
      sexo:this.sexo!.value,
      fechanacimiento:this.fechanacimiento!.value,
      tel: this.tel!.value,
      cp:this.cp!.value,
      direccion:this.direccion!.value,
      email: this.email!.value,
      claveSeguridad: this.password!.value,
    };

    this.carga = true;
   
    this.usuariosService.registro(payload).subscribe({
      next: (res: any) => {
        this.carga = false;
        this.success = true;
        this.serverMessage = res.message ?? 'Cuenta creada correctamente.';
        // Si el backend devuelve token y quieres ir al dashboard:
        if (res.token) {
          // ya guardado por el service, navegamos
          this.router.navigate(['/citasdisponibles']);
        } else {
          // o redirigir al login
          setTimeout(() => this.router.navigate(['/autenticacion']), 1000);
        }
      },
      error: (err: HttpErrorResponse | any) => {
        this.carga = false;
        this.success = false;
        this.serverMessage = err?.message ?? 'Error al crear la cuenta.';
      },
    });
  }



  /* metodo para previsulizar la imagen subida */
  preview: string | ArrayBuffer | null = null;

fotoSeleccionada(event: any) {
  const file: File = event.target.files[0]; // recibimos el evento de donde obtenemos el archivo, event.target es el input que ejecuto el evento, y files[0] es el primer archivo seleccionado

  if (!file) return; //si no hay archivos salimos del metodo y no hacemos nada

  //FileReader: clase que permite leer atchivos del usuario
  const reader = new FileReader();
  reader.readAsDataURL(file); // Lee la imagen como base64. Hace que se lea el archivo como texto codificado en Base64, y pueda ser usado como imagen en HTML

  reader.onload = () => {
    this.preview = reader.result; // Guarda la imagen para mostrarla en el HTML con data binding
  };
}
}
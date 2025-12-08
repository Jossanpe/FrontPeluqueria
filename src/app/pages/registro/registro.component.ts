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

//mantenemos la imagen seleccionada como File para enviarla más tarde

  private imagenSeleccionada:File | null = null;


  preview: string | ArrayBuffer | null = null;

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

      fotoperfil:[null]
    });
  }

  
  //metodo asociado al boton para enviar los campos del formulario
  //Construye FormData con todos los campos y la imagen si existe y la envia al servicio
  registrarUsuario() {
    //evita mult envios
    if(this.carga) return;

    this.serverMessage = null;
    if (this.formularioRegistroUsuario.invalid) {
      this.formularioRegistroUsuario.markAllAsTouched();
      this.serverMessage='Corrige los errores del formulario antes de enviar.';
      return;
    }


    this.carga = true;
    this.serverMessage = '';
    this.success = false;


    //Construimos FormData: permite mezclar campos y archivos, si solo fueran campos podriamos usar el modelo
     const formData = new FormData();
    
     //Añadimos los campos del form uno a uno 
     const value= this.formularioRegistroUsuario.value;

      // Ejemplo: añadir campos de texto.
    // IMPORTANTE: los nombres de campo deben coincidir con lo que espera tu backend.
    formData.append('nombre', value.nombre || '');
    formData.append('sexo', value.sexo || '');
    formData.append('fechanacimiento', value.fechanacimiento || '');
    formData.append('tel', value.tel || '');
    formData.append('cp', value.cp || '');
    formData.append('direccion', value.direccion || '');
    formData.append('email', value.email || '');
    formData.append('password', value.password || '');

    //Si hay imagen seleccionada, la añadimo con la clave 'fotoperfil'
    //(mismo nombre que uses en el backend)
    if(this.imagenSeleccionada){
      formData.append('fotoperfil', this.imagenSeleccionada, this.imagenSeleccionada.name)
    }

    //Llamamos al servicio que hace la petición POST. El servicio devuleve 0.
    
    this.usuariosService.registro(formData).subscribe({
      next: (respuestaServidor: any) => {
        this.carga = false;
        this.success = true;
        this.serverMessage = respuestaServidor.message ?? 'Cuenta creada correctamente.';
       
        // Si el backend devuelve token y quieres ir al dashboard:
        if (respuestaServidor.token) {
          // ya guardado por el service, navegamos
          this.router.navigate(['/citasdisponibles']);
        } else {
          // o redirigir al login
          setTimeout(() => this.router.navigate(['/autenticacion']), 1000);
        }
      },

      //tratamiento de errores
      error: (err: HttpErrorResponse | any) => {
        this.carga = false;
        this.success = false;
        //Mostrar mensaje de error, ajustado a la respuesta real de la API
        this.serverMessage = err?.message ?? 'Error al crear la cuenta.';
      },
    });
  }



   /* metodo para previsulizar la imagen subida */
   /**
    Se dispara al cambiar el input file (change)="fotoSeleccionada($event)"
    Obtenemos la File, guardamos para enviarla y creamos el preview (Data URL).
   */

fotoSeleccionada(event: Event) {
  // recibimos el evento de donde obtenemos el archivo,
  //  event.target es el input que ejecuto el evento, y como puede ser culaquier cosa (div, button, span),
  //le indicamos que es un input (forzamos el tipo), 
  // de esta manera podremos acceder a los metodos que tiene elObjeto Input

  const input = event.target as HTMLInputElement;
  //si no hay archivo, salimos.
  if (!input.files || input.files.length===0){
    this.imagenSeleccionada = null;
    this.preview=null;
    //actualizamos el control fotoperfil para mantener consistencia del FormGroup.
    //patchValue: actualizar solo algunos camapos del formulario, en este caso el campo fotoPerfil
    //a diferencia de setValue que actualizaria todos los campos del formulario(necesitas poner todos los campos, si no da error)
    this.formularioRegistroUsuario.patchValue({fotoperfil:null});
    return; //si no hay archivos salimos del metodo y no hacemos nada
  } 
    

  //Toamos el primer archivo
  const file = input.files[0];
  // Validación básica en el front:
    const accepted = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

       if (!accepted.includes(file.type)) {
      this.serverMessage = 'Tipo de archivo no permitido. Usa PNG/JPEG/WEBP/GIF.';
      this.imagenSeleccionada = null;
      this.preview = null;
      this.formularioRegistroUsuario.patchValue({ fotoperfil: null });
      return;
    }

    if (file.size > maxSize) {
      this.serverMessage = `Archivo demasiado grande. Máximo ${(maxSize / (1024 * 1024)).toFixed(1)} MB.`;
      this.imagenSeleccionada = null;
      this.preview = null;
      this.formularioRegistroUsuario.patchValue({ fotoperfil: null });
      return;
    }

    //Guardamos el File par enviarla despues
    this.imagenSeleccionada=file;

    //Actualizamos el control delFormGroup 
    this.formularioRegistroUsuario.patchValue({forperfil:file});

//CREACION PREVISUALIZCION CON FILEREADER para que el usuario vea la imagen
  //FileReader: clase que permite leer atchivos del usuario
  const reader = new FileReader();
  
  reader.onload = () => {
    this.preview = reader.result; // Guarda la imagen para mostrarla en el HTML con data binding
  };
  reader.readAsDataURL(file); // Lee la imagen como base64. Hace que se lea el archivo como texto codificado en Base64, y pueda ser usado como imagen en HTML
}
}
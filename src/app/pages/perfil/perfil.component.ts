import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavClienteComponent } from '../../shared/nav/nav-cliente/nav-cliente.component';
import { RouterModule } from '@angular/router';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { UsuariosService } from '../../core/services/usuariosService/usuarios.service';

@Component({
  selector: 'app-perfil-admin',
  imports: [
    FooterComponent,
    HeaderComponent,
    NavClienteComponent,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {
    nombre: '',
    fechanacimiento: new Date(),
    tel: '',
    cp: '',
    direccion: '',
    email: '',
  };
  fotoSeleccionada!: File;
previewFoto: string | null = null;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.usuariosService.obtenerPerfil().subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        console.error(error);
        console.error('ERROR COMPLETO:', error);
        console.error('STATUS:', error.status);
        console.error('BODY:', error.error);
      },
    });
  }

  guardar(): void {
    this.usuariosService.actualizarPerfil(this.usuario).subscribe({
      next: () => {
    
      },
      error: (error) => {
        console.error(error);

  
      },
    });
  }

  cambiarPassword(): void {
    console.log('Cambiar contraseña');
  }

seleccionarFoto(event: any): void {

  const archivo = event.target.files[0];

  if (archivo) {

    this.fotoSeleccionada = archivo;

    const reader = new FileReader();

    reader.onload = () => {

      this.previewFoto = reader.result as string;

    };

    reader.readAsDataURL(archivo);

  }
}
}

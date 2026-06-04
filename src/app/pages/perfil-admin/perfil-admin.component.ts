import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavAdminComponent } from '../../shared/nav/nav-admin/nav-admin.component';
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
    NavAdminComponent,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css',
})
export class PerfilAdminComponent implements OnInit {
  usuario: Usuario = {
    nombre: '',
    fechanacimiento: new Date(),
    tel: '',
    cp: '',
    direccion: '',
    email: '',
  };

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
      console.log(archivo);
    }
  }
}

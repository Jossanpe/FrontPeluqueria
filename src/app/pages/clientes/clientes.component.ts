import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from '../../shared/header/header.component';
import { NavAdminComponent } from '../../shared/nav/nav-admin/nav-admin.component';
import { RouterModule } from "@angular/router";
import { UsuariosService } from '../../core/services/usuariosService/usuarios.service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-clientes',
  imports: [FooterComponent, HeaderComponent, NavAdminComponent, RouterModule,FormsModule,CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
  standalone:true
})
export class ClientesComponent implements OnInit {
  
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];

  terminoBusqueda = '';

  constructor(
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {

    this.usuariosService.obtenerClientes()
      .subscribe({
        next: (data) => {
          this.usuarios = data;
          this.usuariosFiltrados = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  filtrarUsuarios(): void {

    const texto = this.terminoBusqueda.toLowerCase();

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre?.toLowerCase().includes(texto) ||
      usuario.email?.toLowerCase().includes(texto) ||
      usuario.tel?.includes(texto)
    );
  }

  editar(usuario: any): void {
   
  }

  eliminar(usuario: any): void {

  
    }
  }
  


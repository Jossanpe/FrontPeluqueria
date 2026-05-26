import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-cliente',

  standalone: true,

  imports: [RouterLink, CommonModule],

  templateUrl: './nav-cliente.component.html',

  styleUrl: './nav-cliente.component.css',
  
})
export class NavClienteComponent {
  
  menuAbierto = false;
  fotoUsuario:string = 'http://localhost:3000/lineafina/uploads/default.jpg';
}

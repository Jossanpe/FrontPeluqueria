import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav-admin',
   imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css'
})
export class NavAdminComponent {
  menuAbierto = false;
  fotoUsuario:string = 'http://localhost:3000/uploads/default.jpg';
}

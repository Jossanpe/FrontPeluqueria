import { Component } from '@angular/core';

import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from '../../shared/header/header.component';
import { NavClienteComponent } from '../../shared/nav/nav-cliente/nav-cliente.component';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-perfil',
  imports: [[FooterComponent, HeaderComponent, NavClienteComponent, RouterModule]],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}


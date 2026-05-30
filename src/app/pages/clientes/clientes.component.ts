import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from '../../shared/header/header.component';
import { NavAdminComponent } from '../../shared/nav/nav-admin/nav-admin.component';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-clientes',
  imports: [FooterComponent, HeaderComponent, NavAdminComponent, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

}

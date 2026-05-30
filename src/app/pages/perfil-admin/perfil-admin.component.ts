import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from '../../shared/header/header.component';
import { NavAdminComponent } from '../../shared/nav/nav-admin/nav-admin.component';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-perfil-admin',
  imports: [FooterComponent, HeaderComponent, NavAdminComponent, RouterModule],
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent {

}

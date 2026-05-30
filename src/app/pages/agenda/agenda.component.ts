import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from '../../shared/header/header.component';
import { NavAdminComponent } from '../../shared/nav/nav-admin/nav-admin.component';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-agenda',
  imports: [FooterComponent, HeaderComponent, NavAdminComponent, RouterModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent {

}



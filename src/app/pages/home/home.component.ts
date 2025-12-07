import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

import { NavComponent } from "../../shared/nav/nav.component";


@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule, HeaderComponent, FooterComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 

}

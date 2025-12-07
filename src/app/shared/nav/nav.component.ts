import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { BotonComponent } from "../boton/boton.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, BotonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}

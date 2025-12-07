import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-boton',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.css'
})
export class BotonComponent {

  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() class: string = '';
  @Input() variant!: 'login' | 'registro';

  /* Input permite que un componente reciba valores desde el HTML.  */
}


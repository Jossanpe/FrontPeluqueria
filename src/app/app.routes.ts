import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AutenticacionComponent } from './pages/autenticacion/autenticacion.component';
import { CitasDisponiblesComponent } from './pages/citas-disponibles/citas-disponibles.component';

export const routes: Routes = [
 
  { path: '', component: HomeComponent, title:'LineaFina' },
  { path: 'horarios', component:HorariosComponent},
  { path: 'citasdisponibles', component:CitasDisponiblesComponent},
  { path: 'registro', component:RegistroComponent},
  { path: 'autenticacion', component:AutenticacionComponent, title:'Inicio Sesion'},
  { path: '**', redirectTo: '', pathMatch:'full' },
  

  ]; 


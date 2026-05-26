import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AutenticacionComponent } from './pages/autenticacion/autenticacion.component';
import { CitasDisponiblesComponent } from './pages/citas-disponibles/citas-disponibles.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { PanelcontrolComponent } from './pages/panelcontrol/panelcontrol.component';
import { PerfilAdminComponent } from './pages/perfil-admin/perfil-admin.component';



export const routes: Routes = [
 
  { path: '', component: HomeComponent, title:'LineaFina' },
  { path: 'registro', component:RegistroComponent, title:'Registro'},
  { path: 'autenticacion', component:AutenticacionComponent, title:'Inicio Sesion'},
   
    { path: 'citas-disponibles', component:CitasDisponiblesComponent, title:'Citas Disponibles'},
   { path: 'reserva', component:ReservaComponent, title:'Reserva'},
   { path: 'perfil', component:PerfilComponent, title:'Perfil Cliente'},


   { path: 'agenda', component:AgendaComponent, title:'Agenda'},
   { path: 'clientes', component:ClientesComponent, title:'Clientes'},
   { path: 'panel-control', component:PanelcontrolComponent, title:'Panel Control'},
   { path: 'perfi-ladmin', component:PerfilAdminComponent, title:'Perfil Admin'},
   
  { path: '**', redirectTo: '', pathMatch:'full' },
  

  ]; 


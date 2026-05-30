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
import { authGuard } from './core/guards/auth.guard.service';

import { adminGuard } from './core/guards/admin.guard.service';


export const routes: Routes = [
 
  { path: '', component: HomeComponent, title:'Home' },
  { path: 'registro', component:RegistroComponent, title:'Registro'},
  { path: 'autenticacion', component:AutenticacionComponent, title:'Inicio Sesion'},
   
    { path: 'citas-disponibles', component:CitasDisponiblesComponent, title:'Citas Disponibles',canActivate:[authGuard]},
   { path: 'reserva', component:ReservaComponent, title:'Reserva',canActivate:[authGuard]},
   { path: 'perfil', component:PerfilComponent, title:'Perfil Cliente',canActivate:[authGuard]},


   { path: 'agenda', component:AgendaComponent, title:'Agenda',canActivate:[authGuard,adminGuard]},
   { path: 'clientes', component:ClientesComponent, title:'Clientes', canActivate:[authGuard,adminGuard] },
   { path: 'panel-control', component:PanelcontrolComponent, title:'Panel Control', canActivate:[authGuard,adminGuard]},
   { path: 'perfil-admin', component:PerfilAdminComponent, title:'Perfil Admin', canActivate:[authGuard,adminGuard]},
   
  { path: '**', redirectTo: '', pathMatch:'full' },
  

  ]; 


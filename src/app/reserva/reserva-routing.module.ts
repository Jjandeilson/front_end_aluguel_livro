import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservaListaComponent } from './reserva-lista/reserva-lista.component';
import { ReservaCadastroComponent } from './reserva-cadastro/reserva-cadastro.component';

const routes: Routes = [
  { path: 'lista', component: ReservaListaComponent},
  { path: 'cadastro', component: ReservaCadastroComponent},
  { path: ':id', component: ReservaCadastroComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReservaRoutingModule {}

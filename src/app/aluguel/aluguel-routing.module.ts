import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AluguelCadastroComponent } from './aluguel-cadastro/aluguel-cadastro.component';
import { AluguelListaComponent } from './aluguel-lista/aluguel-lista.component';

const routes: Routes = [
  { path: 'lista', component: AluguelListaComponent} ,
  { path: 'cadastro', component: AluguelCadastroComponent },
  { path: ':id', component: AluguelCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AluguelRoutingModule {}

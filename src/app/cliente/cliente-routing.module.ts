import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteListarComponent } from './cliente-listar/cliente-listar.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';

const routes: Routes = [
  { path: 'lista', component: ClienteListarComponent},
  { path: 'cadastro', component: ClienteCadastroComponent},
  { path: ':id', component: ClienteCadastroComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClienteRoutingModule {}

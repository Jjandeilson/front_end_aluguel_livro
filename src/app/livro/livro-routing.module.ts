import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LivroListaComponent } from './livro-lista/livro-lista.component';
import { LivroCadastroComponent } from './livro-cadastro/livro-cadastro.component';

const routes: Routes = [
  { path: 'lista', component: LivroListaComponent},
  { path: 'cadastro', component: LivroCadastroComponent},
  { path: ':id', component: LivroCadastroComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LivroRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarraNavegacaoComponent } from './core/barra-navegacao/barra-navegacao.component';

const routes: Routes = [
  { path: 'livros', loadChildren: () => import('./livro/livro.module').then(l => l.LivroModule)},
  { path: 'clientes', loadChildren: () => import('./cliente/cliente.module').then(c => c.ClienteModule)},
  { path: 'alugueis', loadChildren: () => import('./aluguel/aluguel.module').then(a => a.AluguelModule)},
  { path: 'reservas', loadChildren: () => import('./reserva/reserva.module').then(r => r.ReservaModule)},
  { path: '', component: BarraNavegacaoComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

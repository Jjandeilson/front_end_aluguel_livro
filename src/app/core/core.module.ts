import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraNavegacaoComponent } from './barra-navegacao/barra-navegacao.component';

import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    BarraNavegacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    ConfirmDialogModule,
    MenubarModule,
    TabViewModule,
    TableModule
  ],
  providers: [
    MessageService
  ],
  exports: [
    HttpClientModule,
    BarraNavegacaoComponent,
    ConfirmDialogModule,
    TabViewModule,
    TableModule,
  ]
})
export class CoreModule { }

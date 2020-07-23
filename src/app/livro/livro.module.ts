import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LivroListaComponent } from './livro-lista/livro-lista.component';
import { LivroCadastroComponent } from './livro-cadastro/livro-cadastro.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { LivroRoutingModule } from './livro-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LivroService } from './livro.service';
import { MessageService } from 'primeng/api';
import { HandlerService } from '../shared/handler.service';

@NgModule({
  declarations: [
    LivroListaComponent,
    LivroCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    ToastModule,
    TooltipModule,

    SharedModule,
    LivroRoutingModule
  ],
  providers: [
    LivroService,
    MessageService,
    HandlerService
  ]
})
export class LivroModule { }

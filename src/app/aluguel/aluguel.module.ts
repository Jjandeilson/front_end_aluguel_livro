import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AluguelCadastroComponent } from './aluguel-cadastro/aluguel-cadastro.component';
import { AluguelListaComponent } from './aluguel-lista/aluguel-lista.component';

import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { AluguelRoutingModule } from './aluguel-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AluguelService } from './aluguel.service';
import { ClienteService } from '../cliente/cliente.service';
import { LivroService } from '../livro/livro.service';
import { MessageService } from 'primeng/api';
import { HandlerService } from '../shared/handler.service';

@NgModule({
  declarations: [
    AluguelCadastroComponent,
    AluguelListaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,

    FieldsetModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ToastModule,
    TooltipModule,

    AluguelRoutingModule,
    SharedModule
  ],
  providers: [
    AluguelService,
    ClienteService,
    LivroService,
    MessageService,
    HandlerService
  ]
})
export class AluguelModule { }

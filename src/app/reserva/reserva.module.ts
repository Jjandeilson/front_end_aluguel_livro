import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReservaListaComponent } from './reserva-lista/reserva-lista.component';
import { ReservaCadastroComponent } from './reserva-cadastro/reserva-cadastro.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

import { ReservaRoutingModule } from './reserva-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ReservaService } from './reserva.service';
import { ClienteService } from '../cliente/cliente.service';
import { LivroService } from '../livro/livro.service';
import { MessageService } from 'primeng/api';
import { HandlerService } from '../shared/handler.service';

@NgModule({
  declarations: [ReservaListaComponent, ReservaCadastroComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,

    TableModule,
    ButtonModule,
    InputMaskModule,
    FieldsetModule,
    CalendarModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    TooltipModule,

    ReservaRoutingModule,
    SharedModule
  ],
  providers: [
    ReservaService,
    ClienteService,
    LivroService,
    MessageService,
    HandlerService
  ]
})
export class ReservaModule { }

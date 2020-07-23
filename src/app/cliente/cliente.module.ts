import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ClienteListarComponent } from './cliente-listar/cliente-listar.component';

import { ClienteRoutingModule } from './cliente-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ClienteService } from './cliente.service';
import { MessageService } from 'primeng/api';
import { HandlerService } from '../shared/handler.service';


@NgModule({
  declarations: [
    ClienteListarComponent,
    ClienteCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    CalendarModule,
    ToastModule,
    TooltipModule,

    SharedModule,
    ClienteRoutingModule
  ],
  providers: [
    ClienteService,
    HandlerService,
    MessageService
  ]
})
export class ClienteModule { }

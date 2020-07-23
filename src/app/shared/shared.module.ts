import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageComponent } from './message.component';

import { MessageService } from 'primeng/api';
import { HandlerService } from './handler.service';


@NgModule({
  declarations: [
    MessageComponent
  ]
  ,
  imports: [
    CommonModule,
  ], exports: [
    MessageComponent
  ],
  providers: [
    MessageService,
    HandlerService
  ]
})
export class SharedModule { }

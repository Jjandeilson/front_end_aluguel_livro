import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  private msg: string;
  constructor(
    private messageService: MessageService
  ) { }

  error(errorHandler: any) {
    if (errorHandler instanceof HttpErrorResponse) {
      if (errorHandler.error instanceof Array) {
        const erros = errorHandler.error;
        // tslint:disable-next-line: forin
        for (const i in erros) {
          this.msg = erros[i].mensagemUsu;
          this.messageService.add({severity: 'error', summary: this.msg });
        }
      } else {
        this.msg = errorHandler.error.mensagemUsu;
        this.messageService.add({severity: 'error', summary: this.msg });
      }
    }
  }
}

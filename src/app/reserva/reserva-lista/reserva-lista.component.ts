import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ReservaService } from '../reserva.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HandlerService } from 'src/app/shared/handler.service';

@Component({
  selector: 'app-reserva-lista',
  templateUrl: './reserva-lista.component.html',
  styleUrls: ['./reserva-lista.component.css']
})
export class ReservaListaComponent implements OnInit {

  reservas = [];

  constructor(
    private reservaService: ReservaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title,
    private errorHandler: HandlerService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Lista de reservas');
    this.listaDeReservas();
  }

  listaDeReservas() {
    this.reservaService.lista()
      .then(response => this.reservas = response)
      .catch(error => this.errorHandler.error(error));
  }

  confirmaExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir',
      accept: () => this.excluir(id)
    });
  }

  excluir(id: number) {
    this.reservaService.excluir(id)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Revomido com sucesso!'});
        this.listaDeReservas();
      })
      .catch(error => this.errorHandler.error(error));
  }

}

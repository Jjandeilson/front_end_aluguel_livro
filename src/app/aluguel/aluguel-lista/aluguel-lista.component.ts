import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { AluguelService } from '../aluguel.service';
import { MessageService } from 'primeng/api';
import { HandlerService } from 'src/app/shared/handler.service';

@Component({
  selector: 'app-aluguel-lista',
  templateUrl: './aluguel-lista.component.html',
  styleUrls: ['./aluguel-lista.component.css']
})
export class AluguelListaComponent implements OnInit {

  alugueis = [];
  rg: string;

  constructor(
    private aluguelService: AluguelService,
    private title: Title,
    private messageService: MessageService,
    private errorHandler: HandlerService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Lista de aluguel');

    this.listar();
  }

  listar() {
    this.aluguelService.listar()
      .then(alugueis => this.alugueis = alugueis)
      .catch(error => this.errorHandler.error(error));
  }

  pesquisar(form: NgForm) {
    if (this.rg !== '' && this.rg !== undefined) {
      this.aluguelService.buscarAlugueisPorRG(this.rg)
        .then(alugueis => {
          this.alugueis = alugueis;
          form.reset();
          this.rg = '';
        })
        .catch(error => this.errorHandler.error(error));
    }else {
      this.listar();
    }
  }

  finalizarAluguel(id: number) {
    this.aluguelService.devolucao(id)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Aluguel finalizado com sucesso!'});
        this.listar();
      });
  }

}

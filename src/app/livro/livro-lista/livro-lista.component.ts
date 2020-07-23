import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LivroService } from '../livro.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { HandlerService } from 'src/app/shared/handler.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {

  nome: string;
  livros = [];
  @ViewChild('tabela') tabela;

  constructor(
    private livroService: LivroService,
    private messageService: MessageService,
    private title: Title,
    private confirmation: ConfirmationService,
    private errorHandler: HandlerService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Lista de livros');
    this.listar();
  }

  listar() {
    this.livroService.listar()
      .then(livros => this.livros = livros)
      .catch(error => this.errorHandler.error(error));
  }

  remover(id: number) {
    this.livroService.remover(id)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Removido com sucesso!'});
        this.tabela.first = 0;
        this.listar();
      })
      .catch(error => this.errorHandler.error(error));
  }

  pesquisar(form: NgForm) {
    this.livroService.buscarPeloNome(this.nome)
      .then(livros => {
        this.livros = livros;
        form.reset();
        this.nome = '';
      })
      .catch(error => this.errorHandler.error(error));
  }

  confirmaRemocao(id: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja remover?',
      accept: () => this.remover(id)
    });
  }

}

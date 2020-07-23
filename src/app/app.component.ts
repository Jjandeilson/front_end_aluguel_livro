import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AluguelService } from './aluguel/aluguel.service';
import { HandlerService } from './shared/handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  datasAlugados = [new Date(2020, 6, 20), new Date(2020, 6, 21), new Date(2020, 6, 22),
    new Date(2020, 6, 23), new Date(2020, 6, 24)];
  datasDevolvidos = [new Date(2020, 7, 20), new Date(2020, 7, 21), new Date(2020, 7, 22),
      new Date(2020, 7, 23), new Date(2020, 7, 24)];
  alugueis = [];
  devolvidos = [];
  valorDelucao = 0;
  valorAluguel = 0;

  constructor(
    private router: Router,
    private title: Title,
    private aluguelService: AluguelService,
    private errorHandler: HandlerService
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.title.setTitle('Página inicial');
    }

    this.filtroAlugado();
    this.filtroDevolvido();
  }

  get exibirBarra() {
    return Boolean(this.router.url === '/');
  }

  buscarAlugados(event) {
    this.valorAluguel = 0;
    this.aluguelService.pesquisarAludadoSemana(this.datasAlugados[event.index])
      .then(alugados => {
        this.alugueis = alugados;
        alugados.map(a => this.valorAluguel += a.valor);
      })
      .catch(error => this.errorHandler.error(error));
  }

  buscarDevolvidos(event) {
    this.valorDelucao = 0;
    this.aluguelService.pesquisarDevolucaoSemana(this.datasDevolvidos[event.index])
      .then(alugados => {
        this.devolvidos = alugados;
        alugados.map(a => this.valorDelucao += a.valor);
      })
      .catch(error => this.errorHandler.error(Error));
  }

  filtroAlugado() {
    this.aluguelService.pesquisarAludadoSemana(this.datasAlugados[0])
      .then(alugados => {
        this.alugueis = alugados;
        alugados.map(a => this.valorAluguel += a.valor);
      })
      .catch(error => this.errorHandler.error(error));
  }

  filtroDevolvido() {
    this.aluguelService.pesquisarDevolucaoSemana(this.datasDevolvidos[0])
    .then(alugados => {
      this.devolvidos = alugados;
      alugados.map(a => this.valorDelucao += a.valor);
    })
    .catch(error => this.errorHandler.error(Error));
  }
}

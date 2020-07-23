import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Livro } from 'src/app/model/livro';
import { Aluguel } from 'src/app/model/aluguel';

import { ClienteService } from 'src/app/cliente/cliente.service';
import { LivroService } from 'src/app/livro/livro.service';
import { AluguelService } from '../aluguel.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { HandlerService } from 'src/app/shared/handler.service';

@Component({
  selector: 'app-aluguel-cadastro',
  templateUrl: './aluguel-cadastro.component.html',
  styleUrls: ['./aluguel-cadastro.component.css']
})
export class AluguelCadastroComponent implements OnInit {

  dataAtual = new Date();
  exibirMenu = false;
  exibirPainel = false;
  livros = [];
  aluguel = new Aluguel();
  rg = '';
  nomeLivro: string;

  constructor(
    private clienteService: ClienteService,
    private livroService: LivroService,
    private aluguelService: AluguelService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title,
    private route: Router,
    private router: ActivatedRoute,
    private errorHandler: HandlerService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de alguel');
    const idAluguel = this.router.snapshot.params.id;

    if (idAluguel) {
      this.buscarAluguel(idAluguel);
    }

    if (this.editando) {
      this.title.setTitle('Atualizando aluguel');
    }
  }

  buscarCliete(form: NgForm) {
    this.clienteService.buscarPeloRg(this.rg)
      .then(cliente => {
        this.aluguel.cliente = cliente;
        this.exibirMenu = !this.exibirMenu;
        form.reset();
      })
      .catch(error => this.errorHandler.error(error));
  }

  buscarLivros(form: NgForm) {
    this.livroService.buscarPeloNome(this.nomeLivro)
      .then(livros => {
        this.livros = livros;
        form.reset();
        this.exibirPainel = true;
      })
      .catch(error => this.errorHandler.error(error));
  }

  salvar(form: NgForm) {
    console.log(this.aluguel);
    this.aluguelService.salvar(this.aluguel)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Cadastro realizado com sucesso!'});
        this.aluguel = new Aluguel();
        form.reset();
      })
      .catch(error => console.log(error));
  }

  buscarAluguel(id: number) {
    this.aluguelService.buscar(id)
      .then(aluguel => this.aluguel = aluguel)
      .catch(error => this.errorHandler.error(error));
  }

  adicionarLivro(livro: Livro) {
    this.aluguel.livro = livro;
    this.exibirPainel = false;
  }

  atualizarAluguel(form) {
    this.aluguelService.atualizar(this.aluguel)
      .then(aluguel => {
        this.aluguel = aluguel;
        this.messageService.add({severity: 'success', summary: 'Atualização realizada com sucesso!'});
      })
      .catch(error => this.errorHandler.error(error));
  }

  confirmaAcao(form: NgForm) {

    if (this.editando) {
      this.atualizarAluguel(form);
    } else {
      this.salvar(form);
    }

  }

  confirmaCancelamento(form: NgForm) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja cancelar?',
      accept: () => {
        this.cancelar(form);
        this.exibirMenu = false;
      }
    });
  }

  cancelar(form: NgForm) {
    form.reset();
    this.aluguel = new Aluguel();

    if (this.editando) {
      this.route.navigate(['/alugueis/cadastro']);
    }

  }

  get editando() {
    return Boolean(this.router.snapshot.params.id);
  }
}

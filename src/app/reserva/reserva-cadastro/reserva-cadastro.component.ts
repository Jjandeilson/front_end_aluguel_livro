import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Reserva } from 'src/app/model/reserva';
import { Livro } from 'src/app/model/livro';

import { ReservaService } from '../reserva.service';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { LivroService } from 'src/app/livro/livro.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HandlerService } from 'src/app/shared/handler.service';

@Component({
  selector: 'app-reserva-cadastro',
  templateUrl: './reserva-cadastro.component.html',
  styleUrls: ['./reserva-cadastro.component.css']
})
export class ReservaCadastroComponent implements OnInit {

  exibirMenu = false;
  exibirPainel = false;
  dataAtual = new Date();
  livros = [];
  reserva = new Reserva();
  rg = '';
  nomeLivro: string;

  constructor(
    private reservaService: ReservaService,
    private clienteService: ClienteService,
    private livroService: LivroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title,
    private route: Router,
    private router: ActivatedRoute,
    private errorHandler: HandlerService
  ) { }

  ngOnInit(): void {
    const idReserva = this.router.snapshot.params.id;

    if (idReserva) {
      this.buscarReserva(idReserva);
    }

    if (this.editando) {
      this.title.setTitle('Editando reserva');
    } else {
      this.title.setTitle('Cadastro de reserva');
    }
  }

  buscarCliete(form: NgForm) {
    this.clienteService.buscarPeloRg(this.rg)
      .then(cliente => {
        this.reserva.cliente = cliente;
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

  confirmaAcao(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    }else {
      this.salvar(form);
    }
  }

  salvar(form: NgForm) {
    this.reservaService.salvar(this.reserva)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Cadastro realizado com sucesso!'});
        this.reserva = new Reserva();
        form.reset();
      })
      .catch(error => this.errorHandler.error(error));
  }

  buscarReserva(id: number) {
    this.reservaService.buscar(id)
      .then(reserva => this.reserva = reserva)
      .catch(error => this.errorHandler.error(error));
  }

  atualizar(form: NgForm) {
    this.reservaService.atualizar(this.reserva)
      .then(reserva => {
        this.reserva = reserva;
        this.messageService.add({severity: 'success', summary: 'Atualizado com sucesso!' });
      })
      .catch(error => this.errorHandler.error(error));
  }

  adicionarLivro(livro: Livro) {
    this.reserva.livro = livro;
    this.exibirPainel = false;
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
    this.reserva = new Reserva();

    if (this.editando) {
      this.route.navigate(['/reservas/cadastro']);
    }
  }

  get editando() {
    return Boolean(this.router.snapshot.params.id);
  }
}

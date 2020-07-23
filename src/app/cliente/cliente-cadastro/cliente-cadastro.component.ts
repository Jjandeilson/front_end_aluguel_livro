import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Cliente } from 'src/app/model/cliente';

import { MessageService, ConfirmationService } from 'primeng/api';

import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HandlerService } from 'src/app/shared/handler.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

  cliente = new Cliente();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private clienteService: ClienteService,
    private route: Router,
    private router: ActivatedRoute,
    private title: Title,
    private errorHandler: HandlerService
  ) { }

  ngOnInit(): void {
    const idCliente = this.router.snapshot.params.id;

    if (idCliente != null) {
      this.clienteService.buscar(idCliente)
        .then(cliente => this.cliente = cliente);
    }

    if (this.temClienteId) {
      this.title.setTitle('Editando Cliente');
    } else {
      this.title.setTitle('Cadastro de cliente');
    }
  }

  confirmaAcao(form: NgForm) {
    if (this.temClienteId) {
      this.atualizar(form);
    } else {
      this.salvar(form);
    }
  }

  salvar(form: NgForm) {
    this.clienteService.salvar(this.cliente)
      .then(() => {
        form.reset();
        this.cliente = new Cliente();
        this.messageService.add({severity: 'success', summary: 'Cliente salvo com sucesso!'});
      })
      .catch(error => this.errorHandler.error(error));
  }

  atualizar(form: NgForm) {
    this.clienteService.atualizar(this.cliente)
      .then(cliente => {
        this.cliente = cliente;
        this.messageService.add({severity: 'success', summary: 'Atualizado com sucesso'});
      })
      .catch(error => this.errorHandler.error(error));
  }

  confirmaCancelamento(form: NgForm) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja cancelar?',
      accept: () => {
        this.cancelar(form);
      }
    });
  }

  cancelar(form: NgForm) {
    form.reset();
    this.cliente = new Cliente();

    if (this.temClienteId) {
      this.route.navigate(['/clientes/cadastro']);
    }
  }

  get temClienteId() {
    return Boolean(this.router.snapshot?.params.id);
  }

}

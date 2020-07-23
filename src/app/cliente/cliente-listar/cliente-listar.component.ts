import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { ClienteService } from '../cliente.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HandlerService } from 'src/app/shared/handler.service';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.css']
})
export class ClienteListarComponent implements OnInit {

  rg = '';
  clientes = [];
  @ViewChild('tabela') tabela;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title,
    private errorHandler: HandlerService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Lista de clientes');
    this.listarClientes();
  }

  listarClientes() {
    this.clienteService.listar()
      .then(clientes => this.clientes = clientes)
      .catch(error => this.errorHandler.error(error));
  }

  confirmaExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.excluir(id)
    });
  }

  excluir(id: number) {
    this.clienteService.excluir(id)
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Excluir do sucesso!' });
        this.tabela.first = 0;
        this.listarClientes();
      })
      .catch(error => this.errorHandler.error(error));
  }

  pesquisar(form: NgForm) {
    this.clienteService.buscarPeloRg(this.rg)
      .then(cliente => {
          this.clientes = [cliente];
          this.rg = '';
          form.reset();
        })
        .catch(error => this.errorHandler.error(error));
  }
}

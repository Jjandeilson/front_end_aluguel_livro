import { Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { Livro } from 'src/app/model/livro';

import { LivroService } from '../livro.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { HandlerService } from 'src/app/shared/handler.service';

@Component({
  selector: 'app-livro-cadastro',
  templateUrl: './livro-cadastro.component.html',
  styleUrls: ['./livro-cadastro.component.css']
})
export class LivroCadastroComponent implements OnInit {

  livro = new Livro();

  constructor(
    private livroService: LivroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title,
    private route: Router,
    private router: ActivatedRoute,
    private errorHandler: HandlerService
  ) { }

  ngOnInit(): void {
    const livroId = this.router.snapshot.params.id;

    if (livroId != null) {
      this.buscar(livroId);
    }

    if (this.temLivroId) {
      this.title.setTitle('Editando livro');
    } else {
      this.title.setTitle('Cadastro de livro');
    }
  }

  salvar(form: NgForm) {
    this.livroService.salvar(this.livro)
      .then(() => {
        this.livro = new Livro();
        form.reset();
        this.messageService.add({severity: 'success', summary: 'Livro salvo com sucesso!'});
      })
      .catch(error => {
        console.log(error.error instanceof Array);
        this.errorHandler.error(error);
      });
  }

  buscar(id: number) {
    this.livroService.buscar(id)
      .then(livro => this.livro = livro)
      .catch(error => this.errorHandler.error(error));
  }

  atualizar(form: NgForm) {
    this.livroService.atualizar(this.livro)
      .then(livro => {
        this.livro = livro;
        this.messageService.add({severity: 'success', summary: 'Alterado com sucesso!'});
      })
      .catch(error => this.errorHandler.error(error));
  }

  confirmacao(form: NgForm) {
    if (this.temLivroId) {
      this.atualizar(form);
    } else {
      this.salvar(form);
    }
  }

  cancelar(form: NgForm) {
    form.reset();
    this.livro = new Livro();
    if (this.temLivroId) {
      this.route.navigate(['/livros/cadastro']);
    }
  }

  confirmaCancelamento(form: NgForm) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja cancelar?',
      accept: () => this.cancelar(form)
    });
  }

  get temLivroId() {
    return Boolean(this.router.snapshot?.params.id);
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-barra-navegacao',
  templateUrl: './barra-navegacao.component.html',
  styleUrls: ['./barra-navegacao.component.css']
})
export class BarraNavegacaoComponent implements OnInit {

  menu: MenuItem[];

  constructor(
    private router: Router,
    private  title: Title
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.title.setTitle('Página inicial');
    }

    this.menu = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['']
      },
      {separator: true},
      {
        label: 'Livro',
        icon: 'pi pi-folder',
        items: [
          {
            label: 'Cadastro',
            icon: 'pi pi-save',
            routerLink: ['/livros/cadastro']
          },
          {separator: true},
          {
            label: 'Lista',
            icon: 'pi pi-list',
            routerLink: ['/livros/lista']
          }
        ]
      },
      {separator: true},
      {
        label: 'Cliente',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Cadastro',
            icon: 'pi pi-save',
            routerLink: ['/clientes/cadastro']
          },
          {separator: true},
          {
            label: 'Lista',
            icon: 'pi pi-list',
            routerLink: ['/clientes/lista']
          }
        ]
      },
      {separator: true},
      {
        label: 'Aluguel',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'Alugar',
            icon: 'pi pi-sign-out',
            items: [
              {
                label: 'Cadastro',
                icon: 'pi pi-save',
                routerLink: ['/alugueis/cadastro']
              },
              {separator: true},
              {
                label: 'Lista',
                icon: 'pi pi-list',
                routerLink: ['/alugueis/lista']
              }
            ]
          },
          {separator: true},
          {
            label: 'Reserva',
            icon: 'pi pi-sign-out',
            items: [
              {
                label: 'Cadastro',
                icon: 'pi pi-save',
                routerLink: ['/reservas/cadastro']
              },
              {separator: true},
              {
                label: 'Lista',
                icon: 'pi pi-list',
                routerLink: ['/reservas/lista']
              }
            ]
          }
        ]
      }
    ];
  }

}

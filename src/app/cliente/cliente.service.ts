import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cliente } from '../model/cliente';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteUrl = 'http://localhost:8080/clientes';

  constructor(
    private http: HttpClient
  ) { }

  listar(): Promise<Cliente[]> {
    return this.http.get<Cliente[]>(this.clienteUrl).toPromise()
      .then(clientes => clientes);
  }

  buscar(id: number): Promise<Cliente> {
    return this.http.get<Cliente>(`${this.clienteUrl}/${id}`).toPromise()
      .then(cliente => {
        this.converteData(cliente);
        return cliente;
      });
  }

  salvar(cliente: Cliente): Promise<Cliente> {
    return this.http.post<Cliente>(this.clienteUrl, cliente).toPromise()
      .then(() => null);
  }

  excluir(id: number): Promise<void> {
    return this.http.delete<void>(`${this.clienteUrl}/${id}`).toPromise()
      .then(() => null);
  }

  atualizar(cliente: Cliente): Promise<Cliente> {
    return this.http.put<Cliente>(`${this.clienteUrl}/${cliente.id}`, cliente).toPromise()
      .then(response => {
        this.converteData(response);
        return response;
      });
  }

  buscarPeloRg(rg: string): Promise<Cliente> {
    let params = new  HttpParams();

    if (rg){
      params = params.append('rg', rg);
    }

    return this.http.get<Cliente>(`${this.clienteUrl}/buscar`, { params }).toPromise()
        .then(cliente => {
          this.converteData(cliente);
          return cliente;
        });
  }

  private converteData(cliente: Cliente) {
    const mes = moment(cliente.dataNascimento).get('month');
    const dia = moment(cliente.dataNascimento).get('D');
    const ano = moment(cliente.dataNascimento).get('year');
    cliente.dataNascimento = new Date(ano, mes - 1, dia);
  }
}

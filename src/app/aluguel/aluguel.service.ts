import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import * as moment from 'moment';

import { Aluguel } from '../model/aluguel';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {

  private aluguelUrl = 'http://localhost:8080/alugueis';

  constructor(
    private http: HttpClient
  ) { }

  listar(): Promise<Aluguel[]> {
    return this.http.get<Aluguel[]>(this.aluguelUrl).toPromise()
      .then(alugueis => alugueis);
  }

  salvar(aluguel: Aluguel): Promise<Aluguel> {
    return this.http.post<Aluguel>(this.aluguelUrl, aluguel).toPromise()
      .then(() => null);
  }

  buscarAlugueisPorRG(rg: string): Promise<Aluguel[]> {
    let params = new HttpParams();
    params = params.append('rg', rg);
    return this.http.get<Aluguel[]>(`${this.aluguelUrl}/buscar`, { params }).toPromise()
      .then(alugueis => alugueis);
  }

  devolucao(id: number): Promise<void> {
    const alugado = false;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.aluguelUrl}/${id}/devolucao`, alugado, { headers }).toPromise()
      .then(() => null);
  }

  buscar(id: number): Promise<Aluguel> {
    return this.http.get<Aluguel>(`${this.aluguelUrl}/${id}`).toPromise()
      .then(aluguel => {
        this.converteData(aluguel);
        return aluguel;
      });
  }

  atualizar(aluguel: Aluguel): Promise<Aluguel> {
    return this.http.put<Aluguel>(`${this.aluguelUrl}/${aluguel.id}`, aluguel).toPromise()
      .then(response => {
        this.converteData(response);
        return response;
      });
  }

  pesquisarAludadoSemana(data: Date): Promise<Aluguel[]> {
    let params = new HttpParams();
    params = params.append('dataInicio', moment(data).format('YYYY-MM-DD'));
    return this.http.get<Aluguel[]>(`${this.aluguelUrl}/alugado`, {params}).toPromise()
      .then(alugados => alugados);
  }

  pesquisarDevolucaoSemana(data: Date) {
    let params = new HttpParams();
    params = params.append('dataEntrega', moment(data).format('YYYY-MM-DD'));
    return this.http.get<Aluguel[]>(`${this.aluguelUrl}/devolucao`, { params }).toPromise()
      .then(alugados => alugados);
  }

  converteData(aluguel: Aluguel) {
    let dia = moment(aluguel.dataInicio).get('D');
    let mes = moment(aluguel.dataInicio).get('month');
    let ano = moment(aluguel.dataInicio).get('year');
    aluguel.dataInicio = new Date(ano, mes - 1, dia);
    dia = moment(aluguel.dataEntrega).get('D');
    mes = moment(aluguel.dataEntrega).get('month');
    ano = moment(aluguel.dataEntrega).get('year');
    aluguel.dataEntrega = new Date(ano, mes - 1, dia);
    dia = moment(aluguel.cliente.dataNascimento).get('D');
    mes = moment(aluguel.cliente.dataNascimento).get('month');
    ano = moment(aluguel.cliente.dataNascimento).get('year');
    aluguel.cliente.dataNascimento = new Date(ano, mes - 1, dia);
  }
}

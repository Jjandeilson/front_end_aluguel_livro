import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';

import { Reserva } from '../model/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private reservaUrl = 'http://localhost:8080/reservas';

  constructor(
    private http: HttpClient
  ) { }

  lista(): Promise<Reserva[]> {
    return this.http.get<Reserva[]>(this.reservaUrl).toPromise()
      .then(reservas => reservas);
  }

  salvar(reserva: Reserva): Promise<Reserva> {
    return this.http.post<Reserva>(this.reservaUrl, reserva).toPromise()
      .then(() => null);
  }

  buscar(id: number): Promise<Reserva> {
    return this.http.get<Reserva>(`${this.reservaUrl}/${id}`).toPromise()
      .then(reserva => {
        this.converteData(reserva);
        return reserva;
      });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete<void>(`${this.reservaUrl}/${id}`).toPromise()
      .then(() => null);
  }

  atualizar(reserva: Reserva): Promise<Reserva> {
    return this.http.put<Reserva>(`${this.reservaUrl}/${reserva.id}`, reserva).toPromise()
      .then(response => {
        this.converteData(response);
        return response;
      });
  }

  // essa conversão de data foi feita assim para criar um data com o mês correto por ser uma array
  converteData(reserva: Reserva) {
    let dia = moment(reserva.dataReserva).get('D');
    let mes = moment(reserva.dataReserva).get('month');
    let ano = moment(reserva.dataReserva).get('year');
    reserva.dataReserva = new Date(ano, mes - 1, dia);
    dia = moment(reserva.cliente.dataNascimento).get('D');
    mes = moment(reserva.cliente.dataNascimento).get('month');
    ano = moment(reserva.cliente.dataNascimento).get('year');
    reserva.cliente.dataNascimento = new Date(ano, mes - 1, dia);
  }
}

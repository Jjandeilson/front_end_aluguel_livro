import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Livro } from '../model/livro';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private livroUrl = 'http://localhost:8080/livros';

  constructor(
    private http: HttpClient
  ) { }

  listar(): Promise<Livro[]> {
    return this.http.get<Livro[]>(this.livroUrl).toPromise()
      .then(livros => livros);
  }

  salvar(livro: Livro): Promise<Livro> {
    return this.http.post<Livro>(this.livroUrl, livro).toPromise()
      .then(() => null);
  }

  buscar(id: number): Promise<Livro> {
    return this.http.get<Livro>(`${this.livroUrl}/${id}`).toPromise()
      .then(livro => {
        this.converteData(livro);
        return livro;
      });
  }

  remover(id: number): Promise<void> {
    return this.http.delete<void>(`${this.livroUrl}/${id}`).toPromise()
      .then(() => null);
  }

  atualizar(livro: Livro): Promise<Livro> {
    return this.http.put<Livro>(`${this.livroUrl}/${livro.id}`, livro).toPromise()
      .then(response => {
        this.converteData(response);
        return response;
      });
  }

  buscarPeloNome(nome: string): Promise<Livro[]> {
    let params = new HttpParams();
    params = params.append('nome', nome);

    return this.http.get<Livro[]>(`${this.livroUrl}/buscar`, { params }).toPromise()
      .then(livros => livros);
  }

  private converteData(livro: Livro) {
    const dia = moment(livro.dataLancamento).get('D');
    const mes = moment(livro.dataLancamento).get('month');
    const ano = moment(livro.dataLancamento).get('year');
    livro.dataLancamento = new Date(ano, mes - 1, dia);
  }
}

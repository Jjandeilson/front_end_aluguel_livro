import { Cliente } from './cliente';
import { Livro } from './livro';

export class Aluguel {
  id: number;
  dataInicio: Date;
  dataEntrega: Date;
  valor: number;
  alugado = true;
  cliente = new Cliente();
  livro = new Livro();
}

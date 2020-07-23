import { Cliente } from './cliente';
import { Livro } from './livro';

export class Reserva {
  id: number;
  dataReserva: Date;
  cliente = new Cliente();
  livro = new Livro();
}

import { Endereco } from './endereco';

export class Cliente {
  id: number;
  nome: string;
  dataNascimento: Date;
  rg: string;
  endereco = new Endereco();
}

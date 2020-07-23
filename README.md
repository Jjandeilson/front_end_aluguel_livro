# Front-End de aluguel de livro
- Esse frontend foi criado para o desafio de aluguel de livro para interagir com um API Rest desenvolvida.
- Esse projeto é uma SPA(Single-Page-Application) desenvolvida em Angular.

## Estrutuda do projeto

- Utilização do Framework Angular **Link:<https://angular.io/>**.
- Biblioteca de componente PrimeNg **Link:<https://www.primefaces.org/primeng/>**.
- Biblioteca de data MomentJs **Link:<https://momentjs.com/>.
- O projeto é divido em 7 módulos: AppModule(padrão), aluguel, cliente, core, livro, reserva e shared.

## Funcionamento do projeto

- O start do projeto é local tem que ser executado na ide com o comando ng serve e será levantado um serve no endereço http://localhost:4200
- Na página inicial vai encontrar uma barra de navegação na parte superior e no corpo página tabelas com as reservas e alugueis realizadas no período de uma semana **OBS(datas estão estaticas só para mode de exemplificação)**.
- Támbem existe em cada módulo existe arquivos de roteamentos **OBS: exerções core, shared)**, esses arquivos tem o rotemante que cada módulo de fazer para página solicitada. No
app-routing.module.ts no roteamento e implementado o carregamento lazy para melhorar no trafego de dados. Os dados são carregados sob demanda, só quando um determinado módulo é carregado.
- model são classes para tipagem de objetos já que está sendo ultilizado typeScript no desenvolvimento, que mais tarde será transformado em JS.
- classes de servirsos que são as que fazem requisições via protocolo HTTP, para isso se utiliza do módulo do angular HttoClient, nas classes de serviços vai ter todas requisições
para um endereço indicado.
- o serviço handlerService faz o tratamento de error retorna como resposta a alguma requisição não bem-sucedida. Essa mensagem de erro é exibida na tela através de um toasty para o usuário.
- Entre as páginas vai ter contida tabelas, formúlarios com validação(template-driven-form), botões com ações de criar, excluír, editar, pesquisar.

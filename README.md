## Backend - Book API

### Arquitetura

A aplicação está usando a arquitetura **MVC (Model-View-Controller)** adaptada para API REST, também conhecida como **arquitetura em camadas (Layered Architecture).**

[*Designing a REST API with Clean Architecture: A Practical Approach*](https://medium.com/@mariorodrguezgalicia/designing-a-rest-api-with-clean-architecture-a-practical-approach-3552dc5fc34b)

#### Vantagens desta abordagem:

* Separação de responsabilidades - Cada camada tem uma função específica
* Fácil manutenção - Código organizado de forma modular 
* Testes - Cada camada pode ser testada isoladamente
* Escalabilidade - Fácil de adicionar novas features

### Estrutura das Camadas

**1. Routes** (`routes/bookRoutes.ts`)

* Define os endpoints da API
* Mapeia URLs para os controllers

**2. Controllers** (`controllers/bookController.ts`)

* Recebe as requisições HTTP
* Valida as entradas
* Chama os services
* Formata e retorna as respostas (json)

**3. Services** (`services/bookService.ts`)

* Contém a lógica de negócio
* Manipula os dados
* Interage com os models
* Gerencia arquivos (upload/put/delete de imagens)

**4. Models** (`models/Book.ts`)

* Define a estrutura (modelo) dos dados (Sequelize ORM)
* Representa as tabelas do banco de dados

**5. Middleware** (`middleware/*.ts`)

* `upload.ts`: Processa o upload de arquivos (por enquanto apenas a imagem de capa do livro)
* `errorHandler.ts`: Tratamento de erros (*500 - internal server error*)

**6. Config** (`config/*.ts`)

* `database.ts`: Configuração do banco de dados
* `swagger.ts`: Configuração da documentação

**7. Types** (`types/index.ts`)

* Definiçao de tipos para o TypeScript

## Frontend - Livros
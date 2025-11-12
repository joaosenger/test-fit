# Book Management System

Sistema para gerenciamento de livros com Backend *(`Node.js + TypeScript + Express.js`)* e Frontend *(`React.js + TypeScript`)*

## Requisitos

- Docker >= v29.0.0
- docker-compose >= v2.40.3
- Plataforma x86_64 (não testado em Arm)

## Executando 

Crie o arquivo `.env` para o backend conforme exemplo dentro da pasta `book-api`.
Crie o arquivo `.env`para o frontend conforme exemplo dentro da pasta `book-frontend`.

```bash
# Executa todo o sistema (Backend + Frontend + Banco de dados)
docker compose up -d --build

# Acessar aplicações
# Frontend: http://localhost:3000
# API: http://localhost:8000
# Swagger: http://localhost:8000/api-docs
```

## Estrutura do Projeto

```
test-fit/
├── book-api/          # Backend 
├── book-frontend/     # Frontend
└── docker-compose.yml # Orquestração dos containers
```

## Tecnologias

### Backend
- Node.js + TypeScript
- Express.js
- PostgreSQL + Sequelize
- Swagger

### Frontend
- React + TypeScript

## Documentação

- [📘 Documentação da API](./book-api/README.md)
- [🎨 Documentação do Frontend](./book-frontend/README.md)

## Comandos Docker

```bash
# Buildar e subir todos os serviços (BD + Backend + Frontend)
docker compose up -d --build

# Só executar, caso já tenha sido criado
docker compose up -d

# Ver logs
docker compose logs -f

# Parar serviços
docker compose down

# Limpar tudo
docker compose down -v
```

## Executar em modo de Desenvolvimento

### Executar localmente sem Docker

**Backend:**
```bash
cd book-api
npm install
npm run dev:db
```

**Frontend:**
```bash
cd book-frontend
npm install
npm run dev
```

## Variáveis de Ambiente

Copie os arquivos `.env.example` em cada projeto e configure:

```bash
cp book-api/.env.example book-api/.env
cp book-frontend/.env.example book-frontend/.env
```

## Autor

João Senger - [joaoantonio.senger@fit-tecnologia.org.br](mailto:joaoantonio.senger@fit-tecnologia.org.br)

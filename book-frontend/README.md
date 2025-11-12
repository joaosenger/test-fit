# Frontend - Book Management

Frontend para gerenciamento de livros desenvolvida com React e TypeScript.

## Tecnologias

- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- React Icons
- CSS Modules

## Funcionalidades

- Listagem de livros com busca
- Visualização detalhada de livros
- Cadastro de novos livros com upload de imagem
- Edição de livros existentes
- Exclusão de livros com confirmação
- Design responsivo 

## Design

O design foi baseado no Figma com as seguintes especificações:

- **Fonte**: Inter (400, 500, 600, 700)
- **Cor de fundo**: #F0F0F0
- **Cor do texto**: #222222
- **Background dos cards**: Branco (#FFFFFF)
- **Background da capa**: #E0E0E2
- **Tamanhos de fonte**:
  - Títulos: 40px
  - Subtítulos: 20px
  - Botões: 24px

## Como executar

### Desenvolvimento Local

```bash
npm install
npm run dev
# Acesse: http://localhost:3000
```

### Build para Produção

```bash
npm run build
npm run preview
```

### Com Docker

```bash
# Na raiz do projeto
docker-compose up -d frontend
# Acesse: http://localhost:3000
```

## Estrutura do Projeto

```
src/
├── components/               # Componentes reutilizáveis
│   ├── BookCard/             # Card de livro na listagem
│   ├── BookForm/             # Formulário de criar/editar
│   ├── SearchBar/            # Barra de busca
│   ├── Modal/                # Modal de confirmação
│   └── BookPlaceholder.tsx   # Placeholder SVG
├── pages/                    # Páginas da aplicação
│   ├── BookList/             # Página de listagem
│   └── BookDetail/           # Página de detalhes
├── services/                 # Serviços e integrações
│   └── api.ts                # Integração com API
├── types/                    # Tipos TypeScript
│   └── book.ts               # Interface Book
├── styles/                   # Estilos globais
│   └── global.css            # CSS global
├── App.tsx                   # Componente principal com rotas
└── main.tsx                  # Entrada da aplicação
```

## Integração com a API

O frontend se comunica com a API através do Axios. A URL base é configurada via variável de ambiente:

```env
VITE_API_URL=http://localhost:8000
```

### Endpoints utilizados:

- `GET /books` - Listar todos os livros
- `GET /books/:id` - Buscar livro por ID
- `POST /books` - Criar novo livro (multipart/form-data)
- `PUT /books/:id` - Atualizar livro (multipart/form-data)
- `DELETE /books/:id` - Deletar livro

## Scripts disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria build para produção
npm run preview      # Preview do build de produção
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000
```

## Componentes Principais

### BookCard
Card exibido na listagem com imagem, título e descrição do livro.

### BookForm
Formulário modal para criar e editar livros com upload de imagem.

### BookDetail
Página de detalhes com informações completas do livro e opções de editar/excluir.

### Modal
Modal de confirmação customizado para ações (ex: excluir livro).

### SearchBar
Barra de busca que filtra livros por nome ou autor em tempo real.

## Responsividade

Responsividade com os seguintes breakpoints:

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px

## Autor

João Senger - [joaoantonio.senger@fit-tecnologia.org.br](mailto:joaoantonio.senger@fit-tecnologia.org.br)

# Book Registration and Consultation API

This project is a Node.js API built with TypeScript and Express.js for managing a book registration and consultation application. It allows users to register, search, update, and delete books.

## Features

- Register a new book
- Retrieve a list of books
- Fetch details of a specific book
- Update existing book information
- Delete a book from the database

## Project Structure

```
book-api
├── src
│   ├── app.ts                # Main application file
│   ├── server.ts             # Server startup file
│   ├── controllers           # Contains controllers for handling requests
│   │   └── bookController.ts
│   ├── routes                # Contains route definitions
│   │   └── bookRoutes.ts
│   ├── models                # Contains data models
│   │   └── Book.ts
│   ├── services              # Contains business logic
│   │   └── bookService.ts
│   ├── middleware            # Contains middleware functions
│   │   └── errorHandler.ts
│   ├── config                # Configuration files
│   │   └── database.ts
│   └── types                 # Type definitions
│       └── index.ts
├── package.json              # NPM package configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd book-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the database connection in `src/config/database.ts`.

## Running the Application

To start the server, run:
```
npm run start
```

The server will listen on the specified port (default is 3000).

## API Endpoints

- `POST /books` - Register a new book
- `GET /books` - Retrieve all books
- `GET /books/:id` - Retrieve a book by ID
- `PUT /books/:id` - Update a book by ID
- `DELETE /books/:id` - Delete a book by ID

## Error Handling

The application includes middleware for handling errors, ensuring that appropriate responses are sent for any issues encountered during request processing.

## License

This project is licensed under the MIT License.
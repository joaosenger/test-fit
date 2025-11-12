import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler';
import path from 'path';

const app = express();

// CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://3.84.227.131:3000',
    'https://3.84.227.131:3000',
    'http://3.84.227.131',
    'https://3.84.227.131',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API
app.use('/books', bookRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'Book API - Teste FIT',
    version: '1.0.0',
    docs: '/api-docs',
  });
});

// Middleware de tratamento de erros
app.use(errorHandler);

export default app;

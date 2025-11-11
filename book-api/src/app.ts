import express, { Application } from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';
import errorHandler from './middleware/errorHandler';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/books', bookRoutes);

// Error handler
app.use(errorHandler);

export default app;
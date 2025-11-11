import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import path from 'path'

dotenv.config();

const PORT = process.env.PORT || 3000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Books API - Teste FIT',
            version: '1.0.0',
            description: 'API para controle de livros.',
            contact: {
                name: 'API Support',
                email: 'joaoantonio.senger@fit-tecnologia.org.br',
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Servidor de desenvolvimento',
            },
        ],
    },
    apis: [
        path.join(__dirname, '../routes/*.ts'),
        path.join(__dirname, '../routes/*.js'),
        path.join(__dirname, '../controllers/*.ts'),
        path.join(__dirname, '../controllers/*.js'),
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
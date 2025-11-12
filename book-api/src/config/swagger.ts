import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;
const HOST = process.env.API_HOST || 'localhost';
const PROTOCOL = process.env.API_PROTOCOL || 'http';

const servers = [
    {
        url: `http://localhost:${PORT}`,
        description: 'Servidor local (desenvolvimento)',
    },
];

if (HOST !== 'localhost') {
    servers.push({
        url: `${PROTOCOL}://${HOST}:${PORT}`,
        description: 'Servidor de produção',
    });
}

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
        servers: servers,
    },
    apis: process.env.NODE_ENV === 'production' 
        ? ['./dist/routes/*.js', './src/routes/*.ts'] 
        : ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Books API - Teste FIT',
            version: '1.0.0',
            description: 'API para cadastro, consulta e edição de livros',
            contact: {
                name: 'API Support',
                email: 'joaoantonio.senger@fit-tecnologia.org.br',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento',
            },
        ],
        tags: [
            {
                name: 'Books API - Teste FIT',
                description: 'CRUD de Livros usando Node.js, TypeScript e Express.js',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
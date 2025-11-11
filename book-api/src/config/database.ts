import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'bookdb',
    process.env.DB_USER || 'bookuser',
    process.env.DB_PASSWORD || 'bookpass',
    {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
    }
);

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection to PostgreSQL has been established successfully.');
        
        // sincronização dos modelos com o banco de dados
        await sequelize.sync({ alter: true });
        console.log('✅ Database synchronized.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
};

export { sequelize, connectDatabase };
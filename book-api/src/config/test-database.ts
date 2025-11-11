import { Sequelize } from 'sequelize';

export const sequelizeTest = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
});

export const connectTestDatabase = async () => {
    try {
        await sequelizeTest.authenticate();
        await sequelizeTest.sync({ force: true });
        console.log('✅ Test database connected');
    } catch (error) {
        console.error('❌ Unable to connect to test database:', error);
        throw error;
    }
};

export const closeTestDatabase = async () => {
    await sequelizeTest.close();
};
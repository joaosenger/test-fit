import { DataTypes } from 'sequelize';
import { sequelizeTest } from '../../config/test-database';

describe('Book Model', () => {
    let Book: any;

    beforeAll(async () => {
        Book = sequelizeTest.define('Book', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            publicationDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            coverImage: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        });

        await sequelizeTest.sync({ force: true });
    });

    afterAll(async () => {
        await sequelizeTest.close();
    });

    it('should create a book successfully', async () => {
        const bookData = {
            name: 'Test Book',
            author: 'Test Author',
            publicationDate: new Date('2024-01-01'),
            description: 'Test Description',
        };

        const book = await Book.create(bookData);

        expect(book.id).toBeDefined();
        expect(book.name).toBe(bookData.name);
        expect(book.author).toBe(bookData.author);
        expect(book.description).toBe(bookData.description);
    });

    it('should not create a book without required fields', async () => {
        try {
            await Book.create({
                name: 'Test Book',
            });
        } catch (error: any) {
            expect(error.name).toBe('SequelizeValidationError');
        }
    });
});
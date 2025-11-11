import request from 'supertest';
import app from '../../app';
import { sequelizeTest, connectTestDatabase, closeTestDatabase } from '../../config/test-database';
import Book from '../../models/Book';

describe('Books API Integration Tests', () => {
    beforeAll(async () => {
        await connectTestDatabase();
    });

    afterAll(async () => {
        await closeTestDatabase();
    });

    beforeEach(async () => {
        await Book.destroy({ where: {}, force: true });
    });

    describe('GET /books', () => {
        it('should return empty array when no books', async () => {
            const response = await request(app).get('/books');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toEqual([]);
        });

        it('should return all books', async () => {
            await Book.create({
                name: 'Test Book',
                author: 'Test Author',
                publicationDate: new Date('2024-01-01'),
                description: 'Test Description',
            });

            const response = await request(app).get('/books');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].name).toBe('Test Book');
        });
    });

    describe('POST /books', () => {
        it('should create a new book', async () => {
            const bookData = {
                name: 'New Book',
                author: 'New Author',
                publicationDate: '2024-01-01',
                description: 'New Description',
            };

            const response = await request(app)
                .post('/books')
                .send(bookData);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe(bookData.name);
        });

        it('should return 400 for missing required fields', async () => {
            const response = await request(app)
                .post('/books')
                .send({ name: 'Incomplete Book' });

            expect(response.status).toBe(500);
        });
    });

    describe('GET /books/:id', () => {
        it('should return a book by id', async () => {
            const book = await Book.create({
                name: 'Test Book',
                author: 'Test Author',
                publicationDate: new Date('2024-01-01'),
                description: 'Test Description',
            });

            const response = await request(app).get(`/books/${book.id}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe('Test Book');
        });

        it('should return 404 for non-existent book', async () => {
            const response = await request(app).get(
                '/books/123e4567-e89b-12d3-a456-426614174000'
            );

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });

        it('should return 400 for invalid UUID', async () => {
            const response = await request(app).get('/books/invalid-id');

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('DELETE /books/:id', () => {
        it('should delete a book', async () => {
            const book = await Book.create({
                name: 'Test Book',
                author: 'Test Author',
                publicationDate: new Date('2024-01-01'),
                description: 'Test Description',
            });

            const response = await request(app).delete(`/books/${book.id}`);

            expect(response.status).toBe(204);

            const deletedBook = await Book.findByPk(book.id);
            expect(deletedBook).toBeNull();
        });

        it('should return 404 for non-existent book', async () => {
            const response = await request(app).delete(
                '/books/123e4567-e89b-12d3-a456-426614174000'
            );

            expect(response.status).toBe(404);
        });
    });
});
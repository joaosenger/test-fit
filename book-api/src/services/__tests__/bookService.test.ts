import { BookService } from '../bookService';
import Book from '../../models/Book';

jest.mock('../../models/Book');

describe('BookService', () => {
    let bookService: BookService;

    beforeEach(() => {
        bookService = new BookService();
        jest.clearAllMocks();
    });

    describe('findAllBooks', () => {
        it('should return all books', async () => {
            const mockBooks = [
                {
                    id: '123',
                    name: 'Book 1',
                    author: 'Author 1',
                    publicationDate: '2024-01-01',
                    description: 'Description 1',
                },
            ];

            (Book.findAll as jest.Mock).mockResolvedValue(mockBooks);

            const books = await bookService.findAllBooks();

            expect(books).toEqual(mockBooks);
            expect(Book.findAll).toHaveBeenCalledWith({
                order: [['createdAt', 'DESC']],
            });
        });
    });

    describe('findBookById', () => {
        it('should return a book by id', async () => {
            const mockBook = {
                id: '123e4567-e89b-12d3-a456-426614174000',
                name: 'Test Book',
                author: 'Test Author',
            };

            (Book.findByPk as jest.Mock).mockResolvedValue(mockBook);

            const book = await bookService.findBookById(mockBook.id);

            expect(book).toEqual(mockBook);
            expect(Book.findByPk).toHaveBeenCalledWith(mockBook.id);
        });

        it('should return null for invalid UUID', async () => {
            const book = await bookService.findBookById('invalid-id');
            expect(book).toBeNull();
        });
    });

    describe('addBook', () => {
        it('should create a new book', async () => {
            const bookData = {
                name: 'New Book',
                author: 'New Author',
                publicationDate: '2024-01-01',
                description: 'New Description',
            };

            const mockBook = { id: '123', ...bookData };

            (Book.create as jest.Mock).mockResolvedValue(mockBook);

            const book = await bookService.addBook(bookData);

            expect(book).toEqual(mockBook);
            expect(Book.create).toHaveBeenCalledWith({
                ...bookData,
                coverImage: undefined,
            });
        });
    });

    describe('removeBook', () => {
        it('should delete a book successfully', async () => {
            const mockBook = {
                id: '123e4567-e89b-12d3-a456-426614174000',
                coverImage: null,
                destroy: jest.fn(),
            };

            (Book.findByPk as jest.Mock).mockResolvedValue(mockBook);

            const result = await bookService.removeBook(mockBook.id);

            expect(result).toBe(true);
            expect(mockBook.destroy).toHaveBeenCalled();
        });

        it('should return false for non-existent book', async () => {
            (Book.findByPk as jest.Mock).mockResolvedValue(null);

            const result = await bookService.removeBook('123e4567-e89b-12d3-a456-426614174000');

            expect(result).toBe(false);
        });
    });
});
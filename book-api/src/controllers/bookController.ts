import { Request, Response } from 'express';
import { BookService } from '../services/bookService';
import { isValidUUID } from '../utils/validators';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    // POST -> /books
    public createBook = async (req: Request, res: Response) => {
        try {
            const bookData = req.body;
            const file = req.file;
            
            const book = await this.bookService.addBook(bookData, file);
            res.status(201).json({ success: true, data: book });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error creating book', 
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // GET -> /books
    public getBooks = async (req: Request, res: Response) => {
        try {
            const books = await this.bookService.findAllBooks();
            res.status(200).json({ success: true, data: books });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error retrieving books', 
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // GET -> /books/{id}
    public getBookById = async (req: Request, res: Response) => {
        try {
            const bookId = req.params.id;

            if (!isValidUUID(bookId)) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Invalid book ID format. Must be a valid UUID.' 
                });
            }
            
            const book = await this.bookService.findBookById(bookId);
            
            if (book) {
                res.status(200).json({ success: true, data: book });
            } else {
                res.status(404).json({ 
                    success: false,
                    message: 'Book not found' 
                });
            }
        } catch (error) {
            console.error('Error retrieving book:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error retrieving book', 
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // PUT -> /books/{id}
    public updateBook = async (req: Request, res: Response) => {
        try {
            const bookId = req.params.id;
            const updatedData = req.body;
            const file = req.file;

            if (!isValidUUID(bookId)) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Invalid book ID format. Must be a valid UUID.' 
                });
            }
            
            const book = await this.bookService.modifyBook(bookId, updatedData, file);
            
            if (book) {
                res.status(200).json({ success: true, data: book });
            } else {
                res.status(404).json({ 
                    success: false,
                    message: 'Book not found' 
                });
            }
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error updating book', 
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // DELETE -> /books/{id}
    public deleteBook = async (req: Request, res: Response) => {
        try {
            const bookId = req.params.id;

            if (!isValidUUID(bookId)) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Invalid book ID format. Must be a valid UUID.' 
                });
            }
            
            const result = await this.bookService.removeBook(bookId);
            
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ 
                    success: false,
                    message: 'Book not found' 
                });
            }
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error deleting book', 
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}
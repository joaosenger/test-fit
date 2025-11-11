import Book from '../models/Book';
import fs from 'fs';
import path from 'path';
import { isValidUUID } from '../utils/validators';

export class BookService {
    // POST /books
    public async addBook(bookData: any, file?: Express.Multer.File): Promise<Book> {
        const coverImage = file ? `/uploads/${file.filename}` : undefined;
        
        const book = await Book.create({
            ...bookData,
            coverImage,
        });
        
        return book;
    }

    // GET /books
    public async findAllBooks(): Promise<Book[]> {
        return await Book.findAll({
            order: [['createdAt', 'DESC']],
        });
    }

    // GET /books/{id}
    public async findBookById(id: string): Promise<Book | null> {
        if (!isValidUUID(id)) {
            return null;
        }
        
        return await Book.findByPk(id);
    }

    // PUT /books/{id}
    public async modifyBook(id: string, updatedData: any, file?: Express.Multer.File): Promise<Book | null> {
        if (!isValidUUID(id)) {
            return null;
        }
        
        const book = await Book.findByPk(id);
        
        if (!book) {
            return null;
        }

        if (file && book.coverImage) {
            const oldImagePath = path.join(process.cwd(), book.coverImage);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const coverImage = file ? `/uploads/${file.filename}` : book.coverImage;

        await book.update({
            ...updatedData,
            coverImage,
        });

        return book;
    }

    // DELETE /books/{id}
    public async removeBook(id: string): Promise<boolean> {
        if (!isValidUUID(id)) {
            return false;
        }
        
        const book = await Book.findByPk(id);
        
        if (!book) {
            return false;
        }

        if (book.coverImage) {
            const imagePath = path.join(process.cwd(), book.coverImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await book.destroy();
        return true;
    }
}
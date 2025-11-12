import axios from 'axios';
import type { Book, CreateBookDTO, UpdateBookDTO } from '../types/book';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export const bookService = {

  getAll: async (): Promise<Book[]> => {
    const response = await api.get('/books');
    return response.data.data;
  },

  getById: async (id: string): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data.data;
  },

  create: async (data: CreateBookDTO): Promise<Book> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('author', data.author);
    formData.append('publicationDate', data.publicationDate);
    formData.append('description', data.description);
    
    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }

    const response = await api.post('/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  update: async (id: string, data: UpdateBookDTO): Promise<Book> => {
    const formData = new FormData();
    
    if (data.name) formData.append('name', data.name);
    if (data.author) formData.append('author', data.author);
    if (data.publicationDate) formData.append('publicationDate', data.publicationDate);
    if (data.description) formData.append('description', data.description);
    if (data.coverImage) formData.append('coverImage', data.coverImage);

    const response = await api.put(`/books/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};

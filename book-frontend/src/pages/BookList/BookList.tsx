import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../types/book';
import { bookService } from '../../services/api';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { BookCard } from '../../components/BookCard/BookCard';
import './BookList.css';

export const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await bookService.getAll();
      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = books.filter(book =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleBookClick = (id: string) => {
    navigate(`/books/${id}`);
  };

  const handleNewBook = () => {
    navigate('/books/new');
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="book-list-page">
      <div className="book-list-container">
        <div className="book-list-header">
          <h1 className="page-title">Livros</h1>
          <button className="btn-new" onClick={handleNewBook}>
            Novo
          </button>
        </div>

        <div className="book-list-search-container">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => handleBookClick(book.id)}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="no-books">
            <p>Nenhum livro encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

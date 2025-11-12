import { useState } from 'react';
import type { Book } from '../../types/book';
import { BookPlaceholder } from '../BookPlaceholder';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export const BookCard = ({ book, onClick }: BookCardProps) => {
  const [imageError, setImageError] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const hasImage = book.coverImage && !imageError;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-card-image-container">
        {hasImage ? (
          <img 
            src={`${apiUrl}${book.coverImage}`}
            alt={book.name}
            className="book-card-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <BookPlaceholder />
        )}
      </div>
      <div className="book-card-content">
        <h3 className="book-card-title">{book.name}</h3>
        <p className="book-card-description">
          {truncateText(book.description, 150)}
        </p>
      </div>
    </div>
  );
};

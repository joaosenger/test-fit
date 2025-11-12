import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import type { Book } from '../../types/book';
import { bookService } from '../../services/api';
import { BookPlaceholder } from '../../components/BookPlaceholder';
import { Modal } from '../../components/Modal/Modal';
import './BookDetail.css';

export const BookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadBook(id);
    }
  }, [id]);

  const loadBook = async (bookId: string) => {
    try {
      const data = await bookService.getById(bookId);
      setBook(data);
    } catch (error) {
      console.error('Erro ao carregar livro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/books/${id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!id) return;

    try {
      await bookService.delete(id);
      navigate('/');
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      alert('Erro ao deletar livro');
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!book) {
    return <div className="loading">Livro não encontrado</div>;
  }

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const hasImage = book.coverImage && !imageError;

  const formatDate = (dateString: string) => {
    // Adiciona o timezone local para evitar problema de UTC
    const [year, month, day] = dateString.split('T')[0].split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="book-detail-page">
      <div className="book-detail-container">
        <div className="book-detail-header">
          <button className="btn-back" onClick={handleBack}>
            <FiArrowLeft /> Voltar
          </button>
          <div className="header-actions">
            <button className="btn-edit" onClick={handleEdit}>
              Editar
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              Excluir
            </button>
          </div>
        </div>

        <div className="book-detail-content">
          <div className="book-detail-info">
            <h1 className="book-detail-title">{book.name}</h1>
            <p className="book-detail-author">Por {book.author}</p>
            <p className="book-detail-date">
              Publicado em {formatDate(book.publicationDate)}
            </p>
            <p className="book-detail-description">{book.description}</p>
          </div>

          <div className="book-detail-image-container">
            {hasImage ? (
              <img 
                src={`${apiUrl}${book.coverImage}`}
                alt={book.name}
                className="book-detail-image"
                onError={() => setImageError(true)}
              />
            ) : (
              <BookPlaceholder />
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        title="Tem certeza?"
        message="Ao excluir este livro não será possível recuperá-lo. Realmente deseja excluí-lo?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Excluir"
        cancelText="Cancelar"
      />
    </div>
  );
};

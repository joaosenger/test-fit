import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CreateBookDTO } from '../../types/book';
import { bookService } from '../../services/api';
import { BookPlaceholder } from '../BookPlaceholder';
import './BookForm.css';

export const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = id && id !== 'new';

  const [formData, setFormData] = useState({
    name: '',
    author: '',
    publicationDate: '',
    description: '',
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id && id !== 'new') {
      loadBook(id);
    }
  }, [id, isEdit]);

  const loadBook = async (bookId: string) => {
    try {
      const book = await bookService.getById(bookId);
      setFormData({
        name: book.name,
        author: book.author,
        publicationDate: book.publicationDate.split('T')[0],
        description: book.description,
      });
      
      if (book.coverImage) {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        setImagePreview(`${apiUrl}${book.coverImage}`);
      }
    } catch (error) {
      console.error('Erro ao carregar livro:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookData: CreateBookDTO = {
        ...formData,
        coverImage: coverImage || undefined,
      };

      if (isEdit && id) {
        await bookService.update(id, bookData);
      } else {
        await bookService.create(bookData);
      }

      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
      alert('Erro ao salvar livro');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(isEdit ? `/books/${id}` : '/');
  };

  return (
    <div className="book-form-overlay">
      <div className="book-form-modal">
        <h2 className="book-form-title">
          {isEdit ? 'Editar livro' : 'Novo livro'}
        </h2>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-grid">
            <div className="form-fields">
              <input
                type="text"
                name="name"
                placeholder="A revolução dos bichos: Um conto de fadas"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />

              <input
                type="text"
                name="author"
                placeholder="George Orwell"
                value={formData.author}
                onChange={handleChange}
                className="form-input"
                required
              />

              <input
                type="date"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleChange}
                className="form-input"
                required
              />

              <textarea
                name="description"
                placeholder="Descrição do livro..."
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                rows={8}
                required
              />
            </div>

            <div className="form-image-section">
              <div className="image-upload-container">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="image-preview"
                  />
                ) : (
                  <BookPlaceholder />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                id="cover-upload"
              />
              <label htmlFor="cover-upload" className="file-input-label">
                {imagePreview ? 'Alterar imagem' : 'Selecionar imagem'}
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-save"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookList } from './pages/BookList/BookList';
import { BookDetail } from './pages/BookDetail/BookDetail';
import { BookForm } from './components/BookForm/BookForm';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/books/:id/edit" element={<BookForm />} />
      </Routes>
    </Router>
  );
}

export default App

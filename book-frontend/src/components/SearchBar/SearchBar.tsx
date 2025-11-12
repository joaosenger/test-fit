import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
      <FiSearch className="search-icon" />
    </div>
  );
};

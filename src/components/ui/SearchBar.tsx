import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Buscar aeropuertos..." 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button 
        type="submit"
        className="ml-2 px-6 py-2 bg-blue-600 rounded-full flex items-center hover:bg-blue-500 transition-colors"
      >
        <SearchIcon />
        <span>Buscar</span>
      </button>
    </form>
  );
};

export default SearchBar;
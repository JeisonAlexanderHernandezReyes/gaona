import { FormEvent } from "react";
import { Search as SearchIcon } from "@mui/icons-material";

interface SearchFormProps {
  searchTerm: string;
  placeholder: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  placeholder,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <form onSubmit={onSearchSubmit} className="flex-grow max-w-3xl flex items-center gap-3">
      <div className="flex-grow">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full px-6 py-3 rounded-full bg-white text-black focus:outline-none"
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
        />
      </div>
      <button
        type="submit"
        className="rounded-full py-3 px-6 flex items-center justify-center text-white shadow-lg transition-all duration-300 transform hover:scale-105"
        style={{ 
          background: 'linear-gradient(90deg, #0066CC 0%, #00CCAA 100%)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)'
        }}
      >
        <SearchIcon fontSize="small" sx={{ mr: 1 }} />
        <span>Buscar</span>
      </button>
    </form>
  );
};

export default SearchForm;
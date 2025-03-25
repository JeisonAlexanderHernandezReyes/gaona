'use client';

import { useState } from 'react';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
      <div className="relative flex items-center w-full max-w-2xl">
        <input
          type="text"
          placeholder="Buscar aeropuertos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
        />
        <button
          onClick={() => console.log(searchTerm)}
          className="absolute right-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full hover:opacity-90 transition-opacity"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};
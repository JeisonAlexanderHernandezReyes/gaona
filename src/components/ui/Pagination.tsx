import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Display 3 page numbers when possible
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);
    
    // Adjust if we're near the end
    if (endPage - startPage < 2) {
      startPage = Math.max(1, endPage - 2);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 mx-1 flex items-center justify-center rounded-md ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-blue-800 text-white hover:bg-blue-700'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md mr-2 ${
          currentPage === 1
            ? 'bg-blue-800 text-gray-400 cursor-not-allowed'
            : 'bg-blue-800 text-white hover:bg-blue-700'
        }`}
      >
        Anterior
      </button>
      
      <div className="flex">{renderPageNumbers()}</div>
      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ml-2 ${
          currentPage === totalPages
            ? 'bg-blue-800 text-gray-400 cursor-not-allowed'
            : 'bg-blue-800 text-white hover:bg-blue-700'
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CircularProgress from '@mui/material/CircularProgress';
import { Airport } from '@/types';
import AirportDetailsModal from './AirportDetailsModal';
import { ApiAirport, useAirportStore } from '@/store/useFlightStore';

const SkyConnectExplorer = () => {
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Global state from Zustand
  const { airports, loading, error, fetchAirports } = useAirportStore();

  // Fallback data in case the API fails
  const fallbackAirports: Airport[] = [
    {
      id: '1',
      name: 'Aeropuerto Internacional El Dorado',
      city: 'Bogotá',
      country: 'Colombia',
      code: 'BOG',
    },
    {
      id: '2',
      name: 'Aeropuerto Internacional Jorge Chávez',
      city: 'Lima',
      country: 'Perú',
      code: 'LIM',
    },
    {
      id: '3',
      name: 'Aeropuerto Internacional de la Ciudad de México',
      city: 'Ciudad de México',
      country: 'México',
      code: 'MEX',
    },
    {
      id: '4',
      name: 'Aeropuerto Internacional Ministro Pistarini',
      city: 'Buenos Aires',
      country: 'Argentina',
      code: 'EZE',
    },
    {
      id: '5',
      name: 'Aeropuerto Internacional de São Paulo-Guarulhos',
      city: 'São Paulo',
      country: 'Brasil',
      code: 'GRU',
    },
  ];

  // Map API response to our Airport type
  const mapAirportsData = useCallback((apiAirports: ApiAirport[]): Airport[] => {
    return apiAirports.map(apiAirport => ({
      id: apiAirport.iata_code || Math.random().toString(),
      name: apiAirport.airport_name || 'Unknown Airport',
      city: apiAirport.city || 'Unknown City',
      country: apiAirport.country || 'Unknown Country',
      code: apiAirport.iata_code || '???'
    }));
  }, []);

  // Fetch airports on component mount
  useEffect(() => {
    fetchAirports();
  }, [fetchAirports]);

  // Get airports data, either from API or fallback
  const getAirportsData = useCallback((): Airport[] => {
    if (airports && airports.length > 0) {
      return mapAirportsData(airports);
    }
    
    if (error) {
      console.warn('Using fallback airport data due to API error:', error);
      return fallbackAirports;
    }
    
    return [];
  }, [airports, error, fallbackAirports, mapAirportsData]);

  // Filter airports based on search term
  const filteredAirports = getAirportsData().filter(airport => 
    airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredAirports.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAirports = filteredAirports.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  const handleSearchSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };
  
  const handleAirportClick = (airport: React.SetStateAction<Airport | null>) => {
    setSelectedAirport(airport);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Airport card component
  const AirportCard = ({ airport }: { airport: Airport }) => (
    <div 
      className="bg-gray-800 rounded-lg p-4 relative overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-700"
      onClick={() => handleAirportClick(airport)}
    >
      <div className="flex justify-between">
        <div className="overflow-hidden">
          <h3 className="text-xl font-bold truncate">{airport.name}</h3>
          <p className="text-gray-400 truncate">{airport.city}, {airport.country}</p>
          <div className="mt-4">
            <span className="text-4xl font-bold text-blue-400">{airport.code}</span>
          </div>
        </div>
        <div className="flex items-center ml-2">
          <div className="bg-blue-500 p-3 rounded-full text-white flex-shrink-0">
            <FlightTakeoffIcon />
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
        <div className="text-8xl text-gray-500">✈</div>
      </div>
    </div>
  );

  // Pagination component with improved page number display
const Pagination = () => {
    // No pagination needed if we have 0 or 1 page
    if (totalPages <= 1) return null;
    
    const pageNumbers = [];
    
    // Logic for displaying page numbers
    if (totalPages <= 5) {
      // If we have 5 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }
    
    return (
      <div className="flex flex-wrap justify-center mt-6">
        <button 
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2 mb-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        
        <div className="flex items-center mx-2 mb-2 flex-wrap justify-center">
          {pageNumbers.map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 mx-1 mb-1 flex items-center justify-center rounded-md ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="mx-1 mb-1">...</span>
            )
          ))}
        </div>
        
        <button 
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-md ml-2 mb-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header with search in a single row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl text-blue-400 font-bold whitespace-nowrap">
          SkyConnect Explorer
        </h1>
        
        <form onSubmit={handleSearchSubmit} className="flex-grow max-w-3xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar aeropuertos..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-6 py-3 rounded-full bg-white text-black focus:outline-none pr-16"
            />
            <button 
              type="submit"
              className="absolute right-0 top-0 h-full px-6 rounded-r-full bg-blue-600 flex items-center justify-center"
            >
              <SearchIcon />
              <span className="ml-1 hidden sm:inline">Buscar</span>
            </button>
          </div>
        </form>
      </div>
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center my-8">
          <CircularProgress color="inherit" />
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-900/20 p-4 rounded-lg mb-6 text-center">
          <p className="text-red-300">{error}</p>
        </div>
      )}
      
      {/* Airport grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentAirports.map(airport => (
            <AirportCard key={airport.id} airport={airport} />
          ))}
        </div>
      )}
      
      {/* No results message */}
      {!loading && filteredAirports.length === 0 && (
        <div className="text-center py-10">
          <h6 className="text-xl">No se encontraron aeropuertos con su búsqueda.</h6>
        </div>
      )}
      
      {/* Pagination */}
      {!loading && <Pagination />}
      
      {/* Airport Details Modal */}
      <AirportDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        airport={selectedAirport}
      />
    </div>
  );
};

export default SkyConnectExplorer;
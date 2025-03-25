import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '../ui/Pagination';
import AirportCard from './AirportCard';
import { Airport } from '@/types';

const AirportExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Mock data for the airports
  const airports: Airport[] = [
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredAirports = airports.filter(airport => 
    airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const airportsPerPage = 5;
  const indexOfLastAirport = currentPage * airportsPerPage;
  const indexOfFirstAirport = indexOfLastAirport - airportsPerPage;
  const currentAirports = filteredAirports.slice(indexOfFirstAirport, indexOfLastAirport);
  
  return (
    <div className="min-h-screen bg-navy-900 text-white p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-400">SkyConnect Explorer</h1>
      </header>
      
      <div className="flex justify-between mb-8">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Buscar aeropuertos..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-full bg-white text-black focus:outline-none"
          />
        </div>
        <button className="ml-2 px-6 py-2 bg-blue-600 rounded-full flex items-center">
          <SearchIcon />
          <span>Buscar</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentAirports.map(airport => (
          <AirportCard key={airport.id} airport={airport} />
        ))}
      </div>
      
      {filteredAirports.length > airportsPerPage && (
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(filteredAirports.length / airportsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AirportExplorer;
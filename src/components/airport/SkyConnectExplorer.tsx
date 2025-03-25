"use client";

import React, { useState, useEffect, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CircularProgress from '@mui/material/CircularProgress';
import { Airport } from '@/types';
import AirportDetailsModal from './AirportDetailsModal';
import { useAirportStore } from '@/store/useFlightStore';

const SkyConnectExplorer = () => {
    // Local state
    const [searchTerm, setSearchTerm] = useState('');
    const [searchApplied, setSearchApplied] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Global state from Zustand
    const { airports, loading, error, fetchAirports } = useAirportStore();

    // Map API airports to our Airport interface
    const mapAirportsData = useCallback((apiAirports: Airport[]): Airport[] => {
        return apiAirports;
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
        }

        return [];
    }, [airports, error, mapAirportsData]);

    const filteredAirports = getAirportsData().filter(airport => {
        if (!searchApplied) return true;
    
        const searchTermLower = searchApplied.toLowerCase();
        return airport.airport_name.toLowerCase().includes(searchTermLower) ||
            airport.city_iata_code.toLowerCase().includes(searchTermLower) ||
            airport.country_name.toLowerCase().includes(searchTermLower) ||
            airport.iata_code.toLowerCase().includes(searchTermLower);
    });    

    // Fixed number of items per page (2 columns × 3 rows = 6 items)
    const itemsPerPage = 6;
    
    const totalPages = Math.ceil(filteredAirports.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAirports = filteredAirports.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchApplied(searchTerm);
        setCurrentPage(1); // Reset to first page when applying search
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleAirportClick = (airport: Airport) => {
        setSelectedAirport(airport);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Airport card component - redesigned to be narrower and prevent overflow
    const AirportCard = ({ airport }: { airport: Airport }) => (
        <div
            className="bg-gray-800 rounded-xl p-4 relative overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700 border border-gray-700 h-full flex flex-col hover:scale-[1.02] hover:border-blue-500"
            onClick={() => handleAirportClick(airport)}
        >
            <div className="absolute top-3 right-3">
                <div className="bg-blue-600 p-2 rounded-full text-white flex-shrink-0">
                    <FlightTakeoffIcon />
                </div>
            </div>
            
            <div className="flex flex-col justify-between h-full">
                <div>
                    <h3 className="text-2xl font-bold truncate text-white mt-2 pr-10 mb-1">{airport.airport_name}</h3>
                    <p className="text-gray-400 text-sm truncate">{airport.country_name}</p>
                    {airport.city_iata_code && (
                        <p className="text-gray-500 text-xs mt-1 truncate">City: {airport.city_iata_code}</p>
                    )}
                </div>
                
                <div className="mt-6 flex items-end">
                    <span className="text-5xl font-bold text-blue-400">{airport.iata_code}</span>
                </div>
            </div>
            
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <div className="text-8xl text-gray-500">✈</div>
            </div>
        </div>
    );

    // Pagination component with improved display
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
        } else {
            // For more than 5 pages, show a window around current page
            if (currentPage <= 3) {
                // Near the start
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                // Middle
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return (
            <div className="flex flex-wrap justify-center mt-6">
                <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2 mb-2 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-md ml-2 mb-2 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                    Siguiente
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Header with search in a single row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 mb-4 gap-4">
                <h1 className="text-3xl text-blue-400 font-bold whitespace-nowrap flex items-center">
                    <FlightTakeoffIcon className="mr-2" fontSize="large" />
                    SkyConnect Explorer
                </h1>

                <form onSubmit={handleSearchSubmit} className="flex-grow max-w-3xl">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar aeropuertos..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-6 py-3 rounded-full bg-white text-black focus:outline-none pr-16 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-0 h-full px-6 rounded-r-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                        >
                            <SearchIcon />
                            <span className="ml-1 hidden sm:inline">Buscar</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Main content - flex-grow pushes pagination to bottom */}
            <div className="flex-grow px-6">
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

                {/* Airport grid - always 2 columns, 3 rows with full-width cards */}
                {!loading && (
                    <div className="grid grid-cols-2 gap-8 w-full" id="airport-grid">
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
            </div>

            {/* Pagination - styled to match the modern look */}
            {!loading && (
                <div className="py-6 px-6">
                    <Pagination />
                </div>
            )}

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
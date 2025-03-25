"use client";

import React, { useState, useEffect, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CircularProgress from '@mui/material/CircularProgress';
import { Airport } from '@/types';
import { useAirportStore } from '@/store/useFlightStore';
import { useRouter } from 'next/navigation';

const SkyConnectExplorer = () => {
    // Navigation
    const router = useRouter();
    
    // Local state
    const [searchTerm, setSearchTerm] = useState('');
    const [searchApplied, setSearchApplied] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

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

    // Pagination logic
    const itemsPerPage = 8;
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
        // Store the selected airport in localStorage for retrieval on the airport information page
        localStorage.setItem('selectedAirport', JSON.stringify(airport));
        
        // Navigate to the airport information page
        router.push(`/airportInformation?code=${airport.iata_code}`);
    };

    // Airport card component with updated info
    const AirportCard = ({ airport }: { airport: Airport }) => (
        <div
            className="bg-gray-800 rounded-lg p-4 relative overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-700"
            onClick={() => handleAirportClick(airport)}
        >
            <div className="flex justify-between">
                <div className="overflow-hidden">
                    <h3 className="text-xl font-bold truncate text-white">{airport.airport_name}</h3>
                    <p className="text-gray-400 truncate"> {airport.country_name}</p>
                    <div className="mt-4">
                        <span className="text-4xl font-bold text-blue-400">{airport.iata_code}</span>
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
                                className={`w-10 h-10 mx-1 mb-1 flex items-center justify-center rounded-md ${currentPage === page
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
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
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

            {/* Main content - flex-grow pushes pagination to bottom */}
            <div className="flex-grow">
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

                {/* Airport grid - responsive columns */}
                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

            {/* Pagination */}
            {!loading && <Pagination />}
        </div>
    );
};

export default SkyConnectExplorer;
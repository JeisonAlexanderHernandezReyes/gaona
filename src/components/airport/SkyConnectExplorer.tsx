"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CircularProgress from '@mui/material/CircularProgress';
import { Airport } from '@/types';
import { useAirportStore } from '@/store/useFlightStore';
import { useRouter, useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SearchForm from '../ui/SearchForm';

const SkyConnectExplorer = () => {
    // Navigation and URL parameters
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get search params from URL
    const urlSearchTerm = searchParams?.get('search') || '';
    const urlIsIata = searchParams?.get('isIata') === 'true';

    // Local state
    const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
    const [searchApplied, setSearchApplied] = useState(urlSearchTerm);
    const [currentPage, setCurrentPage] = useState(1);
    const [isIataSearch, setIsIataSearch] = useState(urlIsIata);
    const [errorSnackbar, setErrorSnackbar] = useState({
        open: false,
        message: ''
    });

    // Global state from Zustand
    const {
        airports,
        loading,
        error,
        fetchAirports,
        fetchAirportByIATA
    } = useAirportStore();

    // Sanitize input for security
    const sanitizeInput = (input: string): string => {
        // Remove HTML and special characters to prevent XSS
        const noHtml = input.replace(/<\/?[^>]+(>|$)/g, "");
        // Remove potentially dangerous characters to prevent injections
        const noInjection = noHtml.replace(/['";{}()*&^%$#@!~`\\/]/g, '');
        // Limit length to prevent DoS attacks
        return noInjection.substring(0, 100);
    };

    // Map API airports to our Airport interface
    const mapAirportsData = useCallback((apiAirports: Airport[]): Airport[] => {
        return apiAirports;
    }, []);

    // Effect to process URL parameters on component mount
    useEffect(() => {
        if (urlSearchTerm) {
            // If IATA search is specified in URL params
            if (urlIsIata) {
                fetchAirportByIATA(urlSearchTerm.toUpperCase()).catch(err => {
                    setErrorSnackbar({
                        open: true,
                        message: `No airport found with IATA code: ${urlSearchTerm.toUpperCase()} - ${err}`
                    });
                });
            }
        }
        
        fetchAirports();
    }, [fetchAirports, fetchAirportByIATA, urlSearchTerm, urlIsIata]);

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
        return (
            (airport.airport_name && airport.airport_name.toLowerCase().includes(searchTermLower)) ||
            (airport.city_iata_code && airport.city_iata_code.toLowerCase().includes(searchTermLower)) ||
            (airport.country_name && airport.country_name.toLowerCase().includes(searchTermLower)) ||
            (airport.iata_code && airport.iata_code.toLowerCase().includes(searchTermLower))
        );
    });

    // Pagination logic
    const itemsPerPage = 6;
    const totalPages = Math.ceil(filteredAirports.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAirports = filteredAirports.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsIataSearch(false);
    };

    const validateIataCode = (code: string): boolean => {
        // IATA codes are typically 3 alphabetic characters
        const iataRegex = /^[A-Za-z]{3}$/;
        return iataRegex.test(code);
    };

    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous error state
        setErrorSnackbar({ open: false, message: '' });

        // Sanitize the input
        const sanitizedTerm = sanitizeInput(searchTerm.trim());
        
        if (!sanitizedTerm) {
            setSearchApplied('');
            setIsIataSearch(false);
            setCurrentPage(1);
            
            // Update URL to remove search parameters
            router.push('/skyconnect-explorer');
            return;
        }

        // Check if this is an IATA code search
        if (sanitizedTerm.length === 3 && validateIataCode(sanitizedTerm)) {
            try {
                setIsIataSearch(true);
                await fetchAirportByIATA(sanitizedTerm.toUpperCase());
                setSearchApplied(sanitizedTerm);
                setCurrentPage(1);
                
                // Update URL with search parameters
                router.push(`/skyconnect-explorer?search=${encodeURIComponent(sanitizedTerm)}&isIata=true`);
            } catch (err) {
                setErrorSnackbar({
                    open: true,
                    message: `No airport found with IATA code: ${sanitizedTerm.toUpperCase()} - ${err}`
                });
            }
        } else {
            // Regular search
            setIsIataSearch(false);
            setSearchApplied(sanitizedTerm);
            setCurrentPage(1);
            
            // Update URL with search parameters
            router.push(`/skyconnect-explorer?search=${encodeURIComponent(sanitizedTerm)}&isIata=false`);
        }
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

    const handleCloseSnackbar = () => {
        setErrorSnackbar({ ...errorSnackbar, open: false });
    };

    // Airport card component with updated info and background image with gradient
    const AirportCard = ({ airport }: { airport: Airport }) => (
        <div
            className="bg-gray-800 rounded-lg p-6 relative overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-700 w-full h-full flex flex-col"
            onClick={() => handleAirportClick(airport)}
        >
            {/* Gradient overlay - from left to center */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-800/90 to-transparent z-0 pointer-events-none"></div>
            
            {/* Background airplane image - only in right half */}
            <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-30 pointer-events-none overflow-hidden">
                <div className="relative w-full h-full">
                    <Image
                        src="/avion.png"
                        alt="Airplane background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center right"
                        className="blur-xs"
                        priority={false}
                    />
                </div>
            </div>
            
            <div className="flex justify-between items-start relative z-10">
                <div className="overflow-hidden flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{airport.airport_name}</h3>
                    <p className="text-gray-400">{airport.country_name}</p>
                    <div className="mt-6">
                        <span className="text-5xl font-bold text-blue-400">{airport.iata_code}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="bg-blue-500 p-4 rounded-full text-white flex-shrink-0">
                        <FlightTakeoffIcon fontSize="medium" />
                    </div>
                </div>
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
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col relative">


            {/* Header with search and IATA search indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 px-4 md:px-8 lg:px-12 relative z-10">
                <h1 className="text-3xl text-blue-400 font-bold whitespace-nowrap">
                    SkyConnect Explorer
                </h1>

                <SearchForm
                    searchTerm={searchTerm}
                    placeholder={isIataSearch ? "Buscar por código IATA (ej: LAX)" : "Buscar aeropuertos..."}
                    onSearchChange={handleSearch}
                    onSearchSubmit={handleSearchSubmit}
                />
            </div>

            {/* Search type indicator */}
            {searchApplied && (
                <div className="px-4 md:px-8 lg:px-12 mb-4 relative z-10">
                    <div className="inline-flex items-center bg-blue-600/20 px-4 py-2 rounded-full">
                        <span className="mr-2">
                            {isIataSearch ? <AirplanemodeActiveIcon fontSize="small" /> : <SearchIcon fontSize="small" />}
                        </span>
                        <span>
                            {isIataSearch
                                ? `Buscando por código IATA: ${searchApplied.toUpperCase()}`
                                : `Resultados para: "${searchApplied}"`}
                        </span>
                    </div>
                </div>
            )}

            {/* Main content - flex-grow pushes pagination to bottom */}
            <div className="flex-grow relative z-10">
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

                {/* Airport grid - 2 columns exactly */}
                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 md:px-8 lg:px-12">
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

            {/* Error Snackbar */}
            <Snackbar
                open={errorSnackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {errorSnackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SkyConnectExplorer;
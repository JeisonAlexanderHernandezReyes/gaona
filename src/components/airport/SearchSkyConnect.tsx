import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchSkyConnectProps {
    onSearch?: (searchTerm: string) => void;
    backgroundImage?: string;
}

const SearchSkyConnect: React.FC<SearchSkyConnectProps> = ({
    onSearch = () => { },
    backgroundImage = '/airport-background.jpg'
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        // Validate input to prevent XSS
        const sanitizedInput = searchTerm.trim().replace(/[<>]/g, '');
        onSearch(sanitizedInput);
    };

    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 32, 0.8), rgba(0, 0, 32, 0.9)), url(${backgroundImage})`
            }}
        >
            {/* Title with more dramatic gradient and proper sizing */}
            <div className="container mx-auto px-4 flex flex-col items-center">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-center mb-16 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
                    SkyConnect Explorer
                </h1>

                <form
                    onSubmit={handleSearch}
                    className="flex flex-col items-center justify-center w-full max-w-2xl"
                >
                    {/* Search input with proper styling and padding */}
                    <div className="w-full rounded-full bg-white shadow-xl p-3 pl-6 flex items-center">
                        <input
                            className="w-full text-xl sm:text-2xl font-medium outline-none border-none py-2 text-gray-800 placeholder-blue-500"
                            placeholder="Buscar aeropuertos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        aria-label="search"
                        className="mt-8 py-4 px-10 text-xl font-bold rounded-xl border-2 border-white flex items-center justify-center text-white shadow-lg 
                                bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 
                                transition-all duration-300 transform hover:scale-105"
                    >
                        <SearchIcon className="mr-2 text-white" fontSize="medium" />
                        Buscar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchSkyConnect;
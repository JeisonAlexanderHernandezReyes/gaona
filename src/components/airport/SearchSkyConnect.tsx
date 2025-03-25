import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchSkyConnectProps {
    onSearch?: (searchTerm: string) => void;
    backgroundImage?: string;
}

const SearchSkyConnect: React.FC<SearchSkyConnectProps> = ({
    onSearch = () => { },
    backgroundImage = '/aeropuerto.png'
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Función para sanitizar texto sin dependencias externas
    const sanitizeInput = (input: string): string => {
        // Eliminar HTML y caracteres especiales para prevenir XSS
        const noHtml = input.replace(/<\/?[^>]+(>|$)/g, "");
        
        // Eliminar caracteres potencialmente peligrosos para prevenir inyecciones
        const noInjection = noHtml.replace(/['";{}()*&^%$#@!~`\\/]/g, '');
        
        // Limitar la longitud para prevenir ataques DoS
        return noInjection.substring(0, 100);
    };

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        
        // Aplicar la sanitización completa al texto de búsqueda
        const sanitizedInput = sanitizeInput(searchTerm.trim());
        
        onSearch(sanitizedInput);
    };

    // Validar la URL de la imagen de fondo para prevenir ataques basados en URL
    const validateImageUrl = (url: string): string => {
        // Solo permitir rutas absolutas locales o URLs HTTPS específicas
        if (url.startsWith('/') || 
            /^https:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(\/[a-zA-Z0-9-_.]+)*\/?$/.test(url)) {
            return url;
        }
        return '/aeropuerto.png'; // URL por defecto segura
    };

    const safeBackgroundImage = validateImageUrl(backgroundImage);

    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 32, 0.7), rgba(0, 32, 64, 0.8)), url(${safeBackgroundImage})`
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
                            maxLength={100} // Prevenir entradas excesivamente largas
                            aria-label="Campo de búsqueda de aeropuertos"
                            autoComplete="off" // Prevenir autocompletado con datos sensibles
                            pattern="[A-Za-z0-9\s-.]+" // Restringir caracteres válidos
                            title="Solo se permiten letras, números, espacios, guiones y puntos"
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
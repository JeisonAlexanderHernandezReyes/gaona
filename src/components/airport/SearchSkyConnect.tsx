import React, { useState, FormEvent } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { FlightTakeoff } from '@mui/icons-material';
import SearchForm from '../ui/SearchForm';
import { useRouter } from 'next/navigation';

interface SearchSkyConnectProps {
    backgroundImage?: string;
}

const SearchSkyConnect: React.FC<SearchSkyConnectProps> = ({
    backgroundImage = '/aeropuerto.png'
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const router = useRouter();

    // Función para sanitizar texto sin dependencias externas
    const sanitizeInput = (input: string): string => {
        // Eliminar HTML y caracteres especiales para prevenir XSS
        const noHtml = input.replace(/<\/?[^>]+(>|$)/g, "");

        // Eliminar caracteres potencialmente peligrosos para prevenir inyecciones
        const noInjection = noHtml.replace(/['";{}()*&^%$#@!~`\\/]/g, '');

        // Limitar la longitud para prevenir ataques DoS
        return noInjection.substring(0, 100);
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

    // Validar si es un código IATA (3 caracteres alfabéticos)
    const validateIataCode = (code: string): boolean => {
        const iataRegex = /^[A-Za-z]{3}$/;
        return iataRegex.test(code);
    };

    // Manejar cambios en el campo de búsqueda
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Manejar el envío del formulario de búsqueda
    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Sanitizar la entrada
        const sanitizedInput = sanitizeInput(searchTerm.trim());
        
        if (!sanitizedInput) return;

        // Determinar si es una búsqueda por código IATA
        const isIataSearch = sanitizedInput.length === 3 && validateIataCode(sanitizedInput);
        
        // Redirigir a la página SkyConnectExplorer con los parámetros de búsqueda
        router.push(`/skyconnect-explorer?search=${encodeURIComponent(sanitizedInput)}&isIata=${isIataSearch}`);
    };

    const safeBackgroundImage = validateImageUrl(backgroundImage);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `linear-gradient(rgba(0, 0, 32, 0.7), rgba(0, 32, 64, 0.8)), url(${safeBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    variant="h1"
                    component="h1"
                    align="center"
                    sx={{
                        fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '5rem' },
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        mb: 6,
                        backgroundImage: 'linear-gradient(90deg, #4285F4, #34A5F2, #00D8D6)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        color: 'transparent',
                        display: 'inline-block',
                    }}
                >
                    <FlightTakeoff sx={{
                        fontSize: 'inherit',
                        verticalAlign: 'middle',
                        mr: 2,
                        color: '#34A5F2'
                    }} />
                    SkyConnect Explorer
                </Typography>

                <Box sx={{ width: '100%', maxWidth: '600px' }}>
                    <SearchForm
                        searchTerm={searchTerm}
                        placeholder={validateIataCode(searchTerm) ? "Buscar por código IATA (ej: LAX)" : "Buscar aeropuertos..."}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={handleSearchSubmit}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default SearchSkyConnect;
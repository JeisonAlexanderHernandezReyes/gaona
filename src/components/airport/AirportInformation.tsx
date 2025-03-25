'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import General from './General';
import Ubication from './Ubication';
import ZoneTime from './ZoneTime';
import { Alert, AlertTitle } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { Airport } from '@/types';

type Tab = 'general' | 'ubicacion' | 'zona-horaria' | 'estadisticas';

function AirportInformation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [airport, setAirport] = useState<Airport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get the airport code from URL query params
    const code = searchParams.get('code');
    
    try {
      // Try to get the selected airport from localStorage
      const savedAirport = localStorage.getItem('selectedAirport');
      
      if (savedAirport) {
        const parsedAirport = JSON.parse(savedAirport);
        setAirport(parsedAirport);
        
        // Verify the code matches
        if (code && parsedAirport.iata_code !== code) {
          setError('Airport code mismatch. Please go back and try again.');
        }
      } else {
        setError('Airport information not found. Please go back and try again.');
      }
    } catch (err) {
      setError('Error loading airport data. Please go back and try again.');
      console.error('Error parsing airport data:', err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'zona-horaria', label: 'Zona Horaria' },
    { id: 'estadisticas', label: 'Estadísticas' },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error || !airport) {
      return (
        <Alert severity="error" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          {error || 'No airport data available'}
        </Alert>
      );
    }

    switch (activeTab) {
      case 'general':
        return <General airport={airport} />;

      case 'ubicacion':
        return <Ubication airport={airport} />;

      case 'zona-horaria':
        return <ZoneTime airport={airport} />;

      default:
        return (
          <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-[#4B8BFF] text-2xl font-semibold mb-4">Estadísticas</h2>
            <p className="text-gray-400">No hay estadísticas disponibles para este aeropuerto.</p>
          </div>
        );
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={handleBack}
          className="flex items-center text-[#4B8BFF] mb-4 hover:underline"
        >
          <ArrowBackIcon className="mr-1" /> Volver
        </button>

        <h1 className="text-[#4B8BFF] text-4xl sm:text-6xl font-bold text-center mb-4">
          {airport?.airport_name || 'Aeropuerto'}
        </h1>
        
        <h2 className="text-2xl text-center mb-8 sm:mb-12">
          {airport?.iata_code ? `(${airport.iata_code})` : ''}
        </h2>

        <div className="max-w-7xl mx-auto bg-[#2A2F45]/50 rounded-xl p-1 mb-8 sm:mb-12">
          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-400 hover:text-white"
            >
              <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
              <svg
                className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
            
            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="mt-2 space-y-1 px-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#4B8BFF] text-white'
                        : 'text-gray-400 hover:text-white hover:bg-[#2A2F45]'
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id as Tab);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex flex-wrap sm:flex-nowrap justify-between gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-[#4B8BFF] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.id as Tab)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AirportInformation;
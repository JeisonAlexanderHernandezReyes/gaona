'use client';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';
import TimerIcon from '@mui/icons-material/Timer';
import { Box, Paper } from '@mui/material';
import General from '../../components/General';

type Tab = 'general' | 'ubicacion' | 'zona-horaria' | 'estadisticas';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const position: [number, number] = [-17.05, -145.41667];

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <General />;

      case 'ubicacion':
        return (
          <>
            <Paper className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-6">
              <div className="flex items-center gap-3 mb-8">
                <LocationOnIcon className="w-8 h-8 text-[#4B8BFF]" />
                <h2 className="text-[#4B8BFF] text-2xl font-semibold">
                  Ubicación
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-gray-400">Latitud:</p>
                  <p className="text-xl font-medium">-17.3526°</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400">Longitud:</p>
                  <p className="text-xl font-medium">-145.5097°</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400">Elevación:</p>
                  <p className="text-xl font-medium">3m / 10ft</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400">Región:</p>
                  <p className="text-xl font-medium">Polinesia Francesa</p>
                </div>
              </div>
            </Paper>
            <Box className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl h-[400px] overflow-hidden">
              <img 
                src="https://maps.googleapis.com/maps/api/staticmap?center=-17.3526,-145.5097&zoom=13&size=800x400&maptype=hybrid&markers=color:red%7C-17.3526,-145.5097&key=YOUR_API_KEY"
                alt="Mapa del Aeropuerto Anaa"
                className="w-full h-full object-cover"
              />
            </Box>
          </>
        );

      case 'zona-horaria':
        return (
          <>
            <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-6">
              <div className="flex items-center gap-3 mb-8">
                <PublicIcon className="w-8 h-8 text-[#4B8BFF]" />
                <h2 className="text-[#4B8BFF] text-2xl font-semibold">
                  Zona Horaria
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-gray-400">Zona Horaria:</p>
                  <p className="text-xl font-medium">Pacific/Tahiti</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400">GMT:</p>
                  <p className="text-xl font-medium">-10</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <TimerIcon className="w-8 h-8 text-[#4B8BFF]" />
                <h2 className="text-[#4B8BFF] text-2xl font-semibold">
                  Hora Local
                </h2>
              </div>
              <p className="text-xl font-medium">19/2/2025, 8:47:51</p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white p-8">
      <h1 className="text-[#4B8BFF] text-6xl font-bold text-center mb-12">
        Anaa
      </h1>

      <div className="max-w-4xl mx-auto bg-[#2A2F45]/50 rounded-xl p-1 mb-12">
        <nav className="flex justify-between">
          {[
            { id: 'general', label: 'General' },
            { id: 'ubicacion', label: 'Ubicación' },
            { id: 'zona-horaria', label: 'Zona Horaria' },
            { id: 'estadisticas', label: 'Estadísticas' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
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

      <div className="max-w-4xl mx-auto">
        {renderContent()}
      </div>

      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800"
          alt="Airplane decoration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default App;
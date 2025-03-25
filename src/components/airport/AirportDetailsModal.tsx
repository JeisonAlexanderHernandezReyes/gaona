import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Airport } from '@/types';

interface AirportDetailsModalProps {
  open: boolean;
  onClose: () => void;
  airport: Airport | null;
}

const AirportDetailsModal: React.FC<AirportDetailsModalProps> = ({ 
  open, 
  onClose, 
  airport 
}) => {
  if (!airport) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#1e293b', // Fondo azul oscuro
          color: 'white',
          borderRadius: '0.75rem',
        },
      }}
    >
      <DialogTitle 
        sx={{ 
          m: 0, 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        <InfoIcon 
          sx={{ 
            mr: 1,
            color: '#3b82f6' // Color azul para el icono
          }} 
        />
        <span className="font-bold text-xl">Detalles del Aeropuerto</span>
        
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ backgroundColor: '#1e293b', p: 4 }}>
        <div className="bg-blue-900/30 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{airport.airport_name}</h2>
              <p className="text-gray-300 mb-4">{airport.city_iata_code}, {airport.country_name}</p>
              <div className="inline-block bg-blue-600 px-4 py-2 rounded-lg">
                <span className="text-3xl font-bold">{airport.iata_code}</span>
              </div>
            </div>
            <div className="bg-blue-600 p-3 rounded-full">
              <FlightTakeoffIcon fontSize="large" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <FlightTakeoffIcon sx={{ mr: 1 }} />
              Información General
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-400">Código ICAO:</span>
                <span>{airport.icao_code || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Zona Horaria:</span>
                <span>{airport.timezone || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">GMT Offset:</span>
                <span>{airport.gmt || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Latitud:</span>
                <span>{airport.latitude || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Longitud:</span>
                <span>{airport.longitude || 'N/A'}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <FlightLandIcon sx={{ mr: 1 }} />
              Contacto
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-400">Teléfono:</span>
                <span>{airport.phone_number || 'No disponible'}</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AirportDetailsModal;
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
  
  // Example additional data that could be shown in the modal
  const additionalInfo = {
    terminals: 3,
    runways: 2,
    elevation: "2548m",
    website: "www.aeropuerto-eldorado.com",
    phoneNumber: "+57 601 2662000",
    timezone: "America/Bogota",
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#1e293b', // Dark blue background
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
            color: '#3b82f6' // Blue color for icon 
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
              <h2 className="text-2xl font-bold mb-2">{airport.name}</h2>
              <p className="text-gray-300 mb-4">{airport.city}, {airport.country}</p>
              <div className="inline-block bg-blue-600 px-4 py-2 rounded-lg">
                <span className="text-3xl font-bold">{airport.code}</span>
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
                <span className="text-gray-400">Terminales:</span>
                <span>{additionalInfo.terminals}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Pistas:</span>
                <span>{additionalInfo.runways}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Elevación:</span>
                <span>{additionalInfo.elevation}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Zona Horaria:</span>
                <span>{additionalInfo.timezone}</span>
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
                <span className="text-gray-400">Sitio Web:</span>
                <span>{additionalInfo.website}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Teléfono:</span>
                <span>{additionalInfo.phoneNumber}</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AirportDetailsModal;
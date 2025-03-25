import React from 'react';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { Airport } from '@/types';

interface AirportProps {
  airport: Airport;
}

const AirportCard: React.FC<AirportProps> = ({ airport }) => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-navy-800 hover:bg-navy-700 transition-colors duration-300">
      <div className="flex p-4">
        <div className="flex-grow">
          <h2 className="text-lg font-medium">{airport.name}</h2>
          <p className="text-gray-300">{airport.city}, {airport.country}</p>
          
          <div className="mt-4">
            <span className="text-3xl font-bold text-blue-400">{airport.code}</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-blue-500 p-3 rounded-full">
            <AirplanemodeActiveIcon />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-right-bottom bg-no-repeat opacity-20" 
           style={{ backgroundImage: 'url(/images/airplane-silhouette.png)' }} />
    </div>
  );
};

export default AirportCard;
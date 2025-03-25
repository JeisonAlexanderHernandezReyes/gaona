import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Airport } from '@/types';

interface UbicationProps {
  airport: Airport;
}

export default function Ubication({ airport }: UbicationProps) {
  // Create a Google Maps embed URL with the airport coordinates
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000!2d${airport.longitude}!3d${airport.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${airport.airport_name.replace(/ /g, '+')}!5e0!3m2!1sen!2s!4v1621234567890!5m2!1sen!2s`;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl overflow-hidden flex flex-col md:flex-row mb-4 sm:mb-6">
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <LocationOnIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#4B8BFF]" />
            <h2 className="text-[#4B8BFF] text-xl sm:text-2xl font-semibold">
              Ubicación
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <p className="text-gray-400 min-w-[100px]">Latitud:</p>
              <p className="text-lg sm:text-xl font-medium">{airport.latitude || 'N/A'}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-400 min-w-[100px]">Longitud:</p>
              <p className="text-lg sm:text-xl font-medium">{airport.longitude || 'N/A'}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-400 min-w-[100px]">ID Geoname:</p>
              <p className="text-lg sm:text-xl font-medium">{airport.geoname_id || 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-32 md:h-auto opacity-10">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800"
            alt="Airplane decoration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="h-[300px] sm:h-[400px] rounded-2xl overflow-hidden">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
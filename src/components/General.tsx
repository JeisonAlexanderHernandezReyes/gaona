'use client';
import InfoIcon from '@mui/icons-material/Info';

export default function General() {
  return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl overflow-hidden flex">
          <div className="flex-1 p-8">
            <div className="flex items-center gap-3 mb-8">
              <InfoIcon className="w-8 h-8 text-[#4B8BFF]" />
              <h2 className="text-[#4B8BFF] text-2xl font-semibold">
                Información General
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center gap-2">
                <p className="text-gray-400">Código IATA:</p>
                <p className="text-xl font-medium">AAA</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-400">Código ICAO:</p>
                <p className="text-xl font-medium">NTGA</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-400">País:</p>
                <p className="text-xl font-medium">French Polynesia (PF)</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-400">Ciudad IATA:</p>
                <p className="text-xl font-medium">AAA</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-400">Teléfono:</p>
                <p className="text-xl font-medium">No disponible</p>
              </div>
            </div>
          </div>

          <div className="w-1/2 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800"
              alt="Airplane decoration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
  );
}

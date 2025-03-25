import React from "react";
import FlightIcon from "@mui/icons-material/Flight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Flight } from "@/types";

interface FlightListProps {
  flights: Flight[];
  title?: string;
}

const FlightList: React.FC<FlightListProps> = ({
  flights,
  title = "Vuelos Disponibles",
}) => {
  const getStatusColor = (status: Flight["status"]) => {
    switch (status) {
      case "OnTime":
        return "text-green-500";
      case "Delayed":
        return "text-yellow-500";
      case "Boarding":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
      case "Landed":
        return "text-green-700";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {flights.length === 0 ? (
        <div className="bg-navy-800 rounded-lg p-6 text-center">
          <p className="text-gray-400">
            No hay vuelos disponibles con los criterios seleccionados.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-navy-800 rounded-lg p-4 hover:bg-navy-700 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FlightIcon />
                  <div>
                    <p className="font-bold">{flight.airline}</p>
                    <p className="text-sm text-gray-400">
                      Vuelo {flight.flightNumber}
                    </p>
                  </div>
                </div>
                <div className={`font-medium ${getStatusColor(flight.status)}`}>
                  {flight.status}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">{flight.origin.code}</div>
                  <div className="text-sm text-gray-400">
                    {flight.origin.city}
                  </div>
                </div>

                <div className="flex-1 mx-4 border-t border-dashed border-gray-600 relative">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rounded-full bg-blue-400"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 rounded-full bg-blue-400"></div>
                </div>

                <div>
                  <div className="text-2xl font-bold">
                    {flight.destination.code}
                  </div>
                  <div className="text-sm text-gray-400">
                    {flight.destination.city}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-sm text-gray-400">
                <div className="flex items-center">
                  <AccessTimeIcon />
                  <span>Salida: {flight.departureTime}</span>
                </div>
                <div className="flex items-center">
                  <AccessTimeIcon />
                  <span>Llegada: {flight.arrivalTime}</span>
                </div>
                {flight.price && (
                  <div className="font-bold text-white">
                    ${flight.price.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightList;

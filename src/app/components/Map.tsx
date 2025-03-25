'use client';
import { useEffect } from 'react';
import L from 'leaflet';

export default function Map() {
  useEffect(() => {
    // Coordenadas del Aeropuerto Anaa
    const anaaAirport: [number, number] = [-17.3526, -145.5097];
    
    // Crear el mapa
    const map = L.map('map').setView(anaaAirport, 13);
    
    // Añadir la capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Añadir un marcador para el aeropuerto
    const airportIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.marker(anaaAirport, { icon: airportIcon })
      .bindPopup('Aeropuerto Anaa (AAA)')
      .addTo(map);

    // Cleanup
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className="h-[400px] w-full rounded-xl overflow-hidden" />;
} 
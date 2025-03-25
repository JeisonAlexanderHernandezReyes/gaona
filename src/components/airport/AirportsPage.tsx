'use client';

import React from 'react';
import AirportExplorer from './AirportExplorer';

export default function AirportsPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-400">Explorador de Aeropuertos</h1>
        <p className="text-gray-400">Descubre información detallada sobre aeropuertos de todo el mundo</p>
      </header>
      
      <AirportExplorer />
    </div>
  );
}
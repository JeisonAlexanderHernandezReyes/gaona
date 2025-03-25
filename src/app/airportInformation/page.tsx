'use client';
import { useState } from 'react';
import General from '../components/General';
import Ubication from '../components/Ubication';
import ZoneTime from '../components/ZoneTime';
type Tab = 'general' | 'ubicacion' | 'zona-horaria' | 'estadisticas';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <General />;

      case 'ubicacion':
        return (
         <Ubication />
        );

      case 'zona-horaria':
        return (
         <ZoneTime />
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

    </div>
  );
}

export default App;
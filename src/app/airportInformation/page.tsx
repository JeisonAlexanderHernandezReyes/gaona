'use client';
import { useState } from 'react';
import General from '../../components/General';
import Ubication from '../../components/Ubication';
import ZoneTime from '../../components/ZoneTime';
type Tab = 'general' | 'ubicacion' | 'zona-horaria' | 'estadisticas';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'zona-horaria', label: 'Zona Horaria' },
    { id: 'estadisticas', label: 'Estadísticas' },
  ];

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
    <div className="min-h-screen bg-[#0A0F2C] text-white p-4 sm:p-8">
      <h1 className="text-[#4B8BFF] text-4xl sm:text-6xl font-bold text-center mb-8 sm:mb-12">
        Anaa
      </h1>

      <div className="max-w-7xl mx-auto bg-[#2A2F45]/50 rounded-xl p-1 mb-8 sm:mb-12">
        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-400 hover:text-white"
          >
            <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
            <svg
              className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
              />
            </svg>
          </button>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="mt-2 space-y-1 px-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#4B8BFF] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#2A2F45]'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id as Tab);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex flex-wrap sm:flex-nowrap justify-between gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors text-sm sm:text-base ${
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

      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
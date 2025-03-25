import InfoIcon from '@mui/icons-material/Info';

function Page() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white p-8">
      {/* Header */}
      <h1 className="text-[#4B8BFF] text-6xl font-bold text-center mb-12">
        Anaa
      </h1>

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto bg-[#2A2F45]/50 rounded-xl p-1 mb-12">
        <nav className="flex justify-between">
          <button className="flex-1 bg-[#4B8BFF] text-white py-3 px-6 rounded-lg font-medium">
            General
          </button>
          <button className="flex-1 text-gray-400 py-3 px-6 hover:text-white transition-colors">
            Ubicación
          </button>
          <button className="flex-1 text-gray-400 py-3 px-6 hover:text-white transition-colors">
            Zona Horaria
          </button>
          <button className="flex-1 text-gray-400 py-3 px-6 hover:text-white transition-colors">
            Estadísticas
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          {/* Title */}
          <div className="flex items-center gap-3 mb-8">
            <InfoIcon className="w-8 h-8 text-[#4B8BFF]" />
            <h2 className="text-[#4B8BFF] text-2xl font-semibold">
              Información General
            </h2>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-gray-400">Código IATA:</p>
              <p className="text-xl font-medium">AAA</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Código ICAO:</p>
              <p className="text-xl font-medium">NTGA</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">País:</p>
              <p className="text-xl font-medium">French Polynesia (PF)</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Ciudad IATA:</p>
              <p className="text-xl font-medium">AAA</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Teléfono:</p>
              <p className="text-xl font-medium">No disponible</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800"
          alt="Airplane decoration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default Page;
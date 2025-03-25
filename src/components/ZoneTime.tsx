import PublicIcon from '@mui/icons-material/Public';
import TimerIcon from '@mui/icons-material/Timer';

export default function ZoneTime() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl overflow-hidden flex flex-col md:flex-row mb-4 sm:mb-6">
                <div className="flex-1 p-4 sm:p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <PublicIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#4B8BFF]" />
                        <h2 className="text-[#4B8BFF] text-xl sm:text-2xl font-semibold">
                            Zona Horaria
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                            <p className="text-gray-400 min-w-[100px]">Zona Horaria:</p>
                            <p className="text-lg sm:text-xl font-medium">Pacific/Tahiti</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-gray-400 min-w-[100px]">GMT:</p>
                            <p className="text-lg sm:text-xl font-medium">-10</p>
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
            <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="flex-1 p-4 sm:p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <TimerIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#4B8BFF]" />
                        <h2 className="text-[#4B8BFF] text-xl sm:text-2xl font-semibold">
                            Hora Local
                        </h2>
                    </div>
                    <p className="text-lg sm:text-xl font-medium">19/2/2025, 8:47:51</p>
                </div>
                <div className="w-full md:w-1/2 h-32 md:h-auto opacity-10">
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800"
                        alt="Airplane decoration"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}
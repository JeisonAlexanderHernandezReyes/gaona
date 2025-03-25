import PublicIcon from '@mui/icons-material/Public';
import TimerIcon from '@mui/icons-material/Timer';

export default function ZoneTime() {
    return (
        <>
            <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-6">
                <div className="flex items-center gap-3 mb-8">
                    <PublicIcon className="w-8 h-8 text-[#4B8BFF]" />
                    <h2 className="text-[#4B8BFF] text-2xl font-semibold">
                        Zona Horaria
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <p className="text-gray-400">Zona Horaria:</p>
                        <p className="text-xl font-medium">Pacific/Tahiti</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-400">GMT:</p>
                        <p className="text-xl font-medium">-10</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                    <TimerIcon className="w-8 h-8 text-[#4B8BFF]" />
                    <h2 className="text-[#4B8BFF] text-2xl font-semibold">
                        Hora Local
                    </h2>
                </div>
                <p className="text-xl font-medium">19/2/2025, 8:47:51</p>
            </div>
        </>
    )
}
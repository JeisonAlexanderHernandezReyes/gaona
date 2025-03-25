import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Paper } from '@mui/material';

export default function Ubication() {

    return (
        <>
            <Paper className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-6">
                <div className="flex items-center gap-3 mb-8">
                    <LocationOnIcon className="w-8 h-8 text-[#4B8BFF]" />
                    <h2 className="text-[#4B8BFF] text-2xl font-semibold">
                        Ubicación
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <p className="text-gray-400">Latitud:</p>
                        <p className="text-xl font-medium">-17.3526°</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-400">Longitud:</p>
                        <p className="text-xl font-medium">-145.5097°</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-400">Elevación:</p>
                        <p className="text-xl font-medium">3m / 10ft</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-400">Región:</p>
                        <p className="text-xl font-medium">Polinesia Francesa</p>
                    </div>
                </div>
            </Paper>
            <Box className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl h-[400px] overflow-hidden">
                <img
                    src="https://maps.googleapis.com/maps/api/staticmap?center=-17.3526,-145.5097&zoom=13&size=800x400&maptype=hybrid&markers=color:red%7C-17.3526,-145.5097&key=YOUR_API_KEY"
                    alt="Mapa del Aeropuerto Anaa"
                    className="w-full h-full object-cover"
                />
            </Box>
        </>

    )
}
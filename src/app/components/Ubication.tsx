import LocationOnIcon from '@mui/icons-material/LocationOn';
export default function Ubication() {

    return (
        <>
            <div className="bg-[#1C1F35]/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-6">
                <div className="flex items-center gap-3 mb-8">
                    <LocationOnIcon className="w-8 h-8 text-[#4B8BFF]" />
                    <h2 className="text-[#4B8BFF] text-2xl font-semibold">
                        Ubicación
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <p className="text-gray-400">Latitud:</p>
                        <p className="text-xl font-medium">-17.05</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-400">Longitud:</p>
                        <p className="text-xl font-medium">-145.41667</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-400">ID Geoname:</p>
                        <p className="text-xl font-medium">6947726</p>
                    </div>
                </div>
            </div>
            <div className="h-[400px] rounded-2xl overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.917786674892!2d-145.51859973022458!3d-17.352599999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x76c7e6e0a2f5f8d5%3A0x9f6b9f9f9f9f9f9f!2sAnaa%20Airport!5e0!3m2!1sen!2s!4v1621234567890!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </>
    );
}
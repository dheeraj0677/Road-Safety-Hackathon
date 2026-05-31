import { useState } from 'react';
import { useToast } from './Toast';

export default function SOSButton({ onActivate }) {
  const [locating, setLocating] = useState(false);
  const [address, setAddress] = useState(null);
  const showToast = useToast();

  const handlePress = async () => {
    setLocating(true);
    setAddress(null);

    if (!navigator.geolocation) {
      showToast('Geolocation not supported', 'error');
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Reverse geocode for address display
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          setAddress(data.display_name || null);
        } catch {
          /* silently skip address */
        }

        setLocating(false);
        onActivate({ latitude, longitude });
      },
      (err) => {
        showToast(`Location error: ${err.message}`, 'error');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* SOS Ring Container */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Concentric animated rings */}
        <div className="sos-ring" />
        <div className="sos-ring" />
        <div className="sos-ring" />

        {/* Main Button */}
        <button
          id="sos-button"
          onClick={handlePress}
          disabled={locating}
          className={`relative z-10 w-36 h-36 rounded-full bg-gradient-to-br from-sos-red to-sos-red-dark 
            text-white font-black text-3xl tracking-widest shadow-2xl
            transition-all duration-300 active:scale-95 
            ${locating ? 'opacity-70' : 'animate-sos-pulse hover:shadow-sos-red/50 hover:shadow-[0_0_40px]'}
            focus:outline-none focus:ring-4 focus:ring-sos-red/30`}
        >
          {locating ? (
            <div className="flex flex-col items-center gap-1">
              <svg className="animate-spin w-8 h-8" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-xs font-bold tracking-wider">LOCATING</span>
            </div>
          ) : (
            'SOS'
          )}
        </button>
      </div>

      {/* Instruction Text */}
      <p className="text-white/40 text-sm font-semibold tracking-wide text-center">
        {locating ? 'Getting your location...' : 'Tap for emergency assistance'}
      </p>

      {/* Address Display */}
      {address && (
        <div className="glass-card px-4 py-3 max-w-xs text-center animate-fade-in">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">📍 Your Location</p>
          <p className="text-white/70 text-xs leading-relaxed">{address}</p>
        </div>
      )}
    </div>
  );
}

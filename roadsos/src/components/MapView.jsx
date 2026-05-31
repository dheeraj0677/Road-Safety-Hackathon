import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import useOverpass from '../hooks/useOverpass';
import { formatDistance, haversineDistance } from '../utils/distance';

/* ── Custom Icons ── */
function createIcon(emoji, size = 32) {
  return L.divIcon({
    html: `<div style="font-size:${size * 0.6}px;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;background:rgba(26,26,26,0.9);border-radius:50%;border:2px solid rgba(255,255,255,0.2);box-shadow:0 4px 12px rgba(0,0,0,0.5)">${emoji}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function createUserIcon() {
  return L.divIcon({
    html: '<div class="user-marker"></div>',
    className: '',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

const CATEGORY_EMOJIS = {
  hospital: '🏥',
  ambulance: '🚑',
  police: '👮',
  towing: '🚗',
  puncture: '🔧',
};

/* ── Re-center map when user moves ── */
function RecenterMap({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);
  return null;
}

export default function MapView({ latitude, longitude, radiusKm, unit }) {
  const [activeCategory, setActiveCategory] = useState('hospital');
  const { places } = useOverpass(latitude, longitude, activeCategory, radiusKm);

  if (!latitude || !longitude) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white/30 text-sm">Waiting for location…</p>
      </div>
    );
  }

  const categories = Object.keys(CATEGORY_EMOJIS);

  return (
    <div className="relative h-full">
      {/* Category filter pills */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex gap-1.5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap backdrop-blur-md transition-all
              ${activeCategory === cat
                ? 'bg-sos-red/90 text-white shadow-lg'
                : 'bg-dark-800/80 text-white/50 hover:text-white/80'
              }`}
          >
            {CATEGORY_EMOJIS[cat]}
          </button>
        ))}
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <RecenterMap lat={latitude} lon={longitude} />

        {/* User marker */}
        <Marker position={[latitude, longitude]} icon={createUserIcon()}>
          <Popup>
            <div className="text-center">
              <p className="font-bold text-sm">📍 You are here</p>
            </div>
          </Popup>
        </Marker>

        {/* Place markers */}
        {places.map((place) => {
          const dist = haversineDistance(latitude, longitude, place.lat, place.lon);
          const distStr = formatDistance(dist, unit);
          const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`;

          return (
            <Marker
              key={place.id}
              position={[place.lat, place.lon]}
              icon={createIcon(CATEGORY_EMOJIS[activeCategory])}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h4 className="font-bold text-sm mb-1">{place.name}</h4>
                  <p className="text-[11px] opacity-60 mb-2">{distStr} away</p>
                  <div className="flex gap-2">
                    {place.phone && (
                      <a href={`tel:${place.phone}`}
                        className="px-2 py-1 bg-green-600 text-white text-[10px] font-bold rounded-md hover:bg-green-500">
                        📞 Call
                      </a>
                    )}
                    <a href={navUrl} target="_blank" rel="noopener noreferrer"
                      className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-md hover:bg-blue-500">
                      🧭 Navigate
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-20 right-3 z-[1000] glass-card px-3 py-2">
        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">Legend</p>
        <div className="flex items-center gap-1.5 text-[11px] text-white/60">
          <div className="user-marker" style={{ width: 10, height: 10, animation: 'none' }} /> You
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-white/60 mt-1">
          <span className="text-sm">{CATEGORY_EMOJIS[activeCategory]}</span>
          <span className="capitalize">{activeCategory}</span>
        </div>
      </div>
    </div>
  );
}

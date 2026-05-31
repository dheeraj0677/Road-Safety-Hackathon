import { formatDistance, haversineDistance } from '../utils/distance';

const CATEGORY_COLORS = {
  hospital: 'text-accent-hospital border-accent-hospital/20 bg-accent-hospital/10',
  ambulance: 'text-accent-ambulance border-accent-ambulance/20 bg-accent-ambulance/10',
  police: 'text-accent-police border-accent-police/20 bg-accent-police/10',
  towing: 'text-accent-towing border-accent-towing/20 bg-accent-towing/10',
  puncture: 'text-accent-puncture border-accent-puncture/20 bg-accent-puncture/10',
};

const CATEGORY_ICONS = {
  hospital: '🏥',
  ambulance: '🚑',
  police: '👮',
  towing: '🚗',
  puncture: '🔧',
};

export function PlaceCardSkeleton() {
  return (
    <div className="glass-card p-4 flex gap-3 animate-pulse">
      <div className="skeleton w-12 h-12 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton h-3 w-full" />
      </div>
    </div>
  );
}

export default function PlaceCard({ place, category, userLat, userLon, unit }) {
  const dist = haversineDistance(userLat, userLon, place.lat, place.lon);
  const distStr = formatDistance(dist, unit);

  const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`;

  return (
    <div className="glass-card p-4 flex gap-3 hover:bg-white/[0.08] transition-colors duration-200 animate-fade-in">
      {/* Category Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border ${CATEGORY_COLORS[category]}`}>
        {CATEGORY_ICONS[category]}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-white truncate">{place.name}</h3>
        <p className="text-xs text-white/40 font-semibold mt-0.5">{distStr} away</p>
        {place.address && (
          <p className="text-[11px] text-white/30 mt-1 truncate">{place.address}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          {place.phone && (
            <a
              href={`tel:${place.phone}`}
              id={`call-${place.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg text-xs font-bold 
                hover:bg-green-600/30 transition-colors active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-.416 1.403l-.76.76a.25.25 0 00-.033.277 13.307 13.307 0 005.727 5.727.25.25 0 00.277-.033l.76-.76a1.5 1.5 0 011.403-.416l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
              </svg>
              Call
            </a>
          )}
          <a
            href={navUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`nav-place-${place.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-xs font-bold 
              hover:bg-blue-600/30 transition-colors active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.453 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.749V3.872a1.5 1.5 0 00-2.073-1.386l-3.51 1.453-4.26-1.763z" clipRule="evenodd" />
            </svg>
            Navigate
          </a>
        </div>
      </div>
    </div>
  );
}

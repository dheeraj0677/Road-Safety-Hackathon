import { useState } from 'react';
import useOverpass from '../hooks/useOverpass';
import PlaceCard, { PlaceCardSkeleton } from './PlaceCard';
import { haversineDistance } from '../utils/distance';

const CATEGORIES = [
  { id: 'hospital', label: 'Hospitals', emoji: '🏥' },
  { id: 'ambulance', label: 'Ambulance', emoji: '🚑' },
  { id: 'police', label: 'Police', emoji: '👮' },
  { id: 'towing', label: 'Towing', emoji: '🚗' },
  { id: 'puncture', label: 'Puncture', emoji: '🔧' },
];

export default function ResultsTabs({ latitude, longitude, radiusKm, unit }) {
  const [activeCategory, setActiveCategory] = useState('hospital');
  const { places, loading, error, refetch } = useOverpass(latitude, longitude, activeCategory, radiusKm);

  // Sort by distance
  const sorted = [...places].sort(
    (a, b) =>
      haversineDistance(latitude, longitude, a.lat, a.lon) -
      haversineDistance(latitude, longitude, b.lat, b.lon)
  );

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="flex gap-1 px-4 py-3 overflow-x-auto no-scrollbar flex-shrink-0">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200
                ${isActive
                  ? 'bg-sos-red text-white shadow-lg shadow-sos-red/30 scale-105'
                  : 'bg-dark-700 text-white/50 hover:bg-dark-600 hover:text-white/70'
                }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-3">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-300 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
            <button onClick={refetch} className="ml-auto text-red-400 font-bold text-xs hover:text-red-200">
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => <PlaceCardSkeleton key={i} />)}
          </div>
        )}

        {/* Results List */}
        {!loading && sorted.length > 0 && (
          <div className="space-y-3">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-1">
              {sorted.length} result{sorted.length !== 1 ? 's' : ''} found
            </p>
            {sorted.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                category={activeCategory}
                userLat={latitude}
                userLon={longitude}
                unit={unit}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && sorted.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-white/60 mb-2">No results found</h3>
            <p className="text-sm text-white/30 max-w-xs">
              No {CATEGORIES.find((c) => c.id === activeCategory)?.label.toLowerCase()} found within {radiusKm}km.
              Try increasing the search radius in Settings.
            </p>
            <button
              onClick={refetch}
              className="mt-4 px-6 py-2 bg-dark-700 text-white/60 rounded-full text-sm font-bold hover:bg-dark-600 transition-colors"
            >
              🔄 Retry Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

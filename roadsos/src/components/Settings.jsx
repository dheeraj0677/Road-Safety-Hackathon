import { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../utils/storage';

const RADIUS_OPTIONS = [
  { value: 1, label: '1 km' },
  { value: 2, label: '2 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 25, label: '25 km' },
];

export default function Settings({ settings, onSettingsChange }) {
  const [localSettings, setLocalSettings] = useState(settings);

  const update = (key, value) => {
    const next = { ...localSettings, [key]: value };
    setLocalSettings(next);
    saveSettings(next);
    onSettingsChange(next);
  };

  return (
    <div className="px-4 py-4 pb-24 overflow-y-auto space-y-6 screen-enter">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-white tracking-tight">Settings</h2>
        <p className="text-xs text-white/30 mt-1">Customize your RoadSoS experience</p>
      </div>

      {/* Distance Unit */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📏</span>
          <h3 className="text-sm font-bold text-white">Distance Unit</h3>
        </div>
        <div className="flex gap-2">
          {['km', 'mi'].map((u) => (
            <button
              key={u}
              onClick={() => update('unit', u)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                ${localSettings.unit === u
                  ? 'bg-sos-red text-white shadow-lg shadow-sos-red/30'
                  : 'bg-dark-700 text-white/40 hover:text-white/60'
                }`}
            >
              {u === 'km' ? 'Kilometers' : 'Miles'}
            </button>
          ))}
        </div>
      </div>

      {/* Search Radius */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <h3 className="text-sm font-bold text-white">Search Radius</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {RADIUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => update('radiusKm', opt.value)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200
                ${localSettings.radiusKm === opt.value
                  ? 'bg-sos-red text-white shadow-lg shadow-sos-red/30'
                  : 'bg-dark-700 text-white/40 hover:text-white/60'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* App Info */}
      <div className="glass-card p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">ℹ️</span>
          <h3 className="text-sm font-bold text-white">About RoadSoS</h3>
        </div>
        <p className="text-xs text-white/30 leading-relaxed">
          RoadSoS provides immediate location-based emergency assistance during road accidents.
          Find nearby hospitals, ambulances, police stations, towing services, and puncture shops.
        </p>
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          <span className="text-[10px] text-white/20 font-bold">v1.0.0</span>
          <span className="text-[10px] text-white/10">•</span>
          <span className="text-[10px] text-white/20">Powered by OpenStreetMap</span>
        </div>
      </div>

      {/* Clear Cache */}
      <button
        onClick={() => {
          const keys = Object.keys(localStorage).filter((k) => k.startsWith('overpass_'));
          keys.forEach((k) => localStorage.removeItem(k));
          alert(`Cleared ${keys.length} cached results`);
        }}
        className="w-full glass-card p-4 text-left hover:bg-white/[0.08] transition-colors group"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🗑️</span>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">Clear Cache</h3>
            <p className="text-[11px] text-white/30">Remove all cached search results</p>
          </div>
        </div>
      </button>
    </div>
  );
}

import { useState } from 'react';
import { ToastProvider } from './components/Toast';
import OfflineBanner from './components/OfflineBanner';
import BottomNav from './components/BottomNav';
import SOSButton from './components/SOSButton';
import ResultsTabs from './components/ResultsTabs';
import MapView from './components/MapView';
import EmergencyContacts from './components/EmergencyContacts';
import Settings from './components/Settings';
import { getSettings } from './utils/storage';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [coords, setCoords] = useState(null);
  const [settings, setSettings] = useState(getSettings());

  const handleSOSActivate = (location) => {
    setCoords(location);
    setScreen('results');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center h-full px-4 screen-enter">
            {/* Logo */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-black tracking-tight">
                <span className="text-white">Road</span>
                <span className="text-sos-red">SoS</span>
              </h1>
              <p className="text-xs text-white/30 font-semibold tracking-widest mt-1 uppercase">
                Emergency Road Assistance
              </p>
            </div>

            <SOSButton onActivate={handleSOSActivate} />

            {/* Quick Stats */}
            {coords && (
              <div className="mt-8 glass-card px-6 py-3 flex gap-6 animate-fade-in">
                <div className="text-center">
                  <p className="text-[10px] text-white/30 font-bold uppercase">Lat</p>
                  <p className="text-sm font-bold text-white/70">{coords.latitude.toFixed(4)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-white/30 font-bold uppercase">Lng</p>
                  <p className="text-sm font-bold text-white/70">{coords.longitude.toFixed(4)}</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'results':
        if (!coords) {
          setScreen('home');
          return null;
        }
        return (
          <div className="h-full screen-enter">
            {/* Back Button */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <button
                onClick={() => setScreen('home')}
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                </svg>
              </button>
              <h2 className="text-sm font-bold text-white">Nearby Services</h2>
            </div>
            <ResultsTabs
              latitude={coords.latitude}
              longitude={coords.longitude}
              radiusKm={settings.radiusKm}
              unit={settings.unit}
            />
          </div>
        );

      case 'map':
        return (
          <div className="h-full screen-enter">
            <MapView
              latitude={coords?.latitude}
              longitude={coords?.longitude}
              radiusKm={settings.radiusKm}
              unit={settings.unit}
            />
          </div>
        );

      case 'contacts':
        return <EmergencyContacts />;

      case 'settings':
        return <Settings settings={settings} onSettingsChange={setSettings} />;

      default:
        return null;
    }
  };

  return (
    <ToastProvider>
      <div className="h-full flex flex-col bg-dark-900">
        <OfflineBanner />
        <main className="flex-1 overflow-hidden">
          {renderScreen()}
        </main>
        <BottomNav activeTab={screen === 'results' ? 'home' : screen} onChange={setScreen} />
      </div>
    </ToastProvider>
  );
}

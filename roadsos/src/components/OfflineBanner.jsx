import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="bg-amber-600/90 text-amber-50 text-center text-xs font-bold py-2 px-4 animate-slide-down backdrop-blur-md">
      <span className="mr-2">📡</span>
      Offline mode — showing last cached data
    </div>
  );
}

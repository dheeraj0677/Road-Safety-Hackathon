import { useState, useEffect, useCallback } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';

const GEO_CACHE_KEY = 'roadsos_last_location';

export default function useGeolocation() {
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  const getPosition = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));

    if (!navigator.geolocation) {
      const cached = getFromStorage(GEO_CACHE_KEY);
      if (cached) {
        setState({ latitude: cached.latitude, longitude: cached.longitude, error: null, loading: false });
      } else {
        setState((s) => ({ ...s, loading: false, error: 'Geolocation is not supported by your browser.' }));
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        saveToStorage(GEO_CACHE_KEY, loc);
        setState({ ...loc, error: null, loading: false });
      },
      (err) => {
        // Attempt fallback to cached location
        const cached = getFromStorage(GEO_CACHE_KEY);
        if (cached) {
          setState({
            latitude: cached.latitude,
            longitude: cached.longitude,
            error: `Using cached location (${err.message})`,
            loading: false,
          });
        } else {
          setState((s) => ({ ...s, loading: false, error: err.message }));
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => {
    getPosition();
  }, [getPosition]);

  return { ...state, refresh: getPosition };
}

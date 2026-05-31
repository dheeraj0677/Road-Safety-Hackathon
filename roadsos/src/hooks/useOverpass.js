import { useState, useEffect, useCallback } from 'react';
import { getCachedResults, cacheResults } from '../utils/storage';

/* ── Overpass tag mappings per category ── */
const CATEGORY_TAGS = {
  hospital: [
    'node["amenity"="hospital"]',
    'way["amenity"="hospital"]',
    'node["amenity"="clinic"]',
  ],
  ambulance: [
    'node["emergency"="ambulance_station"]',
    'way["emergency"="ambulance_station"]',
    'node["amenity"="ambulance_station"]',
  ],
  police: [
    'node["amenity"="police"]',
    'way["amenity"="police"]',
  ],
  towing: [
    'node["shop"="car_repair"]',
    'way["shop"="car_repair"]',
    'node["amenity"="car_wash"]["service:vehicle:towing"="yes"]',
  ],
  puncture: [
    'node["shop"="tyres"]',
    'way["shop"="tyres"]',
    'node["craft"="tyre_repair"]',
    'node["shop"="car_repair"]["service:vehicle:tyres"="yes"]',
  ],
};

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

function buildQuery(lat, lon, category, radiusMeters) {
  const tags = CATEGORY_TAGS[category] || CATEGORY_TAGS.hospital;
  const unions = tags.map((t) => `${t}(around:${radiusMeters},${lat},${lon});`).join('\n');
  return `[out:json][timeout:15];(\n${unions}\n);out center body;`;
}

function parseResults(data) {
  return (data.elements || []).map((el) => {
    const lat = el.lat || el.center?.lat;
    const lon = el.lon || el.center?.lon;
    const tags = el.tags || {};
    return {
      id: el.id,
      name: tags.name || tags['name:en'] || 'Unnamed',
      phone: tags.phone || tags['contact:phone'] || tags['phone:mobile'] || null,
      address: [tags['addr:street'], tags['addr:city'], tags['addr:postcode']].filter(Boolean).join(', ') || null,
      lat,
      lon,
      website: tags.website || tags['contact:website'] || null,
      openingHours: tags.opening_hours || null,
    };
  }).filter((p) => p.lat && p.lon);
}

export default function useOverpass(lat, lon, category, radiusKm = 5) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch_ = useCallback(async () => {
    if (!lat || !lon || !category) return;

    const cacheKey = `overpass_${category}_${lat.toFixed(3)}_${lon.toFixed(3)}_${radiusKm}`;
    const cached = getCachedResults(cacheKey, 30);
    if (cached) {
      setPlaces(cached);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const query = buildQuery(lat, lon, category, radiusKm * 1000);
      const res = await fetch(OVERPASS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
      });

      if (!res.ok) throw new Error(`Overpass API error: ${res.status}`);

      const json = await res.json();
      const parsed = parseResults(json);
      setPlaces(parsed);
      cacheResults(cacheKey, parsed);
    } catch (err) {
      setError(err.message);
      // Try showing cached (even stale) data
      const stale = getCachedResults(cacheKey, 1440); // 24 hours
      if (stale) setPlaces(stale);
    } finally {
      setLoading(false);
    }
  }, [lat, lon, category, radiusKm]);

  useEffect(() => {
    fetch_();
  }, [fetch_]);

  return { places, loading, error, refetch: fetch_ };
}

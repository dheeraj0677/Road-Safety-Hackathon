/* ── Generic helpers ── */

export function getFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota exceeded – silently fail */
  }
}

/* ── Cache with TTL ── */

export function getCachedResults(key, maxAgeMinutes = 30) {
  const entry = getFromStorage(key);
  if (!entry || !entry.timestamp) return null;
  const age = (Date.now() - entry.timestamp) / 1000 / 60;
  return age < maxAgeMinutes ? entry.data : null;
}

export function cacheResults(key, data) {
  saveToStorage(key, { data, timestamp: Date.now() });
}

/* ── Settings ── */

const DEFAULT_SETTINGS = {
  unit: 'km',
  radiusKm: 5,
  country: 'IN',
};

export function getSettings() {
  return { ...DEFAULT_SETTINGS, ...getFromStorage('roadsos_settings') };
}

export function saveSettings(settings) {
  saveToStorage('roadsos_settings', settings);
}

/* ── Custom Emergency Contacts ── */

export function getCustomContacts() {
  return getFromStorage('roadsos_custom_contacts') || [];
}

export function saveCustomContacts(contacts) {
  saveToStorage('roadsos_custom_contacts', contacts);
}

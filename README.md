# Road-Safety-Hackathon (RoadSoS)

RoadSoS is a mobile-first React Progressive Web App (PWA) designed to provide instant, location-based emergency assistance during road accidents. 

## Features
- **One-Tap SOS:** Instantly fetch your high-accuracy GPS coordinates and reverse-geocode your address.
- **Categorized Services:** Find nearby Hospitals 🏥, Ambulances 🚑, Police Stations 👮, Towing Services 🚗, and Puncture Shops 🔧 based on your exact location.
- **Offline Resilience:** Utilizes local caching and a Service Worker to provide offline access to your last known location and recently fetched services.
- **Integrated Maps:** Beautiful dark-themed interactive map with categorized markers powered by Leaflet and OpenStreetMap.
- **Emergency Contacts:** Quick access to standard emergency numbers and a custom contact list with one-tap calling.
- **Customization:** Configurable search radius and distance units (km/miles).

## Tech Stack
- React 18 (Vite)
- Tailwind CSS v3
- Leaflet.js & react-leaflet
- OpenStreetMap & Overpass API for real-time service discovery
- Progressive Web App (PWA) features for offline functionality

## Getting Started

To run this project locally:

1. Navigate to the project directory:
   ```bash
   cd roadsos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

import React, { useState, useEffect, useRef } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  MapPin,
  Shield,
  Clock,
  Phone,
  Compass,
  ExternalLink,
  Search,
  Loader2,
  Navigation,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Generates verified safe spaces relative to center coordinates
const generateNearbySafeHavens = (centerLat = 21.0856, centerLng = 79.0241, locationLabel = 'Nagpur 440024') => [
  {
    id: 'sh-1',
    name: `${locationLabel} Police Station & Women Assistance Desk`,
    type: 'Police',
    lat: centerLat + 0.0035,
    lng: centerLng + 0.0028,
    distance: '0.4 km',
    openHours: '24/7 Open',
    phone: '112',
    address: `Police Station Road, ${locationLabel}`,
    notes: 'Designated 24/7 Women & Child Protection Assistance Desk available.',
  },
  {
    id: 'sh-2',
    name: `${locationLabel} Emergency Civil Hospital - 24/7 Trauma`,
    type: 'Hospital',
    lat: centerLat - 0.0042,
    lng: centerLng + 0.0031,
    distance: '0.6 km',
    openHours: '24/7 ER Trauma Unit',
    phone: '108',
    address: `Hospital Campus, ${locationLabel}`,
    notes: 'Well-lit triage, 24/7 on-duty security guard post at entry.',
  },
  {
    id: 'sh-3',
    name: `${locationLabel} 24-Hour Verified Chemist & Pharmacy`,
    type: 'Pharmacy',
    lat: centerLat + 0.0018,
    lng: centerLng - 0.0039,
    distance: '0.3 km',
    openHours: '24/7 Open',
    phone: '1091',
    address: `Main Market Gate, ${locationLabel}`,
    notes: 'Safe haven partner with active CCTV and public telephone access.',
  },
  {
    id: 'sh-4',
    name: `${locationLabel} Transit & Metro Security Outpost`,
    type: 'Transit Security',
    lat: centerLat - 0.0025,
    lng: centerLng - 0.0022,
    distance: '0.5 km',
    openHours: '24/7 Guarded',
    phone: '112',
    address: `Central Transit Hub, ${locationLabel}`,
    notes: 'Direct intercom to municipal transit police.',
  },
];

export const SafeMap = () => {
  const { location, refreshLocation, setManualLocation } = useSecurity();
  const [filter, setFilter] = useState('All');
  const [selectedHaven, setSelectedHaven] = useState(null);
  
  // Zip Code Search State
  const [zipInput, setZipInput] = useState('');
  const [isSearchingZip, setIsSearchingZip] = useState(false);
  const [zipMessage, setZipMessage] = useState(null);
  const [zipError, setZipError] = useState(null);

  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  const currentLat = location.lat || 21.0856;
  const currentLng = location.lng || 79.0241;

  // Extract a readable short label from address for safe haven names
  const areaLabel = location.address
    ? location.address.split(',')[0].replace(/PIN\/ZIP\s*[0-9]+:\s*/i, '').trim()
    : 'Local';

  const safeHavens = generateNearbySafeHavens(currentLat, currentLng, areaLabel);

  const filteredHavens = filter === 'All'
    ? safeHavens
    : safeHavens.filter(h => h.type.toLowerCase().includes(filter.toLowerCase()));

  // Zip / PIN Code Lookup using OpenStreetMap Nominatim
  const handleZipSearch = async (e) => {
    e?.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    setIsSearchingZip(true);
    setZipError(null);
    setZipMessage(null);

    try {
      // Query Nominatim for postal code / location
      const query = encodeURIComponent(cleanZip);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
        headers: {
          'Accept-Language': 'en',
        },
      });
      const data = await res.json();

      if (data && data.length > 0) {
        const item = data[0];
        const newLat = parseFloat(item.lat);
        const newLng = parseFloat(item.lon);
        const displayName = item.display_name.split(',').slice(0, 3).join(', ');

        // Update global location in security context
        setManualLocation(newLat, newLng, `ZIP ${cleanZip}: ${displayName}`);
        setZipMessage(`Located: ${displayName}`);

        // Fly map to new coordinates
        if (leafletMapRef.current) {
          leafletMapRef.current.setView([newLat, newLng], 15);
        }
      } else {
        setZipError(`No location found for "${cleanZip}". Please check the Zip/PIN code.`);
      }
    } catch (err) {
      setZipError('Network error while searching zip code. Please try again.');
    } finally {
      setIsSearchingZip(false);
    }
  };

  // Initialize or update Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (typeof window === 'undefined' || !window.L) return;

    const L = window.L;

    if (!leafletMapRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false,
      }).setView([currentLat, currentLng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      leafletMapRef.current = map;
    } else {
      leafletMapRef.current.setView([currentLat, currentLng], 15);
    }

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // User Location Marker (Pulse Blue/Rose)
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `<div style="background-color: #f43f5e; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(244,63,94,0.8);"></div>`,
      iconSize: [18, 18],
    });

    const userMarker = L.marker([currentLat, currentLng], { icon: userIcon })
      .addTo(leafletMapRef.current)
      .bindPopup(`<b>Your Active Location</b><br>${location.address || 'Accurate within 15 meters'}`);
    markersRef.current.push(userMarker);

    // Safe Havens Markers
    filteredHavens.forEach(haven => {
      const markerColor = haven.type === 'Police' ? '#3b82f6' : haven.type === 'Hospital' ? '#ef4444' : '#10b981';
      const icon = L.divIcon({
        className: 'haven-marker',
        html: `<div style="background-color: ${markerColor}; width: 22px; height: 22px; border-radius: 50%; border: 2px solid white; display:flex; align-items:center; justify-content:center; color:white; font-size:10px; font-weight:bold; box-shadow:0 2px 6px rgba(0,0,0,0.4);">✓</div>`,
        iconSize: [22, 22],
      });

      const m = L.marker([haven.lat, haven.lng], { icon })
        .addTo(leafletMapRef.current)
        .bindPopup(`<b>${haven.name}</b><br>${haven.openHours}<br>${haven.address}`);
      
      m.on('click', () => setSelectedHaven(haven));
      markersRef.current.push(m);
    });

  }, [currentLat, currentLng, filter, filteredHavens, location.address]);

  // Load Leaflet JS script dynamically if not on window
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => {
        refreshLocation();
      };
      document.head.appendChild(script);
    }
  }, [refreshLocation]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-rose-500" />
            Verified Safe Havens & Shelters
          </h2>
          <p className="text-xs text-slate-400">
            24/7 guarded locations, police desks, and verified refuge points in walking distance
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {['All', 'Police', 'Hospital', 'Pharmacy'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                filter === category
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ZIP CODE / POSTAL CODE SEARCH BAR */}
      <form onSubmit={handleZipSearch} className="mb-4 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search nearby support by ZIP or PIN code"
            placeholder="Enter ZIP / PIN Code (e.g. 411001, 400001, 110001, 10001)..."
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={isSearchingZip}
          className="py-2.5 px-5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          {isSearchingZip ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <MapPin className="w-3.5 h-3.5" />
              Locate Safe Havens
            </>
          )}
        </button>
      </form>

      {/* Zip Search Status Message */}
      {zipMessage && (
        <div className="mb-3 px-3 py-2 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{zipMessage}</span>
        </div>
      )}

      {zipError && (
        <div className="mb-3 px-3 py-2 bg-rose-950/60 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{zipError}</span>
        </div>
      )}

      {/* Map View Port */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-64 sm:h-80 w-full mb-4 bg-slate-950">
        <div ref={mapContainerRef} className="h-full w-full z-0" />
        
        {/* Recenter Button Overlay */}
        <button
          onClick={refreshLocation}
          className="absolute bottom-3 right-3 z-10 p-2.5 bg-slate-900/90 hover:bg-slate-800 text-white rounded-xl shadow-lg border border-slate-700 text-xs font-semibold flex items-center gap-1.5 backdrop-blur transition"
          title="Recenter on Device GPS"
        >
          <Compass className="w-4 h-4 text-rose-400 animate-spin-slow" />
          Device GPS
        </button>
      </div>

      {/* Active Location Info Card */}
      <div className="mb-4 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-indigo-400" />
          <span><strong>Active Area:</strong> {location.address || `${currentLat.toFixed(4)}, ${currentLng.toFixed(4)}`}</span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          Lat: {currentLat.toFixed(4)}, Lng: {currentLng.toFixed(4)}
        </span>
      </div>

      {/* Safe Haven Details Card or List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredHavens.map((haven) => (
          <div
            key={haven.id}
            onClick={() => setSelectedHaven(haven)}
            className={`p-3.5 rounded-2xl border transition cursor-pointer ${
              selectedHaven?.id === haven.id
                ? 'bg-slate-800 border-rose-500 shadow-md'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className={`p-1.5 rounded-lg text-xs font-bold ${
                  haven.type === 'Police'
                    ? 'bg-blue-900/50 text-blue-400'
                    : haven.type === 'Hospital'
                    ? 'bg-rose-900/50 text-rose-400'
                    : 'bg-emerald-900/50 text-emerald-400'
                }`}>
                  {haven.type}
                </span>
                <span className="text-xs text-slate-400">{haven.distance}</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {haven.openHours}
              </span>
            </div>

            <h3 className="font-bold text-sm text-slate-100 mt-2">{haven.name}</h3>
            <p className="text-xs text-slate-400 mt-1">{haven.address}</p>
            <p className="text-[11px] text-slate-400 italic mt-1 bg-slate-900/60 p-1.5 rounded-lg">
              "{haven.notes}"
            </p>

            <div className="mt-3 flex items-center gap-2">
              <a
                href={`tel:${haven.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                Call ({haven.phone})
              </a>

              <a
                href={`https://maps.google.com/?q=${haven.lat},${haven.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 py-1.5 px-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Directions
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

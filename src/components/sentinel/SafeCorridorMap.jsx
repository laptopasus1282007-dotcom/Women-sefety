import React, { useState, useEffect, useRef } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Compass,
  MapPin,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Video,
  Navigation,
  CheckCircle2,
  Phone,
  Layers,
  ArrowRight,
} from 'lucide-react';

const SAFE_HAVENS = [
  {
    id: 'sh-1',
    name: 'Nagpur Police Commissionerate - Women Cell',
    type: 'Police',
    lat: 21.0886,
    lng: 79.0261,
    distance: '0.4 km',
    openHours: '24/7 Active',
    phone: '112',
    lighting: 'High (LED Mast)',
    cctv: 'Continuous Govt. CCTV',
    corridor: 'Green Safe Corridor',
  },
  {
    id: 'sh-2',
    name: 'Pink Police Assistance Booth (Damini Squad Post)',
    type: 'Pink Booth',
    lat: 21.0831,
    lng: 79.0285,
    distance: '0.3 km',
    openHours: '24/7 Female Staff',
    phone: '1090',
    lighting: 'High',
    cctv: 'Active 360° Cameras',
    corridor: 'Green Safe Corridor',
  },
  {
    id: 'sh-3',
    name: 'Apollo 24/7 Verified Emergency Chemist',
    type: 'Pharmacy',
    lat: 21.0872,
    lng: 79.0205,
    distance: '0.5 km',
    openHours: '24/7 Open',
    phone: '1091',
    lighting: 'Well-lit Commercial',
    cctv: 'Shop Entrance CCTV',
    corridor: 'Commercial Hub',
  },
  {
    id: 'sh-4',
    name: 'Metro Station North Gate (CISF Security Post)',
    type: 'Transit Security',
    lat: 21.0825,
    lng: 79.0221,
    distance: '0.6 km',
    openHours: 'Guarded until last train + 24/7 Security Gate',
    phone: '139',
    lighting: 'High Fluorescent',
    cctv: 'Metro Surveillance Network',
    corridor: 'Green Safe Corridor',
  },
];

export const SafeCorridorMap = () => {
  const { location } = useSecurity();
  const [filter, setFilter] = useState('All');
  const [selectedHaven, setSelectedHaven] = useState(SAFE_HAVENS[0]);
  const [routeMode, setRouteMode] = useState('safe'); // 'safe' | 'fast'
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const userLat = location.lat || 21.0856;
  const userLng = location.lng || 79.0241;

  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = window.L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false,
      }).setView([userLat, userLng], 15);

      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // User position beacon
    const userIcon = window.L.divIcon({
      className: 'user-marker',
      html: `
        <div style="position: relative; width: 20px; height: 20px;">
          <div style="position: absolute; inset: -8px; background: rgba(56, 189, 248, 0.25); border-radius: 999px; animation: ping 1.8s infinite;"></div>
          <div style="width: 20px; height: 20px; background: #0ea5e9; border: 3px solid #ffffff; border-radius: 999px; box-shadow: 0 0 12px rgba(14, 165, 233, 0.8);"></div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    const userMarker = window.L.marker([userLat, userLng], { icon: userIcon })
      .addTo(map)
      .bindPopup('<b style="color: #000;">You Are Here</b><br><span style="font-size:11px; color:#444;">Live GPS Location</span>');
    markersRef.current.push(userMarker);

    // Filter safe havens
    const filteredHavens = SAFE_HAVENS.filter(
      (h) => filter === 'All' || h.type === filter
    );

    filteredHavens.forEach((h) => {
      const color = h.type === 'Pink Booth' ? '#f43f5e' : h.type === 'Police' ? '#3b82f6' : '#10b981';
      const havenIcon = window.L.divIcon({
        className: 'haven-marker',
        html: `
          <div style="width: 28px; height: 28px; background: #0f172a; border: 2px solid ${color}; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
            <div style="width: 10px; height: 10px; background: ${color}; border-radius: 999px;"></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = window.L.marker([h.lat, h.lng], { icon: havenIcon })
        .addTo(map)
        .bindPopup(`
          <div style="color: #0f172a; min-width: 160px; font-family: sans-serif;">
            <b style="font-size: 13px;">${h.name}</b><br/>
            <span style="font-size: 11px; color: #64748b;">${h.distance} away • ${h.openHours}</span><br/>
            <span style="font-size: 11px; font-weight: bold; color: ${color};">${h.corridor}</span>
          </div>
        `);

      marker.on('click', () => setSelectedHaven(h));
      markersRef.current.push(marker);
    });

    // Draw Route Polylines
    if (routeMode === 'safe') {
      // Safe Green Lit Corridor (via main avenues & police booth)
      const safeCoords = [
        [userLat, userLng],
        [userLat + 0.0015, userLng + 0.001],
        [21.0886, 79.0261],
      ];
      const safeLine = window.L.polyline(safeCoords, {
        color: '#10b981',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(map);
      markersRef.current.push(safeLine);
    } else {
      // Direct Dark Cut (Through isolated alley)
      const fastCoords = [
        [userLat, userLng],
        [userLat + 0.0025, userLng - 0.001],
        [21.0886, 79.0261],
      ];
      const fastLine = window.L.polyline(fastCoords, {
        color: '#f59e0b',
        weight: 4,
        opacity: 0.7,
      }).addTo(map);
      markersRef.current.push(fastLine);
    }
  }, [userLat, userLng, filter, routeMode]);

  return (
    <div className="sentinel-card p-6 border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Safe-Corridor & Street Light Heatmap</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time illuminated routes, verified 24/7 pink booths, and CCTV coverage index
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {['All', 'Police', 'Pink Booth', 'Pharmacy'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filter === type
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Route Mode Toggle Bar */}
      <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300">Choose Route Guidance:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setRouteMode('safe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                routeMode === 'safe'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-yellow-300" />
              Green Safe Corridor (96% Lit)
            </button>
            <button
              onClick={() => setRouteMode('fast')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                routeMode === 'fast'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
              Fast Direct (Isolated Alleys)
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          {routeMode === 'safe' ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Recommended: 2 Police booths + 100% CCTV on route
            </span>
          ) : (
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Caution: 3 dark unmonitored street stretches
            </span>
          )}
        </div>
      </div>

      {/* Map Display */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-80 sm:h-96 w-full bg-slate-950">
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>

      {/* Safe Haven Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SAFE_HAVENS.map((h) => {
          const isSelected = selectedHaven?.id === h.id;
          return (
            <div
              key={h.id}
              onClick={() => setSelectedHaven(h)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/50 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                  {h.type}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">{h.distance}</span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-1">{h.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1">{h.openHours}</p>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 flex items-center gap-1">
                  <Video className="w-3 h-3 text-blue-400" /> {h.cctv.split(' ')[0]}
                </span>
                <a
                  href={`tel:${h.phone}`}
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" /> {h.phone}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

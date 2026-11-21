import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { VolumeX, Zap, AlertTriangle, ShieldAlert } from 'lucide-react';

export const SirenStrobeModal = () => {
  const { isSirenActive, toggleSiren } = useSecurity();
  const [strobeEnabled, setStrobeEnabled] = useState(true);

  if (!isSirenActive) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 select-none ${
        strobeEnabled ? 'strobe-screen' : 'bg-rose-950 text-white'
      }`}
    >
      {/* Top Banner */}
      <div className="w-full max-w-md pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 rounded-full border border-rose-500 text-rose-400 text-xs font-bold tracking-wider uppercase">
          <ShieldAlert className="w-4 h-4 animate-spin text-rose-500" />
          Acoustic Siren Active
        </div>

        <button
          onClick={() => setStrobeEnabled(!strobeEnabled)}
          className="px-3 py-1.5 bg-black/80 text-white rounded-full text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          {strobeEnabled ? 'Disable Flash' : 'Enable Flash'}
        </button>
      </div>

      {/* Center Alarm Icon & Guidance */}
      <div className="text-center max-w-sm px-4">
        <div className="w-32 h-32 mx-auto rounded-full bg-rose-600 border-4 border-white flex items-center justify-center shadow-2xl animate-pulse">
          <AlertTriangle className="w-16 h-16 text-white" />
        </div>
        
        <h2 className="text-3xl font-black mt-6 tracking-tight drop-shadow-md text-red-600 bg-white/90 px-4 py-1 rounded-xl inline-block">
          DETERRENT ACTIVE
        </h2>

        <p className="text-sm font-bold mt-4 text-black bg-white/80 p-3 rounded-xl shadow-md">
          Hold device high in the air to draw public attention and repel aggressors.
        </p>
      </div>

      {/* Stop Siren Button */}
      <div className="w-full max-w-md pb-8">
        <button
          onClick={toggleSiren}
          className="w-full py-5 px-6 bg-black hover:bg-slate-900 active:scale-95 text-white font-extrabold text-lg rounded-2xl border-2 border-white shadow-2xl flex items-center justify-center gap-3 transition"
        >
          <VolumeX className="w-7 h-7 text-rose-500" />
          DISARM / STOP SIREN
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  ShieldAlert,
  PhoneCall,
  Volume2,
  VolumeX,
  EyeOff,
  Radio,
  MapPin,
  Flame
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const {
    startSosCountdown,
    triggerFakeCall,
    isSirenActive,
    toggleSiren,
    setIsDecoyActive,
    location
  } = useSecurity();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & GPS status */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-900/30">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">Narishakti-Safety</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50">PRO</span>
              </div>
              <span className="text-[11px] text-slate-400 block -mt-0.5">Women's Safety & Digital Shield</span>
            </div>
          </div>

          {/* GPS Quick Badge (mobile) */}
          <div className="flex md:hidden items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/20 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GPS ±{location.accuracy || 15}m</span>
          </div>
        </div>

        {/* Tactical Emergency Action Bar */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end overflow-x-auto no-scrollbar py-0.5">
          
          {/* GPS status (desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GPS Active (±{location.accuracy || 15}m)</span>
          </div>

          {/* Fake Call Trigger */}
          <button
            onClick={() => triggerFakeCall('भाई', '+91 98765 43210')}
            className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition active:scale-95 shadow-sm whitespace-nowrap"
            title="Simulate realistic incoming phone call"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fake Call</span>
          </button>

          {/* Siren / Strobe Toggle */}
          <button
            onClick={toggleSiren}
            className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition active:scale-95 shadow-sm whitespace-nowrap ${
              isSirenActive
                ? 'bg-amber-500 text-slate-950 border-amber-400 animate-bounce'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title="High-decibel acoustic siren & strobe"
          >
            {isSirenActive ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-rose-400" />}
            <span>{isSirenActive ? 'Silence Siren' : 'Siren'}</span>
          </button>

          {/* Camouflage / Decoy Mode Switch */}
          <button
            onClick={() => setIsDecoyActive(true)}
            className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition active:scale-95 shadow-sm whitespace-nowrap"
            title="Quick disguise into functional calculator (Press 'Esc')"
          >
            <EyeOff className="w-3.5 h-3.5 text-indigo-400" />
            <span>Disguise</span>
          </button>

          {/* Rapid SOS Trigger Button */}
          <button
            onClick={startSosCountdown}
            className="py-2 px-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-black tracking-wide rounded-xl shadow-lg shadow-rose-900/40 flex items-center gap-1.5 transition active:scale-95 border border-rose-500 whitespace-nowrap animate-pulse"
            title="Activate Emergency SOS Protocol"
          >
            <Radio className="w-4 h-4 animate-spin-slow" />
            <span>SOS DISTRESS</span>
          </button>
        </div>

      </div>
    </header>
  );
};

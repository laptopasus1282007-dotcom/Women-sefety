import React, { useState, useEffect } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Radio,
  EyeOff,
  BatteryCharging,
  Compass,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const HeroSentinel = () => {
  const {
    startSosCountdown,
    isSirenActive,
    toggleSiren,
    location,
    contacts,
    triggerImmediateSos,
  } = useSecurity();

  const [silentMode, setSilentMode] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(88);

  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      }).catch(() => {});
    }
  }, []);

  const activateSilentPanic = () => {
    setSilentMode(true);
    triggerImmediateSos();
    if (navigator.vibrate) {
      navigator.vibrate([80, 50, 80]);
    }
  };

  return (
    <>
      {/* PITCH BLACK SILENT PANIC OVERLAY */}
      {silentMode && (
        <div
          onClick={() => setSilentMode(false)}
          className="silent-overlay cursor-pointer p-6 text-center select-none"
        >
          <div className="opacity-15 hover:opacity-40 transition flex flex-col items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <p className="text-xs font-mono text-slate-400">
              Silent Telemetry Active • Tap anywhere to exit silent screen
            </p>
          </div>
        </div>
      )}

      {/* REGULAR HERO SENTINEL HUD */}
      <div className="sentinel-card p-6 md:p-8 mb-6 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left Column: Telemetry & Safety Status */}
          <div className="space-y-4 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 beacon-active" />
                SENTINEL ACTIVE • HIGH SECURITY
              </span>

              <span className="telemetry-chip">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                GPS: {location.address ? location.address.split(',')[0] : 'Locked'}
              </span>

              <span className="telemetry-chip">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                {batteryLevel}%
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Autonomous Safety & Crisis Sentinel
              </h1>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Live geofencing, AI lit-corridor routing, zero-latency emergency dispatch, and legally verifiable evidence preservation.
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-400 block font-medium">Guardian Mesh</span>
                <span className="text-lg font-bold text-white mt-0.5 block">{contacts.length} Active</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-400 block font-medium">Nearest Police</span>
                <span className="text-lg font-bold text-white mt-0.5 block">0.4 km</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-400 block font-medium">Safe Corridor</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5 block">94% Safe</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tactical Action Triggers */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[280px]">
            <button
              onClick={startSosCountdown}
              className="btn-emergency py-4 px-6 text-sm flex items-center justify-center gap-2.5 shadow-xl transition active:scale-95 group"
            >
              <Radio className="w-5 h-5 group-hover:scale-110 transition" />
              <span>Broadcast Emergency SOS</span>
            </button>

            <button
              onClick={activateSilentPanic}
              className="btn-secondary py-3 px-5 text-xs flex items-center justify-center gap-2"
              title="Turns screen black and silently starts streaming location and audio"
            >
              <EyeOff className="w-4 h-4 text-slate-400" />
              <span>Silent Panic (Black Screen Mode)</span>
            </button>

            <button
              onClick={toggleSiren}
              className={`py-3 px-5 text-xs rounded-xl font-semibold border transition flex items-center justify-center gap-2 ${
                isSirenActive
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              {isSirenActive ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSirenActive ? 'Silence Deterrent Siren' : 'Sound High-Decibel Siren'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

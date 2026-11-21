import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import confetti from 'canvas-confetti';
import {
  Clock,
  ShieldCheck,
  Plus,
  X,
  Navigation,
  AlertTriangle,
  HeartHandshake,
  Check,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const WalkWithMeTimer = () => {
  const { walkTimer, startWalkTimer, stopWalkTimer, addWalkTime, masterPin } = useSecurity();
  const [selectedMinutes, setSelectedMinutes] = useState(15);
  const [destinationInput, setDestinationInput] = useState('');
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [errorPin, setErrorPin] = useState(false);

  const presets = [5, 10, 15, 20, 30, 45];

  const handleStart = (e) => {
    e.preventDefault();
    startWalkTimer(selectedMinutes, destinationInput);
  };

  const handleSafeArrival = (e) => {
    e.preventDefault();
    if (stopWalkTimer(enteredPin)) {
      setPinModalOpen(false);
      setEnteredPin('');
      setErrorPin(false);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setErrorPin(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent =
    walkTimer.totalSeconds > 0
      ? Math.max(0, Math.min(100, ((walkTimer.totalSeconds - walkTimer.remainingSeconds) / walkTimer.totalSeconds) * 100))
      : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Walk With Me • Companion Escort
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                Auto-SOS Safety
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Triggers automatic emergency alert if you do not check in safely before timer ends
            </p>
          </div>
        </div>

        {walkTimer.isActive && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Active Journey Escort
          </span>
        )}
      </div>

      {!walkTimer.isActive ? (
        /* Configuration Form */
        <form onSubmit={handleStart} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              Expected Journey Duration
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presets.map((mins) => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => setSelectedMinutes(mins)}
                  className={`py-2.5 rounded-xl font-black text-xs transition active:scale-95 ${
                    selectedMinutes === mins
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              Destination / Route (Optional Note)
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                placeholder="e.g. Metro station to home, night cab to hostel..."
                className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-lg shadow-rose-600/25 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" /> Start Safety Escort Timer ({selectedMinutes} mins)
          </button>
        </form>
      ) : (
        /* Active Timer HUD */
        <div className="space-y-5">
          <div className="p-6 bg-slate-950/80 border border-slate-800 rounded-2xl text-center relative overflow-hidden">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
              Time Remaining to Check In
            </p>
            <div className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight my-2">
              {formatTime(walkTimer.remainingSeconds)}
            </div>

            {walkTimer.destination && (
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> Destination: {walkTimer.destination}
              </p>
            )}

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-rose-500 h-2 transition-all duration-1000 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Extend Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => addWalkTime(5)}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> 5 min
            </button>
            <button
              onClick={() => addWalkTime(10)}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> 10 min
            </button>
            <button
              onClick={() => setPinModalOpen(true)}
              className="flex-[2] py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30"
            >
              <Check className="w-4 h-4" /> I Have Arrived Safely
            </button>
          </div>
        </div>
      )}

      {/* Safe Arrival PIN Modal */}
      {pinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Enter PIN to End Escort
              </h3>
              <button
                onClick={() => setPinModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Enter your master safety PIN to confirm you reached your destination safely.
            </p>
            <form onSubmit={handleSafeArrival} className="space-y-4">
              <input
                type="password"
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setErrorPin(false);
                }}
                placeholder="Default: 1234"
                maxLength={8}
                autoFocus
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-center text-xl tracking-widest text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
              {errorPin && (
                <p className="text-xs text-rose-400 font-medium text-center">
                  Incorrect PIN. Try again.
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition"
                >
                  Confirm Safe Arrival
                </button>
                <button
                  type="button"
                  onClick={() => setPinModalOpen(false)}
                  className="px-4 py-3 bg-slate-800 text-slate-400 rounded-xl text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

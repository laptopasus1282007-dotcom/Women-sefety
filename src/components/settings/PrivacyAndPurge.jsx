import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Trash2, ShieldOff, AlertTriangle, Lock, CheckCircle, Eye, EyeOff, KeyRound, Database, Cloud } from 'lucide-react';
import { isSupabaseConfigured } from '../../utils/supabaseClient';

export const PrivacyAndPurge = () => {
  const { purgeAllData, masterPin, setMasterPin } = useSecurity();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [purged, setPurged] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showCurrentPin, setShowCurrentPin] = useState(false);

  const handlePurge = () => {
    if (confirmText.toLowerCase() === 'delete everything') {
      purgeAllData();
      setPurged(true);
      setConfirmOpen(false);
    }
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    if (newPin.length >= 4) {
      setMasterPin(newPin);
      setNewPin('');
      setPinSaved(true);
      setTimeout(() => setPinSaved(false), 3000);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur space-y-7">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-slate-500/20 text-slate-400 rounded-2xl border border-slate-500/30">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Privacy & Security Controls</h2>
          <p className="text-xs text-slate-400">Manage your master PIN and emergency data purge options.</p>
        </div>
      </div>

      {/* Cloud & Supabase Sync Status */}
      <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/15 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Cloud className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white flex items-center gap-2">
              Supabase Cloud Backend
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${isSupabaseConfigured ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                {isSupabaseConfigured ? 'Connected & Active' : 'Offline-First Encrypted'}
              </span>
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isSupabaseConfigured
                ? 'Incident records and emergency alerts sync safely with your Supabase DB.'
                : 'Zero-knowledge on-device storage. Data never leaves without your consent.'}
            </p>
          </div>
        </div>
      </div>

      {/* Change PIN */}
      <div className="p-5 bg-slate-950/60 border border-slate-700/60 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Change Master Safety PIN</h3>
        </div>
        <div className="mb-3 p-3 bg-slate-900/60 border border-slate-700 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Current Safety PIN</p>
            <p className="text-sm font-mono font-bold text-white tracking-widest">
              {showCurrentPin ? masterPin : '•'.repeat(masterPin.length)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCurrentPin(!showCurrentPin)}
            className="p-2 text-slate-400 hover:text-white transition"
          >
            {showCurrentPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <form onSubmit={handleSavePin} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type={showPin ? 'text' : 'password'}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 8))}
              placeholder="Enter new PIN (min 4 digits)"
              maxLength={8}
              inputMode="numeric"
              className="w-full px-4 py-2.5 pr-10 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button
            type="submit"
            disabled={newPin.length < 4}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-1.5 ${
              pinSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white'
            }`}
          >
            {pinSaved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : 'Update PIN'}
          </button>
        </form>
        <p className="text-[10px] text-slate-500 mt-2">
          Used to verify safe arrival and exit decoy calculator mode.
        </p>
      </div>

      {/* Emergency Purge */}
      <div className="p-5 bg-rose-950/30 border border-rose-500/20 rounded-2xl">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-rose-300">Emergency Data Purge</h3>
            <p className="text-xs text-slate-400 mt-1">
              Instantly wipe ALL saved contacts, incident notes, PIN, and app settings from this device.
            </p>
          </div>
        </div>

        {purged ? (
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <CheckCircle className="w-5 h-5" />
            All local data wiped cleanly. Refreshing security profile.
          </div>
        ) : !confirmOpen ? (
          <button
            onClick={() => setConfirmOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/30 text-rose-400 rounded-xl text-sm font-semibold transition"
          >
            <ShieldOff className="w-4 h-4" /> Initiate Emergency Purge
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-rose-300 font-semibold">
              Type <span className="font-mono bg-rose-950 px-1.5 py-0.5 rounded text-rose-200">"delete everything"</span> to confirm:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='Type: delete everything'
              className="w-full px-4 py-2.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-sm text-rose-200 placeholder:text-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
            />
            <div className="flex gap-2">
              <button
                onClick={handlePurge}
                disabled={confirmText.toLowerCase() !== 'delete everything'}
                className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition"
              >
                <Trash2 className="w-4 h-4" /> Purge All Data
              </button>
              <button
                onClick={() => { setConfirmOpen(false); setConfirmText(''); }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

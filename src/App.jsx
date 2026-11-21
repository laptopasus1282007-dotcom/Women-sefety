import React, { useState } from 'react';
import { SecurityProvider } from './context/SecurityContext';
import { HeroSentinel } from './components/sentinel/HeroSentinel';
import { SafeCorridorMap } from './components/sentinel/SafeCorridorMap';
import { VoiceSentinel } from './components/sentinel/VoiceSentinel';
import { ZeroFirGenerator } from './components/sentinel/ZeroFirGenerator';
import { GuardianMesh } from './components/sentinel/GuardianMesh';
import { ForensicVault } from './components/sentinel/ForensicVault';
import { EmergencyGrid } from './components/sentinel/EmergencyGrid';
import { SosTriggerModal } from './components/sos/SosTriggerModal';
import { SirenStrobeModal } from './components/emergency/SirenStrobeModal';
import {
  ShieldAlert,
  Radio,
  Compass,
  Mic,
  Scale,
  Users,
  Lock,
  Phone,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import './App.css';

const TABS = [
  { id: 'sentinel', label: 'Crisis Sentinel', icon: ShieldAlert },
  { id: 'corridor', label: 'Safe Corridors', icon: Compass },
  { id: 'voice', label: 'Voice Listener', icon: Mic },
  { id: 'legal', label: 'Zero-FIR Legal Shield', icon: Scale },
  { id: 'mesh', label: 'Guardian Mesh', icon: Users },
  { id: 'vault', label: 'Forensic Vault', icon: Lock },
];

function MainContent() {
  const [activeTab, setActiveTab] = useState('sentinel');

  return (
    <div className="app-container min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="sentinel-header px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600/15 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-md">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
              ABHAYA SENTINEL
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
                v4.0 PRO
              </span>
            </span>
            <span className="text-[11px] text-slate-400 block -mt-0.5">
              Next-Gen Autonomous Women Safety Infrastructure
            </span>
          </div>
        </div>

        {/* Quick Hotline Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="tel:112"
            className="py-1.5 px-3.5 bg-rose-600/90 hover:bg-rose-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow transition active:scale-95"
          >
            <Phone className="w-3.5 h-3.5" /> Direct ERSS: 112
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Apple/Stripe-style Segmented Tab Switcher */}
        <nav className="tab-switcher no-scrollbar" aria-label="Safety navigation">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`tab-btn ${isActive ? 'tab-btn-active' : ''}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Active Module View */}
        {activeTab === 'sentinel' && (
          <div className="space-y-6 animate-fade-in">
            <HeroSentinel />
            <EmergencyGrid />
          </div>
        )}

        {activeTab === 'corridor' && (
          <div className="animate-fade-in">
            <SafeCorridorMap />
          </div>
        )}

        {activeTab === 'voice' && (
          <div className="animate-fade-in">
            <VoiceSentinel />
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="animate-fade-in">
            <ZeroFirGenerator />
          </div>
        )}

        {activeTab === 'mesh' && (
          <div className="animate-fade-in">
            <GuardianMesh />
          </div>
        )}

        {activeTab === 'vault' && (
          <div className="animate-fade-in">
            <ForensicVault />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500">
        <p className="flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          Abhaya Sentinel • Built with strict digital integrity & verified legal protections.
        </p>
      </footer>

      {/* Emergency Crisis Modals */}
      <SosTriggerModal />
      <SirenStrobeModal />
    </div>
  );
}

export default function App() {
  return (
    <SecurityProvider>
      <MainContent />
    </SecurityProvider>
  );
}

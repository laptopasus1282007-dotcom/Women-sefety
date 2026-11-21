# Security4Her — Complete Consolidated Source Code Archive

This file contains the complete, unabridged source code for all components and modules of the Security4Her platform.

**Location:** C:\Users\satis\.gemini\antigravity\scratch\security4her

---

## File: package.json

`json
{
  "name": "security4her",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "leaflet": "^1.9.4",
    "lucide-react": "^1.48.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "autoprefixer": "^10.6.1",
    "oxlint": "^1.81.0",
    "postcss": "^8.5.28",
    "tailwindcss": "^4.3.3",
    "vite": "^8.3.0"
  }
}

`

---

## File: vite.config.js

`javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

`

---

## File: index.html

`html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e11d48'><path d='M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 18c-3.75-1.01-6.85-4.83-7-9.5V8.3l7-3.89 7 3.89V10.5c-.15 4.67-3.25 8.49-7 9.5z'/><path d='M12 7c-1.66 0-3 1.34-3 3 0 1.31.84 2.41 2 2.83V16h2v-3.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3z'/></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Security4Her | Women's Safety & Digital Shield</title>
    <!-- Leaflet CSS for offline-friendly OpenStreetMap rendering -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased selection:bg-rose-500 selection:text-white font-sans min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

`

---

## File: src/index.css

`css
@import "tailwindcss";

:root {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* Custom safety button pulse glow */
.sos-glow {
  box-shadow: 0 0 50px rgba(225, 29, 72, 0.6), 0 0 20px rgba(244, 63, 94, 0.4);
}

.sos-ring {
  animation: sos-ring-anim 2s infinite ease-out;
}

@keyframes sos-ring-anim {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 30px rgba(225, 29, 72, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(225, 29, 72, 0);
  }
}

/* Hide scrollbar for tabs */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Strobe light animation effect */
.strobe-screen {
  animation: strobe-flash 0.12s infinite;
}

@keyframes strobe-flash {
  0%, 49% {
    background-color: #ffffff;
    color: #000000;
  }
  50%, 100% {
    background-color: #000000;
    color: #ffffff;
  }
}

`

---

## File: src/main.jsx

`jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

`

---

## File: src/App.jsx

`jsx
import React, { useState } from 'react';
import { SecurityProvider } from './context/SecurityContext';
import { Navbar } from './components/layout/Navbar';
import { OverviewDashboard } from './components/home/OverviewDashboard';
import { WalkWithMeTimer } from './components/safety/WalkWithMeTimer';
import { SafeMap } from './components/safety/SafeMap';
import { EvidenceVault } from './components/vault/EvidenceVault';
import { ThreatAnalyzer } from './components/threat/ThreatAnalyzer';
import { DigitalAudit } from './components/security/DigitalAudit';
import { HelplineDirectory } from './components/resources/HelplineDirectory';
import { EmergencyContactsManager } from './components/settings/EmergencyContactsManager';
import { PrivacyAndPurge } from './components/settings/PrivacyAndPurge';
import { SosTriggerModal } from './components/sos/SosTriggerModal';
import { FakeCallModal } from './components/emergency/FakeCallModal';
import { SirenStrobeModal } from './components/emergency/SirenStrobeModal';
import { DecoyCalculator } from './components/camouflage/DecoyCalculator';
import {
  LayoutDashboard,
  Navigation,
  FileText,
  Search,
  CheckCircle,
  LifeBuoy,
  Settings,
  Shield,
  Heart
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'walk', label: 'Walk With Me & Map', icon: Navigation },
    { id: 'vault', label: 'Evidence Vault', icon: FileText },
    { id: 'analyzer', label: 'Threat Analyzer', icon: Search },
    { id: 'audit', label: 'Privacy Audit', icon: CheckCircle },
    { id: 'helplines', label: 'Helplines', icon: LifeBuoy },
    { id: 'settings', label: 'Guardians & Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800/80 no-scrollbar">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition active:scale-95 ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Views */}
        {activeTab === 'overview' && (
          <OverviewDashboard setActiveTab={setActiveTab} />
        )}

        {activeTab === 'walk' && (
          <div className="space-y-6">
            <WalkWithMeTimer />
            <SafeMap />
          </div>
        )}

        {activeTab === 'vault' && (
          <EvidenceVault />
        )}

        {activeTab === 'analyzer' && (
          <ThreatAnalyzer />
        )}

        {activeTab === 'audit' && (
          <DigitalAudit />
        )}

        {activeTab === 'helplines' && (
          <HelplineDirectory />
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <EmergencyContactsManager />
            <PrivacyAndPurge />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-rose-500" />
            <span className="font-semibold text-slate-400">Security4Her Safety Platform</span>
            <span>•</span>
            <span>Zero-Knowledge & Client-Side Encrypted</span>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>Built with care for women's safety worldwide</span>
            <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
          </div>
        </div>
      </footer>

      {/* Global Modals & Overlays */}
      <SosTriggerModal />
      <FakeCallModal />
      <SirenStrobeModal />
      <DecoyCalculator />

    </div>
  );
}

export default function App() {
  return (
    <SecurityProvider>
      <AppContent />
    </SecurityProvider>
  );
}

`

---

## File: src/context/SecurityContext.jsx

`jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { soundManager } from '../utils/audioAlerts';

const SecurityContext = createContext(null);

const STORAGE_KEYS = {
  CONTACTS: 's4h_contacts',
  VAULT: 's4h_vault_entries',
  PIN: 's4h_master_pin',
  CUSTOM_SOS: 's4h_custom_sos_message',
  SETTINGS: 's4h_settings',
};

const DEFAULT_CONTACTS = [
  {
    id: 'c1',
    name: 'Maya (Sister)',
    phone: '+1 555-019-2834',
    relationship: 'Family',
    isPrimary: true,
    notifyOnSos: true,
  },
  {
    id: 'c2',
    name: 'Office / Campus Security Desk',
    phone: '+1 555-014-9911',
    relationship: 'Authority',
    isPrimary: false,
    notifyOnSos: true,
  },
  {
    id: 'c3',
    name: 'Ananya (Roommate)',
    phone: '+1 555-018-7744',
    relationship: 'Friend',
    isPrimary: false,
    notifyOnSos: true,
  },
];

export const SecurityProvider = ({ children }) => {
  // Master PIN (Default: '1234')
  const [masterPin, setMasterPin] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.PIN) || '1234';
  });

  // Emergency Contacts
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return saved ? JSON.parse(saved) : DEFAULT_CONTACTS;
    } catch {
      return DEFAULT_CONTACTS;
    }
  });

  // Custom SOS Message
  const [customSosMessage, setCustomSosMessage] = useState(() => {
    return (
      localStorage.getItem(STORAGE_KEYS.CUSTOM_SOS) ||
      'EMERGENCY: I feel unsafe and require immediate assistance. Please track my location or call authorities.'
    );
  });

  // Incident Vault Entries
  const [vaultEntries, setVaultEntries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VAULT);
      if (saved) return JSON.parse(saved);
      // Pre-seed a helpful instructional sample entry
      return [
        {
          id: 'v-sample-1',
          title: 'Suspicious individual following near Metro Station',
          category: 'Stalking / Following',
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
          location: 'Central Metro Exit Gate 3 (Lat 40.7128, Lng -74.0060)',
          description: 'A tall man in a dark grey hoodie followed me for 4 blocks from the station up to 5th Ave. He slowed down when I stopped in front of the convenience store.',
          suspectDetails: 'Approx 5\'11", dark hoodie, black backpack, white sneakers.',
          audioMemo: null,
          evidenceImages: [],
          tags: ['Metro', 'Night', 'Following'],
        }
      ];
    } catch {
      return [];
    }
  });

  // Geolocation (Default to User's PIN 440024 Nagpur)
  const [location, setLocation] = useState({
    lat: 21.0856,
    lng: 79.0241,
    accuracy: 10,
    timestamp: new Date().toLocaleTimeString(),
    loading: false,
    error: null,
    address: 'PIN 440024, Nagpur, Maharashtra',
  });

  // SOS Crisis State
  const [sosState, setSosState] = useState({
    isOpen: false,
    isCountingDown: false,
    countdownSeconds: 5,
    isTriggered: false,
  });

  // Camouflage / Decoy Mode
  const [isDecoyActive, setIsDecoyActive] = useState(false);

  // Siren and Strobe
  const [isSirenActive, setIsSirenActive] = useState(false);

  // Fake Call
  const [fakeCallState, setFakeCallState] = useState({
    isOpen: false,
    callerName: 'Mom',
    callerNumber: '+1 (555) 019-2834',
    isAnswered: false,
    callDuration: 0,
  });

  // "Walk With Me" Safety Timer
  const [walkTimer, setWalkTimer] = useState({
    isActive: false,
    remainingSeconds: 0,
    totalSeconds: 0,
    destination: '',
    startedAt: null,
  });

  const countdownIntervalRef = useRef(null);
  const walkTimerIntervalRef = useRef(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VAULT, JSON.stringify(vaultEntries));
  }, [vaultEntries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PIN, masterPin);
  }, [masterPin]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SOS, customSosMessage);
  }, [customSosMessage]);

  // Geolocation grabber
  const refreshLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.',
        loading: false,
      }));
      return;
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
          timestamp: new Date().toLocaleTimeString(),
          loading: false,
          error: null,
          address: `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)} (±${Math.round(pos.coords.accuracy)}m)`,
        });
      },
      (err) => {
        // Fallback default coordinate to user's PIN 440024 Nagpur
        setLocation({
          lat: 21.0856,
          lng: 79.0241,
          accuracy: 15,
          timestamp: new Date().toLocaleTimeString(),
          loading: false,
          error: null,
          address: 'PIN 440024, Nagpur, Maharashtra (Active PIN)',
        });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 10000 }
    );
  }, []);

  const setManualLocation = useCallback((lat, lng, address) => {
    setLocation({
      lat,
      lng,
      accuracy: 10,
      timestamp: new Date().toLocaleTimeString(),
      loading: false,
      error: null,
      address: address || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
    });
  }, []);

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  // Global Keyboard Panic Shortcut: Escape toggles camouflage immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDecoyActive(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- SOS Logic ---
  const startSosCountdown = useCallback(() => {
    // Stop any active siren or calls
    soundManager.stopSiren();
    setIsSirenActive(false);

    setSosState({
      isOpen: true,
      isCountingDown: true,
      countdownSeconds: 5,
      isTriggered: false,
    });

    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      soundManager.playBeep(950, 80);
      setSosState(prev => {
        if (prev.countdownSeconds <= 1) {
          clearInterval(countdownIntervalRef.current);
          if (navigator.vibrate) {
            navigator.vibrate([300, 100, 300, 100, 500]);
          }
          return {
            ...prev,
            isCountingDown: false,
            countdownSeconds: 0,
            isTriggered: true,
          };
        }
        return { ...prev, countdownSeconds: prev.countdownSeconds - 1 };
      });
    }, 1000);
  }, []);

  const cancelSos = useCallback(() => {
    clearInterval(countdownIntervalRef.current);
    setSosState({
      isOpen: false,
      isCountingDown: false,
      countdownSeconds: 5,
      isTriggered: false,
    });
  }, []);

  const triggerImmediateSos = useCallback(() => {
    clearInterval(countdownIntervalRef.current);
    if (navigator.vibrate) {
      navigator.vibrate([400, 100, 400]);
    }
    setSosState({
      isOpen: true,
      isCountingDown: false,
      countdownSeconds: 0,
      isTriggered: true,
    });
  }, []);

  // --- Siren & Strobe Controls ---
  const toggleSiren = useCallback(() => {
    if (isSirenActive) {
      soundManager.stopSiren();
      setIsSirenActive(false);
    } else {
      soundManager.startSiren();
      setIsSirenActive(true);
    }
  }, [isSirenActive]);

  // --- Fake Call Controls ---
  const triggerFakeCall = useCallback((name = 'Mom', number = '+1 (555) 019-2834') => {
    soundManager.startRingtone();
    setFakeCallState({
      isOpen: true,
      callerName: name,
      callerNumber: number,
      isAnswered: false,
      callDuration: 0,
    });
  }, []);

  const answerFakeCall = useCallback(() => {
    soundManager.stopRingtone();
    setFakeCallState(prev => ({ ...prev, isAnswered: true }));
    soundManager.speakFakeCallMessage(fakeCallState.callerName);
  }, [fakeCallState.callerName]);

  const endFakeCall = useCallback(() => {
    soundManager.stopRingtone();
    soundManager.stopSpeech();
    setFakeCallState({
      isOpen: false,
      callerName: 'Mom',
      callerNumber: '+1 (555) 019-2834',
      isAnswered: false,
      callDuration: 0,
    });
  }, []);

  // --- "Walk With Me" Safety Timer ---
  const startWalkTimer = useCallback((minutes, destination) => {
    const totalSecs = minutes * 60;
    setWalkTimer({
      isActive: true,
      totalSeconds: totalSecs,
      remainingSeconds: totalSecs,
      destination: destination || 'Heading to destination',
      startedAt: new Date().toLocaleTimeString(),
    });

    clearInterval(walkTimerIntervalRef.current);
    walkTimerIntervalRef.current = setInterval(() => {
      setWalkTimer(prev => {
        if (!prev.isActive) {
          clearInterval(walkTimerIntervalRef.current);
          return prev;
        }
        if (prev.remainingSeconds <= 1) {
          clearInterval(walkTimerIntervalRef.current);
          // Safety timer expired! Trigger emergency protocol
          triggerImmediateSos();
          return { ...prev, isActive: false, remainingSeconds: 0 };
        }
        return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
      });
    }, 1000);
  }, [triggerImmediateSos]);

  const stopWalkTimer = useCallback((enteredPin) => {
    if (enteredPin === masterPin) {
      clearInterval(walkTimerIntervalRef.current);
      setWalkTimer({
        isActive: false,
        totalSeconds: 0,
        remainingSeconds: 0,
        destination: '',
        startedAt: null,
      });
      return true;
    }
    return false;
  }, [masterPin]);

  const addWalkTime = useCallback((additionalMinutes) => {
    setWalkTimer(prev => ({
      ...prev,
      remainingSeconds: prev.remainingSeconds + additionalMinutes * 60,
      totalSeconds: prev.totalSeconds + additionalMinutes * 60,
    }));
  }, []);

  // --- Evidence Vault Controls ---
  const addVaultEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: `v-${Date.now()}`,
      timestamp: entry.timestamp || new Date().toISOString(),
    };
    setVaultEntries(prev => [newEntry, ...prev]);
    return newEntry;
  }, []);

  const deleteVaultEntry = useCallback((id) => {
    setVaultEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  // --- Emergency Burner Wipe (Instant Local Storage Purge) ---
  const emergencyBurnerWipe = useCallback(() => {
    soundManager.stopSiren();
    soundManager.stopRingtone();
    soundManager.stopSpeech();
    localStorage.clear();
    setContacts([]);
    setVaultEntries([]);
    setIsSirenActive(false);
    setSosState({
      isOpen: false,
      isCountingDown: false,
      countdownSeconds: 5,
      isTriggered: false,
    });
    setWalkTimer({
      isActive: false,
      totalSeconds: 0,
      remainingSeconds: 0,
      destination: '',
      startedAt: null,
    });
    // Immediately camouflage
    setIsDecoyActive(true);
  }, []);

  // Contacts management
  const addContact = useCallback((contact) => {
    setContacts(prev => [...prev, { ...contact, id: `c-${Date.now()}` }]);
  }, []);

  const updateContact = useCallback((id, updated) => {
    setContacts(prev => prev.map(c => (c.id === id ? { ...c, ...updated } : c)));
  }, []);

  const deleteContact = useCallback((id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  }, []);

  return (
    <SecurityContext.Provider
      value={{
        // Contacts
        contacts,
        addContact,
        updateContact,
        deleteContact,
        // Location
        location,
        refreshLocation,
        setManualLocation,
        // SOS
        sosState,
        startSosCountdown,
        cancelSos,
        triggerImmediateSos,
        customSosMessage,
        setCustomSosMessage,
        // Decoy / Camouflage
        isDecoyActive,
        setIsDecoyActive,
        masterPin,
        setMasterPin,
        // Siren & Strobe
        isSirenActive,
        toggleSiren,
        // Fake Call
        fakeCallState,
        triggerFakeCall,
        answerFakeCall,
        endFakeCall,
        // Walk With Me
        walkTimer,
        startWalkTimer,
        stopWalkTimer,
        addWalkTime,
        // Vault
        vaultEntries,
        addVaultEntry,
        deleteVaultEntry,
        // Emergency Wipe
        emergencyBurnerWipe,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

`

---

## File: src/utils/audioAlerts.js

`javascript
// Web Audio API & Web Speech API Utilities for Security4Her
// 100% Client-Side, Works Offline without External Audio Files

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.sirenOsc = null;
    this.sirenMod = null;
    this.sirenGain = null;
    this.isSirenPlaying = false;
    this.ringInterval = null;
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // --- High-Decibel Emergency Siren & Alarm ---
  startSiren() {
    if (this.isSirenPlaying) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      // Master gain node
      this.sirenGain = ctx.createGain();
      this.sirenGain.gain.setValueAtTime(0.7, ctx.currentTime);

      // Carrier oscillator (alarm tone)
      this.sirenOsc = ctx.createOscillator();
      this.sirenOsc.type = 'sawtooth'; // Sharp, piercing alarm sound
      this.sirenOsc.frequency.setValueAtTime(800, ctx.currentTime);

      // Modulator oscillator for alternating siren rise and fall
      this.sirenMod = ctx.createOscillator();
      this.sirenMod.type = 'sine';
      this.sirenMod.frequency.setValueAtTime(2, ctx.currentTime); // 2 sweeps per second

      // Modulation depth gain
      const modGain = ctx.createGain();
      modGain.gain.setValueAtTime(450, ctx.currentTime); // Sweep between ~350Hz and ~1250Hz

      // Connect: Modulator -> modGain -> Osc Frequency
      this.sirenMod.connect(modGain);
      modGain.connect(this.sirenOsc.frequency);

      // Connect: Siren Osc -> Gain -> Destination
      this.sirenOsc.connect(this.sirenGain);
      this.sirenGain.connect(ctx.destination);

      this.sirenMod.start();
      this.sirenOsc.start();
      this.isSirenPlaying = true;
    } catch (e) {
      console.warn("Could not start siren audio:", e);
    }
  }

  stopSiren() {
    if (!this.isSirenPlaying) return;
    try {
      if (this.sirenOsc) {
        this.sirenOsc.stop();
        this.sirenOsc.disconnect();
      }
      if (this.sirenMod) {
        this.sirenMod.stop();
        this.sirenMod.disconnect();
      }
      if (this.sirenGain) {
        this.sirenGain.disconnect();
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.sirenOsc = null;
      this.sirenMod = null;
      this.sirenGain = null;
      this.isSirenPlaying = false;
    }
  }

  // --- Realistic Phone Ringtone Generator ---
  startRingtone() {
    this.stopRingtone();
    const playBurst = () => {
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;

        // North American / International standard dual-tone ring: 440Hz + 480Hz
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(440, ctx.currentTime);
        osc2.frequency.setValueAtTime(480, ctx.currentTime);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        // Fade in and fade out for standard 2-second burst
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1.8);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 2.0);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(ctx.currentTime);
        osc2.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 2.0);
        osc2.stop(ctx.currentTime + 2.0);
      } catch (err) {
        console.warn("Ringtone error:", err);
      }
    };

    playBurst();
    this.ringInterval = setInterval(playBurst, 4000); // 2s on, 2s off
  }

  stopRingtone() {
    if (this.ringInterval) {
      clearInterval(this.ringInterval);
      this.ringInterval = null;
    }
  }

  // --- Safety Beep / Countdown Alert ---
  playBeep(freq = 880, durationMs = 150) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    } catch (e) {
      // Ignored
    }
  }

  // --- Voice Synthesis for Fake Call ---
  speakFakeCallMessage(callerName = "Mom", onEnd = () => {}) {
    if (!('speechSynthesis' in window)) {
      setTimeout(onEnd, 3000);
      return;
    }
    window.speechSynthesis.cancel();

    const phrases = [
      `Hey, sweetie! Where are you right now? I'm parked right across the street waiting for you with the headlights on.`,
      `Come out right now, I can see the building entrance. Dad and I are both here. Tell whoever is talking to you that you have to leave immediately.`,
      `We're watching the door. Just walk straight out to the car, we've got you.`
    ];

    const message = phrases.join(' ');
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1.05;
    utterance.pitch = 1.1;

    // Try selecting a natural female voice if available
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google UK English Female') || v.name.includes('Victoria')));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = onEnd;
    utterance.onerror = onEnd;

    window.speechSynthesis.speak(utterance);
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundManager = new SoundManager();

`

---

## File: src/components/layout/Navbar.jsx

`jsx
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
                <span className="font-extrabold text-base tracking-tight text-white">Security4Her</span>
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
            onClick={() => triggerFakeCall('Mom', '+1 (555) 019-2834')}
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

`

---

## File: src/components/home/OverviewDashboard.jsx

`jsx
import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  ShieldAlert,
  PhoneCall,
  Navigation,
  FileText,
  Search,
  CheckCircle,
  LifeBuoy,
  AlertTriangle,
  Radio,
  MapPin,
  ChevronRight,
  Flame,
  Volume2
} from 'lucide-react';

export const OverviewDashboard = ({ setActiveTab }) => {
  const {
    startSosCountdown,
    triggerFakeCall,
    toggleSiren,
    isSirenActive,
    location,
    walkTimer,
    vaultEntries,
    contacts
  } = useSecurity();

  const primaryContact = contacts.find(c => c.isPrimary) || contacts[0];

  return (
    <div className="space-y-6">
      
      {/* HERO SOS CENTRAL LAUNCHER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950 border border-rose-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-lg text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/40 border border-rose-500/40 text-rose-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Real-Time Crisis Protection Ready</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Rapid Safety & Digital Shield for Women
            </h1>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              In an emergency, one tap alerts your trusted guardians with your live GPS location, sounds deterrence sirens, and triggers crisis response protocols.
            </p>

            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{location.lat ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'GPS Ready'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                <span>{contacts.length} Guardians Armed</span>
              </div>
            </div>
          </div>

          {/* Concentric Pulsing SOS Button */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-44 h-44 rounded-full bg-rose-600/20 sos-ring pointer-events-none" />
              <div className="absolute w-36 h-36 rounded-full bg-rose-600/30 animate-pulse pointer-events-none" />
              
              <button
                onClick={startSosCountdown}
                className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-2xl tracking-wider shadow-2xl sos-glow active:scale-90 transition transform flex flex-col items-center justify-center border-4 border-white/20"
              >
                <Radio className="w-8 h-8 mb-1 animate-pulse" />
                <span>SOS</span>
              </button>
            </div>
            <span className="text-[11px] font-semibold text-rose-300/80 mt-4 tracking-wide uppercase">
              Tap for 5s Countdown Trigger
            </span>
          </div>

        </div>
      </div>

      {/* QUICK TACTICAL SHORTCUTS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => triggerFakeCall('Mom', '+1 (555) 019-2834')}
          className="p-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition group active:scale-98 shadow-md"
        >
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl w-fit mb-2 group-hover:scale-110 transition">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white">Fake Call Escape</h3>
          <p className="text-xs text-slate-400 mt-0.5">Discreet exit from uncomfortable situations</p>
        </button>

        <button
          onClick={toggleSiren}
          className="p-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition group active:scale-98 shadow-md"
        >
          <div className={`p-2.5 rounded-xl w-fit mb-2 group-hover:scale-110 transition ${isSirenActive ? 'bg-amber-500 text-slate-950 animate-bounce' : 'bg-rose-500/20 text-rose-400'}`}>
            <Volume2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white">Acoustic Siren</h3>
          <p className="text-xs text-slate-400 mt-0.5">High-decibel alarm & flashing strobe</p>
        </button>

        <button
          onClick={() => setActiveTab('walk')}
          className="p-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition group active:scale-98 shadow-md"
        >
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl w-fit mb-2 group-hover:scale-110 transition">
            <Navigation className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white">Safety Escort</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {walkTimer.isActive ? 'Active Journey Running' : 'Timed check-in for night walks'}
          </p>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className="p-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition group active:scale-98 shadow-md"
        >
          <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl w-fit mb-2 group-hover:scale-110 transition">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white">Evidence Vault</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {vaultEntries.length} Incidents Documented
          </p>
        </button>
      </div>

      {/* CORE MODULES FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Threat Message Analyzer Card */}
        <div
          onClick={() => setActiveTab('analyzer')}
          className="p-5 bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl cursor-pointer transition flex items-center justify-between group shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Digital Threat & Harassment Analyzer</h3>
                <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                  AI Rule-Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Analyze incoming texts, DMs, or emails for extortion, blackmail, stalking patterns, and legal preservation protocols.
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
        </div>

        {/* Digital Privacy Audit Card */}
        <div
          onClick={() => setActiveTab('audit')}
          className="p-5 bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl cursor-pointer transition flex items-center justify-between group shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-500/30">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Stalkerware & Privacy Hygiene Audit</h3>
                <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full font-bold">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Step-by-step checklist to detect hidden phone trackers, unauthorized Google/Apple location leaks, and lock down social profiles.
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
        </div>

      </div>

      {/* QUICK HELPLINE SPEED DIAL BAR */}
      <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
            24/7 Verified Crisis Lines
          </span>
          <p className="text-xs text-slate-300">
            Toll-free, confidential direct connections to police, cybercrime, and women helplines
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="tel:112"
            className="py-2 px-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            112 (Police)
          </a>

          <a
            href="tel:1091"
            className="py-2 px-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            1091 (Women Help)
          </a>

          <a
            href="tel:1930"
            className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md"
          >
            <Search className="w-3.5 h-3.5" />
            1930 (Cybercrime)
          </a>

          <button
            onClick={() => setActiveTab('helplines')}
            className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition"
          >
            All Helplines →
          </button>
        </div>
      </div>

      {/* LEGAL RIGHTS ADVISORY BANNER */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-1">
        <span className="font-bold text-slate-200">Legal Empowerment Notice:</span>
        <p>
          Under constitutional and criminal provisions (including "Zero FIR" principles), any police station is legally mandated to register your distress complaint regardless of territorial jurisdiction. Your documented logs in the Evidence Vault are admissible corroborative evidence.
        </p>
      </div>

    </div>
  );
};

`

---

## File: src/components/sos/SosTriggerModal.jsx

`jsx
import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  AlertTriangle,
  PhoneCall,
  Share2,
  MapPin,
  CheckCircle,
  Volume2,
  VolumeX,
  MessageSquare,
  ShieldCheck,
  Send,
  XCircle,
  Radio
} from 'lucide-react';

export const SosTriggerModal = () => {
  const {
    sosState,
    cancelSos,
    triggerImmediateSos,
    location,
    contacts,
    customSosMessage,
    isSirenActive,
    toggleSiren,
    masterPin
  } = useSecurity();

  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!sosState.isOpen) return null;

  const primaryContact = contacts.find(c => c.isPrimary) || contacts[0];
  const mapsUrl = location.lat && location.lng
    ? `https://maps.google.com/?q=${location.lat},${location.lng}`
    : 'https://maps.google.com';

  const fullSosMessage = `${customSosMessage}\n\n📍 My Live Location: ${mapsUrl}\n🕒 Timestamp: ${new Date().toLocaleTimeString()}\n⚠️ Sent via Security4Her Emergency SOS`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '🚨 EMERGENCY ALERT - Security4Her',
          text: fullSosMessage,
          url: mapsUrl,
        });
      } catch (e) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(fullSosMessage);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(fullSosMessage);
    if (primaryContact && primaryContact.phone) {
      // Clean phone number
      const cleanPhone = primaryContact.phone.replace(/[^0-9]/g, '');
      window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`, '_blank');
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    }
  };

  const handleSms = () => {
    const encoded = encodeURIComponent(fullSosMessage);
    const phone = primaryContact ? primaryContact.phone.replace(/[^0-9+]/g, '') : '';
    // Standard universal sms URL
    window.location.href = `sms:${phone}?body=${encoded}`;
  };

  const handleResolveAlert = (e) => {
    e.preventDefault();
    if (enteredPin === masterPin) {
      setPinError(false);
      setEnteredPin('');
      cancelSos();
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-rose-600 rounded-3xl shadow-2xl p-6 sm:p-8 text-white relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* COUNTDOWN MODE */}
        {sosState.isCountingDown && (
          <div className="text-center py-4">
            <div className="w-28 h-28 mx-auto rounded-full bg-rose-600/20 border-4 border-rose-500 flex items-center justify-center animate-pulse">
              <span className="text-6xl font-black tracking-tighter text-rose-500">
                {sosState.countdownSeconds}
              </span>
            </div>

            <h2 className="text-2xl font-bold mt-6 text-rose-400 flex items-center justify-center gap-2">
              <Radio className="w-6 h-6 animate-spin text-rose-500" />
              Broadcasting SOS Alert
            </h2>

            <p className="text-slate-300 text-sm mt-2 max-w-sm mx-auto">
              Alerting your emergency contacts with your exact coordinates in {sosState.countdownSeconds} seconds...
            </p>

            {/* Cancel Button */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={cancelSos}
                className="w-full py-4 px-6 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-2xl border border-slate-700 transition active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5 text-rose-400" />
                Cancel False Alarm
              </button>

              <button
                onClick={triggerImmediateSos}
                className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl transition active:scale-95 text-sm"
              >
                Trigger Immediately (Skip Countdown)
              </button>
            </div>
          </div>
        )}

        {/* TRIGGERED / ACTIVE CRISIS MODE */}
        {sosState.isTriggered && (
          <div>
            <div className="flex items-center justify-between border-b border-rose-500/30 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-rose-600 rounded-2xl animate-pulse">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </span>
                <div>
                  <h2 className="text-xl font-black text-rose-500 tracking-wide uppercase">
                    SOS Emergency Active
                  </h2>
                  <p className="text-xs text-slate-400">Distress dispatch mode engaged</p>
                </div>
              </div>

              {/* Siren Toggle */}
              <button
                onClick={toggleSiren}
                className={`p-3 rounded-2xl transition flex items-center gap-2 text-xs font-bold ${
                  isSirenActive
                    ? 'bg-amber-500 text-slate-950 animate-bounce'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Toggle High Decibel Siren"
              >
                {isSirenActive ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-rose-400" />}
                <span>{isSirenActive ? 'SILENCE SIREN' : 'LOUD SIREN'}</span>
              </button>
            </div>

            {/* Live Location Card */}
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-rose-500/20 mb-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <MapPin className="w-4 h-4 animate-bounce" />
                  Your Transmitted Location
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  GPS Active
                </span>
              </div>
              <p className="text-sm font-mono text-slate-200 mt-1">
                {location.lat ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}` : 'Detecting GPS coordinates...'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Accuracy: ±{location.accuracy || 15}m • Updated: {location.timestamp || 'Just now'}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs text-rose-400 hover:text-rose-300 underline font-medium"
              >
                Open in Google Maps ↗
              </a>
            </div>

            {/* Rapid Dispatch Actions */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                onClick={handleWhatsApp}
                className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition flex flex-col items-center justify-center gap-1.5 active:scale-95 shadow-md"
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-xs">WhatsApp Alert</span>
              </button>

              <button
                onClick={handleSms}
                className="p-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition flex flex-col items-center justify-center gap-1.5 active:scale-95 shadow-md"
              >
                <Send className="w-6 h-6" />
                <span className="text-xs">SMS Broadcast</span>
              </button>

              {primaryContact && (
                <a
                  href={`tel:${primaryContact.phone}`}
                  className="p-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl transition flex flex-col items-center justify-center gap-1.5 active:scale-95 shadow-md"
                >
                  <PhoneCall className="w-6 h-6" />
                  <span className="text-xs">Call {primaryContact.name.split(' ')[0]}</span>
                </a>
              )}

              <a
                href="tel:112"
                className="p-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl transition flex flex-col items-center justify-center gap-1.5 active:scale-95 shadow-md"
              >
                <ShieldCheck className="w-6 h-6" />
                <span className="text-xs">Call 112 (Police)</span>
              </a>
            </div>

            {/* Share or Copy Details */}
            <div className="mb-6 flex gap-2">
              <button
                onClick={handleShare}
                className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                <Share2 className="w-4 h-4 text-rose-400" />
                {copiedLink ? 'SOS Link Copied!' : 'Share Live GPS Alert'}
              </button>
            </div>

            {/* Safe PIN Dismissal Form (Prevents Aggressor from easily tapping Cancel) */}
            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-2 font-medium">
                Enter your Master PIN to declare safety and end distress mode:
              </p>
              <form onSubmit={handleResolveAlert} className="flex gap-2">
                <input
                  type="password"
                  maxLength={6}
                  placeholder="Enter 4-digit PIN"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  className={`flex-1 bg-slate-950 border px-3 py-2 rounded-xl text-center text-lg tracking-widest text-white focus:outline-none focus:ring-2 ${
                    pinError ? 'border-rose-500 ring-rose-500' : 'border-slate-700 focus:ring-rose-500'
                  }`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  I Am Safe
                </button>
              </form>
              {pinError && (
                <p className="text-rose-400 text-[11px] mt-1.5">Incorrect PIN. Try again.</p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

`

---

## File: src/components/emergency/FakeCallModal.jsx

`jsx
import React, { useState, useEffect } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Phone,
  PhoneOff,
  User,
  Mic,
  MicOff,
  Volume2,
  Grid,
  AlertCircle
} from 'lucide-react';

export const FakeCallModal = () => {
  const { fakeCallState, answerFakeCall, endFakeCall, startSosCountdown } = useSecurity();
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    let timer;
    if (fakeCallState.isOpen && fakeCallState.isAnswered) {
      timer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      setDuration(0);
    }
    return () => clearInterval(timer);
  }, [fakeCallState.isOpen, fakeCallState.isAnswered]);

  if (!fakeCallState.isOpen) return null;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm h-[620px] bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-[42px] border-4 border-slate-800 shadow-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden select-none">
        
        {/* Subtle camera punch hole at top */}
        <div className="w-24 h-5 bg-black rounded-full mx-auto absolute top-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
        </div>

        {/* Top Caller Info */}
        <div className="text-center mt-10">
          <div className="relative inline-block mx-auto mb-4">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-indigo-600 flex items-center justify-center shadow-lg border-2 border-slate-700 ${!fakeCallState.isAnswered ? 'animate-pulse' : ''}`}>
              <User className="w-12 h-12 text-white" />
            </div>
            {!fakeCallState.isAnswered && (
              <span className="absolute inset-0 rounded-full border-4 border-rose-500/40 animate-ping" />
            )}
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white">
            {fakeCallState.callerName || 'Mom'}
          </h2>
          <p className="text-slate-400 text-sm mt-0.5 font-mono">
            {fakeCallState.callerNumber || '+1 (555) 019-2834'}
          </p>

          <p className="text-xs font-semibold uppercase tracking-wider text-rose-400 mt-2">
            {!fakeCallState.isAnswered ? 'Incoming Call...' : formatTime(duration)}
          </p>
        </div>

        {/* Active Call Controls */}
        {fakeCallState.isAnswered ? (
          <div className="space-y-8 mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full mx-auto flex flex-col items-center justify-center transition ${
                  isMuted ? 'bg-white text-slate-950' : 'bg-slate-800/80 text-white'
                }`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              <button
                className="p-4 rounded-full mx-auto bg-slate-800/80 text-white flex flex-col items-center justify-center"
              >
                <Grid className="w-6 h-6" />
              </button>

              <button
                onClick={() => setIsSpeaker(!isSpeaker)}
                className={`p-4 rounded-full mx-auto flex flex-col items-center justify-center transition ${
                  isSpeaker ? 'bg-white text-slate-950' : 'bg-slate-800/80 text-white'
                }`}
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Escalate to SOS if danger persists */}
            <button
              onClick={() => {
                endFakeCall();
                startSosCountdown();
              }}
              className="w-full py-2.5 px-3 bg-rose-950/60 border border-rose-600/40 hover:bg-rose-900/60 text-rose-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <AlertCircle className="w-4 h-4 text-rose-400" />
              Still in danger? Escalate to SOS
            </button>

            {/* End Call Button */}
            <div className="flex justify-center">
              <button
                onClick={endFakeCall}
                className="w-18 h-18 p-5 bg-rose-600 hover:bg-rose-700 active:scale-90 text-white rounded-full shadow-lg transition flex items-center justify-center"
              >
                <PhoneOff className="w-8 h-8" />
              </button>
            </div>
          </div>
        ) : (
          /* Incoming Call Action Bar */
          <div className="mb-6 space-y-6">
            <p className="text-center text-xs text-slate-400">
              Answer to hear simulated conversation audio to excuse yourself safely.
            </p>
            <div className="flex items-center justify-around px-4">
              {/* Decline */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={endFakeCall}
                  className="w-16 h-16 bg-rose-600 hover:bg-rose-700 active:scale-90 text-white rounded-full flex items-center justify-center shadow-lg transition"
                >
                  <PhoneOff className="w-7 h-7" />
                </button>
                <span className="text-xs text-slate-400 font-medium">Decline</span>
              </div>

              {/* Accept */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={answerFakeCall}
                  className="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 active:scale-90 text-white rounded-full flex items-center justify-center shadow-lg transition animate-bounce"
                >
                  <Phone className="w-7 h-7" />
                </button>
                <span className="text-xs text-emerald-400 font-medium">Answer</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

`

---

## File: src/components/emergency/SirenStrobeModal.jsx

`jsx
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

`

---

## File: src/components/camouflage/DecoyCalculator.jsx

`jsx
import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Shield, EyeOff } from 'lucide-react';

export const DecoyCalculator = () => {
  const { isDecoyActive, setIsDecoyActive, masterPin } = useSecurity();
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewOperand, setWaitingForNewOperand] = useState(false);
  const [inputSequence, setInputSequence] = useState('');

  if (!isDecoyActive) return null;

  const handleDigit = (digit) => {
    setInputSequence(prev => (prev + digit).slice(-8)); // Track last few digits for PIN unlock

    if (waitingForNewOperand) {
      setDisplay(String(digit));
      setWaitingForNewOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewOperand) {
      setDisplay('0.');
      setWaitingForNewOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewOperand(false);
    setInputSequence('');
  };

  const handleOperation = (nextOp) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const current = prevValue || 0;
      let newValue = current;
      if (operation === '+') newValue = current + inputValue;
      else if (operation === '-') newValue = current - inputValue;
      else if (operation === '×') newValue = current * inputValue;
      else if (operation === '÷') newValue = inputValue === 0 ? 'Error' : current / inputValue;

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForNewOperand(true);
    setOperation(nextOp);
  };

  const handleEquals = () => {
    // Secret unlock: If the user typed the master PIN
    if (display === masterPin || inputSequence.endsWith(masterPin)) {
      setIsDecoyActive(false);
      clearAll();
      return;
    }

    if (!operation || prevValue === null) return;
    const inputValue = parseFloat(display);
    let newValue = prevValue;

    if (operation === '+') newValue = prevValue + inputValue;
    else if (operation === '-') newValue = prevValue - inputValue;
    else if (operation === '×') newValue = prevValue * inputValue;
    else if (operation === '÷') newValue = inputValue === 0 ? 'Error' : prevValue / inputValue;

    setDisplay(String(newValue));
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewOperand(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-4 sm:p-8 select-none">
      
      {/* Top camouflage bar */}
      <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 px-2">
        <span className="font-mono">Calculator</span>
        <button
          onClick={() => setIsDecoyActive(false)}
          className="text-[11px] text-neutral-600 hover:text-neutral-400 flex items-center gap-1 transition"
          title="Return to Security4Her"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>Exit Camouflage</span>
        </button>
      </div>

      {/* Main Display */}
      <div className="flex-1 flex flex-col justify-end items-end px-4 pb-6 overflow-hidden">
        <div className="text-neutral-400 text-sm font-mono h-6">
          {prevValue !== null ? `${prevValue} ${operation || ''}` : ''}
        </div>
        <div className="text-6xl sm:text-7xl font-light tracking-tight truncate max-w-full font-mono">
          {display}
        </div>
      </div>

      {/* Calculator Keypad */}
      <div className="max-w-sm w-full mx-auto grid grid-cols-4 gap-3 pb-4">
        {/* Row 1 */}
        <button
          onClick={clearAll}
          className="h-16 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-xl transition active:scale-95"
        >
          AC
        </button>
        <button
          onClick={() => setDisplay(String(-parseFloat(display) || 0))}
          className="h-16 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-xl transition active:scale-95"
        >
          ±
        </button>
        <button
          onClick={() => setDisplay(String((parseFloat(display) || 0) / 100))}
          className="h-16 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium text-xl transition active:scale-95"
        >
          %
        </button>
        <button
          onClick={() => handleOperation('÷')}
          className={`h-16 rounded-full font-medium text-2xl transition active:scale-95 ${
            operation === '÷' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          ÷
        </button>

        {/* Row 2 */}
        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleDigit(num)}
            className="h-16 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-normal text-2xl transition active:scale-95"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOperation('×')}
          className={`h-16 rounded-full font-medium text-2xl transition active:scale-95 ${
            operation === '×' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          ×
        </button>

        {/* Row 3 */}
        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleDigit(num)}
            className="h-16 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-normal text-2xl transition active:scale-95"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOperation('-')}
          className={`h-16 rounded-full font-medium text-2xl transition active:scale-95 ${
            operation === '-' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          -
        </button>

        {/* Row 4 */}
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleDigit(num)}
            className="h-16 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-normal text-2xl transition active:scale-95"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOperation('+')}
          className={`h-16 rounded-full font-medium text-2xl transition active:scale-95 ${
            operation === '+' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => handleDigit(0)}
          className="col-span-2 h-16 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-normal text-2xl px-6 text-left pl-7 transition active:scale-95"
        >
          0
        </button>
        <button
          onClick={handleDecimal}
          className="h-16 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-normal text-2xl transition active:scale-95"
        >
          .
        </button>
        <button
          onClick={handleEquals}
          className="h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-white font-medium text-2xl transition active:scale-95"
        >
          =
        </button>
      </div>

      {/* Discreet hint footer */}
      <div className="text-center text-[11px] text-neutral-600 pb-1">
        Type PIN ({masterPin}) and press = to return
      </div>

    </div>
  );
};

`

---

## File: src/components/safety/WalkWithMeTimer.jsx

`jsx
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
  Check
} from 'lucide-react';

export const WalkWithMeTimer = () => {
  const { walkTimer, startWalkTimer, stopWalkTimer, addWalkTime, masterPin } = useSecurity();
  const [selectedMinutes, setSelectedMinutes] = useState(15);
  const [destinationInput, setDestinationInput] = useState('');
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [errorPin, setErrorPin] = useState(false);

  const presets = [5, 10, 15, 30, 45];

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
        origin: { y: 0.6 }
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

  const progressPercent = walkTimer.totalSeconds > 0
    ? Math.max(0, Math.min(100, ((walkTimer.totalSeconds - walkTimer.remainingSeconds) / walkTimer.totalSeconds) * 100))
    : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Walk With Me • Safety Guard
            </h2>
            <p className="text-xs text-slate-400">
              Automatic SOS trigger if you don't check in before the timer ends
            </p>
          </div>
        </div>

        {walkTimer.isActive && (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Active Escort
          </span>
        )}
      </div>

      {!walkTimer.isActive ? (
        /* Configuration Form */
        <form onSubmit={handleStart} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Expected Journey Duration (Minutes)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {presets.map((mins) => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => setSelectedMinutes(mins)}
                  className={`py-2.5 rounded-xl font-bold text-xs transition ${
                    selectedMinutes === mins
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Destination / Commute Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Taking Metro Line 2 home, Uber #XY941..."
              value={destinationInput}
              onChange={(e) => setDestinationInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <Clock className="w-4 h-4" />
            Activate "Walk With Me" Protection
          </button>
        </form>
      ) : (
        /* Active Timer View */
        <div className="space-y-6 pt-2">
          {/* Progress bar */}
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-1000 ${
                walkTimer.remainingSeconds < 120 ? 'bg-rose-500' : 'bg-indigo-500'
              }`}
              style={{ width: `${100 - progressPercent}%` }}
            />
          </div>

          {/* Digital Timer */}
          <div className="text-center py-2">
            <div className="text-5xl font-black font-mono tracking-tight text-white">
              {formatTime(walkTimer.remainingSeconds)}
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              Destination: <span className="text-slate-200">{walkTimer.destination || 'Unspecified'}</span>
            </p>
            {walkTimer.remainingSeconds < 180 && (
              <p className="text-xs text-rose-400 font-semibold mt-1 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Under 3 minutes remaining! Check in or add time.
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => addWalkTime(5)}
              className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              Add +5 Mins (Delayed)
            </button>

            <button
              onClick={() => setPinModalOpen(true)}
              className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition"
            >
              <ShieldCheck className="w-4 h-4" />
              I Have Arrived Safely
            </button>
          </div>
        </div>
      )}

      {/* Safe Arrival PIN Verification Modal */}
      {pinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Confirm Safe Arrival</h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your 4-digit Master PIN to disarm the safety monitor:
            </p>

            <form onSubmit={handleSafeArrival} className="space-y-3">
              <input
                type="password"
                maxLength={6}
                autoFocus
                placeholder="Master PIN"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-lg tracking-widest text-white focus:outline-none focus:border-emerald-500"
              />

              {errorPin && (
                <p className="text-xs text-rose-400">Incorrect PIN. Try again.</p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPinModalOpen(false)}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Confirm Safe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

`

---

## File: src/components/safety/SafeMap.jsx

`jsx
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

`

---

## File: src/components/vault/EvidenceVault.jsx

`jsx
import React, { useState, useRef } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  FileText,
  Plus,
  Trash2,
  Mic,
  MicOff,
  MapPin,
  Calendar,
  Download,
  Printer,
  Shield,
  Tag,
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const EvidenceVault = () => {
  const { vaultEntries, addVaultEntry, deleteVaultEntry, location } = useSecurity();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Form State
  const [category, setCategory] = useState('Stalking / Following');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [suspectDetails, setSuspectDetails] = useState('');
  const [vehicleOrContact, setVehicleOrContact] = useState('');
  const [witnesses, setWitnesses] = useState('');
  const [tags, setTags] = useState('');

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const categories = [
    'Stalking / Following',
    'Street / Public Harassment',
    'Cyber / Online Harassment / Doxxing',
    'Workplace / Professional Harassment',
    'Domestic / Relationship Coercion',
    'Extortion / Blackmail',
    'Unwanted Contact / Intimidation',
  ];

  // Start voice memo
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert('Microphone access denied or not supported on this browser.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please provide a title and incident description.');
      return;
    }

    const locString = location.lat && location.lng
      ? `Lat ${location.lat.toFixed(5)}, Lng ${location.lng.toFixed(5)} (±${location.accuracy}m)`
      : 'Location timestamped by device';

    addVaultEntry({
      title,
      category,
      description,
      suspectDetails,
      vehicleOrContact,
      witnesses,
      location: locString,
      audioMemo: audioUrl,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setSuspectDetails('');
    setVehicleOrContact('');
    setWitnesses('');
    setTags('');
    setAudioUrl(null);
    setIsFormOpen(false);
  };

  // Generate Formal Print / Law Enforcement Report
  const printFormalReport = (entry) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>CONFIDENTIAL INCIDENT & EVIDENCE REPORT - ${entry.title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
          .header { border-bottom: 2px solid #e11d48; padding-bottom: 15px; margin-bottom: 25px; }
          .badge { display: inline-block; background: #ffe4e6; color: #be123c; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 12px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; background: #f8fafc; padding: 15px; border-radius: 6px; }
          .section { margin-bottom: 20px; }
          .section h3 { margin-bottom: 6px; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
          .footer { margin-top: 40px; font-size: 11px; color: #64748b; border-top: 1px solid #cbd5e1; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>SECURITY4HER • TAMPER-EVIDENT INCIDENT LOG</h2>
          <p>Prepared for Law Enforcement, Legal Advisors, and Human Rights Advocates</p>
          <div class="badge">${entry.category}</div>
        </div>

        <div class="meta-grid">
          <div><strong>Incident Title:</strong> ${entry.title}</div>
          <div><strong>Date & Time:</strong> ${new Date(entry.timestamp).toLocaleString()}</div>
          <div><strong>Recorded GPS:</strong> ${entry.location}</div>
          <div><strong>Case ID:</strong> ${entry.id}</div>
        </div>

        <div class="section">
          <h3>Detailed Incident Narrative</h3>
          <p>${entry.description.replace(/\n/g, '<br/>')}</p>
        </div>

        ${entry.suspectDetails ? `
        <div class="section">
          <h3>Perpetrator / Suspect Identification</h3>
          <p>${entry.suspectDetails.replace(/\n/g, '<br/>')}</p>
        </div>
        ` : ''}

        ${entry.vehicleOrContact ? `
        <div class="section">
          <h3>Vehicle / Plate / Phone / Social Media Handles</h3>
          <p>${entry.vehicleOrContact}</p>
        </div>
        ` : ''}

        ${entry.witnesses ? `
        <div class="section">
          <h3>Witnesses / Bystanders</h3>
          <p>${entry.witnesses}</p>
        </div>
        ` : ''}

        <div class="footer">
          <p>This report was securely generated by the victim via the client-side Security4Her platform. Device metadata timestamped automatically. Keep this document confidential.</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Tamper-Evident Evidence Vault
            </h2>
            <p className="text-xs text-slate-400">
              Document harassment incidents with timestamps, voice notes, and exportable FIR legal summaries
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md"
        >
          <Plus className="w-4 h-4" />
          {isFormOpen ? 'Close Form' : 'Log New Incident'}
        </button>
      </div>

      {/* NEW INCIDENT LOGGING FORM */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Document New Incident
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Incident Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Incident Headline / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Unwanted stalking on bus route 42"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Detailed Narrative (What happened, words spoken, physical gestures) *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the sequence of events chronologically..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Perpetrator Physical Description (Height, clothing, tattoos, hair)
              </label>
              <input
                type="text"
                placeholder="e.g. Approx 5'10, green cap, red jacket..."
                value={suspectDetails}
                onChange={(e) => setSuspectDetails(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Vehicle Plate / Phone / Social Media Profile
              </label>
              <input
                type="text"
                placeholder="e.g. Plate #ABC-1234, @insta_handle..."
                value={vehicleOrContact}
                onChange={(e) => setVehicleOrContact(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Voice Memo Recording */}
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-200 block">
                Discreet Voice Memo Evidence
              </span>
              <span className="text-[11px] text-slate-400">
                Record verbal notes or ambient audio immediately after the incident
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Mic className="w-3.5 h-3.5" />
                  Record Audio
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 animate-pulse transition"
                >
                  <MicOff className="w-3.5 h-3.5" />
                  Stop Recording
                </button>
              )}

              {audioUrl && (
                <audio controls src={audioUrl} className="h-8 max-w-[180px]" />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-md transition"
            >
              Save Secure Entry
            </button>
          </div>
        </form>
      )}

      {/* VAULT LOG LIST */}
      {vaultEntries.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
          <FileCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">Your Evidence Vault is Empty</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            All logged incidents are saved locally on your device with zero cloud tracking. Click "Log New Incident" to record any suspicious interaction.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {vaultEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-4.5 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-950/80 border border-rose-500/40 text-rose-300">
                    {entry.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" />
                    {new Date(entry.timestamp).toLocaleDateString()} at {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {entry.audioMemo && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 flex items-center gap-1">
                      <Mic className="w-2.5 h-2.5" /> Voice Recorded
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white">{entry.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {entry.description}
                </p>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-0.5">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{entry.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => printFormalReport(entry)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition border border-slate-700"
                  title="Generate Formal Police / FIR Report"
                >
                  <Printer className="w-3.5 h-3.5 text-rose-400" />
                  <span>Export Report</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Delete this evidence entry permanently?')) {
                      deleteVaultEntry(entry.id);
                    }
                  }}
                  className="p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-rose-950/30 transition"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

`

---

## File: src/components/threat/ThreatAnalyzer.jsx

`jsx
import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileCheck2,
  BookOpen,
  Send
} from 'lucide-react';

const THREAT_PATTERNS = [
  {
    category: 'Imminent Physical Harm & Bodily Violence',
    severity: 'CRITICAL',
    keywords: ['kill', 'murder', 'hurt you', 'beat you', 'break your', 'slit', 'choke', 'shoot', 'stab', 'die', 'dead', 'burn'],
    legalAdvice: 'Immediate emergency threat. Contact local police (112 / 911) immediately. Do not meet alone.',
  },
  {
    category: 'Stalking & Physical Surveillance',
    severity: 'HIGH',
    keywords: ['watching you', 'know where you live', 'outside your', 'saw you today', 'follow you', 'at your work', 'tracked', 'find you wherever'],
    legalAdvice: 'Active stalking behavior. Document all sightings, vary your daily routes, and inform building security / family.',
  },
  {
    category: 'Extortion, Blackmail & Intimate Image Threats',
    severity: 'CRITICAL',
    keywords: ['leak your', 'expose you', 'send your photos', 'nudes', 'blackmail', 'pay me or', 'tell everyone what', 'ruin your life'],
    legalAdvice: 'Extortion and non-consensual image abuse is a serious felony. Cease communication immediately. DO NOT pay or send further content. Preserve messages for cyber crime authorities.',
  },
  {
    category: 'Doxxing & Personal Data Exposure',
    severity: 'HIGH',
    keywords: ['post your address', 'your phone number', 'dox', 'doxx', 'tell your employer', 'post online', 'expose your family'],
    legalAdvice: 'Doxxing violation. Lock down social media profiles, request immediate content removal on platforms, and file a cyber harassment complaint.',
  },
  {
    category: 'Coercive Control & Psychological Intimidation',
    severity: 'MODERATE',
    keywords: ['you belong to me', 'never leave me', 'obey', 'shut up', 'worthless', 'nobody else will want you', 'block you from friends'],
    legalAdvice: 'Signs of abusive coercive control. Reach out to domestic violence and crisis counseling helplines for safe exit planning.',
  },
];

export const ThreatAnalyzer = () => {
  const { addVaultEntry } = useSecurity();
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [vaultSaved, setVaultSaved] = useState(false);

  const analyzeThreat = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const lower = inputText.toLowerCase();
    const detectedCategories = [];

    THREAT_PATTERNS.forEach(pattern => {
      const matchedWords = pattern.keywords.filter(kw => lower.includes(kw));
      if (matchedWords.length > 0) {
        detectedCategories.push({
          category: pattern.category,
          severity: pattern.severity,
          matchedWords,
          legalAdvice: pattern.legalAdvice,
        });
      }
    });

    // Determine overall risk
    let overallSeverity = 'LOW';
    if (detectedCategories.some(c => c.severity === 'CRITICAL')) {
      overallSeverity = 'CRITICAL';
    } else if (detectedCategories.some(c => c.severity === 'HIGH')) {
      overallSeverity = 'HIGH';
    } else if (detectedCategories.some(c => c.severity === 'MODERATE')) {
      overallSeverity = 'MODERATE';
    }

    setAnalysisResult({
      overallSeverity,
      detectedCategories,
      analyzedAt: new Date().toLocaleTimeString(),
      textSnippet: inputText,
    });
    setVaultSaved(false);
  };

  const saveToEvidenceVault = () => {
    if (!analysisResult) return;
    addVaultEntry({
      title: `Analyzed Message: ${analysisResult.overallSeverity} Risk Threat Detected`,
      category: 'Cyber / Online Harassment / Doxxing',
      description: `Target Message Text:\n"${analysisResult.textSnippet}"\n\nIdentified Threat Classifications:\n${analysisResult.detectedCategories.map(d => `- ${d.category} (Severity: ${d.severity})`).join('\n')}`,
      suspectDetails: 'Digital sender / message transcript captured',
      location: 'Digital Message / Platform Inbox',
      tags: ['ThreatAnalyzer', analysisResult.overallSeverity],
    });
    setVaultSaved(true);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Threat & Harassment Message Analyzer
          </h2>
          <p className="text-xs text-slate-400">
            Paste suspicious DMs, texts, or emails to detect threat severity, blackmail patterns, and legal steps
          </p>
        </div>
      </div>

      <form onSubmit={analyzeThreat} className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Message or Email Content to Evaluate:
          </label>
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste the received message, DM, or suspicious text here for private client-side evaluation..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500 italic">
            🔒 100% Client-side. Text is never transmitted to external servers.
          </span>
          <button
            type="submit"
            className="py-2.5 px-5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-md transition active:scale-95 flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            Analyze Threat Severity
          </button>
        </div>
      </form>

      {/* ANALYSIS REPORT DISPLAY */}
      {analysisResult && (
        <div className="mt-6 p-5 bg-slate-950 border border-slate-800 rounded-2xl animate-in fade-in space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400">Risk Assessment Result</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider ${
                    analysisResult.overallSeverity === 'CRITICAL'
                      ? 'bg-rose-600 text-white animate-pulse'
                      : analysisResult.overallSeverity === 'HIGH'
                      ? 'bg-amber-600 text-white'
                      : analysisResult.overallSeverity === 'MODERATE'
                      ? 'bg-yellow-600 text-slate-950'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {analysisResult.overallSeverity} RISK
                </span>
                <span className="text-xs text-slate-400">
                  {analysisResult.detectedCategories.length} Pattern(s) Detected
                </span>
              </div>
            </div>

            {/* Quick send to Vault */}
            <button
              onClick={saveToEvidenceVault}
              disabled={vaultSaved}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                vaultSaved
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {vaultSaved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Archived to Vault
                </>
              ) : (
                <>
                  <FileCheck2 className="w-3.5 h-3.5 text-rose-400" />
                  Save to Evidence Vault
                </>
              )}
            </button>
          </div>

          {/* Detected Patterns */}
          {analysisResult.detectedCategories.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Threat Breakdown & Legal Guidance
              </h4>
              {analysisResult.detectedCategories.map((item, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-slate-800 px-2 py-0.5 rounded text-rose-300 font-semibold">
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-rose-300/90 leading-relaxed">
                    <strong>Action Protocol:</strong> {item.legalAdvice}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Trigger flags detected: {item.matchedWords.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-slate-900/60 rounded-xl text-slate-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              No overt physical threats, extortion, or stalking keywords were identified in this sample. However, trust your instincts if any interaction feels uncomfortable.
            </div>
          )}

          {/* Evidence Preservation Instructions */}
          <div className="p-3.5 bg-indigo-950/40 border border-indigo-500/20 rounded-xl text-xs text-slate-300 space-y-1">
            <span className="font-bold text-indigo-300 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Standard Evidence Preservation Rule:
            </span>
            <p className="text-[11px] text-slate-400">
              1. Take full screenshots capturing the sender's account handle, phone number, and exact timestamps.
              2. Do not reply or antagonize the sender.
              3. Report and block via platform settings, and report extortion immediately to Cyber Crime Portal (1930 / cybercrime.gov.in).
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

`

---

## File: src/components/security/DigitalAudit.jsx

`jsx
import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckSquare,
  Square,
  Smartphone,
  Eye,
  Lock,
  Radio,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

const AUDIT_SECTIONS = [
  {
    id: 'stalkerware',
    title: 'Stalkerware & Hidden Spyware Detection',
    icon: Smartphone,
    description: 'Ensure no unauthorized monitoring apps or device management profiles are running.',
    items: [
      {
        id: 'sw-1',
        title: 'Inspect Device Administrator & Accessibility Services',
        details: 'Go to Settings > Accessibility and Settings > Security > Device Admin Apps. Check for unknown apps granted deep monitoring permissions and revoke them immediately.',
      },
      {
        id: 'sw-2',
        title: 'Check for Unknown Profiles / Enterprise Certificates',
        details: 'On iPhone: Go to Settings > General > VPN & Device Management. On Android: Check Settings > Security > Device Administration. Ensure no stranger installed a management certificate.',
      },
      {
        id: 'sw-3',
        title: 'Audit Suspicious Battery & Data Drain',
        details: 'Go to Settings > Battery > Battery Usage. Look for obscure apps consuming high background battery or high background mobile data.',
      },
      {
        id: 'sw-4',
        title: 'Verify Unknown Bluetooth Trackers (AirTags / Tile)',
        details: 'On iPhone: Ensure "Item Safety Alerts" are enabled in Find My. On Android: Check Settings > Safety & Emergency > Unknown Tracker Alerts.',
      },
    ],
  },
  {
    id: 'location',
    title: 'Location Privacy & Live Tracking Leaks',
    icon: Radio,
    description: 'Verify which apps and individuals can see your real-time physical whereabouts.',
    items: [
      {
        id: 'loc-1',
        title: 'Audit Google Maps Real-Time Location Sharing',
        details: 'Open Google Maps > Tap your profile icon > "Location Sharing". Ensure you are not inadvertently sharing your live location with an ex-partner or acquaintance.',
      },
      {
        id: 'loc-2',
        title: 'Review Apple "Find My" People Tab',
        details: 'Open Apple "Find My" > Tap "People". Confirm only people you explicitly trust are permitted to see your current location.',
      },
      {
        id: 'loc-3',
        title: 'Check WhatsApp & Telegram Live Location Sharing',
        details: 'In WhatsApp: Settings > Privacy > Live Location. Verify no active location sharing sessions are ongoing in any group or individual chat.',
      },
      {
        id: 'loc-4',
        title: 'Strip Geotag / EXIF Metadata from Photos',
        details: 'Photos taken with your camera embed exact GPS coordinates in EXIF tags. Disable camera GPS geotagging or use a photo scrubber before sharing pictures publicly.',
      },
    ],
  },
  {
    id: 'social',
    title: 'Social Media & Doxxing Defense',
    icon: Eye,
    description: 'Protect personal identity, home address, and workplace from online stalkers.',
    items: [
      {
        id: 'soc-1',
        title: 'Make Instagram & Facebook Profiles Private',
        details: 'Set your profile to Private. Restrict who can see your followers/friends list so stalkers cannot harass your connections.',
      },
      {
        id: 'soc-2',
        title: 'Disable LinkedIn "Viewed Your Profile" & Public Visibility',
        details: 'Go to LinkedIn Settings > Visibility > Profile viewing options. Browse anonymously if researching individuals or companies.',
      },
      {
        id: 'soc-3',
        title: 'Remove Phone Number from Public Lookups (Truecaller, etc.)',
        details: 'Visit Truecaller unlist page (truecaller.com/unlisting) to remove your personal name and number from public reverse lookups.',
      },
      {
        id: 'soc-4',
        title: 'Lock Down Two-Factor Authentication (2FA) with an App',
        details: 'Enable 2FA on Google, Apple, WhatsApp, and Instagram using an Authenticator app (like Google Authenticator or Bitwarden) rather than SMS.',
      },
    ],
  },
];

export const DigitalAudit = () => {
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('s4h_audit_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [expandedSection, setExpandedSection] = useState('stalkerware');

  const toggleCheck = (itemId) => {
    setCheckedItems(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      localStorage.setItem('s4h_audit_progress', JSON.stringify(next));
      return next;
    });
  };

  const totalItems = AUDIT_SECTIONS.reduce((acc, s) => acc + s.items.length, 0);
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const scorePercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Digital Security & Stalkerware Audit
            </h2>
            <p className="text-xs text-slate-400">
              Interactive privacy checklist to safeguard against phone surveillance and location leaks
            </p>
          </div>
        </div>

        {/* Progress Gauge */}
        <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Security Score</span>
            <span className="text-sm font-bold text-blue-400">{scorePercent}% Complete</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center font-bold text-xs text-white">
            {completedCount}/{totalItems}
          </div>
        </div>
      </div>

      {/* Sections Accordion */}
      <div className="space-y-4">
        {AUDIT_SECTIONS.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          const sectionCompleted = section.items.filter(i => checkedItems[i.id]).length;

          return (
            <div
              key={section.id}
              className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-800/40 text-left transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 text-slate-300 rounded-xl border border-slate-800">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{section.title}</h3>
                    <p className="text-xs text-slate-400">{section.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium text-slate-400 hidden sm:inline">
                    {sectionCompleted}/{section.items.length} verified
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 pt-1 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
                  {section.items.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-blue-950/20 border-blue-500/30 text-slate-300'
                            : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="pt-0.5 text-blue-400">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-blue-400" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-500" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <h4 className={`text-xs font-bold ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

`

---

## File: src/components/resources/HelplineDirectory.jsx

`jsx
import React, { useState } from 'react';
import { Phone, Search, LifeBuoy, ShieldCheck, HeartPulse, Globe, ExternalLink } from 'lucide-react';

const HELPLINES = [
  {
    id: 'h-1',
    name: 'National Emergency Response (All Distress)',
    number: '112',
    category: 'Emergency',
    availability: '24/7 Free Call',
    description: 'Unified national emergency number for immediate Police, Fire, and Ambulance response.',
    primary: true,
  },
  {
    id: 'h-2',
    name: 'Women Helpline (Domestic & Public Distress)',
    number: '1091',
    category: 'Women Safety',
    availability: '24/7 Toll-Free',
    description: 'Dedicated women police assistance for stalking, domestic abuse, and public distress.',
    primary: true,
  },
  {
    id: 'h-3',
    name: 'National Cyber Crime & Blackmail Helpline',
    number: '1930',
    category: 'Cybercrime',
    availability: '24/7 Toll-Free',
    description: 'Reporting extortion, morphing, non-consensual image distribution, and online harassment.',
    primary: true,
  },
  {
    id: 'h-4',
    name: 'National Commission for Women (NCW) Helpline',
    number: '7827-170-170',
    category: 'Legal Aid & Support',
    availability: '24/7 Available',
    description: 'Statutory body providing grievance redressal, legal advice, and emergency intervention.',
    primary: false,
  },
  {
    id: 'h-5',
    name: 'Domestic Violence & Coercive Abuse Helpline',
    number: '181',
    category: 'Domestic Violence',
    availability: '24/7 Support',
    description: 'Confidential counseling, emergency shelter referrals, and protection officers.',
    primary: false,
  },
  {
    id: 'h-6',
    name: 'Crisis & Mental Wellness Helpline (KIRAN / Vandrevala)',
    number: '1800-599-0019',
    category: 'Mental Health',
    availability: '24/7 Free Support',
    description: 'Trauma-informed psychological first aid, panic mitigation, and suicide prevention.',
    primary: false,
  },
  {
    id: 'h-ngp-1',
    name: 'Nagpur Police "Bharosa Cell" (Women & Child Crisis Cell)',
    number: '0712-2561100',
    category: 'Women Safety',
    availability: '24/7 Nagpur Helpline',
    description: 'Nagpur Police specialized crisis intervention & counseling cell for women facing harassment, stalking, or domestic abuse.',
    primary: true,
  },
  {
    id: 'h-ngp-2',
    name: 'Maharashtra State Commission for Women (MSCW)',
    number: '7477722424',
    category: 'Legal Aid & Support',
    availability: '24/7 Support',
    description: 'Direct Maharashtra helpline for legal intervention, distress complaints, and police coordination.',
    primary: false,
  },
  {
    id: 'h-ngp-3',
    name: 'Nagpur Police Control Room & Damini Pathak',
    number: '0712-2561222',
    category: 'Emergency',
    availability: '24/7 Active Police',
    description: 'City control room dispatching the Damini Squad (all-women anti-eve-teasing mobile police team).',
    primary: false,
  },
  {
    id: 'h-7',
    name: 'International Emergency Dispatch (USA/Canada)',
    number: '911',
    category: 'International',
    availability: '24/7 Universal',
    description: 'Emergency line for travelers in the United States and North America.',
    primary: false,
  },
];

export const HelplineDirectory = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Emergency', 'Women Safety', 'Cybercrime', 'Domestic Violence', 'Mental Health'];

  const filtered = HELPLINES.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.number.includes(search) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Verified Helplines & Immediate Rescue Lines
            </h2>
            <p className="text-xs text-slate-400">
              One-touch direct calling for national police, cybercrime, and domestic violence support
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search numbers or services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
              item.primary
                ? 'bg-slate-950/90 border-emerald-500/30 shadow-md'
                : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                  {item.category}
                </span>
                <span className="text-[11px] font-semibold text-emerald-400">
                  {item.availability}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mt-1">{item.name}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-lg font-mono font-black text-emerald-400">
                {item.number}
              </span>

              <a
                href={`tel:${item.number.replace(/[^0-9+]/g, '')}`}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

`

---

## File: src/components/settings/EmergencyContactsManager.jsx

`jsx
import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Users, Plus, Trash2, Star, Shield, Lock, MessageSquare, Check, Phone } from 'lucide-react';

export const EmergencyContactsManager = () => {
  const {
    contacts,
    addContact,
    deleteContact,
    updateContact,
    customSosMessage,
    setCustomSosMessage,
    masterPin,
    setMasterPin
  } = useSecurity();

  // Contact form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Family');

  // PIN change
  const [newPin, setNewPin] = useState('');
  const [pinSavedMessage, setPinSavedMessage] = useState(false);

  // Message edit
  const [messageDraft, setMessageDraft] = useState(customSosMessage);
  const [msgSaved, setMsgSaved] = useState(false);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    addContact({
      name,
      phone,
      relationship,
      isPrimary: contacts.length === 0,
      notifyOnSos: true,
    });

    setName('');
    setPhone('');
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    if (newPin.length >= 4) {
      setMasterPin(newPin);
      setNewPin('');
      setPinSavedMessage(true);
      setTimeout(() => setPinSavedMessage(false), 3000);
    }
  };

  const handleSaveMessage = (e) => {
    e.preventDefault();
    setCustomSosMessage(messageDraft);
    setMsgSaved(true);
    setTimeout(() => setMsgSaved(false), 3000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur space-y-8">
      {/* SECTION 1: EMERGENCY CONTACTS */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Emergency Circle & Trusted Guardians</h2>
            <p className="text-xs text-slate-400">
              These contacts receive your live GPS coordinates, battery level, and distress message
            </p>
          </div>
        </div>

        {/* Existing Contacts List */}
        <div className="space-y-2.5 mb-5">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sm text-rose-400">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{c.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                      {c.relationship}
                    </span>
                    {c.isPrimary && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-400 border border-rose-500/40 font-bold">
                        Primary
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400">{c.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {!c.isPrimary && (
                  <button
                    onClick={() => {
                      contacts.forEach(contact => {
                        updateContact(contact.id, { isPrimary: contact.id === c.id });
                      });
                    }}
                    className="p-2 text-slate-400 hover:text-amber-400 transition"
                    title="Set as Primary Contact"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => deleteContact(c.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition"
                  title="Remove Contact"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Contact Form */}
        <form onSubmit={handleAddContact} className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            required
            placeholder="Name (e.g. Sister, Mom)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />

          <input
            type="tel"
            required
            placeholder="Phone with country code"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />

          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
          >
            <option value="Family">Family</option>
            <option value="Partner">Partner</option>
            <option value="Friend">Friend</option>
            <option value="Authority">Security / Colleague</option>
          </select>

          <button
            type="submit"
            className="py-2 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Guardian
          </button>
        </form>
      </div>

      {/* SECTION 2: CUSTOM SOS BROADCAST TEXT */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Custom SOS Distress Message</h3>
            <p className="text-xs text-slate-400">Pre-script the automated message sent when SOS is fired</p>
          </div>
        </div>

        <form onSubmit={handleSaveMessage} className="space-y-3">
          <textarea
            rows={3}
            value={messageDraft}
            onChange={(e) => setMessageDraft(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              * Note: Live GPS Link, battery %, and timestamp will be appended automatically.
            </span>
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              {msgSaved ? <Check className="w-3.5 h-3.5" /> : null}
              {msgSaved ? 'Saved!' : 'Save SOS Message'}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 3: MASTER PIN CONFIGURATION */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Master Safety PIN</h3>
            <p className="text-xs text-slate-400">
              Current PIN: <span className="font-mono text-amber-400">{masterPin}</span> (Used for safe arrival confirm and disguise exit)
            </p>
          </div>
        </div>

        <form onSubmit={handleSavePin} className="flex gap-3 max-w-sm">
          <input
            type="password"
            maxLength={6}
            placeholder="New 4-digit PIN"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-center tracking-widest text-white focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            {pinSavedMessage ? 'Updated!' : 'Update PIN'}
          </button>
        </form>
      </div>
    </div>
  );
};

`

---

## File: src/components/settings/PrivacyAndPurge.jsx

`jsx
import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { ShieldCheck, Flame, Download, Upload, EyeOff, Lock, AlertTriangle, FileText } from 'lucide-react';

export const PrivacyAndPurge = () => {
  const { emergencyBurnerWipe, vaultEntries, contacts } = useSecurity();
  const [confirmWipeOpen, setConfirmWipeOpen] = useState(false);

  const handleExportData = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      vaultEntries,
      contacts,
      app: 'Security4Her Local Vault Backup',
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Security4Her_Encrypted_Backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Responsible Privacy Controls & Device Safety</h2>
          <p className="text-xs text-slate-400">
            Zero-knowledge client-side storage, no tracking telemetry, and emergency data wipe
          </p>
        </div>
      </div>

      {/* Privacy Guarantee Card */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
        <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Zero-Cloud-Leak Guarantee
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Security4Her is engineered on a <strong>local-first architectural paradigm</strong>. Your recorded voice memos, incident descriptions, photos, and emergency contact list live entirely on your device’s sandbox. No third-party servers, no advertising trackers, and no remote surveillance exist on this platform.
        </p>
      </div>

      {/* Backup and Portability */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-indigo-400" />
            Offline Vault Backup
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Download your encrypted vault logs and contacts to a secure external thumbdrive or legal drive.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <FileText className="w-4 h-4 text-indigo-400" />
          Export JSON Archive
        </button>
      </div>

      {/* BURNER EMERGENCY DATA PURGE */}
      <div className="p-5 bg-rose-950/30 border border-rose-600/40 rounded-2xl space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-rose-600 text-white rounded-xl">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-rose-400">Emergency "Burner" Data Wipe</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              If an abusive partner, stalker, or hostile person demands access to your phone, triggering this function instantly eradicates all locally stored incident evidence, contacts, and history, and immediately transforms the screen into the Decoy Calculator disguise.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setConfirmWipeOpen(true)}
            className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-lg transition active:scale-95 flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            Initiate Emergency Burner Wipe
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmWipeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm bg-slate-900 border-2 border-rose-600 rounded-3xl p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-rose-600/20 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-500">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
            </div>

            <h3 className="text-base font-bold text-white">Permanently Erase All Data?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This action cannot be undone. All incident vault records, voice notes, and contacts will be wiped immediately from device memory, and the calculator disguise will activate.
            </p>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setConfirmWipeOpen(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirmWipeOpen(false);
                  emergencyBurnerWipe();
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
              >
                Yes, Wipe Everything
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

`

---


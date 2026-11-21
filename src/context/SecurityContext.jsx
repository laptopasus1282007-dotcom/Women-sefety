import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { soundManager } from '../utils/audioAlerts';
import { syncAlertToCloud, syncVaultToCloud } from '../utils/supabaseClient';

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
    name: 'Aditi (Trusted Friend)',
    phone: '+91 7620856169',
    relationship: 'Friend',
    isPrimary: true,
    notifyOnSos: true,
  },
  {
    id: 'c2',
    name: 'Papa / Family Home',
    phone: '+91 98220 14890',
    relationship: 'Family',
    isPrimary: false,
    notifyOnSos: true,
  },
  {
    id: 'c3',
    name: 'Campus / Office Security Hub',
    phone: '+91 0712-2567777',
    relationship: 'Authority',
    isPrimary: false,
    notifyOnSos: true,
  },
  {
    id: 'c4',
    name: 'Ananya (Roommate / Hostel)',
    phone: '+91 94231 09845',
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
      if (!saved) return DEFAULT_CONTACTS;

      return JSON.parse(saved).map(contact => {
        if (contact.id === 'c1' && contact.name === 'Maya (Sister)') {
          return {
            ...contact,
            name: 'Aditi (Friend)',
            phone: '+91 7620856169',
            relationship: 'Friend',
            isPrimary: true,
          };
        }
        return contact;
      });
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
    callerName: 'भाई',
    callerNumber: '+91 98765 43210',
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
  const triggerFakeCall = useCallback((name = 'भाई', number = '+91 98765 43210') => {
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
    soundManager.speakFakeCallMessage();
  }, []);

  const endFakeCall = useCallback(() => {
    soundManager.stopRingtone();
    soundManager.stopSpeech();
    setFakeCallState({
      isOpen: false,
      callerName: 'भाई',
      callerNumber: '+91 98765 43210',
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
    // Asynchronously sync to Supabase Cloud
    syncVaultToCloud(newEntry);
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

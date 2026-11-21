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
  Radio,
  ExternalLink,
  ShieldAlert,
  Copy,
  Check,
} from 'lucide-react';
import { syncAlertToCloud } from '../../utils/supabaseClient';

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
    masterPin,
  } = useSecurity();

  const [enteredPin, setEnteredPin]   = useState('');
  const [pinError, setPinError]       = useState(false);
  const [copiedLink, setCopiedLink]   = useState(false);

  if (!sosState.isOpen) return null;

  const primaryContact = contacts.find((c) => c.isPrimary) || contacts[0];
  const mapsUrl = location.lat && location.lng
    ? `https://maps.google.com/?q=${location.lat},${location.lng}`
    : 'https://maps.google.com';

  const fullSosMessage = `🚨 EMERGENCY ALERT FROM NARISHAKTI SAFETY:\n${customSosMessage}\n\n📍 My Live GPS Location:\n${mapsUrl}\n🕒 Time: ${new Date().toLocaleTimeString()}\n⚠️ Please contact local authorities immediately if you cannot reach me.`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '🚨 EMERGENCY ALERT - Narishakti Safety',
          text: fullSosMessage,
          url: mapsUrl,
        });
      } catch (e) {
        // Share cancelled
      }
    } else {
      navigator.clipboard.writeText(fullSosMessage);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleWhatsApp = () => {
    // Record to Supabase
    syncAlertToCloud({
      alert_type: 'EMERGENCY_SOS',
      recipient: primaryContact ? primaryContact.name : 'All Contacts',
      lat: location.lat,
      lng: location.lng,
      status: 'DISPATCHED_WHATSAPP',
      timestamp: new Date().toISOString(),
    });

    const encoded = encodeURIComponent(fullSosMessage);
    if (primaryContact && primaryContact.phone) {
      const cleanPhone = primaryContact.phone.replace(/[^0-9]/g, '');
      window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`, '_blank');
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    }
  };

  const handleSms = () => {
    syncAlertToCloud({
      alert_type: 'EMERGENCY_SOS',
      recipient: primaryContact ? primaryContact.name : 'All Contacts',
      lat: location.lat,
      lng: location.lng,
      status: 'DISPATCHED_SMS',
      timestamp: new Date().toISOString(),
    });

    const encoded = encodeURIComponent(fullSosMessage);
    const phone = primaryContact ? primaryContact.phone.replace(/[^0-9+]/g, '') : '';
    window.location.href = `sms:${phone}?body=${encoded}`;
  };

  const handleResolveAlert = (e) => {
    e.preventDefault();
    if (enteredPin === masterPin) {
      cancelSos();
      setEnteredPin('');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-rose-600 rounded-[32px] shadow-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-600/20 blur-[90px] pointer-events-none rounded-full" />

        {sosState.countdown !== null && sosState.countdown > 0 ? (
          /* COUNTDOWN SCREEN */
          <div className="text-center space-y-6 relative z-10">
            <div className="inline-flex p-3 bg-rose-500/20 border border-rose-500/40 rounded-full text-rose-400 mb-2">
              <ShieldAlert className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest text-rose-400">
                DISTRESS PROTOCOL ACTIVATING IN
              </span>
              <div className="text-7xl font-black tracking-tight text-white my-3 font-mono">
                {sosState.countdown}
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Distress alerts with live GPS coordinates will be dispatched to your trusted circle.
              </p>
            </div>

            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <button
                onClick={triggerImmediateSos}
                className="py-3 px-6 bg-rose-600 hover:bg-rose-500 text-white font-black text-sm rounded-2xl shadow-lg shadow-rose-600/40 transition active:scale-95"
              >
                Send Instantly (Skip Countdown)
              </button>

              <button
                onClick={cancelSos}
                className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-2xl transition"
              >
                Cancel / False Alarm
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE SOS COMMAND CENTER */
          <div className="space-y-6 relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 animate-ping" />
                <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  EMERGENCY SOS ACTIVE
                </h2>
              </div>
              <span className="text-xs px-2.5 py-1 bg-rose-950/80 border border-rose-500/40 text-rose-300 rounded-full font-bold">
                Level 1 Distress
              </span>
            </div>

            {/* GPS Telemetry Pill */}
            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0 animate-bounce" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white">Live Broadcast Coordinates</div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {location.address || (location.lat ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Resolving GPS...')}
                  </div>
                </div>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-rose-400 hover:text-white bg-slate-900 rounded-xl transition flex-shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Dispatch Buttons Grid */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleWhatsApp}
                className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 transition active:scale-95"
              >
                <MessageSquare className="w-5 h-5" />
                Send WhatsApp Alert
              </button>

              <button
                onClick={handleSms}
                className="p-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20 transition active:scale-95"
              >
                <Send className="w-5 h-5" />
                Send SMS Alert
              </button>
            </div>

            {/* Quick Police & Siren Row */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:112"
                className="p-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition active:scale-95"
              >
                <PhoneCall className="w-4 h-4" /> Call 112 Police
              </a>

              <button
                onClick={toggleSiren}
                className={`p-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                  isSirenActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isSirenActive ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isSirenActive ? 'Mute Siren' : 'Sound Alarm'}
              </button>
            </div>

            {/* Safe De-escalation with PIN */}
            <form onSubmit={handleResolveAlert} className="pt-4 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                I Am Safe Now (Enter PIN to Cancel Alert):
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Master PIN (Default: 1234)"
                  maxLength={8}
                  className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/40 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition"
                >
                  Verify Safe
                </button>
              </div>
              {pinError && (
                <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                  <XCircle className="w-3.5 h-3.5" /> Incorrect PIN. Alert remains active.
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Phone,
  PhoneOff,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Grid,
  AlertCircle,
  ShieldAlert,
  Radio,
  Check,
} from 'lucide-react';

const PRESET_CALLERS = [
  { name: 'भाई (Brother)', number: '+91 98765 43210' },
  { name: 'मम्मी (Mom)', number: '+91 94221 88392' },
  { name: 'Officer Deshmukh (Police)', number: '112 / +91 712-2567777' },
  { name: 'Manager / Office Lead', number: '+91 98230 11928' },
];

export const FakeCallModal = () => {
  const { fakeCallState, answerFakeCall, endFakeCall, startSosCountdown, triggerFakeCall } = useSecurity();
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted]   = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    let timer;
    if (fakeCallState.isOpen && fakeCallState.isAnswered) {
      timer = setInterval(() => {
        setDuration((prev) => prev + 1);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-sm h-[640px] bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-[46px] border-4 border-slate-800 shadow-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden select-none">
        
        {/* Dynamic Island / Camera Punch Hole */}
        <div className="w-28 h-5 bg-black rounded-full mx-auto absolute top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 border border-slate-800">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
        </div>

        {/* Top Caller Info */}
        <div className="text-center mt-10">
          <div className="relative inline-block mx-auto mb-4">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-xl border-2 border-slate-700 ${!fakeCallState.isAnswered ? 'animate-pulse' : ''}`}>
              <User className="w-12 h-12 text-white" />
            </div>
            {!fakeCallState.isAnswered && (
              <span className="absolute inset-0 rounded-full border-4 border-rose-500/40 animate-ping" />
            )}
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            {fakeCallState.callerName || 'भाई'}
          </h2>
          <p className="text-slate-400 text-sm mt-0.5 font-mono">
            {fakeCallState.callerNumber || '+91 98765 43210'}
          </p>

          <p className="text-xs font-bold uppercase tracking-wider text-rose-400 mt-2 flex items-center justify-center gap-1.5">
            {!fakeCallState.isAnswered ? (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                इनकमिंग कॉल... (Incoming Call)
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {formatTime(duration)}
              </>
            )}
          </p>
        </div>

        {/* Call Body */}
        {fakeCallState.isAnswered ? (
          <div className="space-y-6 mb-4">
            {/* Audio Wave Visualizer Simulation */}
            <div className="flex items-center justify-center gap-1 h-12 px-6 bg-slate-900/60 rounded-2xl border border-slate-800">
              {[40, 70, 30, 90, 60, 100, 45, 80, 50, 75, 35, 85].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-rose-500 to-purple-400 rounded-full transition-all duration-300"
                  style={{
                    height: `${Math.min(100, h * (0.5 + Math.random() * 0.5))}%`,
                    animation: `pulse 1.2s infinite ease-in-out ${i * 100}ms`,
                  }}
                />
              ))}
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-center">
              <p className="text-xs text-slate-300 italic">
                "हाँ दीदी, मैं बिल्कुल बाहर ही खड़ा हूँ, आप 2 मिनट में निकल जाओ, मैं देख रहा हूँ।"
              </p>
            </div>

            {/* In-Call Controls */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full mx-auto flex flex-col items-center justify-center transition ${
                  isMuted ? 'bg-white text-slate-950' : 'bg-slate-800/80 text-white hover:bg-slate-700'
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
                  isSpeaker ? 'bg-white text-slate-950' : 'bg-slate-800/80 text-white hover:bg-slate-700'
                }`}
              >
                {isSpeaker ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </button>
            </div>

            {/* Quick Escalate to SOS */}
            <button
              onClick={() => {
                endFakeCall();
                startSosCountdown();
              }}
              className="w-full py-2.5 px-3 bg-rose-950/70 border border-rose-500/40 hover:bg-rose-900/70 text-rose-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <AlertCircle className="w-4 h-4 text-rose-400" />
              Still in danger? Trigger Emergency SOS
            </button>

            {/* End Call Button */}
            <div className="flex justify-center">
              <button
                onClick={endFakeCall}
                className="w-18 h-18 p-5 bg-rose-600 hover:bg-rose-500 active:scale-90 text-white rounded-full shadow-xl shadow-rose-600/40 transition flex items-center justify-center"
              >
                <PhoneOff className="w-8 h-8" />
              </button>
            </div>
          </div>
        ) : (
          /* Incoming Call Actions (Answer or Decline) */
          <div className="space-y-6 mb-4">
            {/* Quick Switch Persona */}
            <div className="flex gap-1.5 justify-center overflow-x-auto pb-1 no-scrollbar">
              {PRESET_CALLERS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => triggerFakeCall(c.name, c.number)}
                  className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-[10px] rounded-full text-slate-300 border border-slate-700 whitespace-nowrap"
                >
                  {c.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-around px-4">
              {/* Decline */}
              <div className="text-center">
                <button
                  onClick={endFakeCall}
                  className="w-16 h-16 bg-rose-600 hover:bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-rose-600/40 active:scale-90 transition mb-2"
                >
                  <PhoneOff className="w-7 h-7" />
                </button>
                <span className="text-xs text-slate-400 font-medium">Decline</span>
              </div>

              {/* Accept */}
              <div className="text-center">
                <button
                  onClick={answerFakeCall}
                  className="w-16 h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/40 active:scale-90 transition animate-bounce mb-2"
                >
                  <Phone className="w-7 h-7" />
                </button>
                <span className="text-xs text-emerald-400 font-bold">Accept</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

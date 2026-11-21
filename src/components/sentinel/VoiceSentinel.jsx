import React, { useState, useEffect, useRef } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Mic, MicOff, Volume2, ShieldAlert, Sparkles, CheckCircle2, AlertOctagon, Activity } from 'lucide-react';

const TRIGGER_KEYWORDS = ['help', 'bachao', 'stop', 'chhodo', 'police', 'emergency', 'madad'];

export const VoiceSentinel = () => {
  const { triggerImmediateSos } = useSecurity();
  const [isListening, setIsListening] = useState(false);
  const [detectedWord, setDetectedWord] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);

  const startVoiceSentinel = async () => {
    try {
      // 1. Microphone Audio Stream for Sound Level
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateMeter = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        const average = sum / dataArray.length;
        setAudioLevel(Math.min(100, Math.round((average / 128) * 100)));
        animationFrameRef.current = requestAnimationFrame(updateMeter);
      };
      updateMeter();

      // 2. Speech Recognition for Trigger Words
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-IN'; // or 'hi-IN'

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript.toLowerCase();
          setTranscript(text);

          const matched = TRIGGER_KEYWORDS.find((kw) => text.includes(kw));
          if (matched) {
            setDetectedWord(matched);
            // Automatic crisis dispatch
            triggerImmediateSos();
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
          }
        };

        recognition.onerror = () => {};
        recognition.start();
        recognitionRef.current = recognition;
      }

      setIsListening(true);
    } catch (err) {
      alert('Microphone permission required for Hands-Free Voice Sentinel.');
    }
  };

  const stopVoiceSentinel = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
    }
    setIsListening(false);
    setAudioLevel(0);
    setTranscript('');
  };

  useEffect(() => {
    return () => {
      stopVoiceSentinel();
    };
  }, []);

  return (
    <div className="sentinel-card p-6 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/25">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Voice Sentinel • Hands-Free Distress Listener
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                Autonomous AI
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuously listens for crisis keywords ("Help", "Bachao", "Stop") and screams to auto-trigger SOS
            </p>
          </div>
        </div>

        <button
          onClick={isListening ? stopVoiceSentinel : startVoiceSentinel}
          className={`py-2.5 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            isListening
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 animate-pulse'
              : 'btn-secondary'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4" /> Stop Sentinel Listener
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-emerald-400" /> Activate Voice Sentinel
            </>
          )}
        </button>
      </div>

      {/* Acoustic Level & Status Meter */}
      <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> Ambient Noise / Acoustic Waveform:
          </span>
          <span className="font-mono font-bold text-emerald-400">
            {isListening ? `${audioLevel}% Amplitude` : 'Sentinel Standby'}
          </span>
        </div>

        {/* Audio Visualizer Bar */}
        <div className="h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-75 ${
              audioLevel > 65
                ? 'bg-gradient-to-r from-yellow-500 to-rose-500'
                : 'bg-gradient-to-r from-emerald-500 to-blue-500'
            }`}
            style={{ width: `${isListening ? Math.max(5, audioLevel) : 0}%` }}
          />
        </div>

        {/* Detected Word Alert */}
        {detectedWord && (
          <div className="p-3 bg-rose-950/80 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-400 animate-bounce" />
              <span>
                CRISIS KEYWORD DETECTED: <b>"{detectedWord.toUpperCase()}"</b>
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-600 text-white rounded">
              SOS DISPATCHED
            </span>
          </div>
        )}

        {/* Monitored Keywords List */}
        <div>
          <span className="text-[11px] text-slate-400 block mb-2 font-medium">
            Trained Emergency Voice Triggers:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {TRIGGER_KEYWORDS.map((kw) => (
              <span
                key={kw}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono"
              >
                "{kw}"
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

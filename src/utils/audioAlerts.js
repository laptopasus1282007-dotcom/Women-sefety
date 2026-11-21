// Web Audio API & Web Speech API Utilities for Narishakti-Safety
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
      this.audioCtx.resume().catch((error) => {
        console.warn("Could not resume audio:", error);
      });
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
        if (ctx.state === 'suspended') {
          ctx.resume().then(playBurst).catch((error) => {
            console.warn("Could not resume ringtone audio:", error);
          });
          return;
        }

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
  speakFakeCallMessage(onEnd = () => {}) {
    if (!('speechSynthesis' in window)) {
      setTimeout(onEnd, 3000);
      return;
    }
    window.speechSynthesis.cancel();

    const phrases = [
      `अरे, तुम अभी कहाँ हो? मैं तुम्हारा भाई बोल रहा हूँ। मैं बाहर गाड़ी लेकर तुम्हारा इंतज़ार कर रहा हूँ।`,
      `जल्दी बाहर आ जाओ, मुझे इमारत का प्रवेश द्वार दिख रहा है। जो भी तुमसे बात कर रहा है, उससे कह दो कि तुम्हें अभी जाना है।`,
      `मैं दरवाज़े के पास हूँ। सीधे गाड़ी तक आ जाओ, मैं तुम्हारे साथ हूँ।`
    ];

    const message = phrases.join(' ');
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang.toLowerCase().startsWith('hi'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
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

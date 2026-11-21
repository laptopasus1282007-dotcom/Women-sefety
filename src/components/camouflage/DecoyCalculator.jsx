import React, { useState, useEffect } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { X, Delete, Radio, Shield, KeyRound, AlertTriangle } from 'lucide-react';

export const DecoyCalculator = () => {
  const { isDecoyActive, setIsDecoyActive, startSosCountdown, masterPin } = useSecurity();
  const [display, setDisplay]     = useState('0');
  const [equation, setEquation]   = useState('');
  const [justCalc, setJustCalc]   = useState(false);
  const [pinBuffer, setPinBuffer] = useState('');
  const [pinMatch, setPinMatch]   = useState(false);

  useEffect(() => {
    if (!isDecoyActive) {
      setDisplay('0');
      setEquation('');
      setJustCalc(false);
      setPinBuffer('');
      setPinMatch(false);
    }
  }, [isDecoyActive]);

  if (!isDecoyActive) return null;

  const handleDigit = (digit) => {
    const newBuf = (pinBuffer + digit).slice(-masterPin.length);
    setPinBuffer(newBuf);
    if (newBuf === masterPin) {
      setPinMatch(true);
      return;
    }
    if (justCalc) {
      setDisplay(digit);
      setJustCalc(false);
    } else {
      setDisplay((prev) => (prev === '0' ? digit : prev.length < 15 ? prev + digit : prev));
    }
  };

  const handleOp = (op) => {
    setEquation(display + ' ' + op);
    setJustCalc(false);
    setDisplay('0');
    setPinBuffer('');
  };

  const handleEquals = () => {
    try {
      const expr = equation + display;
      // eslint-disable-next-line no-new-func
      const result = Function('"use strict"; return (' + expr.replace(/×/g, '*').replace(/÷/g, '/') + ')')();
      setDisplay(isNaN(result) || !isFinite(result) ? 'Error' : String(parseFloat(result.toFixed(10))));
      setEquation('');
      setJustCalc(true);
    } catch {
      setDisplay('Error');
      setEquation('');
      setJustCalc(true);
    }
    setPinBuffer('');
  };

  const handleDecimal = () => {
    if (justCalc) {
      setDisplay('0.');
      setJustCalc(false);
      return;
    }
    if (!display.includes('.')) setDisplay(display + '.');
    setPinBuffer('');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setJustCalc(false);
    setPinBuffer('');
    setPinMatch(false);
  };

  const handleToggleSign = () => setDisplay((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
  const handlePercent = () => {
    try {
      setDisplay(String(parseFloat(display) / 100));
    } catch {}
  };

  const BtnPrimary = ({ label, onClick, wide, className = '' }) => (
    <button
      onClick={onClick}
      className={`${wide ? 'col-span-2' : ''} h-15 flex items-center justify-center rounded-2xl text-xl font-medium transition active:scale-95 select-none ${className}`}
    >
      {label}
    </button>
  );

  if (pinMatch) {
    return (
      <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl p-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 animate-pulse">
          <Shield className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Safety PIN Verified</h2>
        <p className="text-sm text-slate-400 mb-6 max-w-xs">
          Camouflage mode deactivated. You can now return to your safety dashboard or escalate emergency.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => setIsDecoyActive(false)}
            className="py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition shadow-lg shadow-emerald-600/30 active:scale-95"
          >
            Return to Safety Dashboard
          </button>
          <button
            onClick={() => {
              setIsDecoyActive(false);
              startSosCountdown();
            }}
            className="py-3 bg-rose-950/70 border border-rose-500/40 text-rose-300 rounded-2xl font-semibold text-sm transition hover:bg-rose-900/80 flex items-center justify-center gap-2"
          >
            <Radio className="w-4 h-4 text-rose-400" />
            Still in danger? Trigger Emergency SOS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black sm:bg-black/80 sm:backdrop-blur-md">
      <div className="w-full max-w-sm bg-black rounded-t-[2.5rem] sm:rounded-[2.5rem] border border-slate-800/80 overflow-hidden shadow-2xl p-6">
        {/* Subtle disguise hint */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-2">
          <span className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">CALCULATOR v2.4</span>
          <span className="text-[9px] text-slate-700">Type PIN to unlock safety</span>
        </div>

        {/* Display */}
        <div className="px-2 pt-6 pb-5 text-right">
          <p className="text-slate-500 text-sm h-5 font-mono">{equation || '\u00A0'}</p>
          <p
            className="text-white font-light tracking-tight mt-1 overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ fontSize: display.length > 10 ? '2rem' : display.length > 7 ? '2.5rem' : '3.5rem' }}
          >
            {display}
          </p>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2.5">
          <BtnPrimary label="AC"  onClick={handleClear}      className="bg-slate-700 hover:bg-slate-600 text-white font-bold" />
          <BtnPrimary label="+/−" onClick={handleToggleSign} className="bg-slate-700 hover:bg-slate-600 text-white font-bold" />
          <BtnPrimary label="%"   onClick={handlePercent}    className="bg-slate-700 hover:bg-slate-600 text-white font-bold" />
          <BtnPrimary label="÷"   onClick={() => handleOp('÷')} className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-2xl" />

          {['7', '8', '9'].map((d) => (
            <BtnPrimary key={d} label={d} onClick={() => handleDigit(d)} className="bg-slate-850 bg-slate-800/90 hover:bg-slate-700 text-white" />
          ))}
          <BtnPrimary label="×" onClick={() => handleOp('×')} className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-2xl" />

          {['4', '5', '6'].map((d) => (
            <BtnPrimary key={d} label={d} onClick={() => handleDigit(d)} className="bg-slate-850 bg-slate-800/90 hover:bg-slate-700 text-white" />
          ))}
          <BtnPrimary label="−" onClick={() => handleOp('−')} className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-2xl" />

          {['1', '2', '3'].map((d) => (
            <BtnPrimary key={d} label={d} onClick={() => handleDigit(d)} className="bg-slate-850 bg-slate-800/90 hover:bg-slate-700 text-white" />
          ))}
          <BtnPrimary label="+" onClick={() => handleOp('+')} className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-2xl" />

          <BtnPrimary label="0" onClick={() => handleDigit('0')} wide className="bg-slate-850 bg-slate-800/90 hover:bg-slate-700 text-white text-left pl-6" />
          <BtnPrimary label="." onClick={handleDecimal} className="bg-slate-850 bg-slate-800/90 hover:bg-slate-700 text-white" />
          <BtnPrimary label="=" onClick={handleEquals} className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-2xl" />
        </div>
      </div>
    </div>
  );
};

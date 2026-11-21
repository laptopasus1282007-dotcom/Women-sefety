import React from 'react';
import { Phone } from 'lucide-react';

const PRIORITY_HOTLINES = [
  { id: 'h1', title: 'National Emergency Response (Police, Fire, Ambulance)', number: '112', tag: 'Pan-India ERSS' },
  { id: 'h2', title: 'Women in Distress Helpline', number: '1091', tag: '24/7 Police Assistance' },
  { id: 'h3', title: 'National Cyber Crime & Blackmail Freeze', number: '1930', tag: 'Financial & Image Extortion' },
  { id: 'h4', title: 'National Commission for Women (NCW)', number: '7827-170-170', tag: 'Direct Legal Escalation' },
  { id: 'h5', title: 'Damini Squad (Maharashtra Women Patrol)', number: '1090', tag: 'Mobile Rapid Unit' },
  { id: 'h6', title: 'Railway Women Protection (RPF)', number: '139', tag: 'Train & Platform Distress' },
];

export const EmergencyGrid = () => {
  return (
    <div className="sentinel-card p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Phone className="w-5 h-5 text-rose-500" />
          <h2 className="text-lg font-bold text-white">Emergency Response Direct Dialers</h2>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/25 font-bold">
          Zero Toll Charges
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PRIORITY_HOTLINES.map((h) => (
          <div
            key={h.id}
            className="p-4 bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between gap-3 transition"
          >
            <div className="min-w-0">
              <span className="text-[10px] text-slate-500 font-semibold block">{h.tag}</span>
              <span className="text-xs font-bold text-white block truncate">{h.title}</span>
            </div>
            <a
              href={`tel:${h.number.replace(/[^0-9+]/g, '')}`}
              className="py-2 px-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-lg shadow transition active:scale-95 flex items-center gap-1.5 flex-shrink-0"
            >
              <Phone className="w-3.5 h-3.5" /> {h.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

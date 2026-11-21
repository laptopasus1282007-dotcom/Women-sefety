import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Shield, Navigation, FileText, Zap } from 'lucide-react';

export const OverviewDashboard = () => {
  const { contacts, walkTimer, vaultEntries } = useSecurity();

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Trusted Circle</span>
            <Shield className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-white">{contacts.length}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Guardians ready</p>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Walk Escort</span>
            <Navigation className={`w-4 h-4 ${walkTimer.isActive ? 'text-emerald-400 animate-spin' : 'text-slate-500'}`} />
          </div>
          <div className="text-2xl font-black text-white">{walkTimer.isActive ? 'ACTIVE' : 'IDLE'}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {walkTimer.isActive ? `${Math.ceil(walkTimer.remainingSeconds / 60)} min left` : 'Timer ready'}
          </p>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Evidence Vault</span>
            <FileText className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{vaultEntries.length}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Encrypted records</p>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Live Safety Index</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">98%</div>
          <p className="text-[11px] text-emerald-400 mt-0.5 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> High Coverage
          </p>
        </div>
      </div>
    </div>
  );
};

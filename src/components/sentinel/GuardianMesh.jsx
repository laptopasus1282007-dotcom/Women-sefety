import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Users,
  MapPin,
  Battery,
  Shield,
  Plus,
  Trash2,
  Bell,
  CheckCircle2,
  Navigation,
  Clock,
  Send,
  Zap,
} from 'lucide-react';

const DEFAULT_GEOFENCES = [
  { id: 'geo-1', name: 'Home / Residence', address: 'Wardha Road, Nagpur', radius: '200m', autoNotify: true, status: 'Active' },
  { id: 'geo-2', name: 'University Campus / College', address: 'Amravati Road, Nagpur', radius: '300m', autoNotify: true, status: 'Active' },
  { id: 'geo-3', name: 'Metro Station Hub', address: 'Sitabuldi Interchange', radius: '150m', autoNotify: true, status: 'Active' },
];

export const GuardianMesh = () => {
  const { contacts, addContact, deleteContact } = useSecurity();
  const [geofences, setGeofences] = useState(DEFAULT_GEOFENCES);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [testAlertSent, setTestAlertSent] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    addContact({
      name: newContactName,
      phone: newContactPhone,
      relationship,
      isPrimary: contacts.length === 0,
      notifyOnSos: true,
    });
    setNewContactName('');
    setNewContactPhone('');
  };

  const handleSendTestPing = () => {
    setTestAlertSent(true);
    setTimeout(() => setTestAlertSent(false), 3000);
  };

  return (
    <div className="sentinel-card p-6 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/25">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Abhaya Guardian Mesh & Geofencing
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                Circle Active
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated silent check-ins when entering safe zones & battery low warnings
            </p>
          </div>
        </div>

        <button
          onClick={handleSendTestPing}
          className="btn-secondary py-2.5 px-4 text-xs flex items-center justify-center gap-2"
        >
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          {testAlertSent ? 'Ping Broadcasted ✓' : 'Send Safe Test Ping'}
        </button>
      </div>

      {/* Geofence Smart Check-ins */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-3">
        <span className="text-xs font-bold text-slate-300 block">
          Configured Safe Geofences (Silent Auto-Notify on Arrival)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {geofences.map((g) => (
            <div key={g.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {g.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 font-mono">
                  {g.radius}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">{g.address}</p>
              <span className="text-[10px] text-slate-500 mt-2 block flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Auto-notify circle on arrival
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Guardian Roster */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-300 block">
          Trusted Guardians ({contacts.length})
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                  {c.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white truncate block">{c.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{c.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {c.relationship}
                </span>
                <button
                  onClick={() => deleteContact(c.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                  title="Remove Guardian"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Guardian */}
      <form onSubmit={handleAdd} className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)}
          placeholder="Guardian Name"
          required
          className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <input
          type="tel"
          value={newContactPhone}
          onChange={(e) => setNewContactPhone(e.target.value)}
          placeholder="+91 Mobile Number"
          required
          className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
        />
        <select
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
        >
          <option value="Family">Family</option>
          <option value="Friend">Friend</option>
          <option value="Colleague">Colleague</option>
          <option value="Authority">Authority</option>
        </select>
        <button
          type="submit"
          className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition whitespace-nowrap flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Guardian
        </button>
      </form>
    </div>
  );
};

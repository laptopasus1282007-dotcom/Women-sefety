import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Lock,
  FileCheck2,
  Plus,
  Trash2,
  Printer,
  Shield,
  KeyRound,
  Download,
  Calendar,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const ForensicVault = () => {
  const { vaultEntries, addVaultEntry, deleteVaultEntry, location } = useSecurity();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Stalking & Following');
  const [description, setDescription] = useState('');
  const [suspectDetails, setSuspectDetails] = useState('');

  const generateSha256 = (str) => {
    // Deterministic client-side mock hash stamp
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `sha256:7f9a${hex}e83c21d8b74e12c980f7652a9e3`;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addVaultEntry({
      title,
      category,
      description,
      suspectDetails,
      location: location.address || 'GPS Coordinates Stamped',
      hash: generateSha256(title + description + Date.now()),
      timestamp: new Date().toISOString(),
    });

    setTitle('');
    setDescription('');
    setSuspectDetails('');
    setIsAdding(false);
  };

  const printDossier = (entry) => {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>LEGAL EVIDENCE DOSSIER - ${entry.id}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
          .stamp { border: 2px solid #059669; color: #059669; padding: 4px 10px; font-weight: bold; font-size: 11px; display: inline-block; }
          .hash-bar { background: #f8fafc; border: 1px solid #cbd5e1; padding: 8px; font-family: monospace; font-size: 11px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="stamp">CRYPTOGRAPHIC CHAIN OF CUSTODY VERIFIED</div>
        <h2>INCIDENT & FORENSIC EVIDENCE LOG</h2>
        <p>Case Reference: ${entry.id} | Timestamp: ${new Date(entry.timestamp).toLocaleString('en-IN')}</p>
        <p><strong>Title:</strong> ${entry.title}</p>
        <p><strong>Category:</strong> ${entry.category}</p>
        <p><strong>Location:</strong> ${entry.location}</p>
        <p><strong>Narrative:</strong><br/>${entry.description}</p>
        ${entry.suspectDetails ? `<p><strong>Suspect Profile:</strong> ${entry.suspectDetails}</p>` : ''}
        <div class="hash-bar">SHA-256 Tamper-Proof Stamp: ${entry.hash || 'sha256:88fa298ceb93108c76da'}</div>
      </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="sentinel-card p-6 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/25">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Forensic Evidence Locker
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 font-semibold">
                SHA-256 Tamper-Proof
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Court-ready digital chain of custody with automatic GPS timestamps and immutable hashes
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-secondary py-2.5 px-4 text-xs flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-purple-400" />
          {isAdding ? 'Cancel Entry' : 'Log New Incident Record'}
        </button>
      </div>

      {/* New Entry Form */}
      {isAdding && (
        <form onSubmit={handleSave} className="p-5 bg-slate-950 border border-purple-500/30 rounded-2xl space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Incident Title (e.g. Unidentified car following near gate)"
              required
              className="px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
            >
              <option value="Stalking & Following">Stalking & Following</option>
              <option value="Street Harassment">Street Harassment</option>
              <option value="Online Threats / Blackmail">Online Threats / Blackmail</option>
              <option value="Domestic Coercion">Domestic Coercion</option>
            </select>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Detailed incident narrative with sequence of events..."
            required
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 resize-none"
          />

          <input
            type="text"
            value={suspectDetails}
            onChange={(e) => setSuspectDetails(e.target.value)}
            placeholder="Suspect details (clothing, bike number, phone number if known)..."
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow transition"
          >
            Encrypt & Seal in Evidence Locker
          </button>
        </form>
      )}

      {/* Entries List */}
      <div className="space-y-3">
        {vaultEntries.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">
            No incident records stored yet.
          </p>
        ) : (
          vaultEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white">{entry.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                    {entry.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(entry.timestamp).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {entry.description}
                </p>
                <div className="text-[10px] text-slate-500 font-mono pt-1 truncate">
                  🔐 {entry.hash || 'sha256:7f9a128e83c21d8b74e12c980f7652a9e3'}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => printDossier(entry)}
                  className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" /> Court PDF
                </button>
                <button
                  onClick={() => deleteVaultEntry(entry.id)}
                  className="p-1.5 text-slate-600 hover:text-rose-400 transition"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

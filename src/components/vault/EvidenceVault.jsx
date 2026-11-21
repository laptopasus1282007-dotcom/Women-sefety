import React, { useState, useRef } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  FileText,
  Plus,
  Trash2,
  Mic,
  MicOff,
  MapPin,
  Calendar,
  Download,
  Printer,
  Shield,
  Tag,
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const EvidenceVault = () => {
  const { vaultEntries, addVaultEntry, deleteVaultEntry, location } = useSecurity();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Form State
  const [category, setCategory] = useState('Stalking / Following');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [suspectDetails, setSuspectDetails] = useState('');
  const [vehicleOrContact, setVehicleOrContact] = useState('');
  const [witnesses, setWitnesses] = useState('');
  const [tags, setTags] = useState('');

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const categories = [
    'Stalking / Following',
    'Street / Public Harassment',
    'Cyber / Online Harassment / Doxxing',
    'Workplace / Professional Harassment',
    'Domestic / Relationship Coercion',
    'Extortion / Blackmail',
    'Unwanted Contact / Intimidation',
  ];

  // Start voice memo
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert('Microphone access denied or not supported on this browser.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please provide a title and incident description.');
      return;
    }

    const locString = location.lat && location.lng
      ? `Lat ${location.lat.toFixed(5)}, Lng ${location.lng.toFixed(5)} (±${location.accuracy}m)`
      : 'Location timestamped by device';

    addVaultEntry({
      title,
      category,
      description,
      suspectDetails,
      vehicleOrContact,
      witnesses,
      location: locString,
      audioMemo: audioUrl,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setSuspectDetails('');
    setVehicleOrContact('');
    setWitnesses('');
    setTags('');
    setAudioUrl(null);
    setIsFormOpen(false);
  };

  // Generate Formal Print / Law Enforcement Report
  const printFormalReport = (entry) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>CONFIDENTIAL INCIDENT & EVIDENCE REPORT - ${entry.title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
          .header { border-bottom: 2px solid #e11d48; padding-bottom: 15px; margin-bottom: 25px; }
          .badge { display: inline-block; background: #ffe4e6; color: #be123c; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 12px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; background: #f8fafc; padding: 15px; border-radius: 6px; }
          .section { margin-bottom: 20px; }
          .section h3 { margin-bottom: 6px; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
          .footer { margin-top: 40px; font-size: 11px; color: #64748b; border-top: 1px solid #cbd5e1; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>SECURITY4HER • TAMPER-EVIDENT INCIDENT LOG</h2>
          <p>Prepared for Law Enforcement, Legal Advisors, and Human Rights Advocates</p>
          <div class="badge">${entry.category}</div>
        </div>

        <div class="meta-grid">
          <div><strong>Incident Title:</strong> ${entry.title}</div>
          <div><strong>Date & Time:</strong> ${new Date(entry.timestamp).toLocaleString()}</div>
          <div><strong>Recorded GPS:</strong> ${entry.location}</div>
          <div><strong>Case ID:</strong> ${entry.id}</div>
        </div>

        <div class="section">
          <h3>Detailed Incident Narrative</h3>
          <p>${entry.description.replace(/\n/g, '<br/>')}</p>
        </div>

        ${entry.suspectDetails ? `
        <div class="section">
          <h3>Perpetrator / Suspect Identification</h3>
          <p>${entry.suspectDetails.replace(/\n/g, '<br/>')}</p>
        </div>
        ` : ''}

        ${entry.vehicleOrContact ? `
        <div class="section">
          <h3>Vehicle / Plate / Phone / Social Media Handles</h3>
          <p>${entry.vehicleOrContact}</p>
        </div>
        ` : ''}

        ${entry.witnesses ? `
        <div class="section">
          <h3>Witnesses / Bystanders</h3>
          <p>${entry.witnesses}</p>
        </div>
        ` : ''}

        <div class="footer">
          <p>This report was securely generated by the victim via the client-side Narishakti-Safety platform. Device metadata timestamped automatically. Keep this document confidential.</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Tamper-Evident Evidence Vault
            </h2>
            <p className="text-xs text-slate-400">
              Document harassment incidents with timestamps, voice notes, and exportable FIR legal summaries
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md"
        >
          <Plus className="w-4 h-4" />
          {isFormOpen ? 'Close Form' : 'Log New Incident'}
        </button>
      </div>

      {/* NEW INCIDENT LOGGING FORM */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Document New Incident
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Incident Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Incident Headline / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Unwanted stalking on bus route 42"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Detailed Narrative (What happened, words spoken, physical gestures) *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe the sequence of events chronologically..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Perpetrator Physical Description (Height, clothing, tattoos, hair)
              </label>
              <input
                type="text"
                placeholder="e.g. Approx 5'10, green cap, red jacket..."
                value={suspectDetails}
                onChange={(e) => setSuspectDetails(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Vehicle Plate / Phone / Social Media Profile
              </label>
              <input
                type="text"
                placeholder="e.g. Plate #ABC-1234, @insta_handle..."
                value={vehicleOrContact}
                onChange={(e) => setVehicleOrContact(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Voice Memo Recording */}
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-200 block">
                Discreet Voice Memo Evidence
              </span>
              <span className="text-[11px] text-slate-400">
                Record verbal notes or ambient audio immediately after the incident
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Mic className="w-3.5 h-3.5" />
                  Record Audio
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 animate-pulse transition"
                >
                  <MicOff className="w-3.5 h-3.5" />
                  Stop Recording
                </button>
              )}

              {audioUrl && (
                <audio controls src={audioUrl} className="h-8 max-w-[180px]" />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-md transition"
            >
              Save Secure Entry
            </button>
          </div>
        </form>
      )}

      {/* VAULT LOG LIST */}
      {vaultEntries.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
          <FileCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">Your Evidence Vault is Empty</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            All logged incidents are saved locally on your device with zero cloud tracking. Click "Log New Incident" to record any suspicious interaction.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {vaultEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-4.5 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-950/80 border border-rose-500/40 text-rose-300">
                    {entry.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" />
                    {new Date(entry.timestamp).toLocaleDateString()} at {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {entry.audioMemo && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 flex items-center gap-1">
                      <Mic className="w-2.5 h-2.5" /> Voice Recorded
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white">{entry.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {entry.description}
                </p>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-0.5">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{entry.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => printFormalReport(entry)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition border border-slate-700"
                  title="Generate Formal Police / FIR Report"
                >
                  <Printer className="w-3.5 h-3.5 text-rose-400" />
                  <span>Export Report</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Delete this evidence entry permanently?')) {
                      deleteVaultEntry(entry.id);
                    }
                  }}
                  className="p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-rose-950/30 transition"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

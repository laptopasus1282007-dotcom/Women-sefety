import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Users, Plus, Trash2, Star, Shield, Lock, MessageSquare, Check, Phone, Edit3, ChevronDown, ChevronUp, UserCheck, AlertCircle } from 'lucide-react';

export const EmergencyContactsManager = () => {
  const { contacts, addContact, deleteContact, updateContact, customSosMessage, setCustomSosMessage, masterPin, setMasterPin } = useSecurity();

  const [name, setName]                 = useState('');
  const [phone, setPhone]               = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [contactSaved, setContactSaved] = useState(false);
  const [messageDraft, setMessageDraft] = useState(customSosMessage);
  const [msgSaved, setMsgSaved]         = useState(false);
  const [expandedId, setExpandedId]     = useState(null);

  const relationships = ['Family', 'Friend', 'Partner', 'Colleague', 'Authority'];

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    addContact({ name, phone, relationship, isPrimary: contacts.length === 0, notifyOnSos: true });
    setName(''); setPhone('');
    setContactSaved(true);
    setTimeout(() => setContactSaved(false), 3000);
  };

  const handleSaveMessage = (e) => {
    e.preventDefault();
    setCustomSosMessage(messageDraft);
    setMsgSaved(true);
    setTimeout(() => setMsgSaved(false), 3000);
  };

  const togglePrimary = (contact) => {
    updateContact(contact.id, { isPrimary: !contact.isPrimary });
  };

  const relColor = {
    Family:    'bg-rose-500/20 text-rose-300 border-rose-500/30',
    Friend:    'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Partner:   'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Colleague: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    Authority: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur space-y-7">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Emergency Circle & Trusted Guardians</h2>
          <p className="text-xs text-slate-400">These contacts receive your live GPS coordinates & SOS distress message</p>
        </div>
      </div>

      {/* Contacts List */}
      {contacts.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-slate-700 rounded-2xl">
          <UserCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-400">No guardians added yet</p>
          <p className="text-xs text-slate-600 mt-1">Add trusted people who should be notified when you trigger SOS</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {contacts.map((c) => (
            <div key={c.id} className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/40 hover:border-slate-700 transition">
              <div
                className="p-4 flex items-center gap-3 cursor-pointer"
                onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500/30 to-purple-500/30 border border-slate-700 flex items-center justify-center font-black text-sm text-white flex-shrink-0">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-white">{c.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${relColor[c.relationship] || 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                      {c.relationship}
                    </span>
                    {c.isPrimary && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-400 border border-rose-500/40 font-bold flex items-center gap-1">
                        <Star className="w-2.5 h-2.5" /> Primary
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{c.phone}</p>
                </div>
                {/* Expand icon */}
                <div className="text-slate-500">
                  {expandedId === c.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded actions */}
              {expandedId === c.id && (
                <div className="px-4 pb-4 flex gap-2 border-t border-slate-800/80 pt-3">
                  <a
                    href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-1.5 px-3 py-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold hover:bg-emerald-900/60 transition"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Now
                  </a>
                  <button
                    onClick={() => togglePrimary(c)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      c.isPrimary
                        ? 'bg-rose-950/60 border border-rose-500/30 text-rose-400'
                        : 'bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5" />
                    {c.isPrimary ? 'Primary' : 'Set as Primary'}
                  </button>
                  <button
                    onClick={() => deleteContact(c.id)}
                    className="ml-auto flex items-center gap-1.5 px-3 py-2 bg-rose-950/40 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-semibold hover:bg-rose-900/40 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Contact Form */}
      <div className="p-5 bg-slate-950/60 border border-slate-700/60 rounded-2xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-rose-400" /> Add New Guardian
        </h3>
        <form onSubmit={handleAddContact} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Guardian Name (e.g. Papa, Maya, Roommate)"
              required
              className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile Number (e.g. +91 98765 43210)"
              required
              className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30 font-mono"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {relationships.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRelationship(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  relationship === r
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
              contactSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/20'
            }`}
          >
            {contactSaved ? <><Check className="w-4 h-4" /> Guardian Added!</> : <><Plus className="w-4 h-4" /> Add to Emergency Circle</>}
          </button>
        </form>
      </div>

      {/* SOS Message Customize */}
      <div className="p-5 bg-slate-950/60 border border-slate-700/60 rounded-2xl">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-400" /> Default SOS Emergency SMS/WhatsApp Message
        </h3>
        <p className="text-xs text-slate-400 mb-3">
          This exact message is dispatched with your live GPS location map link when you trigger Emergency SOS.
        </p>
        <form onSubmit={handleSaveMessage} className="space-y-3">
          <textarea
            value={messageDraft}
            onChange={(e) => setMessageDraft(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none font-sans"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-blue-400" /> Live Google Maps link is automatically appended.
            </p>
            <button
              type="submit"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${
                msgSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
              }`}
            >
              {msgSaved ? <><Check className="w-4 h-4" /> Saved!</> : 'Update SOS Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

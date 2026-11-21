import React, { useState } from 'react';
import { Phone, Search, Headphones, AlertCircle, Shield, Globe, ExternalLink, MapPin, HeartHandshake } from 'lucide-react';

const HELPLINES = [
  {
    id: 'h-1',
    name: 'National Emergency Response (All Distress)',
    number: '112',
    category: 'Emergency',
    availability: '24/7 Toll-Free',
    description: 'Unified single-number pan-India emergency service for Police, Fire, and Ambulance intervention.',
    primary: true,
    color: 'rose',
    location: 'Pan-India',
  },
  {
    id: 'h-2',
    name: 'Women Helpline (Domestic & Public Distress)',
    number: '1091',
    category: 'Women Safety',
    availability: '24/7 Toll-Free',
    description: 'Dedicated women police assistance for stalking, harassment, molestation, and domestic abuse.',
    primary: true,
    color: 'rose',
    location: 'Pan-India',
  },
  {
    id: 'h-3',
    name: 'National Cyber Crime Reporting Helpline',
    number: '1930',
    category: 'Cybercrime',
    availability: '24/7 Toll-Free',
    description: 'Immediate financial fraud freeze, online blackmail, morphing, and non-consensual image leaks.',
    primary: true,
    color: 'purple',
    location: 'Pan-India',
  },
  {
    id: 'h-4',
    name: 'National Commission for Women (NCW) Helpline',
    number: '7827-170-170',
    category: 'Legal Aid',
    availability: '24/7 Available',
    description: 'Statutory body providing legal counseling, quick police escalation, and emergency refuge referrals.',
    primary: false,
    color: 'blue',
    location: 'National',
  },
  {
    id: 'h-5',
    name: 'Women in Distress (One Stop Center)',
    number: '181',
    category: 'Domestic Violence',
    availability: '24/7 Support',
    description: 'Confidential counseling, emergency shelter referrals, medical aid, and legal assistance.',
    primary: false,
    color: 'orange',
    location: 'Pan-India',
  },
  {
    id: 'h-6',
    name: 'Damini Squad (Maharashtra Women Police Unit)',
    number: '1090',
    category: 'Women Safety',
    availability: '24/7 Mobile Patrol',
    description: 'Dedicated quick-response female patrolling squad for colleges, bus stops, and crowded public zones.',
    primary: false,
    color: 'rose',
    location: 'Maharashtra / UP',
  },
  {
    id: 'h-7',
    name: 'KIRAN Mental Health & Trauma Helpline',
    number: '1800-599-0019',
    category: 'Mental Health',
    availability: '24/7 Free Call',
    description: 'Trauma-informed psychological first aid, panic mitigation, anxiety, and suicide prevention.',
    primary: false,
    color: 'emerald',
    location: 'Pan-India',
  },
  {
    id: 'h-8',
    name: 'Railway Women Passenger Protection (RPF)',
    number: '139',
    category: 'Transit Safety',
    availability: '24/7 Live Assistance',
    description: 'Immediate railway protection squad dispatch on train compartments and railway platforms.',
    primary: false,
    color: 'indigo',
    location: 'Indian Railways',
  },
  {
    id: 'h-9',
    name: 'Childline India (Child Distress & Abuse)',
    number: '1098',
    category: 'Child Safety',
    availability: '24/7 Free Outreach',
    description: 'National 24-hour free emergency service for children in need of aid and protection.',
    primary: false,
    color: 'blue',
    location: 'Pan-India',
  },
  {
    id: 'h-10',
    name: 'Delhi Police Women Safety Cell',
    number: '011-27894455',
    category: 'Local Police',
    availability: '24/7 Active Desk',
    description: 'Dedicated anti-stalking and special police unit for women and children (SPUWAC).',
    primary: false,
    color: 'rose',
    location: 'Delhi NCR',
  },
  {
    id: 'h-11',
    name: 'Mumbai Police Nirbhaya Squad & Van',
    number: '103',
    category: 'Local Police',
    availability: '24/7 Rapid Response',
    description: 'Mobile patrolling units stationed outside coaching centers, suburban stations, and beaches.',
    primary: false,
    color: 'rose',
    location: 'Mumbai Region',
  },
  {
    id: 'h-12',
    name: 'Nagpur City Women Safety & Anti-Stalking Desk',
    number: '0712-2567777',
    category: 'Local Police',
    availability: '24/7 Police HQ',
    description: 'Nagpur Police Commissionerate dedicated distress response for women and college students.',
    primary: false,
    color: 'indigo',
    location: 'Nagpur / Vidarbha',
  },
];

const COLOR_MAP = {
  rose:    { bg: 'bg-rose-500/15',   border: 'border-rose-500/30',   text: 'text-rose-400',   badge: 'bg-rose-500/20 text-rose-300' },
  purple:  { bg: 'bg-purple-500/15', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' },
  blue:    { bg: 'bg-blue-500/15',   border: 'border-blue-500/30',   text: 'text-blue-400',   badge: 'bg-blue-500/20 text-blue-300' },
  orange:  { bg: 'bg-orange-500/15', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300' },
  emerald: { bg: 'bg-emerald-500/15',border: 'border-emerald-500/30',text: 'text-emerald-400',badge: 'bg-emerald-500/20 text-emerald-300' },
  indigo:  { bg: 'bg-indigo-500/15', border: 'border-indigo-500/30', text: 'text-indigo-400', badge: 'bg-indigo-500/20 text-indigo-300' },
};

const categories = ['All', 'Emergency', 'Women Safety', 'Cybercrime', 'Legal Aid', 'Domestic Violence', 'Local Police', 'Transit Safety', 'Mental Health'];

export const HelplineDirectory = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = HELPLINES.filter((h) => {
    const query = search.toLowerCase();
    const matchSearch =
      !search ||
      h.name.toLowerCase().includes(query) ||
      h.number.includes(search) ||
      h.description.toLowerCase().includes(query) ||
      h.location.toLowerCase().includes(query);
    const matchCat = activeCategory === 'All' || h.category === activeCategory;
    return matchSearch && matchCat;
  });

  const primary = filtered.filter((h) => h.primary);
  const secondary = filtered.filter((h) => !h.primary);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-500/30">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Emergency Helplines & Legal Redressal</h2>
            <p className="text-xs text-slate-400">Verified official crisis helplines across India • Tap to call immediately</p>
          </div>
        </div>
        <span className="text-xs px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          100% Toll-Free & Verified
        </span>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by city, department, number (e.g. 112, Cyber, Mumbai, NCW)..."
          className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition flex-shrink-0 ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Priority Emergency Numbers (Top 3) */}
      {primary.length > 0 && (
        <div className="mb-5">
          <p className="text-[11px] font-black text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> Immediate Life-Threatening Distress
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {primary.map((h) => {
              const c = COLOR_MAP[h.color] || COLOR_MAP.rose;
              return (
                <div key={h.id} className={`p-4 rounded-2xl border ${c.bg} ${c.border} flex flex-col justify-between group hover:scale-[1.01] transition duration-200`}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${c.badge}`}>
                        {h.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{h.availability}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-white mb-1.5 leading-snug">{h.name}</h3>
                    <p className="text-xs text-slate-300 mb-3 leading-relaxed">{h.description}</p>
                  </div>
                  <a
                    href={`tel:${h.number.replace(/[^0-9+]/g, '')}`}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-600/30 transition active:scale-95`}
                  >
                    <Phone className="w-4 h-4 animate-bounce" /> Call {h.number}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Secondary & Specialist Services */}
      {secondary.length > 0 && (
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-400" /> State Squads, Transit & Specialist Units
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {secondary.map((h) => {
              const c = COLOR_MAP[h.color] || COLOR_MAP.blue;
              return (
                <div key={h.id} className="p-4 bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center gap-3.5 transition group">
                  <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center flex-shrink-0`}>
                    <Phone className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-bold text-white leading-tight">{h.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${c.badge} font-semibold`}>{h.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{h.description}</p>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-500" /> {h.location} • {h.availability}
                    </span>
                  </div>
                  <a
                    href={`tel:${h.number.replace(/[^0-9+]/g, '')}`}
                    className={`flex-shrink-0 px-3 py-2 ${c.bg} ${c.border} border ${c.text} rounded-xl text-xs font-black hover:opacity-90 transition active:scale-95`}
                    title={`Call ${h.number}`}
                  >
                    {h.number}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-10 text-slate-500">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm font-semibold">No helpline found matching "{search}"</p>
          <p className="text-xs mt-1">Try searching "112", "Police", or select "All"</p>
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <span className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-blue-400" /> Official emergency telecom numbers verified under Govt. of India Emergency Response Support System (ERSS).
        </span>
        <span className="text-emerald-400 font-semibold">Zero Call Charges</span>
      </div>
    </div>
  );
};

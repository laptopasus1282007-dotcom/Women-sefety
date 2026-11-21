import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckSquare,
  Square,
  Smartphone,
  Eye,
  Lock,
  Radio,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

const AUDIT_SECTIONS = [
  {
    id: 'stalkerware',
    title: 'Stalkerware & Hidden Spyware Detection',
    icon: Smartphone,
    description: 'Ensure no unauthorized monitoring apps or device management profiles are running.',
    items: [
      {
        id: 'sw-1',
        title: 'Inspect Device Administrator & Accessibility Services',
        details: 'Go to Settings > Accessibility and Settings > Security > Device Admin Apps. Check for unknown apps granted deep monitoring permissions and revoke them immediately.',
      },
      {
        id: 'sw-2',
        title: 'Check for Unknown Profiles / Enterprise Certificates',
        details: 'On iPhone: Go to Settings > General > VPN & Device Management. On Android: Check Settings > Security > Device Administration. Ensure no stranger installed a management certificate.',
      },
      {
        id: 'sw-3',
        title: 'Audit Suspicious Battery & Data Drain',
        details: 'Go to Settings > Battery > Battery Usage. Look for obscure apps consuming high background battery or high background mobile data.',
      },
      {
        id: 'sw-4',
        title: 'Verify Unknown Bluetooth Trackers (AirTags / Tile)',
        details: 'On iPhone: Ensure "Item Safety Alerts" are enabled in Find My. On Android: Check Settings > Safety & Emergency > Unknown Tracker Alerts.',
      },
    ],
  },
  {
    id: 'location',
    title: 'Location Privacy & Live Tracking Leaks',
    icon: Radio,
    description: 'Verify which apps and individuals can see your real-time physical whereabouts.',
    items: [
      {
        id: 'loc-1',
        title: 'Audit Google Maps Real-Time Location Sharing',
        details: 'Open Google Maps > Tap your profile icon > "Location Sharing". Ensure you are not inadvertently sharing your live location with an ex-partner or acquaintance.',
      },
      {
        id: 'loc-2',
        title: 'Review Apple "Find My" People Tab',
        details: 'Open Apple "Find My" > Tap "People". Confirm only people you explicitly trust are permitted to see your current location.',
      },
      {
        id: 'loc-3',
        title: 'Check WhatsApp & Telegram Live Location Sharing',
        details: 'In WhatsApp: Settings > Privacy > Live Location. Verify no active location sharing sessions are ongoing in any group or individual chat.',
      },
      {
        id: 'loc-4',
        title: 'Strip Geotag / EXIF Metadata from Photos',
        details: 'Photos taken with your camera embed exact GPS coordinates in EXIF tags. Disable camera GPS geotagging or use a photo scrubber before sharing pictures publicly.',
      },
    ],
  },
  {
    id: 'social',
    title: 'Social Media & Doxxing Defense',
    icon: Eye,
    description: 'Protect personal identity, home address, and workplace from online stalkers.',
    items: [
      {
        id: 'soc-1',
        title: 'Make Instagram & Facebook Profiles Private',
        details: 'Set your profile to Private. Restrict who can see your followers/friends list so stalkers cannot harass your connections.',
      },
      {
        id: 'soc-2',
        title: 'Disable LinkedIn "Viewed Your Profile" & Public Visibility',
        details: 'Go to LinkedIn Settings > Visibility > Profile viewing options. Browse anonymously if researching individuals or companies.',
      },
      {
        id: 'soc-3',
        title: 'Remove Phone Number from Public Lookups (Truecaller, etc.)',
        details: 'Visit Truecaller unlist page (truecaller.com/unlisting) to remove your personal name and number from public reverse lookups.',
      },
      {
        id: 'soc-4',
        title: 'Lock Down Two-Factor Authentication (2FA) with an App',
        details: 'Enable 2FA on Google, Apple, WhatsApp, and Instagram using an Authenticator app (like Google Authenticator or Bitwarden) rather than SMS.',
      },
    ],
  },
];

export const DigitalAudit = () => {
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('s4h_audit_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [expandedSection, setExpandedSection] = useState('stalkerware');

  const toggleCheck = (itemId) => {
    setCheckedItems(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      localStorage.setItem('s4h_audit_progress', JSON.stringify(next));
      return next;
    });
  };

  const totalItems = AUDIT_SECTIONS.reduce((acc, s) => acc + s.items.length, 0);
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const scorePercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Digital Security & Stalkerware Audit
            </h2>
            <p className="text-xs text-slate-400">
              Interactive privacy checklist to safeguard against phone surveillance and location leaks
            </p>
          </div>
        </div>

        {/* Progress Gauge */}
        <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Security Score</span>
            <span className="text-sm font-bold text-blue-400">{scorePercent}% Complete</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center font-bold text-xs text-white">
            {completedCount}/{totalItems}
          </div>
        </div>
      </div>

      {/* Sections Accordion */}
      <div className="space-y-4">
        {AUDIT_SECTIONS.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          const sectionCompleted = section.items.filter(i => checkedItems[i.id]).length;

          return (
            <div
              key={section.id}
              className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-800/40 text-left transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 text-slate-300 rounded-xl border border-slate-800">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{section.title}</h3>
                    <p className="text-xs text-slate-400">{section.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium text-slate-400 hidden sm:inline">
                    {sectionCompleted}/{section.items.length} verified
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 pt-1 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
                  {section.items.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-blue-950/20 border-blue-500/30 text-slate-300'
                            : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="pt-0.5 text-blue-400">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-blue-400" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-500" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <h4 className={`text-xs font-bold ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

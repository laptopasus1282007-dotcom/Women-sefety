import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Info,
  FileCheck2,
  BookOpen,
  Send,
  Sparkles,
  Brain,
  RefreshCw,
  Copy,
  CheckCheck,
} from 'lucide-react';

const THREAT_PATTERNS = [
  {
    category: 'Imminent Physical Harm & Bodily Violence',
    severity: 'CRITICAL',
    keywords: ['kill', 'murder', 'hurt you', 'beat you', 'break your', 'slit', 'choke', 'shoot', 'stab', 'die', 'dead', 'burn'],
    legalAdvice: 'Immediate emergency threat. Contact local police (112 / 911) immediately. Do not meet alone.',
    color: 'rose',
    icon: AlertOctagon,
  },
  {
    category: 'Stalking & Physical Surveillance',
    severity: 'HIGH',
    keywords: ['watching you', 'know where you live', 'outside your', 'saw you today', 'follow you', 'at your work', 'tracked', 'find you wherever'],
    legalAdvice: 'Active stalking behavior. Document all sightings, vary your daily routes, and inform building security.',
    color: 'orange',
    icon: AlertTriangle,
  },
  {
    category: 'Extortion, Blackmail & Intimate Image Threats',
    severity: 'CRITICAL',
    keywords: ['leak your', 'expose you', 'send your photos', 'nudes', 'blackmail', 'pay me or', 'tell everyone what', 'ruin your life'],
    legalAdvice: 'Extortion is a serious felony. Cease communication immediately. DO NOT pay or send further content. Preserve for cyber crime authorities.',
    color: 'rose',
    icon: AlertOctagon,
  },
  {
    category: 'Doxxing & Personal Data Exposure',
    severity: 'HIGH',
    keywords: ['post your address', 'your phone number', 'dox', 'doxx', 'tell your employer', 'post online', 'expose your family'],
    legalAdvice: 'Doxxing violation. Lock down social media, request immediate content removal, and file a cyber harassment complaint.',
    color: 'orange',
    icon: AlertTriangle,
  },
  {
    category: 'Coercive Control & Psychological Intimidation',
    severity: 'MODERATE',
    keywords: ['you belong to me', 'never leave me', 'obey', 'shut up', 'worthless', 'nobody else will want you', 'block you from friends'],
    legalAdvice: 'Signs of abusive coercive control. Reach out to domestic violence and crisis counseling helplines for safe exit planning.',
    color: 'amber',
    icon: AlertTriangle,
  },
];

const SEVERITY_CONFIG = {
  CRITICAL: {
    label: 'CRITICAL THREAT',
    bg:    'bg-rose-950/60',
    border:'border-rose-500/40',
    text:  'text-rose-300',
    badge: 'bg-rose-500 text-white',
    glow:  'shadow-[0_0_30px_rgba(251,78,114,0.2)]',
    icon:  AlertOctagon,
  },
  HIGH: {
    label: 'HIGH RISK',
    bg:    'bg-orange-950/60',
    border:'border-orange-500/40',
    text:  'text-orange-300',
    badge: 'bg-orange-500 text-white',
    glow:  'shadow-[0_0_30px_rgba(249,115,22,0.2)]',
    icon:  AlertTriangle,
  },
  MODERATE: {
    label: 'MODERATE CONCERN',
    bg:    'bg-amber-950/60',
    border:'border-amber-500/40',
    text:  'text-amber-300',
    badge: 'bg-amber-500 text-black',
    glow:  '',
    icon:  Info,
  },
  LOW: {
    label: 'NO THREATS DETECTED',
    bg:    'bg-emerald-950/60',
    border:'border-emerald-500/40',
    text:  'text-emerald-300',
    badge: 'bg-emerald-500 text-black',
    glow:  '',
    icon:  CheckCircle2,
  },
};

// Gemini AI analysis
async function analyzeWithGemini(text) {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!GEMINI_API_KEY) return null;
  
  const prompt = `You are a women's safety AI assistant. Analyze the following message/text for potential threats, harassment, or danger signals. Be concise and actionable.

Text to analyze: "${text}"

Respond in this JSON format:
{
  "overallRisk": "CRITICAL|HIGH|MODERATE|LOW",
  "summary": "One sentence summary of the threat level",
  "detectedThreats": ["list of specific threats found"],
  "immediateActions": ["list of 2-3 immediate steps to take"],
  "legalOptions": "Brief description of relevant legal options",
  "safetyTip": "One specific safety tip"
}

Only return valid JSON, nothing else.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 500 },
        }),
      }
    );
    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch {
    return null;
  }
}

export const ThreatAnalyzer = () => {
  const { addVaultEntry } = useSecurity();
  const [inputText, setInputText]       = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [aiResult, setAiResult]         = useState(null);
  const [vaultSaved, setVaultSaved]     = useState(false);
  const [isAiLoading, setIsAiLoading]   = useState(false);
  const [copied, setCopied]             = useState(false);
  const [tab, setTab]                   = useState('local'); // 'local' | 'ai'

  const analyzeThreat = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Local pattern analysis
    const lower = inputText.toLowerCase();
    const detected = [];
    THREAT_PATTERNS.forEach((p) => {
      const matched = p.keywords.filter((kw) => lower.includes(kw));
      if (matched.length > 0) {
        detected.push({ category: p.category, severity: p.severity, matchedWords: matched, legalAdvice: p.legalAdvice, icon: p.icon });
      }
    });

    let overallSeverity = 'LOW';
    if (detected.some((c) => c.severity === 'CRITICAL'))  overallSeverity = 'CRITICAL';
    else if (detected.some((c) => c.severity === 'HIGH'))  overallSeverity = 'HIGH';
    else if (detected.some((c) => c.severity === 'MODERATE')) overallSeverity = 'MODERATE';

    setAnalysisResult({ overallSeverity, detectedCategories: detected });
    setVaultSaved(false);
    setAiResult(null);
    setTab('local');

    // AI analysis in background
    setIsAiLoading(true);
    const ai = await analyzeWithGemini(inputText);
    setAiResult(ai);
    setIsAiLoading(false);
    if (ai) setTab('ai');
  };

  const handleSaveToVault = () => {
    if (!analysisResult) return;
    addVaultEntry({
      title: `Threat Analysis — ${new Date().toLocaleString()}`,
      category: 'Cyber / Online Harassment / Doxxing',
      description: inputText,
      suspectDetails: analysisResult.detectedCategories.map((c) => c.category).join('; '),
      timestamp: new Date().toISOString(),
      location: 'Recorded from Threat Analyzer tool',
      tags: ['ThreatAnalysis', analysisResult.overallSeverity],
    });
    setVaultSaved(true);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cfg = analysisResult ? SEVERITY_CONFIG[analysisResult.overallSeverity] : null;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              AI Threat Analyzer
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Gemini AI
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Paste threatening messages for instant AI-powered risk assessment
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={analyzeThreat} className="space-y-3 mb-5">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste the threatening message, suspicious text, or describe an incident here…"
            rows={4}
            className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-2xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 resize-none transition"
          />
          {inputText && (
            <button
              type="button"
              onClick={handleCopy}
              className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition"
              title="Copy text"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-500/20"
          >
            <Search className="w-4 h-4" />
            Analyze for Threats
            {isAiLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin ml-1" />}
          </button>
          {inputText && (
            <button
              type="button"
              onClick={() => { setInputText(''); setAnalysisResult(null); setAiResult(null); }}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-sm transition"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Results */}
      {analysisResult && cfg && (
        <div className="space-y-4 animate-fade-up">
          {/* Severity Banner */}
          <div className={`flex items-center justify-between p-4 rounded-2xl border ${cfg.bg} ${cfg.border} ${cfg.glow}`}>
            <div className="flex items-center gap-3">
              <cfg.icon className={`w-6 h-6 ${cfg.text}`} />
              <div>
                <span className={`text-sm font-bold ${cfg.text}`}>{cfg.label}</span>
                {aiResult?.summary && (
                  <p className="text-xs text-slate-400 mt-0.5 max-w-sm">{aiResult.summary}</p>
                )}
              </div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-black ${cfg.badge}`}>
              {analysisResult.overallSeverity}
            </span>
          </div>

          {/* Tabs */}
          {aiResult && (
            <div className="flex gap-1 p-1 bg-slate-950/60 rounded-xl border border-slate-800">
              <button
                onClick={() => setTab('local')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${tab === 'local' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Pattern Match
              </button>
              <button
                onClick={() => setTab('ai')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1 ${tab === 'ai' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Sparkles className="w-3 h-3" /> Gemini AI Analysis
              </button>
            </div>
          )}

          {/* Local Results Tab */}
          {tab === 'local' && (
            <div className="space-y-3">
              {analysisResult.detectedCategories.length > 0 ? (
                analysisResult.detectedCategories.map((cat, i) => {
                  const catCfg = SEVERITY_CONFIG[cat.severity];
                  return (
                    <div key={i} className={`p-4 rounded-2xl border ${catCfg.bg} ${catCfg.border}`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`text-xs font-bold ${catCfg.text}`}>{cat.category}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black whitespace-nowrap ${catCfg.badge}`}>
                          {cat.severity}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {cat.matchedWords.map((w, j) => (
                          <span key={j} className="text-[10px] px-2 py-0.5 bg-black/30 text-slate-300 border border-slate-700 rounded-full font-mono">
                            "{w}"
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-slate-300 leading-relaxed">{cat.legalAdvice}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/40">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-semibold">No threat patterns detected</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 ml-7">
                    The text does not match known threat keywords. If you still feel unsafe, trust your instincts and contact someone you trust.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* AI Results Tab */}
          {tab === 'ai' && aiResult && (
            <div className="space-y-3">
              {aiResult.detectedThreats?.length > 0 && (
                <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-950/40">
                  <p className="text-xs font-bold text-purple-300 mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Threats Identified by AI
                  </p>
                  <ul className="space-y-1">
                    {aiResult.detectedThreats.map((t, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {aiResult.immediateActions?.length > 0 && (
                <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-950/40">
                  <p className="text-xs font-bold text-rose-300 mb-2 flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5" /> Immediate Actions
                  </p>
                  <ol className="space-y-1">
                    {aiResult.immediateActions.map((a, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-rose-400 font-bold mt-0.5">{i + 1}.</span> {a}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {aiResult.legalOptions && (
                <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-950/40">
                  <p className="text-xs font-bold text-blue-300 mb-1.5 flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5" /> Legal Options
                  </p>
                  <p className="text-xs text-slate-300">{aiResult.legalOptions}</p>
                </div>
              )}
              {aiResult.safetyTip && (
                <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/40">
                  <p className="text-xs font-bold text-emerald-300 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Safety Tip
                  </p>
                  <p className="text-xs text-slate-300">{aiResult.safetyTip}</p>
                </div>
              )}
            </div>
          )}

          {/* Save to Vault */}
          <button
            onClick={handleSaveToVault}
            disabled={vaultSaved}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
              vaultSaved
                ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 cursor-default'
                : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300'
            }`}
          >
            {vaultSaved ? (
              <><CheckCircle2 className="w-4 h-4" /> Saved to Evidence Vault</>
            ) : (
              <><FileCheck2 className="w-4 h-4" /> Save Analysis to Evidence Vault</>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

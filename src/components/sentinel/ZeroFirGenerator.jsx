import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  FileText,
  Scale,
  Download,
  Printer,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Send,
  BookOpen,
  Info,
} from 'lucide-react';

const LEGAL_SECTIONS = [
  {
    type: 'Stalking & Physical / Digital Surveillance',
    bns: 'Section 78 BNS 2023 (formerly Sec 354D IPC)',
    penalty: 'Cognizable & Non-Bailable on 2nd conviction (up to 5 years imprisonment)',
    rights: 'Right to Zero FIR at any police station without jurisdictional refusal.',
  },
  {
    type: 'Sexual Harassment & Physical Molestation',
    bns: 'Section 74 & 75 BNS 2023 (formerly Sec 354 & 354A IPC)',
    penalty: 'Rigorous imprisonment up to 7 years + fine',
    rights: 'Statement must be recorded by a woman police officer or woman magistrate.',
  },
  {
    type: 'Non-Consensual Image Sharing & Morphing',
    bns: 'Section 66E, 67 & 67A Information Technology Act + Sec 77 BNS',
    penalty: 'Non-Bailable, 3 to 7 years imprisonment',
    rights: 'Mandatory takedown within 24 hours under IT Intermediary Rules 2021.',
  },
  {
    type: 'Criminal Intimidation & Extortion',
    bns: 'Section 351 BNS 2023 (formerly Sec 506 IPC)',
    penalty: 'Imprisonment up to 7 years',
    rights: 'Immediate police protection order can be requisitioned.',
  },
];

export const ZeroFirGenerator = () => {
  const { location } = useSecurity();
  const [incidentType, setIncidentType] = useState(LEGAL_SECTIONS[0].type);
  const [complainantName, setComplainantName] = useState('');
  const [suspectInfo, setSuspectInfo] = useState('');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [incidentTime, setIncidentTime] = useState('21:30');
  const [incidentDetails, setIncidentDetails] = useState('');
  const [generatedDoc, setGeneratedDoc] = useState(null);

  const selectedLegal = LEGAL_SECTIONS.find((s) => s.type === incidentType) || LEGAL_SECTIONS[0];

  const handleGenerateFIR = (e) => {
    e.preventDefault();
    if (!complainantName.trim() || !incidentDetails.trim()) {
      alert('Please enter your name and incident details to generate the Zero FIR.');
      return;
    }

    const doc = {
      caseId: `ZFIR-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-IN'),
      timestamp: new Date().toLocaleTimeString('en-IN'),
      complainantName,
      incidentType,
      legalSection: selectedLegal.bns,
      penalty: selectedLegal.penalty,
      location: location.address || 'Nagpur, Maharashtra',
      suspectInfo: suspectInfo || 'Identity unknown / To be investigated',
      incidentDate,
      incidentTime,
      incidentDetails,
    };

    setGeneratedDoc(doc);
  };

  const handlePrint = () => {
    if (!generatedDoc) return;
    const printWin = window.open('', '_blank');
    if (!printWin) return;

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>FORMAL ZERO-FIR COMPLAINT DRAFT - ${generatedDoc.caseId}</title>
        <style>
          body { font-family: 'Times New Roman', Times, serif; padding: 40px; color: #111; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 25px; }
          .stamp { display: inline-block; border: 2px solid #b91c1c; color: #b91c1c; padding: 4px 12px; font-weight: bold; font-size: 14px; letter-spacing: 1px; }
          .field-row { margin-bottom: 12px; }
          .field-label { font-weight: bold; }
          .narrative-box { border: 1px solid #ccc; padding: 15px; margin-top: 15px; background: #fdfdfd; min-height: 120px; }
          .legal-cite { background: #f1f5f9; padding: 10px; border-left: 4px solid #0f172a; margin: 15px 0; font-size: 13px; }
          .footer { margin-top: 60px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="stamp">FORMAL ZERO-FIR APPLICATION UNDER SEC 173(1) BNSS 2023</div>
          <h2>TO THE STATION HOUSE OFFICER (SHO) / SUPERINTENDENT OF POLICE</h2>
          <p>Subject: Registration of Zero-FIR under ${generatedDoc.legalSection}</p>
        </div>

        <div class="field-row"><span class="field-label">Reference Docket ID:</span> ${generatedDoc.caseId}</div>
        <div class="field-row"><span class="field-label">Date of Filing:</span> ${generatedDoc.date} at ${generatedDoc.timestamp}</div>
        <div class="field-row"><span class="field-label">Complainant / Aggrieved Person:</span> ${generatedDoc.complainantName}</div>
        <div class="field-row"><span class="field-label">Place of Incident:</span> ${generatedDoc.location}</div>
        <div class="field-row"><span class="field-label">Date & Time of Occurrence:</span> ${generatedDoc.incidentDate} around ${generatedDoc.incidentTime}</div>
        <div class="field-row"><span class="field-label">Suspect / Accused Information:</span> ${generatedDoc.suspectInfo}</div>

        <div class="legal-cite">
          <strong>Invoked Statutory Provisions:</strong><br/>
          • Offence Type: ${generatedDoc.incidentType}<br/>
          • Applicable Law: ${generatedDoc.legalSection}<br/>
          • Prescribed Statutory Penalty: ${generatedDoc.penalty}<br/>
          • Statutory Note: Under Supreme Court mandates (Lalita Kumari vs Govt of UP) and Sec 173(1) of BNSS 2023, registration of Zero-FIR is MANDATORY irrespective of jurisdictional territory.
        </div>

        <h3>Statement of Fact & Incident Narrative:</h3>
        <div class="narrative-box">
          ${generatedDoc.incidentDetails.replace(/\n/g, '<br/>')}
        </div>

        <p style="margin-top: 25px;">
          I hereby affirm that the facts stated above are true to the best of my knowledge and memory. I request immediate registration of this Zero-FIR and transfer to the jurisdictional police station, with instant police protection.
        </p>

        <div class="footer">
          <div>
            <br/><br/>
            ____________________________<br/>
            (Signature / Thumb of Complainant)
          </div>
          <div>
            <br/><br/>
            ____________________________<br/>
            (Receiving Duty Officer Seal & Date)
          </div>
        </div>
      </body>
      </html>
    `);
    printWin.document.close();
    printWin.print();
  };

  return (
    <div className="sentinel-card p-6 border border-slate-800 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/25">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Instant Zero-FIR & BNS 2024 Legal Copilot
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-semibold">
              Statutory Protection
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sec 173(1) BNSS 2023 guarantees that police CANNOT refuse to register an FIR based on jurisdiction
          </p>
        </div>
      </div>

      {/* Statutory Rights Card */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <span className="text-[11px] font-bold text-rose-400 uppercase tracking-widest block mb-1">
            Selected Legal Section:
          </span>
          <span className="text-sm font-bold text-white">{selectedLegal.bns}</span>
          <p className="text-xs text-slate-400 mt-0.5">{selectedLegal.rights}</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-300">
          Penalty: {selectedLegal.penalty.split('(')[0]}
        </span>
      </div>

      {/* FIR Complaint Generator Form */}
      <form onSubmit={handleGenerateFIR} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Category of Offence / Violence
            </label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {LEGAL_SECTIONS.map((s) => (
                <option key={s.type} value={s.type}>
                  {s.type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Complainant Full Name (Victim / Representative)
            </label>
            <input
              type="text"
              value={complainantName}
              onChange={(e) => setComplainantName(e.target.value)}
              placeholder="e.g. Aditi Sharma"
              required
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Date of Incident
            </label>
            <input
              type="date"
              value={incidentDate}
              onChange={(e) => setIncidentDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Approximate Time
            </label>
            <input
              type="time"
              value={incidentTime}
              onChange={(e) => setIncidentTime(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Suspect Details / Vehicle Plate / Number
            </label>
            <input
              type="text"
              value={suspectInfo}
              onChange={(e) => setSuspectInfo(e.target.value)}
              placeholder="e.g. MH-31 Bike rider, dark helmet"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1.5">
            Narrative of the Incident (What happened?)
          </label>
          <textarea
            value={incidentDetails}
            onChange={(e) => setIncidentDetails(e.target.value)}
            rows={4}
            placeholder="Describe the incident clearly: what occurred, location details, threats made, witnesses present..."
            required
            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 resize-none font-sans"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" /> Generate Official Zero-FIR Legal Dossier
        </button>
      </form>

      {/* Generated Preview & Actions */}
      {generatedDoc && (
        <div className="p-5 bg-slate-950 border border-blue-500/40 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Ready for Police Submission: {generatedDoc.caseId}
            </span>
            <button
              onClick={handlePrint}
              className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow transition"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Export Official PDF
            </button>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 font-mono leading-relaxed">
            <p><b>APPLICATION FOR ZERO-FIR UNDER SEC 173(1) BNSS 2023</b></p>
            <p>Complainant: {generatedDoc.complainantName} | Date: {generatedDoc.date}</p>
            <p>Offence Charged: {generatedDoc.legalSection} ({generatedDoc.incidentType})</p>
            <p>Location: {generatedDoc.location}</p>
            <p className="font-sans text-slate-400 pt-2 border-t border-slate-800">
              "{generatedDoc.incidentDetails}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

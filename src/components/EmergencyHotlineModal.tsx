import React, { useState } from 'react';
import { FREEDOM_TREE_INFO } from '../data/mockData';
import {
  PhoneCall,
  X,
  AlertTriangle,
  MapPin,
  Ambulance,
  CheckCircle2,
  Clock,
  Shield,
  Activity,
} from 'lucide-react';

interface EmergencyHotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  isKrio: boolean;
}

export const EmergencyHotlineModal: React.FC<EmergencyHotlineModalProps> = ({
  isOpen,
  onClose,
  isKrio,
}) => {
  const [dispatched, setDispatched] = useState(false);
  const [callerName, setCallerName] = useState('');
  const [villageName, setVillageName] = useState('');
  const [selectedDanger, setSelectedDanger] = useState('Heavy Bleeding / Hemorrhage');

  if (!isOpen) return null;

  const handleSimulateDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callerName.trim() || !villageName.trim()) return;
    setDispatched(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-700/80 shadow-2xl text-slate-100 relative animate-in fade-in zoom-in-95 ring-1 ring-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {dispatched ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-300 mx-auto flex items-center justify-center border-2 border-emerald-500 ring-8 ring-emerald-900/40">
              <Ambulance className="w-8 h-8 animate-pulse" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Emergency Team Dispatched
            </span>
            <h3 className="text-2xl font-black text-white">Ambulance Team En Route</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Freedom Tree Bo Headquarters (11 Bundu St) has dispatched ambulance unit to{' '}
              <strong className="text-amber-300">{villageName}</strong> for{' '}
              <strong className="text-white">{callerName}</strong>.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2 text-slate-300">
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span>Emergency Hotline Active:</span>
                <span>{FREEDOM_TREE_INFO.phone}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                • Keep mother lying on her left side.
                <br />• Wrap infant warm if already delivered.
                <br />• Lead partner: New Harvest Global Ministries team standing by.
              </p>
            </div>

            <button
              onClick={() => {
                setDispatched(false);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md transition-colors"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-950/80 text-rose-400 flex items-center justify-center border border-rose-800/80">
                <PhoneCall className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  24/7 Obstetric Emergency Hotline
                </span>
                <h3 className="text-xl font-black text-white">Freedom Tree Bo Center</h3>
              </div>
            </div>

            {/* Direct Call Big Button */}
            <div className="bg-gradient-to-br from-rose-950/90 to-slate-950 p-4 rounded-2xl border border-rose-800/70 mb-6 text-center space-y-2">
              <span className="text-xs text-rose-300 font-semibold block">
                Tap to Call Central Dispatch in Sierra Leone:
              </span>
              <a
                href={`tel:${FREEDOM_TREE_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-lg sm:text-xl shadow-lg hover:shadow-rose-600/30 transition-all cursor-pointer"
              >
                <PhoneCall className="w-5 h-5" />
                <span>+232 76 522 072</span>
              </a>
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>11 Bundu Street Off Bo Taiama Highway</span>
              </div>
            </div>

            {/* Quick Dispatch Request Form for CHWs */}
            <form onSubmit={handleSimulateDispatch} className="space-y-3 text-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Or Request Immediate Field Dispatch:</span>
                <span className="text-amber-400 font-normal">Bo District</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-400 mb-1">Caller / CHW Name *</label>
                  <input
                    type="text"
                    required
                    value={callerName}
                    onChange={(e) => setCallerName(e.target.value)}
                    placeholder="e.g. Sister Aminata"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-rose-500 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Village / Chiefdom *</label>
                  <input
                    type="text"
                    required
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    placeholder="e.g. Taiama Junction"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-rose-500 outline-hidden font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Presenting Obstetric Emergency *</label>
                <select
                  value={selectedDanger}
                  onChange={(e) => setSelectedDanger(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-rose-500 outline-hidden font-bold"
                >
                  <option value="Heavy Bleeding / Hemorrhage">Severe Postpartum / Antepartum Hemorrhage</option>
                  <option value="Pre-Eclampsia / Convulsions">Pre-Eclampsia (High BP + Convulsions)</option>
                  <option value="Obstructed Prolonged Labor">Obstructed Labor &gt; 12 Hours</option>
                  <option value="Neonatal Asphyxia (Baby Not Breathing)">Neonatal Asphyxia (Baby Limp / Not Crying)</option>
                  <option value="Umbilical Cord Prolapse">Cord Prolapse / Transverse Presentation</option>
                  <option value="Puerperal Sepsis & High Fever">Puerperal Sepsis & High Fever</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors mt-2"
              >
                <Ambulance className="w-4 h-4" />
                <span>Transmit Urgent Field Dispatch to Bo HQ</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

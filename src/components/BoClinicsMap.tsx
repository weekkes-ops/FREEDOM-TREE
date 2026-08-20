import React, { useState } from 'react';
import { CLINIC_LOCATIONS, FREEDOM_TREE_INFO, RECENT_EMERGENCY_LOGS } from '../data/mockData';
import { ClinicLocation } from '../types';
import {
  MapPin,
  PhoneCall,
  Sun,
  Activity,
  Ambulance,
  Clock,
  Shield,
  Radio,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface BoClinicsMapProps {
  onOpenHotlineModal: () => void;
  isKrio: boolean;
}

export const BoClinicsMap: React.FC<BoClinicsMapProps> = ({
  onOpenHotlineModal,
  isKrio,
}) => {
  const [selectedClinic, setSelectedClinic] = useState<ClinicLocation>(CLINIC_LOCATIONS[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredClinics = CLINIC_LOCATIONS.filter((clinic) => {
    const matchesSearch =
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.chiefdom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'ultrasound') return matchesSearch && clinic.ultrasoundAvailable;
    if (filterType === 'ambulance') return matchesSearch && clinic.ambulanceOnStandby;
    if (filterType === 'solar') return matchesSearch && clinic.solarPowered;
    return matchesSearch;
  });

  return (
    <section className="py-16 lg:py-20 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            {isKrio ? 'Bo District & Taiama Highway Network' : 'Southern Province Healthcare Network'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {isKrio
              ? 'Freedom Tree Klinik & Outreach Dèm na Bo'
              : 'Bo Headquarters & Regional Clinic Network'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Operating from our central maternal hub at <strong className="text-amber-400">11 Bundu Street Off Bo Taiama Highway</strong>,
            connecting peripheral health units, mobile ultrasound 4WD teams, and emergency ambulance routes.
          </p>
        </div>

        {/* Map & Facility Directory Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Stylized Map Visualization */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-200">
                  Bo District & Bo-Taiama Highway Sector
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Click a pin to view facility specs</span>
            </div>

            {/* Stylized Vector Map Canvas */}
            <div className="relative w-full h-80 sm:h-96 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/30 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
              {/* Stylized Highway Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <path
                  d="M 50 150 Q 150 180, 250 190 T 450 210 T 650 230"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <path
                  d="M 250 190 Q 300 280, 380 340"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Highway Label */}
              <div className="absolute top-1/4 left-1/4 transform -rotate-6 text-[10px] font-mono font-bold text-amber-400/80 tracking-widest uppercase pointer-events-none">
                Bo - Taiama Highway Corridor
              </div>

              {/* Pins on the Map */}
              {CLINIC_LOCATIONS.map((clinic) => {
                const isSelected = selectedClinic.id === clinic.id;
                const isHQ = clinic.id === 'bo-hq-center';
                return (
                  <button
                    key={clinic.id}
                    onClick={() => setSelectedClinic(clinic)}
                    style={{
                      left: `${clinic.coordinates.x}%`,
                      top: `${clinic.coordinates.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-all transform hover:scale-125 z-20 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/40 scale-115 shadow-lg'
                        : isHQ
                        ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400/50'
                        : 'bg-slate-800 text-emerald-400 hover:bg-emerald-800 hover:text-white border border-slate-700'
                    }`}
                    title={clinic.name}
                  >
                    <MapPin className="w-4 h-4" />
                    <span
                      className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-1.5 py-0.5 rounded shadow-md pointer-events-none ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : 'bg-slate-900/95 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {clinic.name.split(' ')[0]} {clinic.id === 'bo-hq-center' ? '(HQ 11 Bundu)' : ''}
                    </span>
                  </button>
                );
              })}

              {/* Legend */}
              <div className="absolute bottom-3 left-3 bg-slate-900/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-800 text-[10px] space-y-1 z-10 shadow-md">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Freedom Tree Bo HQ
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Mobile Outreach & Health Posts
                </div>
              </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  filterType === 'all'
                    ? 'bg-emerald-900 text-emerald-200 border border-emerald-700'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                All (5)
              </button>
              <button
                onClick={() => setFilterType('ultrasound')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                  filterType === 'ultrasound'
                    ? 'bg-emerald-900 text-emerald-200 border border-emerald-700'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                <Activity className="w-3 h-3" /> Ultrasound Available
              </button>
              <button
                onClick={() => setFilterType('ambulance')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                  filterType === 'ambulance'
                    ? 'bg-emerald-900 text-emerald-200 border border-emerald-700'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                <Ambulance className="w-3 h-3" /> Ambulance Standby
              </button>
              <button
                onClick={() => setFilterType('solar')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                  filterType === 'solar'
                    ? 'bg-emerald-900 text-emerald-200 border border-emerald-700'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                <Sun className="w-3 h-3" /> 100% Solar Powered
              </button>
            </div>
          </div>

          {/* Right Column: Selected Facility Deep Dive & Emergency Logs */}
          <div className="lg:col-span-5 space-y-4">
            {/* Selected Clinic Card */}
            <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-lg space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-slate-700 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    {selectedClinic.type}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">{selectedClinic.name}</h3>
                  <p className="text-xs text-emerald-400 font-semibold">{selectedClinic.chiefdom}</p>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {selectedClinic.status}
                </span>
              </div>

              {/* Details List */}
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400">Physical Location: </span>
                    <strong className="text-white">{selectedClinic.address}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400">Hours: </span>
                    <span className="text-slate-200">{selectedClinic.operatingHours}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-slate-400">Midwife / Lead: </span>
                    <span className="text-white font-medium">{selectedClinic.midwifeInCharge}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400">Direct Phone: </span>
                    <a href={`tel:${selectedClinic.phone}`} className="text-amber-300 font-bold hover:underline">
                      {selectedClinic.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Facility Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700">
                <div
                  className={`p-2 rounded-lg text-center ${
                    selectedClinic.solarPowered
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  <Sun className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[10px] font-bold block">Solar Energy</span>
                </div>

                <div
                  className={`p-2 rounded-lg text-center ${
                    selectedClinic.ultrasoundAvailable
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  <Activity className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[10px] font-bold block">Ultrasound</span>
                </div>

                <div
                  className={`p-2 rounded-lg text-center ${
                    selectedClinic.ambulanceOnStandby
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  <Ambulance className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[10px] font-bold block">Ambulance</span>
                </div>
              </div>

              {/* Dispatch Action */}
              <div className="pt-2">
                <button
                  onClick={onOpenHotlineModal}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Emergency Dispatch (+232 76 522 072)</span>
                </button>
              </div>
            </div>

            {/* Live Field Dispatch Activity Feed */}
            <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Radio className="w-3 h-3 animate-ping" /> Recent Emergency Dispatches
                </span>
                <span className="text-slate-500">Bo Center Log</span>
              </div>

              <div className="space-y-2">
                {RECENT_EMERGENCY_LOGS.map((log) => (
                  <div
                    key={log.id}
                    className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{log.village}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-300 text-[10px] line-clamp-1">{log.presentingSymptoms}</p>
                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <span className="text-amber-300 font-semibold">{log.callerRole}</span>
                      <span className="text-emerald-400 font-bold">{log.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { INITIAL_PATIENTS, FREEDOM_TREE_INFO, CLINIC_LOCATIONS } from '../data/mockData';
import { PatientRecord } from '../types';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Baby,
  Calendar,
  MapPin,
  Sparkles,
  Award,
  Download,
  X,
  Package,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PatientRegistrySectionProps {
  isKrio: boolean;
}

export const PatientRegistrySection: React.FC<PatientRegistrySectionProps> = ({ isKrio }) => {
  const [patients, setPatients] = useState<PatientRecord[]>(INITIAL_PATIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [celebratedPatient, setCelebratedPatient] = useState<PatientRecord | null>(null);

  // New Mother Form State
  const [newMother, setNewMother] = useState({
    fullName: '',
    age: 24,
    chiefdom: 'Kakua',
    village: 'Bundu Community, Bo',
    gestationalWeeks: 32,
    estimatedDueDate: '2026-10-15',
    gravidaPara: 'G2 P1',
    riskLevel: 'Low Risk' as 'Low Risk' | 'Moderate Risk' | 'High Risk',
    riskFactors: '',
    mamaKitIssued: true,
    ultrasoundDone: true,
    assignedClinic: 'Freedom Tree Bo Maternal Center (HQ)',
    chwAssigned: 'Sister Aminata Koroma',
  });

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.chiefdom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || p.riskLevel === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleRegisterMother = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMother.fullName.trim()) return;

    const newRecord: PatientRecord = {
      id: `FT-SL-2026-${String(patients.length + 120).padStart(3, '0')}`,
      fullName: newMother.fullName,
      age: Number(newMother.age),
      chiefdom: newMother.chiefdom,
      village: newMother.village,
      gestationalWeeks: Number(newMother.gestationalWeeks),
      estimatedDueDate: newMother.estimatedDueDate,
      gravidaPara: newMother.gravidaPara,
      riskLevel: newMother.riskLevel,
      riskFactors: newMother.riskFactors
        ? newMother.riskFactors.split(',').map((s) => s.trim())
        : ['Routine Antenatal Care'],
      mamaKitIssued: newMother.mamaKitIssued,
      mamaKitId: newMother.mamaKitIssued ? `MK-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      ultrasoundDone: newMother.ultrasoundDone,
      assignedClinic: newMother.assignedClinic,
      chwAssigned: newMother.chwAssigned,
      status: 'Active Antenatal',
    };

    setPatients([newRecord, ...patients]);
    setShowAddModal(false);
    // Reset form
    setNewMother({
      fullName: '',
      age: 24,
      chiefdom: 'Kakua',
      village: 'Bundu Community, Bo',
      gestationalWeeks: 32,
      estimatedDueDate: '2026-10-15',
      gravidaPara: 'G2 P1',
      riskLevel: 'Low Risk',
      riskFactors: '',
      mamaKitIssued: true,
      ultrasoundDone: true,
      assignedClinic: 'Freedom Tree Bo Maternal Center (HQ)',
      chwAssigned: 'Sister Aminata Koroma',
    });
  };

  const handleRecordSafeDelivery = (patient: PatientRecord) => {
    const updatedPatients = patients.map((p) => {
      if (p.id === patient.id) {
        return {
          ...p,
          status: 'Safely Delivered' as const,
          deliveryDate: new Date().toISOString().split('T')[0],
          babyGender: Math.random() > 0.5 ? ('Girl' as const) : ('Boy' as const),
          birthWeightKg: Number((3.0 + Math.random() * 0.7).toFixed(2)),
        };
      }
      return p;
    });

    setPatients(updatedPatients);
    const deliveredRecord = updatedPatients.find((p) => p.id === patient.id) || patient;
    setCelebratedPatient(deliveredRecord);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#047857', '#ec4899'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-white text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200/80 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              {isKrio ? 'Bo District Field Rista' : 'Community Midwife Field Registry'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              {isKrio
                ? 'Rista fo Pregnan Mami Dèm na Bo'
                : 'Mothers & Safe Deliveries Field Tracker'}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Frontline tool utilized by Freedom Tree Community Health Workers and Midwives across Bo District,
              ensuring every mother is tracked from second trimester through safe delivery with an allocated Mama Kit.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>Register Expectant Mother</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-8 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center shadow-2xs">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by mother name, village, chiefdom, ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
            >
              <option value="all">All Delivery Statuses</option>
              <option value="Active Antenatal">Active Antenatal</option>
              <option value="Due This Week">Due This Week (Urgent)</option>
              <option value="Safely Delivered">Safely Delivered</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-600 shadow-2xs"
            >
              <option value="all">All Risk Categories</option>
              <option value="Low Risk">Low Risk</option>
              <option value="Moderate Risk">Moderate Risk</option>
              <option value="High Risk">High Risk (Pre-eclampsia/Twins)</option>
            </select>
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => {
            const isDelivered = patient.status === 'Safely Delivered';
            const isHighRisk = patient.riskLevel === 'High Risk';

            return (
              <div
                key={patient.id}
                className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  isHighRisk
                    ? 'border-rose-300 shadow-sm ring-2 ring-rose-500/10'
                    : isDelivered
                    ? 'border-emerald-300 bg-emerald-50/30 shadow-xs'
                    : 'border-slate-200 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar of Patient Card */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">
                        {patient.id}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{patient.fullName}</h3>
                      <p className="text-xs text-slate-500">
                        {patient.age} yrs • {patient.gravidaPara}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        isHighRisk
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : patient.riskLevel === 'Moderate Risk'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {patient.riskLevel}
                    </span>
                  </div>

                  {/* Village & Clinic Info */}
                  <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-semibold text-slate-800">{patient.village}</span>
                      <span className="text-slate-400">({patient.chiefdom})</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>
                        Gestational Age: <strong>{patient.gestationalWeeks} weeks</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">Due Date:</span>
                      <span className="font-bold text-slate-800">{patient.estimatedDueDate}</span>
                    </div>
                  </div>

                  {/* Mama Kit & Ultrasound Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {patient.mamaKitIssued ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                        <Package className="w-3 h-3 text-amber-600" />
                        Mama Kit: {patient.mamaKitId || 'Issued'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        Kit Pending
                      </span>
                    )}

                    {patient.ultrasoundDone && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Ultrasound Cleared
                      </span>
                    )}
                  </div>

                  {/* Risk Factors List if any */}
                  {patient.riskFactors && patient.riskFactors.length > 0 && (
                    <div className="mb-4 text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-700">Clinical Notes: </span>
                      <span>{patient.riskFactors.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {isDelivered ? (
                    <div className="w-full bg-emerald-100/70 text-emerald-900 p-2.5 rounded-xl text-center space-y-0.5 border border-emerald-200/60">
                      <div className="text-xs font-black flex items-center justify-center gap-1">
                        <Baby className="w-3.5 h-3.5 text-emerald-700" />
                        Safely Delivered ({patient.babyGender || 'Baby'} • {patient.birthWeightKg || '3.2'} kg)
                      </div>
                      <button
                        onClick={() => setCelebratedPatient(patient)}
                        className="text-[11px] text-emerald-800 font-bold underline hover:text-emerald-950 cursor-pointer"
                      >
                        View Birth Certificate
                      </button>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div className="text-[11px]">
                        <span className="text-slate-400 block text-[10px]">Attendant:</span>
                        <strong className="text-slate-800">{patient.chwAssigned}</strong>
                      </div>

                      <button
                        onClick={() => handleRecordSafeDelivery(patient)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs whitespace-nowrap"
                      >
                        <Heart className="w-3 h-3 fill-amber-300 text-amber-300" />
                        Record Safe Birth
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching patient records found</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or filter tags.</p>
          </div>
        )}
      </div>

      {/* Register Expectant Mother Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Register Expectant Mother</h3>
                <p className="text-xs text-slate-500">Bo District Field Maternal Care Entry</p>
              </div>
            </div>

            <form onSubmit={handleRegisterMother} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mother's Full Name *</label>
                <input
                  type="text"
                  required
                  value={newMother.fullName}
                  onChange={(e) => setNewMother({ ...newMother, fullName: e.target.value })}
                  placeholder="e.g. Sarian Kamara"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-hidden font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min={14}
                    max={50}
                    value={newMother.age}
                    onChange={(e) => setNewMother({ ...newMother, age: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gravida / Parity</label>
                  <input
                    type="text"
                    value={newMother.gravidaPara}
                    onChange={(e) => setNewMother({ ...newMother, gravidaPara: e.target.value })}
                    placeholder="e.g. G1 P0 or G3 P2"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chiefdom</label>
                  <select
                    value={newMother.chiefdom}
                    onChange={(e) => setNewMother({ ...newMother, chiefdom: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-hidden"
                  >
                    <option value="Kakua">Kakua Chiefdom (Bo City)</option>
                    <option value="Kori (Taiama)">Kori Chiefdom (Taiama)</option>
                    <option value="Tikonko">Tikonko Chiefdom</option>
                    <option value="Baoma">Baoma Chiefdom</option>
                    <option value="Bagbo">Bagbo Chiefdom</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Village / Community</label>
                  <input
                    type="text"
                    required
                    value={newMother.village}
                    onChange={(e) => setNewMother({ ...newMother, village: e.target.value })}
                    placeholder="e.g. Bundu St, Bo"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gestational Weeks</label>
                  <input
                    type="number"
                    min={4}
                    max={42}
                    value={newMother.gestationalWeeks}
                    onChange={(e) => setNewMother({ ...newMother, gestationalWeeks: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Due Date</label>
                  <input
                    type="date"
                    required
                    value={newMother.estimatedDueDate}
                    onChange={(e) => setNewMother({ ...newMother, estimatedDueDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Risk Classification</label>
                <select
                  value={newMother.riskLevel}
                  onChange={(e) =>
                    setNewMother({ ...newMother, riskLevel: e.target.value as any })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-hidden font-bold"
                >
                  <option value="Low Risk">Low Risk (Standard Antenatal)</option>
                  <option value="Moderate Risk">Moderate Risk (Monitor Closely)</option>
                  <option value="High Risk">High Risk (Pre-eclampsia, Hemorrhage Risk, Breech)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Risk Factors / Clinical Notes (optional)
                </label>
                <input
                  type="text"
                  value={newMother.riskFactors}
                  onChange={(e) => setNewMother({ ...newMother, riskFactors: e.target.value })}
                  placeholder="e.g. High BP, Anemia, Malaria prophylaxis completed"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-emerald-600 outline-hidden"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newMother.mamaKitIssued}
                    onChange={(e) => setNewMother({ ...newMother, mamaKitIssued: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">Issue Sterile Mama Kit Now</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newMother.ultrasoundDone}
                    onChange={(e) => setNewMother({ ...newMother, ultrasoundDone: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">Ultrasound Performed</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold shadow-md cursor-pointer"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Celebratory Safe Birth Certificate Modal */}
      {celebratedPatient && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-500 relative text-center">
            <button
              onClick={() => setCelebratedPatient(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Certificate Header Graphic */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-900 mx-auto flex items-center justify-center mb-4 ring-8 ring-emerald-50/50 border border-emerald-200">
              <Award className="w-9 h-9 text-amber-600" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700">
              Freedom Tree Sierra Leone
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Safe Birth Record Certificate
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Official verification of hygienic birth under Freedom Tree Maternal Initiative
            </p>

            {/* Certificate Details Card */}
            <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200 text-left space-y-3 mb-6">
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-2 text-xs">
                <span className="text-slate-500">Mother:</span>
                <strong className="text-slate-900 text-sm font-black">{celebratedPatient.fullName}</strong>
              </div>

              <div className="flex items-center justify-between border-b border-amber-200/60 pb-2 text-xs">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-slate-800">
                  {celebratedPatient.village}, {celebratedPatient.chiefdom}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-amber-200/60 pb-2 text-xs">
                <span className="text-slate-500">Baby Gender / Weight:</span>
                <strong className="text-emerald-900 font-bold">
                  {celebratedPatient.babyGender || 'Baby'} • {celebratedPatient.birthWeightKg || '3.2'} kg
                </strong>
              </div>

              <div className="flex items-center justify-between border-b border-amber-200/60 pb-2 text-xs">
                <span className="text-slate-500">Mama Kit ID Used:</span>
                <span className="font-mono text-amber-900 font-bold">
                  {celebratedPatient.mamaKitId || 'MK-Sterile'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">Attending Midwife:</span>
                <span className="font-medium text-slate-800">{celebratedPatient.chwAssigned}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 italic mb-6">
              "Working within communities to reduce maternal and infant mortality in Sierra Leone."
              <br />
              <strong>11 Bundu Street Off Bo Taiama Highway • New Harvest Global Ministries</strong>
            </div>

            <button
              onClick={() => setCelebratedPatient(null)}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md"
            >
              Close & Return to Field Registry
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

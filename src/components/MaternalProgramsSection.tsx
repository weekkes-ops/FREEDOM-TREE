import React from 'react';
import { MATERNAL_PROGRAMS, FREEDOM_TREE_INFO } from '../data/mockData';
import { PackageCheck, Activity, GraduationCap, Ambulance, CheckCircle, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { MaternalProgram } from '../types';

interface MaternalProgramsSectionProps {
  onSponsorProgram: (programId: string, cost: number) => void;
  setActiveTab: (tab: string) => void;
  isKrio: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  PackageCheck,
  Activity,
  GraduationCap,
  Ambulance,
};

export const MaternalProgramsSection: React.FC<MaternalProgramsSectionProps> = ({
  onSponsorProgram,
  setActiveTab,
  isKrio,
}) => {
  return (
    <section className="py-16 lg:py-20 bg-[#F8FAFC] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            {isKrio ? 'Wi Wok Na Sierra Leone' : 'Community Healthcare Pillars'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {isKrio
              ? 'Wetin Wi De Du Fo Stop Mama En Pikin Dath'
              : 'How We Protect Mothers & Infants Across Sierra Leone'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Sierra Leone historically faced some of the highest maternal mortality rates in the world.
            Freedom Tree Sierra Leone partners directly with rural chiefdoms and New Harvest Global Ministries
            to eliminate preventable deaths through 4 evidence-based pillars.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MATERNAL_PROGRAMS.map((prog: MaternalProgram) => {
            const Icon = iconMap[prog.iconName] || PackageCheck;
            return (
              <div
                key={prog.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">{prog.stat}</span>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {prog.statLabel}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{prog.title}</h3>
                  <p className="text-xs font-bold text-amber-600 mt-0.5 mb-3">{prog.tagline}</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">{prog.description}</p>

                  {/* Highlights List */}
                  <div className="space-y-2.5 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Key Program Features:
                    </div>
                    {prog.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer with Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Impact Cost:</span>
                    <div className="text-lg font-black text-slate-900">
                      ${prog.costPerBeneficiary}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        {prog.id === 'clean-delivery-kits'
                          ? '/ sterile kit'
                          : prog.id === 'mobile-ultrasound'
                          ? '/ mother screened'
                          : prog.id === 'emergency-transport'
                          ? '/ emergency trip'
                          : '/ attendant trained'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {prog.id === 'clean-delivery-kits' && (
                      <button
                        onClick={() => setActiveTab('mamakit')}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        Inspect Kit
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onSponsorProgram(prog.id, prog.costPerBeneficiary)}
                      className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:shadow"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      Sponsor This
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnership Callout Banner */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Community Health Alliance
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Grounded in Bo Communities with New Harvest Global Ministries
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Working hand-in-hand with local church networks, village headmen, Traditional Birth Attendants,
              and Ministry of Health clinics from our primary center at 11 Bundu Street Off Bo Taiama Highway.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('contact')}
            className="shrink-0 px-5 py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Learn About Our Partners</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

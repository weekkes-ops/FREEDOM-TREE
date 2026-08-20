import React from 'react';
import { Heart, ShieldCheck, MapPin, PhoneCall, Sparkles, Package, ArrowRight, Activity, Users, CheckCircle2 } from 'lucide-react';
import { FREEDOM_TREE_INFO } from '../data/mockData';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  onOpenDonate: () => void;
  onOpenHotlineModal: () => void;
  isKrio: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  onOpenDonate,
  onOpenHotlineModal,
  isKrio,
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/70"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            {isKrio ? 'Freedom Tree Bo, Salone' : 'Bo District Headquarters'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
            <MapPin className="w-3 h-3 text-emerald-400" />
            11 Bundu Street Off Bo Taiama Highway
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700">
            Lead Partner: <strong className="text-white ml-1">{FREEDOM_TREE_INFO.leadPartner}</strong>
          </span>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {isKrio ? (
                <>
                  Wi De Wok Na Kominiti Dèm Fo <span className="text-amber-400">Kip Mama En Pikin De Layf</span> Na Sierra Leone
                </>
              ) : (
                <>
                  Working Within Communities to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300">
                    Reduce Maternal & Infant Mortality
                  </span>{' '}
                  in Sierra Leone
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {isKrio
                ? 'Freedom Tree Sierra Leone de gi klin berek mama kit, mobil ultrasound mashin na vilej dèm, en tren kominiti midwife dèm wit 24/7 ambyulans dispatch na Bo District.'
                : 'Through sterile Clean Delivery "Mama" Kits, frontline Traditional Birth Attendant training, mobile prenatal ultrasound clinics, and 24/7 emergency referral transport, we ensure no mother or newborn dies from preventable birth complications.'}
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenDonate}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-amber-600/30 transition-all flex items-center gap-2 cursor-pointer transform active:scale-98"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isKrio ? 'Sponsor Klin Kit ($15)' : 'Sponsor a Safe Birth ($15 - $35)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('ai-triage')}
                className="px-5 py-3.5 rounded-xl font-bold text-sm bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Field AI Health Advisor</span>
              </button>

              <button
                onClick={onOpenHotlineModal}
                className="px-4 py-3.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>Emergency: {FREEDOM_TREE_INFO.phone}</span>
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>WHO & Sierra Leone MoHS standard kits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% of kit gifts reach Bo mothers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Field Center at 11 Bundu St, Bo</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Signboard & Live Field Hub Card */}
          <div className="lg:col-span-5 space-y-4">
            {/* Authentic Organization Signboard Recreation Card */}
            <div className="bg-slate-800/90 rounded-2xl p-5 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden backdrop-blur-xs">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-[11px] font-semibold text-slate-300 ml-2">Official Facility Signboard Data</span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  Bo Center Hub
                </span>
              </div>

              {/* Signboard Header text */}
              <div className="space-y-1 mb-4">
                <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-100 flex items-center gap-2">
                  <span>FREEDOM</span>
                  <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 font-black rounded text-sm">TREE</span>
                  <span>SIERRA LEONE</span>
                </div>
                <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                  WORKING WITHIN COMMUNITIES TO REDUCE MATERNAL AND INFANT MORTALITY IN SIERRA LEONE
                </p>
              </div>

              {/* Exact Details Grid from Sign */}
              <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-300 bg-slate-900/90 rounded-xl p-3.5 border border-slate-700/80">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-medium">Address: </span>
                    <strong className="text-white">11 Bundu Street Off Bo Taiama Highway</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 font-medium">Contact Number: </span>
                    <a href={`tel:${FREEDOM_TREE_INFO.phone}`} className="text-amber-300 font-bold hover:underline">
                      +232 76 522 072
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono text-[10px] w-4 text-center">@</span>
                  <div>
                    <span className="text-slate-400 font-medium">Email: </span>
                    <a href={`mailto:${FREEDOM_TREE_INFO.email}`} className="text-emerald-300 hover:underline">
                      {FREEDOM_TREE_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono text-[10px] w-4 text-center">🌐</span>
                  <div>
                    <span className="text-slate-400 font-medium">Website: </span>
                    <a
                      href="https://www.freedomtree.ca"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:underline"
                    >
                      www.freedomtree.ca
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono text-[10px] w-4 text-center">f</span>
                  <div>
                    <span className="text-slate-400 font-medium">Facebook: </span>
                    <span className="text-white font-medium">Freedom Tree</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Lead Partner:</span>
                  <span className="font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                    New Harvest Global Ministries
                  </span>
                </div>
              </div>

              {/* Bottom fast interactive trigger */}
              <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('clinics')}
                  className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>View Bo & Taiama Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab('registry')}
                  className="text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Field CHW Registry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Impact Numbers Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/70">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
              {FREEDOM_TREE_INFO.keyStats.safeDeliveriesToDate.toLocaleString()}+
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Safe Deliveries Supported</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Zero preventable deaths in care
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/70">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {FREEDOM_TREE_INFO.keyStats.mamaKitsDistributed.toLocaleString()}+
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Sterile Mama Kits Distributed</div>
            <div className="text-[11px] text-slate-400 mt-1">Stops neonatal tetanus & sepsis</div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/70">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
              {FREEDOM_TREE_INFO.keyStats.activeMidwivesTrained}+
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">CHWs & Birth Attendants Trained</div>
            <div className="text-[11px] text-slate-400 mt-1">With New Harvest Ministries</div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/70">
            <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
              {FREEDOM_TREE_INFO.keyStats.maternalSurvivalRate}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Maternal Survival Rate</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <Activity className="w-3 h-3" /> In Freedom Tree program care
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

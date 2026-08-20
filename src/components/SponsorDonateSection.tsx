import React, { useState } from 'react';
import { INITIAL_DONATION_PLEDGES, FREEDOM_TREE_INFO } from '../data/mockData';
import { DonationPledge } from '../types';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Package,
  Award,
  Sparkles,
  Smartphone,
  CreditCard,
  Download,
  Share2,
  Users,
  MapPin,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SponsorDonateSectionProps {
  initialAmount?: number;
  initialProgramId?: string;
  isKrio: boolean;
}

export const SponsorDonateSection: React.FC<SponsorDonateSectionProps> = ({
  initialAmount = 35,
  initialProgramId,
  isKrio,
}) => {
  const [pledges, setPledges] = useState<DonationPledge[]>(INITIAL_DONATION_PLEDGES);
  const [selectedTier, setSelectedTier] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorCountry, setDonorCountry] = useState<string>('Canada');
  const [donorMessage, setDonorMessage] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'orange_money_sl' | 'africell_money' | 'paypal'>('card');
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState<string>('+232 76 ');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedPledge, setCompletedPledge] = useState<DonationPledge | null>(null);

  const tiers = [
    {
      amount: 15,
      title: '1 Sterile Mama Kit',
      desc: 'Provides full sterile kit (blade, cord clamps, soap, plastic sheet, gauze, wrap) to 1 mother.',
      icon: Package,
      badge: 'Most Essential',
    },
    {
      amount: 35,
      title: '1 Full Safe Delivery',
      desc: 'Complete sterile delivery + skilled midwife care + postnatal monitoring at Bo Center.',
      icon: Heart,
      badge: 'Popular Choice',
    },
    {
      amount: 75,
      title: 'Prenatal Care + Ultrasound',
      desc: 'Mobile ultrasound scan + 4 antenatal health visits + malaria prophylaxis + Mama Kit.',
      icon: Sparkles,
      badge: 'High Impact',
    },
    {
      amount: 150,
      title: 'Midwife & CHW Training',
      desc: 'Trains 1 community birth attendant in neonatal resuscitation with New Harvest Global Ministries.',
      icon: Users,
      badge: 'Community Lifeline',
    },
    {
      amount: 350,
      title: 'Emergency Transport Fund',
      desc: 'Covers 7 urgent 4WD ambulance village transfers to 11 Bundu St Bo Headquarters.',
      icon: ShieldCheck,
      badge: 'Lifesaving Fund',
    },
  ];

  const currentAmount = customAmount ? Number(customAmount) : selectedTier;

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || currentAmount <= 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const newPledge: DonationPledge = {
        id: `pledge-${Date.now()}`,
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim() || 'supporter@freedomtree.ca',
        donorCountry: donorCountry,
        amountUsd: currentAmount,
        tierId: `tier-${currentAmount}`,
        tierName:
          tiers.find((t) => t.amount === currentAmount)?.title ||
          `Custom Maternal Health Gift ($${currentAmount})`,
        impactDescription: `Protected expectant mothers & newborns across Bo District, Sierra Leone`,
        paymentMethod: paymentMethod,
        date: new Date().toISOString().split('T')[0],
        message: donorMessage.trim() || undefined,
      };

      setPledges([newPledge, ...pledges]);
      setCompletedPledge(newPledge);
      setIsProcessing(false);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#047857', '#d97706'],
        });
      } catch {
        // safe
      }
    }, 1200);
  };

  return (
    <section className="py-16 lg:py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {isKrio ? 'Sponsor Klin Bili na Salone' : 'Sponsor a Safe Birth in Sierra Leone'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {isKrio
              ? 'Yu $15 Kin Sev Mama En Pikin Layf'
              : 'Every Gift Guarantees a Safe Delivery in Bo District'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Freedom Tree Sierra Leone operates with direct field transparency in partnership with New Harvest
            Global Ministries and Freedom Tree Canada (www.freedomtree.ca). 100% of delivery kit funding directly reaches mothers.
          </p>
        </div>

        {/* Main Donation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Tiers */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
            {completedPledge ? (
              /* Success & Certificate Screen */
              <div className="text-center space-y-6 py-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-300 mx-auto flex items-center justify-center border-2 border-emerald-500 ring-8 ring-emerald-900/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Sponsorship Confirmed
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    Thank You, {completedPledge.donorName}!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                    Your generous contribution of <strong>${completedPledge.amountUsd} USD</strong> is
                    allocated directly to the Freedom Tree Bo Maternal Initiative.
                  </p>
                </div>

                {/* Digital Certificate of Sponsorship */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-6 rounded-2xl border-2 border-amber-500/60 text-left space-y-3 relative shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                        FT
                      </div>
                      <div>
                        <div className="text-xs font-black text-white">FREEDOM TREE SIERRA LEONE</div>
                        <div className="text-[10px] text-amber-400">Official Sponsorship Verification</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                      ID: {completedPledge.id}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-200">
                    <div>
                      <span className="text-slate-400">Sponsor: </span>
                      <strong className="text-white">{completedPledge.donorName}</strong> ({completedPledge.donorCountry})
                    </div>
                    <div>
                      <span className="text-slate-400">Impact Allocated: </span>
                      <span className="text-amber-300 font-bold">{completedPledge.tierName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Field Operational Hub: </span>
                      <span className="text-slate-300">11 Bundu Street Off Bo Taiama Highway, Bo, Sierra Leone</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Lead Partner: </span>
                      <span className="text-slate-300">New Harvest Global Ministries</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700 text-[10px] text-slate-400 italic">
                    "Working within communities to reduce maternal and infant mortality in Sierra Leone."
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setCompletedPledge(null)}
                    className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-md transition-colors"
                  >
                    Make Another Sponsorship
                  </button>
                </div>
              </div>
            ) : (
              /* Donation Form */
              <form onSubmit={handleDonate} className="space-y-6">
                {/* Select Tier Cards */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                    1. Select Safe Birth Sponsorship Tier:
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tiers.map((t) => {
                      const isSelected = selectedTier === t.amount && !customAmount;
                      const Icon = t.icon;
                      return (
                        <div
                          key={t.amount}
                          onClick={() => {
                            setSelectedTier(t.amount);
                            setCustomAmount('');
                          }}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/30'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-base font-black text-white">${t.amount}</span>
                                <span className="text-[10px] text-slate-400 block font-semibold">
                                  {t.title}
                                </span>
                              </div>
                            </div>

                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                              {t.badge}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-300 leading-relaxed">{t.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="mt-3">
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        min="5"
                        placeholder="Or enter custom USD amount..."
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Donor Details */}
                <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                  <label className="block font-bold uppercase tracking-wider text-slate-300">
                    2. Your Supporter Information:
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Your Name / Organization *</label>
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. Sarah & Michael"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Email for Receipt</label>
                      <input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="e.g. sarah@gmail.com"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Country</label>
                      <select
                        value={donorCountry}
                        onChange={(e) => setDonorCountry(e.target.value)}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden"
                      >
                        <option value="Canada">Canada (Freedom Tree Partner)</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Global">Other Country</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Message of Encouragement (Optional)</label>
                      <input
                        type="text"
                        value={donorMessage}
                        onChange={(e) => setDonorMessage(e.target.value)}
                        placeholder="e.g. Praying for healthy mothers in Bo!"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                  <label className="block font-bold uppercase tracking-wider text-slate-300">
                    3. Select Payment Method:
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-amber-950/70 border-amber-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                      <span className="text-[11px] font-bold block">Credit / Debit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('orange_money_sl')}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'orange_money_sl'
                          ? 'bg-orange-950/70 border-orange-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mx-auto mb-1 text-orange-400" />
                      <span className="text-[11px] font-bold block">Orange Money SL</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('africell_money')}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'africell_money'
                          ? 'bg-rose-950/70 border-rose-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mx-auto mb-1 text-rose-400" />
                      <span className="text-[11px] font-bold block">Africell Money</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'paypal'
                          ? 'bg-sky-950/70 border-sky-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Lock className="w-4 h-4 mx-auto mb-1 text-sky-400" />
                      <span className="text-[11px] font-bold block">PayPal</span>
                    </button>
                  </div>

                  {(paymentMethod === 'orange_money_sl' || paymentMethod === 'africell_money') && (
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <label className="block text-slate-300 font-semibold">
                        {paymentMethod === 'orange_money_sl' ? 'Orange Money SL Number' : 'Africell Money Number'}:
                      </label>
                      <input
                        type="tel"
                        value={mobileMoneyNumber}
                        onChange={(e) => setMobileMoneyNumber(e.target.value)}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                      />
                      <p className="text-[10px] text-amber-300">
                        Local Sierra Leone merchant code: <strong>FREEDOM-TREE-BO</strong>
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>
                    {isProcessing
                      ? 'Processing Sponsorship Pledge...'
                      : `Confirm Sponsorship Gift ($${currentAmount} USD)`}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Live Community Supporter Wall & Trust Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  Recent Safe Birth Sponsors
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono">Live Wall</span>
              </div>

              <div className="space-y-3">
                {pledges.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <strong className="text-white">{p.donorName}</strong>
                        <span className="text-[10px] text-slate-400">({p.donorCountry})</span>
                      </div>
                      <span className="text-amber-400 font-black">${p.amountUsd} USD</span>
                    </div>

                    <p className="text-[11px] text-slate-300 font-medium">{p.tierName}</p>

                    {p.message && (
                      <p className="text-[10px] text-slate-400 italic bg-slate-950 p-2 rounded-lg border border-slate-800">
                        "{p.message}"
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1">
                      <span>Via {p.paymentMethod.replace('_', ' ').toUpperCase()}</span>
                      <span>{p.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accountability Card */}
            <div className="bg-emerald-950/50 rounded-2xl p-5 border border-emerald-800/60 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Direct Program Stewardship
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Freedom Tree Sierra Leone partners directly with New Harvest Global Ministries and Freedom Tree
                Canada. Supplies are procured and audited on-site at 11 Bundu Street, Bo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

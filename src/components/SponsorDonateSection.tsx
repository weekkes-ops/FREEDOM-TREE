import React, { useState, useEffect } from 'react';
import { INITIAL_DONATION_PLEDGES, FREEDOM_TREE_INFO } from '../data/mockData';
import { DonationPledge } from '../types';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Package,
  Sparkles,
  Smartphone,
  CreditCard,
  Download,
  Share2,
  Users,
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Check,
  Building,
  Printer,
  Copy,
  Info,
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
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTier, setSelectedTier] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorCountry, setDonorCountry] = useState<string>('Canada');
  const [donorMessage, setDonorMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'orange_money_sl' | 'africell_money' | 'paypal'>('card');
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState<string>('+232 76 522 072');
  const [cardNumber, setCardNumber] = useState<string>('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedPledge, setCompletedPledge] = useState<DonationPledge | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sync incoming props
  useEffect(() => {
    if (initialAmount) {
      setSelectedTier(initialAmount);
      setCustomAmount('');
    }
  }, [initialAmount, initialProgramId]);

  const tiers = [
    {
      amount: 15,
      title: isKrio ? '1 Klin Mama Kit' : '1 Sterile Mama Kit',
      desc: isKrio
        ? 'Gi full klin berek kit (rezar, kord tay, medisin sop, lapa, goz) fo 1 mama.'
        : 'Provides full sterile kit (blade, cord clamps, soap, plastic sheet, gauze, wrap) to 1 mother.',
      icon: Package,
      badge: isKrio ? 'Impotant Pas Mak' : 'Most Essential',
      impactCalculated: 'Protects 1 mother & newborn against neonatal tetanus and fatal sepsis',
    },
    {
      amount: 35,
      title: isKrio ? '1 Full Safe Bili' : '1 Full Safe Delivery',
      desc: isKrio
        ? 'Klin delivery + tren midwife wok + afte-bili monitoring na Bo Center.'
        : 'Complete sterile delivery + skilled midwife care + postnatal monitoring at Bo Center.',
      icon: Heart,
      badge: isKrio ? 'Pipul Lɛk Dis' : 'Popular Choice',
      impactCalculated: 'Directly finances a complete hospital-grade clean birth at 11 Bundu St',
    },
    {
      amount: 75,
      title: isKrio ? 'Prenatal Scan + Ultrasound' : 'Prenatal Care + Ultrasound',
      desc: isKrio
        ? 'Mobil ultrasound scan + 4 antenatal check-up + malaria medisin + Mama Kit.'
        : 'Mobile ultrasound scan + 4 antenatal health visits + malaria prophylaxis + Mama Kit.',
      icon: Sparkles,
      badge: isKrio ? 'Ayt Impakt' : 'High Impact',
      impactCalculated: 'Detects high-risk complications early in remote villages off Bo-Taiama highway',
    },
    {
      amount: 150,
      title: isKrio ? 'Midwife & CHW Trenin' : 'Midwife & CHW Training',
      desc: isKrio
        ? 'Tren 1 kominiti birth attendant wit New Harvest Global Ministries.'
        : 'Trains 1 community birth attendant in neonatal resuscitation with New Harvest Global Ministries.',
      icon: Users,
      badge: isKrio ? 'Kominiti Lifeline' : 'Community Lifeline',
      impactCalculated: 'Certifies 1 frontline healthcare worker in Helping Babies Breathe protocols',
    },
    {
      amount: 350,
      title: isKrio ? '24/7 Ambyulans Fund' : 'Emergency Transport Fund',
      desc: isKrio
        ? 'Kova 7 urgent 4WD ambyulans trip frɔm vilej to Bo Headquarters.'
        : 'Covers 7 urgent 4WD ambulance village transfers to 11 Bundu St Bo Headquarters.',
      icon: ShieldCheck,
      badge: isKrio ? 'Lifesaving Fund' : 'Lifesaving Fund',
      impactCalculated: 'Eliminates fatal transport delays for obstructed labor & hemorrhages',
    },
  ];

  const currentAmount = customAmount ? Math.max(5, Number(customAmount)) : selectedTier;
  const currentTierObj = tiers.find((t) => t.amount === currentAmount);

  // Stepper Steps Definition
  const steps = [
    {
      number: 1,
      title: isKrio ? 'Pik Impakt' : 'Select Impact',
      subtitle: isKrio ? 'Pik wetin yu want fo gi' : 'Choose contribution tier',
      icon: Package,
    },
    {
      number: 2,
      title: isKrio ? 'Yu Infɔmeshɔn' : 'Supporter Details',
      subtitle: isKrio ? 'Yu nem & kontak' : 'Name & receipt info',
      icon: Users,
    },
    {
      number: 3,
      title: isKrio ? 'Peyment Wok' : 'Payment Method',
      subtitle: isKrio ? 'Kard o Mobile Money' : 'Card or Mobile Money',
      icon: CreditCard,
    },
    {
      number: 4,
      title: isKrio ? 'Konfame & Sitifiket' : 'Confirmation',
      subtitle: isKrio ? 'Yu sitifiket don redi' : 'Certificate & Receipt',
      icon: ShieldCheck,
    },
  ];

  // Navigation handlers
  const handleNextStep = () => {
    setErrorMessage('');

    if (currentStep === 1) {
      if (currentAmount <= 0) {
        setErrorMessage(isKrio ? 'Biko pik o rayt amownt we pas $0.' : 'Please choose or enter an amount greater than $0.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!donorName.trim()) {
        setErrorMessage(isKrio ? 'Biko rayt yu nem o yu ɔganayzeshɔn nem.' : 'Please enter your name or organization name.');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepNum: number) => {
    if (stepNum < currentStep) {
      setErrorMessage('');
      setCurrentStep(stepNum);
    } else if (stepNum === 2 && currentAmount > 0) {
      setErrorMessage('');
      setCurrentStep(2);
    } else if (stepNum === 3 && donorName.trim()) {
      setErrorMessage('');
      setCurrentStep(3);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || currentAmount <= 0) {
      setErrorMessage(isKrio ? 'Biko chek yu nem en amownt.' : 'Please verify your name and sponsorship amount.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newPledge: DonationPledge = {
        id: `FT-SL-${Date.now().toString().slice(-6)}`,
        donorName: isAnonymous ? (isKrio ? 'Freng we Nɔ Want Nem' : 'Anonymous Friend of Bo') : donorName.trim(),
        donorEmail: donorEmail.trim() || 'supporter@freedomtree.ca',
        donorCountry: donorCountry,
        amountUsd: currentAmount,
        tierId: `tier-${currentAmount}`,
        tierName:
          currentTierObj?.title ||
          (isKrio ? `Maternal Health Gift ($${currentAmount})` : `Custom Maternal Health Gift ($${currentAmount})`),
        impactDescription:
          currentTierObj?.impactCalculated ||
          'Protected expectant mothers & newborns across Bo District, Sierra Leone',
        paymentMethod: paymentMethod,
        date: new Date().toISOString().split('T')[0],
        message: donorMessage.trim() || undefined,
        isAnonymous: isAnonymous,
      };

      setPledges([newPledge, ...pledges]);
      setCompletedPledge(newPledge);
      setCurrentStep(4);
      setIsProcessing(false);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 160,
          spread: 100,
          origin: { y: 0.55 },
          colors: ['#f59e0b', '#10b981', '#047857', '#d97706', '#fbbf24'],
        });
      } catch {
        // safe fallback
      }
    }, 1300);
  };

  const handleResetFlow = () => {
    setCompletedPledge(null);
    setCurrentStep(1);
    setSelectedTier(35);
    setCustomAmount('');
    setDonorName('');
    setDonorEmail('');
    setDonorMessage('');
    setIsAnonymous(false);
  };

  const handleCopyVerification = () => {
    if (!completedPledge) return;
    const text = `I just sponsored a safe delivery with Freedom Tree Sierra Leone (Pledge ID: ${completedPledge.id}). Support clean births at www.freedomtree.ca!`;
    navigator.clipboard?.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <section id="sponsor-donate-section" className="py-16 lg:py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {isKrio ? 'Sponsor Klin Bili na Salone' : 'Sponsor a Safe Birth in Sierra Leone'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {isKrio
              ? 'Yu $15 Kin Sev Mama En Pikin Layf na Bo'
              : 'Every Gift Guarantees a Safe Delivery in Bo District'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isKrio
              ? 'Freedom Tree Sierra Leone de wok wit New Harvest Global Ministries en Freedom Tree Canada (www.freedomtree.ca). 100% of wetin yu gi de go daret to mama dèm.'
              : 'Freedom Tree Sierra Leone operates with complete field transparency in partnership with New Harvest Global Ministries and Freedom Tree Canada (www.freedomtree.ca). 100% of delivery kit funding reaches frontline mothers.'}
          </p>
        </div>

        {/* ======================================================== */}
        {/* VISUAL PROGRESS STEPPER COMPONENT */}
        {/* ======================================================== */}
        <div className="max-w-4xl mx-auto mb-10 bg-slate-950/80 p-4 sm:p-6 rounded-2xl border border-slate-800 backdrop-blur-md shadow-xl">
          {/* Progress Bar Top */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1 font-semibold">
            <span>
              {isKrio ? 'Step' : 'Step'} {currentStep} {isKrio ? 'pan' : 'of'} 4:{' '}
              <strong className="text-amber-400">{steps[currentStep - 1]?.title}</strong>
            </span>
            <span className="font-mono text-emerald-400">
              {currentStep === 1 && '25%'}
              {currentStep === 2 && '50%'}
              {currentStep === 3 && '75%'}
              {currentStep === 4 && (isKrio ? '100% Konfame' : '100% Complete')}
            </span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          {/* Stepper Nodes */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
            {steps.map((step) => {
              const isCompleted = step.number < currentStep;
              const isActive = step.number === currentStep;
              const isClickable = step.number <= currentStep || (step.number === 2 && currentAmount > 0);
              const StepIcon = step.icon;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => handleStepClick(step.number)}
                  disabled={!isClickable && currentStep !== 4}
                  className={`flex flex-col sm:flex-row items-center sm:items-start gap-2 p-2 sm:p-3 rounded-xl text-left transition-all cursor-pointer disabled:cursor-not-allowed text-center sm:text-left ${
                    isActive
                      ? 'bg-amber-950/40 border border-amber-500/60 ring-2 ring-amber-500/20'
                      : isCompleted
                      ? 'bg-slate-900/90 border border-emerald-500/40 hover:bg-slate-900'
                      : 'bg-slate-900/40 border border-slate-800/80 opacity-60'
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-transform ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 scale-110 shadow-md'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
                  </div>

                  <div className="hidden sm:block min-w-0">
                    <div
                      className={`text-xs font-bold truncate ${
                        isActive ? 'text-white' : isCompleted ? 'text-emerald-300' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{step.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN STEPPER CONTENT CONTAINER */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Step Interactive View */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 animate-in fade-in">
                <Info className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: Select Impact Tier */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      {isKrio ? 'Step 1 pan 4' : 'Step 1 of 4'}
                    </span>
                    <h3 className="text-xl font-black text-white">
                      {isKrio ? 'Pik Safe Birth Sponsorship Tier' : 'Choose Your Safe Birth Sponsorship'}
                    </h3>
                  </div>
                  <span className="text-xs bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800">
                    USD ($)
                  </span>
                </div>

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
                          setErrorMessage('');
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-950/50 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              <Icon className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <span className="text-base font-black text-white">${t.amount}</span>
                              <span className="text-[11px] text-slate-300 block font-semibold leading-tight">
                                {t.title}
                              </span>
                            </div>
                          </div>

                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 whitespace-nowrap">
                            {t.badge}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-300 leading-relaxed">{t.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    {isKrio ? 'O Rayt Yu Yon Amownt:' : 'Or Enter a Custom Sponsorship Amount:'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 font-black text-base">
                      $
                    </span>
                    <input
                      type="number"
                      min="5"
                      placeholder="e.g. 50, 100, 500"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setErrorMessage('');
                      }}
                      className="w-full pl-9 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-hidden focus:border-amber-500 font-bold"
                    />
                  </div>
                  {customAmount && Number(customAmount) >= 15 && (
                    <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {isKrio
                        ? `Yu $${customAmount} kin giv ${Math.floor(Number(customAmount) / 15)} sterile mama kit dèm na Bo!`
                        : `Your $${customAmount} gift equips ${Math.floor(Number(customAmount) / 15)} complete sterile Mama Kits in Bo!`}
                    </p>
                  )}
                </div>

                {/* Step 1 Next Action */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-slate-400">
                    {isKrio ? 'Total we yu pik:' : 'Selected Gift:'}{' '}
                    <strong className="text-amber-400 text-sm font-black">${currentAmount} USD</strong>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer transition-all hover:translate-x-0.5"
                  >
                    <span>{isKrio ? 'Kɔntinyu to Step 2' : 'Next: Supporter Info'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Supporter Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      {isKrio ? 'Step 2 pan 4' : 'Step 2 of 4'}
                    </span>
                    <h3 className="text-xl font-black text-white">
                      {isKrio ? 'Yu Nem & Risit Infɔmeshɔn' : 'Supporter Information & Dedication'}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/70 px-2.5 py-1 rounded-lg border border-amber-800">
                    ${currentAmount} USD
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        {isKrio ? 'Yu Nem / Ɔganayzeshɔn *' : 'Your Name / Organization *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. Sarah MacLeod / Calgary Fellowship"
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden font-medium text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        {isKrio ? 'Email fo Risit & Awad' : 'Email (for Tax / Field Audit Receipt)'}
                      </label>
                      <input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="e.g. sarah@hopecalgary.ca"
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        {isKrio ? 'Kɔntri' : 'Country / Region'}
                      </label>
                      <select
                        value={donorCountry}
                        onChange={(e) => setDonorCountry(e.target.value)}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden text-xs sm:text-sm"
                      >
                        <option value="Canada">Canada (Freedom Tree Partner Hub)</option>
                        <option value="Sierra Leone">Sierra Leone (Local Supporter)</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="International">Other International</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        {isKrio ? 'Wɔd of Ɛnkorɛjmɛnt (Opishɔnal)' : 'Message of Encouragement / In Honor of'}
                      </label>
                      <input
                        type="text"
                        value={donorMessage}
                        onChange={(e) => setDonorMessage(e.target.value)}
                        placeholder={isKrio ? 'e.g. Wi de pre fo mama dèm na Bo!' : 'e.g. In loving honor of my mother'}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Anonymous Checkbox */}
                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer hover:bg-slate-900">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-950 border-slate-700"
                    />
                    <span className="text-slate-300">
                      {isKrio
                        ? 'Kip mi nem sekit pan di Live Supporter Wall (Anonymous)'
                        : 'Display my pledge anonymously on the live Bo Community Wall'}
                    </span>
                  </label>
                </div>

                {/* Step 2 Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isKrio ? 'Bak to Step 1' : 'Back'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <span>{isKrio ? 'Kɔntinyu to Peyment' : 'Next: Payment Method'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Method & Review */}
            {currentStep === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      {isKrio ? 'Step 3 pan 4' : 'Step 3 of 4'}
                    </span>
                    <h3 className="text-xl font-black text-white">
                      {isKrio ? 'Pik Peyment Metɔd & Konfame' : 'Select Payment & Complete Sponsorship'}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                    100% Direct Allocation
                  </span>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400">{isKrio ? 'Sponsor:' : 'Sponsor:'}</span>
                    <span className="text-white font-bold">
                      {isAnonymous ? 'Anonymous Supporter' : donorName} ({donorCountry})
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400">{isKrio ? 'Impakt we yu pik:' : 'Allocation:'}</span>
                    <span className="text-amber-300 font-bold">{currentTierObj?.title || `$${currentAmount} Maternal Health Gift`}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-sm font-black">
                    <span className="text-white">{isKrio ? 'Total Gift:' : 'Total Sponsorship:'}</span>
                    <span className="text-emerald-400 font-mono text-base">${currentAmount} USD</span>
                  </div>
                </div>

                {/* Payment Option Buttons */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    {isKrio ? 'Pik Aw Yu Want fo Pey:' : 'Choose Payment Gateway:'}
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-amber-950/70 border-amber-500 text-white ring-2 ring-amber-500/20'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                      <span className="text-[11px] font-bold block">Credit / Debit</span>
                      <span className="text-[9px] text-slate-400">Visa / Master</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('orange_money_sl')}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'orange_money_sl'
                          ? 'bg-orange-950/70 border-orange-500 text-white ring-2 ring-orange-500/20'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                      <span className="text-[11px] font-bold block">Orange Money</span>
                      <span className="text-[9px] text-slate-400">Sierra Leone</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('africell_money')}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'africell_money'
                          ? 'bg-rose-950/70 border-rose-500 text-white ring-2 ring-rose-500/20'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-rose-400" />
                      <span className="text-[11px] font-bold block">Africell Money</span>
                      <span className="text-[9px] text-slate-400">Afrimoney SL</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'paypal'
                          ? 'bg-sky-950/70 border-sky-500 text-white ring-2 ring-sky-500/20'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Lock className="w-5 h-5 mx-auto mb-1 text-sky-400" />
                      <span className="text-[11px] font-bold block">PayPal</span>
                      <span className="text-[9px] text-slate-400">FT Canada</span>
                    </button>
                  </div>

                  {/* Payment Method Details */}
                  {paymentMethod === 'card' && (
                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 font-bold">Secure Card Checkout:</span>
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> 256-Bit Encrypted
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Card Number"
                            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs text-center"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {(paymentMethod === 'orange_money_sl' || paymentMethod === 'africell_money') && (
                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <label className="text-slate-300 font-bold">
                          {paymentMethod === 'orange_money_sl' ? 'Orange Money SL Number:' : 'Africell Money SL Number:'}
                        </label>
                        <span className="text-[10px] text-amber-400 font-mono">
                          Merchant: FREEDOM-TREE-BO
                        </span>
                      </div>
                      <input
                        type="tel"
                        value={mobileMoneyNumber}
                        onChange={(e) => setMobileMoneyNumber(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                      />
                      <p className="text-[11px] text-slate-400">
                        {isKrio
                          ? 'Prompt go kam na yu fon fo konfame peyment to Freedom Tree Bo Center.'
                          : 'A verification prompt will be sent to your phone for approval.'}
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <p className="text-[11px] leading-relaxed">
                        Processed securely via Freedom Tree Canada affiliate foundation with CRA charitable tax receipt eligibility.
                      </p>
                    </div>
                  )}
                </div>

                {/* Step 3 Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isProcessing}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isKrio ? 'Bak to Step 2' : 'Back'}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-emerald-500/20 cursor-pointer disabled:opacity-50 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>
                      {isProcessing
                        ? isKrio
                          ? 'De Konfame...'
                          : 'Confirming & Allocating...'
                        : isKrio
                        ? `Konfame Yu $${currentAmount} Gift`
                        : `Confirm Sponsorship ($${currentAmount} USD)`}
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: Confirmation & Official Digital Certificate */}
            {currentStep === 4 && completedPledge && (
              <div className="text-center space-y-6 py-2 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-300 mx-auto flex items-center justify-center border-2 border-emerald-500 ring-8 ring-emerald-900/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    {isKrio ? 'Sponsorship Don Konfame' : 'Sponsorship Confirmed & Allocated'}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {isKrio ? 'Tɛnki En God Blɛs Yu' : 'Thank You'}, {completedPledge.donorName}!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                    Your generous gift of <strong>${completedPledge.amountUsd} USD</strong> is registered directly with the Freedom Tree Bo Maternal Center field operations.
                  </p>
                </div>

                {/* Official Digital Certificate of Sponsorship */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-6 rounded-3xl border-2 border-amber-500/70 text-left space-y-4 relative shadow-2xl">
                  {/* Top Certificate Header */}
                  <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                        FT
                      </div>
                      <div>
                        <div className="text-xs font-black text-white tracking-wide">
                          FREEDOM TREE SIERRA LEONE
                        </div>
                        <div className="text-[10px] text-amber-400">Official Safe Motherhood Sponsorship Certificate</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-1 rounded border border-emerald-800">
                      ID: {completedPledge.id}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="space-y-2 text-xs text-slate-200">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Honored Sponsor:</span>
                      <strong className="text-white">{completedPledge.donorName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Country of Origin:</span>
                      <span className="text-slate-300">{completedPledge.donorCountry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Impact Allocated:</span>
                      <span className="text-amber-300 font-bold">{completedPledge.tierName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Field Operational Hub:</span>
                      <span className="text-slate-300">11 Bundu St Off Bo Taiama Highway, Bo, SL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Lead Implementation:</span>
                      <span className="text-slate-300">New Harvest Global Ministries</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date Issued:</span>
                      <span className="text-slate-300">{completedPledge.date}</span>
                    </div>
                  </div>

                  {completedPledge.message && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 italic">
                      "{completedPledge.message}"
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-700/80 text-[10px] text-slate-400 italic text-center">
                    "Working within communities to reduce maternal and infant mortality in Sierra Leone."
                  </div>
                </div>

                {/* Certificate Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleCopyVerification}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{copiedLink ? (isKrio ? 'Kɔpi Dɔn!' : 'Link Copied!') : isKrio ? 'Shear Sitifiket' : 'Share Verification'}</span>
                  </button>

                  <button
                    onClick={handlePrintReceipt}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isKrio ? 'Print Risit' : 'Print Official Receipt'}</span>
                  </button>

                  <button
                    onClick={handleResetFlow}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs cursor-pointer shadow-md transition-all"
                  >
                    <span>{isKrio ? 'Sponsor Anoda Mama' : 'Sponsor Another Mother'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Community Supporter Wall & Trust Badges */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Supporter Wall */}
            <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>{isKrio ? 'Sponsor Dèm we Don Gi' : 'Recent Safe Birth Sponsors'}</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Field Wall
                </span>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {pledges.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 text-xs space-y-1.5 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <strong className="text-white font-bold">{p.donorName}</strong>
                        <span className="text-[10px] text-slate-400">({p.donorCountry})</span>
                      </div>
                      <span className="text-amber-400 font-black">${p.amountUsd} USD</span>
                    </div>

                    <p className="text-[11px] text-slate-300 font-medium">{p.tierName}</p>

                    {p.message && (
                      <p className="text-[10px] text-slate-400 italic bg-slate-950 p-2 rounded-xl border border-slate-800">
                        "{p.message}"
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1">
                      <span>Via {p.paymentMethod.replace(/_/g, ' ').toUpperCase()}</span>
                      <span>{p.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accountability Card */}
            <div className="bg-emerald-950/50 rounded-3xl p-5 border border-emerald-800/60 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Direct Program Stewardship</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Freedom Tree Sierra Leone operates on the ground in Bo in direct alliance with New Harvest Global Ministries and Freedom Tree Canada. Supplies and fuel vouchers are audited on-site at 11 Bundu Street.
              </p>
              <div className="pt-2 flex items-center justify-between text-[10px] text-emerald-400 font-medium">
                <span>Headquarters: Bo, Sierra Leone</span>
                <span>Affiliate: Canada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

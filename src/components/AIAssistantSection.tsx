import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  AlertTriangle,
  Heart,
  PhoneCall,
  MapPin,
  Bot,
  User,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  Stethoscope,
  Globe,
  Loader2,
  Wifi,
  WifiOff,
  Radio,
  FileText,
  Copy,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Info,
} from 'lucide-react';
import { FREEDOM_TREE_INFO } from '../data/mockData';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

interface AIAssistantSectionProps {
  onOpenHotlineModal: () => void;
  isKrio: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isDangerSign?: boolean;
  isOfflineCached?: boolean;
}

// Built-in offline emergency knowledge database for field triage without internet connectivity
const OFFLINE_CLINICAL_DATABASE: Array<{
  keywords: string[];
  title: string;
  advice: string;
  isDanger: boolean;
}> = [
  {
    keywords: ['bleeding', 'blood', 'hemorrhage', 'pph', 'bledin', 'blod', 'lochia'],
    title: '🚨 Postpartum Hemorrhage (PPH) Emergency Protocol',
    advice: `**[OFFLINE CACHED PROTOCOL] IMMEDIATE POSTPARTUM HEMORRHAGE ACTION:**

1. **CALL FOR HELP & DISPATCH:** Dial Freedom Tree 24/7 Hotline immediately at **+232 76 522 072** or trigger village CHW dispatch.
2. **FUNDAL MASSAGE:** Rub the uterus with cupped hand firmly until it feels like a hard cricket ball. Repeat every 15 minutes.
3. **EMPTY BLADDER:** Catheterize or assist mother to void urine (a full bladder prevents uterine contraction).
4. **EXPEL CLOTS:** Gently compress lower abdomen toward the birth canal to expel trapped blood clots.
5. **POSITION & WARMTH:** Elevate legs to 30 degrees (Trendelenburg position). Keep mother warm with blankets to prevent shock.
6. **NO SOLID FOOD:** Keep mother strictly NPO (nothing by mouth) except sips of clean water while awaiting 4WD ambulance transport to 11 Bundu St, Bo.`,
    isDanger: true,
  },
  {
    keywords: ['headache', 'bp', 'blood pressure', 'eclampsia', 'convulsion', 'fit', 'vision', 'blurred', 'swelling'],
    title: '⚠️ Pre-Eclampsia / Eclampsia & Convulsion Protocol',
    advice: `**[OFFLINE CACHED PROTOCOL] SEVERE PRE-ECLAMPSIA & SEIZURE FIRST AID:**

1. **AIRWAY PROTECTION:** Place mother on her **LEFT SIDE** (left lateral tilt). Clear mouth of secretions. Never insert fingers or spoons during active seizure.
2. **QUIET & DARK ENVIRONMENT:** Minimize bright lights and loud noise to prevent triggering further convulsions.
3. **OXYGEN & TRANSPORT:** Arrange emergency 4WD transfer to Freedom Tree Bo Center or Bo Government Hospital.
4. **VITAL CHECKS:** Re-check BP every 15 minutes. If systolic BP >160 or diastolic >110, this is an obstetric hypertensive crisis requiring IM/IV Magnesium Sulfate at clinical facility.
5. **EMERGENCY DISPATCH:** Call **+232 76 522 072** immediately.`,
    isDanger: true,
  },
  {
    keywords: ['breathe', 'breathing', 'crying', 'baby limp', 'resuscitate', 'golden minute', 'not breathing', 'resuscitation'],
    title: '👶 Neonatal Resuscitation (Helping Babies Breathe - The Golden Minute)',
    advice: `**[OFFLINE CACHED PROTOCOL] NEWBORN RESUSCITATION - FIRST 60 SECONDS:**

1. **DRY & STIMULATE:** Dry the baby briskly with a clean warm cloth from Mama Kit. Discard wet cloth.
2. **CLEAR AIRWAY:** Suction mouth then nose only if obstructed with meconium or thick secretions. Keep neck in slightly extended "sniffing" position.
3. **ASSESS BREATHING:** If baby is NOT breathing or gasping at 60 seconds after birth:
   - Apply clean bag-and-mask ventilation (40–45 breaths per minute).
   - Watch for chest rise with each squeeze.
4. **CONTINUOUS WARMTH:** Place baby skin-to-skin on mother's chest (Kangaroo Mother Care) once breathing is stabilized.
5. **DISPATCH NOTICE:** Contact Bo Center at **+232 76 522 072**.`,
    isDanger: true,
  },
  {
    keywords: ['cord', 'blade', 'razor', 'cut', 'kit', 'navel', 'clamp', 'tetanus', 'tie'],
    title: '📦 Clean Delivery Mama Kit Sterile Cord Cutting Protocol',
    advice: `**[OFFLINE CACHED PROTOCOL] STERILE MAMA KIT CORD CLAMPING STEPS:**

1. **HAND HYGIENE:** Scrub hands with Chlorhexidine soap from the Mama Kit for 60 seconds.
2. **DELAYED CLAMPING:** Wait 1 to 3 minutes until cord pulsations stop (preserves 80ml iron-rich blood for infant).
3. **TIE PLACEMENT:**
   - Tie 1st sterile cord tie **2 finger-breadths** from the baby's navel.
   - Tie 2nd sterile tie **1 finger-breadth** further away from the first tie.
4. **STERILE CUT:** Unseal the sterile surgical razor blade and cut the cord cleanly between the two ties.
5. **ANTISEPTIC:** Apply 7.1% Chlorhexidine gel/wash to the cord stump. Leave stump open to air.
6. **NEVER APPLY:** Cow dung, firewood ash, dirty oil, or powders (strictly banned).`,
    isDanger: false,
  },
  {
    keywords: ['nutrition', 'food', 'anemia', 'diet', 'moringa', 'iron', 'beans', 'fish', 'bennimix', 'it'],
    title: '🥗 Sierra Leone Maternal Diet & Anemia Prevention Protocol',
    advice: `**[OFFLINE CACHED PROTOCOL] INDIGENOUS NUTRITION GUIDELINE:**

1. **BLOOD-BUILDING FOODS:** Consume daily servings of Moringa (*Kren-kren*), cassava leaves, potato leaves, and crushed dried bonga fish.
2. **ENERGY & BRAIN DEVELOPMENT:** Groundnut stew, roasted sesame (*benne seeds*), cowpeas, and unrefined red palm oil (rich in Vitamin A).
3. **ABSORPTION BOOSTER:** Pair iron-rich greens with citrus fruits (oranges, baobab fruit, lime) for high Vitamin C.
4. **ROUTINE SUPPLEMENTS:** Take 1 daily Ferrous Sulfate + Folic Acid tablet with clean water.
5. **ANTENATAL CHECKUP:** Visit 11 Bundu St, Bo for free Hemoglobin checks.`,
    isDanger: false,
  },
];

export const AIAssistantSection: React.FC<AIAssistantSectionProps> = ({
  onOpenHotlineModal,
  isKrio,
}) => {
  const { isOnline, isSimulatedOffline, toggleSimulatedOffline } = useNetworkStatus();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: isKrio
        ? `**Kusheh!** A na di Freedom Tree Maternal & Infant Health AI Advisor na Bo, Sierra Leone. 

Wi de wok wit New Harvest Global Ministries fo stop mama en pikin dath. Yu kin aks mi bot:
- **Danger signs** (hevi bledin, fiva, fit/eclampsia)
- **Klin Mama Kit** yus step-by-step
- **Antenatal care & local Sierra Leone nutrition**
- **Emergency transport** go Freedom Tree Bo Center (11 Bundu Street Off Bo Taiama Highway / +232 76 522 072)`
        : `**Welcome to the Freedom Tree Sierra Leone Maternal Health & Field Triage Advisor.**

Grounded in WHO protocols and Sierra Leone Ministry of Health guidelines, I provide clinical decision support for Community Health Workers, Traditional Birth Attendants, and families in Bo District.

How can I assist you today with pregnancy care, Mama Kit delivery protocols, or emergency referral?`,
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Krio'>(isKrio ? 'Krio' : 'English');
  const [smsCopied, setSmsCopied] = useState(false);

  const presetQueries = [
    {
      label: '⚠️ High-Risk Triage: BP 150/95 & Blurred Vision',
      prompt: 'A pregnant mother at 36 weeks in Bo rural has blood pressure 150/95, severe frontal headache, and blurred vision. What is the immediate triage and stabilization protocol before transport to Bo Center?',
    },
    {
      label: '📦 Mama Kit Sterile Cord Cutting Steps',
      prompt: 'Walk me through the exact sterile procedure for delayed cord clamping and cutting using the Freedom Tree Clean Delivery Kit in a village home birth.',
    },
    {
      label: '👶 Neonatal Resuscitation (Helping Babies Breathe)',
      prompt: 'A newborn baby was just delivered limp and is not crying or breathing. What are the first 60 seconds (Golden Minute) resuscitation actions for a Community Health Worker?',
    },
    {
      label: '🥗 Local Sierra Leone Antenatal Nutrition & Anemia Prevention',
      prompt: 'What accessible local Sierra Leonean foods (e.g. moringa, groundnuts, cassava leaves with fish) and clinic supplements are recommended to prevent severe anemia in pregnant mothers in Bo District?',
    },
    {
      label: '🇸🇱 Krio Guide: Why Hospital Delivery is Safer than Unassisted Home Birth',
      prompt: 'Explain clearly in Sierra Leone Krio why an expectant mother should attend antenatal clinics and deliver at Freedom Tree Bo Center rather than giving birth without sterile supplies.',
    },
  ];

  // Lookup matching cached advice for offline mode
  const getOfflineFallbackReply = (query: string): { reply: string; isDanger: boolean } => {
    const qLower = query.toLowerCase();
    for (const item of OFFLINE_CLINICAL_DATABASE) {
      if (item.keywords.some((kw) => qLower.includes(kw))) {
        return {
          reply: item.advice,
          isDanger: item.isDanger,
        };
      }
    }

    return {
      reply: `**[OFFLINE CACHED PROTOCOL] FREEDOM TREE FIELD CLINICAL SUMMARY:**

You are currently accessing advice in **Offline Mode**. 

**Primary Obstetric Triage Rules:**
1. **DANGER SIGNS:** If patient exhibits vaginal bleeding, convulsions/high BP, high fever, or obstructed labor, call Freedom Tree 24/7 Hotline directly at **${FREEDOM_TREE_INFO.phone}** (voice calls work over standard cellular network without mobile data).
2. **CLEAN DELIVERY:** Always use the sterile surgical blade, cord clamps, and chlorhexidine from the Freedom Tree Mama Kit.
3. **FACILITY BASE:** 11 Bundu Street Off Bo Taiama Highway, Bo (24/7 emergency maternity triage).`,
      isDanger: false,
    };
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery.trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInputQuery('');

    // If offline (real or simulated), use local cached knowledge engine
    if (!isOnline) {
      const offlineResult = getOfflineFallbackReply(textToSend);
      const aiMessage: Message = {
        id: `ai-offline-${Date.now()}`,
        sender: 'ai',
        text: offlineResult.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDangerSign: offlineResult.isDanger,
        isOfflineCached: true,
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, aiMessage]);
      }, 300);
      return;
    }

    // Online: Fetch from backend AI route
    setLoading(true);

    try {
      const response = await fetch('/api/ai/maternal-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: selectedLanguage,
          context: 'Freedom Tree Bo District Maternal Initiative',
        }),
      });

      const data = await response.json();
      const replyText = data.reply || data.fallback || 'Advice processed successfully.';

      const isDanger =
        textToSend.toLowerCase().includes('bleeding') ||
        textToSend.toLowerCase().includes('headache') ||
        textToSend.toLowerCase().includes('convulsion') ||
        textToSend.toLowerCase().includes('bp') ||
        textToSend.toLowerCase().includes('not breathing') ||
        replyText.toLowerCase().includes('emergency referral') ||
        replyText.toLowerCase().includes('immediate transport');

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDangerSign: isDanger,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Failed to get AI triage response, switching to cached protocols:', err);
      const fallback = getOfflineFallbackReply(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-error-${Date.now()}`,
          sender: 'ai',
          text: fallback.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDangerSign: true,
          isOfflineCached: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmergencySms = () => {
    const smsText = `EMERGENCY DISPATCH: Freedom Tree Bo Center. Patient in need of urgent maternal transfer. Contact: ${FREEDOM_TREE_INFO.phone}. Location: Bo District.`;
    navigator.clipboard.writeText(smsText);
    setSmsCopied(true);
    setTimeout(() => setSmsCopied(false), 3000);
  };

  return (
    <section id="ai-triage-section" className="py-16 lg:py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Gemini 3.7 Flash Clinical Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {isKrio
              ? 'Freedom Tree AI Maternal Health Advisor'
              : 'Field Maternal Health & Midwifery AI Assistant'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Real-time obstetric triage, clean delivery instructions, and maternal nutrition advice
            aligned with Sierra Leone Ministry of Health standards and Freedom Tree Bo Center protocols.
          </p>
        </div>

        {/* Global Network Connectivity Indicator & Field Mode Controls */}
        <div className="max-w-4xl mx-auto mb-6">
          <div
            className={`p-4 rounded-2xl border transition-all shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isOnline
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950 ring-2 ring-amber-500/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                  isOnline
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-amber-600 text-white animate-pulse'
                }`}
              >
                {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm flex items-center gap-1.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isOnline ? 'bg-emerald-500 animate-ping' : 'bg-amber-600'
                      }`}
                    ></span>
                    Network Status: {isOnline ? 'Online (Cloud AI Active)' : 'Offline / Low Connectivity Mode'}
                  </span>
                  {isSimulatedOffline && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold uppercase">
                      Simulated Test
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  {isOnline
                    ? 'Connected to Google Gemini 3.7 Flash cloud clinical intelligence.'
                    : 'No active mobile data. Pre-cached emergency protocols & 24/7 hotline triage active.'}
                </p>
              </div>
            </div>

            {/* Offline Simulation Toggle for Field Testing */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSimulatedOffline}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                  isSimulatedOffline
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
                title="Toggle simulated offline mode to test field readiness"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>{isSimulatedOffline ? 'Restore Online AI' : 'Test Offline Mode'}</span>
              </button>
            </div>
          </div>

          {/* Dedicated Offline Guidance Box when Offline */}
          {!isOnline && (
            <div className="mt-4 p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wide">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  What to Do When Accessing AI Triage While Offline in the Field:
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold">
                  Zero Data Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Step 1: Direct Voice Call */}
                <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 space-y-2">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5" />
                    1. Call 24/7 Voice Line
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Standard phone voice calls operate on 2G cellular without needing internet.
                  </p>
                  <button
                    onClick={onOpenHotlineModal}
                    className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <PhoneCall className="w-3 h-3" />
                    Call {FREEDOM_TREE_INFO.phone}
                  </button>
                </div>

                {/* Step 2: Instant Local Clinical Protocols */}
                <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 space-y-2">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    2. Cached Protocols Ready
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Type or tap below. The advisor instantly answers with built-in WHO & Freedom Tree clinical protocols.
                  </p>
                  <div className="text-[10px] text-slate-400 bg-slate-950 p-1.5 rounded">
                    ✓ PPH Bleeding • ✓ Eclampsia • ✓ Golden Minute
                  </div>
                </div>

                {/* Step 3: SMS Dispatch & Physical Location */}
                <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 space-y-2">
                  <div className="font-bold text-sky-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    3. Walk-In or Text
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Headquarters is solar-powered and open 24/7 at 11 Bundu Street Off Bo Taiama Highway.
                  </p>
                  <button
                    onClick={handleCopyEmergencySms}
                    className="w-full py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {smsCopied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{smsCopied ? 'SMS Copied!' : 'Copy Emergency SMS'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Interface Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[700px]">
          {/* Assistant Header Bar */}
          <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/90 text-amber-300 flex items-center justify-center shadow-xs border border-emerald-700/50">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Freedom Tree Maternal Advisor</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isOnline
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-amber-950 text-amber-300 border-amber-600'
                    }`}
                  >
                    {isOnline ? 'Online (AI Cloud)' : 'Offline (Local Protocols)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Bo Center Referral Hub • 11 Bundu St • +232 76 522 072
                </p>
              </div>
            </div>

            {/* Language & Reset Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-800 rounded-lg p-1 text-xs border border-slate-700">
                <button
                  onClick={() => setSelectedLanguage('English')}
                  className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                    selectedLanguage === 'English' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setSelectedLanguage('Krio')}
                  className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                    selectedLanguage === 'Krio' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Krio (Salone)
                </button>
              </div>

              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'welcome-re',
                      sender: 'ai',
                      text: isOnline
                        ? 'Advisor reset. Ask a question regarding maternal triage, Mama Kit delivery protocols, or Bo emergency referrals.'
                        : 'Offline Mode Active. Cached clinical protocols for PPH, Pre-Eclampsia, Neonatal Resuscitation, and Mama Kit usage are ready.',
                      timestamp: 'Just now',
                    },
                  ])
                }
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 cursor-pointer"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="bg-slate-100/80 border-b border-slate-200 p-3 overflow-x-auto">
            <div className="flex items-center gap-2 whitespace-nowrap min-w-max text-xs">
              <span className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1 pl-1">
                <HelpCircle className="w-3 h-3 text-amber-600" /> Quick Clinical Prompts:
              </span>
              {presetQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.prompt)}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-300 hover:border-emerald-400 text-xs font-medium transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${
                      isUser ? 'bg-slate-900 text-amber-300' : 'bg-emerald-900 text-amber-300'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-tr-none shadow-sm'
                        : msg.isDangerSign
                        ? 'bg-white text-slate-900 border-2 border-rose-300 rounded-tl-none shadow-sm ring-2 ring-rose-500/10'
                        : 'bg-white text-slate-900 border border-slate-200/90 rounded-tl-none shadow-2xs'
                    }`}
                  >
                    {/* Offline Tag if answered locally */}
                    {msg.isOfflineCached && !isUser && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-2">
                        <WifiOff className="w-3 h-3" />
                        Cached Offline Protocol
                      </div>
                    )}

                    {/* Danger Banner if applicable */}
                    {msg.isDangerSign && !isUser && (
                      <div className="flex items-center justify-between bg-rose-50 border border-rose-200 text-rose-800 px-3 py-1.5 rounded-lg mb-3 text-xs font-bold">
                        <span className="flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                          Obstetric Danger Sign Recognized
                        </span>
                        <button
                          onClick={onOpenHotlineModal}
                          className="text-[11px] underline font-extrabold text-rose-900 hover:text-rose-700 cursor-pointer"
                        >
                          Dispatch (+232 76 522 072)
                        </button>
                      </div>
                    )}

                    {/* Content Rendering */}
                    <div className="space-y-2 whitespace-pre-wrap">
                      {msg.text.split('\n\n').map((paragraph, pIdx) => {
                        return (
                          <p key={pIdx} className="leading-relaxed">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>

                    <div
                      className={`text-[10px] mt-2 font-mono flex items-center justify-end ${
                        isUser ? 'text-slate-400' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3.5 shadow-2xs flex items-center gap-2 text-xs text-slate-600">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                  <span>Consulting Freedom Tree Bo maternal triage protocol...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  !isOnline
                    ? 'Offline Mode: Type symptom, PPH, eclampsia, cord cutting, or nutrition...'
                    : selectedLanguage === 'Krio'
                    ? 'Aks bot danger signs, Mama Kit, o referral na Bo...'
                    : 'Describe maternal symptoms, ask Mama Kit steps, or Bo referral protocol...'
                }
                disabled={loading}
                className="flex-1 bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:bg-white text-slate-900 text-xs sm:text-sm rounded-xl px-4 py-3 outline-hidden transition-all shadow-2xs"
              />

              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="px-5 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{isOnline ? 'Ask AI' : 'Search Offline'}</span>
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-500">
              <span>Grounding: WHO Safe Motherhood + Sierra Leone MoHS Standards</span>
              <span className="font-semibold text-emerald-800">
                HQ: 11 Bundu St, Bo • Partner: New Harvest Global
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

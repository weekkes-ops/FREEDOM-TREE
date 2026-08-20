import React, { useState } from 'react';
import {
  BookOpen,
  Apple,
  HeartHandshake,
  ShieldPlus,
  Sparkles,
  Salad,
  AlertTriangle,
  Download,
  Eye,
  CheckCircle2,
  Search,
  Volume2,
  VolumeX,
  FileText,
  Clock,
  Users,
  MapPin,
  Share2,
  Printer,
  X,
  ArrowRight,
  Info,
  PhoneCall,
  ChevronRight,
} from 'lucide-react';
import { HEALTH_EDUCATION_GUIDES, FREEDOM_TREE_INFO } from '../data/mockData';
import { HealthEducationGuide } from '../types';

interface HealthEducationSectionProps {
  isKrio: boolean;
  onOpenHotlineModal?: () => void;
}

export const HealthEducationSection: React.FC<HealthEducationSectionProps> = ({
  isKrio,
  onOpenHotlineModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeGuideModal, setActiveGuideModal] = useState<HealthEducationGuide | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Icon mapping helper
  const getGuideIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple':
        return Apple;
      case 'HeartHandshake':
        return HeartHandshake;
      case 'ShieldPlus':
        return ShieldPlus;
      case 'Salad':
        return Salad;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'Sparkles':
      default:
        return Sparkles;
    }
  };

  const categories = [
    { id: 'all', label: isKrio ? 'Ɔl Tok Dèm' : 'All Guides', count: HEALTH_EDUCATION_GUIDES.length },
    {
      id: 'maternal-nutrition',
      label: isKrio ? 'Mama It & Blɔd' : 'Maternal Nutrition',
      icon: Apple,
      count: HEALTH_EDUCATION_GUIDES.filter((g) => g.category === 'maternal-nutrition').length,
    },
    {
      id: 'infant-care',
      label: isKrio ? 'Bebi Men & Kord' : 'Infant & Newborn Care',
      icon: HeartHandshake,
      count: HEALTH_EDUCATION_GUIDES.filter((g) => g.category === 'infant-care').length,
    },
    {
      id: 'postpartum-recovery',
      label: isKrio ? 'Afta Bili & Denja Sayn' : 'Postpartum Recovery',
      icon: AlertTriangle,
      count: HEALTH_EDUCATION_GUIDES.filter((g) => g.category === 'postpartum-recovery').length,
    },
  ];

  const filteredGuides = HEALTH_EDUCATION_GUIDES.filter((guide) => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesAudience = selectedAudience === 'all' || guide.targetAudience === selectedAudience;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      guide.title.toLowerCase().includes(query) ||
      (guide.krioTitle && guide.krioTitle.toLowerCase().includes(query)) ||
      guide.summary.toLowerCase().includes(query) ||
      guide.keyPoints.some((p) => p.toLowerCase().includes(query)) ||
      guide.localSierraLeoneFocus.toLowerCase().includes(query);

    return matchesCategory && matchesAudience && matchesSearch;
  });

  const handleDownloadGuide = (guide: HealthEducationGuide) => {
    const fileContent = `=====================================================
FREEDOM TREE SIERRA LEONE - COMMUNITY HEALTH EDUCATION
Headquarters: 11 Bundu Street Off Bo Taiama Highway, Bo, Sierra Leone
24/7 Maternal Emergency Hotline: +232 76 522 072
Lead Partner: New Harvest Global Ministries
Canadian Partner: Freedom Tree Canada (www.freedomtree.ca)
=====================================================

TITLE: ${guide.title}
KRIO TITLE: ${guide.krioTitle || 'N/A'}
CATEGORY: ${guide.category.replace('-', ' ').toUpperCase()}
TARGET AUDIENCE: ${guide.targetAudience}
ESTIMATED READ TIME: ${guide.readTimeMinutes} minutes
SIERRA LEONE FIELD FOCUS: ${guide.localSierraLeoneFocus}

-----------------------------------------------------
SUMMARY:
-----------------------------------------------------
${guide.summary}

KRIO SUMMARY:
${guide.krioSummary || 'N/A'}

-----------------------------------------------------
KEY CLINICAL TAKEAWAYS & ACTION PROTOCOL:
-----------------------------------------------------
${guide.keyPoints.map((pt, idx) => `${idx + 1}. ${pt}`).join('\n')}

-----------------------------------------------------
FULL CLINICAL & COMMUNITY GUIDE:
-----------------------------------------------------
${guide.fullContentMarkdown}

=====================================================
EMERGENCY REFERRAL NOTICE:
If any obstetric danger signs appear (heavy bleeding, convulsions, high fever, severe frontal headache, or newborn respiratory distress), contact the Freedom Tree Emergency Dispatch immediately at +232 76 522 072 or transport to 11 Bundu Street Off Bo Taiama Highway, Bo.
=====================================================
`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FreedomTree-HealthGuide-${guide.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloaded "${guide.title}" successfully.`);
    setTimeout(() => setDownloadToast(null), 4000);
  };

  const handleCopyGuide = (guide: HealthEducationGuide) => {
    const text = `${guide.title}\n\nKey Points:\n${guide.keyPoints.join('\n')}\n\nFreedom Tree Bo Center: +232 76 522 072 | 11 Bundu St, Bo`;
    navigator.clipboard.writeText(text);
    setCopiedId(guide.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleAudio = (guideId: string) => {
    if (playingAudioId === guideId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(guideId);
      // Auto stop after 10s for simulation
      setTimeout(() => {
        setPlayingAudioId((curr) => (curr === guideId ? null : curr));
      }, 8000);
    }
  };

  return (
    <section id="health-education" className="py-16 lg:py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            {isKrio ? 'Elt Tok & Buku Dèm' : 'Maternal & Infant Health Education'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {isKrio
              ? 'Buku Dèm Fo Mama It & Bebi Men Na Bo'
              : 'Community Clinical Guides & Nutritional Protocols'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Evidence-based clinical guidelines and indigenous nutritional resources tailored for expectant mothers,
            families, Traditional Birth Attendants, and Community Health Workers across Bo District.
          </p>
        </div>

        {/* Quick Highlights / Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Apple className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">Local Diet</div>
              <div className="text-xs text-slate-500">Moringa, Benne, Fish</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">Golden Hour</div>
              <div className="text-xs text-slate-500">Colostrum & Warmth</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <ShieldPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">WHO Aligned</div>
              <div className="text-xs text-slate-500">MoHS Sierra Leone</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">100% Free</div>
              <div className="text-xs text-slate-500">Read or Download</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat.id ? 'bg-emerald-950 text-emerald-200' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isKrio ? 'Fayn it, bebi men, fiva...' : 'Search nutrition, cord, weaning...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Download Success Notification Toast */}
        {downloadToast && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-900 text-white text-xs flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{downloadToast}</span>
            </div>
            <span className="text-[11px] text-emerald-200">Available offline on your device</span>
          </div>
        )}

        {/* Grid of Educational Guide Cards */}
        {filteredGuides.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No matching guides found</h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your search keyword or selecting "All Guides".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => {
              const Icon = getGuideIcon(guide.iconName);
              const isAudioPlaying = playingAudioId === guide.id;

              return (
                <div
                  key={guide.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Card Header */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center shadow-2xs group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {guide.readTimeMinutes} min read
                        </span>
                        {guide.featured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            ★ Essential
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {guide.targetAudience}
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-emerald-900 transition-colors">
                        {guide.title}
                      </h3>

                      {guide.krioTitle && (
                        <p className="text-xs font-semibold text-amber-700 italic mt-0.5">
                          "{guide.krioTitle}"
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {isKrio && guide.krioSummary ? guide.krioSummary : guide.summary}
                    </p>

                    {/* Key Protocol Highlights Preview */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                      <div className="text-[10px] font-black uppercase text-slate-700 tracking-wider">
                        Key Clinical Takeaways:
                      </div>
                      <ul className="space-y-1 text-[11px] text-slate-600">
                        {guide.keyPoints.slice(0, 2).map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold mt-0.5">•</span>
                            <span className="line-clamp-2">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Local Bo Focus Tag */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{guide.localSierraLeoneFocus}</span>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Read Full Guide Action */}
                    <button
                      onClick={() => setActiveGuideModal(guide)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Read Guide</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {/* Audio Simulation Preview */}
                      <button
                        onClick={() => toggleAudio(guide.id)}
                        className={`p-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                          isAudioPlaying
                            ? 'bg-amber-100 border-amber-300 text-amber-900 animate-pulse'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                        title={isAudioPlaying ? 'Stop Audio Summary' : 'Listen to Audio Summary'}
                      >
                        {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>

                      {/* Download Text Guide */}
                      <button
                        onClick={() => handleDownloadGuide(guide)}
                        className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                        title="Download printable / readable text guide"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner with Bo Headquarters Context */}
        <div className="mt-12 bg-emerald-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase">
              Field Certified Knowledge
            </div>
            <h3 className="text-xl font-black">Need Printed Materials or Training Posters for Your Village Clinic?</h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
              Freedom Tree Sierra Leone distributes physical laminated charts, pictorial TBA guides, and Mama Kits
              directly from 11 Bundu Street Off Bo Taiama Highway, Bo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const element = document.getElementById('health-education');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs cursor-pointer transition-colors shadow-sm"
            >
              Browse All Guides
            </button>
            {onOpenHotlineModal && (
              <button
                onClick={onOpenHotlineModal}
                className="px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-950 text-amber-300 font-bold text-xs border border-emerald-700 cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Hotline</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Guide Reader Modal */}
      {activeGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {activeGuideModal.category.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">
                    {activeGuideModal.readTimeMinutes} min read • {activeGuideModal.targetAudience}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {activeGuideModal.title}
                </h3>

                {activeGuideModal.krioTitle && (
                  <p className="text-xs text-amber-300 font-semibold italic">
                    "{activeGuideModal.krioTitle}"
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveGuideModal(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm leading-relaxed">
              {/* Summary Callout */}
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wide">
                  <Info className="w-4 h-4 text-emerald-700" />
                  Executive Clinical Summary
                </div>
                <p className="text-xs text-emerald-950 font-medium">
                  {activeGuideModal.summary}
                </p>
                {activeGuideModal.krioSummary && (
                  <p className="text-xs text-amber-900 bg-amber-100/60 p-2.5 rounded-lg border border-amber-200 italic">
                    <strong>Krio:</strong> {activeGuideModal.krioSummary}
                  </p>
                )}
              </div>

              {/* Key Bullet Protocol Points */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Core Clinical Takeaways:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {activeGuideModal.keyPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-xs text-slate-700 font-medium">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Markdown Article Content */}
              <div className="prose prose-sm max-w-none text-xs sm:text-sm text-slate-700 space-y-4 pt-2 border-t border-slate-100">
                {activeGuideModal.fullContentMarkdown.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="text-base font-black text-slate-900 pt-2 text-emerald-950">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('#### ')) {
                    return (
                      <h4 key={pIdx} className="text-sm font-bold text-slate-800 pt-1">
                        {paragraph.replace('#### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('* ')) {
                    const bullets = paragraph.split('\n').map((b) => b.replace('* ', ''));
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
                        {bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('---')) {
                    return <hr key={pIdx} className="border-slate-200 my-4" />;
                  }
                  return (
                    <p key={pIdx} className="text-xs sm:text-sm leading-relaxed text-slate-700">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Referral & Facility Note */}
              <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <MapPin className="w-4 h-4" />
                  Freedom Tree Bo Center Operational Information
                </div>
                <p className="text-slate-300">
                  Address: 11 Bundu Street Off Bo Taiama Highway, Bo, Sierra Leone.
                  <br />
                  24/7 Maternal Emergency Dispatch: <strong>{FREEDOM_TREE_INFO.phone}</strong>
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadGuide(activeGuideModal)}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Guide (.txt)</span>
                </button>

                <button
                  onClick={() => handleCopyGuide(activeGuideModal)}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === activeGuideModal.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-slate-600" />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setActiveGuideModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { COMMUNITY_SUCCESS_STORIES } from '../data/mockData';
import { CommunitySuccessStory } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Heart,
  MapPin,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Calendar,
  Baby,
  Play,
  Pause,
  ArrowRight,
  X,
  CheckCircle2,
  ExternalLink,
  MessageSquareQuote,
  Filter,
} from 'lucide-react';

interface CommunitySuccessStoriesProps {
  isKrio: boolean;
  onSponsorStory?: (programId: string, amount: number) => void;
}

export const CommunitySuccessStories: React.FC<CommunitySuccessStoriesProps> = ({
  isKrio,
  onSponsorStory,
}) => {
  const [stories] = useState<CommunitySuccessStory[]>(COMMUNITY_SUCCESS_STORIES);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [selectedModalStory, setSelectedModalStory] = useState<CommunitySuccessStory | null>(null);

  const filteredStories = stories.filter((story) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'mama-kits') return story.programId === 'clean-delivery-kits';
    if (selectedFilter === 'ultrasound') return story.programId === 'mobile-ultrasound';
    if (selectedFilter === 'transport') return story.programId === 'emergency-transport';
    if (selectedFilter === 'training') return story.programId === 'chw-midwife-training';
    return true;
  });

  // Ensure index stays in bounds if filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || filteredStories.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredStories.length]);

  const activeStory = filteredStories[currentIndex] || stories[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const filterOptions = [
    { id: 'all', label: isKrio ? 'Ol Stori Dèm' : 'All Stories', count: stories.length },
    { id: 'mama-kits', label: isKrio ? 'Mama Kit Dèm' : 'Mama Kits', count: 2 },
    { id: 'ultrasound', label: isKrio ? 'Mobil Ultrasound' : 'Mobile Ultrasound', count: 1 },
    { id: 'transport', label: isKrio ? 'Ambyulans' : '24/7 Transport', count: 1 },
    { id: 'training', label: isKrio ? 'Midwife Trenin' : 'TBA & Midwife Care', count: 1 },
  ];

  return (
    <section id="community-stories-section" className="py-16 lg:py-20 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      {/* Background Subtle Highlights */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300/60 shadow-2xs">
              <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-600" />
              {isKrio ? 'Kominiti Witness & Mama Dèm Voice' : 'Community Voices & Success Stories'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {isKrio
                ? 'Mothers We Bɛnifit Frɔm Freedom Tree Na Bo'
                : 'Real Stories of Lives Protected in Bo District'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isKrio
                ? 'Listen to the direct testimonies of mothers from Kakua, Tikonko, Taiama, and Baoma whose deliveries were made safe through clean kits and skilled midwife care.'
                : 'Every Mama Kit, ultrasound scan, and emergency transfer represents a mother and child given the gift of a safe future. Explore direct testimonies from the Southern Province.'}
            </p>
          </div>

          {/* Carousel Controls Top Bar (for Desktop) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isAutoPlaying
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? (isKrio ? 'Pɔs' : 'Auto Playing') : isKrio ? 'Ple' : 'Auto Play'}</span>
            </button>

            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={handlePrev}
                aria-label="Previous story"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-slate-600 px-2 min-w-[3.5rem] text-center">
                {currentIndex + 1} / {filteredStories.length}
              </span>
              <button
                onClick={handleNext}
                aria-label="Next story"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" />
            {isKrio ? 'Filta:' : 'Filter:'}
          </span>
          {filterOptions.map((opt) => {
            const isSelected = selectedFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Story Carousel Card */}
        {activeStory && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Photo & Community Context Column */}
              <div className="lg:col-span-5 relative bg-slate-900 min-h-[300px] lg:min-h-[460px] flex flex-col justify-between p-6 overflow-hidden">
                {/* Visual Image with Fallback Backdrop */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={activeStory.imageUrl}
                    alt={activeStory.imageAlt}
                    className="w-full h-full object-cover object-center opacity-85 hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient if external asset is blocked
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/30" />
                </div>

                {/* Top Badges over Photo */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    {activeStory.programUsed.split('&')[0]}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700/80">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {activeStory.date}
                  </span>
                </div>

                {/* Bottom Overlay over Photo: Mother & Baby Info */}
                <div className="relative z-10 space-y-2 mt-auto pt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-sm border-2 border-white shadow-md">
                      {activeStory.motherName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white leading-snug">
                        {activeStory.motherName}
                        <span className="text-xs font-normal text-slate-300 ml-2">({activeStory.motherAge} yrs)</span>
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
                        <Baby className="w-3.5 h-3.5" />
                        <span>
                          {activeStory.babyName} • {activeStory.babyGender}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1 text-xs text-slate-300 bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-700/80">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>
                      {activeStory.village}, {activeStory.chiefdom}, {activeStory.district}
                    </span>
                  </div>
                </div>
              </div>

              {/* Story Details & Testimonial Narrative Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                {/* Quote Box */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      <Quote className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{isKrio ? 'Mama In Mɔt Wɔd' : 'Direct Mother’s Testimony'}</span>
                    </div>

                    <span className="text-xs text-slate-400 font-mono">
                      Verified Field Story #{activeStory.id.replace('story-', '')}
                    </span>
                  </div>

                  {/* Primary Quote */}
                  <blockquote className="text-lg sm:text-xl font-bold text-slate-900 leading-snug tracking-tight relative pl-4 border-l-4 border-amber-500 italic">
                    "{isKrio ? activeStory.krioQuote : activeStory.quote}"
                  </blockquote>

                  {/* Context Narrative */}
                  <div className="text-sm text-slate-600 leading-relaxed space-y-2">
                    <p>{isKrio ? activeStory.krioNarrative : activeStory.narrative}</p>
                  </div>
                </div>

                {/* Operational Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {isKrio ? 'Elt Resɔlt' : 'Documented Impact'}
                    </div>
                    <p className="font-bold text-emerald-900 leading-tight">
                      {activeStory.impactOutcome}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                      {isKrio ? 'Midwife we Wok' : 'Attending Caregiver'}
                    </div>
                    <p className="font-bold text-slate-900 leading-tight truncate">
                      {activeStory.attendedBy}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">{activeStory.clinicOrLocation}</p>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setSelectedModalStory(activeStory)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <span>{isKrio ? 'Luk Full Stori' : 'Read Full Narrative'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {onSponsorStory && (
                    <button
                      onClick={() =>
                        onSponsorStory(activeStory.programId, activeStory.suggestedSponsorshipAmount)
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-slate-950" />
                      <span>
                        {isKrio
                          ? `Sponsor Mama Lɛk ${activeStory.motherName.split(' ')[0]} ($${activeStory.suggestedSponsorshipAmount})`
                          : `Sponsor a Mother Like ${activeStory.motherName.split(' ')[0]} ($${activeStory.suggestedSponsorshipAmount})`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Pagination Thumbnails / Dot Indicators */}
            <div className="bg-slate-100/80 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {filteredStories.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`View story from ${s.motherName}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-8 bg-amber-500 shadow-2xs'
                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>
                  {isKrio
                    ? '100% Stori Dèm Na Tru Tru frɔm Bo District'
                    : '100% Verified Maternal Health Testimonials from Bo'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Community Trust Metric Banner */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">28,450+</span>
            <div className="text-xs font-bold text-slate-800">Safe Deliveries Supported</div>
            <p className="text-[11px] text-slate-500">Zero sepsis maternal outcomes in assisted births</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">42,100+</span>
            <div className="text-xs font-bold text-slate-800">Clean Mama Kits Issued</div>
            <p className="text-[11px] text-slate-500">Sterile components directly to mothers</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">185+</span>
            <div className="text-xs font-bold text-slate-800">Midwives & TBAs Certified</div>
            <p className="text-[11px] text-slate-500">Helping Babies Breathe trained</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">99.8%</span>
            <div className="text-xs font-bold text-slate-800">Maternal Survival Rate</div>
            <p className="text-[11px] text-slate-500">At Freedom Tree Bo Maternal Center</p>
          </div>
        </div>
      </div>

      {/* Story Full Narrative Modal */}
      {selectedModalStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  {selectedModalStory.programUsed}
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  {selectedModalStory.motherName}’s Safe Birth Story
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedModalStory.village}, {selectedModalStory.chiefdom} • {selectedModalStory.date}
                </p>
              </div>

              <button
                onClick={() => setSelectedModalStory(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 italic font-medium text-slate-900">
                "{isKrio ? selectedModalStory.krioQuote : selectedModalStory.quote}"
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">The Full Story</h4>
                <p>{selectedModalStory.narrative}</p>
                {selectedModalStory.krioNarrative && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-500 block mb-1">Krio Translation:</span>
                    <p className="text-xs text-slate-700 italic">{selectedModalStory.krioNarrative}</p>
                  </div>
                )}
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Health Outcome & Caregiver Team
                </h4>
                <p className="text-xs text-emerald-800">
                  <strong>Outcome:</strong> {selectedModalStory.impactOutcome}
                </p>
                <p className="text-xs text-emerald-800">
                  <strong>Care Attendant:</strong> {selectedModalStory.attendedBy} (
                  {selectedModalStory.clinicOrLocation})
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedModalStory(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>

              {onSponsorStory && (
                <button
                  onClick={() => {
                    const story = selectedModalStory;
                    setSelectedModalStory(null);
                    onSponsorStory(story.programId, story.suggestedSponsorshipAmount);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Sponsor Safe Birth (${selectedModalStory.suggestedSponsorshipAmount})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

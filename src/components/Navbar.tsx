import React, { useState } from 'react';
import {
  Heart,
  PhoneCall,
  MapPin,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  Users,
  Package,
  Globe,
  BookOpen,
  Wifi,
  WifiOff,
  MessageSquareQuote,
} from 'lucide-react';
import { FREEDOM_TREE_INFO } from '../data/mockData';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDonate: () => void;
  onOpenHotlineModal: () => void;
  isKrio: boolean;
  setIsKrio: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDonate,
  onOpenHotlineModal,
  isKrio,
  setIsKrio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOnline, isSimulatedOffline, toggleSimulatedOffline } = useNetworkStatus();

  const navItems = [
    { id: 'overview', label: isKrio ? 'Awena (Overview)' : 'Overview', icon: Heart },
    { id: 'programs', label: isKrio ? 'Mama Program Dèm' : 'Programs', icon: ShieldCheck },
    { id: 'mamakit', label: isKrio ? 'Klin Mama Kit' : 'Mama Kits', icon: Package },
    { id: 'stories', label: isKrio ? 'Stori Dèm' : 'Success Stories', icon: MessageSquareQuote, badge: 'New' },
    { id: 'health-edu', label: isKrio ? 'Elt Tok & Buku Dèm' : 'Health Education', icon: BookOpen, badge: 'Guides' },
    { id: 'clinics', label: isKrio ? 'Bo Klinik Dèm' : 'Bo Clinics & Map', icon: MapPin },
    { id: 'ai-triage', label: isKrio ? 'AI Midwife Dokta' : 'AI Health Advisor', icon: Sparkles, badge: 'AI' },
    { id: 'registry', label: isKrio ? 'Bili Wata Rista' : 'Field Registry', icon: Users },
    { id: 'contact', label: isKrio ? 'Kontak Wi' : 'Contact & Partners', icon: Globe },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Urgent Maternal Dispatch Notification Bar & Network Status */}
      <div className="bg-slate-900 text-slate-100 text-xs px-4 py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-900/90 text-emerald-200 border border-emerald-500/30 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
              24/7 Maternal Emergency Dispatch
            </span>
            <span className="hidden sm:inline text-slate-300">
              Bo District & Taiama Highway:
            </span>
            <button
              onClick={onOpenHotlineModal}
              className="font-bold tracking-wide text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              {FREEDOM_TREE_INFO.phone}
            </button>
          </div>

          <div className="flex items-center gap-2.5 text-slate-300">
            {/* Global Network Status Pill */}
            <button
              onClick={() => {
                setActiveTab('ai-triage');
                const element = document.getElementById('ai-triage-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              title={
                isOnline
                  ? 'Network Status: Connected to Google AI Cloud'
                  : 'Network Status: Offline Mode (Cached protocols active). Tap to view offline guidance.'
              }
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                isOnline
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60 hover:bg-emerald-900'
                  : 'bg-amber-950/90 text-amber-300 border-amber-500/80 hover:bg-amber-900 animate-pulse'
              }`}
            >
              {isOnline ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-amber-400" />}
              <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
            </button>

            <span className="hidden md:flex items-center gap-1 text-[11px] text-slate-400">
              <MapPin className="w-3 h-3 text-amber-400" />
              11 Bundu St, Bo
            </span>
            <div className="h-3 w-px bg-slate-700 hidden md:block"></div>
            <button
              onClick={() => setIsKrio(!isKrio)}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1 font-medium"
              title="Toggle Sierra Leone Krio Language Mode"
            >
              🌐 {isKrio ? 'English View' : 'Krio (Salone)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => {
              setActiveTab('overview');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-emerald-900 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden relative">
                {/* Stylized Freedom Tree Leaf Graphic */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 to-emerald-500/20"></div>
                <div className="relative text-center">
                  <div className="text-amber-400 font-extrabold text-lg leading-none tracking-tighter">FT</div>
                  <div className="text-[8px] font-bold text-emerald-300 tracking-widest uppercase">SL</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  FREEDOM <span className="text-amber-600">TREE</span>
                </span>
                <span className="text-xs font-extrabold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  SIERRA LEONE
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 line-clamp-1 max-w-xs sm:max-w-md">
                Reducing Maternal & Infant Mortality in Sierra Leone
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'overview' && activeTab === 'home');
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                        isActive ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenHotlineModal}
              className="px-3.5 py-2.5 rounded-lg text-xs font-bold border border-rose-200 text-rose-800 bg-rose-50 hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
              <span>Bo Hotline</span>
            </button>

            <button
              onClick={onOpenDonate}
              className="px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer transform active:scale-98"
            >
              <Heart className="w-3.5 h-3.5 text-amber-100 fill-amber-100" />
              <span>{isKrio ? 'Sponsor Klin Bili ($15)' : 'Sponsor a Safe Birth'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenDonate}
              className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-amber-600 flex items-center gap-1"
            >
              <Heart className="w-3 h-3 fill-white" />
              <span>Sponsor</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-slate-50 px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'overview' && activeTab === 'home');
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'bg-emerald-900 text-white font-bold' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-amber-400 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenHotlineModal();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-lg text-xs font-bold text-center border border-rose-200 text-rose-800 bg-rose-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              Emergency Hotline
            </button>
            <button
              onClick={() => {
                onOpenDonate();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-lg text-xs font-bold text-center text-white bg-amber-600 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              Sponsor ($15+)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

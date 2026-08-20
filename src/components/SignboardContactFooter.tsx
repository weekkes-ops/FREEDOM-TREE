import React, { useState } from 'react';
import { FREEDOM_TREE_INFO } from '../data/mockData';
import {
  MapPin,
  PhoneCall,
  Mail,
  Globe,
  Share2,
  Heart,
  Send,
  CheckCircle2,
  Building,
  Shield,
  Clock,
  ExternalLink,
  Copy,
} from 'lucide-react';

interface SignboardContactFooterProps {
  onOpenDonate: () => void;
  onOpenHotlineModal: () => void;
  isKrio: boolean;
}

export const SignboardContactFooter: React.FC<SignboardContactFooterProps> = ({
  onOpenDonate,
  onOpenHotlineModal,
  isKrio,
}) => {
  const [copied, setCopied] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('Volunteer / Partnership');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyDetails = () => {
    const text = `FREEDOM TREE SIERRA LEONE\nMission: ${FREEDOM_TREE_INFO.tagline}\nAddress: ${FREEDOM_TREE_INFO.headquarters}\nContact: ${FREEDOM_TREE_INFO.phone}\nEmail: ${FREEDOM_TREE_INFO.email}\nWebsite: ${FREEDOM_TREE_INFO.website}\nLead Partner: ${FREEDOM_TREE_INFO.leadPartner}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) return;
    setSubmitted(true);
  };

  return (
    <footer className="bg-slate-950 text-slate-200 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Signboard Tribute Banner */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden ring-1 ring-white/5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Bo District Operations Headquarters
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                FREEDOM <span className="text-amber-500">TREE</span> SIERRA LEONE
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wide max-w-2xl leading-relaxed">
                WORKING WITHIN COMMUNITIES TO REDUCE MATERNAL AND INFANT MORTALITY IN SIERRA LEONE
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyDetails}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Facility Details'}</span>
              </button>

              <button
                onClick={onOpenDonate}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Sponsor Safe Deliveries</span>
              </button>
            </div>
          </div>

          {/* Signboard Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {/* Address */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                <MapPin className="w-4 h-4" /> Physical Facility Address
              </div>
              <div className="text-sm font-black text-white leading-snug">
                11 Bundu Street Off Bo Taiama Highway
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bo, Southern Province, Sierra Leone (24/7 Emergency Maternity Unit)
              </p>
            </div>

            {/* Contact Number & Hotline */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                <PhoneCall className="w-4 h-4" /> Official Contact Number
              </div>
              <div>
                <a
                  href={`tel:${FREEDOM_TREE_INFO.phone}`}
                  className="text-lg font-black text-amber-300 hover:underline block"
                >
                  {FREEDOM_TREE_INFO.phone}
                </a>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct field line for clinic appointments, CHW dispatch, and ambulance transfers.
              </p>
            </div>

            {/* Digital Channels & Lead Partner */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase">
                <Building className="w-4 h-4 text-amber-400" /> Digital & Lead Partner
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>
                  <span className="text-slate-500">Email: </span>
                  <a href={`mailto:${FREEDOM_TREE_INFO.email}`} className="text-emerald-400 hover:underline font-bold">
                    {FREEDOM_TREE_INFO.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500">Website: </span>
                  <a
                    href="https://www.freedomtree.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:underline font-bold"
                  >
                    {FREEDOM_TREE_INFO.website}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500">Lead Partner: </span>
                  <strong className="text-white">{FREEDOM_TREE_INFO.leadPartner}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form & Partnership Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Organization Story & Mission */}
          <div className="lg:col-span-6 space-y-4 text-sm text-slate-300">
            <h3 className="text-xl font-bold text-white tracking-tight">
              About Freedom Tree Sierra Leone & Our Community Impact
            </h3>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-400">
              Freedom Tree Sierra Leone was established to address the critical humanitarian challenge of
              maternal and neonatal mortality. Operating in close alliance with{' '}
              <strong className="text-slate-200">New Harvest Global Ministries</strong> and supported by{' '}
              <strong className="text-slate-200">Freedom Tree Canada</strong>, we work directly in village communities
              across the Bo-Taiama highway corridor.
            </p>
            <p className="leading-relaxed text-xs sm:text-sm text-slate-400">
              Through sterile Mama Delivery Kits, Traditional Birth Attendant training, mobile ultrasound scans,
              and 24/7 maternal ambulance dispatch, we have supported over 28,000 safe births with a 99.8% maternal
              survival rate.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
                ✓ Non-Profit Humanitarian Initiative
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400">
                ✓ Bo District Health Management Team Collaborator
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact / Inquiry Form */}
          <div className="lg:col-span-6 bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Received</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out to Freedom Tree Sierra Leone. Our field coordinator at 11 Bundu
                  Street will respond to {contactEmail || 'your email'} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Get in Touch / Partner with Freedom Tree
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Dr. John Mansaray"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. j.mansaray@gmail.com"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Inquiry Purpose</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden font-medium"
                  >
                    <option value="Volunteer / Partnership">Volunteer / Ministry Partnership</option>
                    <option value="Mama Kit Bulk Supply">Mama Kit Distribution Request</option>
                    <option value="Clinical Training Collaboration">CHW / Midwifery Training Collaboration</option>
                    <option value="General Inquiry">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Message *</label>
                  <textarea
                    required
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write your message to the Freedom Tree team in Bo..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-500 outline-hidden"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Bo Headquarters</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Attribution Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Freedom Tree Sierra Leone. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Bo District, Sierra Leone</span>
            <span>•</span>
            <span>www.freedomtree.ca</span>
            <span>•</span>
            <span>Lead Partner: New Harvest Global Ministries</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

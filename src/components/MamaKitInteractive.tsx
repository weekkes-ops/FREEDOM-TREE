import React, { useState } from 'react';
import { MAMA_KIT_COMPONENTS } from '../data/mockData';
import { MamaKitComponent } from '../types';
import {
  Scissors,
  Link,
  Sparkles,
  Shield,
  Hand,
  Layers,
  Sun,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Package,
  Info,
  ArrowRight,
} from 'lucide-react';

interface MamaKitInteractiveProps {
  onSponsorKit: (quantity: number) => void;
  isKrio: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Scissors,
  Link,
  Sparkles,
  Shield,
  Hand,
  Layers,
  Sun,
};

export const MamaKitInteractive: React.FC<MamaKitInteractiveProps> = ({
  onSponsorKit,
  isKrio,
}) => {
  const [selectedItem, setSelectedItem] = useState<MamaKitComponent>(MAMA_KIT_COMPONENTS[0]);
  const [activeStep, setActiveStep] = useState(1);
  const [kitQuantity, setKitQuantity] = useState(2);

  const cleanBirthSteps = [
    {
      step: 1,
      title: 'Clean Hands & Sterile Gloves',
      krioTitle: 'Wash Yu An Klin Wit Medisin Sop',
      desc: 'Midwife or attendant scrubs hands with chlorhexidine soap and clean water for 60 seconds, then dons sterile gloves.',
    },
    {
      step: 2,
      title: 'Clean Delivery Surface',
      krioTitle: 'Spread di Klin Padi Plastic',
      desc: 'Unfold the clean plastic sheet over the birthing surface to prevent soil and fecal pathogen contact.',
    },
    {
      step: 3,
      title: 'Clean Umbilical Cord Clamping',
      krioTitle: 'Tay di Kord Tight Tight',
      desc: 'Wait 1-3 minutes for delayed cord clamping, then firmly apply two sterile cord ties.',
    },
    {
      step: 4,
      title: 'Clean Cord Cutting',
      krioTitle: 'Kot di Kord wit Sterile Rezar',
      desc: 'Cut between ties using the sterile sealed razor. Apply no harmful cow dung or ashes—keep stump clean and dry.',
    },
    {
      step: 5,
      title: 'Immediate Thermal Care (Kangaroo Wrap)',
      krioTitle: 'Kip Baby Warm na Mami Ches',
      desc: 'Dry infant thoroughly with sterile gauze, place directly skin-to-skin on mother chest, and wrap with warm baby swaddle.',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200/80 shadow-2xs">
            <Package className="w-3.5 h-3.5 text-amber-700" />
            {isKrio ? 'Klin Delivery Mama Kit' : 'Life-Saving Clean Delivery Kits'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {isKrio ? 'Wetin De Insay di Freedom Tree Mama Kit?' : 'Inside the Freedom Tree Clean Delivery Kit'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            In rural Bo District villages without running water or electricity, a sterile delivery kit
            is the difference between life and death. Each item costs just pennies to source, but stops the 3
            biggest killers: tetanus, sepsis, and hypothermia.
          </p>
        </div>

        {/* Interactive Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Items Selector List */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Kit Items (Select to Inspect)
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                7 Sterile Components
              </span>
            </div>

            {MAMA_KIT_COMPONENTS.map((item) => {
              const Icon = iconMap[item.icon] || Package;
              const isSelected = selectedItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-emerald-900 text-amber-300' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.localName && (
                          <span className="text-[10px] font-normal text-slate-500 italic">
                            ({item.localName})
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{item.purpose}</div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                      item.importance === 'critical'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : item.importance === 'essential'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {item.importance}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Inspection Deep-Dive Card */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs relative">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Detailed Component Analysis
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  {selectedItem.name}
                  {selectedItem.localName && (
                    <span className="text-sm font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {selectedItem.localName}
                    </span>
                  )}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400">Clinical Classification</span>
                <div className="text-xs font-bold uppercase text-slate-800 bg-white px-2 py-1 rounded border border-slate-200">
                  WHO Safe Motherhood Standard
                </div>
              </div>
            </div>

            {/* Key Clinical Insights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-rose-200/90 p-4 rounded-xl shadow-2xs">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase mb-1">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  What Fatal Condition It Prevents:
                </div>
                <p className="text-sm font-bold text-rose-950">{selectedItem.prevents}</p>
              </div>

              <div className="bg-white border border-emerald-200/90 p-4 rounded-xl shadow-2xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Clinical Purpose:
                </div>
                <p className="text-sm font-bold text-emerald-950">{selectedItem.purpose}</p>
              </div>
            </div>

            {/* Instructions box */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl mb-6 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase">
                <Info className="w-4 h-4 text-amber-600" />
                Field Midwife & CHW Instructions:
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono">
                {selectedItem.instructions}
              </p>
            </div>

            {/* Fast Kit Sponsorship Box */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div>
                <div className="text-xs font-bold uppercase text-amber-900">
                  Provide Clean Delivery Kits to Bo Villages
                </div>
                <p className="text-xs text-amber-900 mt-0.5">
                  <strong>$15</strong> supplies 1 full sterile Mama Kit to an expectant mother.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={kitQuantity}
                  onChange={(e) => setKitQuantity(Number(e.target.value))}
                  className="bg-white border border-amber-300 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-2 shadow-2xs"
                >
                  <option value={1}>1 Kit ($15)</option>
                  <option value={2}>2 Kits ($30)</option>
                  <option value={5}>5 Kits ($75)</option>
                  <option value={10}>10 Kits ($150)</option>
                </select>

                <button
                  onClick={() => onSponsorKit(kitQuantity)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:shadow whitespace-nowrap"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  Sponsor ${kitQuantity * 15}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* The 5 WHO Clean Delivery Steps Checklist */}
        <div className="mt-14 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Community Health Protocol
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
              The 5 Clean Delivery Steps Taught by Freedom Tree Sierra Leone
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In partnership with New Harvest Global Ministries, we train Traditional Birth Attendants
              to strictly follow these five non-negotiable sterile practices during home and health post deliveries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {cleanBirthSteps.map((st) => (
              <div
                key={st.step}
                onClick={() => setActiveStep(st.step)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeStep === st.step
                    ? 'bg-slate-900 text-white border-slate-800 shadow-md'
                    : 'bg-white hover:bg-slate-100/80 text-slate-800 border-slate-200'
                }`}
              >
                <div>
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center mb-2.5 ${
                      activeStep === st.step
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {st.step}
                  </div>
                  <h4 className="text-xs font-bold tracking-tight mb-1">{st.title}</h4>
                  {isKrio && (
                    <div
                      className={`text-[10px] font-medium italic mb-2 ${
                        activeStep === st.step ? 'text-amber-300' : 'text-emerald-800'
                      }`}
                    >
                      "{st.krioTitle}"
                    </div>
                  )}
                  <p
                    className={`text-[11px] leading-relaxed font-normal ${
                      activeStep === st.step ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

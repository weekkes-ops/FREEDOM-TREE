import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MaternalProgramsSection } from './components/MaternalProgramsSection';
import { MamaKitInteractive } from './components/MamaKitInteractive';
import { CommunitySuccessStories } from './components/CommunitySuccessStories';
import { HealthEducationSection } from './components/HealthEducationSection';
import { BoClinicsMap } from './components/BoClinicsMap';
import { AIAssistantSection } from './components/AIAssistantSection';
import { PatientRegistrySection } from './components/PatientRegistrySection';
import { SponsorDonateSection } from './components/SponsorDonateSection';
import { SignboardContactFooter } from './components/SignboardContactFooter';
import { EmergencyHotlineModal } from './components/EmergencyHotlineModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isKrio, setIsKrio] = useState<boolean>(false);
  const [isHotlineOpen, setIsHotlineOpen] = useState<boolean>(false);
  const [donateInitialAmount, setDonateInitialAmount] = useState<number>(35);
  const [selectedProgramId, setSelectedProgramId] = useState<string | undefined>(undefined);

  const handleOpenDonate = (amount: number = 35, programId?: string) => {
    setDonateInitialAmount(amount);
    setSelectedProgramId(programId);
    setActiveTab('donate');
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSponsorProgram = (programId: string, cost: number) => {
    handleOpenDonate(cost, programId);
  };

  const handleSponsorKit = (quantity: number) => {
    handleOpenDonate(quantity * 15, 'clean-delivery-kits');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation with Global Network Status and Krio Switch */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isKrio={isKrio}
        setIsKrio={setIsKrio}
        onOpenHotlineModal={() => setIsHotlineOpen(true)}
        onOpenDonate={() => handleOpenDonate(35)}
      />

      {/* Main Content Areas based on Tab or Comprehensive Home View */}
      <main className="flex-1">
        {(activeTab === 'home' || activeTab === 'overview') && (
          <>
            <HeroSection
              setActiveTab={setActiveTab}
              onOpenDonate={() => handleOpenDonate(35)}
              onOpenHotlineModal={() => setIsHotlineOpen(true)}
              isKrio={isKrio}
            />

            <MaternalProgramsSection
              onSponsorProgram={handleSponsorProgram}
              setActiveTab={setActiveTab}
              isKrio={isKrio}
            />

            <MamaKitInteractive
              onSponsorKit={handleSponsorKit}
              isKrio={isKrio}
            />

            <CommunitySuccessStories
              isKrio={isKrio}
              onSponsorStory={(programId, amount) => handleOpenDonate(amount, programId)}
            />

            <HealthEducationSection
              isKrio={isKrio}
              onOpenHotlineModal={() => setIsHotlineOpen(true)}
            />

            <BoClinicsMap
              onOpenHotlineModal={() => setIsHotlineOpen(true)}
              isKrio={isKrio}
            />

            <AIAssistantSection
              onOpenHotlineModal={() => setIsHotlineOpen(true)}
              isKrio={isKrio}
            />

            <PatientRegistrySection
              isKrio={isKrio}
            />

            <SponsorDonateSection
              initialAmount={donateInitialAmount}
              initialProgramId={selectedProgramId}
              isKrio={isKrio}
            />
          </>
        )}

        {activeTab === 'programs' && (
          <div className="py-2">
            <MaternalProgramsSection
              onSponsorProgram={handleSponsorProgram}
              setActiveTab={setActiveTab}
              isKrio={isKrio}
            />
          </div>
        )}

        {activeTab === 'mamakit' && (
          <div className="py-2">
            <MamaKitInteractive
              onSponsorKit={handleSponsorKit}
              isKrio={isKrio}
            />
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="py-2">
            <CommunitySuccessStories
              isKrio={isKrio}
              onSponsorStory={(programId, amount) => handleOpenDonate(amount, programId)}
            />
          </div>
        )}

        {activeTab === 'health-edu' && (
          <div className="py-2">
            <HealthEducationSection
              isKrio={isKrio}
              onOpenHotlineModal={() => setIsHotlineOpen(true)}
            />
          </div>
        )}

        {activeTab === 'clinics' && (
          <div className="py-2">
            <BoClinicsMap
              onOpenHotlineModal={() => setIsHotlineOpen(true)}
              isKrio={isKrio}
            />
          </div>
        )}

        {activeTab === 'ai-triage' && (
          <div className="py-2">
            <AIAssistantSection
              onOpenHotlineModal={() => setIsHotlineOpen(true)}
              isKrio={isKrio}
            />
          </div>
        )}

        {activeTab === 'registry' && (
          <div className="py-2">
            <PatientRegistrySection
              isKrio={isKrio}
            />
          </div>
        )}

        {activeTab === 'donate' && (
          <div className="py-2">
            <SponsorDonateSection
              initialAmount={donateInitialAmount}
              initialProgramId={selectedProgramId}
              isKrio={isKrio}
            />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="py-2">
            <BoClinicsMap
              onOpenHotlineModal={() => setIsHotlineOpen(true)}
              isKrio={isKrio}
            />
          </div>
        )}
      </main>

      {/* Official Signboard Attribution & Contact Footer */}
      <SignboardContactFooter
        onOpenHotlineModal={() => setIsHotlineOpen(true)}
        onOpenDonate={() => handleOpenDonate(35)}
        isKrio={isKrio}
      />

      {/* 24/7 Maternal Emergency Hotline Modal */}
      <EmergencyHotlineModal
        isOpen={isHotlineOpen}
        onClose={() => setIsHotlineOpen(false)}
        isKrio={isKrio}
      />
    </div>
  );
}

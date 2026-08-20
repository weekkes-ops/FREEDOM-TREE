export interface MaternalProgram {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  stat: string;
  statLabel: string;
  highlights: string[];
  costPerBeneficiary: number;
}

export interface MamaKitComponent {
  id: string;
  name: string;
  localName?: string;
  purpose: string;
  prevents: string;
  icon: string;
  importance: 'critical' | 'essential' | 'supportive';
  instructions: string;
}

export interface ClinicLocation {
  id: string;
  name: string;
  type: 'Headquarters & Birthing Center' | 'Mobile Ultrasound Outreach' | 'Community Health Post' | 'Emergency Referral Partner';
  chiefdom: string;
  district: string;
  address: string;
  coordinates: { x: number; y: number }; // percentage on stylized district map
  phone: string;
  midwifeInCharge: string;
  monthlyDeliveries: number;
  solarPowered: boolean;
  ultrasoundAvailable: boolean;
  ambulanceOnStandby: boolean;
  operatingHours: string;
  status: 'Operational' | 'Active Mobile Team' | 'High Volume';
}

export interface PatientRecord {
  id: string;
  fullName: string;
  age: number;
  chiefdom: string;
  village: string;
  gestationalWeeks: number;
  estimatedDueDate: string;
  gravidaPara: string; // e.g. "G2 P1"
  riskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  riskFactors: string[];
  mamaKitIssued: boolean;
  mamaKitId?: string;
  ultrasoundDone: boolean;
  assignedClinic: string;
  chwAssigned: string;
  status: 'Active Antenatal' | 'Due This Week' | 'Safely Delivered' | 'Referred to Bo Center';
  deliveryDate?: string;
  babyGender?: 'Girl' | 'Boy' | 'Twins';
  birthWeightKg?: number;
}

export interface DonationPledge {
  id: string;
  donorName: string;
  donorEmail: string;
  donorCountry: string;
  amountUsd: number;
  tierId: string;
  tierName: string;
  impactDescription: string;
  paymentMethod: 'card' | 'orange_money_sl' | 'africell_money' | 'paypal';
  date: string;
  message?: string;
  isAnonymous?: boolean;
}

export interface EmergencyHotlineCall {
  id: string;
  timestamp: string;
  callerRole: 'Community Health Worker' | 'Family Member' | 'Midwife' | 'Traditional Birth Attendant';
  village: string;
  urgency: 'Immediate Ambulance Required' | 'Urgent Clinical Advice' | 'Standard Referral';
  presentingSymptoms: string;
  actionTaken: string;
  status: 'Dispatched' | 'Stabilized' | 'Admitted at Bo Center';
}

export interface HealthEducationGuide {
  id: string;
  title: string;
  krioTitle?: string;
  category: 'maternal-nutrition' | 'infant-care' | 'antenatal-wellness' | 'postpartum-recovery';
  targetAudience: 'Expectant Mothers' | 'Community Midwives & CHWs' | 'New Parents & Families' | 'TBA Referral Champions';
  readTimeMinutes: number;
  summary: string;
  krioSummary?: string;
  keyPoints: string[];
  localSierraLeoneFocus: string;
  fullContentMarkdown: string;
  iconName: string;
  downloadsCount: number;
  featured?: boolean;
}

export interface CommunitySuccessStory {
  id: string;
  motherName: string;
  motherAge: number;
  babyName?: string;
  babyGender?: 'Girl' | 'Boy' | 'Twins';
  village: string;
  chiefdom: string;
  district: string;
  programUsed: string;
  programId: string;
  quote: string;
  krioQuote: string;
  narrative: string;
  krioNarrative: string;
  impactOutcome: string;
  attendedBy: string;
  clinicOrLocation: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  suggestedSponsorshipAmount: number;
}

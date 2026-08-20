import {
  MaternalProgram,
  MamaKitComponent,
  ClinicLocation,
  PatientRecord,
  DonationPledge,
  EmergencyHotlineCall,
  HealthEducationGuide,
  CommunitySuccessStory,
} from '../types';

export const FREEDOM_TREE_INFO = {
  name: 'Freedom Tree Sierra Leone',
  tagline: 'Working within communities to reduce maternal and infant mortality in Sierra Leone',
  headquarters: '11 Bundu Street Off Bo Taiama Highway, Bo, Southern Province, Sierra Leone',
  phone: '+232 76 522 072',
  email: 'info@freedomtree.ca',
  website: 'www.freedomtree.ca',
  facebook: 'Freedom Tree',
  leadPartner: 'New Harvest Global Ministries',
  canadianAffiliate: 'Freedom Tree Canada',
  establishedYear: '2012',
  keyStats: {
    safeDeliveriesToDate: 28450,
    mamaKitsDistributed: 42100,
    activeMidwivesTrained: 185,
    mobileClinicsConducted: 640,
    maternalSurvivalRate: '99.8%',
    activeClinics: 6,
    districtsCovered: ['Bo', 'Moyamba (Taiama)', 'Kenema Border', 'Pujehun Reach'],
  },
};

export const MATERNAL_PROGRAMS: MaternalProgram[] = [
  {
    id: 'clean-delivery-kits',
    title: 'Clean Delivery "Mama" Kits',
    tagline: 'Sterile, life-saving birth packages distributed directly to pregnant mothers',
    description: 'Neonatal tetanus and postpartum sepsis remain leading preventable causes of death. Each sterile Freedom Tree Mama Kit provides essential antiseptic components for a hygienic birth anywhere in Bo District.',
    iconName: 'PackageCheck',
    stat: '42,000+',
    statLabel: 'Kits Delivered',
    highlights: [
      'Surgical sterile razor blade & sterile cord ties to prevent neonatal tetanus',
      'Chlorhexidine antiseptic soap & sterile latex delivery gloves',
      'Heavy-duty clean plastic underlay sheet for dirt floor protection',
      'Sterile gauze swabs & soft cotton swaddle cloth to prevent neonatal hypothermia',
    ],
    costPerBeneficiary: 15,
  },
  {
    id: 'mobile-ultrasound',
    title: 'Mobile Ultrasound & High-Risk Antenatal Care',
    tagline: 'Taking diagnostic imaging and trained midwives to hard-to-reach chiefdoms',
    description: 'Many pregnant women in remote villages off the Bo-Taiama highway cannot afford transport to hospital. Our 4WD Mobile Ultrasound unit visits rural communities to detect placenta previa, breech presentation, twins, and pre-eclampsia before labor begins.',
    iconName: 'Activity',
    stat: '9,800+',
    statLabel: 'Ultrasounds Performed',
    highlights: [
      'Portable battery-powered ultrasound diagnostics in off-grid villages',
      'Early detection of ectopic pregnancy, obstructed pelvis, and fetal distress',
      'Routine blood pressure, hemoglobin, and malaria rapid testing',
      'Pre-scheduled transfer planning for high-risk expectant mothers',
    ],
    costPerBeneficiary: 25,
  },
  {
    id: 'chw-midwife-training',
    title: 'Community Health Worker & TBA Upskilling',
    tagline: 'Partnering with New Harvest Global Ministries to empower local frontline birth attendants',
    description: 'Rather than displacing traditional community birth attendants, Freedom Tree trains them as vital referral champions, equipping them with modern clean delivery protocols, active management of third stage labor, and neonatal resuscitation skills.',
    iconName: 'GraduationCap',
    stat: '185+',
    statLabel: 'Attendants Certified',
    highlights: [
      'Comprehensive WHO-aligned safe motherhood curriculum',
      'Hands-on training with neonatal resuscitation mannequins (Helping Babies Breathe)',
      'Community maternal danger sign recognition & rapid triage',
      'Direct mobile phone dispatch integration with Bo Center ambulance',
    ],
    costPerBeneficiary: 120,
  },
  {
    id: 'emergency-transport',
    title: '24/7 Obstetric Emergency Transport',
    tagline: 'Eliminating the second delay in maternal care—transport to specialized care',
    description: 'When complications like postpartum hemorrhage or eclampsia occur in rural villages, every minute counts. Our dedicated 4WD maternal ambulance service provides free emergency transfer to the Bo Center or Bo Government Hospital.',
    iconName: 'Ambulance',
    stat: '1,420+',
    statLabel: 'Emergency Dispatches',
    highlights: [
      'Dedicated 24/7 emergency dispatch line: +232 76 522 072',
      'Rugged terrain 4x4 vehicles outfitted with oxygen, IV fluids, and transport incubator',
      'Solar-powered emergency radio network connecting remote health posts',
      'Zero cost to the family for emergency transfers',
    ],
    costPerBeneficiary: 50,
  },
];

export const MAMA_KIT_COMPONENTS: MamaKitComponent[] = [
  {
    id: 'kit-1',
    name: 'Surgical Sterile Razor Blade',
    localName: 'Klin Rezar Bled',
    purpose: 'Sterile cutting of the umbilical cord immediately following delivery',
    prevents: 'Neonatal Tetanus (Clostridium tetani infection)',
    icon: 'Scissors',
    importance: 'critical',
    instructions: 'Open blister pack only at the exact moment of cord clamping. Never reuse or lay on unsterilized surfaces.',
  },
  {
    id: 'kit-2',
    name: 'Sterile Umbilical Cord Clamps & Ties',
    localName: 'Kord Tay',
    purpose: 'Secure, tight double ligation of the umbilical stump',
    prevents: 'Fatal neonatal umbilical hemorrhage & bacterial cord infection',
    icon: 'Link',
    importance: 'critical',
    instructions: 'Tie firmly 2 finger-widths from baby abdomen and second tie 1 finger-width further before cutting in between.',
  },
  {
    id: 'kit-3',
    name: 'Chlorhexidine Antiseptic Soap & Wipe',
    localName: 'Medisin Sop',
    purpose: 'Thorough hand cleansing for birth attendant and maternal perineal cleansing',
    prevents: 'Puerperal sepsis and maternal systemic bloodstream infection',
    icon: 'Sparkles',
    importance: 'essential',
    instructions: 'Scrub hands with clean water for full 60 seconds up to elbows before touching delivery equipment.',
  },
  {
    id: 'kit-4',
    name: 'Heavy-Duty Clean Plastic Underlay (1m x 2m)',
    localName: 'Klin Lapa / Padi',
    purpose: 'Provides a clean, impermeable barrier over mud or dirt birthing surfaces',
    prevents: 'Environmental contamination from soil-borne pathogens',
    icon: 'Shield',
    importance: 'essential',
    instructions: 'Lay flat clean side up underneath mother prior to active stage two delivery.',
  },
  {
    id: 'kit-5',
    name: 'Sterile Surgical Gloves (Pair)',
    localName: 'Glovs',
    purpose: 'Barrier protection for the midwife and newborn infant',
    prevents: 'Cross-infection and pathogen transmission during birth',
    icon: 'Hand',
    importance: 'critical',
    instructions: 'Don sterile gloves after handwashing without touching outer surface.',
  },
  {
    id: 'kit-6',
    name: 'Sterile Gauze Swabs (Pack of 5)',
    localName: 'Goz Swab',
    purpose: 'Clearing newborn mouth and airway, and perineal inspection',
    prevents: 'Neonatal meconium aspiration and infection',
    icon: 'Layers',
    importance: 'supportive',
    instructions: 'Gently wipe baby face, eyes, and mouth right after crowning.',
  },
  {
    id: 'kit-7',
    name: 'Warm Cotton Newborn Swaddle & Hat',
    localName: 'Klos fo Baby',
    purpose: 'Immediate thermal protection and skin-to-skin kangaroo positioning',
    prevents: 'Neonatal hypothermia, which causes rapid hypoglycemia and distress',
    icon: 'Sun',
    importance: 'critical',
    instructions: 'Dry baby thoroughly within 30 seconds of birth, place skin-to-skin on mother chest, and wrap with warm cloth.',
  },
];

export const CLINIC_LOCATIONS: ClinicLocation[] = [
  {
    id: 'bo-hq-center',
    name: 'Freedom Tree Bo Maternal Center (HQ)',
    type: 'Headquarters & Birthing Center',
    chiefdom: 'Kakua Chiefdom',
    district: 'Bo District',
    address: '11 Bundu Street Off Bo Taiama Highway, Bo, Sierra Leone',
    coordinates: { x: 50, y: 52 },
    phone: '+232 76 522 072',
    midwifeInCharge: 'Sister Aminata Koroma (Senior Midwife)',
    monthlyDeliveries: 180,
    solarPowered: true,
    ultrasoundAvailable: true,
    ambulanceOnStandby: true,
    operatingHours: '24 Hours / 7 Days (Emergency Obstetric Care)',
    status: 'Operational',
  },
  {
    id: 'taiama-outreach',
    name: 'Taiama Maternal Health Post',
    type: 'Community Health Post',
    chiefdom: 'Kori Chiefdom',
    district: 'Moyamba / Bo Corridor',
    address: 'Taiama Junction, Bo-Taiama Highway',
    coordinates: { x: 26, y: 38 },
    phone: '+232 76 522 072 ext 102',
    midwifeInCharge: 'Nurse Fatu Sesay',
    monthlyDeliveries: 75,
    solarPowered: true,
    ultrasoundAvailable: true,
    ambulanceOnStandby: false,
    operatingHours: 'Monday - Saturday: 7:30 AM - 8:00 PM (Emergency on-call)',
    status: 'Operational',
  },
  {
    id: 'tikonko-hub',
    name: 'Tikonko Safe Motherhood Center',
    type: 'Community Health Post',
    chiefdom: 'Tikonko Chiefdom',
    district: 'Bo District',
    address: 'Tikonko Main Road, 12km South of Bo',
    coordinates: { x: 58, y: 72 },
    phone: '+232 76 522 072 ext 104',
    midwifeInCharge: 'Midwife Mary Kamara',
    monthlyDeliveries: 92,
    solarPowered: true,
    ultrasoundAvailable: false,
    ambulanceOnStandby: false,
    operatingHours: '24/7 Delivery Ward & Antenatal Clinics',
    status: 'Operational',
  },
  {
    id: 'gerihun-mobile-unit',
    name: 'Gerihun & Baoma Mobile Outreach Team',
    type: 'Mobile Ultrasound Outreach',
    chiefdom: 'Baoma & Bagbo Chiefdoms',
    district: 'Bo Rural',
    address: 'Field Base: 11 Bundu St (Dispatches to 18 villages weekly)',
    coordinates: { x: 74, y: 44 },
    phone: '+232 76 522 072',
    midwifeInCharge: 'Dr. Joseph Mansaray & Outreach Midwife Team',
    monthlyDeliveries: 110,
    solarPowered: true,
    ultrasoundAvailable: true,
    ambulanceOnStandby: true,
    operatingHours: 'Weekly Village Circuit Schedule (6:00 AM - 6:00 PM)',
    status: 'Active Mobile Team',
  },
  {
    id: 'new-harvest-clinic',
    name: 'New Harvest Global Health Mission Post',
    type: 'Emergency Referral Partner',
    chiefdom: 'Kakua West',
    district: 'Bo District',
    address: 'New Harvest Ministry Complex, Bo',
    coordinates: { x: 44, y: 58 },
    phone: '+232 76 522 072',
    midwifeInCharge: 'Pastor / Health Coordinator Ibrahim Bangura',
    monthlyDeliveries: 65,
    solarPowered: true,
    ultrasoundAvailable: true,
    ambulanceOnStandby: true,
    operatingHours: '24/7 Urgent Care & Maternal Support',
    status: 'Operational',
  },
];

export const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: 'FT-SL-2026-089',
    fullName: 'Fatmata Conteh',
    age: 23,
    chiefdom: 'Kakua',
    village: 'Bundu Community, Bo',
    gestationalWeeks: 38,
    estimatedDueDate: '2026-08-28',
    gravidaPara: 'G1 P0 (Primigravida)',
    riskLevel: 'Low Risk',
    riskFactors: ['First time mother', 'Nutritional monitoring'],
    mamaKitIssued: true,
    mamaKitId: 'MK-8841',
    ultrasoundDone: true,
    assignedClinic: 'Freedom Tree Bo Maternal Center (HQ)',
    chwAssigned: 'Kadiatu Bangura',
    status: 'Due This Week',
  },
  {
    id: 'FT-SL-2026-092',
    fullName: 'Mariama Turay',
    age: 31,
    chiefdom: 'Tikonko',
    village: 'Njala Tikonko',
    gestationalWeeks: 34,
    estimatedDueDate: '2026-09-22',
    gravidaPara: 'G4 P3',
    riskLevel: 'High Risk',
    riskFactors: ['Elevated blood pressure 145/95', 'Borderline anemia (Hb 9.2 g/dL)'],
    mamaKitIssued: true,
    mamaKitId: 'MK-8874',
    ultrasoundDone: true,
    assignedClinic: 'Freedom Tree Bo Maternal Center (HQ)',
    chwAssigned: 'Sister Aminata Koroma',
    status: 'Active Antenatal',
  },
  {
    id: 'FT-SL-2026-078',
    fullName: 'Zainab Jalloh',
    age: 19,
    chiefdom: 'Kori (Taiama)',
    village: 'Taiama Old Town',
    gestationalWeeks: 40,
    estimatedDueDate: '2026-08-16',
    gravidaPara: 'G1 P0',
    riskLevel: 'Low Risk',
    riskFactors: ['Young maternal age'],
    mamaKitIssued: true,
    mamaKitId: 'MK-8790',
    ultrasoundDone: true,
    assignedClinic: 'Taiama Maternal Health Post',
    chwAssigned: 'Nurse Fatu Sesay',
    status: 'Safely Delivered',
    deliveryDate: '2026-08-17',
    babyGender: 'Girl',
    birthWeightKg: 3.2,
  },
  {
    id: 'FT-SL-2026-104',
    fullName: 'Hawa Kamara',
    age: 27,
    chiefdom: 'Baoma',
    village: 'Gerihun Junction',
    gestationalWeeks: 36,
    estimatedDueDate: '2026-09-10',
    gravidaPara: 'G3 P2',
    riskLevel: 'Moderate Risk',
    riskFactors: ['Twin pregnancy confirmed by mobile ultrasound', 'Malaria prophylaxis completed'],
    mamaKitIssued: true,
    mamaKitId: 'MK-8912',
    ultrasoundDone: true,
    assignedClinic: 'Gerihun & Baoma Mobile Outreach Team',
    chwAssigned: 'Sahr Yamba',
    status: 'Active Antenatal',
  },
  {
    id: 'FT-SL-2026-110',
    fullName: 'Isata Sesay',
    age: 29,
    chiefdom: 'Kakua',
    village: 'Bo Taiama Highway Mile 4',
    gestationalWeeks: 39,
    estimatedDueDate: '2026-08-21',
    gravidaPara: 'G2 P1',
    riskLevel: 'Low Risk',
    riskFactors: ['Previous normal spontaneous vaginal delivery'],
    mamaKitIssued: true,
    mamaKitId: 'MK-8940',
    ultrasoundDone: true,
    assignedClinic: 'Freedom Tree Bo Maternal Center (HQ)',
    chwAssigned: 'Kadiatu Bangura',
    status: 'Due This Week',
  },
];

export const INITIAL_DONATION_PLEDGES: DonationPledge[] = [
  {
    id: 'pledge-101',
    donorName: 'David & Sarah MacLeod',
    donorEmail: 'd.macleod@gmail.com',
    donorCountry: 'Canada',
    amountUsd: 150,
    tierId: 'chw-training',
    tierName: 'Midwife & CHW Training Sponsor',
    impactDescription: 'Equipped 1 community birth attendant with complete resuscitation gear and 10 Mama Kits',
    paymentMethod: 'card',
    date: '2026-08-18',
    message: 'God bless the Freedom Tree team in Bo!',
  },
  {
    id: 'pledge-102',
    donorName: 'Dr. Michael Kargbo',
    donorEmail: 'm.kargbo@sl-health.org',
    donorCountry: 'Sierra Leone',
    amountUsd: 70,
    tierId: 'safe-delivery-double',
    tierName: '2 Safe Deliveries at Bo Center',
    impactDescription: 'Funded full midwife care and sterile supplies for 2 mothers',
    paymentMethod: 'orange_money_sl',
    date: '2026-08-17',
    message: 'Proud to support our local mothers in Southern Province.',
  },
  {
    id: 'pledge-103',
    donorName: 'Calgary Hope Fellowship',
    donorEmail: 'outreach@hopecalgary.ca',
    donorCountry: 'Canada',
    amountUsd: 350,
    tierId: 'emergency-transport',
    tierName: 'Obstetric Emergency Fuel & Ambulance Fund',
    impactDescription: 'Funded 7 emergency village transport transfers to Bo Center',
    paymentMethod: 'paypal',
    date: '2026-08-16',
    message: 'In partnership with New Harvest Global Ministries.',
  },
  {
    id: 'pledge-104',
    donorName: 'Anonymous Friend',
    donorEmail: 'donor@gmail.com',
    donorCountry: 'United Kingdom',
    amountUsd: 45,
    tierId: 'mama-kit-trio',
    tierName: '3 Sterile Mama Delivery Kits',
    impactDescription: 'Protected 3 mothers and newborns from tetanus and sepsis',
    paymentMethod: 'card',
    date: '2026-08-15',
    isAnonymous: true,
  },
];

export const RECENT_EMERGENCY_LOGS: EmergencyHotlineCall[] = [
  {
    id: 'EM-2026-302',
    timestamp: '2 hours ago',
    callerRole: 'Community Health Worker',
    village: 'Gondama Village, Tikonko',
    urgency: 'Immediate Ambulance Required',
    presentingSymptoms: 'Severe postpartum bleeding (>500ml) after home birth attempt, pale conjunctiva',
    actionTaken: '4WD Ambulance dispatched from Bo HQ with oxytocin and IV saline. Midwife Sister Koroma en route.',
    status: 'Admitted at Bo Center',
  },
  {
    id: 'EM-2026-301',
    timestamp: '6 hours ago',
    callerRole: 'Traditional Birth Attendant',
    village: 'Taiama Highway Mile 8',
    urgency: 'Urgent Clinical Advice',
    presentingSymptoms: 'Active labor for 10 hours, membranes ruptured with clear fluid, contractions strong',
    actionTaken: 'Advised transfer to Taiama Outreach Clinic. Mama Kit #MK-8890 unsealed under sterile protocol.',
    status: 'Stabilized',
  },
  {
    id: 'EM-2026-300',
    timestamp: 'Yesterday',
    callerRole: 'Family Member',
    village: 'Bundu Street Community, Bo',
    urgency: 'Standard Referral',
    presentingSymptoms: 'Pregnant mother with high fever (38.9°C) and shivering, 32 weeks pregnant',
    actionTaken: 'Walked in to 11 Bundu St clinic. Malaria RDT positive, started on standard artesunate protocol with fetal monitoring.',
    status: 'Stabilized',
  },
];

export const HEALTH_EDUCATION_GUIDES: HealthEducationGuide[] = [
  {
    id: 'guide-maternal-nutrition-anemia',
    title: 'Maternal Nutrition & Anemia Prevention with Local Sierra Leone Foods',
    krioTitle: 'Wetin Mama Fo It Fo Mek In Bodi Strong En No Gɛt Sik',
    category: 'maternal-nutrition',
    targetAudience: 'Expectant Mothers',
    readTimeMinutes: 4,
    summary: 'A complete practical dietary guide utilizing affordable, nutrient-dense Sierra Leonean foods to prevent severe maternal anemia, promote healthy fetal growth, and prepare the mother for safe delivery.',
    krioSummary: 'Dis buku de sho yu di fayn fayn it dèm na Bo we kin gi yu blɔd, mek yu bobi wata bɔku, en mek di bebi gro fayn fayn bifo bili taym.',
    keyPoints: [
      'Daily iron-rich food sources: Moringa (Kren-kren), dark cassava leaves, potato leaves, and crushed dried bonga fish.',
      'Groundnuts, benne (sesame seeds), and pigeon peas for vital maternal protein & healthy fetal brain development.',
      'Always pair plant iron with vitamin C (oranges, lime, mango, baobab fruit) to quadruple iron absorption in the gut.',
      'Avoid drinking strong tea or coffee immediately with meals, as tannins block iron uptake.',
      'Daily clinic supplements: Ferrous sulfate + Folic Acid tablets distributed free at Freedom Tree Bo Center.',
    ],
    localSierraLeoneFocus: 'Bo District Local Markets (Kakua, Taiama, Tikonko, Lugbu)',
    iconName: 'Apple',
    downloadsCount: 1420,
    featured: true,
    fullContentMarkdown: `### Overview: Why Nutrition is Vital for Safe Motherhood in Sierra Leone
Maternal anemia affects over 45% of pregnant women in rural Sierra Leone, dramatically increasing the risk of postpartum hemorrhage, low birth weight, and fatigue during labor. You do not need expensive imported foods; our local Bo markets provide powerful, highly nutritious ingredients.

---

### Key Nutrient Powerhouses in Sierra Leone

#### 1. Iron & Blood-Building Greens
* **Moringa Oleifera Leaves (*Moringa/Kren-Kren*):** Extremely high in bioavailable iron, calcium, and vitamin A. Dry and grind leaves into porridge or mix into daily sauces.
* **Potato Leaves & Cassava Leaves (*Plassas*):** Cook with small dried fish (*Bonga* or *Herring*) and unrefined red palm oil.
* **Beans & Cowpeas:** Inexpensive protein that supplies non-heme iron and folate.

#### 2. Energy & Healthy Fats for Fetal Brain Development
* **Groundnut Stew & Paste:** Rich in healthy monounsaturated fats, protein, and niacin.
* **Benne Seed (Sesame):** Extremely rich in zinc, calcium, and magnesium.
* **Red Palm Oil (Unbleached):** Outstanding source of natural provitamin A (beta-carotene), strengthening maternal immune defenses and infant eye development.

#### 3. Hydration & Safe Water
* Drink at least 8 to 10 cups of clean, boiled or filtered water daily.
* Hydration supports increased blood plasma volume, amniotic fluid maintenance, and kidney health.

---

### What to Avoid During Pregnancy
* **Raw/Unpasteurized herbal concoctions (*Agbo/bitters*):** May induce premature uterine contractions or cause fetal toxicity.
* **Uncooked or spoiled seafood/meat:** Risk of listeria and foodborne parasites.
* **Clay eating (*Kaolin/Calabar chalk*):** Common craving due to iron deficiency, but actually binds minerals in the gut and causes parasitic infections.

---

### Freedom Tree Antenatal Schedule
Visit our clinic at **11 Bundu Street Off Bo Taiama Highway** or your nearest mobile clinic outreach for free Hemoglobin (Hb) testing, malaria intermittent preventive treatment (IPTp), and routine iron/folic acid supplementation.`,
  },
  {
    id: 'guide-exclusive-breastfeeding-golden-hour',
    title: 'The "Golden Hour" & Exclusive Breastfeeding: Colostrum & First 6 Months',
    krioTitle: 'Di Fɔs Bobi Wata (Kolostrɔm) En Fo Gi Bobi Nɔmɔ Fo 6 Mɔnt',
    category: 'infant-care',
    targetAudience: 'New Parents & Families',
    readTimeMinutes: 5,
    summary: 'Essential evidence-based guide on the Golden Hour latch, why the first yellowish milk (colostrum) is baby’s first vaccine, and the life-saving benefits of exclusive breastfeeding without water.',
    krioSummary: 'No trowe di yala bobi wata! Na in de protekt yu bebi frɔm sik, en no gi wata fo 6 mɔnt bikɔs bobi wata gɛt ɔl di wata we bebi nid.',
    keyPoints: [
      'Initiate skin-to-skin contact and latch within the first 60 minutes ("Golden Hour") after delivery.',
      'Colostrum (thick yellowish first milk) is liquid gold—packed with antibodies, white blood cells, and natural gut protection.',
      'NEVER discard colostrum or give pre-lacteal feeds (sugar water, herbal tea, animal milk) which introduce dangerous bacteria.',
      'Exclusive breastfeeding for the first 6 full months: Breast milk contains over 88% water and all required hydration, even in hot dry season.',
      'Correct latch check: Baby mouth wide open, lower lip turned outward, chin touching mother’s breast, quiet rhythmic swallowing.',
    ],
    localSierraLeoneFocus: 'Debunking traditional water-giving myths in Southern Province communities',
    iconName: 'HeartHandshake',
    downloadsCount: 1890,
    featured: true,
    fullContentMarkdown: `### The Golden First 60 Minutes
Immediately following delivery, placing your dry, warm newborn directly onto your bare chest (skin-to-skin contact) stimulates the baby's natural rooting and suckling instincts while keeping the infant thermally stable.

---

### Why Colostrum is Baby’s First Vaccine
Many grandmothers in Sierra Leone traditionally advised squeezing out and throwing away the thick yellowish milk (*colostrum*), believing it to be "stale" or "dirty." **This is false and dangerous!**

* **High Concentration of Antibodies (Secretory IgA):** Coats the newborn's sterile intestines with a protective shield against bacteria and viruses.
* **Laxative Effect:** Helps the baby pass *meconium* (the dark first stool), clearing excess bilirubin and preventing neonatal jaundice.
* **High in Vitamin A & Zinc:** Critical for organ maturation and eye development.

---

### Why Zero Water is Needed for 6 Months
Even in the peak of the hot Sierra Leonean dry season (February–April):
1. **Breast milk provides 100% of hydration:** The "foremilk" at the start of each feeding is thirst-quenching and water-rich. The "hindmilk" at the end of the feeding is calorie-dense and rich in fats.
2. **Unboiled water carries cholera & diarrhea risk:** Diarrheal dehydration is a leading killer of infants under 6 months.
3. **Water fills the baby's tiny stomach:** If an infant drinks water, they stop suckling breast milk, leading to rapid weight loss and failure to thrive.

---

### Managing Common Breastfeeding Challenges
* **Sore/Cracked Nipples:** Usually caused by a shallow latch. Ensure the baby takes the entire darker area (*areola*) into their mouth, not just the nipple tip. Rub a drop of fresh breast milk onto the nipple after feeding.
* **Perceived "Low Milk Supply":** The more frequently the baby suckles (8–12 times per 24 hours), the more prolactin and oxytocin the mother produces. Drink clean water and eat nourishing local plassas.`,
  },
  {
    id: 'guide-neonatal-warmth-kmc',
    title: 'Neonatal Warmth & Kangaroo Mother Care (KMC) for Low Birth Weight',
    krioTitle: 'Wam Yu Bebi Wit Kangaru Metɔd Fo Sev In Layf',
    category: 'infant-care',
    targetAudience: 'Community Midwives & CHWs',
    readTimeMinutes: 4,
    summary: 'Clinical and community protocol for preventing neonatal hypothermia and managing premature or low birth weight infants (<2.5 kg) using continuous skin-to-skin Kangaroo Mother Care.',
    krioSummary: 'Aw fo tay bebi pan mama chest fo mek in bodi wam lek mashin, speshali fo bebi dèm we bɔn smɔl smɔl bifo in taym.',
    keyPoints: [
      'Neonatal hypothermia (<36.5°C) can cause rapid metabolic acidosis, respiratory distress, and death within hours.',
      'Immediate action at birth: Dry the newborn thoroughly with a clean cloth, discard the wet cloth, and wrap with dry soft cotton.',
      'Kangaroo Mother Care (KMC): Position the baby upright between the mother’s breasts inside her blouse, secured with a wrapper (*lappa*).',
      'Mother’s chest naturally acts as an organic incubator, adjusting temperature to keep the baby perfectly warm.',
      'Supports steady weight gain, stable heart rate, deep sleep, and easier frequent breastfeeding.',
    ],
    localSierraLeoneFocus: 'Off-grid villages without electric incubators across Bo and Moyamba Districts',
    iconName: 'ShieldPlus',
    downloadsCount: 1150,
    featured: false,
    fullContentMarkdown: `### The Silent Danger: Neonatal Hypothermia
In tropical climates like Sierra Leone, many caregivers assume newborns cannot get cold. In reality, newborns lose heat rapidly through evaporation, convection, and radiation due to their thin skin and high surface-area-to-weight ratio.

---

### The Three Steps of Kangaroo Mother Care (KMC)

#### 1. The Kangaroo Position
* Place the baby in an upright vertical position between the mother’s breasts, chest-to-chest.
* The baby's head should be turned to one side in a slightly extended position to keep the airway fully open.
* The baby's hips and arms should be flexed in a "frog" posture.

#### 2. Securing the Infant
* Secure the baby snugly to the mother’s chest with a traditional cotton wrapper (*lappa*) or customized binder.
* Put a soft cap on the baby’s head and warm socks on the feet, as 40% of heat loss occurs through the scalp.
* The father, grandmother, or older sibling can also practice KMC when the mother is resting or bathing.

#### 3. Continuous Practice
* Maintain continuous KMC day and night for small/preterm babies until the infant reaches 2.5 kg and naturally resists being swaddled.

---

### Warning Signs in a Newborn
Seek immediate emergency medical transport at **Freedom Tree Bo Center** if:
* Feet and chest feel cold to touch despite warming.
* Baby refuses to breastfeed or cannot suckle.
* Fast breathing (>60 breaths/min) or severe chest indrawing.
* Baby is lethargic, limp, or convulsing.`,
  },
  {
    id: 'guide-clean-cord-care-tetanus',
    title: 'Hygienic Umbilical Cord Care & Preventing Neonatal Tetanus',
    krioTitle: 'Aw Fo Men Di Bebi Navel Wata Wit Klin Medisin Wiwtot Doti',
    category: 'infant-care',
    targetAudience: 'TBA Referral Champions',
    readTimeMinutes: 3,
    summary: 'Guidelines on sterile cord clamping, single-use surgical blade safety from the Freedom Tree Mama Kit, and 7.1% chlorhexidine application for umbilical stump health.',
    krioSummary: 'Klin navel men: Yus di klin rezar bled frɔm di Mama Kit, no put kow dɔng, ash, ɔ doti oyl pan di bebi navel!',
    keyPoints: [
      'Always wash hands with clean water and antiseptic soap before touching the umbilical cord stump.',
      'Use only the brand-new sterile surgical razor blade included in the sealed Freedom Tree Mama Kit.',
      'Double tie with sterile cord ties: First tie 2 finger-breadths from abdomen; second tie 1 finger-breadth further.',
      'Apply 7.1% Chlorhexidine digluconate gel/liquid daily to the cord stump for the first 7 days.',
      'ABSOLUTE BAN on harmful traditional applications: Never apply cow dung, firewood ash, charcoal, sand, kerosene, or dirty palm oil.',
    ],
    localSierraLeoneFocus: 'Standard protocol for all 185 certified Traditional Birth Attendants in Bo District',
    iconName: 'Sparkles',
    downloadsCount: 1670,
    featured: false,
    fullContentMarkdown: `### Why Cord Care Matters
The newly severed umbilical cord is an open vascular channel directly leading into the newborn's internal bloodstream. In unhygienic conditions, bacteria (*Clostridium tetani* and *Staphylococcus aureus*) enter through the stump, resulting in lethal neonatal sepsis or tetanus.

---

### Step-by-Step Clean Delivery Protocol

1. **Scrub Hands:** Wash thoroughly with chlorhexidine soap from the Freedom Tree Mama Kit for at least 60 seconds.
2. **Delayed Cord Clamping (1–3 Minutes):** Wait until pulsations cease before clamping, allowing vital oxygenated blood to flow from the placenta into the infant (prevents newborn anemia).
3. **Sterile Cut:** Slice between the two sterile clamps with the fresh, unopened razor blade. Never touch the blade edge with bare fingers.
4. **Dry & Clean Air Exposure:** Keep the cord stump clean and dry, outside the diaper or cloth wrap.
5. **Chlorhexidine Application:** Swab 7.1% chlorhexidine solution onto the cord stump, base, and surrounding skin daily for 7 days.

---

### Danger Signs of Umbilical Infection (Omphalitis)
Inspect the cord daily. Immediately call **+232 76 522 072** if you notice:
* Red, swollen, or warm skin around the base of the navel (>1 cm redness).
* Foul-smelling yellowish pus oozing from the stump.
* Fever or abnormal hypothermia.
* Baby cries when the surrounding belly skin is gently touched.`,
  },
  {
    id: 'guide-weaning-bennimix-nutrition',
    title: 'Complementary Feeding from 6 Months: Bennimix & Local Weaning Recipes',
    krioTitle: 'Aw Fo Stat Gi Bebi It Frɔm 6 Mɔnt: Benimis En Lokal Porij',
    category: 'maternal-nutrition',
    targetAudience: 'New Parents & Families',
    readTimeMinutes: 4,
    summary: 'Nutrient-rich complementary feeding recipes from 6 to 24 months, highlighting Sierra Leone’s famous Bennimix multi-grain baby porridge and diversified food groups.',
    krioSummary: 'Wen bebi rich 6 mɔnt, stat gi am Benimis wit rɔys, bɛni sid, granat, en pis, plɔs bobi wata sotay in rich 2 ia.',
    keyPoints: [
      'Introduce soft, nutrient-dense foods at exactly 6 months while continuing on-demand breastfeeding up to 2 years.',
      'Traditional Sierra Leonean Bennimix recipe: 4 parts rice + 1 part roasted groundnut + 1 part sesame (benne) + 1 part cowpeas/pigeon peas.',
      'Enrich porridges with mashed papaya, mango, banana, cooked egg yolk, and finely ground bonga fish powder.',
      'Start with 2–3 small meals per day (2–3 tablespoons per feed), gradually increasing consistency from semi-liquid to soft mashed food.',
      'Maintain strict food hygiene: Wash hands before food preparation; use boiled water and clean covered bowls.',
    ],
    localSierraLeoneFocus: 'Local agricultural ingredients grown in Bo, Moyamba, and Kenema farmlands',
    iconName: 'Salad',
    downloadsCount: 980,
    featured: false,
    fullContentMarkdown: `### The Transition at 6 Months
At 6 months of age, breast milk alone can no longer satisfy an infant’s expanding energy, iron, and micronutrient requirements. However, breast milk continues to provide up to half of child nutritional needs between 6 and 12 months, and one-third up to 2 years.

---

### The Authentic Sierra Leone Bennimix Recipe

Bennimix is Sierra Leone's clinically formulated indigenous superfood porridge, created from four locally farmed staple ingredients:

| Ingredient | Proportion | Primary Nutritional Benefit |
| :--- | :--- | :--- |
| **Parboiled Country Rice** | 4 parts (60%) | Easily digestible carbohydrates & energy |
| **Roasted Groundnuts** | 1 part (15%) | Healthy fats, calories, and plant proteins |
| **Sesame Seeds (*Benne*)** | 1 part (12.5%) | Calcium, zinc, iron, and healthy oils |
| **Cowpeas / Pigeon Peas** | 1 part (12.5%) | Essential amino acids & lysine |

#### Preparation Method:
1. Clean, roast each grain separately, and grind together into a fine dry flour.
2. Store in an airtight container away from moisture.
3. Mix 3 tablespoons of Bennimix powder into clean water, bring to a gentle boil for 5–7 minutes, stirring continuously.
4. Cool to body temperature before feeding with a clean spoon.

---

### Expanding the Baby’s Diet (7–12 Months)
* **Vitamin A Fruits:** Mashed ripe papaya, sweet mango, cooked orange-fleshed sweet potato.
* **Animal Source Protein:** Add half a boiled egg yolk or one teaspoon of dried bonga fish powder to the daily porridge (critical for preventing stunting).
* **Avoid Sugar & Monosodium Glutamate (*Maggi*):** Do not add artificial bouillon seasoning cubes, salt, or excessive sugar to baby food.`,
  },
  {
    id: 'guide-postpartum-danger-signs-recovery',
    title: 'Postpartum Recovery & Maternal Danger Signs: The First 42 Days',
    krioTitle: 'Wetin Fo Luk Fo Afta Bili: Denja Sayn Dèm We Yu Nɔ Fo Layk Dɔn',
    category: 'postpartum-recovery',
    targetAudience: 'Expectant Mothers',
    readTimeMinutes: 4,
    summary: 'Comprehensive recovery guide for new mothers covering postpartum perineal care, mental health, family planning, and rapid recognition of postpartum hemorrhage and puerperal sepsis.',
    krioSummary: 'Afta yu bɔn, luk fayn pan bledin, fiva, en bodi tin dèm. If yu si hevi bledin, kɔl Freedom Tree ambyulans quick quick!',
    keyPoints: [
      'Postpartum checkups: Visit Freedom Tree Bo Center or local clinic on Day 3, Day 7, and Week 6 postpartum.',
      'Postpartum Hemorrhage (PPH) warning: Soaking through more than 2 large sanitary cloths in 1 hour, passing large blood clots, or sudden dizziness.',
      'Puerperal Sepsis warning: High fever (>38°C), severe lower abdominal cramping, foul-smelling vaginal discharge (*lochia*).',
      'Rest and high-protein nutrition: Mothers need at least 500 extra calories and adequate rest while lactating.',
      'Freedom Tree 24/7 Maternal Hotline: Call +232 76 522 072 immediately for emergency home ambulance dispatch.',
    ],
    localSierraLeoneFocus: 'Emergency referral and post-delivery follow-up across Bo District chiefdoms',
    iconName: 'AlertTriangle',
    downloadsCount: 1340,
    featured: false,
    fullContentMarkdown: `### The Critical Postpartum Period
Over 60% of all maternal deaths in sub-Saharan Africa occur during the first 6 weeks following childbirth. Proper post-delivery monitoring saves lives.

---

### The Three Most Dangerous Postpartum Complications

#### 1. Severe Postpartum Bleeding (PPH)
* **What to check:** Normal postpartum bleeding (*lochia*) gradually decreases in flow from bright red to pinkish-brown over two weeks.
* **Emergency Sign:** Bleeding that suddenly gushes, fills two full cloths in an hour, or is accompanied by fainting, cold clammy skin, or rapid pulse.
* **Immediate CHW Action:** Vigorously massage the uterus to ensure it is firm and contracted like a hard cricket ball. Empty the bladder, keep the mother warm, and call **+232 76 522 072** for ambulance dispatch.

#### 2. Puerperal Sepsis (Uterine / Pelvic Infection)
* **Causes:** Unsterile birth utensils, unwashed hands during delivery, retained placenta fragments.
* **Symptoms:** Shivering chills, fever, severe lower belly tenderness, foul-smelling brown/greenish lochia.
* **Treatment:** Requires immediate systemic antibiotics administered by a licensed healthcare provider at Freedom Tree Bo Center.

#### 3. Postpartum Eclampsia (High Blood Pressure & Seizures)
* High blood pressure can peak up to 48 hours or even 2 weeks after birth.
* Symptoms include severe unremitting headache, seeing flashes of light, swelling in hands and face, and epigastric pain under the ribs.

---

### Routine Postnatal Clinic Schedule at 11 Bundu St, Bo
* **Visit 1 (within 24–48 hours):** Vital signs, newborn weight, cord inspection, breastfeeding verification.
* **Visit 2 (Day 7–14):** Maternal healing assessment, infant BCG/Polio/HepB immunization check.
* **Visit 3 (Week 6):** Maternal well-being, infant 6-week pentavalent vaccine, and voluntary postpartum family planning counseling.`,
  },
];

export const COMMUNITY_SUCCESS_STORIES: CommunitySuccessStory[] = [
  {
    id: 'story-fatmata-sia',
    motherName: 'Fatmata Conteh',
    motherAge: 23,
    babyName: 'Baby Sia',
    babyGender: 'Girl',
    village: 'Bundu Street Community',
    chiefdom: 'Kakua Chiefdom',
    district: 'Bo District',
    programUsed: 'Clean Delivery Mama Kit & Midwife Care',
    programId: 'clean-delivery-kits',
    quote: 'When my water broke at midnight, having the sterile Mama Kit ready at 11 Bundu St made all the difference. My baby Sia was born strong with zero infection.',
    krioQuote: 'We mi wata brok na nite, bikos a bin dɔn gɛt di klin Mama Kit na 11 Bundu St, evriting go fayn. Mi pikin Sia bɔn wit klin bodi en no gɛt kol.',
    narrative: 'As a 23-year-old first-time mother in Bo, Fatmata feared delivery complications and the high cost of medical supplies. During her antenatal visits at Freedom Tree Headquarters, Sister Aminata registered her and provided a sealed Mama Kit containing sterile cord ties, razor blade, antiseptic soap, and a clean plastic birthing mat. When labor began, her delivery at the Bo center was completely hygienic and calm.',
    krioNarrative: 'Fatmata na yɔŋ mama na Bo we bin de fred fo bɔn bikos of medisin kɔst. Freedom Tree gi am klin mama kit we gɛt rezar, kord tay, medisin sop en lapa. I bɔn in baby Sia fayn na 11 Bundu St witout eni problem.',
    impactOutcome: 'Zero Infection • Sterile Umbilical Care • 3.3kg Healthy Newborn',
    attendedBy: 'Sister Aminata Koroma (Senior Midwife)',
    clinicOrLocation: 'Freedom Tree Bo Maternal Center (11 Bundu St)',
    date: 'August 2026',
    imageUrl: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Mother lovingly holding newborn infant wrapped in soft cotton swaddle',
    tags: ['Mama Kit', 'First-Time Mother', 'Clean Delivery'],
    suggestedSponsorshipAmount: 35,
  },
  {
    id: 'story-mariama-ibrahim',
    motherName: 'Mariama Turay',
    motherAge: 31,
    babyName: 'Baby Ibrahim',
    babyGender: 'Boy',
    village: 'Njala Tikonko',
    chiefdom: 'Tikonko Chiefdom',
    district: 'Bo District',
    programUsed: 'Mobile Ultrasound & High-Risk Antenatal Care',
    programId: 'mobile-ultrasound',
    quote: 'The mobile ultrasound team found my dangerously high blood pressure and abnormal baby position weeks before labor. Freedom Tree stabilized me and saved both our lives.',
    krioQuote: 'Di mobil ultrasound tim kam na wi vilej en si se mi blod prɛshɔ bin ayt. Freedom Tree kɛr mi go na Bo Center bifo peyn bigin. Dèm sev mi en mi pikin layf.',
    narrative: 'Living 14 kilometers from the Bo-Taiama highway, Mariama had no easy way to get regular scans. When Freedom Tree’s 4WD mobile ultrasound clinic visited Tikonko, the diagnostic team flagged severe pre-eclampsia (blood pressure 150/98) and breech presentation. She was immediately scheduled for stabilized management at Bo Center, preventing life-threatening postpartum seizures.',
    krioNarrative: 'Mariama de liv fawe na vilej we no gɛt mashin fo chek belle. Mobil ultrasound tim kam na Tikonko en si se in blod prɛshɔ ayt bad. Dèm gi am tritment na Bo Center bifo i bɔn fayn.',
    impactOutcome: 'Pre-Eclampsia Detected Early • Breech Managed • Full Maternal Recovery',
    attendedBy: 'Dr. Joseph Mansaray & Midwife Mary Kamara',
    clinicOrLocation: 'Tikonko Safe Motherhood Outreach / Bo Center',
    date: 'July 2026',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Mother smiling gently with her baby in community clinic setting',
    tags: ['Mobile Ultrasound', 'High-Risk Care', 'Hypertension Managed'],
    suggestedSponsorshipAmount: 75,
  },
  {
    id: 'story-hawa-twins',
    motherName: 'Hawa Kamara',
    motherAge: 27,
    babyName: 'Twins Hassan & Husseine',
    babyGender: 'Twins',
    village: 'Gerihun Junction',
    chiefdom: 'Baoma Chiefdom',
    district: 'Bo Rural',
    programUsed: '24/7 Obstetric Emergency 4WD Transport',
    programId: 'emergency-transport',
    quote: 'Sudden labor in heavy monsoon rain felt terrifying in our rural village. Our community champion called the 24/7 line, and the 4WD ambulance arrived at 2 AM to bring us safely to Bo.',
    krioQuote: 'Wata bin de ren hevi we labor bigin na Gerihun. Wi TBA kɔl Freedom Tree nɔmba, en di 4x4 ambyulans kam rich na wi do na 2 AM. Dèm kɛr wi go Bo fo bɔn di twen dèm fayn.',
    narrative: 'Hawa was expecting twins in rural Baoma when torrential downpours made village dirt roads impassable for ordinary taxis. When contractions started rapidly at 2:00 AM, the local Community Health Worker called +232 76 522 072. Freedom Tree’s rugged 4WD maternal ambulance responded immediately with oxygen and medical staff, transporting her free of charge to Bo Center for a safe twin delivery.',
    krioNarrative: 'Hawa bin gɛt twen belle na Baoma. We ren fol hevi, taxi nɔ bin ebul kam. Freedom Tree ambyulans kam na medil nite wit oxijin en midwife, en kɛr am go Bo Center fri-of-chaj.',
    impactOutcome: 'Twins Delivered Safely (2.6kg & 2.8kg) • 0 PPH • Zero Transport Cost to Family',
    attendedBy: 'Ambulance Driver Sahr & Midwife Sister Koroma',
    clinicOrLocation: 'Gerihun Rural Outreach to 11 Bundu St Birthing Ward',
    date: 'June 2026',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Health worker holding two newborn swaddled babies warmly in maternity ward',
    tags: ['Emergency Ambulance', 'Twin Birth', '24/7 Dispatch'],
    suggestedSponsorshipAmount: 350,
  },
  {
    id: 'story-zainab-joseph',
    motherName: 'Zainab Jalloh',
    motherAge: 19,
    babyName: 'Baby Joseph',
    babyGender: 'Boy',
    village: 'Taiama Old Town',
    chiefdom: 'Kori Chiefdom',
    district: 'Moyamba / Bo Corridor',
    programUsed: 'CHW & Traditional Birth Attendant Upskilling',
    programId: 'chw-midwife-training',
    quote: 'Our village birth attendant Auntie Mabinty was trained by Freedom Tree. She used sterile gloves, sterile cord clamps, and knew exactly when to escort me to the Taiama health post.',
    krioQuote: 'Wi TBA na vilej, Anti Mabinty, dɔn gɛt trenin frɔm Freedom Tree. I no fayn wetin fo du wit klin rezar en sop, en i kɛr mi go Taiama klinik kwik-kwik fo bɔn fayn.',
    narrative: 'In partnership with New Harvest Global Ministries, Freedom Tree trained traditional birth attendants across Kori Chiefdom in modern clean delivery protocols and danger sign recognition. When 19-year-old Zainab went into extended labor, her certified attendant Auntie Mabinty followed protocol, prevented unsterile interventions, and escorted her to the Taiama clinic for an assisted clean birth.',
    krioNarrative: 'Anti Mabinty na TBA we lan klin delivery frɔm Freedom Tree en New Harvest Ministries. I yus klin glovs en kord tay, en sev 19-yeas Zainab frɔm sik we i de bɔn in fɔs pikin Joseph.',
    impactOutcome: 'TBA Referral Champion • Clean Protocol • Immediate Skin-to-Skin Kangaroo Care',
    attendedBy: 'Nurse Fatu Sesay & Trained TBA Mabinty',
    clinicOrLocation: 'Taiama Maternal Health Post (Bo-Taiama Highway)',
    date: 'August 2026',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Healthcare attendant gently attending to a mother and newborn child',
    tags: ['TBA Trained', 'New Harvest Partnership', 'Safe Referral'],
    suggestedSponsorshipAmount: 150,
  },
  {
    id: 'story-isata-kadiatu',
    motherName: 'Isata Sesay',
    motherAge: 29,
    babyName: 'Baby Kadiatu',
    babyGender: 'Girl',
    village: 'Bo Taiama Highway Mile 4',
    chiefdom: 'Kakua West',
    district: 'Bo District',
    programUsed: 'Clean Delivery Mama Kit & Postpartum Nutrition Counseling',
    programId: 'clean-delivery-kits',
    quote: 'The sterile underlay protected my baby from the dirt ground, and the cotton hat kept her warm right away. The midwives also guided us on exclusive breastfeeding for six months.',
    krioQuote: 'Di lapa we de insay di kit mek mi no ledɔm na dɔti, en di klos fo baby kip mi pikin wam. Di midwife tich mi ol wetin fo it en bresfid mi baby fayn.',
    narrative: 'Isata received her complete Freedom Tree Mama Kit during antenatal circle at the Mile 4 health post. Having the sealed waterproof underlay, sterile gauze, and warm swaddle gave her family dignity and complete infection protection during labor.',
    krioNarrative: 'Isata gɛt in Mama Kit na Bo Taiama Highway Mile 4. Di klin lapa en klos mek in baby Kadiatu nɔ gɛt kol o tetanos, en in bodi de grow strong.',
    impactOutcome: 'Infection-Free Clean Birth • Early Exclusive Breastfeeding • Healthy 3.4kg Weight',
    attendedBy: 'Sister Aminata Koroma & Community Midwife Team',
    clinicOrLocation: 'Freedom Tree Bo Maternal Center (11 Bundu St)',
    date: 'May 2026',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Joyful mother smiling holding her newborn baby in clean swaddle cloth',
    tags: ['Sterile Underlay', 'Infant Nutrition', 'Postpartum Follow-up'],
    suggestedSponsorshipAmount: 15,
  },
];

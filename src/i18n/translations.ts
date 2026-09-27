export interface Translations {
  appTitle: string;
  tagline: string;
  aiTourismEngine: string;
  next: string;
  back: string;
  stepOf: (current: number, total: number) => string;
  saveAndContinue: string;
  continueToAnalysis: string;
  exploreDestination: string;
  googleMap: string;
  openInGoogleMaps: string;
  getDirections: string;
  googleEarth: string;
  streetView: string;
  viewDetails: string;
  clear: string;
  voice: string;
  logout: string;
  guest: string;

  // Search State & District
  searchStateLabel: string;
  searchStatePlaceholder: string;
  searchDistrictLabel: string;
  searchDistrictPlaceholder: string;
  verifiedMatch: string;
  verifiedMatchesCount: (count: number) => string;
  locationNotFound: string;
  locationNotFoundStateDesc: string;
  locationNotFoundDistrictDesc: string;
  allVerifiedStates: string;
  allVerifiedDistricts: string;
  availableCount: (count: number) => string;

  // Image & Verification
  imageUnavailable: string;
  verifiedInScope: string;
  verifiedArchive: string;

  // Official Booking
  officialBookingTitle: string;
  bookOfficialTicket: string;
  officialBookingUnavailable: string;
  verifiedOfficialPortal: string;

  // Safety & Security
  securitySafetyTitle: string;
  noActiveAlerts: string;
  safetyAlertHeadline: string;
  affectedArea: string;
  lastUpdated: string;
  source: string;
  safetyAdvisory: string;

  // Weather
  weatherAnalysis: string;
  verifiedWeather: string;
  liveCalibrated: string;
  rain: string;
  humidity: string;
  wind: string;
  timingForecast: string;
  weatherPackingChecklist: string;

  // Food & Allergies
  allergiesStepTitle: string;
  allergiesStepSubtitle: string;
  addCustomAllergyLabel: string;
  customAllergyPlaceholder: string;
  addCustomAllergyBtn: string;
  yourSelectedAllergies: string;
  noAllergiesSelected: string;
  allergyPrecautionsTitle: string;
  allergyPrecautionsSubtitle: string;
  precautionCheckIngredients: string;
  precautionInformStaff: string;
  precautionAvoidUncertain: string;
  precautionCrossContact: string;
  precautionEmergencyMeds: string;
  allergyDisclaimer: string;

  // Food Recommendations
  foodAllergyTitle: string;
  foodAllergySubtitle: string;
  suitableEateriesTitle: string;
  recommendedDishesTitle: string;
  cautionDishesTitle: string;
  potentialAllergensTitle: string;

  // Tabs
  tabOverview: string;
  tabFoodAllergy: string;
  tabMap: string;
  tabItinerary: string;
  tabPacking: string;
  tabChat: string;

  // Packing
  regeneratePacking: string;
  packingAssistant: string;
  packSmarter: string;
  itemsPacked: (packed: number, total: number) => string;
  backToItinerary: string;
  backToTrip: string;
  packingSummary: string;
  essential: string;
  recommended: string;
  optional: string;

  // Review
  reviewTitle: string;
  reviewSubtitle: string;
  tripSavedTitle: string;
  tripSavedDesc: string;

  // Chatbot
  chatAssistant: string;
  voiceAssistant: string;
  askChatbotPlaceholder: string;
  send: string;
  accessibilityNotice: string;
}

export const translations: Record<string, Translations> = {
  en: {
    appTitle: "TRAVELMIND AI",
    tagline: "Personalized AI Tourism & Travel Planner",
    aiTourismEngine: "AI TOURISM ENGINE",
    next: "NEXT →",
    back: "← BACK",
    stepOf: (curr, total) => `STEP ${curr} OF ${total}`,
    saveAndContinue: "CONTINUE TO AI ANALYSIS →",
    continueToAnalysis: "CONTINUE TO AI ANALYSIS →",
    exploreDestination: "EXPLORE THIS DESTINATION",
    googleMap: "GOOGLE MAP",
    openInGoogleMaps: "OPEN IN GOOGLE MAPS",
    getDirections: "GET DIRECTIONS",
    googleEarth: "GOOGLE EARTH",
    streetView: "STREET VIEW",
    viewDetails: "VIEW DESTINATION DETAILS",
    clear: "Clear",
    voice: "VOICE",
    logout: "Reset / Logout",
    guest: "Explorer",

    searchStateLabel: "[ Search State ]",
    searchStatePlaceholder: "Type state name (e.g., Rajasthan, Tamil Nadu, Kerala)...",
    searchDistrictLabel: "[ Search District ]",
    searchDistrictPlaceholder: "Type district name (e.g., Madurai, Jaipur, Ernakulam)...",
    verifiedMatch: "VERIFIED MATCH",
    verifiedMatchesCount: (c) => `Showing ${c} verified match${c === 1 ? '' : 'es'}`,
    locationNotFound: "Location not found in verified data.",
    locationNotFoundStateDesc: "Please choose or type a verified Indian State from the catalog below.",
    locationNotFoundDistrictDesc: "Please choose or type a verified district belonging to this state.",
    allVerifiedStates: "All Verified States & Territories",
    allVerifiedDistricts: "Verified Districts in Selected State",
    availableCount: (c) => `${c} Available`,

    imageUnavailable: "Exact destination image unavailable.",
    verifiedInScope: "VERIFIED IN-SCOPE",
    verifiedArchive: "Verified Tourism Archive",

    officialBookingTitle: "OFFICIAL DESTINATION BOOKING",
    bookOfficialTicket: "BOOK OFFICIAL TICKET",
    officialBookingUnavailable: "Official online booking is not available for this destination.",
    verifiedOfficialPortal: "Official Verified Heritage & Tourism Portal",

    securitySafetyTitle: "SECURITY & SAFETY ALERTS",
    noActiveAlerts: "No active safety alerts found for this destination.",
    safetyAlertHeadline: "SAFETY & TRAVEL ADVISORY",
    affectedArea: "Affected Area",
    lastUpdated: "Last Updated",
    source: "Verified Official Source",
    safetyAdvisory: "Safety Advisory",

    weatherAnalysis: "Live Weather & Climate Analysis",
    verifiedWeather: "Verified Regional Weather",
    liveCalibrated: "LIVE CALIBRATED",
    rain: "Rain",
    humidity: "Humidity",
    wind: "Wind",
    timingForecast: "Timing Forecast",
    weatherPackingChecklist: "Weather-Adaptive Packing Checklist",

    allergiesStepTitle: "FOOD ALLERGIES & SENSITIVITIES",
    allergiesStepSubtitle: "Tell us about any food allergies so we can calibrate safe dining and dishes",
    addCustomAllergyLabel: "[ Add Custom Allergy ]",
    customAllergyPlaceholder: "Type a specific allergy (e.g., Banana allergy, Mustard)...",
    addCustomAllergyBtn: "+ ADD ALLERGY",
    yourSelectedAllergies: "Your Selected Allergies",
    noAllergiesSelected: "No allergies recorded yet. Select from common options or add your own.",
    allergyPrecautionsTitle: "ALLERGY PRECAUTIONS",
    allergyPrecautionsSubtitle: "Practical safety measures when exploring regional food in this destination",
    precautionCheckIngredients: "Check ingredients with chefs or servers before ordering local dishes.",
    precautionInformStaff: "Explicitly inform restaurant staff about your specific allergy in advance.",
    precautionAvoidUncertain: "Avoid gravies, street sweets, or chutneys with ambiguous or secret nut/dairy bases.",
    precautionCrossContact: "Ask whether cooking utensils or frying oil are shared with allergen items.",
    precautionEmergencyMeds: "Carry personal emergency allergy medication according to your healthcare professional's guidance.",
    allergyDisclaimer: "General dietary precaution guide — strictly not medical advice or clinical diagnosis.",

    foodAllergyTitle: "LOCAL FOOD & ALLERGY DINING",
    foodAllergySubtitle: "Destination-specific culinary recommendations tailored to your dietary profile and allergies",
    suitableEateriesTitle: "Recommended Eateries in Destination",
    recommendedDishesTitle: "Recommended Local Dishes",
    cautionDishesTitle: "Dishes Requiring Caution",
    potentialAllergensTitle: "Potential Allergen Watch",

    tabOverview: "Trip Overview & AI Match",
    tabFoodAllergy: "Food & Allergy Guide",
    tabMap: "Real Google Map & 3D",
    tabItinerary: "Day-by-Day Itinerary",
    tabPacking: "Smart Packing Assistant",
    tabChat: "AI Tourism Concierge",

    regeneratePacking: "REGENERATE PACKING LIST",
    packingAssistant: "TRAVELMIND AI PACKING ASSISTANT",
    packSmarter: "Pack smarter. Travel better.",
    itemsPacked: (p, t) => `${p} / ${t} ITEMS PACKED`,
    backToItinerary: "BACK TO ITINERARY",
    backToTrip: "BACK TO TRIP",
    packingSummary: "PACKING SUMMARY",
    essential: "Essential",
    recommended: "Recommended",
    optional: "Optional",

    reviewTitle: "REVIEW YOUR TRAVEL CHOICES",
    reviewSubtitle: "Grounded strictly inside selected destination and verified catalog",
    tripSavedTitle: "TRIP BRIEF SAVED SECURELY",
    tripSavedDesc: "Your preferences, dietary profile, and allergies actively calibrate recommendations and safety alerts.",

    chatAssistant: "AI Tourism Concierge",
    voiceAssistant: "AI Voice Tour Guide",
    askChatbotPlaceholder: "Ask about attractions, food allergies, what to pack, or itinerary...",
    send: "Send",
    accessibilityNotice: "General travel preparation reminder — not medical advice."
  },

  ta: {
    appTitle: "டிராவல்மைண்ட் AI",
    tagline: "தனிப்பயனாக்கப்பட்ட AI சுற்றுலா & பயணத் திட்டமிடுபவர்",
    aiTourismEngine: "AI சுற்றுலா எஞ்சின்",
    next: "அடுத்து →",
    back: "← பின்செல்",
    stepOf: (curr, total) => `படி ${curr} / ${total}`,
    saveAndContinue: "AI ஆய்வுக்குத் தொடர்க →",
    continueToAnalysis: "AI ஆய்வுக்குத் தொடர்க →",
    exploreDestination: "இந்த இடத்தை ஆராயுங்கள்",
    googleMap: "கூகிள் வரைபடம்",
    openInGoogleMaps: "கூகிள் வரைபடத்தில் திறக்கவும்",
    getDirections: "வழிகளைப் பெறுக",
    googleEarth: "கூகிள் எர்த்",
    streetView: "தெருக் காட்சி",
    viewDetails: "முழு விவரங்களைப் பார்க்கவும்",
    clear: "அழி",
    voice: "குரல்",
    logout: "மீட்டமை / வெளியேறு",
    guest: "பயணி",

    searchStateLabel: "[ மாநிலத்தைத் தேடுங்கள் ]",
    searchStatePlaceholder: "மாநிலத்தின் பெயரைத் தட்டச்சு செய்க (எ.கா. தமிழ்நாடு, ராஜஸ்தான், கேரளா)...",
    searchDistrictLabel: "[ மாவட்டத்தைத் தேடுங்கள் ]",
    searchDistrictPlaceholder: "மாவட்டத்தின் பெயரைத் தட்டச்சு செய்க (எ.கா. மதுரை, ஜெய்ப்பூர், எர்ணாகுளம்)...",
    verifiedMatch: "சரிபார்க்கப்பட்ட பொருத்தம்",
    verifiedMatchesCount: (c) => `${c} சரிபார்க்கப்பட்ட முடிவுகள் காட்டப்படுகின்றன`,
    locationNotFound: "சரிபார்க்கப்பட்ட தரவில் இடம் கிடைக்கவில்லை.",
    locationNotFoundStateDesc: "கீழே உள்ள பட்டியலிலிருந்து சரியான இந்திய மாநிலத்தைத் தேர்ந்தெடுக்கவும்.",
    locationNotFoundDistrictDesc: "தேர்ந்தெடுக்கப்பட்ட மாநிலத்திற்குட்பட்ட சரியான மாவட்டத்தைத் தட்டச்சு செய்க.",
    allVerifiedStates: "அனைத்து சரிபார்க்கப்பட்ட மாநிலங்கள்",
    allVerifiedDistricts: "தேர்ந்தெடுக்கப்பட்ட மாநிலத்தின் மாவட்டங்கள்",
    availableCount: (c) => `${c} கிடைக்கின்றன`,

    imageUnavailable: "Exact destination image unavailable.",
    verifiedInScope: "சரிபார்க்கப்பட்ட இடம்",
    verifiedArchive: "சரிபார்க்கப்பட்ட சுற்றுலா காப்பகம்",

    officialBookingTitle: "அதிகாரப்பூர்வ சுற்றுலா முன்பதிவு",
    bookOfficialTicket: "அதிகாரப்பூர்வ டிக்கெட் முன்பதிவு செய்க",
    officialBookingUnavailable: "Official online booking is not available for this destination.",
    verifiedOfficialPortal: "அதிகாரப்பூர்வ அரசு சுற்றுலா போர்டல்",

    securitySafetyTitle: "பாதுகாப்பு & எச்சரிக்கை அறிவிப்புகள்",
    noActiveAlerts: "No active safety alerts found.",
    safetyAlertHeadline: "பாதுகாப்பு & பயண எச்சரிக்கை",
    affectedArea: "பாதிக்கப்பட்ட பகுதி",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
    source: "அதிகாரப்பூர்வ ஆதாரம்",
    safetyAdvisory: "பாதுகாப்பு வழிகாட்டுதல்",

    weatherAnalysis: "நேரலை வானிலை & காலநிலை பகுப்பாய்வு",
    verifiedWeather: "சரிபார்க்கப்பட்ட பிராந்திய வானிலை",
    liveCalibrated: "நேரலை புதுப்பிப்பு",
    rain: "மழை வாய்ப்பு",
    humidity: "ஈரப்பதம்",
    wind: "காற்று வேகம்",
    timingForecast: "மழை நேர முன்னறிவிப்பு",
    weatherPackingChecklist: "வானிலைக்கு ஏற்ற பேக்கிங் பட்டியல்",

    allergiesStepTitle: "உணவு ஒவ்வாமை & எச்சரிக்கைகள்",
    allergiesStepSubtitle: "பாதுகாப்பான உணவு பரிந்துரைகளை உருவாக்க உங்கள் ஒவ்வாமை விவரங்களைத் தெரிவிக்கவும்",
    addCustomAllergyLabel: "[ தனிப்பயன் ஒவ்வாமையைச் சேர்க்கவும் ]",
    customAllergyPlaceholder: "குறிப்பிட்ட ஒவ்வாமையைத் தட்டச்சு செய்க (எ.கா. வாழை ஒவ்வாமை, கடுகு)...",
    addCustomAllergyBtn: "+ ஒவ்வாமையைச் சேர்",
    yourSelectedAllergies: "நீங்கள் தேர்ந்தெடுத்த ஒவ்வாமைகள்",
    noAllergiesSelected: "ஒவ்வாமைகள் ஏதும் தேர்வு செய்யப்படவில்லை. பொதுவான விருப்பங்களைத் தேர்ந்தெடுக்கவும்.",
    allergyPrecautionsTitle: "ஒவ்வாமை பாதுகாப்பு முன்னெச்சரிக்கைகள்",
    allergyPrecautionsSubtitle: "சுற்றுலா தலத்தில் உணவு உண்ணும்போது பின்பற்ற வேண்டிய பாதுகாப்பு நெறிமுறைகள்",
    precautionCheckIngredients: "உணவை ஆர்டர் செய்வதற்கு முன் அதில் சேர்க்கப்படும் பொருட்களை சமையல்காரரிடம் உறுதிப்படுத்தவும்.",
    precautionInformStaff: "உணவக பணியாளர்களிடம் உங்கள் ஒவ்வாமை குறித்து தெளிவாக முன்கூட்டியே தெரிவிக்கவும்.",
    precautionAvoidUncertain: "தெளிவற்ற அல்லது மறைமுகமான நட்ஸ்/பால் சார்ந்த கிரேவிகள் மற்றும் சாஸ்களைத் தவிர்க்கவும்.",
    precautionCrossContact: "சமையல் பாத்திரங்கள் அல்லது எண்ணெய் பிற உணவுகளுடன் கலக்கப்படுகிறதா என்று கேளுங்கள்.",
    precautionEmergencyMeds: "உங்கள் மருத்துவ நிபுணரின் வழிகாட்டுதலின்படி அவசரகால ஒவ்வாமை மருந்துகளை எப்போதும் உடன் வைத்திருங்கள்.",
    allergyDisclaimer: "பொதுவான உணவு பாதுகாப்பு வழிகாட்டுதல் மட்டுமே — மருத்துவ ஆலோசனை அல்ல.",

    foodAllergyTitle: "உள்ளூர் உணவு & ஒவ்வாமை வழிகாட்டி",
    foodAllergySubtitle: "உங்கள் ஒவ்வாமைக்கு ஏற்ப தயாரிக்கப்பட்ட உணவகங்கள் மற்றும் உணவுகளின் பட்டியல்",
    suitableEateriesTitle: "பரிந்துரைக்கப்படும் பாதுகாப்பான உணவகங்கள்",
    recommendedDishesTitle: "நீங்கள் சுவைக்கக்கூடிய பாதுகாப்பான உணவுகள்",
    cautionDishesTitle: "கவனமுடன் இருக்க வேண்டிய உணவுகள்",
    potentialAllergensTitle: "கவனிக்க வேண்டிய ஒவ்வாமை பொருட்கள்",

    tabOverview: "பயணக் கண்ணோட்டம் & AI பொருத்தம்",
    tabFoodAllergy: "உணவு & ஒவ்வாமை வழிகாட்டி",
    tabMap: "கூகிள் வரைபடம் & 3D",
    tabItinerary: "நாள் வாரியான பயணத் திட்டம்",
    tabPacking: "ஸ்மார்ட் பேக்கிங் வழிகாட்டி",
    tabChat: "AI சுற்றுலா உதவியாளர்",

    regeneratePacking: "பட்டியலை மீண்டும் உருவாக்கவும்",
    packingAssistant: "AI பயணப் பை பேக்கிங் வழிகாட்டி",
    packSmarter: "சிறப்பாக பேக் செய்யுங்கள். மகிழ்வோடு பயணியுங்கள்.",
    itemsPacked: (p, t) => `${p} / ${t} பொருட்கள் பேக் செய்யப்பட்டன`,
    backToItinerary: "பயணத் திட்டத்திற்குத் திரும்பு",
    backToTrip: "முதன்மைப் பக்கத்திற்குத் திரும்பு",
    packingSummary: "பேக்கிங் சுருக்கம்",
    essential: "அத்தியாவசியம்",
    recommended: "பரிந்துரைக்கப்படுகிறது",
    optional: "விருப்பமானது",

    reviewTitle: "உங்கள் பயணத் தேர்வுகளைச் சரிபார்க்கவும்",
    reviewSubtitle: "தேர்ந்தெடுக்கப்பட்ட இடம் மற்றும் சரிபார்க்கப்பட்ட தகவலின் அடிப்படையில்",
    tripSavedTitle: "பயணத் தகவல்கள் பாதுகாப்பாக சேமிக்கப்பட்டன",
    tripSavedDesc: "உங்கள் விருப்பங்கள், உணவு முறை மற்றும் ஒவ்வாமைகள் துல்லியமான பரிந்துரைகளை உருவாக்க உதவுகின்றன.",

    chatAssistant: "AI சுற்றுலா உதவியாளர்",
    voiceAssistant: "AI குரல் சுற்றுலா வழிகாட்டி",
    askChatbotPlaceholder: "சுற்றுலா இடங்கள், உணவு ஒவ்வாமை, பேக்கிங் பற்றி கேளுங்கள்...",
    send: "அனுப்பு",
    accessibilityNotice: "பொதுவான பயண முன்னெச்சரிக்கை தகவல் — மருத்துவ ஆலோசனை அல்ல."
  },

  hi: {
    appTitle: "ट्रैवलमाइंड AI",
    tagline: "व्यक्तिगत AI पर्यटन एवं यात्रा योजनाकार",
    aiTourismEngine: "AI पर्यटन इंजन",
    next: "आगे बढ़ें →",
    back: "← वापस",
    stepOf: (curr, total) => `चरण ${curr} / ${total}`,
    saveAndContinue: "AI विश्लेषण जारी रखें →",
    continueToAnalysis: "AI विश्लेषण जारी रखें →",
    exploreDestination: "इस गंतव्य का अन्वेषण करें",
    googleMap: "गूगल मैप",
    openInGoogleMaps: "गूगल मैप्स में खोलें",
    getDirections: "दिशा-निर्देश प्राप्त करें",
    googleEarth: "गूगल अर्थ",
    streetView: "स्ट्रीट व्यू",
    viewDetails: "गंतव्य विवरण देखें",
    clear: "हटाएं",
    voice: "आवाज़",
    logout: "रीसेट / लॉगआउट",
    guest: "यात्री",

    searchStateLabel: "[ राज्य खोजें ]",
    searchStatePlaceholder: "राज्य का नाम लिखें (उदा. राजस्थान, तमिलनाडु, केरल)...",
    searchDistrictLabel: "[ जिला खोजें ]",
    searchDistrictPlaceholder: "जिले का नाम लिखें (उदा. जयपुर, मदुरै, एर्नाकुलम)...",
    verifiedMatch: "सत्यापित मिलान",
    verifiedMatchesCount: (c) => `${c} सत्यापित परिणाम प्रदर्शित`,
    locationNotFound: "सत्यापित डेटा में स्थान नहीं मिला।",
    locationNotFoundStateDesc: "कृपया नीचे दी गई सूची से सत्यापित भारतीय राज्य चुनें।",
    locationNotFoundDistrictDesc: "कृपया इस राज्य का सत्यापित जिला दर्ज करें।",
    allVerifiedStates: "सभी सत्यापित राज्य एवं केंद्र शासित प्रदेश",
    allVerifiedDistricts: "चयनित राज्य के सत्यापित जिले",
    availableCount: (c) => `${c} उपलब्ध`,

    imageUnavailable: "Exact destination image unavailable.",
    verifiedInScope: "सत्यापित गंतव्य",
    verifiedArchive: "सत्यापित पर्यटन अभिलेखागार",

    officialBookingTitle: "आधिकारिक गंतव्य टिकट बुकिंग",
    bookOfficialTicket: "आधिकारिक टिकट बुक करें",
    officialBookingUnavailable: "Official online booking is not available for this destination.",
    verifiedOfficialPortal: "आधिकारिक सरकारी पर्यटन पोर्टल",

    securitySafetyTitle: "सुरक्षा एवं यात्रा अलर्ट",
    noActiveAlerts: "No active safety alerts found.",
    safetyAlertHeadline: "सुरक्षा एवं यात्रा सलाह",
    affectedArea: "प्रभावित क्षेत्र",
    lastUpdated: "अंतिम अपडेट",
    source: "आधिकारिक स्रोत",
    safetyAdvisory: "सुरक्षा निर्देश",

    weatherAnalysis: "लाइव मौसम एवं जलवायु विश्लेषण",
    verifiedWeather: "सत्यापित क्षेत्रीय मौसम",
    liveCalibrated: "लाइव अपडेट",
    rain: "बारिश की संभावना",
    humidity: "आर्द्रता",
    wind: "हवा की गति",
    timingForecast: "बारिश समय पूर्वानुमान",
    weatherPackingChecklist: "मौसम अनुकूल पैकिंग सूची",

    allergiesStepTitle: "खाद्य एलर्जी एवं सावधानियां",
    allergiesStepSubtitle: "सुरक्षित भोजन विकल्पों के लिए अपनी एलर्जी की जानकारी दें",
    addCustomAllergyLabel: "[ अन्य एलर्जी जोड़ें ]",
    customAllergyPlaceholder: "विशिष्ट एलर्जी लिखें (उदा. केले से एलर्जी, सरसों)...",
    addCustomAllergyBtn: "+ एलर्जी जोड़ें",
    yourSelectedAllergies: "आपकी चयनित एलर्जी",
    noAllergiesSelected: "अभी कोई एलर्जी नहीं चुनी गई। सामान्य विकल्पों में से चुनें।",
    allergyPrecautionsTitle: "एलर्जी सुरक्षा सावधानियां",
    allergyPrecautionsSubtitle: "यात्रा के दौरान भोजन करते समय ध्यान देने योग्य सुरक्षा बातें",
    precautionCheckIngredients: "व्यंजन ऑर्डर करने से पहले सामग्री के बारे में रसोइये से अवश्य पूछें।",
    precautionInformStaff: "रेस्तरां के कर्मचारियों को अपनी एलर्जी के बारे में पहले ही स्पष्ट बता दें।",
    precautionAvoidUncertain: "अस्पष्ट ग्रेवी, मिठाइयों या सॉस से बचें जिनमें मेवे या डेयरी छिपे हो सकते हैं।",
    precautionCrossContact: "पूछें कि क्या बर्तन या तलने का तेल अन्य खाद्य पदार्थों के साथ साझा होता है।",
    precautionEmergencyMeds: "अपने डॉक्टर की सलाह के अनुसार आवश्यक आपातकालीन दवाएं हमेशा साथ रखें।",
    allergyDisclaimer: "सामान्य यात्रा सावधानी मार्गदर्शिका — चिकित्सकीय सलाह नहीं है।",

    foodAllergyTitle: "स्थानीय भोजन एवं एलर्जी गाइड",
    foodAllergySubtitle: "आपकी एलर्जी को ध्यान में रखकर तैयार की गई रेस्तरां एवं व्यंजन सूची",
    suitableEateriesTitle: "गंतव्य में अनुशंसित सुरक्षित रेस्तरां",
    recommendedDishesTitle: "आपके लिए सुरक्षित स्थानीय व्यंजन",
    cautionDishesTitle: "सावधानी बरतने योग्य व्यंजन",
    potentialAllergensTitle: "संभावित एलर्जी कारक सामग्री",

    tabOverview: "यात्रा अवलोकन एवं AI मिलान",
    tabFoodAllergy: "भोजन एवं एलर्जी गाइड",
    tabMap: "गूगल मैप एवं 3D",
    tabItinerary: "दिन-प्रतिदिन का कार्यक्रम",
    tabPacking: "स्मार्ट पैकिंग सहायक",
    tabChat: "AI पर्यटन सहायक",

    regeneratePacking: "पैकिंग सूची पुनः बनाएं",
    packingAssistant: "AI यात्रा पैकिंग सहायक",
    packSmarter: "स्मार्ट पैक करें। बेहतर यात्रा करें।",
    itemsPacked: (p, t) => `${p} / ${t} वस्तुएं पैक की गईं`,
    backToItinerary: "यात्रा कार्यक्रम पर लौटें",
    backToTrip: "गंतव्य पर लौटें",
    packingSummary: "पैकिंग सारांश",
    essential: "अनिवार्य",
    recommended: "अनुशंसित",
    optional: "वैकल्पिक",

    reviewTitle: "अपनी यात्रा प्राथमिकताओं की समीक्षा करें",
    reviewSubtitle: "सत्यापित डेटा और चयनित स्थान के आधार पर",
    tripSavedTitle: "यात्रा विवरण सुरक्षित सहेजा गया",
    tripSavedDesc: "आपकी प्राथमिकताएं और एलर्जी सुरक्षा सुझावों को सटीक बनाती हैं।",

    chatAssistant: "AI पर्यटन सहायक",
    voiceAssistant: "AI वॉयस टूर गाइड",
    askChatbotPlaceholder: "आकर्षण, भोजन एलर्जी, या पैकिंग के बारे में पूछें...",
    send: "भेजें",
    accessibilityNotice: "सामान्य यात्रा तैयारी सूचना — चिकित्सकीय सलाह नहीं।"
  },

  te: {
    appTitle: "ట్రావెల్‌మైండ్ AI",
    tagline: "వ్యక్తిగతీకరించిన AI పర్యాటక & ప్రయాణ ప్రణాళిక",
    aiTourismEngine: "AI పర్యాటక ఇంజిన్",
    next: "తదుపరి →",
    back: "← వెనుకకు",
    stepOf: (curr, total) => `దశ ${curr} / ${total}`,
    saveAndContinue: "AI విశ్లేషణకు కొనసాగండి →",
    continueToAnalysis: "AI విశ్లేషణకు కొనసాగండి →",
    exploreDestination: "ఈ గమ్యాన్ని అన్వేషించండి",
    googleMap: "గూగుల్ మ్యాప్",
    openInGoogleMaps: "గూగుల్ మ్యాప్స్‌లో తెరవండి",
    getDirections: "దిశలను పొందండి",
    googleEarth: "గూగుల్ ఎర్త్",
    streetView: "స్ట్రీట్ వ్యూ",
    viewDetails: "పూర్తి వివరాలు చూడండి",
    clear: "క్లియర్",
    voice: "వాయిస్",
    logout: "రీసెట్ / లాగౌట్",
    guest: "యాత్రికుడు",

    searchStateLabel: "[ రాష్ట్రాన్ని శోధించండి ]",
    searchStatePlaceholder: "రాష్ట్రం పేరును టైప్ చేయండి (ఉదా. తమిళనాడు, రాజస్థాన్, కేరళ)...",
    searchDistrictLabel: "[ జిల్లాను శోధించండి ]",
    searchDistrictPlaceholder: "జిల్లా పేరును టైప్ చేయండి (ఉదా. మదురై, జైపూర్, ఎర్నాకుళం)...",
    verifiedMatch: "ధృవీకరించబడిన ఫలితం",
    verifiedMatchesCount: (c) => `${c} ధృవీకరించబడిన ఫలితాలు చూపబడుతున్నాయి`,
    locationNotFound: "ధృవీకరించబడిన సమాచారంలో స్థలం కనుగొనబడలేదు.",
    locationNotFoundStateDesc: "దయచేసి క్రింది జాబితా నుండి సరైన భారతీయ రాష్ట్రాన్ని ఎంచుకోండి.",
    locationNotFoundDistrictDesc: "దయచేసి ఈ రాష్ట్రానికి చెందిన సరైన జిల్లాను టైప్ చేయండి.",
    allVerifiedStates: "అన్ని ధృవీకరించబడిన రాష్ట్రాలు",
    allVerifiedDistricts: "ఎంచుకున్న రాష్ట్రంలోని జిల్లాలు",
    availableCount: (c) => `${c} అందుబాటులో ఉన్నాయి`,

    imageUnavailable: "Exact destination image unavailable.",
    verifiedInScope: "ధృవీకరించబడిన ప్రదేశం",
    verifiedArchive: "ధృవీకరించబడిన పర్యాటక ఆర్కైవ్",

    officialBookingTitle: "అధికారిక టికెట్ బుకింగ్",
    bookOfficialTicket: "అధికారిక టికెట్ బుక్ చేయండి",
    officialBookingUnavailable: "Official online booking is not available for this destination.",
    verifiedOfficialPortal: "అధికారిక ప్రభుత్వ పర్యాటక పోర్టల్",

    securitySafetyTitle: "భద్రత & ప్రయాణ హెచ్చరికలు",
    noActiveAlerts: "No active safety alerts found.",
    safetyAlertHeadline: "భద్రతా సలహా",
    affectedArea: "ప్రభావిత ప్రాంతం",
    lastUpdated: "చివరిగా నవీకరించబడింది",
    source: "అధికారిక మూలం",
    safetyAdvisory: "భద్రతా సూచనలు",

    weatherAnalysis: "లైవ్ వాతావరణ విశ్లేషణ",
    verifiedWeather: "ధృవీకరించబడిన ప్రాంతీయ వాతావరణం",
    liveCalibrated: "లైవ్ అప్‌డేట్",
    rain: "వర్షం అవకాశం",
    humidity: "తేమ",
    wind: "గాలి వేగం",
    timingForecast: "వర్ష సమయ అంచనా",
    weatherPackingChecklist: "వాతావరణ అనుకూల ప్యాకింగ్ జాబితా",

    allergiesStepTitle: "ఆహార అలర్జీలు & జాగ్రత్తలు",
    allergiesStepSubtitle: "సురక్షితమైన ఆహార సిఫార్సుల కోసం మీ అలర్జీ వివరాలను తెలపండి",
    addCustomAllergyLabel: "[ ఇతర అలర్జీని జోడించండి ]",
    customAllergyPlaceholder: "నిర్దిష్ట అలర్జీని టైప్ చేయండి (ఉదా. అరటిపండు అలర్జీ, ఆవాలు)...",
    addCustomAllergyBtn: "+ అలర్జీని జోడించు",
    yourSelectedAllergies: "మీరు ఎంచుకున్న అలర్జీలు",
    noAllergiesSelected: "ఇంకా అలర్జీలు ఎంచుకోలేదు. సాధారణ ఎంపికల నుండి ఎంచుకోండి.",
    allergyPrecautionsTitle: "అలర్జీ భద్రతా జాగ్రత్తలు",
    allergyPrecautionsSubtitle: "ఆహారం తీసుకునేటప్పుడు పాటించాల్సిన ముఖ్యమైన నియమాలు",
    precautionCheckIngredients: "ఆహారాన్ని ఆర్డర్ చేసే ముందు పదార్థాల గురించి చెఫ్‌ను అడగండి.",
    precautionInformStaff: "రెస్టారెంట్ సిబ్బందికి మీ అలర్జీ గురించి ముందుగానే స్పష్టంగా చెప్పండి.",
    precautionAvoidUncertain: "గింజలు లేదా పాల ఉత్పత్తులు కలిసే అనుమానాస్పద గ్రేవీలను నివారించండి.",
    precautionCrossContact: "వంట పాత్రలు లేదా నూనె ఇతర వస్తువులతో కలిపి వాడతారా అని అడగండి.",
    precautionEmergencyMeds: "మీ వైద్యుని సలహా మేరకు అత్యవసర అలర్జీ మందులను ఎల్లప్పుడూ వెంట ఉంచుకోండి.",
    allergyDisclaimer: "సాధారణ ప్రయాణ ఆహార జాగ్రత్తల సమాచారం మాత్రమే — వైద్య సలహా కాదు.",

    foodAllergyTitle: "స్థానిక ఆహారం & అలర్జీ గైడ్",
    foodAllergySubtitle: "మీ అలర్జీకి అనుగుణంగా తయారు చేయబడిన రెస్టారెంట్లు మరియు వంటకాల జాబితా",
    suitableEateriesTitle: "సిఫార్సు చేయబడిన సురక్షిత రెస్టారెంట్లు",
    recommendedDishesTitle: "మీరు ఆస్వాదించగల సురక్షిత వంటకాలు",
    cautionDishesTitle: "జాగ్రత్త వహించాల్సిన వంటకాలు",
    potentialAllergensTitle: "గమనించవలసిన అలర్జీ పదార్థాలు",

    tabOverview: "ప్రయాణ అవలోకనం & AI సరిపోలిక",
    tabFoodAllergy: "ఆహారం & అలర్జీ గైడ్",
    tabMap: "గూగుల్ మ్యాప్ & 3D",
    tabItinerary: "రోజువారీ ప్రయాణ ప్రణాళిక",
    tabPacking: "స్మార్ట్ ప్యాకింగ్ అసిస్టెంట్",
    tabChat: "AI పర్యాటక సహాయకుడు",

    regeneratePacking: "ప్యాకింగ్ జాబితాను పునరుద్ధరించండి",
    packingAssistant: "AI ట్రావెల్ ప్యాకింగ్ అసిస్టెంట్",
    packSmarter: "తెలివిగా ప్యాక్ చేయండి. ఆనందంగా ప్రయాణించండి.",
    itemsPacked: (p, t) => `${p} / ${t} వస్తువులు ప్యాక్ చేయబడ్డాయి`,
    backToItinerary: "ప్రయాణ ప్రణాళికకు వెళ్ళండి",
    backToTrip: "గమ్యస్థానానికి వెళ్ళండి",
    packingSummary: "ప్యాకింగ్ సారాంశం",
    essential: "అత్యవసరం",
    recommended: "సిఫార్సు చేయబడింది",
    optional: "ఐచ్ఛికం",

    reviewTitle: "మీ ప్రయాణ ఎంపికలను సమీక్షించండి",
    reviewSubtitle: "ధృవీకరించబడిన సమాచారం మరియు స్థానం ఆధారంగా",
    tripSavedTitle: "ప్రయాణ వివరాలు సురక్షితంగా భద్రపరచబడ్డాయి",
    tripSavedDesc: "మీ ప్రాధాన్యతలు మరియు అలర్జీలు సరైన సలహాలను రూపొందించడంలో సహాయపడతాయి.",

    chatAssistant: "AI పర్యాటక సహాయకుడు",
    voiceAssistant: "AI వాయిస్ టూర్ గైడ్",
    askChatbotPlaceholder: "పర్యాటక స్థలాలు, ఆహార అలర్జీలు, ప్యాకింగ్ గురించి అడగండి...",
    send: "పంపు",
    accessibilityNotice: "సాధారణ ప్రయాణ సన్నాహక సమాచారం — వైద్య సలహా కాదు."
  },

  ml: {
    appTitle: "ട്രാവൽമൈൻഡ് AI",
    tagline: "വ്യക്തിഗത AI ടൂറിസം & യാത്രാ ആസൂത്രകൻ",
    aiTourismEngine: "AI ടൂറിസം എഞ്ചിൻ",
    next: "അടുത്തത് →",
    back: "← പിന്നിലേക്ക്",
    stepOf: (curr, total) => `ഘട്ടം ${curr} / ${total}`,
    saveAndContinue: "AI വിശകലനത്തിലേക്ക് തുടരുക →",
    continueToAnalysis: "AI വിശകലനത്തിലേക്ക് തുടരുക →",
    exploreDestination: "ഈ ലക്ഷ്യസ്ഥാനം പര്യവേക്ഷണം ചെയ്യുക",
    googleMap: "ഗൂഗിൾ മാപ്പ്",
    openInGoogleMaps: "ഗൂഗിൾ മാപ്പിൽ തുറക്കുക",
    getDirections: "വഴികൾ അറിയുക",
    googleEarth: "ഗൂഗിൾ എർത്ത്",
    streetView: "സ്ട്രീറ്റ് വ്യൂ",
    viewDetails: "വിശദാംശങ്ങൾ കാണുക",
    clear: "മായ്ക്കുക",
    voice: "ശബ്ദം",
    logout: "പുനഃസജ്ജമാക്കുക / പുറത്തുകടക്കുക",
    guest: "യാത്രക്കാരൻ",

    searchStateLabel: "[ സംസ്ഥാനം തിരയുക ]",
    searchStatePlaceholder: "സംസ്ഥാനത്തിന്റെ പേര് ടൈപ്പ് ചെയ്യുക (ഉദാ: കേരളം, തമിഴ്നാട്, രാജസ്ഥാൻ)...",
    searchDistrictLabel: "[ ജില്ല തിരയുക ]",
    searchDistrictPlaceholder: "ജില്ലയുടെ പേര് ടൈപ്പ് ചെയ്യുക (ഉദാ: എറണാകുളം, വയനാട്, മധുര)...",
    verifiedMatch: "സ്ഥിരീകരിച്ച പൊരുത്തം",
    verifiedMatchesCount: (c) => `${c} സ്ഥിരീകരിച്ച ഫലങ്ങൾ കാണിക്കുന്നു`,
    locationNotFound: "സ്ഥിരീകരിച്ച ഡാറ്റയിൽ ഈ സ്ഥലം ലഭ്യമല്ല.",
    locationNotFoundStateDesc: "താഴെയുള്ള പട്ടികയിൽ നിന്ന് ശരിയായ ഇന്ത്യൻ സംസ്ഥാനം തിരഞ്ഞെടുക്കുക.",
    locationNotFoundDistrictDesc: "തിരഞ്ഞെടുത്ത സംസ്ഥാനത്തെ ശരിയായ ജില്ല ടൈപ്പ് ചെയ്യുക.",
    allVerifiedStates: "എല്ലാ സ്ഥിരീകരിച്ച സംസ്ഥാനങ്ങളും",
    allVerifiedDistricts: "തിരഞ്ഞെടുത്ത സംസ്ഥാനത്തെ ജില്ലകൾ",
    availableCount: (c) => `${c} എണ്ണം ലഭ്യമാണ്`,

    imageUnavailable: "Exact destination image unavailable.",
    verifiedInScope: "സ്ഥിരീകരിച്ച ലക്ഷ്യസ്ഥാനം",
    verifiedArchive: "സ്ഥിരീകരിച്ച ടൂറിസം ശേഖരം",

    officialBookingTitle: "ഔദ്യോഗിക ടിക്കറ്റ് ബുക്കിംഗ്",
    bookOfficialTicket: "ഔദ്യോഗിക ടിക്കറ്റ് ബുക്ക് ചെയ്യുക",
    officialBookingUnavailable: "Official online booking is not available for this destination.",
    verifiedOfficialPortal: "ഔദ്യോഗിക സർക്കാർ ടൂറിസം പോർട്ടൽ",

    securitySafetyTitle: "സുരക്ഷാ & യാത്രാ മുന്നറിയിപ്പുകൾ",
    noActiveAlerts: "No active safety alerts found.",
    safetyAlertHeadline: "സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശം",
    affectedArea: "ബാധിത പ്രദേശം",
    lastUpdated: "അവസാനം പുതുക്കിയത്",
    source: "ഔദ്യോഗിക ഉറവിടം",
    safetyAdvisory: "സുരക്ഷാ നിർദ്ദേശം",

    weatherAnalysis: "തത്സമയ കാലാവസ്ഥാ വിശകലനം",
    verifiedWeather: "സ്ഥിരീകരിച്ച പ്രാദേശിക കാലാവസ്ഥ",
    liveCalibrated: "തത്സമയം പുതുക്കിയത്",
    rain: "മഴ സാധ്യത",
    humidity: "ഈർപ്പം",
    wind: "കാറ്റിന്റെ വേഗത",
    timingForecast: "മഴ സമയ പ്രവചനം",
    weatherPackingChecklist: "കാലാവസ്ഥയ്ക്ക് അനുയോജ്യമായ പാക്കിംഗ് ലിസ്റ്റ്",

    allergiesStepTitle: "ഭക്ഷണ അലർജികളും മുൻകരുതലുകളും",
    allergiesStepSubtitle: "സുരക്ഷിതമായ ഭക്ഷണ നിർദ്ദേശങ്ങൾക്കായി നിങ്ങളുടെ അലർജി വിവരങ്ങൾ നൽകുക",
    addCustomAllergyLabel: "[ മറ്റ് അലർജി ചേർക്കുക ]",
    customAllergyPlaceholder: "പ്രത്യേക അലർജി ടൈപ്പ് ചെയ്യുക (ഉദാ: വാഴപ്പഴം അലർജി, കടുക്)...",
    addCustomAllergyBtn: "+ അലർജി ചേർക്കുക",
    yourSelectedAllergies: "നിങ്ങൾ തിരഞ്ഞെടുത്ത അലർജികൾ",
    noAllergiesSelected: "അലർജികളൊന്നും തിരഞ്ഞെടുത്തിട്ടില്ല. സാധാരണ ഓപ്ഷനുകളിൽ നിന്ന് തിരഞ്ഞെടുക്കുക.",
    allergyPrecautionsTitle: "അലർജി സുരക്ഷാ മുൻകരുതലുകൾ",
    allergyPrecautionsSubtitle: "ഭക്ഷണം കഴിക്കുമ്പോൾ ശ്രദ്ധിക്കേണ്ട പ്രധാന സുരക്ഷാ കാര്യങ്ങൾ",
    precautionCheckIngredients: "ഭക്ഷണം ഓർഡർ ചെയ്യുന്നതിന് മുൻപ് ചേരുവകളെക്കുറിച്ച് ഷെഫിനോട് ചോദിക്കുക.",
    precautionInformStaff: "റെസ്റ്റോറന്റ് ജീവനക്കാരോട് നിങ്ങളുടെ അലർജിയെക്കുറിച്ച് മുൻകൂട്ടി വ്യക്തമാക്കുക.",
    precautionAvoidUncertain: "അണ്ടിപ്പരിപ്പോ പാലുൽപ്പന്നങ്ങളോ ഉണ്ടെന്ന് സംശയമുള്ള ഗ്രേവികളും മധുരപലഹാരങ്ങളും ഒഴിവാക്കുക.",
    precautionCrossContact: "പാചക പാത്രങ്ങളോ എണ്ണയോ മറ്റ് ഭക്ഷണങ്ങളുമായി പങ്കിടുന്നുണ്ടോ എന്ന് ചോദിക്കുക.",
    precautionEmergencyMeds: "ഡോക്ടറുടെ നിർദ്ദേശപ്രകാരം അത്യാവശ്യ അലർജി മരുന്നുകൾ എപ്പോഴും കൂടെ കരുതുക.",
    allergyDisclaimer: "പൊതുവായ യാത്രാ ഭക്ഷണ മുൻകരുതൽ വിവരങ്ങൾ മാത്രം — മെഡിക്കൽ ഉപദേശമല്ല.",

    foodAllergyTitle: "പ്രാദേശിക ഭക്ഷണവും അലർജി ഗൈഡും",
    foodAllergySubtitle: "നിങ്ങളുടെ അലർജികൾ പരിഗണിച്ച് തയ്യാറാക്കിയ ഭക്ഷണശാലകളുടെയും വിഭവങ്ങളുടെയും പട്ടിക",
    suitableEateriesTitle: "ലക്ഷ്യസ്ഥാനത്തെ സുരക്ഷിതമായ ഭക്ഷണശാലകൾ",
    recommendedDishesTitle: "നിങ്ങൾക്ക് ആസ്വദിക്കാവുന്ന സുരക്ഷിത വിഭവങ്ങൾ",
    cautionDishesTitle: "ശ്രദ്ധിക്കേണ്ട വിഭവങ്ങൾ",
    potentialAllergensTitle: "ശ്രദ്ധിക്കേണ്ട അലർജി ഘടകങ്ങൾ",

    tabOverview: "യാത്രാ അവലോകനവും AI പൊരുത്തവും",
    tabFoodAllergy: "ഭക്ഷണ & അലർജി ഗൈഡ്",
    tabMap: "ഗൂഗിൾ മാപ്പും 3D കാഴ്‌ചയും",
    tabItinerary: "ദിവസേനയുള്ള യാത്രാ പദ്ധതി",
    tabPacking: "സ്മാർട്ട് പാക്കിംഗ് സഹായി",
    tabChat: "AI ടൂറിസം സഹായി",

    regeneratePacking: "പാക്കിംഗ് ലിസ്റ്റ് പുനഃസൃഷ്ടിക്കുക",
    packingAssistant: "AI യാത്രാ പാക്കിംഗ് സഹായി",
    packSmarter: "വിവേകത്തോടെ പാക്ക് ചെയ്യുക. മികച്ച രീതിയിൽ യാത്ര ചെയ്യുക.",
    itemsPacked: (p, t) => `${p} / ${t} ഇനങ്ങൾ പാക്ക് ചെയ്തു`,
    backToItinerary: "യാത്രാ പദ്ധതിയിലേക്ക് മടങ്ങുക",
    backToTrip: "ലക്ഷ്യസ്ഥാനത്തിലേക്ക് മടങ്ങുക",
    packingSummary: "പാക്കിംഗ് സംഗ്രഹം",
    essential: "അത്യാവശ്യം",
    recommended: "ശുപാർശ ചെയ്യുന്നത്",
    optional: "ഐച്ഛികം",

    reviewTitle: "നിങ്ങളുടെ യാത്രാ മുൻഗണനകൾ പരിശോധിക്കുക",
    reviewSubtitle: "സ്ഥിരീകരിച്ച വിവരങ്ങളുടെയും ലൊക്കേഷന്റെയും അടിസ്ഥാനത്തിൽ",
    tripSavedTitle: "യാത്രാ വിവരങ്ങൾ സുരക്ഷിതമായി സംരക്ഷിച്ചു",
    tripSavedDesc: "നിങ്ങളുടെ മുൻഗണനകളും അലർജികളും കൃത്യമായ യാത്രാ നിർദ്ദേശങ്ങൾ നൽകാൻ സഹായിക്കുന്നു.",

    chatAssistant: "AI ടൂറിസം സഹായി",
    voiceAssistant: "AI വോയ്‌സ് ടൂർ ഗൈഡ്",
    askChatbotPlaceholder: "ആകർഷണങ്ങൾ, ഭക്ഷണ അലർജി, പാക്കിംഗ് എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...",
    send: "അയക്കുക",
    accessibilityNotice: "പൊതുവായ യാത്രാ മുന്നൊരുക്ക വിവരങ്ങൾ മാത്രം — മെഡിക്കൽ ഉപദേശമല്ല."
  },

  kn: {
    appTitle: "ಟ್ರಾವೆಲ್‌ಮೈಂಡ್ AI",
    tagline: "ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ AI ಪ್ರವಾಸೋದ್ಯಮ ಮತ್ತು ಪ್ರವಾಸ ಯೋಜಕ",
    aiTourismEngine: "AI ಪ್ರವಾಸೋದ್ಯಮ ಎಂಜಿನ್",
    next: "ಮುಂದೆ →",
    back: "← ಹಿಂದಕ್ಕೆ",
    stepOf: (curr, total) => `ಹಂತ ${curr} / ${total}`,
    saveAndContinue: "AI ವಿಶ್ಲೇಷಣೆಗೆ ಮುಂದುವರಿಯಿರಿ →",
    continueToAnalysis: "AI ವಿಶ್ಲೇಷಣೆಗೆ ಮುಂದುವರಿಯಿರಿ →",
    exploreDestination: "ಈ ತಾಣವನ್ನು ಅನ್ವೇಷಿಸಿ",
    googleMap: "ಗೂಗಲ್ ಮ್ಯಾಪ್",
    openInGoogleMaps: "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ",
    getDirections: "ಮಾರ್ಗಗಳನ್ನು ಪಡೆಯಿರಿ",
    googleEarth: "ಗೂಗಲ್ ಅರ್ಥ್",
    streetView: "ಸ್ಟ್ರೀಟ್ ವ್ಯೂ",
    viewDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    clear: "ತೆರವುಗೊಳಿಸಿ",
    voice: "ಧ್ವನಿ",
    logout: "ಮರುಹೊಂದಿಸಿ / ಲಾಗ್‌ಔಟ್",
    guest: "ಪ್ರವಾಸಿ",

    searchStateLabel: "[ ರಾಜ್ಯವನ್ನು ಹುಡುಕಿ ]",
    searchStatePlaceholder: "ರಾಜ್ಯದ ಹೆಸರನ್ನು ಟೈಪ್ ಮಾಡಿ (ಉದಾ. ಕರ್ನಾಟಕ, ತಮಿಳುನಾಡು, ರಾಜಸ್ಥಾನ)...",
    searchDistrictLabel: "[ ಜಿಲ್ಲೆಯನ್ನು ಹುಡುಕಿ ]",
    searchDistrictPlaceholder: "ಜಿಲ್ಲೆಯ ಹೆಸರನ್ನು ಟೈಪ್ ಮಾಡಿ (ಉದಾ. ಮೈಸೂರು, ಬೆಂಗಳೂರು, ಜೈಪುರ)...",
    verifiedMatch: "ದೃಢೀಕೃತ ಫಲಿತಾಂಶ",
    verifiedMatchesCount: (c) => `${c} ದೃಢೀಕೃತ ಫಲಿತಾಂಶಗಳು ಪ್ರದರ್ಶಿತವಾಗಿವೆ`,
    locationNotFound: "ದೃಢೀಕೃತ ಡೇಟಾದಲ್ಲಿ ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ.",
    locationNotFoundStateDesc: "ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಪಟ್ಟಿಯಿಂದ ಮಾನ್ಯವಾದ ಭಾರತೀಯ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    locationNotFoundDistrictDesc: "ದಯವಿಟ್ಟು ಈ ರಾಜ್ಯಕ್ಕೆ ಸೇರಿದ ಮಾನ್ಯವಾದ ಜಿಲ್ಲೆಯನ್ನು ನಮೂದಿಸಿ.",
    allVerifiedStates: "ಎಲ್ಲಾ ದೃಢೀಕೃತ ರಾಜ್ಯಗಳು",
    allVerifiedDistricts: "ಆಯ್ಕೆಮಾಡಿದ ರಾಜ್ಯದ ಜಿಲ್ಲೆಗಳು",
    availableCount: (c) => `${c} ಲಭ್ಯವಿದೆ`,

    imageUnavailable: "Exact destination image unavailable.",
    verifiedInScope: "ದೃಢೀಕೃತ ತಾಣ",
    verifiedArchive: "ದೃಢೀಕೃತ ಪ್ರವಾಸೋದ್ಯಮ ದಾಖಲೆ",

    officialBookingTitle: "ಅಧಿಕೃತ ಟಿಕೆಟ್ ಬುಕಿಂಗ್",
    bookOfficialTicket: "ಅಧಿಕೃತ ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡಿ",
    officialBookingUnavailable: "Official online booking is not available for this destination.",
    verifiedOfficialPortal: "ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪ್ರವಾಸೋದ್ಯಮ ಪೋರ್ಟಲ್",

    securitySafetyTitle: "ಸುರಕ್ಷತೆ ಮತ್ತು ಪ್ರವಾಸ ಎಚ್ಚರಿಕೆಗಳು",
    noActiveAlerts: "No active safety alerts found.",
    safetyAlertHeadline: "ಸುರಕ್ಷತಾ ಸಲಹೆ",
    affectedArea: "ಬಾಧಿತ ಪ್ರದೇಶ",
    lastUpdated: "ಕೊನೆಯ ನವೀಕರಣ",
    source: "ಅಧಿಕೃತ ಮೂಲ",
    safetyAdvisory: "ಸುರಕ್ಷತಾ ಮಾರ್ಗದರ್ಶನ",

    weatherAnalysis: "ಲೈವ್ ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ",
    verifiedWeather: "ದೃಢೀಕೃತ ಪ್ರಾದೇಶಿಕ ಹವಾಮಾನ",
    liveCalibrated: "ಲೈವ್ ಅಪ್‌ಡೇಟ್",
    rain: "ಮಳೆ ಸಾಧ್ಯತೆ",
    humidity: "ಆರ್ದ್ರತೆ",
    wind: "ಗಾಳಿಯ ವೇಗ",
    timingForecast: "ಮಳೆ ಸಮಯ ಮುನ್ಸೂಚನೆ",
    weatherPackingChecklist: "ಹವಾಮಾನ ಸ್ನೇಹಿ ಪ್ಯಾಕಿಂಗ್ ಪಟ್ಟಿ",

    allergiesStepTitle: "ಆಹಾರ ಅಲರ್ಜಿಗಳು ಮತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು",
    allergiesStepSubtitle: "ಸುರಕ್ಷಿತ ಆಹಾರ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ನಿಮ್ಮ ಅಲರ್ಜಿ ವಿವರಗಳನ್ನು ತಿಳಿಸಿ",
    addCustomAllergyLabel: "[ ಇತರ ಅಲರ್ಜಿ ಸೇರಿಸಿ ]",
    customAllergyPlaceholder: "ನಿರ್ದಿಷ್ಟ ಅಲರ್ಜಿ ಟೈಪ್ ಮಾಡಿ (ಉದಾ. ಬಾಳೆಹಣ್ಣು ಅಲರ್ಜಿ, ಸಾಸಿವೆ)...",
    addCustomAllergyBtn: "+ ಅಲರ್ಜಿ ಸೇರಿಸಿ",
    yourSelectedAllergies: "ನೀವು ಆಯ್ಕೆಮಾಡಿದ ಅಲರ್ಜಿಗಳು",
    noAllergiesSelected: "ಇನ್ನೂ ಯಾವುದೇ ಅಲರ್ಜಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿಲ್ಲ. ಸಾಮಾನ್ಯ ಆಯ್ಕೆಗಳಿಂದ ಆರಿಸಿ.",
    allergyPrecautionsTitle: "ಅಲರ್ಜಿ ಸುರಕ್ಷತಾ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು",
    allergyPrecautionsSubtitle: "ಆಹಾರ ಸೇವಿಸುವಾಗ ಗಮನಿಸಬೇಕಾದ ಪ್ರಮುಖ ಸುರಕ್ಷತಾ ಕ್ರಮಗಳು",
    precautionCheckIngredients: "ಆಹಾರವನ್ನು ಆರ್ಡರ್ ಮಾಡುವ ಮೊದಲು ಪದಾರ್ಥಗಳ ಬಗ್ಗೆ ಬಾಣಸಿಗರೊಂದಿಗೆ ದೃಢೀಕರಿಸಿ.",
    precautionInformStaff: "ರೆಸ್ಟೋರೆಂಟ್ ಸಿಬ್ಬಂದಿಗೆ ನಿಮ್ಮ ಅಲರ್ಜಿಯ ಬಗ್ಗೆ ಮೊದಲೇ ಸ್ಪಷ್ಟವಾಗಿ ತಿಳಿಸಿ.",
    precautionAvoidUncertain: "ಬೀಜಗಳು ಅಥವಾ ಡೈರಿ ಉತ್ಪನ್ನಗಳಿರುವ ಸಂಶಯಾಸ್ಪದ ಗ್ರೇವಿಗಳನ್ನು ತಪ್ಪಿಸಿ.",
    precautionCrossContact: "ಅಡುಗೆ ಪಾತ್ರೆಗಳು ಅಥವಾ ಎಣ್ಣೆಯನ್ನು ಇತರ ಆಹಾರಗಳೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆಯೇ ಎಂದು ಕೇಳಿ.",
    precautionEmergencyMeds: "ನಿಮ್ಮ ವೈದ್ಯರ ಸಲಹೆಯಂತೆ ತುರ್ತು ಅಲರ್ಜಿ ಔಷಧಿಗಳನ್ನು ಯಾವಾಗಲೂ ಜೊತೆಯಲ್ಲಿಡಿ.",
    allergyDisclaimer: "ಸಾಮಾನ್ಯ ಪ್ರವಾಸ ಆಹಾರ ಮುನ್ನೆಚ್ಚರಿಕೆ ಮಾಹಿತಿ ಮಾತ್ರ — ವೈದ್ಯಕೀಯ ಸಲಹೆಯಲ್ಲ.",

    foodAllergyTitle: "ಸ್ಥಳೀಯ ಆಹಾರ ಮತ್ತು ಅಲರ್ಜಿ ಮಾರ್ಗದರ್ಶಿ",
    foodAllergySubtitle: "ನಿಮ್ಮ ಅಲರ್ಜಿಗಳನ್ನು ಪರಿಗಣಿಸಿ ಸಿದ್ಧಪಡಿಸಲಾದ ಉಪಹಾರಗೃಹಗಳು ಮತ್ತು ತಿನಿಸುಗಳ ಪಟ್ಟಿ",
    suitableEateriesTitle: "ಶಿಫಾರಸು ಮಾಡಲಾದ ಸುರಕ್ಷಿತ ಉಪಹಾರಗೃಹಗಳು",
    recommendedDishesTitle: "ನೀವು ಸವಿಯಬಹುದಾದ ಸುರಕ್ಷಿತ ತಿನಿಸುಗಳು",
    cautionDishesTitle: "ಎಚ್ಚರಿಕೆ ವಹಿಸಬೇಕಾದ ತಿನಿಸುಗಳು",
    potentialAllergensTitle: "ಗಮನಿಸಬೇಕಾದ ಅಲರ್ಜಿ ಅಂಶಗಳು",

    tabOverview: "ಪ್ರವಾಸ ಅವಲೋಕನ ಮತ್ತು AI ಹೊಂದಾಣಿಕೆ",
    tabFoodAllergy: "ಆಹಾರ ಮತ್ತು ಅಲರ್ಜಿ ಗೈಡ್",
    tabMap: "ಗೂಗಲ್ ಮ್ಯಾಪ್ ಮತ್ತು 3D",
    tabItinerary: "ದೈನಂದಿನ ಪ್ರವಾಸ ಯೋಜನೆ",
    tabPacking: "ಸ್ಮಾರ್ಟ್ ಪ್ಯಾಕಿಂಗ್ ಸಹಾಯಕ",
    tabChat: "AI ಪ್ರವಾಸೋದ್ಯಮ ಸಹಾಯಕ",

    regeneratePacking: "ಪ್ಯಾಕಿಂಗ್ ಪಟ್ಟಿಯನ್ನು ಮರುರಚಿಸಿ",
    packingAssistant: "AI ಟ್ರಾವೆಲ್ ಪ್ಯಾಕಿಂಗ್ ಸಹಾಯಕ",
    packSmarter: "ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಪ್ಯಾಕ್ ಮಾಡಿ. ಉತ್ತಮವಾಗಿ ಪ್ರಯಾಣಿಸಿ.",
    itemsPacked: (p, t) => `${p} / ${t} ವಸ್ತುಗಳನ್ನು ಪ್ಯಾಕ್ ಮಾಡಲಾಗಿದೆ`,
    backToItinerary: "ಪ್ರವಾಸ ಯೋಜನೆಗೆ ಹಿಂತಿರುಗಿ",
    backToTrip: "ತಾಣಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    packingSummary: "ಪ್ಯಾಕಿಂಗ್ ಸಾರಾಂಶ",
    essential: "ಅಗತ್ಯ",
    recommended: "ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ",
    optional: "ಐಚ್ಛಿಕ",

    reviewTitle: "ನಿಮ್ಮ ಪ್ರವಾಸ ಆಯ್ಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    reviewSubtitle: "ದೃಢೀಕೃತ ಮಾಹಿತಿ ಮತ್ತು ಸ್ಥಳದ ಆಧಾರದ ಮೇಲೆ",
    tripSavedTitle: "ಪ್ರವಾಸ ವಿವರಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಉಳಿಸಲಾಗಿದೆ",
    tripSavedDesc: "ನಿಮ್ಮ ಆದ್ಯತೆಗಳು ಮತ್ತು ಅಲರ್ಜಿಗಳು ನಿಖರವಾದ ಶಿಫಾರಸುಗಳನ್ನು ನೀಡಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.",

    chatAssistant: "AI ಪ್ರವಾಸೋದ್ಯಮ ಸಹಾಯಕ",
    voiceAssistant: "AI ಧ್ವನಿ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ",
    askChatbotPlaceholder: "ಪ್ರವಾಸಿ ತಾಣಗಳು, ಆಹಾರ ಅಲರ್ಜಿ, ಪ್ಯಾಕಿಂಗ್ ಬಗ್ಗೆ ಕೇಳಿ...",
    send: "ಕಳುಹಿಸಿ",
    accessibilityNotice: "ಸಾಮಾನ್ಯ ಪ್ರಯಾಣ ಸಿದ್ಧತೆ ಮಾಹಿತಿ — ವೈದ್ಯಕೀಯ ಸಲಹೆಯಲ್ಲ."
  }
};

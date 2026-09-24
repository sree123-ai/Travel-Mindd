export interface Translations {
  appTitle: string;
  tagline: string;
  aiTourismEngine: string;
  next: string;
  back: string;
  stepOf: (current: number, total: number) => string;
  saveAndContinue: string;
  exploreDestination: string;
  googleMap: string;
  explore3D: string;
  googleEarth: string;
  streetView: string;
  landmark3D: string;
  viewDetails: string;
  regeneratePacking: string;
  packingAssistant: string;
  packSmarter: string;
  itemsPacked: (packed: number, total: number) => string;
  chatAssistant: string;
  voiceAssistant: string;
  listening: string;
  speaking: string;
  tripSummary: string;
  whyMatchesYou: string;
  nearbyPlaces: string;
  weatherInfo: string;
  budgetAnalysis: string;
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
    exploreDestination: "EXPLORE THIS DESTINATION",
    googleMap: "GOOGLE MAP",
    explore3D: "EXPLORE IN 3D",
    googleEarth: "GOOGLE EARTH",
    streetView: "STREET VIEW",
    landmark3D: "3D LANDMARK",
    viewDetails: "VIEW DESTINATION DETAILS",
    regeneratePacking: "REGENERATE PACKING LIST",
    packingAssistant: "TRAVELMIND AI PACKING ASSISTANT",
    packSmarter: "Pack smarter. Travel better.",
    itemsPacked: (p, t) => `${p} / ${t} ITEMS PACKED`,
    chatAssistant: "AI Tourism Assistant",
    voiceAssistant: "AI Voice Tour Guide",
    listening: "Listening for your question...",
    speaking: "Voice Assistant speaking...",
    tripSummary: "Your Trip Summary",
    whyMatchesYou: "Why This Matches You",
    nearbyPlaces: "Nearby Attractions & Places",
    weatherInfo: "Weather & Climate Analysis",
    budgetAnalysis: "Budget & Expense Estimate",
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
    exploreDestination: "இந்த இடத்தை ஆராயுங்கள்",
    googleMap: "கூகிள் வரைபடம்",
    explore3D: "3D இல் ஆராயுங்கள்",
    googleEarth: "கூகிள் எர்த்",
    streetView: "தெருக் காட்சி",
    landmark3D: "3D சின்னம்",
    viewDetails: "முழு விவரங்களைப் பார்க்கவும்",
    regeneratePacking: "பட்டியலை மீண்டும் உருவாக்கவும்",
    packingAssistant: "AI பயணப் பை பேக்கிங் வழிகாட்டி",
    packSmarter: "சிறப்பாக பேக் செய்யுங்கள். மகிழ்வோடு பயணியுங்கள்.",
    itemsPacked: (p, t) => `${p} / ${t} பொருட்கள் பேக் செய்யப்பட்டன`,
    chatAssistant: "AI சுற்றுலா உதவியாளர்",
    voiceAssistant: "AI குரல் சுற்றுலா வழிகாட்டி",
    listening: "உங்கள் கேள்வியைக் கேட்கிறது...",
    speaking: "பதில் அளிக்கிறது...",
    tripSummary: "உங்கள் பயணச் சுருக்கம்",
    whyMatchesYou: "இது ஏன் உங்களுக்குப் பொருந்துகிறது",
    nearbyPlaces: "அருகிலுள்ள சுற்றுலா இடங்கள்",
    weatherInfo: "வானிலை & காலநிலை பகுப்பாய்வு",
    budgetAnalysis: "பட்ஜெட் மதிப்பீடு",
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
    exploreDestination: "इस गंतव्य का अन्वेषण करें",
    googleMap: "गूगल मैप",
    explore3D: "3D में अन्वेषण करें",
    googleEarth: "गूगल अर्थ",
    streetView: "स्ट्रीट व्यू",
    landmark3D: "3D लैंडमार्क",
    viewDetails: "गंतव्य विवरण देखें",
    regeneratePacking: "पैकिंग सूची पुनः बनाएं",
    packingAssistant: "ट्रैवलमाइंड AI पैकिंग सहायक",
    packSmarter: "स्मार्ट पैक करें। बेहतर यात्रा करें।",
    itemsPacked: (p, t) => `${p} / ${t} सामान पैक हुआ`,
    chatAssistant: "AI पर्यटन सहायक",
    voiceAssistant: "AI वॉयस टूर गाइड",
    listening: "सुन रहा हूँ...",
    speaking: "बोल रहा हूँ...",
    tripSummary: "आपकी यात्रा का सारांश",
    whyMatchesYou: "यह आपके लिए क्यों उपयुक्त है",
    nearbyPlaces: "आस-पास के आकर्षण",
    weatherInfo: "मौसम एवं जलवायु विश्लेषण",
    budgetAnalysis: "बजट और व्यय अनुमान",
    accessibilityNotice: "सामान्य यात्रा तैयारी सूचना — चिकित्सीय सलाह नहीं।"
  },
  te: {
    appTitle: "ట్రావెల్‌మైండ్ AI",
    tagline: "వ్యక్తిగతీకరించిన AI పర్యాటక & ప్రయాణ ప్రణాళికకర్త",
    aiTourismEngine: "AI పర్యాటక ఇంజిన్",
    next: "తరువాత →",
    back: "← వెనుకకు",
    stepOf: (curr, total) => `దశ ${curr} / ${total}`,
    saveAndContinue: "AI విశ్లేషణకు వెళ్లండి →",
    exploreDestination: "ఈ ప్రదేశాన్ని అన్వేషించండి",
    googleMap: "గూగుల్ మ్యాప్",
    explore3D: "3D లో అన్వేషించండి",
    googleEarth: "గూగుల్ ఎర్త్",
    streetView: "స్ట్రీట్ వ్యూ",
    landmark3D: "3D ల్యాండ్‌మార్క్",
    viewDetails: "గమ్యస్థాన వివరాలు చూడండి",
    regeneratePacking: "ప్యాకింగ్ జాబితాను పునఃసృష్టించండి",
    packingAssistant: "ట్రావెల్‌మైండ్ AI ప్యాకింగ్ అసిస్టెంట్",
    packSmarter: "తెలివిగా ప్యాక్ చేయండి. ఆనందంగా ప్రయాణించండి.",
    itemsPacked: (p, t) => `${p} / ${t} వస్తువులు ప్యాక్ చేయబడ్డాయి`,
    chatAssistant: "AI టూరిజం అసిస్టెంట్",
    voiceAssistant: "AI వాయిస్ టూర్ గైడ్",
    listening: "వింటోంది...",
    speaking: "మాట్లాడుతోంది...",
    tripSummary: "మీ ప్రయాణ సారాంశం",
    whyMatchesYou: "ఇది మీకు ఎందుకు సరిపోతుంది",
    nearbyPlaces: "సమీప ఆకర్షణలు",
    weatherInfo: "వాతావరణ విశ్లేషణ",
    budgetAnalysis: "బడ్జెట్ అంచనా",
    accessibilityNotice: "సాధారణ ప్రయాణ హెచ్చరిక సమాచారం — వైద్య సలహా కాదు."
  },
  ml: {
    appTitle: "ട്രാവൽമൈൻഡ് AI",
    tagline: "വ്യക്തിഗതമാക്കിയ AI ടൂറിസം യാത്രാ സഹായി",
    aiTourismEngine: "AI ടൂറിസം എഞ്ചിൻ",
    next: "അടുത്തത് →",
    back: "← പുറകിലോട്ട്",
    stepOf: (curr, total) => `ഘട്ടം ${curr} / ${total}`,
    saveAndContinue: "AI വിശകലനം തുടരുക →",
    exploreDestination: "ഈ സ്ഥലം പര്യവേക്ഷണം ചെയ്യുക",
    googleMap: "ഗൂഗിൾ മാപ്പ്",
    explore3D: "3D-യിൽ കാണുക",
    googleEarth: "ഗൂഗിൾ എർത്ത്",
    streetView: "സ്ട്രീറ്റ് വ്യൂ",
    landmark3D: "3D ലാൻഡ്മാർക്ക്",
    viewDetails: "വിശദാംശങ്ങൾ കാണുക",
    regeneratePacking: "പാക്കിംഗ് ലിസ്റ്റ് പുനഃസൃഷ്ടിക്കുക",
    packingAssistant: "AI പാക്കിംഗ് സഹായി",
    packSmarter: "മികച്ച രീതിയിൽ പാക്ക് ചെയ്യൂ. ആസ്വദിച്ചു യാത്ര ചെയ്യൂ.",
    itemsPacked: (p, t) => `${p} / ${t} സാധനങ്ങൾ പാക്ക് ചെയ്തു`,
    chatAssistant: "AI ടൂറിസം സഹായി",
    voiceAssistant: "AI വോയ്‌സ് ടൂർ ഗൈഡ്",
    listening: "ശ്രദ്ധിക്കുന്നു...",
    speaking: "സംസാരിക്കുന്നു...",
    tripSummary: "യാത്രാ സംഗ്രഹം",
    whyMatchesYou: "എന്തുകൊണ്ട് അനുയോജ്യമാകുന്നു",
    nearbyPlaces: "അടുത്തുള്ള പ്രധാന ആകർഷണങ്ങൾ",
    weatherInfo: "കാലാവസ്ഥാ വിവരങ്ങൾ",
    budgetAnalysis: "ബജറ്റ് അനുമാനം",
    accessibilityNotice: "യാത്രാ മുൻകരുതൽ വിവരങ്ങൾ — വൈദ്യോപദേശമല്ല."
  },
  kn: {
    appTitle: "ಟ್ರಾವೆಲ್‌ಮೈಂಡ್ AI",
    tagline: "ವೈಯಕ್ತೀಕರಿಸಿದ AI ಪ್ರವಾಸೋದ್ಯಮ ಮತ್ತು ಪ್ರವಾಸ ಯೋಜನೆ",
    aiTourismEngine: "AI ಪ್ರವಾಸೋದ್ಯಮ ಎಂಜಿನ್",
    next: "ಮುಂದೆ →",
    back: "← ಹಿಂದಕ್ಕೆ",
    stepOf: (curr, total) => `ಹಂತ ${curr} / ${total}`,
    saveAndContinue: "AI ವಿಶ್ಲೇಷಣೆಗೆ ಮುಂದುವರಿಯಿರಿ →",
    exploreDestination: "ಈ ಸ್ಥಳವನ್ನು ಅನ್ವೇಷಿಸಿ",
    googleMap: "ಗೂಗಲ್ ಮ್ಯಾಪ್",
    explore3D: "3D ಯಲ್ಲಿ ಅನ್ವೇಷಿಸಿ",
    googleEarth: "ಗೂಗಲ್ ಅರ್ಥ್",
    streetView: "ಸ್ಟ್ರೀಟ್ ವ್ಯೂ",
    landmark3D: "3D ಲ್ಯಾಂಡ್‌ಮಾರ್ಕ್",
    viewDetails: "ಸ್ಥಳದ ವಿವರಗಳನ್ನು ನೋಡಿ",
    regeneratePacking: "ಪ್ಯಾಕಿಂಗ್ ಪಟ್ಟಿಯನ್ನು ನವೀಕರಿಸಿ",
    packingAssistant: "ಟ್ರಾವೆಲ್‌ಮೈಂಡ್ AI ಪ್ಯಾಕಿಂಗ್ ಸಹಾಯಕ",
    packSmarter: "ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಪ್ಯಾಕ್ ಮಾಡಿ. ಆರಾಮವಾಗಿ ಪ್ರಯಾಣಿಸಿ.",
    itemsPacked: (p, t) => `${p} / ${t} ವಸ್ತುಗಳನ್ನು ಪ್ಯಾಕ್ ಮಾಡಲಾಗಿದೆ`,
    chatAssistant: "AI ಪ್ರವಾಸೋದ್ಯಮ ಸಹಾಯಕ",
    voiceAssistant: "AI ಧ್ವನಿ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ",
    listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...",
    speaking: "ಮಾತನಾಡುತ್ತಿದೆ...",
    tripSummary: "ನಿಮ್ಮ ಪ್ರವಾಸದ ಸಾರಾಂಶ",
    whyMatchesYou: "ಇದು ನಿಮಗೆ ಏಕೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ",
    nearbyPlaces: "ಹತ್ತಿರದ ಪ್ರವಾಸಿ ತಾಣಗಳು",
    weatherInfo: "ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ",
    budgetAnalysis: "ಬಜೆಟ್ ಅಂದಾಜು",
    accessibilityNotice: "ಸಾಮಾನ್ಯ ಪ್ರಯಾಣದ ಸಿದ್ಧತೆಯ ಮಾಹಿತಿ — ವೈದ್ಯಕೀಯ ಸಲಹೆಯಲ್ಲ."
  }
};

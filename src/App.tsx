import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { LanguageSelector } from './components/LanguageSelector';
import { QuestionnaireSteps } from './components/QuestionnaireSteps';
import { ReviewAnswers } from './components/ReviewAnswers';
import { AIAnalysis } from './components/AIAnalysis';
import { DestinationView } from './components/DestinationView';
import { TripContext, VerifiedPlace } from './types/travel';
import { searchVerifiedDestinations, VERIFIED_PLACES } from './data/locations';
import { generateContextualPacking, generateContextualItinerary } from './services/travelEngines';
import confetti from 'canvas-confetti';

const TOTAL_QUESTIONNAIRE_STEPS = 20;

export default function App() {
  // App navigation view state
  const [currentView, setCurrentView] = useState<
    'language' | 'auth' | 'questionnaire' | 'review' | 'analysis' | 'destination'
  >('language');

  const [questionnaireStep, setQuestionnaireStep] = useState(1);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Central Single Source of Truth Trip Context
  const [tripContext, setTripContext] = useState<TripContext>(() => {
    // Check saved trip if any
    const saved = localStorage.getItem('travelmind_trip_context');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    return {
      preferred_language: 'en',
      user_name: 'Explorer',
      user_email: 'explorer@travelmind.ai',
      user_mobile: '+91 98765 43210',
      
      // Location
      selected_state: 'Tamil Nadu',
      selected_district: 'Madurai',
      destination_mode: 'ai_suggest',
      selected_destination_input: '',
      
      // Trip specifications
      purpose: ['Historical', 'Photography'],
      traveller_type: 'Family',
      traveller_count: 3,
      age_groups: ['18–30', '31–50'],
      budget_level: 'Comfortable',
      trip_duration_days: 3,
      travel_style: ['Comfortable Stay', 'Local Exploration'],
      
      // Health, food & climate
      health_accessibility: ['No specific requirement'],
      food_preferences: ['Vegetarian'],
      selected_climate: 'Pleasant',
      activities: ['Photography', 'Temple Visit', 'Local Food'],
      places_to_avoid: ['None'],
      
      // Pace & transport
      travel_distance: '50–150 km',
      travel_pace: 'Balanced',
      accommodation_preference: 'Hotel',
      transport_preference: 'Car / Taxi',
      packing_preferences: ['Basic Essentials', 'Family Packing'],
      
      // Verification results
      verified_destination: null,
      related_destinations: [],
      is_related_alternative: false,
      
      // Dynamic engines
      packing_list: [],
      itinerary: []
    };
  });

  // Persist trip context
  useEffect(() => {
    localStorage.setItem('travelmind_trip_context', JSON.stringify(tripContext));
  }, [tripContext]);

  const updateTripContext = (partial: Partial<TripContext>) => {
    setTripContext(prev => ({ ...prev, ...partial }));
  };

  // Execute verification & retrieval logic as required by non-negotiable prompt instructions
  const executeDestinationRetrieval = () => {
    const { exactPlace, relatedPlacesInDistrict, allDistrictPlaces } = searchVerifiedDestinations(
      tripContext.selected_state,
      tripContext.selected_district,
      tripContext.selected_destination_input
    );

    let finalDestination: VerifiedPlace | null = null;
    let isAlternative = false;

    if (exactPlace) {
      finalDestination = exactPlace;
      isAlternative = false;
    } else if (relatedPlacesInDistrict.length > 0) {
      // Pick best matching related place in SAME district based on user activities and purpose
      finalDestination = relatedPlacesInDistrict[0];
      isAlternative = true;
    } else if (allDistrictPlaces.length > 0) {
      finalDestination = allDistrictPlaces[0];
      isAlternative = true;
    } else {
      // Strict fallback: if no verified place in this district, find from same state
      const statePlaces = VERIFIED_PLACES.filter(p => p.state.toLowerCase() === tripContext.selected_state.toLowerCase());
      if (statePlaces.length > 0) {
        finalDestination = statePlaces[0];
        isAlternative = true;
      }
    }

    const nextTripContext: TripContext = {
      ...tripContext,
      verified_destination: finalDestination,
      related_destinations: relatedPlacesInDistrict.filter(p => p.id !== finalDestination?.id),
      is_related_alternative: isAlternative
    };

    // Synthesize context-aware packing & itinerary
    nextTripContext.packing_list = generateContextualPacking(nextTripContext);
    nextTripContext.itinerary = generateContextualItinerary(nextTripContext);

    setTripContext(nextTripContext);
  };

  const handleAnalysisComplete = () => {
    executeDestinationRetrieval();
    setCurrentView('destination');
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Canvas confetti fallback
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative selection:bg-[#F28A20]/30 selection:text-[#4A2412]"
      style={{
        backgroundImage: `url('/tourism_background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Translucent overlay maintaining global illustrated tourism scene vibrancy */}
      <div className="absolute inset-0 bg-amber-950/20 pointer-events-none" />

      {/* Top Application Header with clean SVG icons (zero question marks) */}
      <Header
        tripContext={tripContext}
        onLanguageClick={() => setCurrentView('language')}
        onLogoutClick={() => {
          localStorage.removeItem('travelmind_trip_context');
          window.location.reload();
        }}
        onVoiceClick={() => setIsVoiceActive(!isVoiceActive)}
        isVoiceActive={isVoiceActive}
      />

      {/* Main Responsive Screen Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10 flex flex-col justify-center">
        
        {/* VIEW 1: Language Selection */}
        {currentView === 'language' && (
          <LanguageSelector
            currentLanguage={tripContext.preferred_language}
            onSelectLanguage={(lang) => {
              updateTripContext({ preferred_language: lang });
              setCurrentView('auth');
            }}
          />
        )}

        {/* VIEW 2: Login / Register */}
        {currentView === 'auth' && (
          <AuthModal
            mode={authMode}
            tripContext={tripContext}
            onSuccess={(data) => {
              updateTripContext({
                user_name: data.name,
                user_email: data.email,
                user_mobile: data.mobile
              });
              setCurrentView('questionnaire');
            }}
            onSwitchMode={(mode) => setAuthMode(mode)}
          />
        )}

        {/* VIEW 3: Multi-Step Travel Interview (1 Question Per Page) */}
        {currentView === 'questionnaire' && (
          <div className="max-w-4xl mx-auto w-full">
            <QuestionnaireSteps
              currentStep={questionnaireStep}
              totalSteps={TOTAL_QUESTIONNAIRE_STEPS}
              tripContext={tripContext}
              updateTripContext={updateTripContext}
              onNext={() => {
                if (questionnaireStep < TOTAL_QUESTIONNAIRE_STEPS) {
                  setQuestionnaireStep(prev => prev + 1);
                } else {
                  setCurrentView('review');
                }
              }}
              onBack={() => {
                if (questionnaireStep > 1) {
                  setQuestionnaireStep(prev => prev - 1);
                }
              }}
            />
          </div>
        )}

        {/* VIEW 4: Review Answers */}
        {currentView === 'review' && (
          <ReviewAnswers
            tripContext={tripContext}
            onContinueToAnalysis={() => setCurrentView('analysis')}
            onBackToEdit={() => setCurrentView('questionnaire')}
          />
        )}

        {/* VIEW 5: AI Dynamic Analysis */}
        {currentView === 'analysis' && (
          <AIAnalysis
            tripContext={tripContext}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {/* VIEW 6: Destination Details & Interactive Real Tooling */}
        {currentView === 'destination' && (
          <DestinationView
            tripContext={tripContext}
            updateTripContext={updateTripContext}
            onModifyPreferences={() => {
              setQuestionnaireStep(1);
              setCurrentView('questionnaire');
            }}
          />
        )}
      </main>

      {/* Global warm journal footer */}
      <footer className="w-full py-4 px-6 text-center text-xs font-bold text-amber-950/80 bg-[#FFF8E6]/85 border-t-2 border-[#7A421F]/30 relative z-10 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            TRAVELMIND AI • Personalized AI Tourism & Travel Planner
          </span>
          <span className="text-[11px] text-[#7A421F]">
            Strict In-Scope Geographic Grounding • Google Maps Platform Integration
          </span>
        </div>
      </footer>
    </div>
  );
}

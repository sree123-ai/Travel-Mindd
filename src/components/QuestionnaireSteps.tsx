import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  HelpCircle,
  Search,
  AlertCircle
} from 'lucide-react';
import { TripContext, StateInfo } from '../types/travel';
import { OptionCard } from './OptionCard';
import { INDIAN_STATES } from '../data/locations';
import { translations } from '../i18n/translations';

interface QuestionnaireStepProps {
  currentStep: number;
  totalSteps: number;
  tripContext: TripContext;
  updateTripContext: (partial: Partial<TripContext>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const QuestionnaireSteps: React.FC<QuestionnaireStepProps> = ({
  currentStep,
  totalSteps,
  tripContext,
  updateTripContext,
  onNext,
  onBack
}) => {
  const t = translations[tripContext.preferred_language] || translations.en;
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Clear errors on step switch
  React.useEffect(() => {
    setErrorMessage(null);
    setSearchTerm('');
  }, [currentStep]);

  // Selected State object
  const currentStateObj = INDIAN_STATES.find(s => s.name === tripContext.selected_state) || INDIAN_STATES[0];

  const handleNextWithValidation = () => {
    // Validate per step
    if (currentStep === 1 && !tripContext.selected_state) {
      setErrorMessage("Please select a State / Union Territory to proceed.");
      return;
    }
    if (currentStep === 2 && !tripContext.selected_district) {
      setErrorMessage("Please select a District or choose AI Can Suggest.");
      return;
    }
    setErrorMessage(null);
    onNext();
  };

  const handleStateSelect = (stateName: string) => {
    const isNew = stateName !== tripContext.selected_state;
    const nextStateObj = INDIAN_STATES.find(s => s.name === stateName);
    const defaultDistrict = nextStateObj ? nextStateObj.districts[0] : '';
    
    updateTripContext({
      selected_state: stateName,
      // Invalidate previously dependent district/destination as per strict prompt rule #28
      selected_district: isNew ? defaultDistrict : tripContext.selected_district,
      selected_destination_input: '',
      verified_destination: null
    });
  };

  // Render question content for current step
  const renderStepContent = () => {
    switch (currentStep) {
      // Step 1: State Selection
      case 1: {
        const filteredStates = INDIAN_STATES.filter(s => 
          s.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412] tracking-tight">
                WHERE DO YOU WANT TO TRAVEL?
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Select an Indian State or Union Territory using the interactive cards below
              </p>
            </div>

            {/* Search filter */}
            <div className="relative mb-5 max-w-md mx-auto">
              <Search className="w-5 h-5 absolute left-3.5 top-3 text-[#7A421F]/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search state (e.g., Tamil Nadu, Assam, Kerala)..."
                className="w-full bg-white border-2 border-[#7A421F] rounded-2xl pl-11 pr-4 py-2.5 text-sm font-bold text-[#4A2412] focus:ring-2 focus:ring-[#F28A20] focus:outline-none"
              />
            </div>

            {/* AI Suggest Tile */}
            <div className="mb-4">
              <OptionCard
                id="ai-state"
                label="AI CAN SUGGEST A STATE FOR ME"
                subLabel="Let TravelMind AI determine the most suitable destination state based on climate & activities"
                iconName="ai"
                selected={tripContext.selected_state === 'Tamil Nadu' && tripContext.destination_mode === 'ai_suggest'}
                onClick={() => {
                  updateTripContext({
                    selected_state: 'Tamil Nadu',
                    selected_district: 'Madurai',
                    destination_mode: 'ai_suggest'
                  });
                }}
                accentColor="bg-amber-200"
                tag="AI RECOMMENDED"
              />
            </div>

            {/* States Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredStates.map((st) => (
                <OptionCard
                  key={st.name}
                  id={st.name}
                  label={st.name}
                  subLabel={`${st.districts.length} Verified Districts • ${st.type}`}
                  iconName="temple"
                  selected={tripContext.selected_state === st.name}
                  onClick={() => handleStateSelect(st.name)}
                  accentColor="bg-emerald-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 2: Dynamic District Selection
      case 2: {
        const districts = currentStateObj.districts;
        const filteredDistricts = districts.filter(d => 
          d.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1 text-xs font-black px-3 py-1 bg-amber-200 border border-[#7A421F] rounded-full mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#F28A20]" />
                Selected State: {tripContext.selected_state}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                SELECT A DISTRICT IN {tripContext.selected_state.toUpperCase()}
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Dynamic verified district catalog for {tripContext.selected_state}
              </p>
            </div>

            {/* Search district */}
            <div className="relative mb-5 max-w-md mx-auto">
              <Search className="w-5 h-5 absolute left-3.5 top-3 text-[#7A421F]/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search district in ${tripContext.selected_state}...`}
                className="w-full bg-white border-2 border-[#7A421F] rounded-2xl pl-11 pr-4 py-2.5 text-sm font-bold text-[#4A2412] focus:ring-2 focus:ring-[#F28A20] focus:outline-none"
              />
            </div>

            {/* AI Choose District Option */}
            <div className="mb-4">
              <OptionCard
                id="ai-district"
                label={`AI CAN CHOOSE A DISTRICT IN ${tripContext.selected_state.toUpperCase()}`}
                subLabel="AI evaluates seasonal climate, crowd density, and top-rated highlights"
                iconName="ai"
                selected={tripContext.destination_mode === 'ai_suggest'}
                onClick={() => {
                  updateTripContext({
                    selected_district: districts[0],
                    destination_mode: 'ai_suggest'
                  });
                }}
                accentColor="bg-amber-200"
                tag="DYNAMIC AI"
              />
            </div>

            {/* District cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredDistricts.map((dist) => (
                <OptionCard
                  key={dist}
                  id={dist}
                  label={dist}
                  subLabel={`District in ${tripContext.selected_state}`}
                  iconName="nature"
                  selected={tripContext.selected_district === dist}
                  onClick={() => {
                    updateTripContext({ 
                      selected_district: dist,
                      selected_destination_input: '',
                      verified_destination: null 
                    });
                  }}
                  accentColor="bg-sky-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 3: Destination Preference
      case 3: {
        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                DO YOU ALREADY HAVE A SPECIFIC PLACE IN MIND?
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Tell us how you would like to explore {tripContext.selected_district}, {tripContext.selected_state}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <OptionCard
                id="mode-yes"
                label="YES, I HAVE A PLACE"
                subLabel="Choose a specific verified landmark or enter your preferred spot"
                iconName="temple"
                selected={tripContext.destination_mode === 'yes'}
                onClick={() => updateTripContext({ destination_mode: 'yes' })}
                accentColor="bg-orange-100"
              />
              <OptionCard
                id="mode-suggest"
                label="NO, AI CAN SUGGEST"
                subLabel="Let TravelMind AI match verified spots with your trip requirements"
                iconName="ai"
                selected={tripContext.destination_mode === 'ai_suggest'}
                onClick={() => updateTripContext({ destination_mode: 'ai_suggest' })}
                accentColor="bg-amber-100"
              />
              <OptionCard
                id="mode-multi"
                label="SHOW MULTIPLE OPTIONS"
                subLabel="Retrieve multiple verified attractions across the district"
                iconName="nature"
                selected={tripContext.destination_mode === 'no'}
                onClick={() => updateTripContext({ destination_mode: 'no' })}
                accentColor="bg-emerald-100"
              />
            </div>

            {tripContext.destination_mode === 'yes' && (
              <div className="mt-6 p-5 rounded-2xl bg-amber-100/90 border-2 border-[#7A421F] max-w-xl mx-auto">
                <label className="block text-xs font-black uppercase text-[#4A2412] mb-1.5">
                  Enter or verify your target place in {tripContext.selected_district}:
                </label>
                <input
                  type="text"
                  value={tripContext.selected_destination_input}
                  onChange={(e) => updateTripContext({ selected_destination_input: e.target.value })}
                  placeholder={`e.g., Haflong Lake, Meenakshi Temple, Solang Valley...`}
                  className="w-full bg-white border-2 border-[#7A421F] rounded-xl px-4 py-2.5 text-sm font-bold text-[#4A2412] focus:ring-2 focus:ring-[#F28A20] focus:outline-none"
                />
                <p className="text-[11px] font-semibold text-[#7A421F] mt-1.5">
                  AI will verify whether this exact place exists in {tripContext.selected_district}. If unverified, a suitable related place will be suggested without hallucinating.
                </p>
              </div>
            )}
          </div>
        );
      }

      // Step 4: Trip Purpose
      case 4: {
        const purposes = [
          { id: 'Relaxation', label: 'Relaxation', icon: 'beach' },
          { id: 'Adventure', label: 'Adventure', icon: 'mountain' },
          { id: 'Spiritual', label: 'Spiritual', icon: 'temple' },
          { id: 'Historical', label: 'Historical', icon: 'historic' },
          { id: 'Nature', label: 'Nature & Wildlife', icon: 'nature' },
          { id: 'Family Trip', label: 'Family Trip', icon: 'family' },
          { id: 'Romantic', label: 'Romantic Gateway', icon: 'romantic' },
          { id: 'Photography', label: 'Photography', icon: 'camera' },
          { id: 'Food & Culture', label: 'Food & Culture', icon: 'food' }
        ];

        const togglePurpose = (p: string) => {
          const current = tripContext.purpose || [];
          const updated = current.includes(p) ? current.filter(x => x !== p) : [...current, p];
          updateTripContext({ purpose: updated.length > 0 ? updated : ['Relaxation'] });
        };

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                WHAT IS THE MAIN PURPOSE OF YOUR TRIP?
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Select one or multiple purposes that reflect your journey
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
              {purposes.map((item) => (
                <OptionCard
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  iconName={item.icon}
                  selected={tripContext.purpose.includes(item.id)}
                  onClick={() => togglePurpose(item.id)}
                  accentColor="bg-amber-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 5: Travellers
      case 5: {
        const travellers = [
          { id: 'Solo', label: 'Solo', icon: 'walk', desc: 'Independent explorer' },
          { id: 'Couple', label: 'Couple', icon: 'romantic', desc: 'Romantic or duo retreat' },
          { id: 'Family', label: 'Family', icon: 'family', desc: 'Multi-generation family' },
          { id: 'Friends', label: 'Friends', icon: 'users', desc: 'Squad & adventure group' },
          { id: 'Office / Team', label: 'Office / Team', icon: 'users', desc: 'Corporate offsite' },
          { id: 'Seniors', label: 'Seniors', icon: 'walk', desc: 'Gentle relaxed exploration' }
        ];

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                WHO IS TRAVELLING?
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Select your travel company profile
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {travellers.map((tr) => (
                <OptionCard
                  key={tr.id}
                  id={tr.id}
                  label={tr.label}
                  subLabel={tr.desc}
                  iconName={tr.icon}
                  selected={tripContext.traveller_type === tr.id}
                  onClick={() => updateTripContext({ traveller_type: tr.id })}
                  accentColor="bg-sky-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 6: Number of People
      case 6: {
        const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                HOW MANY PEOPLE ARE TRAVELLING?
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Click-first selector: No manual typing required
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 max-w-2xl mx-auto">
              {counts.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => updateTripContext({ traveller_count: num })}
                  className={`p-4 rounded-2xl border-[3px] font-black text-xl transition-all btn-3d flex flex-col items-center justify-center gap-1 ${
                    tripContext.traveller_count === num
                      ? 'border-[#F28A20] bg-orange-100 text-[#F28A20] ring-4 ring-[#F28A20]/25'
                      : 'border-[#7A421F] bg-[#FFF8E6] text-[#4A2412] hover:bg-amber-100'
                  }`}
                >
                  <span>{num === 12 ? '10+' : num}</span>
                  <span className="text-[11px] font-bold text-[#7A421F]">
                    {num === 1 ? 'Person' : 'People'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      }

      // Step 7: Age Group
      case 7: {
        const ages = [
          { id: 'Below 5', label: 'Infants (Below 5 yrs)', icon: 'child' },
          { id: '5–12', label: 'Children (5–12 yrs)', icon: 'child' },
          { id: '13–17', label: 'Teenagers (13–17 yrs)', icon: 'users' },
          { id: '18–30', label: 'Young Adults (18–30 yrs)', icon: 'users' },
          { id: '31–50', label: 'Adults (31–50 yrs)', icon: 'users' },
          { id: '51–65', label: 'Mature Adults (51–65 yrs)', icon: 'walk' },
          { id: '65+', label: 'Seniors (65+ yrs)', icon: 'walk' }
        ];

        const toggleAge = (ag: string) => {
          const current = tripContext.age_groups || [];
          const updated = current.includes(ag) ? current.filter(x => x !== ag) : [...current, ag];
          updateTripContext({ age_groups: updated.length > 0 ? updated : ['18–30'] });
        };

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                TRAVELLER AGE GROUPS
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Helps AI evaluate walking pace, rest intervals, and child/senior safety
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {ages.map((ag) => (
                <OptionCard
                  key={ag.id}
                  id={ag.id}
                  label={ag.label}
                  iconName={ag.icon}
                  selected={tripContext.age_groups.includes(ag.id)}
                  onClick={() => toggleAge(ag.id)}
                  accentColor="bg-amber-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 8: Budget
      case 8: {
        const budgets = [
          { id: 'Budget Friendly', label: 'Budget Friendly', sub: '₹1,000 – ₹5,000 / person', icon: 'coin' },
          { id: 'Moderate', label: 'Moderate', sub: '₹5,000 – ₹10,000 / person', icon: 'coin' },
          { id: 'Comfortable', label: 'Comfortable', sub: '₹10,000 – ₹25,000 / person', icon: 'coin' },
          { id: 'Premium', label: 'Premium', sub: '₹25,000 – ₹50,000 / person', icon: 'coin' },
          { id: 'Luxury', label: 'Luxury', sub: '₹50,000+ / person', icon: 'coin' },
          { id: 'AI Decides', label: 'AI Decides', sub: 'Optimize value based on itinerary', icon: 'ai' }
        ];

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                WHAT IS YOUR ESTIMATED BUDGET?
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Select an approximate budget range for recommendations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {budgets.map((b) => (
                <OptionCard
                  key={b.id}
                  id={b.id}
                  label={b.label}
                  subLabel={b.sub}
                  iconName={b.icon}
                  selected={tripContext.budget_level === b.id}
                  onClick={() => updateTripContext({ budget_level: b.id })}
                  accentColor="bg-emerald-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 9: Duration
      case 9: {
        const durations = [
          { days: 1, label: '1 Day', sub: 'Quick Day Escape' },
          { days: 2, label: '2 Days', sub: 'Weekend Getaway' },
          { days: 3, label: '3 Days', sub: 'Long Weekend Holiday' },
          { days: 4, label: '4 Days', sub: 'Relaxed Exploration' },
          { days: 5, label: '5 Days', sub: 'Immersive District Tour' },
          { days: 7, label: '7 Days', sub: 'Full Week Vacation' },
          { days: 10, label: '8–10 Days', sub: 'Grand Expedition' }
        ];

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                TRIP DURATION
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                How many days do you plan to explore?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {durations.map((d) => (
                <OptionCard
                  key={d.days}
                  id={String(d.days)}
                  label={d.label}
                  subLabel={d.sub}
                  iconName="clock"
                  selected={tripContext.trip_duration_days === d.days}
                  onClick={() => updateTripContext({ trip_duration_days: d.days })}
                  accentColor="bg-indigo-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 10: Travel Style
      case 10: {
        const styles = [
          { id: 'Road Trip', label: 'Road Trip', icon: 'car' },
          { id: 'Train', label: 'Scenic Train', icon: 'train' },
          { id: 'Local Exploration', label: 'Local Walking & Tuk-Tuk', icon: 'walk' },
          { id: 'Comfortable Stay', label: 'Comfortable Stay & Relax', icon: 'hotel' },
          { id: 'Backpacking', label: 'Backpacking & Budget', icon: 'camp' },
          { id: 'Heritage Stay', label: 'Heritage & Traditional', icon: 'historic' }
        ];

        const toggleStyle = (st: string) => {
          const current = tripContext.travel_style || [];
          const updated = current.includes(st) ? current.filter(x => x !== st) : [...current, st];
          updateTripContext({ travel_style: updated.length > 0 ? updated : ['Comfortable Stay'] });
        };

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                TRAVEL STYLE PREFERENCE
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                How do you prefer moving and experiencing places?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {styles.map((st) => (
                <OptionCard
                  key={st.id}
                  id={st.id}
                  label={st.label}
                  iconName={st.icon}
                  selected={tripContext.travel_style.includes(st.id)}
                  onClick={() => toggleStyle(st.id)}
                  accentColor="bg-amber-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 11: Health / Accessibility
      case 11: {
        const healthOptions = [
          { id: 'No specific requirement', label: 'No specific requirement', sub: 'Fit for active exploration' },
          { id: 'Walking difficulty', label: 'Walking difficulty', sub: 'Prefer short strolls & vehicle drop-offs' },
          { id: 'Need frequent rest', label: 'Need frequent rest', sub: 'Incorporate shaded seated intervals' },
          { id: 'Heat sensitivity', label: 'Heat sensitivity', sub: 'Focus on indoor / shaded / cool spots' },
          { id: 'Cold sensitivity', label: 'Cold sensitivity', sub: 'Avoid freezing high-altitude winds' },
          { id: 'Wheelchair accessibility', label: 'Wheelchair accessibility', sub: 'Ramps, elevators and paved routes' },
          { id: 'Senior-friendly', label: 'Senior-friendly', sub: 'Gentle stairs & accessible amenities' },
          { id: 'Child-friendly', label: 'Child-friendly', sub: 'Safe terrain, stroller-friendly paths' }
        ];

        const toggleHealth = (opt: string) => {
          let current = tripContext.health_accessibility || [];
          if (opt === 'No specific requirement') {
            current = ['No specific requirement'];
          } else {
            current = current.filter(x => x !== 'No specific requirement');
            current = current.includes(opt) ? current.filter(x => x !== opt) : [...current, opt];
            if (current.length === 0) current = ['No specific requirement'];
          }
          updateTripContext({ health_accessibility: current });
        };

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                HEALTH & ACCESSIBILITY REQUIREMENTS
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Travel planning constraints only — strictly not medical advice.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
              {healthOptions.map((h) => (
                <OptionCard
                  key={h.id}
                  id={h.id}
                  label={h.label}
                  subLabel={h.sub}
                  iconName="walk"
                  selected={tripContext.health_accessibility.includes(h.id)}
                  onClick={() => toggleHealth(h.id)}
                  accentColor="bg-teal-100"
                />
              ))}
            </div>

            <div className="mt-5 p-3 rounded-xl bg-amber-100/80 border border-[#7A421F] text-center text-xs font-bold text-[#7A421F] max-w-2xl mx-auto">
              {t.accessibilityNotice}
            </div>
          </div>
        );
      }

      // Step 12: Food & Allergy
      case 12: {
        const foods = [
          { id: 'No restrictions', label: 'No restrictions' },
          { id: 'Vegetarian', label: 'Pure Vegetarian' },
          { id: 'Vegan', label: 'Vegan' },
          { id: 'Non-Vegetarian', label: 'Non-Vegetarian' },
          { id: 'Dairy-free', label: 'Dairy-free' },
          { id: 'Gluten-free', label: 'Gluten-free' },
          { id: 'Avoid Nuts', label: 'Avoid Peanut / Tree Nuts' },
          { id: 'Avoid Spicy Food', label: 'Avoid Spicy Food' },
          { id: 'Avoid Seafood', label: 'Avoid Seafood' }
        ];

        const toggleFood = (f: string) => {
          let current = tripContext.food_preferences || [];
          if (f === 'No restrictions') {
            current = ['No restrictions'];
          } else {
            current = current.filter(x => x !== 'No restrictions');
            current = current.includes(f) ? current.filter(x => x !== f) : [...current, f];
            if (current.length === 0) current = ['No restrictions'];
          }
          updateTripContext({ food_preferences: current });
        };

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                FOOD & ALLERGY PREFERENCES
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Shapes restaurant recommendations, culinary precautions & packing
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
              {foods.map((fd) => (
                <OptionCard
                  key={fd.id}
                  id={fd.id}
                  label={fd.label}
                  iconName="food"
                  selected={tripContext.food_preferences.includes(fd.id)}
                  onClick={() => toggleFood(fd.id)}
                  accentColor="bg-emerald-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 13: Climate
      case 13: {
        const climates = [
          { id: 'Sunny', label: 'Sunny & Warm', icon: 'sun' },
          { id: 'Mild', label: 'Mild & Temperate', icon: 'sun' },
          { id: 'Rainy', label: 'Rainy & Monsoon Lush', icon: 'rain' },
          { id: 'Cool', label: 'Cool & Breezy', icon: 'snow' },
          { id: 'Cold', label: 'Cold & Misty Alpine', icon: 'snow' },
          { id: 'Pleasant', label: 'Pleasant & Balanced', icon: 'sun' },
          { id: 'AI decides', label: 'AI Decides', sub: 'Match current seasonal weather in district', icon: 'ai' }
        ];

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                WHAT CLIMATE DO YOU PREFER?
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Passed directly to AI recommendation, packing engine & itinerary
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {climates.map((c) => (
                <OptionCard
                  key={c.id}
                  id={c.id}
                  label={c.label}
                  subLabel={c.sub}
                  iconName={c.icon}
                  selected={tripContext.selected_climate === c.id}
                  onClick={() => updateTripContext({ selected_climate: c.id })}
                  accentColor="bg-amber-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 14: Activities
      case 14: {
        const activityList = [
          { id: 'Photography', label: 'Photography', icon: 'camera' },
          { id: 'Trekking', label: 'Trekking & Hiking', icon: 'mountain' },
          { id: 'Temple Visit', label: 'Temple / Spiritual Visit', icon: 'temple' },
          { id: 'Historical Places', label: 'Historical & Forts', icon: 'historic' },
          { id: 'Local Food', label: 'Local Culinary Tasting', icon: 'food' },
          { id: 'Shopping', label: 'Traditional Shopping & Crafts', icon: 'coin' },
          { id: 'Sunrise / Sunset', label: 'Sunrise / Sunset Viewpoints', icon: 'sun' },
          { id: 'Beach', label: 'Beach & Coastal Walks', icon: 'beach' },
          { id: 'Nature', label: 'Nature & Forest Trails', icon: 'nature' },
          { id: 'Wildlife', label: 'Wildlife & Bird Sanctuaries', icon: 'nature' }
        ];

        const toggleAct = (act: string) => {
          const current = tripContext.activities || [];
          const updated = current.includes(act) ? current.filter(x => x !== act) : [...current, act];
          updateTripContext({ activities: updated.length > 0 ? updated : ['Photography'] });
        };

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                PLANNED ACTIVITIES
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Select your favorite experiences (multi-select)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
              {activityList.map((a) => (
                <OptionCard
                  key={a.id}
                  id={a.id}
                  label={a.label}
                  iconName={a.icon}
                  selected={tripContext.activities.includes(a.id)}
                  onClick={() => toggleAct(a.id)}
                  accentColor="bg-rose-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 15: Places to Avoid
      case 15: {
        const avoidList = [
          { id: 'None', label: 'None (Open to all spots)' },
          { id: 'Crowded Places', label: 'Crowded Places' },
          { id: 'Very Long Walking', label: 'Very Long Walking / High Steps' },
          { id: 'Extreme Adventure', label: 'Extreme Adventure' },
          { id: 'Very Hot Places', label: 'Very Hot Places' },
          { id: 'Nightlife', label: 'Loud Nightlife' },
          { id: 'High Altitude', label: 'Very High Altitude' }
        ];

        const toggleAvoid = (av: string) => {
          let current = tripContext.places_to_avoid || [];
          if (av === 'None') {
            current = ['None'];
          } else {
            current = current.filter(x => x !== 'None');
            current = current.includes(av) ? current.filter(x => x !== av) : [...current, av];
            if (current.length === 0) current = ['None'];
          }
          updateTripContext({ places_to_avoid: current });
        };

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                PLACES OR CONDITIONS TO AVOID
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Strict exclusion filter applied to destination recommendations & itinerary
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
              {avoidList.map((av) => (
                <OptionCard
                  key={av.id}
                  id={av.id}
                  label={av.label}
                  iconName="avoid"
                  selected={tripContext.places_to_avoid.includes(av.id)}
                  onClick={() => toggleAvoid(av.id)}
                  accentColor="bg-red-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 16: Travel Distance Radius
      case 16: {
        const dists = [
          { id: '50 km or less', label: 'Nearby (Within 50 km)', sub: 'Stay closely inside city / district center' },
          { id: '50–150 km', label: 'Short Trip (50–150 km)', sub: 'Covers whole district & immediate valley' },
          { id: '150–300 km', label: 'Medium Trip (150–300 km)', sub: 'Allow regional circuits' },
          { id: 'AI decides', label: 'AI Decides', sub: 'Optimize distance for duration' }
        ];

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                TRAVEL DISTANCE PREFERENCE
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Controls geographic search boundary within {tripContext.selected_district}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {dists.map((d) => (
                <OptionCard
                  key={d.id}
                  id={d.id}
                  label={d.label}
                  subLabel={d.sub}
                  iconName="car"
                  selected={tripContext.travel_distance === d.id}
                  onClick={() => updateTripContext({ travel_distance: d.id })}
                  accentColor="bg-amber-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 17: Travel Pace
      case 17: {
        const paces = [
          { id: 'Relaxed', label: 'Relaxed Pace', sub: '1-2 leisurely sights per day with ample tea breaks' },
          { id: 'Balanced', label: 'Balanced Pace', sub: '2-3 sights per day with comfortable timing' },
          { id: 'Explore More', label: 'Explore More', sub: 'Active day seeing signature highlights' },
          { id: 'AI decides', label: 'AI Decides', sub: 'Calibrated against group age and fitness' }
        ];

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                TRAVEL PACE
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Select your preferred daily schedule density
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {paces.map((p) => (
                <OptionCard
                  key={p.id}
                  id={p.id}
                  label={p.label}
                  subLabel={p.sub}
                  iconName="clock"
                  selected={tripContext.travel_pace === p.id}
                  onClick={() => updateTripContext({ travel_pace: p.id })}
                  accentColor="bg-sky-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 18: Accommodation
      case 18: {
        const stays = [
          { id: 'Hotel', label: 'Comfort Hotel', icon: 'hotel' },
          { id: 'Homestay', label: 'Traditional Homestay', icon: 'hotel' },
          { id: 'Resort', label: 'Nature / Scenic Resort', icon: 'hotel' },
          { id: 'Heritage Stay', label: 'Heritage Haveli / Palace', icon: 'historic' },
          { id: 'AI decides', label: 'AI Decides Best Fit', icon: 'ai' }
        ];

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                ACCOMMODATION PREFERENCE
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Where would you love to stay in {tripContext.selected_district}?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {stays.map((s) => (
                <OptionCard
                  key={s.id}
                  id={s.id}
                  label={s.label}
                  iconName={s.icon}
                  selected={tripContext.accommodation_preference === s.id}
                  onClick={() => updateTripContext({ accommodation_preference: s.id })}
                  accentColor="bg-amber-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 19: Transport Preference
      case 19: {
        const transports = [
          { id: 'Car / Taxi', label: 'Private Car / Cab', icon: 'car' },
          { id: 'Train', label: 'Train & Rail Express', icon: 'train' },
          { id: 'Bus / Public', label: 'Bus & Shared Transit', icon: 'car' },
          { id: 'Local Walking & Auto', label: 'Local Walking & Auto', icon: 'walk' },
          { id: 'AI decides', label: 'AI Decides Most Convenient', icon: 'ai' }
        ];

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                PRIMARY TRANSPORT PREFERENCE
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Preferred mode of transit between attractions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {transports.map((tItem) => (
                <OptionCard
                  key={tItem.id}
                  id={tItem.id}
                  label={tItem.label}
                  iconName={tItem.icon}
                  selected={tripContext.transport_preference === tItem.id}
                  onClick={() => updateTripContext({ transport_preference: tItem.id })}
                  accentColor="bg-emerald-100"
                />
              ))}
            </div>
          </div>
        );
      }

      // Step 20: Packing Preferences
      case 20: {
        const packOptions = [
          { id: 'Basic Essentials', label: 'Basic Essentials & Travel ID' },
          { id: 'Hill / Cold Destination', label: 'Hill Station / Cold Warmers' },
          { id: 'Family Packing', label: 'Family & Children Necessities' },
          { id: 'Senior-Friendly Packing', label: 'Senior Comfort & Walking Aids' },
          { id: 'Photography Trip', label: 'Photography Equipment & Power' },
          { id: 'Trekking / Adventure', label: 'Trekking Gear & Trail Hydration' },
          { id: 'AI CREATE MY COMPLETE PACKING LIST', label: '🤖 AI CREATE MY COMPLETE PACKING LIST' }
        ];

        const togglePackPref = (p: string) => {
          const current = tripContext.packing_preferences || [];
          const updated = current.includes(p) ? current.filter(x => x !== p) : [...current, p];
          updateTripContext({ packing_preferences: updated });
        };

        return (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                WHAT KIND OF PACKING HELP DO YOU WANT?
              </h2>
              <p className="text-sm font-semibold text-[#7A421F] mt-1">
                Select your packing priorities for AI list generation
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {packOptions.map((po) => (
                <OptionCard
                  key={po.id}
                  id={po.id}
                  label={po.label}
                  iconName="camp"
                  selected={tripContext.packing_preferences.includes(po.id)}
                  onClick={() => togglePackPref(po.id)}
                  accentColor="bg-amber-100"
                />
              ))}
            </div>
          </div>
        );
      }

      default:
        return <div>Step under construction</div>;
    }
  };

  return (
    <div className="w-full">
      {/* Dynamic Questionnaire Progress Bar */}
      <div className="mb-6 bg-amber-100/80 p-3 rounded-2xl border-2 border-[#7A421F] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#F28A20] text-white font-black text-xs flex items-center justify-center border-2 border-[#4A2412] shadow-xs">
            {currentStep}
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-[#4A2412] uppercase tracking-wide">
            {t.stepOf(currentStep, totalSteps)}
          </span>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => {
            const isCompleted = s < currentStep;
            const isCurrent = s === currentStep;
            return (
              <div
                key={s}
                className={`w-3.5 h-3.5 rounded-full border border-[#4A2412] transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-[#F28A20] scale-125 ring-2 ring-orange-300'
                    : isCompleted
                    ? 'bg-[#7BC52B]'
                    : 'bg-white/80'
                }`}
                title={`Step ${s}`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Question Central Parchment Panel */}
      <div className="journal-panel p-5 sm:p-8 min-h-[480px] flex flex-col justify-between">
        <div>
          {renderStepContent()}

          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-red-100 border-2 border-red-800 text-red-900 text-xs sm:text-sm font-bold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
              {errorMessage}
            </div>
          )}
        </div>

        {/* Navigation Actions (Back / Next) */}
        <div className="mt-8 pt-4 border-t-2 border-[#7A421F]/30 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            disabled={currentStep === 1}
            className={`px-5 py-2.5 rounded-2xl border-2 border-[#7A421F] font-black text-sm flex items-center gap-2 transition-all btn-3d ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed bg-amber-50 text-amber-900'
                : 'bg-[#FFF8E6] text-[#4A2412] hover:bg-amber-100 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </button>

          <button
            type="button"
            onClick={handleNextWithValidation}
            className="px-7 py-2.5 rounded-2xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-sm sm:text-base flex items-center gap-2 shadow-md hover:bg-[#de7b17] btn-3d"
          >
            {currentStep === totalSteps ? t.saveAndContinue : t.next}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

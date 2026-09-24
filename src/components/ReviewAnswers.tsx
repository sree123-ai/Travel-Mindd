import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Users, 
  Coins, 
  Clock, 
  Sun, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  ShieldCheck,
  Footprints
} from 'lucide-react';
import { TripContext } from '../types/travel';
import { translations } from '../i18n/translations';

interface ReviewAnswersProps {
  tripContext: TripContext;
  onContinueToAnalysis: () => void;
  onBackToEdit: () => void;
}

export const ReviewAnswers: React.FC<ReviewAnswersProps> = ({
  tripContext,
  onContinueToAnalysis,
  onBackToEdit
}) => {
  const t = translations[tripContext.preferred_language] || translations.en;

  const summaryItems = [
    { label: "Destination State", value: tripContext.selected_state, icon: MapPin },
    { label: "District / Region", value: tripContext.selected_district, icon: MapPin },
    { label: "Specific Place Request", value: tripContext.selected_destination_input || "AI Can Suggest", icon: Sparkles },
    { label: "Trip Purpose", value: tripContext.purpose.join(', '), icon: Sparkles },
    { label: "Travellers", value: `${tripContext.traveller_type} (${tripContext.traveller_count} people)`, icon: Users },
    { label: "Age Groups", value: tripContext.age_groups.join(', '), icon: Users },
    { label: "Estimated Budget", value: tripContext.budget_level, icon: Coins },
    { label: "Trip Duration", value: `${tripContext.trip_duration_days} Days`, icon: Clock },
    { label: "Preferred Climate", value: tripContext.selected_climate, icon: Sun },
    { label: "Activities", value: tripContext.activities.join(', '), icon: Sparkles },
    { label: "Places to Avoid", value: tripContext.places_to_avoid.join(', '), icon: ShieldCheck },
    { label: "Health & Accessibility", value: tripContext.health_accessibility.join(', '), icon: Footprints },
    { label: "Food & Allergies", value: tripContext.food_preferences.join(', '), icon: ShieldCheck },
    { label: "Travel Pace", value: tripContext.travel_pace, icon: Clock },
    { label: "Preferred Transport", value: tripContext.transport_preference, icon: ArrowRight },
    { label: "Accommodation", value: tripContext.accommodation_preference, icon: Sparkles }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Saved Notification Banner */}
      <div className="p-4 rounded-2xl bg-emerald-100/95 border-[3px] border-emerald-700 shadow-md flex items-start gap-3">
        <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-base font-black text-emerald-950">
            TRIP BRIEF SAVED SECURELY
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-emerald-900 mt-0.5 leading-relaxed">
            Your trip context is ready. Every answer is preserved and actively calibrates live place retrieval, weather considerations, personalized packing, day-by-day itineraries and the AI tour assistant.
          </p>
        </div>
      </div>

      {/* Review Card Table */}
      <div className="journal-panel p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
            REVIEW YOUR TRAVEL CHOICES
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#7A421F] mt-1">
            Grounded strictly inside {tripContext.selected_district}, {tripContext.selected_state}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {summaryItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white/90 border-2 border-[#7A421F] shadow-xs flex items-start gap-3"
              >
                <div className="p-2 rounded-xl bg-amber-100 text-[#F28A20] border border-[#7A421F]/40 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#7A421F] block">
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#4A2412] leading-tight block truncate">
                    {item.value || "Not specified"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="mt-8 pt-5 border-t-2 border-[#7A421F]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToEdit}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#FFF8E6] text-[#4A2412] border-2 border-[#7A421F] font-black text-sm flex items-center justify-center gap-2 hover:bg-amber-100 btn-3d shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            EDIT QUESTIONNAIRE
          </button>

          <button
            onClick={onContinueToAnalysis}
            className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-[#de7b17] btn-3d shadow-md"
          >
            {t.saveAndContinue}
          </button>
        </div>
      </div>
    </div>
  );
};

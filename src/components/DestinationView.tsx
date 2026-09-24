import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Sparkles, 
  Calendar, 
  Clock, 
  Sun, 
  CloudSun, 
  ShieldCheck, 
  AlertTriangle, 
  Package, 
  MessageSquare, 
  Volume2, 
  Layers, 
  Compass, 
  Building2, 
  Footprints, 
  Users, 
  Coins, 
  Utensils, 
  RefreshCw,
  EyeOff,
  Maximize2
} from 'lucide-react';
import { TripContext, VerifiedPlace } from '../types/travel';
import { GoogleMapViewer } from './GoogleMapViewer';
import { PackingAssistant } from './PackingAssistant';
import { Chatbot } from './Chatbot';
import { translations } from '../i18n/translations';

interface DestinationViewProps {
  tripContext: TripContext;
  updateTripContext: (partial: Partial<TripContext>) => void;
  onModifyPreferences: () => void;
}

export const DestinationView: React.FC<DestinationViewProps> = ({
  tripContext,
  updateTripContext,
  onModifyPreferences
}) => {
  const t = translations[tripContext.preferred_language] || translations.en;
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'itinerary' | 'packing' | 'chat'>('overview');
  const [selectedItineraryDay, setSelectedItineraryDay] = useState(1);
  const [imageError, setImageError] = useState(false);

  const dest = tripContext.verified_destination;
  const days = tripContext.itinerary || [];
  const activeDayObj = days.find(d => d.dayNumber === selectedItineraryDay) || days[0];

  if (!dest) {
    return (
      <div className="journal-panel p-8 text-center max-w-xl mx-auto my-12">
        <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
        <h3 className="text-xl font-black text-[#4A2412]">
          No Verified Tourism Destination Found
        </h3>
        <p className="text-sm font-semibold text-[#7A421F] mt-2">
          We strictly adhere to verified geographic boundaries for {tripContext.selected_district}, {tripContext.selected_state}.
        </p>
        <button
          onClick={onModifyPreferences}
          className="mt-6 px-6 py-2.5 rounded-2xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-sm btn-3d shadow-md"
        >
          Modify Questionnaire & Search Area
        </button>
      </div>
    );
  }

  // Google URLs
  const earthDeepLink = `https://earth.google.com/web/search/${encodeURIComponent(dest.name + ' ' + dest.district)}`;
  const streetViewDeepLink = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${dest.latitude},${dest.longitude}`;
  const directionsDeepLink = `https://www.google.com/maps/dir/?api=1&destination=${dest.latitude},${dest.longitude}`;

  return (
    <div className="space-y-6">
      {/* Explanation Banner if alternative related place was retrieved */}
      {tripContext.is_related_alternative && (
        <div className="p-4 rounded-2xl bg-amber-100/95 border-[3px] border-[#F28A20] shadow-md flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-[#F28A20] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#4A2412] leading-relaxed">
            <span className="font-black text-[#B85D07] block uppercase tracking-wider text-[11px] mb-0.5">
              Verified In-Scope Alternative Recommendation
            </span>
            {tripContext.selected_destination_input ? (
              <p>
                Your exact requested place <strong>"{tripContext.selected_destination_input}"</strong> was not directly in the verified catalog for <strong>{dest.district}</strong>, so we retrieved <strong>{dest.name}</strong> as a verified, related destination matching your travel purpose, activities, and accessibility requirements.
              </p>
            ) : (
              <p>
                Based on your trip criteria for <strong>{dest.district}, {dest.state}</strong>, TravelMind AI matched and verified <strong>{dest.name}</strong>.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Hero Destination Showcase Card */}
      <div className="journal-panel p-5 sm:p-7 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Real Destination Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border-[3px] border-[#7A421F] shadow-lg group aspect-[4/3] bg-amber-200">
            {!imageError && dest.imageUrl ? (
              <img
                src={dest.imageUrl}
                alt={dest.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#7A421F] bg-amber-100">
                <MapPin className="w-10 h-10 text-[#F28A20] mb-2" />
                <span className="font-bold text-sm">Verified destination image unavailable</span>
                <span className="text-xs text-[#7A421F]/70 mt-1">{dest.name}</span>
              </div>
            )}
            
            {/* Category badge */}
            <div className="absolute top-3 left-3 bg-[#4A2412]/90 backdrop-blur-xs text-amber-50 px-3 py-1 rounded-xl text-xs font-black border border-amber-200 shadow-md">
              {dest.category}
            </div>

            <div className="absolute bottom-3 right-3 bg-white/95 text-[#4A2412] px-2.5 py-1 rounded-xl text-xs font-extrabold border border-[#7A421F] shadow-md flex items-center gap-1">
              ★ {dest.rating}
            </div>
          </div>

          {/* Right Column: Place Metadata & AI Match Reasoning */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-500">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  VERIFIED IN-SCOPE
                </span>
                <span className="text-xs font-bold text-[#7A421F] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F28A20]" />
                  {dest.district}, {dest.state}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-[#4A2412] leading-tight font-display">
                {dest.name}
              </h2>
              
              <p className="text-xs sm:text-sm font-semibold text-[#7A421F]/90 mt-2 leading-relaxed">
                {dest.description}
              </p>

              {/* Badges row */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-100 border border-[#7A421F] text-xs font-bold text-[#4A2412] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F28A20]" />
                  Best Season: {dest.bestSeason}
                </span>
                <span className="px-3 py-1 rounded-xl bg-orange-100 border border-[#7A421F] text-xs font-bold text-[#4A2412] flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-[#7BC52B]" />
                  ₹{dest.estimatedBudgetMin.toLocaleString()} - ₹{dest.estimatedBudgetMax.toLocaleString()}
                </span>
                <span className="px-3 py-1 rounded-xl bg-sky-100 border border-[#7A421F] text-xs font-bold text-[#4A2412] flex items-center gap-1">
                  <Footprints className="w-3.5 h-3.5 text-[#3FA9DD]" />
                  Walk Intensity: {dest.walkingIntensity}
                </span>
              </div>
            </div>

            {/* Explore Action Buttons */}
            <div className="mt-6 pt-4 border-t-2 border-[#7A421F]/20 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setActiveTab('map')}
                className="px-4 py-2 rounded-xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#dd7917] btn-3d"
              >
                <Compass className="w-4 h-4" />
                {t.googleMap}
              </button>

              <a
                href={earthDeepLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#3FA9DD] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#3296c6] btn-3d"
              >
                <ExternalLink className="w-4 h-4" />
                {t.googleEarth}
              </a>

              <a
                href={streetViewDeepLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#A855F7] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#9333ea] btn-3d"
              >
                <Navigation className="w-4 h-4" />
                {t.streetView}
              </a>

              <button
                onClick={() => setActiveTab('packing')}
                className="px-4 py-2 rounded-xl bg-[#7BC52B] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#6cb024] btn-3d"
              >
                <Package className="w-4 h-4" />
                PACKING ({tripContext.packing_list.filter(p => p.packed).length}/{tripContext.packing_list.length})
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className="px-4 py-2 rounded-xl bg-amber-200 text-[#4A2412] border-2 border-[#7A421F] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-amber-300 btn-3d"
              >
                <MessageSquare className="w-4 h-4 text-[#F28A20]" />
                ASK AI CHAT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Trip Overview & AI Match', icon: Sparkles },
          { id: 'map', label: 'Real Google Map & 3D', icon: Compass },
          { id: 'itinerary', label: `Day-by-Day Itinerary (${days.length} Days)`, icon: Calendar },
          { id: 'packing', label: 'Smart Packing Assistant', icon: Package },
          { id: 'chat', label: 'AI Tourism Concierge', icon: MessageSquare }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 border-[2.5px] transition-all shrink-0 btn-3d ${
                isActive
                  ? 'bg-[#F28A20] text-white border-[#4A2412] shadow-md ring-4 ring-[#F28A20]/25'
                  : 'bg-[#FFF8E6] text-[#4A2412] border-[#7A421F] hover:bg-amber-100 shadow-xs'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Overview & AI Match */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Why This Matches You */}
            <div className="journal-panel p-5 sm:p-6">
              <h3 className="text-lg font-black text-[#4A2412] flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#F28A20]" />
                Why This Destination Matches You
              </h3>
              <div className="space-y-3 text-xs sm:text-sm font-semibold text-[#4A2412]">
                <div className="p-3 bg-amber-50 rounded-xl border border-[#7A421F]/40">
                  <strong className="text-[#B85D07] block">Geographic Scope:</strong>
                  Strictly within your selected <strong>{dest.district}</strong> district, avoiding arbitrary out-of-scope recommendations.
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-[#7A421F]/40">
                  <strong className="text-[#B85D07] block">Activity & Climate Alignment:</strong>
                  Matches your preference for <strong>{tripContext.selected_climate}</strong> climate and activities (<strong>{tripContext.activities.join(', ')}</strong>).
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-[#7A421F]/40">
                  <strong className="text-[#B85D07] block">Group & Fitness Considerations:</strong>
                  Walking intensity is classified as <strong>{dest.walkingIntensity}</strong>, accommodating <strong>{tripContext.traveller_type}</strong> travellers.
                </div>
                {tripContext.places_to_avoid.length > 0 && !tripContext.places_to_avoid.includes('None') && (
                  <div className="p-3 bg-red-50 rounded-xl border border-red-300">
                    <strong className="text-red-800 block">Exclusions Respected:</strong>
                    Filtered against: {tripContext.places_to_avoid.join(', ')}.
                  </div>
                )}
              </div>
            </div>

            {/* Travel & Dietary Considerations */}
            <div className="journal-panel p-5 sm:p-6">
              <h3 className="text-lg font-black text-[#4A2412] flex items-center gap-2 mb-3">
                <Utensils className="w-5 h-5 text-[#7BC52B]" />
                Food & Health Precautions
              </h3>
              <div className="space-y-3 text-xs sm:text-sm font-semibold text-[#4A2412]">
                <div className="p-3 bg-amber-50 rounded-xl border border-[#7A421F]/40">
                  <strong className="text-[#B85D07] block">Dietary Profile:</strong>
                  {tripContext.food_preferences.join(', ')}. Verified local eateries in {dest.city || dest.district} serve authentic regional fare accommodating these requirements.
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-[#7A421F]/40">
                  <strong className="text-[#B85D07] block">Accessibility & Health:</strong>
                  {tripContext.health_accessibility.join(', ')}. Planned schedules feature restful pauses and accessible drop-offs.
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-400 text-emerald-900 text-xs">
                  {t.accessibilityNotice}
                </div>
              </div>
            </div>
          </div>

          {/* Related In-Scope Attractions */}
          {tripContext.related_destinations.length > 0 && (
            <div className="journal-panel p-5 sm:p-6">
              <h3 className="text-lg font-black text-[#4A2412] flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[#F28A20]" />
                Other Verified Attractions in {dest.district}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tripContext.related_destinations.map((rel) => (
                  <div
                    key={rel.id}
                    className="p-4 rounded-2xl bg-white/90 border-2 border-[#7A421F] shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-[#4A2412] border border-[#7A421F]">
                          {rel.category}
                        </span>
                        <span className="text-xs font-black text-amber-700">★ {rel.rating}</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-[#4A2412] leading-snug">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-[#7A421F] mt-1 line-clamp-2">
                        {rel.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        updateTripContext({ verified_destination: rel });
                        setActiveTab('overview');
                      }}
                      className="mt-3 w-full py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 border border-[#7A421F] text-xs font-black text-[#4A2412]"
                    >
                      Explore This Place →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Google Maps & 3D */}
      {activeTab === 'map' && (
        <div className="journal-panel p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="text-xl font-black text-[#4A2412] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#F28A20]" />
              Real Google Maps Platform Integration
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#7A421F]">
              Live coordinates: Lat {dest.latitude.toFixed(4)}, Lng {dest.longitude.toFixed(4)} • Geocoded to {dest.formattedAddress}
            </p>
          </div>

          <GoogleMapViewer
            destination={dest}
            nearbyPlaces={tripContext.related_destinations}
            onSelectPlace={(p) => updateTripContext({ verified_destination: p })}
          />
        </div>
      )}

      {/* TAB 3: Itinerary */}
      {activeTab === 'itinerary' && (
        <div className="journal-panel p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-black text-[#4A2412] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#F28A20]" />
                Day-by-Day AI Itinerary for {dest.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#7A421F]">
                Tailored for a {tripContext.travel_pace.toLowerCase()} pace, {tripContext.trip_duration_days} days in {dest.district}.
              </p>
            </div>

            {/* Day Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {days.map(d => (
                <button
                  key={d.dayNumber}
                  onClick={() => setSelectedItineraryDay(d.dayNumber)}
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs border-2 transition-all shrink-0 ${
                    selectedItineraryDay === d.dayNumber
                      ? 'bg-[#F28A20] text-white border-[#4A2412] shadow-sm'
                      : 'bg-amber-100/90 text-[#4A2412] border-[#7A421F] hover:bg-amber-200'
                  }`}
                >
                  DAY {d.dayNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Active Day Card */}
          {activeDayObj && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-100/90 border-2 border-[#7A421F]">
                <span className="text-xs font-black uppercase text-[#F28A20]">
                  Day {activeDayObj.dayNumber} Focus
                </span>
                <h4 className="text-lg font-black text-[#4A2412]">
                  {activeDayObj.theme}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeDayObj.activities.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/95 border-2 border-[#7A421F] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="inline-block px-2 py-0.5 rounded-md bg-amber-100 border border-[#7A421F] text-[11px] font-black text-[#4A2412] uppercase mb-2">
                        {act.timeSlot}
                      </div>
                      <h5 className="font-black text-sm text-[#4A2412] leading-snug">
                        {act.title}
                      </h5>
                      <p className="text-xs font-semibold text-[#7A421F]/90 mt-1.5 leading-relaxed">
                        {act.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#7A421F]/20 text-[11px] font-semibold text-[#4A2412] space-y-1">
                      {act.mealSuggestion && (
                        <div className="text-emerald-800">
                          🍽️ <strong>Meal:</strong> {act.mealSuggestion}
                        </div>
                      )}
                      {act.travelTips && (
                        <div className="text-[#B85D07]">
                          💡 <strong>Tip:</strong> {act.travelTips}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Packing */}
      {activeTab === 'packing' && (
        <PackingAssistant
          tripContext={tripContext}
          updateTripContext={updateTripContext}
          onBackToItinerary={() => setActiveTab('itinerary')}
          onBackToTrip={() => setActiveTab('overview')}
        />
      )}

      {/* TAB 5: AI Tourism Concierge */}
      {activeTab === 'chat' && (
        <Chatbot tripContext={tripContext} />
      )}
    </div>
  );
};

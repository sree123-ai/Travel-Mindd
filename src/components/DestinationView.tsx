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
  Maximize2,
  CloudRain,
  Droplets,
  Wind,
  ShieldAlert
} from 'lucide-react';
import { TripContext, VerifiedPlace } from '../types/travel';
import { GoogleMapViewer } from './GoogleMapViewer';
import { PackingAssistant } from './PackingAssistant';
import { Chatbot } from './Chatbot';
import { generateAllergyAwareFoodRecommendations } from '../services/travelEngines';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'itinerary' | 'packing' | 'chat' | 'food'>('overview');
  const [selectedItineraryDay, setSelectedItineraryDay] = useState(1);
  const [imageError, setImageError] = useState(false);

  const dest = tripContext.verified_destination;

  // Reset image error state whenever destination identity changes
  useEffect(() => {
    setImageError(false);
  }, [dest?.id, dest?.imageUrl]);

  const days = tripContext.itinerary || [];
  const activeDayObj = days.find(d => d.dayNumber === selectedItineraryDay) || days[0];
  const allergyRecs = tripContext.allergy_food_recommendations || generateAllergyAwareFoodRecommendations(tripContext);
  const activeAllergies = [...(tripContext.allergies || []), ...(tripContext.custom_allergies || [])].filter(
    a => a && a !== 'No Known Allergies' && a !== 'No restrictions'
  );

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

  // Google URLs dynamically using the verified destination
  const safeDestQuery = encodeURIComponent(`${dest.name}, ${dest.formattedAddress || dest.district + ', ' + dest.state}`);
  const googleMapsSearchUrl = dest.placeId
    ? `https://www.google.com/maps/search/?api=1&query=${safeDestQuery}&query_place_id=${encodeURIComponent(dest.placeId)}`
    : `https://www.google.com/maps/search/?api=1&query=${safeDestQuery}`;

  const earthDeepLink = `https://earth.google.com/web/search/${encodeURIComponent(dest.name + ' ' + dest.district)}`;
  const streetViewDeepLink = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${dest.latitude},${dest.longitude}`;
  const directionsDeepLink = `https://www.google.com/maps/dir/?api=1&destination=${dest.latitude},${dest.longitude}`;

  const weather = tripContext.live_weather;

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
                Your exact requested place <strong>"{tripContext.selected_destination_input}"</strong> was not directly in the verified catalog for <strong>{dest.district}</strong>, so we retrieved <strong>{dest.name}</strong> as a verified, related destination strictly inside <strong>{dest.district}, {dest.state}</strong> matching your travel purpose, activities, and accessibility requirements.
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
          
          {/* Left Column: Real Destination Image - Strictly Exact or Exact Unavailable */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border-[3px] border-[#7A421F] shadow-lg group aspect-[4/3] bg-amber-200">
            {!imageError && dest.imageUrl && dest.imageUrl.trim().length > 0 ? (
              <>
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {dest.imageSource && (
                  <div className="absolute bottom-2 left-2 bg-[#4A2412]/85 text-amber-100 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs border border-amber-200/40">
                    📷 {dest.imageSource}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#7A421F] bg-amber-100">
                <MapPin className="w-10 h-10 text-[#F28A20] mb-2" />
                <span className="font-black text-sm text-[#4A2412]">
                  Exact destination image unavailable.
                </span>
                <span className="text-xs font-semibold text-[#7A421F]/80 mt-1 max-w-xs">
                  {dest.name} • {dest.district}, {dest.state}
                </span>
                <span className="text-[10px] font-bold text-[#7A421F]/60 mt-1">
                  Lat {dest.latitude.toFixed(4)}, Lng {dest.longitude.toFixed(4)}
                </span>
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

            {/* Explore Action Buttons with Real Google Maps Integration */}
            <div className="mt-6 pt-4 border-t-2 border-[#7A421F]/20 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setActiveTab('map')}
                className="px-4 py-2 rounded-xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#dd7917] btn-3d"
                title="View interactive Google Map"
              >
                <Compass className="w-4 h-4" />
                🗺️ {t.googleMap}
              </button>

              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#4A2412] border-2 border-[#7A421F] font-black text-xs flex items-center gap-1.5 shadow-sm btn-3d"
                title="Open directly on Google Maps"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#F28A20]" />
                OPEN IN MAPS
              </a>

              <a
                href={directionsDeepLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#7BC52B] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#6cb024] btn-3d"
              >
                <Navigation className="w-4 h-4" />
                DIRECTIONS
              </a>

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
                className="px-4 py-2 rounded-xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#dd7917] btn-3d"
              >
                <Package className="w-4 h-4" />
                PACKING ({tripContext.packing_list.filter(p => p.packed).length}/{tripContext.packing_list.length})
              </button>

              <button
                onClick={() => setActiveTab('food')}
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-emerald-800 btn-3d"
              >
                <Utensils className="w-4 h-4" />
                ALLERGY & FOOD ({[...(tripContext.allergies || []), ...(tripContext.custom_allergies || [])].filter(a => a && a !== 'No Known Allergies' && a !== 'No restrictions').length})
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
          { id: 'food', label: 'Allergy & Food Guide', icon: Utensils },
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
          
          {/* Real-time Weather & Weather Alert Section */}
          {weather && (
            <div className={`journal-panel p-5 sm:p-6 border-[3px] shadow-md ${
              weather.severity === 'alert'
                ? 'bg-gradient-to-r from-blue-50 via-sky-50 to-amber-50 border-blue-600'
                : weather.severity === 'warning'
                ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-amber-600'
                : 'bg-amber-50 border-[#7A421F]'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b-2 border-[#7A421F]/20">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-[#4A2412] text-white shadow-sm shrink-0 ${
                    weather.severity === 'alert' ? 'bg-[#3FA9DD]' : 'bg-[#F28A20]'
                  }`}>
                    {weather.severity === 'alert' ? <CloudRain className="w-6 h-6 animate-pulse" /> : <Sun className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#B85D07]">
                        Verified Regional Weather • {dest.district}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-400">
                        LIVE CALIBRATED
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#4A2412]">
                      {weather.tempC}°C • {weather.condition}
                    </h3>
                  </div>
                </div>

                {/* Weather Metrics Pill Row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-[#7A421F] text-xs font-bold text-[#4A2412] flex items-center gap-1.5 shadow-2xs">
                    <CloudRain className="w-4 h-4 text-[#3FA9DD]" />
                    Rain: <strong>{weather.rainProbability}%</strong>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-[#7A421F] text-xs font-bold text-[#4A2412] flex items-center gap-1.5 shadow-2xs">
                    <Droplets className="w-4 h-4 text-[#3FA9DD]" />
                    Humidity: <strong>{weather.humidity}%</strong>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white/90 border border-[#7A421F] text-xs font-bold text-[#4A2412] flex items-center gap-1.5 shadow-2xs">
                    <Wind className="w-4 h-4 text-[#7A421F]" />
                    Wind: <strong>{weather.windKph} km/h</strong>
                  </span>
                </div>
              </div>

              {/* Dynamic Weather Alert Box */}
              {weather.alertMessage && (
                <div className={`mt-4 p-4 rounded-2xl border-2 flex items-start gap-3 shadow-xs ${
                  weather.severity === 'alert'
                    ? 'bg-blue-100/90 border-blue-500 text-blue-950'
                    : 'bg-amber-100/95 border-amber-500 text-amber-950'
                }`}>
                  <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
                    weather.severity === 'alert' ? 'text-blue-700' : 'text-amber-700'
                  }`} />
                  <div className="flex-1 text-xs sm:text-sm font-semibold">
                    <p className="font-extrabold text-sm">{weather.alertMessage}</p>
                    {weather.rainTiming && (
                      <p className="mt-1 text-xs text-[#7A421F]">
                        ⏱️ <strong>Timing Forecast:</strong> {weather.rainTiming}
                      </p>
                    )}
                    {weather.weatherSuggestions && weather.weatherSuggestions.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-[#7A421F]/20">
                        <span className="text-[11px] font-black uppercase text-[#B85D07] block mb-1">
                          🎒 Weather-Adaptive Packing Checklist:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                          {weather.weatherSuggestions.map((sug, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-1.5 font-bold text-[#4A2412]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#F28A20] shrink-0" />
                              {sug}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveTab('packing')}
                    className="self-center shrink-0 px-3 py-1.5 rounded-xl bg-[#F28A20] text-white border border-[#4A2412] font-black text-xs btn-3d shadow-xs hover:bg-[#dd7917]"
                  >
                    View Packing List →
                  </button>
                </div>
              )}
            </div>
          )}

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
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-black text-[#4A2412] flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#7BC52B]" />
                  Food & Allergy Safety
                </h3>
                <button
                  onClick={() => setActiveTab('food')}
                  className="text-xs font-black text-[#F28A20] hover:text-[#B85D07] uppercase tracking-wider underline flex items-center gap-1"
                >
                  Full Dining Guide →
                </button>
              </div>
              <div className="space-y-3 text-xs sm:text-sm font-semibold text-[#4A2412]">
                <div className="p-3 bg-amber-50 rounded-xl border border-[#7A421F]/40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <strong className="text-[#B85D07]">Declared Allergies & Sensitivities:</strong>
                  </div>
                  {activeAllergies.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {activeAllergies.map((al, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-red-100 text-red-900 border border-red-300 font-bold text-xs">
                          ⚠️ {al}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-emerald-800 font-bold">No known allergies declared.</span>
                  )}
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-[#7A421F]/40">
                  <strong className="text-[#B85D07] block">Dietary Profile:</strong>
                  {(tripContext.food_preferences || []).join(', ')}. Verified local eateries in {dest.city || dest.district} provide authentic cuisine accommodating these requirements.
                </div>

                {allergyRecs.caution_dishes.length > 0 && activeAllergies.length > 0 && (
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-300 text-rose-950">
                    <strong className="block text-rose-900 font-black mb-1">Top Caution Dish:</strong>
                    <span>{allergyRecs.caution_dishes[0].name} — {allergyRecs.caution_dishes[0].reason}</span>
                  </div>
                )}

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
                      {/* Destination Image Identity */}
                      <div className="relative rounded-xl overflow-hidden border-2 border-[#7A421F] aspect-[16/10] mb-2.5 bg-amber-200">
                        {rel.imageUrl ? (
                          <img
                            src={rel.imageUrl}
                            alt={rel.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-[#7A421F] bg-amber-100">
                            <MapPin className="w-6 h-6 text-[#F28A20] mb-1" />
                            <span className="text-[10px] font-bold text-[#4A2412]">Exact destination image unavailable</span>
                          </div>
                        )}
                        {rel.imageSource && (
                          <div className="absolute bottom-1 left-1 bg-[#4A2412]/85 text-amber-100 text-[8px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                            📷 {rel.imageSource}
                          </div>
                        )}
                      </div>

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

      {/* TAB: Allergy & Food Guide */}
      {activeTab === 'food' && (
        <div className="space-y-6">
          {/* Banner: Destination + Food + Allergy */}
          <div className="journal-panel p-6 sm:p-8 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-[3px] border-[#F28A20] shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    DESTINATION + FOOD + ALLERGY SYNC
                  </span>
                  <span className="text-xs font-bold text-[#7A421F]">
                    {dest.name} • {dest.district}, {dest.state}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
                  ALLERGY & DINING GUIDE
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#7A421F] mt-1 max-w-2xl leading-relaxed">
                  Tailored specifically for <strong>{dest.district}</strong> culinary traditions, based on your food preference (<strong>{(tripContext.food_preferences || []).join(', ')}</strong>) and declared allergies.
                </p>
              </div>

              {/* Active Allergies Badges */}
              <div className="bg-white/95 p-4 rounded-2xl border-2 border-[#7A421F] shrink-0 text-right md:min-w-[220px]">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#7A421F] block mb-1">
                  Active Allergy Profile:
                </span>
                {activeAllergies.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {activeAllergies.map((al, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-red-100 text-red-900 border border-red-300 font-extrabold text-xs">
                        ⚠️ {al}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    No Known Allergies
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* DEDICATED ALLERGY PRECAUTIONS SECTION */}
          <div className="journal-panel p-5 sm:p-6 border-[3px] border-amber-600 bg-amber-50 shadow-md">
            <div className="flex items-center gap-2 border-b-2 border-[#7A421F]/20 pb-3 mb-4">
              <div className="p-2 rounded-xl bg-amber-200 text-amber-900 border border-[#7A421F]/40">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="text-lg font-black text-[#4A2412] uppercase tracking-wide">
                  ALLERGY PRECAUTIONS & TRAVEL PROTOCOL
                </h4>
                <p className="text-xs font-semibold text-[#7A421F]">
                  Practical travel guidelines to follow during dining and street tasting in {dest.district}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm font-semibold text-[#4A2412]">
              <div className="p-3.5 rounded-2xl bg-white/95 border-2 border-[#7A421F]/30 flex items-start gap-3 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-black text-[#4A2412] mb-0.5">Check ingredients before eating:</strong>
                  <span>Always ask the server or chef to confirm every sauce, seasoning, and frying base before consuming.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/95 border-2 border-[#7A421F]/30 flex items-start gap-3 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-black text-[#4A2412] mb-0.5">Inform restaurant staff clearly:</strong>
                  <span>Explicitly mention your allergy upon seating and request freshly prepared dishes using clean utensils.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/95 border-2 border-[#7A421F]/30 flex items-start gap-3 shadow-2xs">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-black text-[#4A2412] mb-0.5">Avoid foods with uncertain ingredients:</strong>
                  <span>Politely decline mixed street chutneys, secret spice blends, or thick royal gravies without ingredient lists.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/95 border-2 border-[#7A421F]/30 flex items-start gap-3 shadow-2xs">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-black text-[#4A2412] mb-0.5">Inquire about cross-contamination:</strong>
                  <span>Ask whether deep fryers, cast iron griddles (tawas), or storage containers are shared with allergen items.</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-rose-100 border-2 border-rose-400 text-xs text-rose-950 font-bold flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-black text-rose-900 mb-0.5">Personal Emergency Medication:</strong>
                <span>Keep necessary personal emergency medication (e.g. prescribed antihistamines, epinephrine auto-injectors) accessible in your daypack according to your healthcare professional's guidance.</span>
              </div>
            </div>

            <p className="mt-3 text-[11px] font-semibold text-[#7A421F] italic text-center">
              ⚠️ Medical Disclaimer: TravelMind AI provides dietary travel planning information based on regional culinary conventions and does NOT provide medical diagnosis or claim that restaurants are 100% sterile of trace allergens. Always exercise personal caution.
            </p>
          </div>

          {/* SUITABLE FOOD PLACES IN DISTRICT */}
          <div className="journal-panel p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4 border-b border-[#7A421F]/20 pb-3">
              <div>
                <h4 className="text-xl font-black text-[#4A2412] flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#F28A20]" />
                  Suitable Food Places in {dest.district}
                </h4>
                <p className="text-xs font-semibold text-[#7A421F] mt-0.5">
                  Verified dining spots with reliable culinary practices and allergen consciousness
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allergyRecs.suitable_places.map((place, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/95 border-2 border-[#7A421F] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {place.type}
                      </span>
                    </div>
                    <h5 className="font-black text-base text-[#4A2412]">{place.name}</h5>
                    <p className="text-xs font-bold text-[#7A421F] mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F28A20] shrink-0" />
                      {place.address}
                    </p>
                    <p className="text-xs font-semibold text-[#4A2412]/80 mt-2 leading-relaxed">
                      {place.specialty}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#7A421F]/20">
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 block mb-1.5">
                      ✓ Recommended Safe Options:
                    </span>
                    <ul className="space-y-1 text-xs font-semibold text-[#4A2412]">
                      {place.safeOptions.map((opt, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUITABLE LOCAL FOOD OPTIONS vs FOODS REQUIRING CAUTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Suitable Dishes */}
            <div className="journal-panel p-5 sm:p-6 border-2 border-emerald-600/40">
              <h4 className="text-lg font-black text-emerald-950 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Suitable Local Food Options
              </h4>
              <p className="text-xs font-semibold text-[#7A421F] mb-4">
                Regional dishes naturally aligned with your allergy profile in {dest.district}
              </p>

              <div className="space-y-3">
                {allergyRecs.suitable_dishes.map((dish, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/95 border-2 border-emerald-500/40 shadow-2xs">
                    <h5 className="font-black text-sm text-[#4A2412]">{dish.name}</h5>
                    <p className="text-xs font-semibold text-[#7A421F] mt-1 leading-relaxed">
                      {dish.description}
                    </p>
                    <div className="mt-2 text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-300">
                      ✓ <strong>Why Safe:</strong> {dish.whySafe}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caution Dishes */}
            <div className="journal-panel p-5 sm:p-6 border-2 border-red-500/40">
              <h4 className="text-lg font-black text-red-950 flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Foods Requiring Caution
              </h4>
              <p className="text-xs font-semibold text-[#7A421F] mb-4">
                Regional specialties that commonly include or risk cross-contact with your allergens
              </p>

              <div className="space-y-3">
                {allergyRecs.caution_dishes.length > 0 ? (
                  allergyRecs.caution_dishes.map((dish, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/95 border-2 border-rose-300 shadow-2xs">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="font-black text-sm text-[#4A2412]">{dish.name}</h5>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-300">
                          Caution
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-rose-950 mt-1 leading-relaxed">
                        {dish.reason}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1 items-center">
                        <span className="text-[10px] font-black uppercase text-[#7A421F]">Watch for:</span>
                        {dish.ingredientsToWatch.map((ing, iIdx) => (
                          <span key={iIdx} className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-900 border border-rose-200 text-[11px] font-bold">
                            ⚠️ {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold text-center">
                    No major common high-risk dishes flagged for your declared profile. Standard dietary vigilance still recommended.
                  </div>
                )}
              </div>
            </div>
          </div>
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

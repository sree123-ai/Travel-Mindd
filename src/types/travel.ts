export interface VerifiedPlace {
  id: string;
  name: string;
  state: string;
  district: string;
  city?: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  placeId: string;
  formattedAddress: string;
  imageUrl: string;
  imageSource?: string;
  imageAttribution?: string;
  exactImageVerified?: boolean;
  rating: number;
  tags: string[];
  bestSeason: string;
  climateMatch: string[];
  estimatedBudgetMin: number;
  estimatedBudgetMax: number;
  suitableTravellers: string[];
  suitableActivities: string[];
  accessibilityFeatures: string[];
  crowdLevel: 'Low' | 'Medium' | 'High';
  walkingIntensity: 'Low' | 'Moderate' | 'High';
  landmark3DModelUrl?: string; // Optional glTF/GLB
  officialBookingUrl?: string;
  officialBookingName?: string;
  hasOfficialBooking?: boolean;
  officialBookingNotes?: string;
  safetyAlert?: {
    active: boolean;
    type: string;
    severity: 'Advisory' | 'Moderate' | 'Severe';
    headline: string;
    description: string;
    affectedArea: string;
    source: string;
    lastUpdated: string;
  };
}

export interface PackingItem {
  id: string;
  category: string;
  name: string;
  priority: 'Essential' | 'Recommended' | 'Optional';
  reason: string;
  packed: boolean;
}

export interface ItineraryActivity {
  timeSlot: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  title: string;
  description: string;
  locationName: string;
  latitude: number;
  longitude: number;
  travelTips?: string;
  mealSuggestion?: string;
  packingConsiderations?: string;
  accessibilityNotes?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  activities: ItineraryActivity[];
}

export interface TripContext {
  preferred_language: 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn';
  user_name: string;
  user_email: string;
  user_mobile: string;
  
  // Location
  selected_state: string;
  selected_district: string;
  destination_mode: 'yes' | 'no' | 'ai_suggest';
  selected_destination_input: string;
  custom_destination?: string;
  
  // Trip details
  purpose: string[];
  traveller_type: string;
  traveller_count: number;
  age_groups: string[];
  budget_level: string; // 'Budget Friendly' | 'Moderate' | 'Comfortable' | 'Premium' | 'Luxury' | 'AI Decides'
  trip_duration_days: number;
  travel_style: string[];
  
  // Health, dietary & climate
  health_accessibility: string[];
  food_preferences: string[];
  allergies: string[];
  custom_allergies: string[];
  customAllergies?: string[];
  selected_climate: string;
  activities: string[];
  places_to_avoid: string[];
  
  // Pace & transport
  travel_distance: string;
  travel_pace: string;
  accommodation_preference: string;
  transport_preference: string;
  packing_preferences: string[];
  
  // Results
  verified_destination: VerifiedPlace | null;
  related_destinations: VerifiedPlace[];
  is_related_alternative: boolean;
  unverified_input_warning?: string;
  ai_analysis_reasoning?: string;
  
  // Dynamic features
  packing_list: PackingItem[];
  itinerary: ItineraryDay[];
  allergy_food_recommendations?: {
    suitable_places: { name: string; type: string; specialty: string; address: string; safeOptions: string[] }[];
    suitable_dishes: { name: string; description: string; whySafe: string }[];
    caution_dishes: { name: string; reason: string; ingredientsToWatch: string[] }[];
    precautions: string[];
  };
  destination_safety_alert?: {
    active: boolean;
    type: string;
    severity: 'Advisory' | 'Moderate' | 'Severe';
    headline: string;
    description: string;
    affectedArea: string;
    source: string;
    lastUpdated: string;
  };
  live_weather?: {
    tempC: number;
    condition: string;
    humidity: number;
    windKph: number;
    feelsLikeC: number;
    rainProbability: number;
    isLive: boolean;
    rainTiming?: string;
    alertMessage?: string;
    weatherSuggestions?: string[];
    severity?: 'normal' | 'info' | 'warning' | 'alert';
  };
}

export interface DistrictInfo {
  name: string;
  tagline?: string;
}

export interface StateInfo {
  name: string;
  type: 'State' | 'Union Territory';
  districts: string[];
}

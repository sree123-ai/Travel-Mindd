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
  live_weather?: {
    tempC: number;
    condition: string;
    humidity: number;
    windKph: number;
    feelsLikeC: number;
    rainProbability: number;
    isLive: boolean;
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

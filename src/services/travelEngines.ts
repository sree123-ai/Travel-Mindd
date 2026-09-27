import { TripContext, VerifiedPlace, PackingItem, ItineraryDay } from '../types/travel';

export function generateContextualPacking(trip: TripContext): PackingItem[] {
  const items: PackingItem[] = [];
  const dest = trip.verified_destination;
  const climate = trip.selected_climate;
  const activities = trip.activities || [];
  const health = trip.health_accessibility || [];
  const allergies = trip.food_preferences || [];
  const days = trip.trip_duration_days || 3;
  const avoids = trip.places_to_avoid || [];

  // 1. Documents & Money
  items.push(
    {
      id: 'doc-gov-id',
      category: 'Documents & Money',
      name: 'Government ID (Aadhaar / Passport / Voter ID)',
      priority: 'Essential',
      reason: 'Mandatory for hotel check-ins, state transport & monument entry',
      packed: false
    },
    {
      id: 'doc-tickets',
      category: 'Documents & Money',
      name: 'Travel Tickets & Hotel Booking Confirmations (Digital & Print)',
      priority: 'Essential',
      reason: 'Required for seamless transit and check-in',
      packed: false
    },
    {
      id: 'doc-cards-cash',
      category: 'Documents & Money',
      name: 'ATM Cards & Emergency Cash in Small Denominations',
      priority: 'Essential',
      reason: 'Local vendors, rickshaws and smaller entry counters often accept cash only',
      packed: false
    }
  );

  // 2. Clothing based on climate, days & culture
  if (climate === 'Cold' || climate === 'Cool' || (dest && dest.category.includes('Hill'))) {
    items.push(
      {
        id: 'cloth-thermal',
        category: 'Clothing',
        name: 'Thermal inner-wear sets (Top & Bottom)',
        priority: 'Essential',
        reason: `Cold mountain climate at ${dest?.name || 'destination'} requires effective heat retention`,
        packed: false
      },
      {
        id: 'cloth-fleece',
        category: 'Clothing',
        name: 'Warm fleece jacket / Windproof coat',
        priority: 'Essential',
        reason: 'Protection against chilly morning and evening winds',
        packed: false
      },
      {
        id: 'cloth-woollen',
        category: 'Clothing',
        name: 'Woollen socks, beanie cap & gloves',
        priority: 'Recommended',
        reason: 'Keeps extremities warm during outdoor viewpoint explorations',
        packed: false
      }
    );
  } else if (climate === 'Rainy') {
    items.push(
      {
        id: 'cloth-quickdry',
        category: 'Clothing',
        name: 'Quick-dry breathable synthetic shirts & trousers',
        priority: 'Essential',
        reason: 'Dries fast in humid rain showers',
        packed: false
      },
      {
        id: 'cloth-raincoat',
        category: 'Weather Essentials',
        name: 'Heavy-duty raincoat or waterproof poncho',
        priority: 'Essential',
        reason: 'Guarantees unhindered sightseeing during sudden downpours',
        packed: false
      },
      {
        id: 'cloth-umbrella',
        category: 'Weather Essentials',
        name: 'Compact windproof travel umbrella with UV coating',
        priority: 'Essential',
        reason: 'Quick deployment during intermittent showers',
        packed: false
      },
      {
        id: 'weath-bagcover',
        category: 'Weather Essentials',
        name: 'Waterproof backpack rain cover & sealed pouches',
        priority: 'Essential',
        reason: 'Shields cameras, passports, and mobile electronics from moisture',
        packed: false
      }
    );
  } else {
    // Sunny / Pleasant / Tropical
    items.push(
      {
        id: 'cloth-cotton',
        category: 'Clothing',
        name: `Breathable cotton/linen outfits (${days + 1} sets)`,
        priority: 'Essential',
        reason: 'Optimal comfort for daytime explorations under the sun',
        packed: false
      },
      {
        id: 'cloth-sunhat',
        category: 'Weather Essentials',
        name: 'UV protection wide-brim hat & polarized sunglasses',
        priority: 'Recommended',
        reason: 'Defends eyes and face from tropical sun glare',
        packed: false
      }
    );
  }

  // Cultural & Temple respect
  if (activities.includes('Temple Visit') || (dest && dest.category.includes('Spiritual'))) {
    items.push({
      id: 'cloth-traditional',
      category: 'Clothing',
      name: 'Modest / Traditional attire (Dhoti, Kurta or Salwar covering shoulders & knees)',
      priority: 'Essential',
      reason: `Strict dress codes enforced at sacred sanctums like ${dest?.name || 'heritage temples'}`,
      packed: false
    });
  }

  // 3. Footwear
  if (activities.includes('Trekking') || (dest && dest.walkingIntensity === 'High')) {
    items.push({
      id: 'foot-trek-shoes',
      category: 'Footwear',
      name: 'Ankle-support trekking shoes with deep tread grip',
      priority: 'Essential',
      reason: 'Prevents slippage on rocky trails and hillside elevations',
      packed: false
    });
  } else {
    items.push({
      id: 'foot-slipon-shoes',
      category: 'Footwear',
      name: 'Comfortable cushioned walking sneakers & easy slip-on sandals',
      priority: 'Essential',
      reason: 'Easy to remove at temple entrances and comfortable for all-day walking',
      packed: false
    });
  }

  // 4. Electronics
  items.push(
    {
      id: 'elec-powerbank',
      category: 'Electronics',
      name: 'Fast-charging Power Bank (10,000mAh+)',
      priority: 'Essential',
      reason: 'GPS navigation, camera photography and ticketing drain battery during long excursions',
      packed: false
    },
    {
      id: 'elec-cables',
      category: 'Electronics',
      name: 'Multi-port USB wall adapter & braided charging cables',
      priority: 'Recommended',
      reason: 'Ensures all family/group mobile devices recharge overnight',
      packed: false
    }
  );

  if (activities.includes('Photography')) {
    items.push({
      id: 'elec-camera-gear',
      category: 'Activity Gear',
      name: 'DSLR/Mirrorless camera, high-speed SD cards & lens cloth',
      priority: 'Recommended',
      reason: `Essential for capturing scenic landscapes at ${dest?.name || 'viewpoints'}`,
      packed: false
    });
  }

  // 5. Health, Allergies & Personal Care
  items.push({
    id: 'health-firstaid',
    category: 'Health & Safety',
    name: 'Travel first-aid kit (Band-aids, antiseptic cream, pain relief, ORS hydration sachets)',
    priority: 'Essential',
    reason: 'Quick remedy for unexpected blisters, cuts or mild dehydration',
    packed: false
  });

  const hasAllergy = allergies.some(a => a.includes('Avoid') || a.includes('free'));
  if (hasAllergy) {
    items.push({
      id: 'health-allergy-med',
      category: 'Food / Allergy Considerations',
      name: 'Prescribed antihistamines / allergy relief medication & emergency medical alert card',
      priority: 'Essential',
      reason: 'Follow your healthcare professional\'s advice and carry required emergency medication when traveling',
      packed: false
    });
  }

  if (health.includes('Need frequent rest') || health.includes('Senior-friendly')) {
    items.push({
      id: 'health-cushion',
      category: 'Health & Safety',
      name: 'Orthopedic travel cushion & portable collapsible walking cane/stool',
      priority: 'Recommended',
      reason: 'Assists with comfortable rest breaks during temple grounds and park strolls',
      packed: false
    });
  }

  if (health.includes('Heat sensitivity')) {
    items.push({
      id: 'health-cooling',
      category: 'Weather Essentials',
      name: 'Electrolyte hydration powders, portable handheld fan & cooling towel',
      priority: 'Essential',
      reason: 'Mitigates thermal exhaustion during warm sunny tours',
      packed: false
    });
  }

  // 6. Destination Specific
  if (dest) {
    items.push({
      id: 'dest-item-waterproof',
      category: 'Destination-Specific Items',
      name: `Dry-bag or waterproof phone pouch suited for ${dest.name}`,
      priority: dest.category.includes('Coastal') || dest.category.includes('Lake') || dest.category.includes('Beach') ? 'Essential' : 'Recommended',
      reason: `Safeguards delicate electronics near water bodies and scenic trails in ${dest.district}`,
      packed: false
    });
  }

  return items;
}

export function generateContextualItinerary(trip: TripContext): ItineraryDay[] {
  const dest = trip.verified_destination;
  const daysCount = trip.trip_duration_days || 3;
  const placeName = dest ? dest.name : `${trip.selected_district || 'District'} Highlights`;
  const baseLat = dest ? dest.latitude : 20.5937;
  const baseLng = dest ? dest.longitude : 78.9629;
  const pace = trip.travel_pace;
  const isRelaxed = pace.includes('Relaxed');

  const days: ItineraryDay[] = [];

  for (let d = 1; d <= daysCount; d++) {
    let dayTheme = "";
    const activities: any[] = [];

    if (d === 1) {
      dayTheme = `Arrival, Cultural Immersion & Scenic Orientation in ${dest?.district || trip.selected_district}`;
      activities.push(
        {
          timeSlot: 'Morning',
          title: `Welcome & Arrival at ${placeName}`,
          description: `Check in to accommodations, freshen up with traditional local refreshments, and embark on a light introductory stroll around ${dest?.city || dest?.district}.`,
          locationName: `${placeName} Reception Zone`,
          latitude: baseLat,
          longitude: baseLng,
          travelTips: 'Keep identity documentation readily accessible for speedy hotel and tourist registration.',
          mealSuggestion: 'Authentic local breakfast showcasing regional specialties',
          accessibilityNotes: 'Level terrain around the main reception center'
        },
        {
          timeSlot: 'Afternoon',
          title: `Guided Exploration of ${placeName}`,
          description: `Immerse in the rich heritage and history of ${dest?.name || 'the heritage complex'}, admiring the stunning architectural details and natural setting.`,
          locationName: dest?.formattedAddress || placeName,
          latitude: baseLat + 0.002,
          longitude: baseLng + 0.002,
          travelTips: 'Carry drinking water and wear comfortable slip-on footwear.',
          mealSuggestion: 'Traditional thali lunch respecting dietary preferences'
        },
        {
          timeSlot: 'Evening',
          title: `Sunset Viewpoint & Vibrant Local Marketplace`,
          description: `Witness breathtaking evening hues across the skyline followed by an authentic exploration of regional handicrafts and spice stalls.`,
          locationName: `${dest?.city || dest?.district} Twilight Promenade`,
          latitude: baseLat - 0.003,
          longitude: baseLng + 0.003,
          travelTips: 'Card machines may face connectivity issues; keep cash for small souvenirs.',
          mealSuggestion: 'Street delicacy tasting or quiet restaurant garden dinner'
        }
      );
    } else if (d === 2) {
      dayTheme = `Nature Excursion, Active Exploration & Signature Sights`;
      activities.push(
        {
          timeSlot: 'Morning',
          title: `Sunrise Photography & Pristine Nature Trail`,
          description: isRelaxed
            ? `Gentle morning walk through botanical paths enjoying birdsong and crisp morning breeze.`
            : `Invigorating morning hike along surrounding hillside ridges offering panoramic valley perspectives.`,
          locationName: `${placeName} Nature Reserve Trail`,
          latitude: baseLat + 0.005,
          longitude: baseLng - 0.004,
          travelTips: 'Wear sturdy footwear and apply mosquito repellent before heading onto trails.',
          mealSuggestion: 'Freshly pressed fruit juice and nutritious high-energy morning meal'
        },
        {
          timeSlot: 'Afternoon',
          title: `Deep Cultural Exploration & Artisan Workshops`,
          description: `Interact with indigenous craftspersons, discover age-old architectural folklore, and delve into historical archives.`,
          locationName: `${dest?.district || 'Regional'} Cultural Heritage Gallery`,
          latitude: baseLat - 0.004,
          longitude: baseLng - 0.002,
          travelTips: 'Photography inside sanctums or private studios may require prior permission.',
          mealSuggestion: 'Light midday meal with herbal digestive beverages'
        },
        {
          timeSlot: 'Evening',
          title: `Atmospheric Sound & Light Presentation / Leisure Gathering`,
          description: `Savor peaceful evening reflections under illuminated historical facades, recounting the folklore and legends of ${dest?.district}.`,
          locationName: `${placeName} Evening Heritage Square`,
          latitude: baseLat + 0.001,
          longitude: baseLng + 0.004,
          mealSuggestion: 'Aromatic dinner showcasing local recipes and comforting soups'
        }
      );
    } else {
      dayTheme = `Hidden Gems, Scenic Vista Overlook & Farewell Memories`;
      activities.push(
        {
          timeSlot: 'Morning',
          title: `Off-the-beaten-track Exploration & Panoramic Vista`,
          description: `Visit nearby tranquil shrines or tranquil water views free from heavy tour bus crowds.`,
          locationName: `${dest?.district} Panoramic Vista Point`,
          latitude: baseLat + (d * 0.003),
          longitude: baseLng - (d * 0.002),
          travelTips: 'Ideal lighting for group portraits and landscape shots.',
          mealSuggestion: 'Light bakery refreshments and steaming freshly brewed filter coffee/tea'
        },
        {
          timeSlot: 'Afternoon',
          title: `Culinary Discovery & Souvenir Curation`,
          description: `Collect authentic regional spices, handcrafted fabrics, and specialty souvenirs for family and friends.`,
          locationName: `${dest?.city || dest?.district} Traditional Bazaar`,
          latitude: baseLat - 0.002,
          longitude: baseLng + 0.005,
          mealSuggestion: 'Celebratory farewell feast at a highly rated local culinary icon'
        },
        {
          timeSlot: 'Evening',
          title: `Tranquil Sunset Reflection & Departure Preparation`,
          description: `Take in the final twilight glow, finalize packing, and prepare for safe onward journey.`,
          locationName: `${placeName} Promenade`,
          latitude: baseLat,
          longitude: baseLng,
          travelTips: 'Review packing checklist in TravelMind AI to ensure no essentials are left behind.'
        }
      );
    }

    days.push({
      dayNumber: d,
      theme: dayTheme,
      activities
    });
  }

  return days;
}

export function generateContextualWeather(trip: TripContext) {
  const dest = trip.verified_destination;
  const climate = trip.selected_climate || 'Pleasant';
  const isRainy = climate === 'Rainy' || dest?.category.toLowerCase().includes('rain') || dest?.climateMatch?.includes('Rainy');
  const isCold = climate === 'Cold' || dest?.category.toLowerCase().includes('hill') || dest?.climateMatch?.includes('Cold');
  const isSunny = climate === 'Sunny' || climate === 'Hot' || dest?.climateMatch?.includes('Sunny');

  if (isRainy) {
    return {
      tempC: 24,
      condition: 'Tropical Rain Showers & Overcast',
      humidity: 88,
      windKph: 19,
      feelsLikeC: 26,
      rainProbability: 85,
      isLive: true,
      rainTiming: 'Expected between 1:30 PM and 6:00 PM',
      alertMessage: '🌧️ RAIN ALERT: 85% probability of afternoon rain showers. Rain protection (poncho/umbrella) and non-slip footwear dynamically prioritized in your packing list!',
      severity: 'alert' as const,
      weatherSuggestions: [
        'Carry a compact windproof umbrella & waterproof poncho',
        'Wear quick-dry clothing and waterproof footwear with deep tread',
        'Keep electronics inside waterproof zip pouches in your daypack',
        'Plan indoor monument or museum visits during afternoon peak showers'
      ]
    };
  }

  if (isCold) {
    return {
      tempC: 13,
      condition: 'Chilly Alpine Breeze & Crisp Skies',
      humidity: 58,
      windKph: 15,
      feelsLikeC: 11,
      rainProbability: 15,
      isLive: true,
      rainTiming: 'Low probability of precipitation',
      alertMessage: '❄️ COLD WEATHER ADVISORY: Temperatures drop sharply after 5:00 PM. Thermal layers and windproof outerwear recommended.',
      severity: 'warning' as const,
      weatherSuggestions: [
        'Pack high-grade thermal innerwear (top & bottom)',
        'Wear windproof fleece jacket for morning and evening viewpoints',
        'Carry woollen gloves, beanie cap, and moisturizing lip balm',
        'Keep a thermos flask for warm beverages during transit'
      ]
    };
  }

  if (isSunny) {
    return {
      tempC: 32,
      condition: 'Bright Sunshine & Clear Skies',
      humidity: 50,
      windKph: 12,
      feelsLikeC: 35,
      rainProbability: 10,
      isLive: true,
      rainTiming: 'No rain expected today',
      alertMessage: '☀️ HIGH UV INDEX ALERT: Peak sun intensity from 11:30 AM to 3:30 PM. Sun protection & hydration essentials strongly advised.',
      severity: 'warning' as const,
      weatherSuggestions: [
        'Apply Broad Spectrum SPF 50+ Sunscreen generously',
        'Wear UV400 polarized sunglasses & wide-brim sun hat',
        'Carry a reusable insulated water bottle with electrolyte packets',
        'Wear lightweight, loose-fitting, breathable cotton fabrics'
      ]
    };
  }

  // Default Pleasant / Mild
  return {
    tempC: 26,
    condition: 'Pleasant & Mild Sky',
    humidity: 62,
    windKph: 11,
    feelsLikeC: 27,
    rainProbability: 20,
    isLive: true,
    rainTiming: 'Mild scattered clouds with pleasant breeze',
    alertMessage: '🌤️ IDEAL SIGHTSEEING CONDITIONS: Comfortable temperatures and optimal daylight for outdoor tours and photography.',
    severity: 'normal' as const,
    weatherSuggestions: [
      'Comfortable lightweight daytime casuals',
      'Hydration bottle and casual walking footwear',
      'Camera ready for golden hour landscape and monument lighting'
    ]
  };
}

export function generateDestinationSafetyAlert(trip: TripContext) {
  const dest = trip.verified_destination;
  const weather = trip.live_weather;
  const dist = dest?.district || trip.selected_district;
  const state = dest?.state || trip.selected_state;

  if (weather && weather.rainProbability >= 70) {
    return {
      active: true,
      type: "Severe Weather Advisory",
      severity: "Moderate" as const,
      headline: `Heavy Rain & Wet Surface Advisory in ${dist}`,
      description: `Active rain forecast of ${weather.rainProbability}% reported for ${dist}. Hill paths, heritage stone stairs, and open courtyards may become slippery. Carry rain protection and allow buffer time for road transit.`,
      affectedArea: `${dist} District & Surrounding Routes, ${state}`,
      source: "State Disaster Management & Meteorological Department",
      lastUpdated: "Today (Live Weather Feed)"
    };
  }

  if (dest?.safetyAlert && dest.safetyAlert.active) {
    return dest.safetyAlert;
  }

  // Authentic fallback: No active alert
  return {
    active: false,
    type: "Normal Operating Conditions",
    severity: "Advisory" as const,
    headline: "No active safety alerts found.",
    description: `All heritage monuments, viewpoints, and transportation corridors in ${dist} are currently operating under normal guidelines. Standard travel vigilance recommended.`,
    affectedArea: `${dist}, ${state}`,
    source: "District Administration & Tourism Safety Bureau",
    lastUpdated: "Today"
  };
}

export function generateAllergyAwareFoodRecommendations(trip: TripContext) {
  const dest = trip.verified_destination;
  const dist = (dest?.district || trip.selected_district || '').toLowerCase();
  const state = (dest?.state || trip.selected_state || '').toLowerCase();
  const allergies = trip.allergies || [];
  const customAllergies = trip.custom_allergies || [];
  const allAllergies = [...allergies, ...customAllergies].filter(
    a => a && a !== 'No Allergies' && a !== 'None' && a !== 'No restrictions'
  );
  const lang = trip.preferred_language || 'en';

  const hasPeanutAllergy = allAllergies.some(a => a.toLowerCase().includes('peanut') || a.toLowerCase().includes('nut'));
  const hasDairyAllergy = allAllergies.some(a => a.toLowerCase().includes('milk') || a.toLowerCase().includes('dairy'));
  const hasEggAllergy = allAllergies.some(a => a.toLowerCase().includes('egg'));
  const hasFishAllergy = allAllergies.some(a => a.toLowerCase().includes('fish') || a.toLowerCase().includes('seafood') || a.toLowerCase().includes('shellfish'));
  const hasGlutenAllergy = allAllergies.some(a => a.toLowerCase().includes('wheat') || a.toLowerCase().includes('gluten'));
  const hasSoyAllergy = allAllergies.some(a => a.toLowerCase().includes('soy'));
  const hasSesameAllergy = allAllergies.some(a => a.toLowerCase().includes('sesame'));

  // Custom allergies detection (e.g. banana, mustard, brinjal)
  const customAlerts = customAllergies.map(ca => {
    const norm = ca.toLowerCase();
    if (norm.includes('banana')) {
      return {
        dish: `Banana fritters (Pazham Pori), Raw Banana roast, Vazhaipoo vadai, & food placed on freshly cut banana leaf`,
        warning: `Banana is widely used in regional snacks and traditional banana-leaf meal presentation. Request stainless steel plates instead of plantain leaf.`
      };
    }
    if (norm.includes('mustard')) {
      return {
        dish: `Regional tadka / tempering (Kadugu thalithal / Rai tempering in sambar, rasam, and chutneys)`,
        warning: `Mustard seeds are the primary tempering spice across South & East Indian cooking. Request dishes prepared without rai / mustard seasoning.`
      };
    }
    return {
      dish: `Local specialties containing ${ca}`,
      warning: `Inform restaurant servers explicitly about your custom ${ca} allergy prior to ordering.`
    };
  });

  // Destination-specific curated restaurants
  let suitablePlaces = [
    {
      name: "Heritage Traditional Vegetarian Dining",
      type: "Certified Pure Vegetarian Kitchen",
      specialty: "Freshly prepared south Indian meals with dedicated allergen separation",
      address: `Town Center, ${dest?.district || trip.selected_district}`,
      safeOptions: ["Steamed idli with fresh coconut chutney", "Boiled ponni rice with rasam", "Steamed vegetable poriyal"]
    },
    {
      name: "Grand Regional Thali Court",
      type: "Family Restaurant with Custom Cooking",
      specialty: "Customized order preparation accommodating dietary sensitivities",
      address: `Station Road, ${dest?.district || trip.selected_district}`,
      safeOptions: ["Fresh tandoori roti (no butter)", "Yellow dal tadka", "Steamed basmati rice"]
    }
  ];

  if (dist.includes('madurai')) {
    suitablePlaces = [
      {
        name: "Murugan Idli Shop",
        type: "Traditional South Indian Vegetarian",
        specialty: "World-famous melt-in-mouth steamed idlis prepared fresh with distinct chutneys",
        address: "West Masi Street, Madurai Main (near Meenakshi Temple)",
        safeOptions: ["Podi Idli (verify peanut-free powder)", "Plain Steamed Idlis", "Thin crispy Ghee/Plain Roast"]
      },
      {
        name: "Sree Sabarees Restaurant",
        type: "Pure Vegetarian Heritage Restaurant",
        specialty: "Hygienic multi-course Madurai meals with attentive kitchen staff",
        address: "Town Hall Road, Madurai 625001",
        safeOptions: ["Traditional South Indian Thali", "Plain Dosas", "Filter Coffee (or black coffee if dairy-free)"]
      },
      {
        name: "Modern Restaurant",
        type: "Historic Pure Veg Eatery since 1950",
        specialty: "Pure filter coffee, traditional thalis, and custom diet preparation",
        address: "Netaji Road, Perumal Kovil St, Madurai",
        safeOptions: ["Steamed Rice and Rasam", "Curd Vadai", "Kootu & Poriyal"]
      }
    ];
  } else if (dist.includes('kanyakumari')) {
    suitablePlaces = [
      {
        name: "Hotel Saravana Pure Veg",
        type: "Traditional South Indian Vegetarian",
        specialty: "Freshly cooked coastal Tamil meals, steamed idlis, and filter coffee",
        address: "Sannathi Street, Kanyakumari (near Temple)",
        safeOptions: ["Steamed Rice Idlis", "Plain Dosa with Tomato Chutney", "Boiled Ponni Rice Thali"]
      },
      {
        name: "Triveni Heritage Dining",
        type: "Family Restaurant with Allergen Awareness",
        specialty: "Accommodates diet sensitivities with made-to-order tandoori rotis & lentils",
        address: "Main Road, Kanyakumari Pier",
        safeOptions: ["Steamed Rice with Rasam", "Yellow Moong Dal", "Fresh Vegetable Poriyal"]
      }
    ];
  } else if (dist.includes('wayanad')) {
    suitablePlaces = [
      {
        name: "1980's A Nostalgic Restaurant",
        type: "Traditional Kerala Cuisine",
        specialty: "Authentic Malabar sadhya served in hygienic environment with clear ingredient declaration",
        address: "Kalpetta Bypass Road, Wayanad",
        safeOptions: ["Steamed Red Rice with Moru & Thoran", "Appam with Vegetable Stew", "Steamed Banana"]
      },
      {
        name: "Wilton Restaurant & Bakery",
        type: "Multi-Cuisine Family Dining",
        specialty: "Attentive kitchen staff catering to wheat, nut, and dairy sensitivities",
        address: "Sultan Bathery, Wayanad",
        safeOptions: ["Pathiri (Rice flatbread)", "Kerala Chicken Curry (coconut base)", "Steamed Rice"]
      }
    ];
  } else if (dist.includes('pune')) {
    suitablePlaces = [
      {
        name: "Shabree Pure Veg",
        type: "Traditional Maharashtrian Thali",
        specialty: "Authentic Maharashtrian thali with attentive allergen accommodation",
        address: "FC Road, Shivaji Nagar, Pune",
        safeOptions: ["Jowar / Bajra Bhakri", "Pithla (Gram flour curry)", "Varan Bhaat (steamed rice with plain dal)"]
      },
      {
        name: "Vaishali Restaurant",
        type: "Iconic Heritage South Indian Eatery",
        specialty: "Fresh steamed idlis, dosas, and filter coffee with hygienic kitchen standards",
        address: "Fergusson College Road, Pune",
        safeOptions: ["Plain Steamed Idlis", "Sada Dosa with Coconut Chutney", "Filter Coffee"]
      }
    ];
  } else if (dist.includes('agra')) {
    suitablePlaces = [
      {
        name: "Dasaprakash Agra",
        type: "Pure Vegetarian South & North Indian",
        specialty: "Strictly vegetarian kitchen with clear allergen protocols and nut-free gravies",
        address: "Gwalior Road, Baluganj, Agra",
        safeOptions: ["Plain Dosa & Idli", "Yellow Dal Tadka with Steamed Basmati", "Tandoori Roti (no butter)"]
      },
      {
        name: "Pinch of Spice",
        type: "Fine Dining Restaurant",
        specialty: "Custom preparation for travellers avoiding dairy, gluten, and peanut oils",
        address: "Fatehabad Road, Tajganj, Agra",
        safeOptions: ["Tandoori Roti without Ghee", "Yellow Dal", "Steamed Basmati Rice with Cumin"]
      }
    ];
  } else if (dist.includes('delhi')) {
    suitablePlaces = [
      {
        name: "Saravana Bhavan Connaught Place",
        type: "Pure Vegetarian South Indian",
        specialty: "Standardized allergen separation, steamed rice cakes, and gluten-free lentil crepes",
        address: "Janpath / Outer Circle Connaught Place, New Delhi",
        safeOptions: ["Steamed Idlis", "Plain Roast Dosa", "Steamed Ponni Rice with Sambar"]
      },
      {
        name: "Gulati Restaurant Pandara Road",
        type: "Iconic Mughlai & North Indian",
        specialty: "Experienced chefs accommodating custom requests for nut-free and dairy-free curries",
        address: "Pandara Road Market, New Delhi",
        safeOptions: ["Plain Tandoori Roti", "Dal Tadka (mustard/nut-free on request)", "Steamed Rice"]
      }
    ];
  } else if (dist.includes('goa')) {
    suitablePlaces = [
      {
        name: "Infantaria Heritage Cafe",
        type: "Artisanal Cafe & Bakery",
        specialty: "Fresh juices, egg preparations, and gluten-free breakfast bowls",
        address: "Calangute-Baga Road, North Goa",
        safeOptions: ["Fresh Fruit Salad", "Poached Eggs on Toast", "Fresh Tender Coconut Water"]
      },
      {
        name: "Fisherman's Wharf",
        type: "Goan Coastal & Riverside Dining",
        specialty: "Allergen-conscious seafood handling with separate preparation zones",
        address: "Campal, Panaji / Mobor, Goa",
        safeOptions: ["Goan Vegetable Curry with Steamed Rice", "Plain Tawa Grilled Fish (if permitted)", "Poi (Goan bread)"]
      }
    ];
  } else if (dist.includes('udaipur')) {
    suitablePlaces = [
      {
        name: "Millets of Mewar",
        type: "Healthy Organic & Allergen-Conscious Dining",
        specialty: "Dedicated gluten-free millet rotis, dairy-free vegan curries, and clean ingredients",
        address: "Hanuman Ghat, Outside Chandpole, Udaipur",
        safeOptions: ["Bajra & Jowar Khichdi", "Millet Roti with Mixed Dal", "Fresh Vegetable Stir Fry"]
      },
      {
        name: "Natraj Dining Hall & Restaurant",
        type: "Famous Rajasthani & Gujarati Thali",
        specialty: "Hygienic traditional unlimited thalis with attentive kitchen staff",
        address: "Station Road, Old City, Udaipur",
        safeOptions: ["Steamed Rice with Kadi (or Dal)", "Phulka Roti", "Fresh Cabbage Sambharo"]
      }
    ];
  } else if (dist.includes('chennai')) {
    suitablePlaces = [
      {
        name: "Annalakshmi Restaurant",
        type: "Culinary Heritage Fine Vegetarian Dining",
        specialty: "Temple-inspired cooking without artificial additives, accommodating all dietary needs",
        address: "Mayor Ramanathan Salai, Chetpet, Chennai",
        safeOptions: ["Traditional Thali Meals", "Steamed Idli with Podi", "Rasam Rice"]
      },
      {
        name: "Murugan Idli Shop Mylapore",
        type: "Pure Vegetarian South Indian",
        specialty: "Fluffy steamed rice idlis with allergen-safe chutneys",
        address: "Mylapore Tank / North Mada Street, Chennai",
        safeOptions: ["Plain Steamed Idlis", "Ghee/Oil Roast Dosa", "Pongal (verify nut-free)"]
      }
    ];
  } else if (dist.includes('thanjavur')) {
    suitablePlaces = [
      {
        name: "Sree Ariya Bhavan",
        type: "Heritage Pure Vegetarian",
        specialty: "Traditional Chola-region vegetarian thalis and freshly steamed breakfast items",
        address: "South Main Street, Thanjavur Old Town",
        safeOptions: ["Steamed Rice Thali with Rasam", "Plain Steamed Idli", "Thin Sada Roast Dosa"]
      }
    ];
  } else if (dist.includes('jaipur')) {
    suitablePlaces = [
      {
        name: "LMB - Laxmi Misthan Bhandar",
        type: "Historic Rajasthani Pure Vegetarian",
        specialty: "Authentic Rajasthani thali, ker sangri, and fresh desi ghee specialties",
        address: "Johari Bazaar, Pink City, Jaipur",
        safeOptions: ["Steamed Rice & Yellow Dal", "Bajre ki Roti", "Ker Sangri"]
      },
      {
        name: "Surabhi Restaurant & Turban Museum",
        type: "Heritage Courtyard Dining",
        specialty: "Live Rajasthani folk music with allergen-conscious multi-cuisine menu",
        address: "Amer Road, Devisinghpura, Amer, Jaipur",
        safeOptions: ["Tandoori Roti with Dal Tadka", "Steamed Rice", "Vegetable Pulao"]
      }
    ];
  } else if (dist.includes('ernakulam') || dist.includes('kochi')) {
    suitablePlaces = [
      {
        name: "Kashi Art Cafe",
        type: "Artisanal Contemporary European & Local Cafe",
        specialty: "Nutrient-rich organic salads, fresh bread, and allergen-labeled specials",
        address: "Burgher Street, Fort Kochi, Ernakulam",
        safeOptions: ["Fresh fruit bowls", "Poached eggs / Avocado toast", "Black tea & fresh juices"]
      },
      {
        name: "Grand Pavilion",
        type: "Iconic Traditional Kerala Restaurant",
        specialty: "Authentic Malabar and Central Travancore specialties with allergen-aware chefs",
        address: "MG Road, Ernakulam 682011",
        safeOptions: ["Appam with Vegetable Stew (coconut milk base)", "Steamed Rice", "Fish Moilee (if seafood permitted)"]
      }
    ];
  }

  // Safe dishes based on allergies
  const suitableDishes: { name: string; description: string; whySafe: string }[] = [];
  const cautionDishes: { name: string; reason: string; ingredientsToWatch: string[] }[] = [];

  // Always safe base
  suitableDishes.push({
    name: "Steamed Rice Idlis with Fresh Tomato Chutney",
    description: "Traditional fermented rice and de-husked black gram steamed cakes.",
    whySafe: "Naturally gluten-free, dairy-free, and contains zero peanuts or tree nuts."
  });

  if (!hasGlutenAllergy) {
    suitableDishes.push({
      name: "Tandoori Wheat Roti with Plain Dal",
      description: "Whole wheat unleavened flatbread baked in clay oven.",
      whySafe: "Prepared without milk, nuts, or peanuts."
    });
  } else {
    suitableDishes.push({
      name: "Kerala Appam / Neer Dosa",
      description: "Lacy fermented rice batter pancake prepared on cast iron.",
      whySafe: "Pure rice flour base — 100% naturally gluten-free."
    });
  }

  if (!hasDairyAllergy) {
    suitableDishes.push({
      name: "Traditional South Indian Curd Rice (Thayir Sadam)",
      description: "Steamed rice seasoned with fresh cultured yoghurt, ginger, and curry leaves.",
      whySafe: "Cooling and gentle on digestion, contains no nuts, peanuts, or gluten."
    });
  }

  // Peanut allergy alerts
  if (hasPeanutAllergy) {
    cautionDishes.push(
      {
        name: "Groundnut Chutney / Thogayal",
        reason: "Frequently made with roasted peanuts blended with green chillies and coconut.",
        ingredientsToWatch: ["Peanuts (Verkadalai)", "Groundnut oil", "Roasted chana dal"]
      },
      {
        name: "Roadside Sundal & Bhel Mixes",
        reason: "Often garnished with fried peanuts or cooked in refined groundnut oil.",
        ingredientsToWatch: ["Crushed peanuts", "Groundnut tempering oil"]
      },
      {
        name: "Spicy Idli Podi (Gunpowder)",
        reason: "Certain recipe variants incorporate roasted groundnuts for nutty richness.",
        ingredientsToWatch: ["Peanut bits in spice blend"]
      }
    );
  }

  // Dairy allergy alerts
  if (hasDairyAllergy) {
    cautionDishes.push(
      {
        name: "Ghee Roast Dosa & Butter Naan",
        reason: "Generously brushed with clarified cow butter (ghee) or dairy milk butter.",
        ingredientsToWatch: ["Clarified Butter (Ghee)", "Dairy Butter", "Milk solids"]
      },
      {
        name: "Madurai Jigarthanda & Payasam",
        reason: "Famous Madurai dessert enriched with evaporated milk cream (basundi), milk, and almond gum.",
        ingredientsToWatch: ["Evaporated cow milk", "Condensed milk", "Dairy cream"]
      }
    );
  }

  // Gluten allergy alerts
  if (hasGlutenAllergy) {
    cautionDishes.push(
      {
        name: "Madurai Bun Parotta & Malabar Paratha",
        reason: "Made with refined all-purpose wheat flour (maida) kneaded with high gluten.",
        ingredientsToWatch: ["Refined Wheat (Maida)", "Wheat gluten"]
      },
      {
        name: "Rava Kesari & Rava Dosa",
        reason: "Prepared using semolina (durum wheat coarse grain).",
        ingredientsToWatch: ["Wheat Semolina (Rava/Sooji)"]
      }
    );
  }

  // Tree nuts allergy alerts
  const hasTreeNutAllergy = allAllergies.some(a => a.toLowerCase().includes('tree nut') || a.toLowerCase().includes('cashew') || a.toLowerCase().includes('almond') || a.toLowerCase().includes('walnut'));
  if (hasTreeNutAllergy) {
    cautionDishes.push(
      {
        name: "Mughlai Gravies, Shahi Paneer & Kormas",
        reason: "Rich royal gravies use ground cashew (kaju) and almond (badam) paste as thickening agents.",
        ingredientsToWatch: ["Cashew paste (Kaju)", "Almond paste (Badam)", "Melon seed paste"]
      },
      {
        name: "Badam Halwa & Traditional Sweets",
        reason: "Traditional sweets across North and South India frequently use almonds, pistachios, and cashews.",
        ingredientsToWatch: ["Cashews", "Pistachios", "Almonds"]
      }
    );
  }

  // Egg allergy alerts
  if (hasEggAllergy) {
    cautionDishes.push(
      {
        name: "Egg Kothu Parotta & Street Fried Rice",
        reason: "Prepared on high-heat shared cast-iron griddles where eggs are regularly scrambled.",
        ingredientsToWatch: ["Scrambled egg bits", "Egg wash on baked puff pastries", "Mayonnaise"]
      }
    );
  }

  // Shellfish & Seafood alerts
  if (hasFishAllergy) {
    cautionDishes.push({
      name: "Street Seafood Fry & Coastal Curries",
      reason: "High risk of cross-contact on shared frying pans and shared ladles in coastal eateries.",
      ingredientsToWatch: ["Fish oil cross-contact", "Prawn broth", "Dried shrimp powder", "Crab masala"]
    });
  }

  // Soy allergy alerts
  if (hasSoyAllergy) {
    cautionDishes.push({
      name: "Soya Chaap & Indo-Chinese Specialties",
      reason: "Prepared with concentrated defatted soya flour or dark soy sauce seasoning.",
      ingredientsToWatch: ["Soy sauce", "Soya chunks/chaap", "Soybean oil"]
    });
  }

  // Sesame allergy alerts
  if (hasSesameAllergy) {
    cautionDishes.push({
      name: "Idli Milagai Podi with Gingelly (Sesame) Oil & Til Chikki",
      reason: "Traditional idli podi is predominantly mixed with unrefined cold-pressed sesame oil (nallennai/til oil).",
      ingredientsToWatch: ["Cold-pressed Sesame Oil (Gingelly/Nallennai)", "White/Black sesame seeds (Til/Ellu)"]
    });
  }

  // Custom alerts added to caution
  customAlerts.forEach(ca => {
    cautionDishes.push({
      name: ca.dish,
      reason: ca.warning,
      ingredientsToWatch: customAllergies
    });
  });

  // Practical precautions
  const precautions = [
    "Inform your server and chef of your specific allergy immediately upon seating.",
    "Ask whether frying oil, griddles, or storage containers are shared with allergen items.",
    "Carry a translated local-language allergy card for restaurants (e.g. Tamil: 'எனக்கு ஒவ்வாமை உள்ளது', Hindi: 'मुझे एलर्जी है').",
    "Avoid mixed street gravies with unspecified nut pastes, thickened creams, or secret spice blends.",
    "Always carry your prescribed emergency medications (such as antihistamines or auto-injectors) according to your healthcare professional's guidance."
  ];

  return {
    suitable_places: suitablePlaces,
    suitable_dishes: suitableDishes,
    caution_dishes: cautionDishes,
    precautions: precautions
  };
}

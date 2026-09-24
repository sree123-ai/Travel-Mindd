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
        reason: 'Guarantees unhindered sightseeing during rainfall',
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

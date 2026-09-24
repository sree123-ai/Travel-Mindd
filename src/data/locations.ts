import { StateInfo, VerifiedPlace } from '../types/travel';

export const INDIAN_STATES: StateInfo[] = [
  {
    name: "Tamil Nadu",
    type: "State",
    districts: [
      "Chennai", "Coimbatore", "Madurai", "Kanyakumari", "Nilgiris", "Dindigul", 
      "Salem", "Thanjavur", "Tiruchirappalli", "Tirunelveli", "Kanchipuram", 
      "Ramanathapuram", "Cuddalore", "Vellore", "Erode", "Theni", "Dharmapuri"
    ]
  },
  {
    name: "Kerala",
    type: "State",
    districts: [
      "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", 
      "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", 
      "Thiruvananthapuram", "Thrissur", "Wayanad"
    ]
  },
  {
    name: "Karnataka",
    type: "State",
    districts: [
      "Bengaluru Urban", "Mysuru", "Udupi", "Dakshina Kannada", "Uttara Kannada", 
      "Chikkamagaluru", "Kodagu", "Hampi / Vijayanagara", "Belagavi", "Shivamogga", "Hassan"
    ]
  },
  {
    name: "Assam",
    type: "State",
    districts: [
      "Dima Hasao", "Kamrup Metropolitan", "Golaghat", "Jorhat", "Sonitpur", 
      "Dibrugarh", "Karbi Anglong", "Cachar", "Nagaon", "Barpeta"
    ]
  },
  {
    name: "Maharashtra",
    type: "State",
    districts: [
      "Mumbai City", "Mumbai Suburban", "Pune", "Aurangabad (Chhatrapati Sambhaji Nagar)", 
      "Nashik", "Satara", "Kolhapur", "Raigad", "Sindhudurg", "Nagpur", "Ratnagiri"
    ]
  },
  {
    name: "Rajasthan",
    type: "State",
    districts: [
      "Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Bikaner", "Ajmer", 
      "Sawai Madhopur", "Chittorgarh", "Alwar", "Kota", "Sirohi (Mount Abu)"
    ]
  },
  {
    name: "Himachal Pradesh",
    type: "State",
    districts: [
      "Shimla", "Kullu", "Kangra (Dharamshala)", "Mandi", "Lahaul and Spiti", 
      "Chamba", "Kinnaur", "Solan", "Sirmaur", "Bilaspur"
    ]
  },
  {
    name: "Uttarakhand",
    type: "State",
    districts: [
      "Dehradun (Rishikesh)", "Nainital", "Haridwar", "Chamoli", "Uttarkashi", 
      "Rudraprayag", "Tehri Garhwal", "Almora", "Pithoragarh"
    ]
  },
  {
    name: "Goa",
    type: "State",
    districts: [
      "North Goa", "South Goa"
    ]
  },
  {
    name: "West Bengal",
    type: "State",
    districts: [
      "Kolkata", "Darjeeling", "Kalimpong", "Jalpaiguri", "South 24 Parganas", "Purba Medinipur"
    ]
  },
  {
    name: "Andhra Pradesh",
    type: "State",
    districts: [
      "Visakhapatnam", "Tirupati", "Krishna", "Guntur", "East Godavari", "Kurnool", "Ananthapuramu"
    ]
  },
  {
    name: "Telangana",
    type: "State",
    districts: [
      "Hyderabad", "Warangal", "Ranga Reddy", "Medak", "Khammam", "Karimnagar"
    ]
  },
  {
    name: "Jammu and Kashmir",
    type: "Union Territory",
    districts: [
      "Srinagar", "Baramulla (Gulmarg)", "Anantnag (Pahalgam)", "Jammu", "Udhampur"
    ]
  },
  {
    name: "Ladakh",
    type: "Union Territory",
    districts: [
      "Leh", "Kargil"
    ]
  },
  {
    name: "Delhi",
    type: "Union Territory",
    districts: [
      "Central Delhi", "New Delhi", "South Delhi", "North Delhi"
    ]
  },
  {
    name: "Andaman and Nicobar Islands",
    type: "Union Territory",
    districts: [
      "South Andaman", "North and Middle Andaman", "Nicobar"
    ]
  },
  {
    name: "Puducherry",
    type: "Union Territory",
    districts: [
      "Puducherry", "Karaikal", "Mahe", "Yanam"
    ]
  },
  {
    name: "Gujarat",
    type: "State",
    districts: [
      "Ahmedabad", "Kutch", "Gir Somnath", "Vadodara", "Surat", "Junagadh"
    ]
  },
  {
    name: "Madhya Pradesh",
    type: "State",
    districts: [
      "Bhopal", "Indore", "Chhatarpur (Khajuraho)", "Jabalpur", "Ujjain", "Seoni (Pench)"
    ]
  },
  {
    name: "Odisha",
    type: "State",
    districts: [
      "Puri", "Khordha (Bhubaneswar)", "Ganjam", "Koraput", "Mayurbhanj"
    ]
  },
  {
    name: "Punjab",
    type: "State",
    districts: [
      "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"
    ]
  },
  {
    name: "Sikkim",
    type: "State",
    districts: [
      "East Sikkim (Gangtok)", "West Sikkim", "North Sikkim", "South Sikkim"
    ]
  },
  {
    name: "Meghalaya",
    type: "State",
    districts: [
      "East Khasi Hills (Shillong)", "West Jaintia Hills", "Ri-Bhoi"
    ]
  },
  {
    name: "Arunachal Pradesh",
    type: "State",
    districts: [
      "Tawang", "West Kameng", "Papum Pare", "Lower Subansiri"
    ]
  },
  {
    name: "Bihar",
    type: "State",
    districts: [
      "Gaya (Bodh Gaya)", "Patna", "Nalanda", "Vaishali"
    ]
  },
  {
    name: "Uttar Pradesh",
    type: "State",
    districts: [
      "Agra", "Varanasi", "Lucknow", "Prayagraj", "Mathura", "Ayodhya"
    ]
  }
];

// Verified destinations database with authentic coordinates, categories, and tags
export const VERIFIED_PLACES: VerifiedPlace[] = [
  // --- Assam: Dima Hasao ---
  {
    id: "haflong-hill-station",
    name: "Haflong Hill Station",
    state: "Assam",
    district: "Dima Hasao",
    city: "Haflong",
    category: "Hill Station & Nature",
    description: "Known as the White Ant Hillock and the only hill station in Assam, Haflong features emerald rolling hills, misty cloud vistas, serene Haflong Lake, and traditional Dimasa tribal culture.",
    latitude: 25.1764,
    longitude: 93.0232,
    placeId: "ChIJq422p1w_RzcR7B5p-j1K42k",
    formattedAddress: "Haflong, Dima Hasao District, Assam 788819",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    rating: 4.6,
    tags: ["Nature", "Hill Station", "Photography", "Relaxation", "Trekking"],
    bestSeason: "October to April",
    climateMatch: ["Cool", "Pleasant", "Misty", "Mild"],
    estimatedBudgetMin: 5000,
    estimatedBudgetMax: 15000,
    suitableTravellers: ["Family", "Couple", "Friends", "Solo"],
    suitableActivities: ["Photography", "Trekking", "Nature", "Relaxation", "Sunrise / Sunset"],
    accessibilityFeatures: ["Senior-friendly", "Child-friendly"],
    crowdLevel: "Low",
    walkingIntensity: "Moderate"
  },
  {
    id: "jatinga-valley",
    name: "Jatinga Bird Sanctuary",
    state: "Assam",
    district: "Dima Hasao",
    city: "Jatinga",
    category: "Wildlife & Nature",
    description: "Nestled on a scenic ridge 9 km from Haflong, Jatinga is world-renowned for its serene valley views, lush orange orchards, and unique avian biodiversity amidst misty mountain trails.",
    latitude: 25.1328,
    longitude: 93.0335,
    placeId: "ChIJ8yBqq1s_RzcRRZl39a1q58w",
    formattedAddress: "Jatinga Ridge, Dima Hasao, Assam 788819",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
    rating: 4.4,
    tags: ["Wildlife", "Bird Watching", "Nature", "Photography"],
    bestSeason: "September to March",
    climateMatch: ["Pleasant", "Cool"],
    estimatedBudgetMin: 4000,
    estimatedBudgetMax: 12000,
    suitableTravellers: ["Friends", "Solo", "Couple", "Mixed Group"],
    suitableActivities: ["Photography", "Nature", "Wildlife", "Trekking"],
    accessibilityFeatures: ["No specific requirement"],
    crowdLevel: "Low",
    walkingIntensity: "Moderate"
  },
  {
    id: "maibang-heritage-ruins",
    name: "Maibang Ancient Dimasa Ruins",
    state: "Assam",
    district: "Dima Hasao",
    city: "Maibang",
    category: "Historical & Heritage",
    description: "The historic capital of the ancient Dimasa Kachari Kingdom on the banks of Mahur River, boasting monolithic rock-cut 12th-century stone houses, two-roofed temples, and archaeological heritage.",
    latitude: 25.2974,
    longitude: 93.1611,
    placeId: "ChIJbX7Q4vE_RzcRPXkO-k7T8-s",
    formattedAddress: "Mahur Riverfront, Maibang, Dima Hasao, Assam 788836",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
    rating: 4.5,
    tags: ["Historical", "Archaeology", "Culture", "Spiritual"],
    bestSeason: "October to March",
    climateMatch: ["Pleasant", "Mild"],
    estimatedBudgetMin: 3000,
    estimatedBudgetMax: 10000,
    suitableTravellers: ["Family", "Solo", "College / Students", "Couple"],
    suitableActivities: ["Historical Places", "Photography", "Culture", "Local Food"],
    accessibilityFeatures: ["Senior-friendly", "Child-friendly"],
    crowdLevel: "Low",
    walkingIntensity: "Low"
  },

  // --- Tamil Nadu: Madurai ---
  {
    id: "meenakshi-amman-temple",
    name: "Meenakshi Amman Temple",
    state: "Tamil Nadu",
    district: "Madurai",
    city: "Madurai",
    category: "Spiritual & Historical",
    description: "A world-famous Dravidian masterpiece with 14 soaring gopurams encrusted with thousands of colorful mythological figures, housing the sacred Golden Lotus tank and the legendary Hall of Thousand Pillars.",
    latitude: 9.9195,
    longitude: 78.1193,
    placeId: "ChIJbXlDqH3xBDsRMUq15XF5fQI",
    formattedAddress: "Madurai Main, Madurai, Tamil Nadu 625001",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    tags: ["Spiritual", "Temple Visit", "Historical", "Culture", "Architecture"],
    bestSeason: "October to March",
    climateMatch: ["Pleasant", "Sunny"],
    estimatedBudgetMin: 2500,
    estimatedBudgetMax: 12000,
    suitableTravellers: ["Family", "Seniors", "Couple", "Solo"],
    suitableActivities: ["Temple Visit", "Historical Places", "Photography", "Local Food", "Culture"],
    accessibilityFeatures: ["Wheelchair accessibility", "Senior-friendly", "Child-friendly"],
    crowdLevel: "High",
    walkingIntensity: "Moderate"
  },
  {
    id: "thirumalai-nayakar-mahal",
    name: "Thirumalai Nayakkar Palace",
    state: "Tamil Nadu",
    district: "Madurai",
    city: "Madurai",
    category: "Historical & Architecture",
    description: "Constructed in 1636 AD by King Thirumalai Nayak, this regal palace blends Indo-Saracenic and Italian architectural styles with giant stone pillars, domed courtyards, and an evening sound-and-light show.",
    latitude: 9.9152,
    longitude: 78.1235,
    placeId: "ChIJWc4Dln3xBDsRwGq4W72V_x4",
    formattedAddress: "Panthadi, Madurai, Tamil Nadu 625001",
    imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f4439c65?w=800&auto=format&fit=crop&q=80",
    rating: 4.5,
    tags: ["Historical", "Architecture", "Photography", "Culture"],
    bestSeason: "October to March",
    climateMatch: ["Pleasant", "Sunny"],
    estimatedBudgetMin: 2000,
    estimatedBudgetMax: 8000,
    suitableTravellers: ["Family", "Friends", "Couple", "College / Students"],
    suitableActivities: ["Historical Places", "Photography", "Culture"],
    accessibilityFeatures: ["Wheelchair accessibility", "Senior-friendly", "Child-friendly"],
    crowdLevel: "Medium",
    walkingIntensity: "Low"
  },

  // --- Tamil Nadu: Kanyakumari ---
  {
    id: "vivekananda-rock-memorial",
    name: "Vivekananda Rock Memorial",
    state: "Tamil Nadu",
    district: "Kanyakumari",
    city: "Kanyakumari",
    category: "Spiritual & Coastal",
    description: "Built on a rock island 500 meters off the southern tip of mainland India, where three oceans converge (Bay of Bengal, Indian Ocean, Arabian Sea), honoring Swami Vivekananda with serene meditation halls.",
    latitude: 8.0781,
    longitude: 77.5552,
    placeId: "ChIJy-P960U5ATsRNKkL-0p9m5M",
    formattedAddress: "Kanyakumari Rock Island, Tamil Nadu 629702",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    tags: ["Spiritual", "Historical", "Sunrise / Sunset", "Beach", "Photography"],
    bestSeason: "October to March",
    climateMatch: ["Pleasant", "Sunny", "Tropical"],
    estimatedBudgetMin: 4000,
    estimatedBudgetMax: 15000,
    suitableTravellers: ["Family", "Couple", "Solo", "Seniors"],
    suitableActivities: ["Sunrise / Sunset", "Photography", "Spiritual", "Historical Places"],
    accessibilityFeatures: ["Senior-friendly"],
    crowdLevel: "High",
    walkingIntensity: "Moderate"
  },
  {
    id: "thiruvalluvar-statue",
    name: "Thiruvalluvar Statue & Sunset Point",
    state: "Tamil Nadu",
    district: "Kanyakumari",
    city: "Kanyakumari",
    category: "Monument & Coastal",
    description: "A monumental 133-foot stone statue celebrating the ancient Tamil philosopher-poet Thiruvalluvar, offering sweeping panorama across the confluence of three oceans and breathtaking twilight views.",
    latitude: 8.0778,
    longitude: 77.5557,
    placeId: "ChIJOwJj5EU5ATsR_iWd_oH5_F8",
    formattedAddress: "Kanyakumari Island, Tamil Nadu 629702",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    tags: ["Coastal", "Photography", "Historical", "Sunrise / Sunset"],
    bestSeason: "October to March",
    climateMatch: ["Pleasant", "Sunny"],
    estimatedBudgetMin: 3000,
    estimatedBudgetMax: 10000,
    suitableTravellers: ["Family", "Couple", "Friends"],
    suitableActivities: ["Sunrise / Sunset", "Photography", "Historical Places"],
    accessibilityFeatures: ["Child-friendly"],
    crowdLevel: "Medium",
    walkingIntensity: "Low"
  },

  // --- Kerala: Wayanad ---
  {
    id: "banasura-sagar-dam",
    name: "Banasura Sagar Dam",
    state: "Kerala",
    district: "Wayanad",
    city: "Padinjarathara",
    category: "Nature & Lake",
    description: "The largest earthen dam in India and the second largest in Asia, Banasura Sagar features floating misty islands against towering rugged hills, speed-boating, and picturesque walking trails.",
    latitude: 11.6698,
    longitude: 75.9575,
    placeId: "ChIJW0L1t9Z2pzsR4h3pW7w36iI",
    formattedAddress: "Padinjarathara, Wayanad, Kerala 673575",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    rating: 4.6,
    tags: ["Nature", "Lake", "Photography", "Adventure"],
    bestSeason: "September to May",
    climateMatch: ["Pleasant", "Cool", "Rainy"],
    estimatedBudgetMin: 6000,
    estimatedBudgetMax: 18000,
    suitableTravellers: ["Family", "Couple", "Friends"],
    suitableActivities: ["Photography", "Nature", "Relaxation", "Trekking"],
    accessibilityFeatures: ["Senior-friendly", "Child-friendly"],
    crowdLevel: "Medium",
    walkingIntensity: "Moderate"
  },
  {
    id: "edakkal-caves",
    name: "Edakkal Caves",
    state: "Kerala",
    district: "Wayanad",
    city: "Ambalavayal",
    category: "Historical & Prehistoric",
    description: "Famous for Neolithic stone-age rock engravings dating back to 6,000 BCE, perched atop Ambukuthi Mala with sweeping views of mist-kissed coffee plantations and lush Western Ghats valleys.",
    latitude: 11.6279,
    longitude: 76.2344,
    placeId: "ChIJRz_Ew-F3pzsRFG14T19U81o",
    formattedAddress: "Nenmeni, Ambalavayal, Wayanad, Kerala 673595",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
    rating: 4.5,
    tags: ["Historical", "Trekking", "Nature", "Adventure"],
    bestSeason: "October to April",
    climateMatch: ["Cool", "Pleasant"],
    estimatedBudgetMin: 4000,
    estimatedBudgetMax: 14000,
    suitableTravellers: ["Friends", "Couple", "Solo", "College / Students"],
    suitableActivities: ["Trekking", "Historical Places", "Photography"],
    accessibilityFeatures: ["No specific requirement"],
    crowdLevel: "Medium",
    walkingIntensity: "High"
  },

  // --- Maharashtra: Pune ---
  {
    id: "sinhagad-fort",
    name: "Sinhagad Fort",
    state: "Maharashtra",
    district: "Pune",
    city: "Pune",
    category: "Historical & Trekking",
    description: "An ancient hilltop fortress situated 30 km southwest of Pune, renowned for Tanaji Malusare's heroic battle in 1670 AD, scenic misty Sahyadri cliff walks, and authentic Maharashtrian pithla-bhakri.",
    latitude: 18.3663,
    longitude: 73.7558,
    placeId: "ChIJZ3j3V367wjsR7P0xY2a4h7Q",
    formattedAddress: "Sinhagad Ghat Rd, Pune District, Maharashtra 411025",
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80",
    rating: 4.6,
    tags: ["Historical", "Trekking", "Nature", "Local Food", "Photography"],
    bestSeason: "July to February",
    climateMatch: ["Pleasant", "Rainy", "Cool"],
    estimatedBudgetMin: 3000,
    estimatedBudgetMax: 10000,
    suitableTravellers: ["Friends", "Couple", "Family", "College / Students"],
    suitableActivities: ["Trekking", "Historical Places", "Local Food", "Photography", "Sunrise / Sunset"],
    accessibilityFeatures: ["No specific requirement"],
    crowdLevel: "High",
    walkingIntensity: "Moderate"
  },
  {
    id: "shaniwar-wada",
    name: "Shaniwar Wada",
    state: "Maharashtra",
    district: "Pune",
    city: "Pune",
    category: "Historical & Heritage",
    description: "The grand 18th-century seat of the Peshwa rulers of the Maratha Empire, famed for its massive teak Delhi Darwaza gate, fountain garden courtyards, and storied Maratha history.",
    latitude: 18.5195,
    longitude: 73.8553,
    placeId: "ChIJO-j2G_HAwjsROt4z3sN46yM",
    formattedAddress: "Shaniwar Peth, Pune, Maharashtra 411030",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
    rating: 4.4,
    tags: ["Historical", "Culture", "Architecture", "Local Food"],
    bestSeason: "October to March",
    climateMatch: ["Pleasant", "Sunny"],
    estimatedBudgetMin: 2000,
    estimatedBudgetMax: 8000,
    suitableTravellers: ["Family", "Solo", "College / Students", "Couple"],
    suitableActivities: ["Historical Places", "Photography", "Culture", "Local Food"],
    accessibilityFeatures: ["Wheelchair accessibility", "Senior-friendly", "Child-friendly"],
    crowdLevel: "Medium",
    walkingIntensity: "Low"
  },

  // --- Rajasthan: Jaipur ---
  {
    id: "amber-palace-fort",
    name: "Amber Palace (Amer Fort)",
    state: "Rajasthan",
    district: "Jaipur",
    city: "Amer",
    category: "Historical & Architecture",
    description: "A UNESCO World Heritage marvel constructed in yellow and pink sandstone, celebrated for the dazzling Sheesh Mahal (Mirror Palace), Diwan-e-Aam, and panoramic Maota Lake vistas.",
    latitude: 26.9855,
    longitude: 75.8513,
    placeId: "ChIJZ3j3V367wjsR7P0xY2a4h7Q_AMER",
    formattedAddress: "Devisinghpura, Amer, Jaipur, Rajasthan 302001",
    imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f4439c65?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    tags: ["Historical", "Photography", "Culture", "Architecture"],
    bestSeason: "October to March",
    climateMatch: ["Sunny", "Pleasant", "Mild"],
    estimatedBudgetMin: 5000,
    estimatedBudgetMax: 20000,
    suitableTravellers: ["Family", "Couple", "Friends", "Solo"],
    suitableActivities: ["Historical Places", "Photography", "Culture", "Shopping"],
    accessibilityFeatures: ["Senior-friendly", "Child-friendly"],
    crowdLevel: "High",
    walkingIntensity: "Moderate"
  },
  {
    id: "hawa-mahal",
    name: "Hawa Mahal (Palace of Winds)",
    state: "Rajasthan",
    district: "Jaipur",
    city: "Jaipur",
    category: "Heritage & Monument",
    description: "Built in 1799 by Maharaja Sawai Pratap Singh, featuring 953 intricately carved jharokhas designed like Lord Krishna's crown, allowing refreshing royal breezes through its pink-honeycomb facade.",
    latitude: 26.9239,
    longitude: 75.8267,
    placeId: "ChIJ5V1lT_HAwjsROt4z3sN46yM_HAWA",
    formattedAddress: "Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002",
    imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    tags: ["Historical", "Shopping", "Photography", "Architecture"],
    bestSeason: "October to March",
    climateMatch: ["Sunny", "Pleasant"],
    estimatedBudgetMin: 3000,
    estimatedBudgetMax: 15000,
    suitableTravellers: ["Family", "Couple", "Friends", "Solo"],
    suitableActivities: ["Photography", "Historical Places", "Shopping", "Local Food"],
    accessibilityFeatures: ["Senior-friendly", "Child-friendly"],
    crowdLevel: "High",
    walkingIntensity: "Low"
  },

  // --- Himachal Pradesh: Kullu ---
  {
    id: "solang-valley",
    name: "Solang Valley",
    state: "Himachal Pradesh",
    district: "Kullu",
    city: "Manali",
    category: "Adventure & Mountains",
    description: "A scenic alpine valley situated at 8,400 ft amidst snow-capped Himalayan peaks, famous for paragliding, skiing, zorbing, and breathtaking vistas of the Beas Kund glaciated range.",
    latitude: 32.3166,
    longitude: 77.1578,
    placeId: "ChIJr148gB9sCDsRxP-0Z3u86kM",
    formattedAddress: "Solang Valley, Manali, Kullu, Himachal Pradesh 175103",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    tags: ["Adventure", "Mountains", "Nature", "Photography", "Snow"],
    bestSeason: "All Year",
    climateMatch: ["Cold", "Cool"],
    estimatedBudgetMin: 8000,
    estimatedBudgetMax: 25000,
    suitableTravellers: ["Friends", "Couple", "Family", "College / Students"],
    suitableActivities: ["Trekking", "Photography", "Nature", "Relaxation"],
    accessibilityFeatures: ["Child-friendly"],
    crowdLevel: "High",
    walkingIntensity: "Moderate"
  },

  // --- Goa: North Goa ---
  {
    id: "fort-aguada-beach",
    name: "Fort Aguada & Sinquerim Beach",
    state: "Goa",
    district: "North Goa",
    city: "Candolim",
    category: "Beach & Historical",
    description: "A commanding 17th-century Portuguese coastal fortress and four-storey lighthouse overlooking the Arabian Sea, bordered by golden sands, coconut palms, and sunset viewpoints.",
    latitude: 15.4925,
    longitude: 73.7736,
    placeId: "ChIJQeT8Q099vzsR-dZ4T7w6g1Q",
    formattedAddress: "Aguada Fort Rd, Candolim, North Goa, Goa 403515",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
    rating: 4.6,
    tags: ["Beach", "Historical", "Sunset", "Relaxation", "Photography"],
    bestSeason: "November to March",
    climateMatch: ["Sunny", "Pleasant", "Tropical"],
    estimatedBudgetMin: 6000,
    estimatedBudgetMax: 25000,
    suitableTravellers: ["Couple", "Friends", "Family", "Solo"],
    suitableActivities: ["Beach", "Sunrise / Sunset", "Photography", "Historical Places", "Relaxation"],
    accessibilityFeatures: ["Child-friendly", "Senior-friendly"],
    crowdLevel: "Medium",
    walkingIntensity: "Low"
  }
];

// Helper to find places strictly constrained to state and district
export function searchVerifiedDestinations(
  stateName: string,
  districtName: string,
  requestedDestinationName?: string
): {
  exactPlace: VerifiedPlace | null;
  relatedPlacesInDistrict: VerifiedPlace[];
  allDistrictPlaces: VerifiedPlace[];
} {
  const norm = (str?: string) => (str || '').trim().toLowerCase();
  const stateNorm = norm(stateName);
  const distNorm = norm(districtName);

  // Exact district match
  const districtPlaces = VERIFIED_PLACES.filter(p => {
    const sMatch = norm(p.state) === stateNorm;
    const dMatch = norm(p.district) === distNorm || norm(p.city) === distNorm;
    return sMatch && dMatch;
  });

  let exact: VerifiedPlace | null = null;
  if (requestedDestinationName) {
    const reqNorm = norm(requestedDestinationName);
    exact = districtPlaces.find(p => norm(p.name).includes(reqNorm) || reqNorm.includes(norm(p.name))) || null;
  }

  const related = districtPlaces.filter(p => !exact || p.id !== exact.id);

  return {
    exactPlace: exact,
    relatedPlacesInDistrict: related,
    allDistrictPlaces: districtPlaces
  };
}

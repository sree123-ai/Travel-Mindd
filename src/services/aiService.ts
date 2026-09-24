import { GoogleGenAI } from '@google/genai';
import { TripContext } from '../types/travel';

// Client initialized when an API key is available
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = (import.meta as any).env?.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (!aiClient && apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function askTravelMindAI(
  prompt: string,
  tripContext: TripContext,
  chatHistory: { role: 'user' | 'assistant'; text: string }[] = []
): Promise<string> {
  const dest = tripContext.verified_destination;
  const lang = tripContext.preferred_language || 'en';

  const systemPrompt = `You are TRAVELMIND AI, an expert, enthusiastic, and highly knowledgeable tourism and personalized travel planning assistant.
You possess complete awareness of the user's trip context:
- Destination: ${dest?.name || tripContext.selected_destination_input || 'Unspecified'} (${dest?.district || tripContext.selected_district}, ${dest?.state || tripContext.selected_state})
- Specific category: ${dest?.category || 'Tourism'}
- Address: ${dest?.formattedAddress || 'N/A'}
- Coordinates: Lat ${dest?.latitude}, Lng ${dest?.longitude}
- Travellers: ${tripContext.traveller_type} (${tripContext.traveller_count} people)
- Ages: ${tripContext.age_groups?.join(', ')}
- Budget: ${tripContext.budget_level}
- Trip Duration: ${tripContext.trip_duration_days} days
- Climate Preference: ${tripContext.selected_climate}
- Activities: ${tripContext.activities?.join(', ')}
- Places to Avoid: ${tripContext.places_to_avoid?.join(', ')}
- Health & Accessibility: ${tripContext.health_accessibility?.join(', ')}
- Dietary / Allergies: ${tripContext.food_preferences?.join(', ')}
- Travel Pace: ${tripContext.travel_pace}
- Transport: ${tripContext.transport_preference}
- Total Packing Items: ${tripContext.packing_list.length}, Packed: ${tripContext.packing_list.filter(p => p.packed).length}

CRITICAL RULES:
1. NEVER invent fake attractions or hallucinate coordinates. Ground your recommendations strictly within ${dest?.district || tripContext.selected_district}, ${dest?.state || tripContext.selected_state}.
2. Respond in the user's preferred language code: "${lang}" (if 'ta' reply in Tamil, 'hi' in Hindi, 'te' in Telugu, 'ml' in Malayalam, 'kn' in Kannada, 'en' in English).
3. If asked about packing, refer to their actual packing list count and specific weather requirements.
4. For health or allergy queries, remind users to follow their healthcare professional's advice and carry necessary personal emergency medication.
5. Keep answers friendly, structured with bullet points where helpful, and engaging like a personal travel journal guide.`;

  try {
    const ai = getAiClient();
    if (ai) {
      const contents = [
        { role: 'user', parts: [{ text: systemPrompt }] },
        ...chatHistory.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents
      });

      if (response.text) {
        return response.text;
      }
    }
  } catch (error) {
    console.warn('Gemini API call skipped or encountered error, falling back to local travel context engine:', error);
  }

  // Fallback intelligent responder based on current trip context (never crashes or says generic error)
  const q = prompt.toLowerCase();
  const packedCount = tripContext.packing_list.filter(p => p.packed).length;
  const totalCount = tripContext.packing_list.length;

  if (q.includes('pack') || q.includes('packing')) {
    return `🎒 **Packing Status for ${dest?.name || tripContext.selected_district}**:
You have currently packed **${packedCount} of ${totalCount}** items!
Given the ${tripContext.selected_climate || 'local'} climate and your selected activities (${tripContext.activities.slice(0, 3).join(', ')}), remember to prioritize:
• ${tripContext.selected_climate === 'Cold' ? 'Warm thermal layers and a windbreaker' : 'Breathable cotton outfits and UV sun protection'}
• Government ID and offline copies of reservations
• Any prescribed personal emergency allergy medication
• Sturdy walking footwear suited for ${dest?.walkingIntensity || 'outdoor'} explorations.`;
  }

  if (q.includes('weather') || q.includes('rain') || q.includes('climate')) {
    return `🌤️ **Weather Insights for ${dest?.name || tripContext.selected_district}**:
Your preferred climate is **${tripContext.selected_climate}**. For ${dest?.district || tripContext.selected_district}, the prime season is **${dest?.bestSeason || 'October to March'}**. ${tripContext.selected_climate === 'Rainy' ? 'Carry a compact windproof umbrella or waterproof raincoat.' : 'Keep a refillable hydration bottle and sun hat handy during mid-day tours.'}`;
  }

  if (q.includes('day 2') || q.includes('day 1') || q.includes('itinerary') || q.includes('plan')) {
    const day = tripContext.itinerary[1] || tripContext.itinerary[0];
    return `🗓️ **Itinerary Spotlight (${day ? `Day ${day.dayNumber}: ${day.theme}` : 'Plan'})**:
${day ? day.activities.map(a => `• **${a.timeSlot}**: ${a.title} (${a.locationName})`).join('\n') : 'Explore local scenic viewpoints, heritage shrines and signature markets.'}
Enjoy a ${tripContext.travel_pace.toLowerCase()} pace suited to your group!`;
  }

  if (q.includes('eat') || q.includes('food') || q.includes('restaurant')) {
    const avoid = tripContext.food_preferences.filter(f => f.includes('Avoid') || f.includes('free'));
    return `🍛 **Culinary Recommendations in ${dest?.city || dest?.district}**:
Enjoy regional specialties! ${avoid.length > 0 ? `We have flagged your dietary requirements (${avoid.join(', ')}). Always request the restaurant kitchen to prepare fresh dishes without these ingredients.` : 'Savor authentic freshly cooked regional delicacies, filter coffee, and traditional thalis.'}`;
  }

  return `🌟 Greetings! As your TRAVELMIND AI concierge for **${dest?.name || tripContext.selected_district}**, I'm here to assist with maps, daily itineraries, custom packing needs, local customs, and accessibility tips. Feel free to ask about Day 1 or Day 2 activities, what to carry, or nearby attractions!`;
}

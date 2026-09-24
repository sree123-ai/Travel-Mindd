import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Sparkles, 
  RefreshCw, 
  ArrowLeft, 
  Home, 
  CheckCircle2, 
  Package, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { TripContext, PackingItem } from '../types/travel';
import { generateContextualPacking } from '../services/travelEngines';
import { translations } from '../i18n/translations';

interface PackingAssistantProps {
  tripContext: TripContext;
  updateTripContext: (partial: Partial<TripContext>) => void;
  onBackToItinerary: () => void;
  onBackToTrip: () => void;
}

export const PackingAssistant: React.FC<PackingAssistantProps> = ({
  tripContext,
  updateTripContext,
  onBackToItinerary,
  onBackToTrip
}) => {
  const t = translations[tripContext.preferred_language] || translations.en;
  const [isRegenerating, setIsRegenerating] = useState(false);

  const packingList = tripContext.packing_list || [];
  const packedCount = packingList.filter(item => item.packed).length;
  const totalCount = packingList.length;
  const progressPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  // Toggle item packed status
  const toggleItem = (itemId: string) => {
    const updated = packingList.map(item => 
      item.id === itemId ? { ...item, packed: !item.packed } : item
    );
    updateTripContext({ packing_list: updated });
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      const freshList = generateContextualPacking(tripContext);
      updateTripContext({ packing_list: freshList });
      setIsRegenerating(false);
    }, 450);
  };

  // Group items by category
  const categories = Array.from(new Set(packingList.map(item => item.category)));

  return (
    <div className="space-y-6">
      {/* Header Summary Banner */}
      <div className="journal-panel p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 border border-[#7A421F] text-xs font-black text-[#4A2412] uppercase mb-2">
              <Package className="w-3.5 h-3.5 text-[#F28A20]" />
              {t.packingAssistant}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412]">
              {tripContext.verified_destination?.name || tripContext.selected_district} Travel Essentials
            </h2>
            <p className="text-sm font-semibold text-[#7A421F]">
              {t.packSmarter} Grounded in {tripContext.selected_climate} climate & itinerary activities.
            </p>
          </div>

          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-4 py-2.5 rounded-2xl bg-[#3FA9DD] text-white border-2 border-[#4A2412] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#3393c2] disabled:opacity-50 btn-3d shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            {t.regeneratePacking}
          </button>
        </div>

        {/* Packing Progress Bar */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-100/90 border-2 border-[#7A421F]">
          <div className="flex items-center justify-between text-xs sm:text-sm font-black text-[#4A2412] mb-1.5">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7BC52B]" />
              {t.itemsPacked(packedCount, totalCount)}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-4 bg-amber-200/90 rounded-full border-2 border-[#7A421F] overflow-hidden p-0.5">
            <div
              className="h-full bg-[#7BC52B] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Categories & Interactive Checkboxes */}
      <div className="space-y-5">
        {categories.map((category) => {
          const catItems = packingList.filter(i => i.category === category);
          const catPacked = catItems.filter(i => i.packed).length;

          return (
            <div key={category} className="journal-panel p-5 sm:p-6">
              <div className="flex items-center justify-between border-b-2 border-[#7A421F]/30 pb-3 mb-3">
                <h3 className="text-lg font-black text-[#4A2412] flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#F28A20] border border-[#4A2412]"></span>
                  {category}
                </h3>
                <span className="text-xs font-black text-[#7A421F] bg-amber-100 px-2.5 py-1 rounded-xl border border-[#7A421F]">
                  {catPacked} / {catItems.length} Packed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {catItems.map((item) => {
                  const isEssential = item.priority === 'Essential';
                  const isRecommended = item.priority === 'Recommended';

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${
                        item.packed
                          ? 'bg-emerald-50/90 border-emerald-700 opacity-75'
                          : 'bg-white/90 border-[#7A421F] hover:bg-amber-50 shadow-xs'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 shrink-0 text-[#7A421F]"
                      >
                        {item.packed ? (
                          <CheckSquare className="w-5 h-5 text-[#7BC52B]" />
                        ) : (
                          <Square className="w-5 h-5 text-[#A06235]" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`font-bold text-xs sm:text-sm text-[#4A2412] leading-snug ${
                              item.packed ? 'line-through text-gray-500' : ''
                            }`}
                          >
                            {item.name}
                          </span>
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                              isEssential
                                ? 'bg-red-100 text-red-800 border-red-400'
                                : isRecommended
                                ? 'bg-orange-100 text-orange-800 border-orange-400'
                                : 'bg-yellow-100 text-yellow-800 border-yellow-400'
                            }`}
                          >
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-[#7A421F]/80 mt-1 leading-normal">
                          {item.reason}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Completion Card & Navigation */}
      <div className="journal-panel p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-black text-[#4A2412]">
            🎒 PACKING SUMMARY
          </h4>
          <p className="text-xs font-bold text-[#7A421F] mt-0.5">
            Total Items: {totalCount} • Packed: {packedCount} • Remaining: {totalCount - packedCount}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onBackToItinerary}
            className="px-4 py-2 rounded-xl bg-amber-100 text-[#4A2412] border-2 border-[#7A421F] font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm hover:bg-amber-200 btn-3d"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO ITINERARY
          </button>
          <button
            onClick={onBackToTrip}
            className="px-5 py-2 rounded-xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:bg-[#de7b17] btn-3d"
          >
            <Home className="w-4 h-4" />
            BACK TO TRIP
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  RefreshCw, 
  Compass, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Navigation
} from 'lucide-react';
import { TripContext } from '../types/travel';

interface AIAnalysisProps {
  tripContext: TripContext;
  onAnalysisComplete: () => void;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({
  tripContext,
  onAnalysisComplete
}) => {
  const [currentStepText, setCurrentStepText] = useState("Accessing verified destination records...");
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const steps = [
      { p: 25, text: `Verifying geographic boundary for ${tripContext.selected_district}, ${tripContext.selected_state}...` },
      { p: 50, text: `Analyzing travel purpose (${tripContext.purpose.join(', ')}) & climate suitability...` },
      { p: 75, text: `Filtering walking limits, dietary needs & senior/child accessibility...` },
      { p: 90, text: `Assembling day-by-day itinerary & contextual packing essentials...` },
      { p: 100, text: `Matching verified destination intelligence complete!` }
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < steps.length) {
        setProgress(steps[currentIdx].p);
        setCurrentStepText(steps[currentIdx].text);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(onAnalysisComplete, 600);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [tripContext, onAnalysisComplete]);

  return (
    <div className="w-full max-w-xl mx-auto journal-panel p-8 sm:p-10 text-center shadow-2xl border-[3.5px] border-[#7A421F]">
      {/* Animated Icon Emblem */}
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#F28A20] to-[#E06D10] text-white flex items-center justify-center border-[3px] border-[#4A2412] shadow-xl animate-bounce">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#7BC52B] border-2 border-[#4A2412] flex items-center justify-center text-white">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412] tracking-wide font-display">
        TRAVELMIND AI IS ANALYZING YOUR TRIP
      </h2>
      
      <p className="text-sm font-bold text-[#7A421F] mt-2">
        Evaluating verified tourist destinations inside {tripContext.selected_district}, {tripContext.selected_state}
      </p>

      {/* Dynamic Animated Status Box */}
      <div className="mt-6 p-4 rounded-2xl bg-amber-100/90 border-2 border-[#7A421F]">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold text-[#4A2412]">
          <RefreshCw className="w-4 h-4 animate-spin text-[#F28A20]" />
          <span>{currentStepText}</span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full h-4 bg-amber-200 rounded-full border-2 border-[#7A421F] overflow-hidden p-0.5">
          <div
            className="h-full bg-[#F28A20] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-[11px] font-black text-[#7A421F] mt-1">
          {progress}%
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 text-xs font-black text-[#7A421F]">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-[#7BC52B]" /> Zero Hallucination
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-[#F28A20]" /> Strict Location Filter
        </span>
      </div>
    </div>
  );
};

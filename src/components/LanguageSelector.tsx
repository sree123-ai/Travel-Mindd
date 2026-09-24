import React from 'react';
import { Globe2, Check, Sparkles } from 'lucide-react';
import { TripContext } from '../types/travel';

interface LanguageSelectorProps {
  currentLanguage: string;
  onSelectLanguage: (lang: 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn') => void;
}

const LANGUAGES = [
  { code: 'en', native: 'English', englishName: 'English', flagBg: 'bg-blue-100', color: 'border-blue-700' },
  { code: 'ta', native: 'தமிழ்', englishName: 'Tamil', flagBg: 'bg-orange-100', color: 'border-orange-700' },
  { code: 'hi', native: 'हिन्दी', englishName: 'Hindi', flagBg: 'bg-emerald-100', color: 'border-emerald-700' },
  { code: 'te', native: 'తెలుగు', englishName: 'Telugu', flagBg: 'bg-amber-100', color: 'border-amber-700' },
  { code: 'ml', native: 'മലയാളം', englishName: 'Malayalam', flagBg: 'bg-purple-100', color: 'border-purple-700' },
  { code: 'kn', native: 'ಕನ್ನಡ', englishName: 'Kannada', flagBg: 'bg-rose-100', color: 'border-rose-700' }
] as const;

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto journal-panel p-6 sm:p-8 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#3FA9DD] text-white flex items-center justify-center mx-auto mb-3 border-2 border-[#4A2412] shadow-md">
        <Globe2 className="w-6 h-6" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-[#4A2412] tracking-tight font-display">
        CHOOSE YOUR PREFERRED LANGUAGE
      </h2>
      <p className="text-xs sm:text-sm font-semibold text-[#7A421F] mt-1 mb-6">
        Questionnaire, AI insights, packing checklist, itineraries and voice guide will seamlessly switch to your selected language.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
        {LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLanguage(lang.code as any)}
              className={`p-4 rounded-2xl border-[3px] transition-all duration-150 flex flex-col items-center justify-center gap-1 btn-3d ${
                isSelected
                  ? 'border-[#F28A20] bg-orange-100/95 ring-4 ring-[#F28A20]/30 shadow-md translate-y-[-2px]'
                  : `border-[#7A421F] bg-white/90 hover:bg-amber-50`
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-[#4A2412]">
                  {lang.native}
                </span>
                {isSelected && <Check className="w-4 h-4 text-[#7BC52B] stroke-[3]" />}
              </div>
              <span className="text-xs font-bold text-[#7A421F]">
                {lang.englishName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

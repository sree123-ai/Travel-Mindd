import React from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  User, 
  Globe2, 
  LogOut 
} from 'lucide-react';
import { TripContext } from '../types/travel';
import { translations } from '../i18n/translations';

interface HeaderProps {
  tripContext: TripContext;
  onLanguageClick?: () => void;
  onLogoutClick?: () => void;
  onVoiceClick?: () => void;
  isVoiceActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  tripContext,
  onLanguageClick,
  onLogoutClick,
  onVoiceClick,
  isVoiceActive
}) => {
  const t = translations[tripContext.preferred_language] || translations.en;

  return (
    <header className="w-full bg-[#FFF8E6]/95 border-b-[3.5px] border-[#7A421F] shadow-md py-3 px-4 sm:px-6 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Title with SVG Icon (NO question marks) */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F28A20] to-[#E06D10] border-2 border-[#7A421F] flex items-center justify-center shadow-md text-white">
            <Compass className="w-7 h-7 stroke-[2.2] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-wide text-[#4A2412] font-display">
                TRAVELMIND AI
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#7BC52B] text-white border border-[#4A2412] shadow-sm">
                <Sparkles className="w-3 h-3 inline" />
                {t.aiTourismEngine}
              </span>
            </div>
            <p className="text-xs font-bold text-[#7A421F] hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Destination Badge if verified */}
          {tripContext.verified_destination && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100/90 border-2 border-[#7A421F] text-xs font-extrabold text-[#4A2412]">
              <MapPin className="w-3.5 h-3.5 text-[#F28A20]" />
              <span className="max-w-[140px] truncate">{tripContext.verified_destination.name}</span>
            </div>
          )}

          {/* Voice Assistant Toggle */}
          {onVoiceClick && (
            <button
              onClick={onVoiceClick}
              title="AI Voice Assistant"
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border-2 border-[#7A421F] flex items-center gap-1.5 text-xs font-extrabold shadow-sm transition-all btn-3d ${
                isVoiceActive 
                  ? 'bg-red-500 text-white border-red-900' 
                  : 'bg-[#3FA9DD] text-white hover:bg-[#3298c8]'
              }`}
            >
              {isVoiceActive ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">VOICE</span>
            </button>
          )}

          {/* Language Selector Button */}
          {onLanguageClick && (
            <button
              onClick={onLanguageClick}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#FFF5D8] border-2 border-[#7A421F] text-xs font-black text-[#4A2412] flex items-center gap-1.5 hover:bg-amber-100 shadow-sm transition-all btn-3d"
            >
              <Globe2 className="w-4 h-4 text-[#F28A20]" />
              <span className="uppercase">{tripContext.preferred_language}</span>
            </button>
          )}

          {/* User / Profile Icon */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 border-2 border-[#7A421F] text-xs font-bold text-[#4A2412]">
            <User className="w-4 h-4 text-[#7A421F]" />
            <span className="hidden md:inline max-w-[90px] truncate">{tripContext.user_name || 'Guest'}</span>
          </div>

          {onLogoutClick && (
            <button
              onClick={onLogoutClick}
              title="Logout / Reset"
              className="p-2 rounded-xl bg-rose-100 border-2 border-[#7A421F] text-rose-800 hover:bg-rose-200 shadow-sm transition-all btn-3d"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { 
  Check, 
  MapPin, 
  Sparkles, 
  Palmtree, 
  Mountain, 
  Landmark, 
  Compass, 
  Camera, 
  Heart, 
  Users, 
  Sun, 
  CloudRain, 
  Snowflake, 
  Car, 
  Train, 
  Plane, 
  Hotel, 
  Tent, 
  ShieldCheck, 
  Utensils, 
  Footprints,
  Baby,
  Clock,
  Coins,
  ShieldAlert
} from 'lucide-react';

interface OptionCardProps {
  id: string;
  label: string;
  subLabel?: string;
  iconName?: string;
  emoji?: string;
  customIcon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  accentColor?: string;
  tag?: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  id,
  label,
  subLabel,
  iconName,
  emoji,
  customIcon,
  selected,
  onClick,
  accentColor = 'bg-amber-100',
  tag
}) => {
  // Clean icon mapping without broken glyphs or eye-with-slash
  const renderIcon = () => {
    const className = "w-6 h-6 stroke-[2.2] text-[#4A2412]";
    switch (iconName) {
      case 'beach': return <Palmtree className={className} />;
      case 'mountain': return <Mountain className={className} />;
      case 'temple':
      case 'historic': return <Landmark className={className} />;
      case 'nature': return <Compass className={className} />;
      case 'camera': return <Camera className={className} />;
      case 'romantic': return <Heart className={className} />;
      case 'family':
      case 'users': return <Users className={className} />;
      case 'sun': return <Sun className={className} />;
      case 'rain': return <CloudRain className={className} />;
      case 'snow': return <Snowflake className={className} />;
      case 'car': return <Car className={className} />;
      case 'train': return <Train className={className} />;
      case 'plane': return <Plane className={className} />;
      case 'hotel': return <Hotel className={className} />;
      case 'camp': return <Tent className={className} />;
      case 'food': return <Utensils className={className} />;
      case 'walk': return <Footprints className={className} />;
      case 'child': return <Baby className={className} />;
      case 'check': return <Check className={className} />;
      case 'alert':
      case 'caution': return <ShieldAlert className={className} />;
      case 'clock': return <Clock className={className} />;
      case 'coin': return <Coins className={className} />;
      case 'ai': return <Sparkles className="w-6 h-6 stroke-[2.2] text-amber-600" />;
      default: return <MapPin className={className} />;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full text-left p-4 sm:p-5 rounded-2xl border-[3px] transition-all duration-150 cursor-pointer select-none flex items-center gap-4 btn-3d ${
        selected
          ? 'border-[#F28A20] bg-orange-50/95 ring-4 ring-[#F28A20]/25 shadow-lg translate-y-[-2px]'
          : 'border-[#7A421F] bg-[#FFF8E6]/90 hover:bg-amber-50/90 shadow-md'
      }`}
    >
      {/* Icon / Emoji Capsule */}
      <div 
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2 border-[#7A421F] shadow-sm select-none ${
          selected ? 'bg-[#F28A20]/20 text-[#F28A20]' : accentColor
        }`}
      >
        {emoji ? (
          <span role="img" aria-label={label} className="text-2xl leading-none">
            {emoji}
          </span>
        ) : (
          customIcon || renderIcon()
        )}
      </div>

      {/* Text Info */}
      <div className="flex-1 pr-2 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-extrabold text-base sm:text-lg text-[#4A2412] leading-snug">
            {label}
          </h4>
          {tag && (
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-200 text-[#4A2412] border border-[#7A421F]">
              {tag}
            </span>
          )}
        </div>
        {subLabel && (
          <p className="text-xs sm:text-sm font-semibold text-[#7A421F]/85 mt-1 leading-relaxed">
            {subLabel}
          </p>
        )}
      </div>

      {/* Selection State Indicator: Clear Selected vs Unselected Box */}
      <div className="flex items-center shrink-0 self-center">
        {selected ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#7BC52B] border-2 border-[#4A2412] text-white shadow-xs text-xs font-black">
            <Check className="w-3.5 h-3.5 stroke-[3.5]" />
            <span>Selected</span>
          </div>
        ) : (
          <div 
            className="w-6 h-6 rounded-lg border-2 border-[#A06235] bg-white/80 hover:bg-white flex items-center justify-center transition-colors shadow-2xs"
            title="Unselected"
          >
            <span className="sr-only">Unselected</span>
          </div>
        )}
      </div>
    </button>
  );
};

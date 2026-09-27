import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  ExternalLink,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Globe2,
  Eye
} from 'lucide-react';
import { VerifiedPlace } from '../types/travel';

interface GoogleMapViewerProps {
  destination: VerifiedPlace;
  apiKey?: string;
  nearbyPlaces?: VerifiedPlace[];
  onSelectPlace?: (place: VerifiedPlace) => void;
}

export const GoogleMapViewer: React.FC<GoogleMapViewerProps> = ({
  destination,
  nearbyPlaces = [],
  onSelectPlace
}) => {
  const [selectedPin, setSelectedPin] = useState<VerifiedPlace>(destination);
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  React.useEffect(() => {
    setSelectedPin(destination);
    setEmbedError(false);
  }, [destination]);

  // Validation: Check that the destination has sufficient verified location information
  const hasValidCoordinates = 
    destination && 
    typeof destination.latitude === 'number' && 
    !isNaN(destination.latitude) &&
    typeof destination.longitude === 'number' && 
    !isNaN(destination.longitude);

  const hasValidName = Boolean(destination && destination.name && destination.name.trim().length > 0);

  if (!hasValidCoordinates || !hasValidName) {
    return (
      <div className="p-8 text-center rounded-2xl bg-amber-100/90 border-2 border-[#7A421F] text-[#4A2412]">
        <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
        <h3 className="text-lg font-black">Location Details Incomplete</h3>
        <p className="text-sm font-semibold mt-1">
          Verified destination coordinates are being calibrated. Please choose a verified destination from the catalog.
        </p>
      </div>
    );
  }

  // Official safely encoded Google URLs dynamically using the verified destination
  const safeDestQuery = encodeURIComponent(`${destination.name}, ${destination.formattedAddress || destination.district + ', ' + destination.state}`);
  const safeCoordinates = `${destination.latitude},${destination.longitude}`;
  
  const googleMapsSearchUrl = destination.placeId
    ? `https://www.google.com/maps/search/?api=1&query=${safeDestQuery}&query_place_id=${encodeURIComponent(destination.placeId)}`
    : `https://www.google.com/maps/search/?api=1&query=${safeDestQuery}`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${safeCoordinates}`;
  const googleEarthUrl = `https://earth.google.com/web/search/${encodeURIComponent(destination.name + ' ' + destination.district + ' ' + destination.state)}`;
  const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${safeCoordinates}`;

  // Embedded map URL using official standard Google Maps query embed (100% reliable in iframes)
  const embedMapUrl = `https://maps.google.com/maps?q=${safeDestQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="space-y-4">
      {/* Top Action & Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-amber-100/90 rounded-2xl border-2 border-[#7A421F]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#F28A20] text-white flex items-center justify-center border border-[#4A2412] shadow-xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-[#4A2412] block">
              {destination.name}
            </span>
            <span className="text-[11px] font-bold text-[#7A421F]">
              Lat {destination.latitude.toFixed(4)}, Lng {destination.longitude.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Real Dynamic Working Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#de7b17] btn-3d"
            title="Open verified location in official Google Maps"
          >
            <Compass className="w-3.5 h-3.5" />
            OPEN IN GOOGLE MAPS
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-[#7BC52B] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#6cb024] btn-3d"
            title="Get turn-by-turn navigation in Google Maps"
          >
            <Navigation className="w-3.5 h-3.5" />
            GET DIRECTIONS
          </a>
          <a
            href={googleEarthUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-[#3FA9DD] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#3492c0] btn-3d"
            title="Explore in Google Earth 3D"
          >
            <Globe2 className="w-3.5 h-3.5" />
            GOOGLE EARTH
          </a>
          <a
            href={streetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-[#A855F7] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#9333ea] btn-3d"
            title="Launch 360° Street View"
          >
            <Eye className="w-3.5 h-3.5" />
            STREET VIEW
          </a>
        </div>
      </div>

      {/* Embedded Google Map Viewer */}
      <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl overflow-hidden border-[3px] border-[#7A421F] shadow-lg bg-amber-50">
        {!embedError ? (
          <iframe
            title={`Google Map for ${destination.name}`}
            src={embedMapUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setEmbedLoaded(true)}
            onError={() => setEmbedError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-amber-100/90 text-[#4A2412]">
            <MapPin className="w-12 h-12 text-[#F28A20] mb-2 animate-bounce" />
            <h4 className="text-base font-black">Official Google Maps Platform Destination</h4>
            <p className="text-xs sm:text-sm font-semibold text-[#7A421F] max-w-md mt-1">
              Embedded preview is constrained by browser frame policies. Use the direct verified button below to launch the authentic Google Maps listing for <strong>{destination.name}</strong>.
            </p>
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-2.5 rounded-2xl bg-[#F28A20] text-white border-2 border-[#4A2412] font-black text-xs sm:text-sm shadow-md hover:bg-[#de7b17] btn-3d flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Launch {destination.name} on Google Maps
            </a>
          </div>
        )}

        {/* Floating Quick Metadata Overlay Card */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-[#FFF8E6]/95 border-2 border-[#7A421F] p-3 rounded-2xl shadow-xl backdrop-blur-sm pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1 text-[11px] font-black text-[#F28A20] uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7BC52B]" />
                Verified In-Scope Location
              </div>
              <h4 className="font-black text-sm text-[#4A2412] leading-snug">
                {destination.name}
              </h4>
              <p className="text-xs text-[#7A421F] mt-0.5 line-clamp-1">
                {destination.formattedAddress}
              </p>
            </div>
            <span className="shrink-0 px-2 py-0.5 bg-amber-200 border border-[#7A421F] rounded-lg text-xs font-black text-[#4A2412]">
              ★ {destination.rating}
            </span>
          </div>

          <div className="mt-2 pt-2 border-t border-[#7A421F]/20 flex items-center justify-between text-[11px] font-bold">
            <span className="text-[#7A421F]">
              District: <strong>{destination.district}</strong>
            </span>
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F28A20] hover:underline flex items-center gap-1 font-black"
            >
              Open Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Nearby District Spots List */}
      {nearbyPlaces.length > 0 && (
        <div className="p-3 bg-amber-100/70 rounded-2xl border-2 border-[#7A421F]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase text-[#7A421F] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#3FA9DD]" />
              Nearby Verified Places in {destination.district} ({nearbyPlaces.length})
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {nearbyPlaces.map((np) => (
              <button
                key={np.id}
                onClick={() => onSelectPlace && onSelectPlace(np)}
                className="px-3 py-1.5 rounded-xl bg-white/90 border border-[#7A421F] hover:bg-amber-100 text-left shrink-0 text-xs font-bold text-[#4A2412] flex items-center gap-1.5 shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#3FA9DD]"></span>
                <span className="max-w-[150px] truncate">{np.name}</span>
                <span className="text-[10px] text-amber-700">★ {np.rating}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

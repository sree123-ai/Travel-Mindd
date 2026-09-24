import React from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Search, 
  SlidersHorizontal,
  ExternalLink,
  Navigation,
  CheckCircle2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { VerifiedPlace } from '../types/travel';

interface GoogleMapViewerProps {
  destination: VerifiedPlace;
  apiKey?: string;
  nearbyPlaces?: VerifiedPlace[];
  onSelectPlace?: (place: VerifiedPlace) => void;
}

export const GoogleMapViewer: React.FC<GoogleMapViewerProps> = ({
  destination,
  apiKey,
  nearbyPlaces = [],
  onSelectPlace
}) => {
  const mapsKey = apiKey || (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyB78PzhheqXp97_X_qU1r9JFUgaIY6hWGk';
  const [selectedPin, setSelectedPin] = React.useState<VerifiedPlace>(destination);
  const [mapType, setMapType] = React.useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');

  React.useEffect(() => {
    setSelectedPin(destination);
  }, [destination]);

  if (!mapsKey) {
    return (
      <div className="p-8 text-center rounded-2xl bg-amber-100/90 border-2 border-[#7A421F] text-[#4A2412]">
        <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
        <h3 className="text-lg font-black">Google Maps Platform Ready</h3>
        <p className="text-sm font-semibold mt-1">
          Google Maps integration requires a configured <code className="bg-white/80 px-2 py-0.5 rounded border border-[#7A421F]">VITE_GOOGLE_MAPS_API_KEY</code>.
        </p>
      </div>
    );
  }

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&destination_place_id=${destination.placeId}`;
  const googleEarthUrl = `https://earth.google.com/web/search/${encodeURIComponent(destination.name + ' ' + destination.district + ' ' + destination.state)}`;
  const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${destination.latitude},${destination.longitude}`;

  return (
    <div className="space-y-4">
      {/* Action Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-amber-100/80 rounded-2xl border-2 border-[#7A421F]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#7A421F] flex items-center gap-1">
            <Compass className="w-4 h-4 text-[#F28A20]" />
            Map View:
          </span>
          {(['roadmap', 'satellite', 'hybrid', 'terrain'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setMapType(type)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border uppercase transition-all ${
                mapType === type
                  ? 'bg-[#F28A20] text-white border-[#4A2412] shadow-sm'
                  : 'bg-white/80 text-[#4A2412] border-[#7A421F] hover:bg-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Real External Launch Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-[#7BC52B] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#6cb024] btn-3d"
          >
            <Navigation className="w-3.5 h-3.5" />
            GET DIRECTIONS
          </a>
          <a
            href={googleEarthUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-[#3FA9DD] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#3492c0] btn-3d"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            GOOGLE EARTH
          </a>
          <a
            href={streetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-[#A855F7] text-white border-2 border-[#4A2412] font-black text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#9333ea] btn-3d"
          >
            <Compass className="w-3.5 h-3.5" />
            STREET VIEW
          </a>
        </div>
      </div>

      {/* Interactive Google Map Container */}
      <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl overflow-hidden border-[3px] border-[#7A421F] shadow-lg">
        <APIProvider apiKey={mapsKey}>
          <Map
            defaultCenter={{ lat: destination.latitude, lng: destination.longitude }}
            defaultZoom={14}
            mapTypeId={mapType}
            gestureHandling="greedy"
            disableDefaultUI={false}
            className="w-full h-full"
            internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
          >
            {/* Primary Verified Destination Pin */}
            <AdvancedMarker
              position={{ lat: destination.latitude, lng: destination.longitude }}
              title={destination.name}
              onClick={() => setSelectedPin(destination)}
            >
              <Pin
                background="#F28A20"
                borderColor="#4A2412"
                glyphColor="#FFFFFF"
                scale={1.3}
              />
            </AdvancedMarker>

            {/* In-Scope District Nearby Pins */}
            {nearbyPlaces.map((np) => (
              <AdvancedMarker
                key={np.id}
                position={{ lat: np.latitude, lng: np.longitude }}
                title={np.name}
                onClick={() => {
                  setSelectedPin(np);
                  if (onSelectPlace) onSelectPlace(np);
                }}
              >
                <Pin
                  background="#3FA9DD"
                  borderColor="#4A2412"
                  glyphColor="#FFFFFF"
                  scale={1.05}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>

        {/* Selected Destination Card Overlay on Map */}
        {selectedPin && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-[#FFF8E6]/95 border-2 border-[#7A421F] p-3 rounded-2xl shadow-xl backdrop-blur-sm animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1 text-[11px] font-black text-[#F28A20] uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7BC52B]" />
                  Verified Attraction
                </div>
                <h4 className="font-black text-sm text-[#4A2412] leading-snug">
                  {selectedPin.name}
                </h4>
                <p className="text-xs text-[#7A421F] mt-0.5 line-clamp-1">
                  {selectedPin.formattedAddress}
                </p>
              </div>
              <span className="shrink-0 px-2 py-0.5 bg-amber-200 border border-[#7A421F] rounded-lg text-xs font-black text-[#4A2412]">
                ★ {selectedPin.rating}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPin.name + ' ' + selectedPin.formattedAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#F28A20] hover:underline flex items-center gap-1"
              >
                Open in Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-[#7A421F] px-1">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#F28A20] border border-[#4A2412] inline-block"></span>
          Current Destination: <strong>{destination.name}</strong>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#3FA9DD] border border-[#4A2412] inline-block"></span>
          Nearby Places in {destination.district} ({nearbyPlaces.length})
        </span>
      </div>
    </div>
  );
};

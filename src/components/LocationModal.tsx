import React from 'react';
import { Language } from '../i18n/translations';
import { X, Check, Navigation } from 'lucide-react';

export interface LocationPreset {
  name: string;
  nameTa: string;
  lat: number;
  lon: number;
}

export const LOCATION_PRESETS: LocationPreset[] = [
  { name: 'Chennai, India', nameTa: 'சென்னை', lat: 13.0827, lon: 80.2707 },
  { name: 'Madurai, India', nameTa: 'மதுரை', lat: 9.9252, lon: 78.1198 },
  { name: 'Jaffna, Sri Lanka', nameTa: 'யாழ்ப்பாணம்', lat: 9.6615, lon: 80.0255 },
  { name: 'Singapore', nameTa: 'சிங்கப்பூர்', lat: 1.3521, lon: 103.8198 },
  { name: 'Kuala Lumpur, Malaysia', nameTa: 'கோலாலம்பூர்', lat: 3.1390, lon: 101.6869 },
  { name: 'London, UK', nameTa: 'லண்டன்', lat: 51.5074, lon: -0.1278 },
  { name: 'Toronto, Canada', nameTa: 'டொராண்டோ', lat: 43.6532, lon: -79.3832 },
  { name: 'San Jose, USA (Bay Area)', nameTa: 'சான் ஓசே (கலிபோர்னியா)', lat: 37.3382, lon: -121.8863 },
  { name: 'New York, USA', nameTa: 'நியூயார்க்', lat: 40.7128, lon: -74.0060 },
  { name: 'Sydney, Australia', nameTa: 'சிட்னி', lat: -33.8688, lon: 151.2093 }
];

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: LocationPreset;
  onSelectLocation: (loc: LocationPreset) => void;
  lang: Language;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  selectedLocation,
  onSelectLocation,
  lang
}) => {
  if (!isOpen) return null;

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onSelectLocation({
            name: 'Current Location',
            nameTa: 'தற்போதைய இடம்',
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          });
          onClose();
        },
        () => {
          alert('Could not retrieve current location.');
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-amber-200">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <h3 className="text-base font-bold text-amber-950">
            {lang === 'ta' ? 'இடத்தை தேர்வு செய்க' : 'Select Location'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-500 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Option */}
        <button
          onClick={handleUseCurrentLocation}
          className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-semibold transition"
        >
          <Navigation className="w-3.5 h-3.5 text-amber-700" />
          <span>{lang === 'ta' ? 'என் இருப்பிடம் (GPS)' : 'Use My Current Location'}</span>
        </button>

        {/* Presets List */}
        <div className="mt-4 max-h-60 overflow-y-auto space-y-1 divide-y divide-stone-100">
          {LOCATION_PRESETS.map((loc, idx) => {
            const isSelected = selectedLocation.name === loc.name;
            const displayName = lang === 'ta' ? loc.nameTa : loc.name;
            return (
              <button
                key={idx}
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-2.5 text-left rounded-lg text-xs transition ${
                  isSelected
                    ? 'bg-amber-50 font-bold text-amber-900'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{displayName}</span>
                {isSelected && <Check className="w-4 h-4 text-amber-700" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

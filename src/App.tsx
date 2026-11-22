import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { MoonPhaseCard } from './components/MoonPhaseCard';
import { TamilDateCard } from './components/TamilDateCard';
import { PanchangamGrid } from './components/PanchangamGrid';
import { AuspiciousTimes } from './components/AuspiciousTimes';
import { SacredDayBanner } from './components/SacredDayBanner';
import { LocationModal, LOCATION_PRESETS, LocationPreset } from './components/LocationModal';
import { calculatePanchangam } from './engine/tamilCalendar';
import { Language, translations } from './i18n/translations';
import { WifiOff, Heart } from 'lucide-react';

export function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [lang, setLang] = useState<Language>('ta');
  const [location, setLocation] = useState<LocationPreset>(LOCATION_PRESETS[0]); // Default Chennai
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Compute daily panchangam deterministically
  const panchangam = useMemo(() => {
    return calculatePanchangam(selectedDate, location.lat, location.lon);
  }, [selectedDate, location]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ta' ? 'en' : 'ta'));
  };

  const t = translations[lang];
  const thithiName = lang === 'ta' ? panchangam.thithi.entity.ta : panchangam.thithi.entity.en;
  const locationDisplayName = lang === 'ta' ? location.nameTa : location.name;

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/50 text-stone-900 font-sans pb-12">
      {/* App Header */}
      <Header
        currentDate={selectedDate}
        onDateChange={setSelectedDate}
        lang={lang}
        onToggleLang={handleToggleLang}
        locationName={locationDisplayName}
        onChangeLocation={() => setIsLocationModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 space-y-4">
        {/* Sacred Day / Viratham Announcement (if applicable) */}
        <SacredDayBanner virathamTitle={panchangam.virathamTitle} lang={lang} />

        {/* Top Half: Moon Phase & Thithi Card */}
        <MoonPhaseCard
          moonPhase={panchangam.moonPhase}
          paksha={panchangam.paksha}
          thithiName={thithiName}
          lang={lang}
        />

        {/* Bottom Half: Tamil Date Card */}
        <TamilDateCard panchangam={panchangam} lang={lang} />

        {/* 4-Tile Panchangam Attributes */}
        <PanchangamGrid panchangam={panchangam} lang={lang} />

        {/* Auspicious & Inauspicious Timings */}
        <AuspiciousTimes panchangam={panchangam} lang={lang} />

        {/* Footer Meta: Offline-first assurance */}
        <div className="pt-4 pb-2 flex flex-col items-center justify-center gap-1.5 text-xs text-stone-500">
          <div className="flex items-center gap-1 text-[11px] font-medium text-amber-800/80 bg-amber-100/60 px-2.5 py-0.5 rounded-full">
            <WifiOff className="w-3 h-3 text-amber-700" />
            <span>{t.offlineReady} (Local Ephemeris Engine)</span>
          </div>
          <p className="flex items-center gap-1 text-[11px] text-stone-400 mt-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>for the Global Tamil Community</span>
          </p>
        </div>
      </main>

      {/* Location Picker Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedLocation={location}
        onSelectLocation={setLocation}
        lang={lang}
      />
    </div>
  );
}

export default App;

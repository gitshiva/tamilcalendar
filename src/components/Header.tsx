import React from 'react';
import { ChevronLeft, ChevronRight, MapPin, Globe } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface HeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  lang: Language;
  onToggleLang: () => void;
  locationName: string;
  onChangeLocation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDate,
  onDateChange,
  lang,
  onToggleLang,
  locationName,
  onChangeLocation
}) => {
  const t = translations[lang];

  const handlePrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    onDateChange(prev);
  };

  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    onDateChange(next);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const isToday =
    new Date().toDateString() === currentDate.toDateString();

  return (
    <header className="sticky top-0 z-30 bg-amber-900/95 backdrop-blur-md text-amber-50 shadow-md border-b border-amber-800/60 px-4 py-3">
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {/* Top Row: App branding + Language Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-amber-100 flex items-center gap-2">
              <span className="text-2xl">🕉️</span>
              {t.appTitle}
            </h1>
            <p className="text-xs text-amber-200/80 font-medium">
              {t.appSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-800/80 hover:bg-amber-700/80 border border-amber-600/50 text-xs font-semibold text-amber-100 transition shadow-xs active:scale-95"
              title="Toggle Tamil / English"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'ta' ? 'English' : 'தமிழ்'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Row: Location + Date Controls */}
        <div className="flex items-center justify-between pt-1 border-t border-amber-800/40 text-xs">
          {/* Location Badge */}
          <button
            onClick={onChangeLocation}
            className="flex items-center gap-1 text-amber-200/90 hover:text-amber-100 font-medium transition group"
            title={t.changeLocation}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition" />
            <span className="underline decoration-amber-500/50 underline-offset-2">{locationName}</span>
          </button>

          {/* Date Navigator */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevDay}
              className="p-1 rounded-md hover:bg-amber-800/80 text-amber-200 transition"
              aria-label={t.prevDay}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleToday}
              className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition ${
                isToday
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'bg-amber-800/60 text-amber-200 hover:bg-amber-700/60'
              }`}
            >
              {t.today}
            </button>

            <button
              onClick={handleNextDay}
              className="p-1 rounded-md hover:bg-amber-800/80 text-amber-200 transition"
              aria-label={t.nextDay}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

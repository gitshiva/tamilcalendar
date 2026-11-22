import React from 'react';
import { DailyPanchangam } from '../engine/tamilCalendar';
import { Language, translations } from '../i18n/translations';
import { Calendar as CalendarIcon } from 'lucide-react';

interface TamilDateCardProps {
  panchangam: DailyPanchangam;
  lang: Language;
}

export const TamilDateCard: React.FC<TamilDateCardProps> = ({ panchangam, lang }) => {
  const t = translations[lang];
  const { tamilYear, tamilMonth, tamilDate, weekday, gregorianFormatted } = panchangam;

  const yearDisplay = lang === 'ta' ? `${tamilYear.ta} வருடம்` : `${tamilYear.en} Year`;
  const monthDisplay = lang === 'ta' ? tamilMonth.ta : tamilMonth.en;
  const weekdayDisplay = lang === 'ta' ? `${weekday.ta}க்கிழமை` : weekday.en;

  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur-xs p-5 shadow-sm border border-amber-200/80 hover:border-amber-300 transition">
      {/* Top Meta: Tamil Year + Gregorian date */}
      <div className="flex items-center justify-between text-xs text-amber-900/80 pb-3 border-b border-amber-100">
        <span className="font-bold text-amber-800 tracking-wide bg-amber-100/70 px-2.5 py-1 rounded-md">
          {yearDisplay}
        </span>
        <div className="flex items-center gap-1.5 text-stone-600 font-medium">
          <CalendarIcon className="w-3.5 h-3.5 text-amber-700" />
          <span>{gregorianFormatted}</span>
        </div>
      </div>

      {/* Main Feature: Month, Date, and Day */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="text-3xl md:text-4xl font-extrabold text-amber-950 tracking-tight flex items-baseline gap-2">
            <span>{monthDisplay}</span>
            <span className="text-4xl md:text-5xl font-black text-amber-700">{tamilDate}</span>
          </div>
          <div className="text-sm font-semibold text-stone-700 mt-1">
            {weekdayDisplay}
          </div>
        </div>

        {/* Small Traditional Kolam / Emblem decoration */}
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-800 font-bold text-xs select-none shadow-inner">
          <span className="text-2xl">☀️</span>
        </div>
      </div>
    </div>
  );
};

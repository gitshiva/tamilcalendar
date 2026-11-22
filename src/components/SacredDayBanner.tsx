import React from 'react';
import { Language } from '../i18n/translations';
import { Flame } from 'lucide-react';

interface SacredDayBannerProps {
  virathamTitle?: { ta: string; en: string };
  lang: Language;
}

export const SacredDayBanner: React.FC<SacredDayBannerProps> = ({ virathamTitle, lang }) => {
  if (!virathamTitle) return null;

  const title = lang === 'ta' ? virathamTitle.ta : virathamTitle.en;

  return (
    <div className="rounded-xl bg-linear-to-r from-amber-600 via-amber-700 to-amber-600 text-white p-3.5 shadow-md flex items-center gap-3 border border-amber-500/50">
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        <Flame className="w-5 h-5 text-amber-200" />
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
          {lang === 'ta' ? 'இன்றைய சிறப்பு / விரதம்' : 'Today\'s Sacred Fasting Day'}
        </div>
        <div className="text-sm md:text-base font-bold text-white drop-shadow-xs">
          🌟 {title}
        </div>
      </div>
    </div>
  );
};

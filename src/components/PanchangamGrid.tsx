import React from 'react';
import { DailyPanchangam } from '../engine/tamilCalendar';
import { Language, translations } from '../i18n/translations';
import { Compass, Moon, Star, Sun } from 'lucide-react';

interface PanchangamGridProps {
  panchangam: DailyPanchangam;
  lang: Language;
}

export const PanchangamGrid: React.FC<PanchangamGridProps> = ({ panchangam, lang }) => {
  const t = translations[lang];
  const { thithi, nakshatra, yogam, karanam } = panchangam;

  const thithiName = lang === 'ta' ? thithi.entity.ta : thithi.entity.en;
  const nakshatraName = lang === 'ta' ? nakshatra.entity.ta : nakshatra.entity.en;
  const yogamName = lang === 'ta' ? yogam.ta : yogam.en;
  const karanamName = lang === 'ta' ? karanam.ta : karanam.en;

  const items = [
    {
      label: t.thithi,
      value: thithiName,
      icon: Moon,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50/70 border-amber-200/80'
    },
    {
      label: t.nakshatra,
      value: nakshatraName,
      icon: Star,
      color: 'text-amber-800',
      bgColor: 'bg-amber-50/70 border-amber-200/80'
    },
    {
      label: t.yogam,
      value: yogamName,
      icon: Sun,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50/50 border-emerald-200/60'
    },
    {
      label: t.karanam,
      value: karanamName,
      icon: Compass,
      color: 'text-stone-700',
      bgColor: 'bg-stone-50/70 border-stone-200/80'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${item.bgColor} backdrop-blur-xs flex flex-col justify-between transition shadow-2xs hover:shadow-xs`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                {item.label}
              </span>
              <Icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div className="mt-2 text-base md:text-lg font-bold text-stone-900 leading-snug">
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

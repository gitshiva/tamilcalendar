import React from 'react';
import { DailyPanchangam } from '../engine/tamilCalendar';
import { Language, translations } from '../i18n/translations';
import { Clock, ShieldAlert, Sparkles } from 'lucide-react';

interface AuspiciousTimesProps {
  panchangam: DailyPanchangam;
  lang: Language;
}

export const AuspiciousTimes: React.FC<AuspiciousTimesProps> = ({ panchangam, lang }) => {
  const t = translations[lang];
  const { nallaNeram, rahuKalam, yamagandam, kuligai } = panchangam;

  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur-xs p-5 shadow-sm border border-amber-200/80">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-100">
        <Clock className="w-4 h-4 text-amber-700" />
        <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
          {t.auspiciousTimings}
        </h3>
      </div>

      <div className="space-y-2.5 text-xs">
        {/* Nalla Neram */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/60">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.nallaNeram}</span>
          </div>
          <div className="font-semibold text-emerald-950 text-right">
            {nallaNeram.map((n, i) => (
              <span key={i} className="inline-block ml-2">
                {n.start} - {n.end}
              </span>
            ))}
          </div>
        </div>

        {/* Rahu Kalam */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-rose-50/70 border border-rose-200/60">
          <div className="flex items-center gap-1.5 font-bold text-rose-900">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>{t.rahuKalam}</span>
          </div>
          <span className="font-bold text-rose-950">
            {rahuKalam.start} - {rahuKalam.end}
          </span>
        </div>

        {/* Yamagandam */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/60 border border-amber-200/50">
          <span className="font-semibold text-stone-700">{t.yamagandam}</span>
          <span className="font-medium text-stone-900">
            {yamagandam.start} - {yamagandam.end}
          </span>
        </div>

        {/* Kuligai */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/60 border border-amber-200/50">
          <span className="font-semibold text-stone-700">{t.kuligai}</span>
          <span className="font-medium text-stone-900">
            {kuligai.start} - {kuligai.end}
          </span>
        </div>
      </div>
    </div>
  );
};

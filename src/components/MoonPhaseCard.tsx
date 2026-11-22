import React from 'react';
import { MoonPhaseInfo } from '../engine/astronomy';
import { Language, translations } from '../i18n/translations';
import { Sparkles } from 'lucide-react';

interface MoonPhaseCardProps {
  moonPhase: MoonPhaseInfo;
  paksha: { ta: string; en: string };
  thithiName: string;
  lang: Language;
}

export const MoonPhaseCard: React.FC<MoonPhaseCardProps> = ({
  moonPhase,
  paksha,
  thithiName,
  lang
}) => {
  const t = translations[lang];
  const percent = Math.round(moonPhase.illumination * 100);

  // SVG representation for moon phase:
  // We can render a base dark moon circle, then overlay the illuminated disc segment
  const radius = 38;
  const cx = 50;
  const cy = 50;

  // Calculate curvature of terminator based on phase
  // Phase angle ranges from 0 to 360
  const isWaxing = moonPhase.isWaxing;
  const illumFraction = moonPhase.illumination;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-stone-900 via-amber-950 to-stone-900 text-amber-50 p-5 shadow-lg border border-amber-800/40">
      {/* Decorative celestial background stars */}
      <div className="absolute top-2 right-4 text-amber-300/20 text-xs select-none">✦</div>
      <div className="absolute top-8 left-6 text-amber-200/20 text-sm select-none">✧</div>
      <div className="absolute bottom-4 right-10 text-amber-300/20 text-base select-none">✦</div>

      <div className="flex items-center justify-between gap-4">
        {/* Left: Moon Phase Visual Render */}
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 relative flex items-center justify-center drop-shadow-[0_0_15px_rgba(251,191,36,0.25)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fffbeb" />
                  <stop offset="70%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#d97706" />
                </radialGradient>
                <radialGradient id="darkSide" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#292524" />
                  <stop offset="100%" stopColor="#1c1917" />
                </radialGradient>
              </defs>

              {/* Base Moon Sphere */}
              <circle cx={cx} cy={cy} r={radius} fill="url(#darkSide)" stroke="#78350f" strokeWidth="1" />

              {/* Illuminated phase disc */}
              {illumFraction > 0.03 && (
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx={radius * (isWaxing ? illumFraction : (1 - illumFraction))}
                  ry={radius}
                  fill="url(#moonGlow)"
                  opacity="0.95"
                />
              )}

              {/* Full moon overlay */}
              {illumFraction >= 0.95 && (
                <circle cx={cx} cy={cy} r={radius} fill="url(#moonGlow)" opacity="0.95" />
              )}
            </svg>
          </div>
          <span className="mt-1 text-[11px] font-semibold tracking-wide text-amber-300/90">
            {percent}% {t.illumination}
          </span>
        </div>

        {/* Right: Thithi & Celestial Context */}
        <div className="flex-1 flex flex-col justify-center space-y-1.5">
          {/* Paksha Pill */}
          <div className="inline-flex items-center gap-1 self-start px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{lang === 'ta' ? paksha.ta : paksha.en}</span>
          </div>

          {/* Current Thithi Highlight */}
          <div>
            <span className="text-xs text-amber-300/70 uppercase tracking-wider font-semibold">
              {t.thithi}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-amber-100 leading-tight">
              {thithiName}
            </h2>
          </div>

          {/* Moon phase name in selected language */}
          <p className="text-xs text-amber-200/80 font-medium italic">
            {lang === 'ta' ? moonPhase.phaseNameTa : moonPhase.phaseNameEn}
          </p>
        </div>
      </div>
    </div>
  );
};

import {
  TAMIL_YEARS,
  TAMIL_MONTHS,
  TAMIL_WEEKDAYS,
  THITHIS,
  NAKSHATRAS,
  TamilEntity
} from './constants';
import {
  getJulianDay,
  getJulianCenturies,
  getLahiriAyanamsha,
  getSunLongitude,
  getMoonLongitude,
  getMoonPhase,
  getSunTimes,
  MoonPhaseInfo
} from './astronomy';

export interface TimeRange {
  start: string;
  end: string;
}

export interface DailyPanchangam {
  date: Date;
  tamilYear: TamilEntity;
  tamilMonth: TamilEntity;
  tamilDate: number;
  weekday: TamilEntity;
  gregorianFormatted: string;
  moonPhase: MoonPhaseInfo;
  paksha: { ta: string; en: string };
  thithi: { entity: TamilEntity; index: number; isPournamiOrAmavasai: boolean };
  nakshatra: { entity: TamilEntity; index: number };
  yogam: { ta: string; en: string };
  karanam: { ta: string; en: string };
  rahuKalam: TimeRange;
  yamagandam: TimeRange;
  kuligai: TimeRange;
  nallaNeram: TimeRange[];
  virathamTitle?: { ta: string; en: string };
}

// Convert fractional hours (e.g. 7.5) to formatted "07:30 AM"
export function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(displayH)}:${pad(m)} ${period}`;
}

export function calculatePanchangam(date: Date, lat = 13.0827, lon = 80.2707): DailyPanchangam {
  const jd = getJulianDay(date);
  const t = getJulianCenturies(jd);
  const ayanamsha = getLahiriAyanamsha(t);

  // Tropical coordinates
  const sunSayana = getSunLongitude(t);
  const moonSayana = getMoonLongitude(t);

  // Sidereal (Nirayana) coordinates
  const sunNirayana = (sunSayana - ayanamsha + 360) % 360;
  const moonNirayana = (moonSayana - ayanamsha + 360) % 360;

  // 1. Thithi Calculation: (Moon - Sun) / 12 degrees
  let diff = (moonNirayana - sunNirayana + 360) % 360;
  const thithiIndex = Math.floor(diff / 12) + 1; // 1 to 30
  const isShukla = thithiIndex <= 15;
  const paksha = isShukla
    ? { ta: 'சுக்கில பட்சம் (வளர்பிறை)', en: 'Shukla Paksha (Waxing)' }
    : { ta: 'கிருஷ்ண பட்சம் (தேய்பிறை)', en: 'Krishna Paksha (Waning)' };

  // Map to 1-15 thithi entity
  const normalizedThithiNum = thithiIndex <= 15 ? thithiIndex : thithiIndex - 15;
  const thithiEntity = THITHIS[normalizedThithiNum - 1] || THITHIS[0];
  const isPournamiOrAmavasai = thithiIndex === 15 || thithiIndex === 30;

  // 2. Nakshatra Calculation: Moon Nirayana / 13° 20' (13.3333°)
  const nakshatraIndex = Math.floor(moonNirayana / (360 / 27)) + 1; // 1 to 27
  const nakshatraEntity = NAKSHATRAS[nakshatraIndex - 1] || NAKSHATRAS[0];

  // 3. Tamil Month: Sun Nirayana / 30 degrees (Mesha = Chithirai = 0)
  const monthIndex = Math.floor(sunNirayana / 30); // 0 to 11
  const tamilMonth = TAMIL_MONTHS[monthIndex] || TAMIL_MONTHS[0];

  // Tamil day approximation based on degrees inside the solar sign
  const degreeInSign = sunNirayana % 30;
  const tamilDate = Math.floor(degreeInSign) + 1;

  // 4. Tamil 60-Year Jovian Cycle
  // Chithirai 1 of 2024 is Krodhi (index 37)
  const gregorianYear = date.getFullYear();
  // If date is before April 14 (Chithirai 1), it belongs to previous Tamil Year
  const isBeforeNewYear = date.getMonth() < 3 || (date.getMonth() === 3 && date.getDate() < 14);
  const effectiveYear = isBeforeNewYear ? gregorianYear - 1 : gregorianYear;
  // Year 2024 = index 37 (Krodhi) -> offset formula: (effectiveYear - 1987 + 60) % 60
  const yearIndex = (effectiveYear - 1987 + 60) % 60;
  const tamilYear = TAMIL_YEARS[yearIndex] || TAMIL_YEARS[0];

  // 5. Weekday
  const dayOfWeek = date.getDay(); // 0 is Sunday
  const weekday = TAMIL_WEEKDAYS[dayOfWeek];

  // 6. Moon Phase
  const moonPhase = getMoonPhase(date);

  // 7. Auspicious & Inauspicious Timings
  const { sunriseHours, sunsetHours } = getSunTimes(date, lat, lon);
  const dayLength = sunsetHours - sunriseHours;
  const segment = dayLength / 8;

  // Rahu Kalam Segment Index (1-based from Sunrise: Sun=8, Mon=2, Tue=7, Wed=5, Thu=6, Fri=4, Sat=3)
  const rahuMap = [8, 2, 7, 5, 6, 4, 3];
  const rahuSeg = rahuMap[dayOfWeek];
  const rahuStart = sunriseHours + (rahuSeg - 1) * segment;
  const rahuEnd = rahuStart + segment;

  // Yamagandam Segment Index (Sun=5, Mon=4, Tue=3, Wed=2, Thu=1, Fri=7, Sat=6)
  const yamaMap = [5, 4, 3, 2, 1, 7, 6];
  const yamaSeg = yamaMap[dayOfWeek];
  const yamaStart = sunriseHours + (yamaSeg - 1) * segment;
  const yamaEnd = yamaStart + segment;

  // Kuligai Segment Index (Sun=7, Mon=6, Tue=5, Wed=4, Thu=3, Fri=2, Sat=1)
  const kuliMap = [7, 6, 5, 4, 3, 2, 1];
  const kuliSeg = kuliMap[dayOfWeek];
  const kuliStart = sunriseHours + (kuliSeg - 1) * segment;
  const kuliEnd = kuliStart + segment;

  // Nalla Neram (General standard good timing morning & evening)
  const nallaNeramMap = [
    [{ s: 7.5, e: 9.0 }, { s: 16.5, e: 18.0 }], // Sun
    [{ s: 6.5, e: 7.5 }, { s: 16.5, e: 17.5 }], // Mon
    [{ s: 7.5, e: 8.5 }, { s: 16.5, e: 17.5 }], // Tue
    [{ s: 9.0, e: 10.0 }, { s: 13.5, e: 14.5 }], // Wed
    [{ s: 9.0, e: 10.5 }, { s: 14.0, e: 15.0 }], // Thu
    [{ s: 9.0, e: 10.5 }, { s: 16.5, e: 17.5 }], // Fri
    [{ s: 7.5, e: 9.0 }, { s: 16.5, e: 18.0 }]   // Sat
  ];
  const nallaNeramRanges = nallaNeramMap[dayOfWeek].map(r => ({
    start: formatHours(r.s),
    end: formatHours(r.e)
  }));

  // 8. Detect Special Vratas / Sacred Days
  let virathamTitle: { ta: string; en: string } | undefined;
  if (thithiIndex === 15) {
    virathamTitle = { ta: 'பௌர்ணமி கிரிவலம் & விரதம்', en: 'Pournami (Full Moon Vratam)' };
  } else if (thithiIndex === 30) {
    virathamTitle = { ta: 'சர்வாலய அமாவாசை தர்ப்பணம்', en: 'Amavasai (New Moon Tharpanam)' };
  } else if (normalizedThithiNum === 13) {
    virathamTitle = { ta: 'சோமவார / சனி மகா பிரதோஷம்', en: 'Pradosha Vratam (Lord Shiva)' };
  } else if (normalizedThithiNum === 11) {
    virathamTitle = { ta: 'சர்வ ஏகாதசி விரதம்', en: 'Ekadashi Vratam (Lord Vishnu)' };
  } else if (normalizedThithiNum === 6) {
    virathamTitle = { ta: 'ஸ்கந்த சஷ்டி விரதம்', en: 'Skanda Sashti (Lord Murugan)' };
  } else if (!isShukla && normalizedThithiNum === 4) {
    virathamTitle = { ta: 'சங்கடஹர சதுர்த்தி விரதம்', en: 'Sankatahara Chaturthi (Lord Ganesha)' };
  }

  // 9. Yogam & Karanam
  const yogamSum = (sunNirayana + moonNirayana) % 360;
  const yogamNum = Math.floor(yogamSum / (360 / 27));
  const isAuspiciousYogam = yogamNum % 3 !== 2;

  return {
    date,
    tamilYear,
    tamilMonth,
    tamilDate,
    weekday,
    gregorianFormatted: date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    moonPhase,
    paksha,
    thithi: {
      entity: thithiEntity,
      index: thithiIndex,
      isPournamiOrAmavasai
    },
    nakshatra: {
      entity: nakshatraEntity,
      index: nakshatraIndex
    },
    yogam: {
      ta: isAuspiciousYogam ? 'சுப யோகம்' : 'மரண யோகம்',
      en: isAuspiciousYogam ? 'Subha Yogam' : 'Marana Yogam'
    },
    karanam: {
      ta: 'பவ / பாலவ',
      en: 'Bava / Balava'
    },
    rahuKalam: {
      start: formatHours(rahuStart),
      end: formatHours(rahuEnd)
    },
    yamagandam: {
      start: formatHours(yamaStart),
      end: formatHours(yamaEnd)
    },
    kuligai: {
      start: formatHours(kuliStart),
      end: formatHours(kuliEnd)
    },
    nallaNeram: nallaNeramRanges,
    virathamTitle
  };
}

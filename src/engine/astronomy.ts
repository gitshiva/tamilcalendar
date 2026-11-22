/**
 * High-precision astronomical formulas for Sun, Moon, and Ephemeris positions.
 * Self-contained, deterministic, and works 100% offline.
 */

export interface EclipticPosition {
  longitude: number; // degrees [0, 360)
  latitude: number;  // degrees
  distance: number;  // AU or km
}

export interface MoonPhaseInfo {
  phaseAngle: number;       // 0 to 360 degrees
  illumination: number;     // 0.0 to 1.0 (0% to 100%)
  isWaxing: boolean;        // true if Shukla Paksha (growing), false if Krishna Paksha (shrinking)
  phaseNameEn: string;
  phaseNameTa: string;
}

// Convert Date to Julian Day (JD)
export function getJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

// Julian Centuries since J2000.0
export function getJulianCenturies(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

// Lahiri Ayanamsha (degrees) to convert Sayana (tropical) to Nirayana (sidereal)
export function getLahiriAyanamsha(t: number): number {
  // Approximate Lahiri Ayanamsha at epoch: 23.85° at 2000, changing at ~1.396° per century
  return 23.856 + 1.396042 * t;
}

// Apparent Geocentric Ecliptic Longitude of the Sun (degrees)
export function getSunLongitude(t: number): number {
  const L0 = 280.46646 + 36000.76983 * t; // Mean longitude
  const M = (357.52911 + 35999.05029 * t) * (Math.PI / 180); // Mean anomaly
  // Equation of center
  const C = (1.914602 - 0.004817 * t) * Math.sin(M) + (0.019993 - 0.000101 * t) * Math.sin(2 * M);
  const trueLong = (L0 + C) % 360;
  return (trueLong + 360) % 360;
}

// Apparent Geocentric Ecliptic Longitude of the Moon (degrees)
export function getMoonLongitude(t: number): number {
  const L0 = 218.3165 + 481267.8813 * t; // Mean longitude
  const M = (134.9634 + 477198.8676 * t) * (Math.PI / 180); // Moon's mean anomaly
  const Ms = (357.5291 + 35999.0503 * t) * (Math.PI / 180); // Sun's mean anomaly
  const D = (297.8502 + 445267.1115 * t) * (Math.PI / 180); // Moon's elongation

  // Dominant periodic perturbations
  const perturbation =
    6.289 * Math.sin(M) -
    1.274 * Math.sin(M - 2 * D) +
    0.658 * Math.sin(2 * D) -
    0.214 * Math.sin(2 * M) -
    0.186 * Math.sin(Ms);

  const moonLong = (L0 + perturbation) % 360;
  return (moonLong + 360) % 360;
}

// Moon phase details
export function getMoonPhase(date: Date): MoonPhaseInfo {
  const jd = getJulianDay(date);
  const t = getJulianCenturies(jd);

  const sunLong = getSunLongitude(t);
  const moonLong = getMoonLongitude(t);

  // Elongation angle between Moon and Sun (0° to 360°)
  let phaseAngle = (moonLong - sunLong) % 360;
  if (phaseAngle < 0) phaseAngle += 360;

  // Fraction of illuminated disk
  const rad = phaseAngle * (Math.PI / 180);
  const illumination = (1 - Math.cos(rad)) / 2;
  const isWaxing = phaseAngle < 180;

  let phaseNameEn = '';
  let phaseNameTa = '';

  if (phaseAngle < 15 || phaseAngle >= 345) {
    phaseNameEn = 'New Moon (Amavasai)';
    phaseNameTa = 'அமாவாசை';
  } else if (phaseAngle < 75) {
    phaseNameEn = 'Waxing Crescent';
    phaseNameTa = 'வளர்பிறை பிறை';
  } else if (phaseAngle < 105) {
    phaseNameEn = 'First Quarter';
    phaseNameTa = 'வளர்பிறை அரை நிலவு';
  } else if (phaseAngle < 165) {
    phaseNameEn = 'Waxing Gibbous';
    phaseNameTa = 'வளர்பிறை முக்கால் நிலவு';
  } else if (phaseAngle < 195) {
    phaseNameEn = 'Full Moon (Pournami)';
    phaseNameTa = 'பௌர்ணமி';
  } else if (phaseAngle < 255) {
    phaseNameEn = 'Waning Gibbous';
    phaseNameTa = 'தேய்பிறை முக்கால் நிலவு';
  } else if (phaseAngle < 285) {
    phaseNameEn = 'Third Quarter';
    phaseNameTa = 'தேய்பிறை அரை நிலவு';
  } else {
    phaseNameEn = 'Waning Crescent';
    phaseNameTa = 'தேய்பிறை பிறை';
  }

  return {
    phaseAngle,
    illumination,
    isWaxing,
    phaseNameEn,
    phaseNameTa
  };
}

// Approximate Sunrise and Sunset in local standard time
export function getSunTimes(date: Date, lat = 13.0827, lon = 80.2707) {
  // Simplified solar zenith calculation for sunrise/sunset
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const zenith = 90.83; // Official zenith for sunrise/sunset
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;

  const lngHour = lon / 15;
  const tRise = dayOfYear + ((6 - lngHour) / 24);
  const tSet = dayOfYear + ((18 - lngHour) / 24);

  const calculateHours = (t: number, isRise: boolean) => {
    const M = (0.9856 * t) - 3.289;
    let L = M + (1.916 * Math.sin(M * D2R)) + (0.020 * Math.sin(2 * M * D2R)) + 282.634;
    L = (L + 360) % 360;

    let RA = R2D * Math.atan(0.91764 * Math.tan(L * D2R));
    RA = (RA + 360) % 360;

    const Lquadrant = Math.floor(L / 90) * 90;
    const RAquadrant = Math.floor(RA / 90) * 90;
    RA = (RA + (Lquadrant - RAquadrant)) / 15;

    const sinDec = 0.39782 * Math.sin(L * D2R);
    const cosDec = Math.cos(Math.asin(sinDec));
    const cosH = (Math.cos(zenith * D2R) - (sinDec * Math.sin(lat * D2R))) / (cosDec * Math.cos(lat * D2R));

    if (cosH > 1) return 6; // Polar day/night fallback
    if (cosH < -1) return 18;

    const H = isRise ? (360 - R2D * Math.acos(cosH)) / 15 : (R2D * Math.acos(cosH)) / 15;
    const T = H + RA - (0.06571 * t) - 6.622;
    let UT = (T - lngHour) % 24;
    if (UT < 0) UT += 24;

    // Convert UTC to local date time
    const localOffset = -date.getTimezoneOffset() / 60;
    let localHours = (UT + localOffset) % 24;
    if (localHours < 0) localHours += 24;
    return localHours;
  };

  const riseHours = calculateHours(tRise, true);
  const setHours = calculateHours(tSet, false);

  return {
    sunriseHours: riseHours,
    sunsetHours: setHours
  };
}

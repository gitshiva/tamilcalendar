# Tamil Calendar & Astronomical Engine Specification

## 1. Core Principles of the Tamil Solar Calendar (சௌர மானம்)

The Tamil calendar is a sidereal solar calendar (*Nirayana Sauramana*):
* **Year Cycle (அறுபது தமிழ் ஆண்டுகள்)**: Follows a 60-year Jovian cycle (from *பிரபவ - Prabhava* to *அட்சய - Kshaya*).
* **Tamil Solar Months (12 மாதங்கள்)**: A month begins when the Sun enters (*Sankranti / Sankramanam*) a specific zodiac constellation (*Rasi*) using the Nirayana (sidereal) system:
  1. **சித்திரை (Chithirai)**: Sun in மேஷம் (Mesha / Aries) — starts around April 14
  2. **வைகாசி (Vaikasi)**: Sun in ரிஷபம் (Vrishabha / Taurus)
  3. **ஆனி (Aani)**: Sun in மிதுனம் (Mithuna / Gemini)
  4. **ஆடி (Aadi)**: Sun in கடகம் (Kataka / Cancer)
  5. **ஆவணி (Aavani)**: Sun in சிம்மம் (Simha / Leo)
  6. **புரட்டாசி (Purattasi)**: Sun in கன்னி (Kanya / Virgo)
  7. **ஐப்பசி (Aippasi)**: Sun in துலாம் (Thula / Libra)
  8. **கார்த்திகை (Karthigai)**: Sun in விருச்சிகம் (Vrischika / Scorpio)
  9. **மார்கழி (Margazhi)**: Sun in தனுசு (Dhanus / Sagittarius)
  10. **தை (Thai)**: Sun in மகரம் (Makara / Capricorn) — Pongal / Uttarayan
  11. **மாசி (Maasi)**: Sun in கும்பம் (Kumbha / Aquarius)
  12. **பங்குனி (Panguni)**: Sun in மீனம் (Meena / Pisces)

---

## 2. Thithi (திதி) & Moon Phases (சந்திர கலை)

### Mathematical Calculation
At any given instant, let:
* $\lambda_{\text{Moon}}$ = Apparent Nirayana Ecliptic Longitude of the Moon
* $\lambda_{\text{Sun}}$ = Apparent Nirayana Ecliptic Longitude of the Sun
* $\Delta\theta = (\lambda_{\text{Moon}} - \lambda_{\text{Sun}}) \pmod{360^\circ}$

$$\text{Thithi Index} = \left\lfloor \frac{\Delta\theta}{12^\circ} \right\rfloor + 1 \quad (1 \dots 30)$$

* **வளர்பிறை (Shukla Paksha / Waxing)**: $\Delta\theta \in [0^\circ, 180^\circ)$ $\rightarrow$ Thithis 1 to 15.
  * Day 15: **பௌர்ணமி (Pournami / Full Moon)** ($\Delta\theta \approx 180^\circ$)
* **தேய்பிறை (Krishna Paksha / Waning)**: $\Delta\theta \in [180^\circ, 360^\circ)$ $\rightarrow$ Thithis 16 to 30.
  * Day 30: **அமாவாசை (Amavasai / New Moon)** ($\Delta\theta \approx 0^\circ$)

### Moon Illumination Fraction
$$\text{Illumination \%} = \frac{1 - \cos(\Delta\theta)}{2} \times 100\%$$

---

## 3. Nakshatram (நட்சத்திரம் - 27 Stars)
Calculated from the Moon's sidereal longitude $\lambda_{\text{Moon}}$:
$$\text{Nakshatra Index} = \left\lfloor \frac{\lambda_{\text{Moon}}}{13^\circ 20'} \right\rfloor + 1 \quad (1 \dots 27)$$

(அஸ்வினி, பரணி, கார்த்திகை, ரோகிணி, மிருகசீரிஷம் ... ரேவதி)

---

## 4. Auspicious & Inauspicious Timings (அஷ்டம பாகம் - Eighths of the Day)

Let the daylight duration be $D = \text{Sunset} - \text{Sunrise}$.
Divide the day into 8 equal segments: $\Delta t = \frac{D}{8}$.

### ராகு காலம் (Rahu Kalam - Daylight Segment)
* **Sunday**: 8th segment ($\approx 4:30\text{ PM} - 6:00\text{ PM}$)
* **Monday**: 2nd segment ($\approx 7:30\text{ AM} - 9:00\text{ AM}$)
* **Tuesday**: 7th segment ($\approx 3:00\text{ PM} - 4:30\text{ PM}$)
* **Wednesday**: 5th segment ($\approx 12:00\text{ PM} - 1:30\text{ PM}$)
* **Thursday**: 6th segment ($\approx 1:30\text{ PM} - 3:00\text{ PM}$)
* **Friday**: 4th segment ($\approx 10:30\text{ AM} - 12:00\text{ PM}$)
* **Saturday**: 3rd segment ($\approx 9:00\text{ AM} - 10:30\text{ AM}$)

### எமகண்டம் (Yamagandam - Daylight Segment)
* **Sunday**: 5th segment
* **Monday**: 4th segment
* **Tuesday**: 3rd segment
* **Wednesday**: 2nd segment
* **Thursday**: 1st segment
* **Friday**: 7th segment
* **Saturday**: 6th segment

### குளிகை காலம் (Kuligai / Gulika Kalam)
* Sunday: 7th, Monday: 6th, Tuesday: 5th, Wednesday: 4th, Thursday: 3rd, Friday: 2nd, Saturday: 1st.

---

## 5. Important Virathams & Sacred Days (முக்கிய விரத நாட்கள்)
Automatically flagged when the day coincides with the respective Thithi or alignment:
* **பிரதோஷம் (Pradosham)**: Trayodashi Thithi (13th) coinciding with twilight (Sandhya Kalam, 4:30 PM – 6:00 PM).
* **சஷ்டி (Sashti)**: 6th Thithi of Shukla/Krishna Paksha (Lord Murugan worship).
* **ஏகாதசி (Ekadashi)**: 11th Thithi of Shukla/Krishna Paksha (Lord Vishnu worship).
* **சங்கடஹர சதுர்த்தி (Sankatahara Chaturthi)**: 4th Thithi of Krishna Paksha (Lord Ganesha worship).
* **அமாவாசை (Amavasai)**: Ancestor remembrance (*Tharpanam*).
* **பௌர்ணமி (Pournami)**: Girivalam, Satyanarayan Puja.

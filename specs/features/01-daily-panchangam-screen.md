# Feature Spec: Daily Panchangam Screen (முதல் திரை)

## 1. Goal & Context
The default and primary screen of the application. When a user opens the app (or installs it as a PWA), it immediately displays today's complete Tamil calendar and astrological state based on their current location and time zone without any login prompts.

---

## 2. Layout Structure

### A. App Bar / Header
* **App Title**: தமிழ் காலண்டர் / Tamil Calendar
* **Location Pill**: Current detected city (e.g., "📍 Chennai" or "📍 Toronto" or "📍 London"). Tap opens a quick search/override modal.
* **Language Switcher**: One-tap toggle button: `[ தமிழ் | EN ]`.
* **Date Navigator**: `< Yesterday | Today | Tomorrow >` with a mini datepicker.

---

### B. Top Half: Celestial & Moon Phase Card (சந்திர நிலை)
* **Moon Phase Illustration / Render**: Dynamic SVG showing realistic waxing/waning crescent, gibbous, full moon, or dark moon.
* **Paksha Badge**: வளர்பிறை (Shukla Paksha) or தேய்பிறை (Krishna Paksha).
* **Illumination Percentage**: e.g., "84% ஒளிரும் (Waxing Gibbous)".
* **Current Thithi Banner**: Highlighted primary Thithi name (e.g., "சுக்கில பட்ச ஏகாதசி" / "Shukla Paksha Ekadashi").

---

### C. Bottom Half: Tamil Date & Panchangam Grid
* **Prominent Tamil Date Header**:
  * Year: e.g., **குரோதி வருடம் (Krodhi Year)**
  * Month & Day: e.g., **கார்த்திகை 7 (Karthigai 7)**
  * Gregorian Date: Sunday, 22 November 2026
  * Tamil Weekday: ஞாயிற்றுக்கிழமை (Bhanuvasaram)
* **Panchangam Attributes (2x2 Grid or Accordion)**:
  * **திதி (Thithi)**: Name + End time (e.g., "ஏகாதசி மாலை 04:15 வரை")
  * **நட்சத்திரம் (Nakshatra)**: Name + End time (e.g., "ரோகிணி இரவு 09:30 வரை")
  * **யோகம் (Yogam)**: Siddha / Amrita / Marana Yogam badge
  * **கரணம் (Karanam)**: e.g., பவ (Bava)
* **Auspicious Timings Section**:
  * **நல்ல நேரம் (Nalla Neram)**: Morning & Evening windows
  * **கௌரி நல்ல நேரம் (Gowri Nalla Neram)**
  * **ராகு காலம் (Rahu Kalam)**: Highlighted with warning accent
  * **எமகண்டம் (Yamagandam)**
  * **குளிகை (Kuligai)**
* **Sacred Day / Viratham Alert Banner**:
  * If today has a Viratham (Pradosham, Sashti, Ekadashi, Amavasai, Pournami), display an elegant badge/banner:
    * 🌟 *"இன்று ஏகாதசி விரதம் (Today is Ekadashi Vratam)"*

---

## 3. UI States

| State | Visual Behavior |
| :--- | :--- |
| **Initial / Loading** | Skeleton shimmer matching the cards; immediate fallback to device local time while geolocation resolves. |
| **Location Permission Denied** | Default to user's device timezone city (or Chennai / Colombo / Global capitals) with a gentle hint: *"Location access enables exact sunrise-based calculations."* |
| **Offline State** | App works 100% offline; small subtle "Offline Mode" icon in footer indicates all calculations are local. |

---

## 4. Acceptance Criteria (Definition of Done)
- [ ] Screen renders immediately on load without any login or onboarding wall.
- [ ] Top card dynamically displays the correct moon phase SVG and illumination percentage.
- [ ] Displays accurate Tamil Year (60-year cycle), Tamil Month, and Tamil Day for the selected date.
- [ ] Shows Rahu Kalam and Yamagandam calculated for the user's local daylight hours.
- [ ] Language toggle instantly re-renders all text in Tamil or English without page reload.
- [ ] User can advance dates using Prev/Next buttons or jump back to "Today".
- [ ] PWA manifest is present and passes Lighthouse PWA criteria (installable to home screen).

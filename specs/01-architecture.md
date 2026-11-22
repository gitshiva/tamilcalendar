# Architecture & Technology Stack

## 1. Architectural Strategy: Client-Side Ephemeris (Zero-Backend MVP)

Traditional calendar apps query an API backend on every date lookup. For the Tamil Calendar:
1. **Panchangam math is deterministic**: Given an observer's latitude, longitude, and UTC timestamp, astronomical positions (Sun, Moon, planets) can be calculated mathematically using standard Ephemeris algorithms.
2. **Offline Resilience**: Eliminating a backend API allows the PWA to work completely offline (e.g., in flights, remote temples, low-connectivity regions).
3. **Zero Maintenance & Infinite Scalability**: The app can be distributed via CDN edge (Vercel, Cloudflare Pages, or GitHub Pages) with $0 server hosting costs.

---

## 2. Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | React 19 + Vite + TypeScript | Blazing fast compilation, strict typing for calendar models, zero overhead. |
| **PWA Engine** | `vite-plugin-pwa` + Workbox | Service Worker caching, offline assets, installable manifest for iOS/Android home screens. |
| **Styling** | Tailwind CSS v4 + Lucide Icons | Responsive, dark/light theme ready, clean mobile-first layout. |
| **Astronomical Math** | `astronomy-engine` | High-precision solar/lunar coordinates, moon phase, equinox/solstice, sunrise/sunset algorithms. |
| **Tamil Localization** | Lightweight type-safe i18n dictionary | Instant switching between Tamil and English without external bundle bloat. |
| **Local Persistence** | `localStorage` | Preserves user's preferred language, custom location override, and theme. |
| **Hosting & CI/CD** | Vercel / Cloudflare Pages | Automated deployment from Git, edge CDN caching. |

---

## 3. Directory Layout (Source Code)

```text
tamil-calendar/
├── specs/                           # Product specifications and domain logic
│   ├── 00-overview.md
│   ├── 01-architecture.md
│   ├── 02-calendar-engine.md
│   └── features/
│       └── 01-daily-panchangam-screen.md
├── src/
│   ├── assets/                      # Icons, logo, sacred glyphs
│   ├── components/                  # UI components
│   │   ├── MoonPhaseCard.tsx        # Top-half moon visualizer
│   │   ├── TamilDateCard.tsx        # Tamil year/month/day/weekday
│   │   ├── AuspiciousTimesCard.tsx  # Nalla Neram, Rahu, Yamagandam
│   │   ├── Header.tsx               # Date navigation, Language toggle, Location picker
│   │   └── PWAInstallPrompt.tsx     # Add-to-home-screen banner
│   ├── engine/                      # Astronomical & Tamil calendar math
│   │   ├── astronomy.ts             # Sunrise, sunset, Sun/Moon longitude
│   │   ├── panchangam.ts            # Thithi, Nakshatra, Yogam, Karanam
│   │   ├── tamilCalendar.ts         # Tamil month, solar ingress, 60-year Jovian cycle
│   │   └── constants.ts             # 60 years, 12 months, 27 nakshatras, 30 thithis
│   ├── i18n/                        # Bilingual dictionaries
│   │   ├── en.ts
│   │   ├── ta.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useLocation.ts           # Geolocation + reverse geocoding fallback
│   │   └── usePanchangam.ts         # Daily computed state
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── manifest.json
│   └── icons/
├── index.html
├── package.json
└── vite.config.ts
```

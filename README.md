# 🕉️ தமிழ் காலண்டர் — Tamil Calendar PWA

> **Live Application**: [panchangam.subbu.us](https://panchangam.subbu.us)

A modern, fast, ad-free, offline-first Progressive Web App (PWA) displaying authentic Tamil daily panchangam and celestial alignments for the global Tamil diaspora.

---

## 🌟 Why this exists

Most online panchangam websites and apps today are either:
1. Cluttered with intrusive full-screen popups and video ads.
2. Built with early-2000s table layouts that break on modern mobile devices.
3. Hardcoded to Indian Standard Time (IST), making calculations inaccurate for Tamilians living across global time zones (US, UK, Canada, Singapore, Malaysia, Australia, etc.).

**தமிழ் காலண்டர்** is built with modern design dignity:
* **100% Ad-Free & Privacy First**: Zero tracking, zero third-party analytics.
* **Location-Aware Precision**: Dynamically recalculates Rahu Kalam, Yamagandam, sunrise/sunset, and Thithi based on local coordinates.
* **Offline-First PWA**: Runs completely offline using deterministic client-side astronomical algorithms (Ephemeris math).
* **Bilingual**: Seamless one-tap toggle between **தமிழ்** and **English**.

---

## 📸 Features

* **Celestial Moon Phase**: Real-time moon phase visualization with illumination percentage and Paksha indicator (வளர்பிறை / தேய்பிறை).
* **Tamil Date & Almanac**: 60-Year Jovian Cycle year name (e.g. பராபவ வருடம்), Tamil Solar Month (சித்திரை..பங்குனி), Day, and Weekday.
* **Four-Pillar Panchangam**:
  * **திதி (Thithi)**: Prathama through Pournami / Amavasai
  * **நட்சத்திரம் (Nakshatra)**: 27 constellations
  * **யோகம் (Yogam)**: Subha / Marana Yogam
  * **கரணம் (Karanam)**: Bava, Balava, etc.
* **Auspicious & Inauspicious Timings**:
  * நல்ல நேரம் (Nalla Neram - Morning & Evening)
  * ராகு காலம் (Rahu Kalam)
  * எமகண்டம் (Yamagandam)
  * குளிகை (Kuligai)
* **Viratham & Festival Alerts**: Automatic recognition for *Pradosham*, *Sashti*, *Ekadashi*, *Sankatahara Chaturthi*, *Pournami*, and *Amavasai*.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + TypeScript + Vite
* **Styling**: Tailwind CSS v4 + Lucide Icons
* **PWA**: `vite-plugin-pwa` + Workbox Service Worker
* **Hosting**: Cloudflare Pages / Workers Edge CDN

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/tamilcalendar.git
cd tamilcalendar

# Install dependencies
npm install

# Start local dev server
npm run dev
```

---

## 📜 Cultural Note

> *"வேயுறு தோளிபங்கன் விடமுண்ட கண்டன் மிகநல்ல வீணை தடவி..."*  
> — **கோளறு பதிகம் (Kolaru Pathigam)**

Scriptures note that cosmic bodies, planetary configurations, and temporal variations continuously interact with earthly life. This project bridges sacred heritage with modern web technology.

---

## 🤝 Contributing & Feedback

Contributions, feature suggestions, and bug reports are warmly welcome! Please open an Issue or submit a Pull Request.

**License**: MIT

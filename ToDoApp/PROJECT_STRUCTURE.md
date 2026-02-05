# 🏗️ PROJECT STRUCTURE - Weather Dashboard

> **Riferimento principale** per lo sviluppo dell'applicazione.  
> Modifica questo file se vuoi cambiare la struttura del progetto.

---

## 🎯 **Obiettivo Progetto**

**Weather Dashboard Completa** con:
- Meteo in tempo reale (OpenWeatherMap API)
- Ricerca città + Geolocalizzazione
- Previsioni 7 giorni
- Grafici e mappe interattive
- Città salvate (localStorage)
- Responsive design (Desktop + Mobile)

---

## 📂 **Struttura Cartelle Definitiva**

```
src/
├── app/
│   ├── core/                          # ⚙️ SINGLETON SERVICES
│   │   ├── constants/
│   │   │   └── api.constants.ts      # API keys, URLs
│   │   ├── guards/
│   │   │   └── auth.guard.ts         # Protezione route (future)
│   │   ├── interceptors/
│   │   │   └── http-error.interceptor.ts  # Gestione errori HTTP
│   │   ├── models/
│   │   │   └── weather.model.ts      # ✅ CREATO - Interfacce dati meteo
│   │   └── services/
│   │       ├── weather.service.ts    # ✅ CREATO - Chiamate API meteo
│   │       ├── storage.service.ts    # localStorage (città salvate)
│   │       └── geolocation.service.ts # GPS utente
│   │
│   ├── shared/                        # 🔄 COMPONENTI RIUTILIZZABILI
│   │   ├── components/
│   │   │   ├── header/               # ✅ CREATO - Header con ricerca
│   │   │   ├── sidebar/              # ⏭️ DA CREARE - Menu navigazione
│   │   │   ├── footer/               # Footer informazioni
│   │   │   ├── loading-spinner/      # Spinner caricamento
│   │   │   ├── alert-banner/         # Banner alert meteo
│   │   │   ├── weather-card/         # ⏭️ DA CREARE - Card meteo principale
│   │   │   ├── forecast-list/        # Lista previsioni 7gg
│   │   │   ├── temperature-display/  # Display temperatura grande
│   │   │   ├── weather-icon/         # Icona meteo animata
│   │   │   └── city-search/          # Input ricerca città
│   │   │
│   │   ├── directives/
│   │   │   └── tooltip.directive.ts  # Tooltip custom
│   │   │
│   │   └── pipes/
│   │       ├── temperature.pipe.ts   # ✅ CREATO - °C ↔ °F
│   │       ├── wind-direction.pipe.ts # ✅ CREATO - Direzione vento
│   │       ├── time-ago.pipe.ts      # ✅ CREATO - "2 ore fa"
│   │       └── weather-description.pipe.ts # ✅ CREATO - Traduzioni
│   │
│   ├── features/                      # 📦 FEATURE MODULES (Lazy Loaded)
│   │   ├── dashboard/
│   │   │   ├── pages/
│   │   │   │   └── home/             # ✅ CREATO - Dashboard principale
│   │   │   ├── components/
│   │   │   │   └── weather-card/     # Card specifica dashboard
│   │   │   └── dashboard.routes.ts   # ✅ CREATO - Route dashboard
│   │   │
│   │   └── auth/                      # (Future) Login/Register
│   │       ├── pages/
│   │       │   ├── login/
│   │       │   └── register/
│   │       └── auth.routes.ts
│   │
│   ├── app.config.ts                  # ✅ CREATO - Providers (HTTP, Router)
│   ├── app.routes.ts                  # ✅ CREATO - Route principali
│   ├── app.ts                         # ✅ CREATO - Root component
│   ├── app.html                       # ✅ CREATO - Template root
│   └── app.css                        # ✅ CREATO - Stili globali
│
├── assets/                            # 📁 FILE STATICI
│   ├── images/
│   │   ├── logos/                    # Logo app (PNG/SVG)
│   │   ├── icons/                    # Icone custom meteo
│   │   └── backgrounds/              # Immagini sfondo
│   ├── fonts/                        # Font personalizzati (optional)
│   ├── data/
│   │   └── cities.json               # Lista città popolari
│   ├── styles/
│   │   ├── variables.css             # Variabili CSS (colori, spacing)
│   │   └── themes.css                # Temi (light/dark mode)
│   └── favicon.ico                   # Icona browser
│
├── index.html                         # Entry point HTML
├── main.ts                            # Bootstrap app
├── styles.css                         # Stili globali
└── material-theme.scss                # Tema Angular Material
```

---

## 🎨 **UI Layout Definito**

### **Desktop (> 768px)**
```
┌─────────────────────────────────────────────┐
│  🌤️ Weather Dashboard | 🔍 Search | 👤      │ ← HEADER
├──────┬──────────────────────────────────────┤
│ 🏠   │  ┌──────────────┐  ┌──────────────┐ │
│ ⭐   │  │ WEATHER CARD │  │ FORECAST 7GG │ │
│ 📍   │  │   Milano     │  │ Lun  Mar Wed │ │
│ 📊   │  │   ☀️ 25°C    │  │ ☀️   ⛅   🌧️ │ │
│ ⚙️   │  └──────────────┘  └──────────────┘ │
│      │  ┌─────────────────────────────────┐ │
│      │  │  TEMPERATURE CHART (7 days)     │ │
│SIDE  │  │  ╱╲╱╲╱╲╱╲╱╲                     │ │
│BAR   │  └─────────────────────────────────┘ │
│      │  ┌────────┐  ┌────────┐  ┌────────┐ │
│      │  │  Wind  │  │Humidity│  │Pressure│ │
│      │  │ 15km/h │  │  60%   │  │1013hPa │ │
│      │  └────────┘  └────────┘  └────────┘ │
└──────┴──────────────────────────────────────┘
```

### **Mobile (< 768px)**
```
┌──────────────────────────┐
│ ☰ Weather 🔍 👤         │ ← HEADER (Compact)
├──────────────────────────┤
│  ┌──────────────────┐    │
│  │   WEATHER CARD   │    │
│  │     Milano       │    │
│  │     ☀️ 25°C      │    │
│  └──────────────────┘    │
│  ┌──────────────────┐    │
│  │  FORECAST 7GG    │    │
│  │  ☀️ ⛅ 🌧️ ⛈️     │    │
│  └──────────────────┘    │
│  ┌──────────────────┐    │
│  │  CHART (scroll)  │    │
│  └──────────────────┘    │
└──────────────────────────┘
```

---

## 🔑 **API Configuration**

### **OpenWeatherMap API**
```typescript
// src/app/core/constants/api.constants.ts
export const API_CONFIG = {
  WEATHER_API_KEY: 'TUA_API_KEY_QUI',  // ⚠️ SOSTITUISCI
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  
  ENDPOINTS: {
    CURRENT: '/weather',
    FORECAST: '/forecast',
    ONE_CALL: '/onecall'
  }
};
```

**Ottieni API Key**: https://openweathermap.org/api (Free tier: 1000 calls/day)

---

## 🎨 **Design System**

### **Colori Principali**
```css
/* src/assets/styles/variables.css */
:root {
  /* Primary */
  --color-primary: #667eea;
  --color-primary-dark: #5568d3;
  --color-primary-light: #7e8ff5;
  
  /* Secondary */
  --color-secondary: #764ba2;
  
  /* Status */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Neutrals */
  --color-background: #f7fafc;
  --color-surface: #ffffff;
  --color-text: #1a202c;
  --color-text-secondary: #718096;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.2);
}
```

### **Typography**
```css
/* Font Family */
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

/* Font Sizes */
--font-xs: 12px;
--font-sm: 14px;
--font-md: 16px;
--font-lg: 20px;
--font-xl: 24px;
--font-2xl: 32px;
--font-3xl: 48px;
```

---

## 📦 **Dipendenze da Installare**

```bash
# Angular Material (UI Components)
ng add @angular/material

# Chart.js (Grafici)
npm install chart.js ng2-charts

# Leaflet (Mappe)
npm install leaflet @types/leaflet

# RxJS (già incluso)
# TypeScript (già incluso)
```

---

## 🔄 **Componenti Prioritari**

### ✅ **Completati**
1. Header Component
2. Weather Service
3. Pipes (temperature, wind-direction, time-ago, weather-description)
4. Home Page
5. Routing base

### ⏭️ **Prossimi (in ordine)**
1. **Sidebar Component** - Menu navigazione
2. **Weather Card Component** - Card meteo principale con dati API
3. **City Search Component** - Input ricerca città
4. **Loading Spinner Component** - Spinner caricamento
5. **Forecast List Component** - Lista previsioni 7 giorni
6. **Temperature Display Component** - Display grande temperatura
7. **Storage Service** - Salvataggio città preferite
8. **Geolocation Service** - Rilevamento posizione utente

---

## 🎯 **Features per Pagina**

### **Dashboard (Home)**
- ✅ Header con ricerca globale
- ⏭️ Card meteo città attuale (grande)
- ⏭️ Previsioni 7 giorni (scroll orizzontale)
- ⏭️ Grafico temperature (Chart.js)
- ⏭️ Cards statistiche (Wind, Humidity, Pressure, UV Index)
- ⏭️ Mappa interattiva (Leaflet)
- ⏭️ Suggerimenti città popolari

### **Città Salvate** (Future)
- Lista città preferite
- Meteo quick view per ogni città
- Rimuovi/Riordina città
- Comparazione temperature

### **Impostazioni** (Future)
- Toggle unità (°C/°F, km/h/mph)
- Lingua (IT/EN)
- Dark mode
- Notifiche alert meteo

---

## 🗂️ **Assets Organization**

### **images/logos/**
- `logo.svg` - Logo principale app
- `logo-white.svg` - Logo versione chiara
- `icon-192.png` - PWA icon (192x192)
- `icon-512.png` - PWA icon (512x512)

### **images/icons/**
- `sun.svg`, `cloud.svg`, `rain.svg`, `snow.svg`, `storm.svg`
- `wind.svg`, `humidity.svg`, `pressure.svg`
- `location.svg`, `star.svg`, `settings.svg`

### **images/backgrounds/**
- `sunny-bg.jpg` - Sfondo giornata soleggiata
- `cloudy-bg.jpg` - Sfondo nuvoloso
- `rainy-bg.jpg` - Sfondo piovoso
- `night-bg.jpg` - Sfondo notturno

### **data/**
- `cities.json` - Lista città italiane popolari
```json
[
  { "name": "Milano", "lat": 45.4642, "lon": 9.1900 },
  { "name": "Roma", "lat": 41.9028, "lon": 12.4964 },
  { "name": "Napoli", "lat": 40.8518, "lon": 14.2681 }
]
```

---

## ⚡ **Script Comandi**

```bash
# Sviluppo
npm start                    # Avvia dev server (http://localhost:4200)
ng serve --open              # Avvia e apri browser

# Build
npm run build                # Build produzione (dist/)
ng build --configuration production

# Test
npm test                     # Unit tests (Karma + Jasmine)
ng test

# Lint & Format
npx tsc --noEmit            # Verifica errori TypeScript
ng lint                      # Lint codice (se configurato)

# Genera Componenti
ng g c shared/components/nome-componente
ng g s core/services/nome-service
ng g p shared/pipes/nome-pipe
```

---

## 📱 **Responsive Breakpoints**

```css
/* Mobile First */
/* Default: 320px - 767px (Mobile) */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 992px) { }

/* Large Desktop */
@media (min-width: 1200px) { }
```

---

## 🔐 **Best Practices**

### **Naming Conventions**
- Components: `PascalCase` (es: `WeatherCard`)
- Services: `PascalCase` + Service suffix (es: `WeatherService`)
- Files: `kebab-case` (es: `weather-card.component.ts`)
- CSS classes: `kebab-case` (es: `.weather-card`)
- Costanti: `UPPER_SNAKE_CASE` (es: `API_BASE_URL`)

### **Folder Rules**
- `core/` = Import solo una volta (in `app.config.ts`)
- `shared/` = Import multipli, nessuna dipendenza da features
- `features/` = Lazy loaded, può importare da core/shared

### **Git Workflow**
```bash
# Feature branch
git checkout -b feature/weather-card

# Commit
git add .
git commit -m "feat: add weather card component"

# Merge
git checkout main
git merge feature/weather-card
```

---

## 🚀 **Quick Start Guide**

```bash
# 1. Clona/Apri progetto
cd C:\Users\FabioGuarachi\Desktop\AngularApp\ToDoApp

# 2. Installa dipendenze
npm install

# 3. Configura API key
# Apri: src/app/core/constants/api.constants.ts
# Inserisci la tua OpenWeatherMap API key

# 4. Avvia app
npm start

# 5. Apri browser
# http://localhost:4200
```

---

## 📌 **Note Importanti**

- ⚠️ **Non committare** `node_modules/` su Git (già in `.gitignore`)
- ⚠️ **Non committare** API keys (usa `environment.ts` in `.gitignore`)
- ✅ Usa **Standalone Components** (Angular 19+)
- ✅ Usa **Signals** per state management (invece di Subject/BehaviorSubject)
- ✅ Lazy loading per ogni feature module
- ✅ Responsive mobile-first

---

## 🎓 **Workflow Sviluppo**

1. ✅ Leggi questo file per capire la struttura
2. ✅ Controlla `ROADMAP.md` per step dettagliati
3. ✅ Crea branch feature
4. ✅ Genera component/service con Angular CLI
5. ✅ Implementa feature
6. ✅ Testa su browser
7. ✅ Verifica errori: `npx tsc --noEmit`
8. ✅ Commit e merge

---

## 📝 **Modificare Questo File**

**Puoi cambiare**:
- ✅ Nomi cartelle (aggiorna anche i path nei file)
- ✅ Colori design system (aggiorna `variables.css`)
- ✅ Breakpoints responsive
- ✅ Layout pagine
- ✅ Lista componenti prioritari
- ✅ Organizzazione assets

**Dopo modifiche**, aggiorna anche:
- `ROADMAP.md` (piano sviluppo)
- `README_NEW.md` (documentazione)

---

**Ultima modifica**: 2026-02-04  
**Versione**: 1.0  
**Autore**: Fabio Guarachi

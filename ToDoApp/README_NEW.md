# 🌤️ Weather Dashboard - Angular Application

Dashboard meteo professionale costruita con Angular 21, featuring real-time weather data, forecasts, e interactive maps.

---

## 📋 Indice

- [Struttura Progetto](#️-struttura-progetto)
- [Significato dei File](#-significato-dei-file)
- [Setup Iniziale](#-setup-iniziale)
- [Sviluppo](#-sviluppo)
- [Build e Deploy](#-build-e-deploy)
- [Tecnologie](#️-tecnologie)

---

## 🗂️ Struttura Progetto

```
ToDoApp/
├── 📁 src/                          # Codice sorgente applicazione
│   ├── 📁 app/                      # Applicazione Angular
│   │   ├── 📁 core/                 # Funzionalità singleton (usate una volta)
│   │   │   ├── constants/          # Costanti globali (API keys, URLs)
│   │   │   ├── guards/             # Route guards (protezione route)
│   │   │   ├── interceptors/       # HTTP interceptors (modifica richieste)
│   │   │   ├── models/             # Interfacce TypeScript globali
│   │   │   └── services/           # Services singleton (API, Storage)
│   │   │
│   │   ├── 📁 shared/               # Componenti riutilizzabili
│   │   │   ├── components/         # Button, Card, Modal, etc.
│   │   │   ├── directives/         # Direttive custom
│   │   │   └── pipes/              # Pipes custom (format data, ecc.)
│   │   │
│   │   ├── 📁 features/             # Feature modules (lazy loaded)
│   │   │   ├── dashboard/          # Dashboard meteo principale
│   │   │   │   ├── pages/          # Pagine del modulo
│   │   │   │   │   └── home/       # Home page
│   │   │   │   └── dashboard.routes.ts
│   │   │   └── auth/               # Autenticazione (future)
│   │   │
│   │   ├── app.config.ts           # Configurazione providers
│   │   ├── app.routes.ts           # Routing principale
│   │   ├── app.ts                  # Root component
│   │   ├── app.html                # Template root
│   │   └── app.css                 # Stili root
│   │
│   ├── 📁 assets/                   # File statici
│   │   ├── images/                 # Immagini (logos, icons)
│   │   ├── fonts/                  # Font personalizzati
│   │   ├── data/                   # JSON statici
│   │   ├── styles/                 # CSS/SCSS condivisi
│   │   └── favicon.ico             # Icona browser
│   │
│   ├── index.html                  # HTML entry point
│   ├── main.ts                     # Bootstrap applicazione
│   ├── main.server.ts              # Entry point SSR
│   ├── server.ts                   # Server Express SSR
│   └── styles.css                  # Stili globali
│
├── 📁 node_modules/                 # Dipendenze npm (non committare)
├── 📁 .angular/                     # Cache Angular (auto-generata)
├── 📁 .vscode/                      # Impostazioni VS Code
│
├── angular.json                    # Configurazione Angular CLI
├── package.json                    # Dipendenze e script npm
├── package-lock.json               # Lock versioni dipendenze
├── tsconfig.json                   # Config TypeScript base
├── tsconfig.app.json               # Config TS per app
├── tsconfig.spec.json              # Config TS per test
├── .gitignore                      # File ignorati da Git
├── .editorconfig                   # Config editor
├── README.md                       # Questo file
├── ROADMAP.md                      # Piano sviluppo dettagliato
└── PROGETTO.md                     # Documentazione progetto
```

---

## 📚 Significato dei File

### 🔧 **File di Configurazione Root**

| File | Scopo | Obbligatorio | Modificabile |
|------|-------|--------------|--------------|
| `package.json` | Lista dipendenze npm, script comandi (`npm start`, `npm build`) | ✅ Sì | ⚠️ Solo per aggiungere dipendenze |
| `package-lock.json` | Lock versioni esatte dipendenze (garantisce build riproducibili) | ✅ Sì | ❌ Auto-generato |
| `angular.json` | Configurazione Angular CLI (build, serve, test, deploy) | ✅ Sì | ⚠️ Raramente |
| `tsconfig.json` | Config TypeScript principale (estesa da altri tsconfig) | ✅ Sì | ⚠️ Raramente |
| `tsconfig.app.json` | Config TypeScript per codice applicazione | ✅ Sì | ⚠️ Raramente |
| `tsconfig.spec.json` | Config TypeScript per test | ⚠️ Solo con test | ❌ No |
| `.gitignore` | File/cartelle ignorate da Git (es. node_modules) | ✅ Consigliato | ✅ Sì |
| `.editorconfig` | Standardizza indentazione/formattazione tra editor | ⚠️ Opzionale | ✅ Sì |

### 📁 **File in src/**

| File | Scopo | Spiegazione |
|------|-------|-------------|
| `index.html` | HTML base, entry point browser | Angular inietta `<app-root>` qui |
| `main.ts` | Bootstrap applicazione Angular | Avvia app chiamando `bootstrapApplication()` |
| `styles.css` | Stili CSS globali (per tutta l'app) | Importato automaticamente |
| `main.server.ts` | Entry point per SSR (server-side rendering) | Solo se usi SSR |
| `server.ts` | Server Express per SSR | Solo se usi SSR |

### 📦 **File in src/app/**

| File | Scopo | Quando Modificare |
|------|-------|-------------------|
| `app.ts` | Root component (componente principale) | Raramente, solo setup iniziale |
| `app.html` | Template del root component | Contiene solo `<router-outlet />` |
| `app.css` | Stili del root component | Stili specifici del layout principale |
| `app.config.ts` | Configurazione providers (HTTP, Router, etc.) | Quando aggiungi nuovi providers globali |
| `app.routes.ts` | Definizione route principali | Quando aggiungi nuove feature modules |
| `app.config.server.ts` | Config per SSR | Solo se usi SSR |
| `app.routes.server.ts` | Route per SSR | Solo se usi SSR |

---

## 🚀 Setup Iniziale

### 1. **Prerequisiti**
```bash
# Verifica versioni installate
node --version    # Richiesto: v18+
npm --version     # Richiesto: v9+
```

### 2. **Installazione Dipendenze**
```bash
cd ToDoApp
npm install
```

### 3. **Configurare API Key**
Apri `src/app/core/constants/api.constants.ts` e inserisci la tua API key:
```typescript
export const API_CONFIG = {
  WEATHER_API_KEY: 'TUA_API_KEY_QUI', // Ottieni da: https://openweathermap.org/api
  // ...
};
```

### 4. **Avviare Development Server**
```bash
npm start
# oppure
ng serve
```
Apri browser su: **http://localhost:4200**

---

## 💻 Sviluppo

### **Comandi Utili**

```bash
# Avvia server di sviluppo
npm start

# Build per produzione
npm run build

# Esegui test
npm test

# Genera nuovo componente
ng generate component features/dashboard/components/weather-card

# Genera nuovo service
ng generate service core/services/geolocation

# Genera nuovo pipe
ng generate pipe shared/pipes/temperature

# Verifica TypeScript
npx tsc --noEmit
```

### **Best Practices**

- ✅ **Components**: Usa standalone components (già configurato)
- ✅ **Services**: Metti `providedIn: 'root'` per singleton
- ✅ **Lazy Loading**: Usa `loadComponent` o `loadChildren` per route
- ✅ **TypeScript**: Abilita strict mode (già fatto)
- ✅ **Styles**: Usa CSS variables per temi
- ✅ **Naming**: `kebab-case` per file, `PascalCase` per classi

---

## 📦 Build e Deploy

### **Build Produzione**
```bash
npm run build
```
Output: `dist/ToDoApp/browser/`

### **Deploy su Hosting**
- **Firebase**: `firebase deploy`
- **Netlify**: Drag & drop cartella `dist/`
- **Vercel**: `vercel --prod`

---

## 🛠️ Tecnologie

### **Core**
- **Angular 21** - Framework
- **TypeScript 5** - Linguaggio
- **RxJS** - Reactive programming

### **Future (da installare)**
- **Angular Material** - UI Components
- **Bootstrap 5** - CSS Framework
- **Chart.js** - Grafici
- **Leaflet** - Mappe interattive

### **API Esterne**
- **OpenWeatherMap** - Dati meteo
- **AirVisual** (opzionale) - Qualità aria

---

## 📖 Documentazione

- [Roadmap Sviluppo](ROADMAP.md) - Piano dettagliato step-by-step
- [Angular Docs](https://angular.dev) - Documentazione ufficiale
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guida TypeScript

---

## 👤 Autore

**Fabio Guarachi**
- Progetto: Weather Dashboard
- Anno: 2026

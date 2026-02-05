# 🗺️ ROADMAP - Weather Dashboard Development

Piano di sviluppo completo step-by-step per creare un'applicazione Angular professionale, utilizzando il massimo delle funzionalità disponibili.

---

## 📊 Overview Progetto

**Obiettivo**: Costruire una Weather Dashboard completa che integri:
- ✅ Tutte le funzionalità Angular (Components, Services, Guards, Interceptors, Pipes, Directives)
- ✅ Angular Material + Bootstrap (UI components)
- ✅ RxJS avanzato (Observables, Subjects, Operators)
- ✅ API Integration (OpenWeatherMap, geolocation)
- ✅ State Management (Signals)
- ✅ Routing avanzato (Lazy loading, Guards)
- ✅ Forms (Reactive + Template-driven)
- ✅ Charts & Maps (Chart.js, Leaflet)
- ✅ Animations
- ✅ PWA (Progressive Web App)
- ✅ i18n (Internazionalizzazione)
- ✅ Testing (Unit + E2E)

---

## 🎯 FASE 1: Setup e Fondamenta (COMPLETATA ✅)

### ✅ 1.1 Struttura Base
- [x] Pulizia progetto demo
- [x] Creazione struttura cartelle (core, shared, features)
- [x] Configurazione app.config.ts (HTTP, Router)
- [x] Setup routing con lazy loading
- [x] Stili globali e variabili CSS

### ✅ 1.2 Core Services
- [x] WeatherService (API calls)
- [x] StorageService (localStorage)
- [x] Models & Interfaces (weather.model.ts)
- [x] API Constants (api.constants.ts)

### ✅ 1.3 Home Page Base
- [x] HomeComponent con routing
- [x] Template e stili base

---

## 🚀 FASE 2: Installazione Librerie UI (PROSSIMO STEP)

### 📦 2.1 Angular Material
```bash
ng add @angular/material
```
**Scegli**:
- Theme: Custom o Indigo/Pink
- Typography: Yes
- Animations: Yes

**Moduli da usare**:
- MatCard, MatButton, MatIcon
- MatToolbar, MatSidenav
- MatDialog, MatSnackBar
- MatTable, MatPaginator
- MatFormField, MatInput
- MatSelect, MatAutocomplete
- MatDatepicker
- MatProgressSpinner

### 🎨 2.2 Bootstrap
```bash
npm install bootstrap @popperjs/core
```

Aggiungi in `angular.json`:
```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

**Elementi da usare**:
- Grid system (container, row, col)
- Utilities (spacing, colors, flexbox)
- Cards, Badges, Alerts
- Navbar (responsive)
- Forms (input groups, validation)

### 📊 2.3 Chart.js
```bash
npm install chart.js ng2-charts
```

**Charts da implementare**:
- Line chart: Temperature trend 7 giorni
- Bar chart: Precipitazioni
- Doughnut: Humidity/Pressure
- Radar: Wind direction

### 🗺️ 2.4 Leaflet Maps
```bash
npm install leaflet @types/leaflet
```

**Features**:
- Mappa interattiva con marker città
- Overlay meteo (clouds, precipitation)
- Click su mappa → fetch weather

---

## 🏗️ FASE 3: UI Components Shared

### 3.1 Layout Components
```bash
ng g c shared/components/header
ng g c shared/components/sidebar
ng g c shared/components/footer
ng g c shared/components/loading-spinner
```

**Features**:
- Header: Logo, search bar, user menu
- Sidebar: Navigation, favorites list
- Footer: Links, info
- LoadingSpinner: Skeleton screens

### 3.2 UI Components
```bash
ng g c shared/components/weather-card
ng g c shared/components/city-search
ng g c shared/components/temperature-display
ng g c shared/components/weather-icon
ng g c shared/components/forecast-list
ng g c shared/components/alert-banner
```

**Ogni componente deve**:
- Usare `@Input()` e `@Output()`
- Avere stili isolati
- Essere riutilizzabile

### 3.3 Pipes Custom
```bash
ng g pipe shared/pipes/temperature
ng g pipe shared/pipes/wind-direction
ng g pipe shared/pipes/time-ago
ng g pipe shared/pipes/weather-description
```

**Esempio Temperature Pipe**:
```typescript
transform(value: number, unit: 'C' | 'F' = 'C'): string {
  if (unit === 'F') {
    return `${(value * 9/5 + 32).toFixed(1)}°F`;
  }
  return `${value.toFixed(1)}°C`;
}
```

### 3.4 Directives Custom
```bash
ng g directive shared/directives/highlight-temp
ng g directive shared/directives/tooltip
ng g directive shared/directives/lazy-load-image
```

**Esempio HighlightTemp**:
```typescript
// Cambia colore background basato su temperatura
@HostBinding('style.backgroundColor')
get bgColor() {
  if (this.temp > 30) return '#ff4444';
  if (this.temp < 0) return '#4444ff';
  return '#44ff44';
}
```

---

## 📱 FASE 4: Feature - Dashboard Principale

### 4.1 Dashboard Layout
```bash
ng g c features/dashboard/pages/main-dashboard
ng g c features/dashboard/components/current-weather
ng g c features/dashboard/components/hourly-forecast
ng g c features/dashboard/components/daily-forecast
ng g c features/dashboard/components/weather-details
ng g c features/dashboard/components/air-quality
```

**Layout Dashboard**:
```
+------------------------------------------+
| Header (search, logo, menu)              |
+----------+-------------------------------+
| Sidebar  | Current Weather Card          |
| - Home   | (temp, icon, description)     |
| - Cities +-------------------------------+
| - Map    | Hourly Forecast (charts)      |
| - Settings+-------------------------------+
|          | 7-Day Forecast (cards)         |
|          +-------------------------------+
|          | Details (humidity, wind, etc) |
+----------+-------------------------------+
```

### 4.2 Dashboard Services
```bash
ng g s features/dashboard/services/dashboard-state
ng g s core/services/geolocation
```

**DashboardStateService** (con Signals):
```typescript
export class DashboardStateService {
  private currentCity = signal<string>('Rome');
  private weatherData = signal<WeatherData | null>(null);
  private loading = signal<boolean>(false);
  
  readonly currentCity$ = computed(() => this.currentCity());
  readonly weatherData$ = computed(() => this.weatherData());
  readonly loading$ = computed(() => this.loading());
}
```

### 4.3 Reactive Forms - City Search
```typescript
searchForm = new FormGroup({
  city: new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]),
  country: new FormControl('')
});

// Autocomplete con debounce
this.searchForm.get('city')?.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => this.weatherService.searchCities(query))
).subscribe(results => this.suggestions = results);
```

---

## 🔐 FASE 5: Authentication & Guards

### 5.1 Auth Service
```bash
ng g s core/services/auth
```

**Features**:
- Login/Register
- JWT token management
- User profile
- Password reset

### 5.2 Guards
```bash
ng g guard core/guards/auth
ng g guard core/guards/unsaved-changes
```

**AuthGuard**:
```typescript
canActivate(): boolean {
  if (this.authService.isAuthenticated()) {
    return true;
  }
  this.router.navigate(['/login']);
  return false;
}
```

### 5.3 Auth UI
```bash
ng g c features/auth/pages/login
ng g c features/auth/pages/register
ng g c features/auth/pages/forgot-password
```

---

## 🔌 FASE 6: HTTP Interceptors

### 6.1 API Interceptor
```bash
ng g interceptor core/interceptors/api
```

**Features**:
- Aggiunge API key automaticamente
- Headers comuni
- Error handling globale
- Retry logic

```typescript
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const modifiedReq = req.clone({
    setParams: { appid: API_CONFIG.WEATHER_API_KEY }
  });
  
  return next.handle(modifiedReq).pipe(
    retry(2),
    catchError(this.handleError)
  );
}
```

### 6.2 Loading Interceptor
```bash
ng g interceptor core/interceptors/loading
```

**Mostra spinner** durante chiamate HTTP:
```typescript
intercept(req: HttpRequest<any>, next: HttpHandler) {
  this.loadingService.show();
  return next.handle(req).pipe(
    finalize(() => this.loadingService.hide())
  );
}
```

---

## 📊 FASE 7: Charts & Visualizations

### 7.1 Temperature Chart Component
```bash
ng g c features/dashboard/components/temperature-chart
```

**Line Chart** (7 giorni):
```typescript
chartData = {
  labels: ['Mon', 'Tue', 'Wed', ...],
  datasets: [{
    label: 'Temperature (°C)',
    data: [22, 24, 23, 25, 26, 24, 23],
    borderColor: '#3b82f6',
    tension: 0.4
  }]
};
```

### 7.2 Precipitation Chart
```bash
ng g c features/dashboard/components/precipitation-chart
```

**Bar Chart** (probabilità pioggia):
```typescript
chartData = {
  labels: ['12:00', '15:00', '18:00', '21:00'],
  datasets: [{
    label: 'Precipitation %',
    data: [10, 30, 60, 20],
    backgroundColor: '#60a5fa'
  }]
};
```

---

## 🗺️ FASE 8: Interactive Map

### 8.1 Map Component
```bash
ng g c features/dashboard/components/weather-map
```

**Leaflet Setup**:
```typescript
ngAfterViewInit() {
  this.map = L.map('map').setView([41.9, 12.5], 6);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  
  // Weather overlay
  L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`)
    .addTo(this.map);
}
```

### 8.2 Map Features
- Click → fetch weather per quella posizione
- Markers città salvate
- Overlay layers (temperature, clouds, precipitation)
- Geolocation button

---

## ⚙️ FASE 9: Settings & Preferences

### 9.1 Settings Page
```bash
ng g c features/dashboard/pages/settings
```

**Preferenze**:
- Unità temperatura (C/F)
- Language (IT/EN)
- Theme (Light/Dark)
- Notifiche
- Auto-refresh interval

### 9.2 Theme Service
```bash
ng g s core/services/theme
```

**Dark Mode Toggle**:
```typescript
toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  this.storage.savePreferences({ theme: body.classList.contains('dark-theme') ? 'dark' : 'light' });
}
```

**CSS Variables**:
```css
:root {
  --bg-color: #ffffff;
  --text-color: #111827;
}

.dark-theme {
  --bg-color: #1f2937;
  --text-color: #f3f4f6;
}
```

---

## 🌍 FASE 10: Internationalization (i18n)

### 10.1 Setup i18n
```bash
ng add @angular/localize
```

**Crea file traduzioni**:
- `src/locale/messages.it.xlf`
- `src/locale/messages.en.xlf`

### 10.2 Uso in Template
```html
<h1 i18n="@@homeTitle">Weather Dashboard</h1>
<p i18n="@@homeDescription">Real-time weather data</p>
```

### 10.3 Build Multi-Language
```bash
ng build --localize
```

---

## 🎬 FASE 11: Animations

### 11.1 Route Animations
```typescript
// app.routes.ts
data: { animation: 'DashboardPage' }

// animations.ts
export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))])
    ])
  ])
]);
```

### 11.2 Component Animations
```typescript
@Component({
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
```

---

## 📱 FASE 12: Progressive Web App (PWA)

### 12.1 Add PWA
```bash
ng add @angular/pwa
```

**Genera**:
- `manifest.webmanifest` (icone, colori, nome app)
- `ngsw-config.json` (service worker config)
- Icons in `src/assets/icons/`

### 12.2 Offline Support
```json
// ngsw-config.json
{
  "dataGroups": [{
    "name": "weather-api",
    "urls": ["https://api.openweathermap.org/**"],
    "cacheConfig": {
      "maxSize": 100,
      "maxAge": "1h",
      "strategy": "freshness"
    }
  }]
}
```

### 12.3 Install Prompt
```typescript
@HostListener('window:beforeinstallprompt', ['$event'])
onBeforeInstallPrompt(e: Event) {
  e.preventDefault();
  this.deferredPrompt = e;
  this.showInstallButton = true;
}

installApp() {
  this.deferredPrompt.prompt();
  this.deferredPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') {
      console.log('PWA installed');
    }
  });
}
```

---

## 🧪 FASE 13: Testing

### 13.1 Unit Tests (Karma/Jasmine)
```bash
# Test componente
ng test

# Test service
ng g s core/services/weather --skip-tests=false
```

**Esempio Test**:
```typescript
describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should fetch weather data', () => {
    service.getCurrentWeather('Rome').subscribe(data => {
      expect(data.name).toBe('Rome');
    });
    
    const req = httpMock.expectOne(req => req.url.includes('weather'));
    req.flush({ name: 'Rome', temp: 22 });
  });
});
```

### 13.2 E2E Tests (Cypress)
```bash
npm install cypress --save-dev
npx cypress open
```

---

## 🚀 FASE 14: Performance Optimization

### 14.1 Lazy Loading Routes
```typescript
{
  path: 'dashboard',
  loadComponent: () => import('./features/dashboard/...').then(m => m.DashboardComponent)
}
```

### 14.2 Change Detection Strategy
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 14.3 TrackBy in ngFor
```html
<div *ngFor="let city of cities; trackBy: trackByCity">
```

### 14.4 Image Optimization
```html
<img ngSrc="weather-icon.png" width="100" height="100" priority>
```

---

## 📈 FASE 15: Advanced Features

### 15.1 Notifiche Push
- Service Worker Notifications
- Permission handling
- Alert per maltempo

### 15.2 Voice Search
- Web Speech API
- "Alexa, che tempo fa a Roma?"

### 15.3 Comparison Mode
- Confronta meteo tra 2+ città
- Chart comparativi

### 15.4 Historical Data
- Meteo passato (ultimi 30 giorni)
- Chart storici

### 15.5 Weather Alerts
- Sistema notifiche per allerte meteo
- Email/SMS integration

---

## 📊 Checklist Completa Elementi Angular

### ✅ Core Concepts
- [x] Components (standalone)
- [x] Services (providedIn: 'root')
- [x] Dependency Injection
- [ ] Modules (se necessari)

### ✅ Templates
- [ ] Data Binding (@Input, @Output)
- [ ] Event Binding
- [ ] Two-way Binding [(ngModel)]
- [ ] Template Variables #ref
- [ ] @if, @for, @switch

### ✅ Forms
- [ ] Reactive Forms
- [ ] Template-driven Forms
- [ ] Custom Validators
- [ ] Async Validators
- [ ] Form Arrays/Groups

### ✅ Routing
- [x] Basic Routing
- [x] Lazy Loading
- [ ] Route Guards
- [ ] Route Resolvers
- [ ] Route Params & Query Params
- [ ] Child Routes
- [ ] Route Animations

### ✅ RxJS
- [x] Observables
- [x] Subjects
- [ ] BehaviorSubject
- [ ] Operators (map, filter, switchMap, etc.)
- [ ] combineLatest, forkJoin
- [ ] Error Handling

### ✅ HTTP
- [x] HttpClient
- [ ] Interceptors
- [ ] Error Handling
- [ ] Retry Logic
- [ ] Caching

### ✅ State Management
- [ ] Signals (Angular 16+)
- [ ] BehaviorSubject pattern
- [ ] NgRx (opzionale)

### ✅ Advanced
- [ ] Custom Pipes
- [ ] Custom Directives
- [ ] HostListener/HostBinding
- [ ] ViewChild/ContentChild
- [ ] Dynamic Components
- [ ] Animations

### ✅ Performance
- [ ] OnPush Change Detection
- [ ] TrackBy
- [ ] Lazy Loading
- [ ] Virtual Scrolling
- [ ] Image Optimization

### ✅ Testing
- [ ] Unit Tests (Karma)
- [ ] E2E Tests (Cypress)
- [ ] Component Tests
- [ ] Service Tests

### ✅ PWA
- [ ] Service Workers
- [ ] Offline Support
- [ ] Install Prompt
- [ ] Push Notifications

---

## 🎓 Risorse di Apprendimento

### Documentazione
- [Angular Docs](https://angular.dev)
- [RxJS Docs](https://rxjs.dev)
- [Material Design](https://material.angular.io)

### Tutorial
- Angular University
- Fireship.io
- Academind

### Tools
- Angular DevTools (Chrome Extension)
- Augury (debugging)
- StackBlitz (online editor)

---

## 🏁 Timeline Stimata

| Fase | Durata | Complessità |
|------|--------|-------------|
| FASE 1-2 | 2-3 giorni | ⭐⭐ |
| FASE 3-4 | 5-7 giorni | ⭐⭐⭐ |
| FASE 5-6 | 3-4 giorni | ⭐⭐⭐ |
| FASE 7-8 | 4-5 giorni | ⭐⭐⭐⭐ |
| FASE 9-10 | 3-4 giorni | ⭐⭐ |
| FASE 11-12 | 4-5 giorni | ⭐⭐⭐⭐ |
| FASE 13-14 | 5-7 giorni | ⭐⭐⭐⭐⭐ |
| FASE 15 | Opzionale | ⭐⭐⭐⭐⭐ |

**Totale**: ~30-40 giorni di sviluppo attivo

---

**Buon coding! 🚀**

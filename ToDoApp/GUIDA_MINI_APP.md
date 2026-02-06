# 🌤️ Mini Weather App - Demo Angular

Una mini applicazione meteo per dimostrare le funzionalità principali di Angular.

## ✨ Cosa Include

### Funzionalità Implementate:
- **🌍 Chiamate API HTTP** - Integrazione con OpenWeatherMap API
- **🔄 Routing** - Navigazione tra pagine (Home, About) con lazy loading
- **📦 Componenti Standalone** - Architettura moderna senza NgModules
- **⚡ Signals** - Gestione reattiva dello stato (Angular 17+)
- **🎨 UI Responsive** - Design pulito e mobile-friendly
- **📝 Forms** - Two-way binding con ngModel
- **🔍 Conditional Rendering** - Nuova sintassi @if/@for

## 🚀 Come Avviare

### 1. Installa le dipendenze
```bash
cd ToDoApp
npm install
```

### 2. Avvia il server di sviluppo
```bash
npm start
# oppure
ng serve
```

### 3. Apri il browser
Vai su: `http://localhost:4200`

## 📁 Struttura File Importanti

```
src/app/
├── app.ts                    # Componente principale
├── app.routes.ts             # Configurazione routing
├── core/
│   ├── services/
│   │   └── weather.ts        # Servizio API meteo
│   └── models/
│       └── weather.model.ts  # Interface TypeScript
├── features/
│   └── dashboard/
│       └── pages/
│           ├── home/         # Pagina ricerca meteo
│           └── about/        # Pagina info
└── shared/
    └── components/
        └── header/           # Header con navigazione
```

## 🎯 Cosa Dimostra

### 1. **Chiamate HTTP (weather.ts)**
```typescript
getWeatherByCity(cityName: string): Observable<WeatherData> {
  const url = `${this.apiUrl}?q=${cityName}&appid=${this.apiKey}...`;
  return this.http.get<any>(url).pipe(
    map(data => this.transformToWeatherData(data))
  );
}
```

### 2. **Signals per lo Stato (home.ts)**
```typescript
cityName = signal('');
weatherData = signal<WeatherData | null>(null);
loading = signal(false);
```

### 3. **Routing Lazy (dashboard.routes.ts)**
```typescript
{
  path: '',
  loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
}
```

### 4. **Nuova Sintassi Template (home.html)**
```html
@if (weatherData() && !loading()) {
  <div class="weather-card">...</div>
}

@for (detail of details; track detail.id) {
  <div>{{ detail }}</div>
}
```

## 🔑 API Key

L'app usa una API key demo pubblica di OpenWeatherMap. Per uso personale:

1. Registrati su [OpenWeatherMap](https://openweathermap.org/api)
2. Ottieni la tua API key gratuita
3. Sostituisci in `src/app/core/services/weather.ts`:
```typescript
private apiKey = 'TUA_API_KEY_QUI';
```

## 📚 Risorse Utili

- [Documentazione Angular](https://angular.io/docs)
- [Angular Signals](https://angular.io/guide/signals)
- [OpenWeatherMap API](https://openweathermap.org/api)

## 💡 Note

Questo è un progetto **minimale** creato per scopi didattici. Include solo le funzionalità essenziali per comprendere:
- Come funziona il routing in Angular
- Come chiamare API esterne
- Come gestire lo stato con Signals
- Come strutturare componenti standalone
- Come usare la nuova sintassi template (@if, @for)

---

**Creato come demo Angular minimalista** 🚀

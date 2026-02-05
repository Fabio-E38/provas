// Costanti API per il progetto Weather Dashboard

export const API_CONFIG = {
  // OpenWeatherMap API
  WEATHER_API_KEY: '2a671af677224b3e838100329260202', // Ottieni da: https://openweathermap.org/api
  WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  WEATHER_ICON_URL: 'https://openweathermap.org/img/wn',
  
  // Timeout per le chiamate API (ms)
  DEFAULT_TIMEOUT: 10000,
  
  // Unità di misura
  UNITS: {
    METRIC: 'metric',    // Celsius, km/h
    IMPERIAL: 'imperial', // Fahrenheit, mph
    STANDARD: 'standard'  // Kelvin, m/s
  }
} as const;

export const APP_CONFIG = {
  DEFAULT_CITY: 'Rome',
  DEFAULT_COUNTRY: 'IT',
  REFRESH_INTERVAL: 300000, // 5 minuti
  MAX_SAVED_CITIES: 10
} as const;

// Weather Data Models

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast?: ForecastDay[];
}

export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  visibility: number;
  windSpeed: number;
  windDeg: number;
  clouds: number;
  dt: number;
  sunrise: number;
  sunset: number;
  weather: WeatherCondition;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ForecastDay {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feelsLike: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: WeatherCondition;
  speed: number;
  deg: number;
  clouds: number;
  pop: number; // Probability of precipitation
  rain?: number;
  snow?: number;
}

export interface SavedCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  addedAt: Date;
}

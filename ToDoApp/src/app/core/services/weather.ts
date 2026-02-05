import { Injectable } from '@angular/core';

//importi da fare 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//adesso tocca all'interfaccia 

export interface WeatherData {
  name: string; // Nome città
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  dt: number; // timestamp
}


@Injectable({
  providedIn: 'root',
})
export class Weather {
  
// PROVA
// ⚠️ SOSTITUISCI CON LA TUA API KEY!
  private apiKey = '2a671af677224b3e838100329260202';
  private apiUrl = 'https://www.weatherapi.com/my/';

  constructor(private http: HttpClient) {}

  // Ottieni meteo per nome città
  getWeatherByCity(cityName: string): Observable<WeatherData> {
    const url = `${this.apiUrl}?q=${cityName}&appid=${this.apiKey}&units=metric&lang=it`;
    return this.http.get<WeatherData>(url);
  }

  // Ottieni meteo per coordinate GPS
  getWeatherByCoords(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=it`;
    return this.http.get<WeatherData>(url);
  }

  // Ottieni URL icona meteo
  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}

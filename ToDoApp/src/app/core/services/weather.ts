import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  // API gratuita OpenWeatherMap (limite: 60 chiamate/min)
  private apiKey = '895284fb2d2c50a520ea537456963d9c'; // API key demo pubblica
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  // Ottieni meteo per nome città
  getWeatherByCity(cityName: string): Observable<WeatherData> {
    const url = `${this.apiUrl}?q=${cityName}&appid=${this.apiKey}&units=metric&lang=it`;
    
    return this.http.get<any>(url).pipe(
      map(data => this.transformToWeatherData(data))
    );
  }

  // Trasforma risposta API nel nostro modello
  private transformToWeatherData(data: any): WeatherData {
    return {
      location: {
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
        timezone: ''
      },
      current: {
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        tempMin: Math.round(data.main.temp_min),
        tempMax: Math.round(data.main.temp_max),
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        visibility: data.visibility,
        windSpeed: Math.round(data.wind.speed * 3.6), // m/s -> km/h
        windDeg: data.wind.deg,
        clouds: data.clouds.all,
        dt: data.dt,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        weather: {
          id: data.weather[0].id,
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon
        }
      }
    };
  }
  getWeatherByCoords(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=it`;
    return this.http.get<WeatherData>(url);
  }

  // Ottieni URL icona meteo
  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}

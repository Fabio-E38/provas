import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Weather } from '../../../../core/services/weather';
import { WeatherData } from '../../../../core/models/weather.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  cityName = signal('');
  weatherData = signal<WeatherData | null>(null);
  loading = signal(false);
  error = signal('');

  constructor(private weatherService: Weather) {}

  // Cerca meteo per città
  searchWeather() {
    const city = this.cityName();
    if (!city.trim()) return;

    this.loading.set(true);
    this.error.set('');

    this.weatherService.getWeatherByCity(city).subscribe({
      next: (data) => {
        this.weatherData.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Città non trovata! Riprova.');
        this.loading.set(false);
        this.weatherData.set(null);
      }
    });
  }
}

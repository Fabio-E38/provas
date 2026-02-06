import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  features = [
    {
      icon: '🌍',
      title: 'API Reale',
      description: 'Usa OpenWeatherMap per dati meteo in tempo reale'
    },
    {
      icon: '🔄',
      title: 'Signals',
      description: 'Gestione dello stato con Angular Signals (nuovo!)'
    },
    {
      icon: '🎨',
      title: 'Standalone Components',
      description: 'Architettura moderna senza moduli NgModule'
    },
    {
      icon: '🚀',
      title: 'Lazy Loading',
      description: 'Routing ottimizzato con caricamento lazy'
    }
  ];

  technologies = [
    'Angular 19',
    'TypeScript',
    'RxJS',
    'HttpClient',
    'Router',
    'Signals'
  ];
}

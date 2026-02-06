import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, DatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnDestroy {
  appTitle = 'Mini Weather App';
  currentTime = signal(new Date());
  private intervalId?: ReturnType<typeof setInterval>;
  
  constructor() {
    // Aggiorna ora ogni minuto solo in ambiente browser
    if (typeof window !== 'undefined') {
      this.intervalId = setInterval(() => {
        this.currentTime.set(new Date());
      }, 60000);
    }
  }
  
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
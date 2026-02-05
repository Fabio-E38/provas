// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   imports: [],
//   templateUrl: './header.html',
//   styleUrl: './header.css',
// })
// export class Header {

// }


import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  
  // Proprietà
  searchQuery: string = '';
  hasNotifications: boolean = true;

  // Eventi verso componenti padre
  @Output() searchCity = new EventEmitter<string>();
  @Output() toggleSidebar = new EventEmitter<void>();

  // Metodo per ricerca
  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('🔍 Ricerca città:', this.searchQuery);
      this.searchCity.emit(this.searchQuery);
    }
  }

  // Metodo per pulire ricerca
  clearSearch(): void {
    this.searchQuery = '';
  }

  // Toggle menu mobile
  toggleMobileMenu(): void {
    console.log('📱 Toggle mobile menu');
    this.toggleSidebar.emit();
  }

}
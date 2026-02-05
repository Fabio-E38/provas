// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrls: ['./app.css']
// })
// export class App {
//   title = 'Weather Dashboard';
// }


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'ToDoApp';

  // Gestisce ricerca città
  onSearchCity(cityName: string): void {
    console.log('🔍 Città cercata:', cityName);
  }

  // Gestisce toggle sidebar
  onToggleSidebar(): void {
    console.log('📱 Toggle sidebar');
  }
}
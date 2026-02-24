import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OverlayContainerComponent } from './shared/components/overlay-container/overlay-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OverlayContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Ticketing';
}
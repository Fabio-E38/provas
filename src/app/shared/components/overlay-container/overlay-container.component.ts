import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayService } from '../../../services/overlay.service';
import { ChatOverlayComponent } from '../../../pages/chat/chat-overlay.component';

@Component({
  selector: 'app-overlay-container',
  standalone: true,
  imports: [CommonModule, ChatOverlayComponent],
  templateUrl: './overlay-container.component.html',
  styleUrl: './overlay-container.component.css',
})
export class OverlayContainerComponent {
  constructor(public overlayService: OverlayService) {}
}

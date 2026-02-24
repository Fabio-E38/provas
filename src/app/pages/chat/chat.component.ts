import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  draft = '';
  showResolutionActions = false;

  sendHandler?: (message: string) => void;
  resolvedHandler?: () => void;
  unresolvedHandler?: () => void;

  send(): void {
    const message = this.draft.trim();
    if (!message) return;

    this.sendHandler?.(message);
    this.draft = '';
  }

  markResolved(): void {
    this.resolvedHandler?.();
  }

  markUnresolved(): void {
    this.unresolvedHandler?.();
  }
}

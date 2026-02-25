import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() messages: ChatMessage[] = [];
  @Input() showResolutionActions = false;
  @Output() messageSent = new EventEmitter<string>();
  @Output() resolved = new EventEmitter<void>();
  @Output() unresolved = new EventEmitter<void>();

  draft = '';

  send(): void {
    const message = this.draft.trim();
    if (!message) return;

    this.messageSent.emit(message);
    this.draft = '';
  }

  markResolved(): void {
    this.resolved.emit();
  }

  markUnresolved(): void {
    this.unresolved.emit();
  }
}

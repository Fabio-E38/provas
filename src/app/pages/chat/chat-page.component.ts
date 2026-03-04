import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatComponent } from './chat.component';
import { KbPanelComponent } from './kb-panel.component';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';
import { ChatService } from '../../services/chat.service';
import { KbService } from '../../services/kb.service';
import { ChatMessage } from '../../models/chat-message.model';
import { KbDocument } from '../../models/kb-document.model';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, ChatComponent, KbPanelComponent, AppShellComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {
  private chatService = inject(ChatService);
  private kbService = inject(KbService);
  private router = inject(Router);

  messages: ChatMessage[] = [];
  kbDocuments: KbDocument[] = [];
  showResolutionActions = false;

  onMessageSent(text: string): void {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text,
      createdAt: new Date(),
    };
    this.messages = [...this.messages, userMsg];

    this.chatService.sendMessage(text).subscribe(response => {
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: response.reply,
        createdAt: new Date(),
      };
      this.messages = [...this.messages, botMsg];
      this.showResolutionActions = response.resolved;
    });

    this.kbService.suggestDocuments(text).subscribe(docs => {
      this.kbDocuments = docs;
    });
  }

  onResolved(): void {
    this.router.navigate(['/cases']);
  }

  onUnresolved(): void {
    this.router.navigate(['/ticket/new']);
  }
}

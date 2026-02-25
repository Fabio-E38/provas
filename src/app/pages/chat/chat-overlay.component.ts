import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatComponent } from './chat.component';
import { KbPanelComponent } from './kb-panel.component';
import { ChatService } from '../../services/chat.service';
import { KbService } from '../../services/kb.service';
import { OverlayService } from '../../services/overlay.service';
import { ChatMessage } from '../../models/chat-message.model';
import { KbDocument } from '../../models/kb-document.model';

@Component({
  selector: 'app-chat-overlay',
  standalone: true,
  imports: [CommonModule, ChatComponent, KbPanelComponent],
  templateUrl: './chat-overlay.component.html',
  styleUrl: './chat-overlay.component.css',
})
export class ChatOverlayComponent implements OnInit {
  messages: ChatMessage[] = [];
  kbDocuments: KbDocument[] = [];
  showResolutionActions = false;

  constructor(
    private chatService: ChatService,
    private kbService: KbService,
    private overlayService: OverlayService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.messages = [{
      id: 'welcome',
      sender: 'bot',
      text: 'Ciao! Ti aiuto a risolvere il problema e a compilare il ticket più velocemente.',
      createdAt: new Date(),
    }];
  }

  close(): void {
    this.overlayService.close();
  }

  onMessageSent(userInput: string): void {
    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userInput,
      createdAt: new Date(),
    };

    this.messages = [...this.messages, userMessage];

    this.kbService.suggestDocuments(userInput).subscribe((docs) => {
      this.kbDocuments = docs;
    });

    this.chatService.sendMessage(userInput).subscribe((result) => {
      const botMessage: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: result.reply,
        createdAt: new Date(),
      };

      this.messages = [...this.messages, botMessage];
      this.showResolutionActions = true;
    });
  }

  onResolved(): void {
    this.overlayService.close();
  }

  onUnresolved(): void {
    this.overlayService.close();
    this.router.navigate(['/ticket']);
  }
}

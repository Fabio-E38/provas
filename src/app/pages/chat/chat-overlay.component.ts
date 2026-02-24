import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
export class ChatOverlayComponent implements AfterViewInit {
  @ViewChild('chatCmp') chatCmp!: ChatComponent;
  @ViewChild('kbCmp') kbCmp!: KbPanelComponent;

  constructor(
    private chatService: ChatService,
    private kbService: KbService,
    private overlayService: OverlayService,
    private router: Router,
  ) {}

  close(): void {
    this.overlayService.close();
  }

  ngAfterViewInit(): void {
    const chatCmp = this.chatCmp;
    const kbCmp = this.kbCmp;

    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      sender: 'bot',
      text: 'Ciao! Ti aiuto a risolvere il problema e a compilare il ticket più velocemente.',
      createdAt: new Date(),
    };

    chatCmp.messages = [welcomeMessage];

    chatCmp.sendHandler = (userInput: string) => {
      const userMessage: ChatMessage = {
        id: `u-${Date.now()}`,
        sender: 'user',
        text: userInput,
        createdAt: new Date(),
      };

      chatCmp.messages = [...chatCmp.messages, userMessage];

      this.kbService.suggestDocuments(userInput).subscribe((docs: KbDocument[]) => {
        kbCmp.documents = docs;
      });

      this.chatService.sendMessage(userInput).subscribe((result) => {
        const botMessage: ChatMessage = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: result.reply,
          createdAt: new Date(),
        };

        chatCmp.messages = [...chatCmp.messages, botMessage];
        chatCmp.showResolutionActions = true;
      });
    };

    chatCmp.resolvedHandler = () => {
      this.overlayService.close();
    };

    chatCmp.unresolvedHandler = () => {
      this.overlayService.close();
      this.router.navigate(['/ticket']);
    };
  }
}

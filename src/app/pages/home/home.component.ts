import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OverlayService } from '../../services/overlay.service';
import { TicketService } from '../../services/ticket.service';
import { KbService } from '../../services/kb.service';
import { User } from '../../models/user.model';
import { Ticket } from '../../models/ticket.model';
import { KbDocument } from '../../models/kb-document.model';
import {
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  Search,
  MessageCircle,
  FileText,
  ArrowRight,
  LogOut,
  BookOpen,
  PenLine,
} from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        Search,
        MessageCircle,
        FileText,
        ArrowRight,
        LogOut,
        BookOpen,
        PenLine,
      }),
    },
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  tickets: Ticket[] = [];
  kbDocuments: KbDocument[] = [];
  searchQuery = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private overlayService: OverlayService,
    private ticketService: TicketService,
    private kbService: KbService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;

    this.ticketService.getTickets().subscribe(data => {
      this.tickets = data;
    });

    this.kbService.suggestDocuments('').subscribe(docs => {
      this.kbDocuments = docs;
    });
  }

  get openCount(): number {
    return this.tickets.filter(t => t.status === 'Open').length;
  }

  get inProgressCount(): number {
    return this.tickets.filter(t => t.status === 'In Progress').length;
  }

  get resolvedCount(): number {
    return this.tickets.filter(t => t.status === 'Resolved').length;
  }

  get recentTickets(): Ticket[] {
    return [...this.tickets]
      .sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
      .slice(0, 4);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openChat(): void {
    this.overlayService.openChat();
  }

  onSearchSubmit(): void {
    if (this.searchQuery.trim()) {
      this.overlayService.openChat();
    }
  }
}
